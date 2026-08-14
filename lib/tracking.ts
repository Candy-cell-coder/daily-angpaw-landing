/**
 * ============================================================
 * TRACKING — campaign source / UTM capture
 * ------------------------------------------------------------
 * Captures incoming URL parameters (?c=, utm_*) on first load
 * and persists them for the whole browser session so every
 * later CTA click can be attributed to the original source.
 * ============================================================
 */

import { siteConfig } from '@/config/site-config';

export interface CampaignData {
  campaign_source: string; // resolved primary source (from ?c=, else utm_source, else default)
  c: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
}

const STORAGE_KEY = 'angpaw_campaign';

const EMPTY: CampaignData = {
  campaign_source: '',
  c: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',
};

const isBrowser = (): boolean => typeof window !== 'undefined';

/** Read the raw params we care about from the current URL. */
function readParamsFromUrl(): Partial<CampaignData> {
  if (!isBrowser()) return {};
  const params = new URLSearchParams(window.location.search);
  const get = (k: string) => (params.get(k) || '').trim();
  return {
    c: get('c'),
    utm_source: get('utm_source'),
    utm_medium: get('utm_medium'),
    utm_campaign: get('utm_campaign'),
    utm_content: get('utm_content'),
  };
}

function readStored(): CampaignData | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as CampaignData) } : null;
  } catch {
    return null;
  }
}

function persist(data: CampaignData): void {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* sessionStorage may be blocked; tracking still works in-memory for this page. */
  }
}

/**
 * Capture campaign data once per session.
 * - If the URL has fresh params, they take priority and are stored.
 * - Otherwise we reuse whatever was stored earlier this session.
 * - campaign_source resolves to: ?c=  >  utm_source  >  config default.
 */
export function captureCampaign(): CampaignData {
  const stored = readStored();
  const fromUrl = readParamsFromUrl();

  const hasUrlData = Object.values(fromUrl).some((v) => v && v.length > 0);

  // Prefer existing session data unless the URL brings new params.
  const base: CampaignData = stored && !hasUrlData ? stored : { ...EMPTY, ...stored, ...fromUrl };

  base.campaign_source =
    base.c || base.utm_source || (stored?.campaign_source ?? '') || siteConfig.defaultCampaignSource;

  persist(base);
  return base;
}

/** Get the current campaign data without re-reading the URL. */
export function getCampaign(): CampaignData {
  return readStored() ?? { ...EMPTY, campaign_source: siteConfig.defaultCampaignSource };
}

/** Rough device bucket for analytics context. */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' | 'unknown' {
  if (!isBrowser()) return 'unknown';
  const ua = navigator.userAgent || '';
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) {
    return 'tablet';
  }
  if (/Mobi|iPhone|iPod|Android.*Mobile|Windows Phone/i.test(ua)) return 'mobile';
  return 'desktop';
}
