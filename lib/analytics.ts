/**
 * ============================================================
 * ANALYTICS — a small, reusable event layer
 * ------------------------------------------------------------
 * trackEvent(name, properties) builds a consistent payload and
 * forwards it to every configured sink:
 *   1. window.dataLayer   (GTM / GA — if present)
 *   2. Meta Pixel (fbq)   (mapped custom events — if configured)
 *   3. console.debug      (visible during development/testing)
 *
 * IMPORTANT: We only ever fire events for CONFIRMED actions.
 * We never fabricate completion/conversion events.
 * Placeholders for future confirmed events (telegram_join,
 * register_complete) are defined but intentionally NOT called.
 * ============================================================
 */

import { track as vercelTrack } from '@vercel/analytics';
import { getCampaign, getDeviceType } from '@/lib/tracking';

export type EventName =
  | 'page_view'
  | 'telegram_click'
  | 'register_click'
  // Future — only fire these when the real action is confirmed server-side.
  | 'telegram_join'
  | 'register_complete';

export interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

interface EventPayload extends EventProperties {
  event: EventName;
  timestamp: string;
  campaign_source: string;
  utm_source: string;
  utm_campaign: string;
  device_type: string;
  page_path: string;
}

/** Map our internal events to Meta Pixel custom event names. */
const META_EVENT_MAP: Partial<Record<EventName, string>> = {
  telegram_click: 'TelegramButtonClick',
  register_click: 'RegisterButtonClick',
  // NOTE: page_view is handled by the Pixel base code (standard PageView),
  // so we do NOT double-fire it here.
  // We deliberately do NOT map to standard 'Lead' / 'CompleteRegistration'
  // because those must only fire on confirmed conversions.
};

function nowIso(): string {
  // Date is available in the browser at click time (not build time), so this is safe.
  return new Date().toISOString();
}

function fireMetaPixel(name: EventName, payload: EventPayload): void {
  if (typeof window === 'undefined') return;
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq !== 'function') return; // pixel not configured — safely skip

  const mapped = META_EVENT_MAP[name];
  if (!mapped) return;

  fbq('trackCustom', mapped, {
    campaign_source: payload.campaign_source,
    utm_source: payload.utm_source,
    utm_campaign: payload.utm_campaign,
  });
}

function pushToDataLayer(payload: EventPayload): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: unknown[] };
  if (Array.isArray(w.dataLayer)) w.dataLayer.push(payload);
}

/**
 * Send to Vercel Web Analytics as a custom event. This is what powers the
 * "Analytics" dashboard in the Vercel project (page views + these events).
 * The page_view is already counted by the <Analytics /> component, so we
 * only forward the click events here to avoid double-counting views.
 */
function fireVercel(name: EventName, payload: EventPayload): void {
  if (name === 'page_view') return;
  try {
    vercelTrack(name, {
      campaign_source: payload.campaign_source || 'direct',
      utm_source: payload.utm_source || '',
      utm_campaign: payload.utm_campaign || '',
    });
  } catch {
    /* analytics not enabled / not in browser — ignore */
  }
}

/**
 * Core, reusable tracker. Call this for any confirmed event.
 */
export function trackEvent(name: EventName, properties: EventProperties = {}): EventPayload {
  const campaign = getCampaign();

  const payload: EventPayload = {
    event: name,
    timestamp: nowIso(),
    campaign_source: campaign.campaign_source,
    utm_source: campaign.utm_source,
    utm_campaign: campaign.utm_campaign,
    device_type: getDeviceType(),
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    ...properties,
  };

  pushToDataLayer(payload);
  fireMetaPixel(name, payload);
  fireVercel(name, payload);

  if (typeof window !== 'undefined') {
    // Visible in the browser console during testing.
    // eslint-disable-next-line no-console
    console.debug('[analytics]', payload);
  }

  return payload;
}

/* ---- Convenience helpers for the funnel steps ---- */

export function trackPageView(): void {
  trackEvent('page_view');
}

export function trackTelegramClick(): void {
  trackEvent('telegram_click', { cta: 'join_telegram' });
}

export function trackRegisterClick(): void {
  trackEvent('register_click', { cta: 'register' });
}
