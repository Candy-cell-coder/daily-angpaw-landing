/**
 * ============================================================
 * CENTRAL SITE CONFIGURATION
 * ------------------------------------------------------------
 * This is the ONLY place CTA destinations and IDs are defined.
 * UI components never hard-code URLs — they read from here.
 * Values come from environment variables (see .env.example).
 * ============================================================
 */

export interface RewardImage {
  /** Full image URL (served from a CDN) */
  src: string;
  /** Alt text for accessibility + SEO */
  alt: string;
}

/**
 * Reward screenshots are served from the public repo via the free jsDelivr CDN.
 * (The direct-file Vercel deploy can't carry binary images, so we host them here.)
 * The source files also live in /public/rewards for local reference.
 */
const REWARD_CDN =
  'https://cdn.jsdelivr.net/gh/Candy-cell-coder/daily-angpaw-landing@master/public/rewards';

export const siteConfig = {
  /** Brand / copy */
  brandName: 'Daily Hub MY',

  /** Primary CTA destination — "JOIN TELEGRAM" */
  telegramUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/YourTelegramChannel',

  /** Secondary CTA destination — "REGISTER NOW" */
  registerUrl: process.env.NEXT_PUBLIC_REGISTER_URL || '#register',

  /**
   * Default campaign source, used only when the visitor arrives
   * WITHOUT a ?c= parameter in the URL.
   */
  defaultCampaignSource: process.env.NEXT_PUBLIC_CAMPAIGN_SOURCE || '',

  /**
   * Meta (Facebook) Pixel ID. Empty string = pixel disabled.
   * The page must work fine whether this is set or not.
   */
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',

  /**
   * Reward gallery images (Section 3).
   * Replace these placeholders with your real screenshots later —
   * just drop files into /public/rewards and update this list.
   */
  rewardImages: [
    { src: `${REWARD_CDN}/reward-1.jpg`, alt: 'Daily Angpaw community reward payouts' },
    { src: `${REWARD_CDN}/reward-2.jpg`, alt: 'Community reward leaderboard — 202 of 600 members' },
    { src: `${REWARD_CDN}/reward-3.jpg`, alt: 'RM20.84 community reward payout' },
    { src: `${REWARD_CDN}/reward-4.jpg`, alt: 'Top community reward winners leaderboard' },
    { src: `${REWARD_CDN}/reward-5.jpg`, alt: 'Multiple RM10 reward payouts to community members' },
    { src: `${REWARD_CDN}/reward-6.jpg`, alt: 'Daily reward credited to a member wallet' },
  ] as RewardImage[],
} as const;

export type SiteConfig = typeof siteConfig;
