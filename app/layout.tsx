import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import MetaPixel from '@/components/MetaPixel';
import AnalyticsInit from '@/components/AnalyticsInit';
import FallingAngpao from '@/components/FallingAngpao';

export const metadata: Metadata = {
  title: 'Daily Angpaw Community — Daily Rewards, Events & Updates',
  description:
    'Join the Daily Angpaw community on Telegram to stay updated on the latest Angpaw drops, rewards and upcoming events.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Daily Angpaw Community',
    description: 'Daily Rewards • Community Events • Latest Updates',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a0505',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Fires the Meta Pixel base code only when a Pixel ID is set. */}
        <MetaPixel />
        {/* Captures campaign/UTM params + fires page_view on mount. */}
        <AnalyticsInit />
        {/* Festive falling red packets across the whole page. */}
        <FallingAngpao />
        {children}
        {/* Vercel Web Analytics — page views + our custom button-click events.
            Shows up in your Vercel project's "Analytics" tab once deployed.
            Safe no-op in local dev and if Analytics is not enabled. */}
        <Analytics />
      </body>
    </html>
  );
}
