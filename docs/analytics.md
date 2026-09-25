# Analytics + leads (Supabase Postgres + Gmail SMTP)

## What gets tracked (event-driven only)

| Event | When |
|-------|------|
| `page_view` | Once per browser session per landing page |
| `click_call` / `click_whatsapp` / `click_email` | On CTA click |
| `form_submit` | Server-side when lead is saved |
| `form_success` | Client confirmation after successful submit |

**No polling, no heartbeats, no 15s intervals.**

## Tables

- `Lead` — form submissions (+ `emailSent` flag)
- `AnalyticsEvent` — lightweight event rows

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
