'use client';

import Script from 'next/script';
import { siteConfig } from '@/config/site-config';

/**
 * Injects the Meta (Facebook) Pixel base code ONLY when a Pixel ID
 * is configured. If NEXT_PUBLIC_META_PIXEL_ID is empty, this renders
 * nothing and the page works normally — nothing breaks.
 *
 * The base code fires the standard "PageView" automatically.
 * Button clicks are sent as custom events from lib/analytics.ts
 * (TelegramButtonClick / RegisterButtonClick). We deliberately do
 * NOT fire Lead / CompleteRegistration here — those are real
 * conversions and must only fire on confirmed actions.
 */
export default function MetaPixel() {
  const pixelId = siteConfig.metaPixelId;
  if (!pixelId) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
