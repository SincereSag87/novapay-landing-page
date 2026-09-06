import { Buffer } from 'node:buffer';
import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9223;
const baseUrl = process.env.QA_URL || 'http://127.0.0.1:5173/';
const screenshotDir = path.resolve('docs/screenshots');

const viewports = [
  { name: 'novapay-1440.png', width: 1440, height: 1200 },
  { name: 'novapay-1024.png', width: 1024, height: 1100 },
  { name: 'novapay-956x440.png', width: 956, height: 440 },
  { name: 'novapay-768.png', width: 768, height: 1100 },
  { name: 'novapay-440x956.png', width: 440, height: 956 },
  { name: 'novapay-390.png', width: 390, height: 956 },
];

let id = 0;

async function delay(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForChrome() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {
      await delay(120);
    }
  }
  throw new Error('Chrome did not expose the DevTools endpoint in time.');
}

function connect(wsUrl) {
  const socket = new WebSocket(wsUrl);
  const pending = new Map();
  const listeners = new Map();

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    } else if (message.method && listeners.has(message.method)) {
      listeners.get(message.method).forEach((listener) => listener(message.params));
    }
  });

  return new Promise((resolve, reject) => {
    socket.addEventListener('open', () => {
      resolve({
        send(method, params = {}) {
          const commandId = ++id;
          socket.send(JSON.stringify({ id: commandId, method, params }));
          return new Promise((commandResolve, commandReject) => {
            pending.set(commandId, { resolve: commandResolve, reject: commandReject });
          });
        },
        close() {
          socket.close();
        },
        on(method, listener) {
          if (!listeners.has(method)) listeners.set(method, new Set());
          listeners.get(method).add(listener);
        },
      });
    });
    socket.addEventListener('error', reject);
  });
}

async function evaluate(client, expression) {
  const result = await client.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || 'Runtime evaluation failed.');
  }
  return result.result.value;
}

async function main() {
  await mkdir(screenshotDir, { recursive: true });
  const profileDir = await mkdtemp(path.join(tmpdir(), 'novapay-chrome-'));
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--allow-insecure-localhost',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank',
  ], { stdio: 'ignore' });

  try {
    await waitForChrome();
    const pages = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json());
    const page = pages.find((target) => target.type === 'page');
    const client = await connect(page.webSocketDebuggerUrl);

    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Log.enable');
    const browserMessages = [];
    client.on('Runtime.consoleAPICalled', (event) => {
      browserMessages.push(event.args?.map((arg) => arg.value || arg.description).join(' '));
    });
    client.on('Runtime.exceptionThrown', (event) => {
      const details = event.exceptionDetails;
      browserMessages.push([
        details?.text || 'Runtime exception',
        details?.exception?.description || details?.exception?.value || '',
        details?.stackTrace?.callFrames?.map((frame) => `${frame.functionName}@${frame.url}:${frame.lineNumber}:${frame.columnNumber}`).join('\n') || '',
      ].filter(Boolean).join('\n'));
    });

    const reports = [];

    for (const viewport of viewports) {
      await client.send('Emulation.setDeviceMetricsOverride', {
        width: viewport.width,
        height: viewport.height,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await client.send('Page.navigate', { url: baseUrl });
      for (let attempt = 0; attempt < 50; attempt += 1) {
        const ready = await evaluate(client, `Boolean(document.querySelector('.hero-actions .button-primary') && document.querySelector('.phone-frame'))`);
        if (ready) break;
        await delay(150);
      }
      await delay(300);

      const metrics = await evaluate(client, `(() => {
        const root = document.documentElement;
        const body = document.body;
        return {
          innerWidth: window.innerWidth,
          scrollWidth: root.scrollWidth,
          bodyScrollWidth: body.scrollWidth,
          ctaVisible: !!document.querySelector('.hero-actions .button-primary')?.getBoundingClientRect().width,
          phoneVisible: !!document.querySelector('.phone-frame')?.getBoundingClientRect().height,
          cardVisible: !!document.querySelector('.nova-card')?.getBoundingClientRect().height,
          overflowOffenders: Array.from(document.querySelectorAll('body *'))
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return {
                tag: element.tagName.toLowerCase(),
                className: typeof element.className === 'string' ? element.className : '',
                width: Math.round(rect.width),
                left: Math.round(rect.left),
                right: Math.round(rect.right)
              };
            })
            .filter((item) => item.right > window.innerWidth || item.left < 0)
            .sort((a, b) => (b.right - window.innerWidth) - (a.right - window.innerWidth))
            .slice(0, 6),
          activeElement: document.activeElement?.tagName || ''
        };
      })()`);

      if (viewport.width <= 520) {
        const mobileMenu = await evaluate(client, `(async () => {
          const button = document.querySelector('.menu-button');
          if (!button) return { found: false };
          button.click();
          await new Promise((resolve) => setTimeout(resolve, 80));
          const panel = document.querySelector('#primary-navigation');
          if (!panel) return { found: false };
          const expanded = button.getAttribute('aria-expanded');
          const pointerEvents = getComputedStyle(panel).pointerEvents;
          button.click();
          return { found: true, expanded, pointerEvents };
        })()`);
        metrics.mobileMenu = mobileMenu;
      }

      const screenshot = await client.send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false,
        fromSurface: true,
      });
      await writeFile(path.join(screenshotDir, viewport.name), Buffer.from(screenshot.data, 'base64'));
      reports.push({ viewport, metrics });
    }

    client.close();
    if (browserMessages.length) {
      console.log('Browser messages:');
      console.log(browserMessages.join('\n'));
    }
    console.log(JSON.stringify(reports, null, 2));
  } finally {
    chrome.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
