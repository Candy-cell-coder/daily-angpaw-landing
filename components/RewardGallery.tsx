import { siteConfig } from '@/config/site-config';

/**
 * Section 3 — Community Reward Highlights.
 * An auto-scrolling marquee that loops smoothly (feels alive, like a GIF).
 * It pauses when the user hovers/touches, fades softly at both edges, and
 * falls back to a normal swipeable strip for users who prefer reduced motion.
 *
 * The image list is rendered twice so the loop is seamless. The duplicate
 * set is hidden from assistive tech to avoid double announcements.
 *
 * To change screenshots later: drop files into /public/rewards and update
 * `rewardImages` in config/site-config.ts.
 */
export default function RewardGallery() {
  const images = siteConfig.rewardImages;

  return (
    <section className="section section--tight" id="highlights" aria-labelledby="highlights-title">
      <div className="container">
        <h2 className="section__title" id="highlights-title">
          COMMUNITY REWARD HIGHLIGHTS
        </h2>
        <p className="section__subtitle">Recent community reward activity</p>
      </div>

      <div className="gallery" role="region" aria-label="Community reward highlights">
        <ul className="gallery__track" role="list">
          {images.map((img) => (
            <li className="gallery__item" key={img.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="gallery__img"
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                width={600}
                height={800}
              />
            </li>
          ))}
          {/* Seamless-loop duplicate (decorative, hidden from screen readers) */}
          {images.map((img) => (
            <li className="gallery__item" key={`dup-${img.src}`} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="gallery__img"
                src={img.src}
                alt=""
                loading="lazy"
                decoding="async"
                width={600}
                height={800}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
