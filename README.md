# Daily Angpaw — Landing Page

A **standalone** Facebook Ads landing page for the Daily Angpaw community funnel.
It has **no connection** to any existing Telegram bot, dashboard, Supabase system,
or `/go?c=` routes. It is safe to deploy separately.

**Funnel:** Facebook Ads → Landing Page → Join Telegram (primary) / Register (secondary)

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in your real links
npm run dev                  # open http://localhost:3000
```

## Configure your links

Everything is set with environment variables — no URLs are hard-coded.

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_TELEGRAM_URL` | Where "JOIN TELEGRAM" sends people |
| `NEXT_PUBLIC_REGISTER_URL` | Where "REGISTER NOW" sends people |
| `NEXT_PUBLIC_CAMPAIGN_SOURCE` | Default source when no `?c=` is in the URL (e.g. `FB-LP-1`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID (leave empty to disable safely) |

## Tracking

- On load: captures `?c=`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`
  into `sessionStorage`, then fires `page_view`.
- On CTA click: fires `telegram_click` or `register_click` (with the campaign source),
  **then** redirects.
- Events also flow to `window.dataLayer` (GTM/GA) and Meta Pixel custom events
  (`TelegramButtonClick`, `RegisterButtonClick`) when a Pixel ID is set.
- Only confirmed actions are tracked. `telegram_join` and `register_complete`
  are reserved for later and are never faked.

## Test a campaign

Open: `http://localhost:3000/?c=FB-LP-1&utm_source=facebook&utm_campaign=launch`
Open the browser console and click the buttons — you'll see `[analytics]` logs
carrying `campaign_source: "FB-LP-1"`.

## Project structure

```
app/            layout, page, global styles
components/      Hero, Features, RewardGallery, CTASection, Footer, CTAButton, MetaPixel, AnalyticsInit
lib/            analytics.ts, tracking.ts
config/         site-config.ts   (single source of truth for CTAs)
public/rewards/ gallery images (placeholders for now)
```

## Deploy on Vercel

1. Push this folder to its own Git repo.
2. Import it in Vercel (framework auto-detected as Next.js).
3. Add the 4 environment variables above in **Project → Settings → Environment Variables**.
4. Deploy.
