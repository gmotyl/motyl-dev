# Analytics design — blog, newsletter, homepage

> Captured: 2026-04-26

## Goal

Answer two questions:
- **A. What content performs best?** — page views, top pages, referrers across `/`, `/news/[slug]`, `/articles/[slug]`, `/newsletter/[issue]`.
- **B. Where do readers convert?** — newsletter signup funnel and CTA clicks.

## Decision

Start lean with **Cloudflare Web Analytics** (privacy-friendly, free, no cookies, no extra consent banner needed) layered on top of the existing `@vercel/analytics` + `@vercel/speed-insights`. Both are already gated behind GDPR consent in `components/consent-gated-analytics.tsx` — Cloudflare joins them.

Defer custom events / Postgres `AnalyticsEvent` table until two weeks of pageview data tells us which conversion events are worth instrumenting. **YAGNI** for funnels until we know the questions we want to answer.

## Why not GA4

- GDPR overhead (extra banner, IP anonymization, EU lawyers still uncertain)
- Data lives at Google — no joins with Prisma `Article`, `User`, `NewsletterSubscriber`
- Free BigQuery export exists but adds a project to set up

## Why not Postgres events first

- Cloudflare cache is in front of motyl.dev — server-side request logging in middleware would undercount cached responses badly
- Don't yet know which 5–10 events are worth a table; ship the cheap thing, learn, then add

## Architecture

```
Browser
  ├─ Cloudflare Beacon       ─┐
  ├─ Vercel Analytics         ├─ gated on consent.analytics
  └─ Vercel Speed Insights   ─┘
  └─ Google AdSense (script + slots) ─ gated on consent.ads

  Consent state in localStorage["gdpr-consent"]:
    { analytics: bool, ads: bool, version: 1 }
  Backwards-compatible read of legacy "true"/"false" string.
```

## Components

- `lib/consent.ts` — single source of truth: `getConsent()`, `setConsent()`, `useConsent()`, `openConsentSettings()`. Migrates legacy `"true"|"false"` localStorage values to the new `{analytics, ads, version}` shape on read.
- `components/cookie-consent.tsx` — banner with three actions (Accept all / Reject all / Customize). Customize reveals per-category checkboxes for Analytics and Advertising. Re-opens on `gdpr-consent-open` event.
- `components/cookie-settings-link.tsx` — footer button that fires `openConsentSettings()` so users can revoke or change consent at any time.
- `components/cloudflare-analytics.tsx` — injects `static.cloudflareinsights.com/beacon.min.js` with token from `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN`. Renders nothing if env var is unset.
- `components/consent-gated-analytics.tsx` — gates Vercel + Cloudflare on `consent.analytics`.
- `components/adsense-script.tsx`, `components/ad-slot.tsx` — gate AdSense on `consent.ads`.
- `app/privacy/page.tsx` — describes per-category toggles and the withdrawal path.

## Data flow

1. User loads any page → `RootLayout` mounts `<ConsentGatedAnalytics />`.
2. If `gdpr-consent === "true"`, all three trackers mount; otherwise none of them load.
3. Cloudflare beacon fires a single `POST` to `cloudflareinsights.com` with referrer + URL + UA. No cookies set.
4. Cloudflare dashboard surfaces top pages, referrers, country breakdown.

## Error handling

- Missing token → component renders `null`; no script tag, no errors.
- Script load failure → silent (Cloudflare beacon is non-critical, doesn't block render).

## Testing

- Manual: build + run dev, open with consent set to `true`, verify `beacon.min.js` request fires in DevTools Network with the configured token.
- Manual: open with consent unset/false, verify no Cloudflare beacon request.
- No unit tests — this is a 5-line script-tag wrapper; visual confirmation in DevTools is the test.

## Future (not now)

If after two weeks the Cloudflare dashboard can't answer a question we care about, add:
- `prisma/schema.prisma` → `AnalyticsEvent { id, type, slug?, userId?, sessionId?, props Json, at }`
- `app/api/track/route.ts` → POST endpoint, validates with zod
- A handful of fire-and-forget `track()` calls at the meaningful points (newsletter signup confirmed, inline-CTA click, scroll-to-end on long articles)
- `app/admin/analytics/page.tsx` — SQL-backed dashboard joining events with content
