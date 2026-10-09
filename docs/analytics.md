# Analytics + leads (Supabase Postgres + Gmail SMTP)

## What gets tracked (event-driven only)

| Event | When |
|-------|------|
| `page_view` | Once per browser session per landing page |
| `click_call` / `click_whatsapp` / `click_email` | On CTA click |
| `click_form` | Scroll/quote links that jump to the lead form |
| `click_map` | Open Google Maps |
| `form_submit` | Server-side when lead is saved |
| `form_success` | Client confirmation after successful submit |
| `form_error` | Client when submit fails |

**No polling, no heartbeats, no 15s intervals.**

Server enrich (Vercel): `country`, `city`, `region` from edge headers; `device` / `browser` / `os` from User-Agent. UTM params stored when present.

## Tables

- `Lead` — form submissions (+ geo/device/UTM/`sessionId` + `emailSent` flag)
- `AnalyticsEvent` — lightweight event rows (+ geo/device/UTM)

## Env

Use `.env` / Vercel project env (see `.env.example`). Password in `DATABASE_URL` / `DIRECT_URL` must be URL-encoded.

## Commands

```bash
npm run db:push
npm run db:generate
npm run dev
```

## Mail

Form submits save to DB then send SMTP mail (`MAIL_TO`). Lead is kept even if mail fails (`emailError` stored).
