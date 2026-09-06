import { insights, securityItems, testimonials, trustPoints } from '../data/content.js';
import { NovaCard, PhoneFrame } from './ProductVisuals.jsx';

export function Hero() {
  return (
    <section className="hero-section" id="top">
      <div className="hero-copy reveal">
        <p className="eyebrow">Digital banking for modern money movement</p>
        <h1>Your money. Moving at your speed.</h1>
        <p className="hero-text">
          NovaPay gives you one modern account for spending, saving, sending, and managing money wherever life takes you.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#open-account">Open an Account</a>
          <a className="button button-secondary" href="#features">Explore NovaPay</a>
        </div>
      </div>
      <div className="hero-visual reveal" aria-hidden="true">
        <div className="orbit-line" />
        <PhoneFrame />
        <div className="floating-note top-note">
          <span>Card purchase</span>
          <strong>Approved instantly</strong>
        </div>
        <div className="floating-note bottom-note">
          <span>FX preview</span>
          <strong>1 USD = 0.925 EUR</strong>
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section className="trust-section" id="security" aria-labelledby="trust-title">
      <div className="section-kicker">Financial confidence</div>
      <div className="trust-layout">
        <h2 id="trust-title">Trust starts before the transaction.</h2>
        <div className="trust-grid">
          {trustPoints.map((point, index) => (
            <article className="trust-item reveal" key={point.label}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{point.label}</h3>
              <p>{point.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SpendingSection() {
  return (
    <section className="spending-section" id="features" aria-labelledby="spending-title">
      <div className="spending-copy reveal">
        <p className="eyebrow">Everyday spending</p>
        <h2 id="spending-title">Spend smarter without thinking harder.</h2>
        <p>
          NovaPay turns purchases, subscriptions, and income into a live financial picture with clean categories and quiet prompts.
        </p>
      </div>
      <div className="spending-board reveal">
        <div className="feed-column">
          <span className="panel-label">Today</span>
          {['Northline Cafe', 'Frame Supply', 'StudioCloud', 'Aero Metro'].map((item, index) => (
            <div className="feed-item" key={item}>
              <span className="feed-index">0{index + 1}</span>
              <strong>{item}</strong>
              <small>{index === 2 ? 'Recurring detected' : 'Categorized'}</small>
            </div>
          ))}
        </div>
        <div className="insight-column">
          <div className="bar-chart" aria-label="Spending insight chart">
            <span style={{ '--h': '46%' }} />
            <span style={{ '--h': '68%' }} />
            <span style={{ '--h': '38%' }} />
            <span style={{ '--h': '78%' }} />
            <span style={{ '--h': '52%' }} />
          </div>
          <div className="subscription-strip">
            <strong>3 subscriptions tracked</strong>
            <span>$42 due this week</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CardSection() {
  return (
    <section className="card-section" id="personal" aria-labelledby="card-title">
      <div className="card-stage reveal">
        <NovaCard />
        <div className="card-controls">
          <div>
            <span>Physical card</span>
            <strong>Active</strong>
          </div>
          <label className="freeze-toggle">
            <input type="checkbox" aria-label="Freeze card simulation" />
            <span />
            Freeze
          </label>
          <div>
            <span>Travel mode</span>
            <strong>Enabled</strong>
          </div>
        </div>
      </div>
      <div className="card-copy reveal">
        <p className="eyebrow">Cards</p>
        <h2 id="card-title">A card that feels as controlled as your phone.</h2>
        <p>
          Use a premium physical card, generate virtual cards for online spending, and change limits before your next tap.
        </p>
      </div>
    </section>
  );
}

export function InternationalSection() {
  return (
    <section className="international-section" id="business" aria-labelledby="international-title">
      <div className="international-copy reveal">
        <p className="eyebrow">International money</p>
        <h2 id="international-title">Money without borders.</h2>
      </div>
      <div className="currency-composition reveal">
        <div className="currency-rate">
          <span>Transfer preview</span>
          <strong>$2,000 → €1,850</strong>
          <small>Clear fees before you send</small>
        </div>
        <PhoneFrame variant="transfer" />
        <div className="currency-list">
          {['USD', 'EUR', 'GBP', 'CAD'].map((code) => (
            <span key={code}>{code}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InsightsSection() {
  return (
    <section className="insights-section" aria-labelledby="insights-title">
      <div className="insights-header reveal">
        <p className="eyebrow">Financial intelligence</p>
        <h2 id="insights-title">See what changed before it becomes a surprise.</h2>
      </div>
      <div className="metric-row">
        {insights.map((item) => (
          <article className="metric reveal" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <small>{item.delta}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SavingsSection() {
  return (
    <section className="savings-section" aria-labelledby="savings-title">
      <div className="savings-story reveal">
        <p className="eyebrow">Savings</p>
        <h2 id="savings-title">Goals that move when your money does.</h2>
        <p>
          Round-ups, scheduled transfers, and income rules help turn everyday activity into visible progress.
        </p>
      </div>
      <div className="savings-visual reveal" aria-hidden="true">
        <PhoneFrame variant="savings" />
        <div className="goal-caption">
          <strong>$1,720 remaining</strong>
          <span>Projected completion in 9 weeks</span>
        </div>
      </div>
    </section>
  );
}

export function SecuritySection() {
  return (
    <section className="security-section" aria-labelledby="security-title">
      <div className="security-title reveal">
        <p className="eyebrow">Security</p>
        <h2 id="security-title">Security that works quietly in the background.</h2>
      </div>
      <div className="security-matrix">
        {securityItems.map((item) => (
          <div className="security-line reveal" key={item}>
            <span aria-hidden="true">+</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SocialProofSection() {
  return (
    <section className="proof-section" aria-labelledby="proof-title">
      <h2 id="proof-title" className="sr-only">Customer stories</h2>
      {testimonials.map((item) => (
        <figure className="quote reveal" key={item.name}>
          <blockquote>“{item.quote}”</blockquote>
          <figcaption>
            <strong>{item.name}</strong>
            <span>{item.role}</span>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}

export function FinaleSection() {
  return (
    <section className="finale-section" id="about" aria-labelledby="finale-title">
      <div className="finale-copy reveal">
        <p className="eyebrow">One account</p>
        <h2 id="finale-title">Everything you need. One account.</h2>
      </div>
      <div className="finale-phones reveal" aria-hidden="true">
        <PhoneFrame />
        <PhoneFrame variant="transfer" />
        <PhoneFrame variant="savings" />
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="closing-section" id="open-account" aria-labelledby="closing-title">
      <p className="eyebrow">NovaPay</p>
      <h2 id="closing-title">Banking should feel this simple.</h2>
      <div className="hero-actions">
        <a className="button button-primary" href="#open-account">Open an Account</a>
        <a className="button button-secondary light" href="#features">Explore Features</a>
      </div>
    </section>
  );
}

export function Footer() {
  const groups = ['Personal', 'Business', 'Features', 'Security', 'Company', 'Help', 'Legal', 'Social'];

  return (
    <footer className="site-footer">
      <div>
        <a className="brand footer-brand" href="#top" aria-label="NovaPay home">
          <span className="brand-mark" aria-hidden="true">N</span>
          <span>NovaPay</span>
        </a>
        <p>Fictional fintech concept for frontend, UI, and UX portfolio presentation.</p>
      </div>
      <nav aria-label="Footer navigation">
        {groups.map((item) => (
          <a href="#top" key={item}>{item}</a>
        ))}
      </nav>
    </footer>
  );
}
