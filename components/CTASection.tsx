import CTAButton from './CTAButton';

/** Section 4 — Ready to Join? Primary Telegram + secondary Register. */
export default function CTASection() {
  return (
    <section className="section cta-section" id="join" aria-labelledby="join-title">
      <div className="container cta-section__inner">
        <h2 className="section__title" id="join-title">
          READY TO JOIN?
        </h2>
        <p className="section__subtitle">
          Join the Telegram community for updates, or register to participate in selected
          events.
        </p>

        <div className="cta-group cta-group--center">
          <CTAButton variant="telegram" emphasis="primary">
            JOIN TELEGRAM
          </CTAButton>
          <CTAButton variant="register" emphasis="secondary">
            REGISTER NOW
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
