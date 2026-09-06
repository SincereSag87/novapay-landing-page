import { useEffect, useState } from 'react';
import { navLinks } from '../data/content.js';

function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="NovaPay home">
        <span className="brand-mark" aria-hidden="true">N</span>
        <span>NovaPay</span>
      </a>

      <button
        className="menu-button"
        type="button"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <nav id="primary-navigation" className={`nav-panel ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
        <div className="nav-links">
          {navLinks.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>
              {item}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <a href="#signin" className="signin" onClick={() => setOpen(false)}>
            Sign In
          </a>
          <a href="#open-account" className="button button-primary compact" onClick={() => setOpen(false)}>
            Open an Account
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
