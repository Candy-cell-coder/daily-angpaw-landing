import CTAButton from './CTAButton';

const FEATURES = [
  {
    icon: '🎁',
    title: 'Daily Rewards',
    text: 'Regular community reward updates',
  },
  {
    icon: '🎉',
    title: 'Community Events',
    text: 'New activities and campaigns',
  },
  {
    icon: '📢',
    title: 'Latest Updates',
    text: 'Stay updated on upcoming events',
  },
  {
    icon: '🤝',
    title: 'Active Community',
    text: 'Join a growing Telegram community',
  },
];

/** Section 2 — What's Inside: 4 feature cards + a Telegram CTA. */
export default function Features() {
  return (
    <section className="section" id="whats-inside" aria-labelledby="whats-inside-title">
      <div className="container">
        <h2 className="section__title" id="whats-inside-title">
          WHAT&apos;S INSIDE?
        </h2>

        <ul className="features-grid" role="list">
          {FEATURES.map((f) => (
            <li className="feature-card" key={f.title}>
              <span className="feature-card__icon" aria-hidden="true">
                {f.icon}
              </span>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__text">{f.text}</p>
            </li>
          ))}
        </ul>

        <div className="cta-group cta-group--center">
          <CTAButton variant="telegram" emphasis="primary">
            JOIN TELEGRAM
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
