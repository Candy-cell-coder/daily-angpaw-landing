'use client';

import { useEffect } from 'react';
import { captureCampaign } from '@/lib/tracking';
import { trackPageView } from '@/lib/analytics';

/**
 * Runs once on the client when the page mounts:
 *   1. Captures ?c= / utm_* params into the session.
 *   2. Fires the page_view funnel event.
 *
 * Renders nothing.
 */
export default function AnalyticsInit() {
  useEffect(() => {
    captureCampaign();
    trackPageView();
  }, []);

  return null;
}
