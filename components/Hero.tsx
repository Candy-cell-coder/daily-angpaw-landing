import CTAButton from './CTAButton';

/** Section 1 — Hero. Energetic red/gold, mobile-first, strong CTA contrast. */
export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="container hero__inner">
        <span className="hero__badge">🧧 Community Rewards</span>

        <h1 className="hero__title">DAILY ANGPAW COMMUNITY</h1>

        <p className="hero__subtitle">
          Daily Rewards <span className="dot">•</span> Community Events{' '}
          <span className="dot">•</span> Latest Updates
        </p>

        <p className="hero__text">
          Join our community to stay updated on the latest Angpaw drops, rewards and
          upcoming events.
        </p>

        <div className="cta-group">
          <CTAButton variant="telegram" emphasis="primary">
            JOIN TELEGRAM COMMUNITY
          </CTAButton>
          <CTAButton variant="register" emphasis="secondary">
            REGISTER NOW
          </CTAButton>
        </div>
      </div>
    </header>
  );
}
