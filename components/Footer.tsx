import { siteConfig } from '@/config/site-config';

/** Section 5 — Footer with brand line + legal placeholders. */
export default function Footer() {
  return (
    <footer className="footer" aria-labelledby="footer-brand">
      <div className="container footer__inner">
        <p className="footer__brand" id="footer-brand">
          {siteConfig.brandName}
        </p>
        <p className="footer__tagline">Community • Rewards • Events</p>

        <nav className="footer__links" aria-label="Legal">
          {/* Placeholders — link these to real pages when ready. */}
          <a href="#terms">Terms &amp; Conditions</a>
          <span className="footer__sep" aria-hidden="true">
            •
          </span>
          <a href="#privacy">Privacy Policy</a>
        </nav>

        <p className="footer__copy">
          © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
