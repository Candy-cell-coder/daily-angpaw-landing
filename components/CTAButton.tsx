'use client';

import { siteConfig } from '@/config/site-config';
import { trackTelegramClick, trackRegisterClick } from '@/lib/analytics';

type Variant = 'telegram' | 'register';

interface CTAButtonProps {
  variant: Variant;
  children: React.ReactNode;
  /** 'primary' = filled/strong, 'secondary' = outline */
  emphasis?: 'primary' | 'secondary';
  className?: string;
}

/**
 * A single, reusable CTA. It ALWAYS tracks the click first, then
 * lets the browser follow the link (same tab). Because the tracking
 * calls are synchronous (sessionStorage + fbq + dataLayer), the event
 * is recorded before navigation — with no artificial delay.
 *
 * URLs are never hard-coded here; they come from site-config.
 */
export default function CTAButton({
  variant,
  children,
  emphasis,
  className = '',
}: CTAButtonProps) {
  const isTelegram = variant === 'telegram';
  const href = isTelegram ? siteConfig.telegramUrl : siteConfig.registerUrl;
  const defaultEmphasis: 'primary' | 'secondary' = isTelegram ? 'primary' : 'secondary';
  const level = emphasis ?? defaultEmphasis;

  const handleClick = () => {
    if (isTelegram) {
      trackTelegramClick();
    } else {
      trackRegisterClick();
    }
    // No preventDefault: the <a> navigates in the same tab right after.
  };

  const classes = ['cta', `cta--${variant}`, `cta--${level}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      href={href}
      onClick={handleClick}
      className={classes}
      // Telegram links go same-tab on mobile (best funnel behaviour).
      // Register keeps same-tab too for a consistent, trackable flow.
      rel="noopener"
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {isTelegram && (
        <svg
          className="cta__icon"
          viewBox="0 0 24 24"
          width="22"
          height="22"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-1.99 1.93c-.23.23-.42.42-.83.42z"
          />
        </svg>
      )}
      <span>{children}</span>
    </a>
  );
}
