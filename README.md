# Time Zone Reifenservice – Google Ads Landing Pages

Next.js conversion landing pages for paid traffic. WordPress stays on the apex domain; these pages are meant for a subdomain (e.g. `landingpage.timezone-reifenservice.de`).

## Design skills (Cursor)

Installed for automatic UI/UX guidance on this project:

- `.cursor/skills/ui-ux-pro-max/` — via `npx uipro-cli init -a cursor`
- `.cursor/skills/ui-ux-awwwards-landing/` — Awwwards + ad-conversion rules for these LPs
- `design-system/time-zone-reifenservice/MASTER.md` — persisted design system

Restart Cursor (or reload the window) once so Agent Skills index the new folders.

## Pages (PDF blueprint)

| Service | URL path |
|---------|----------|
| Getriebespülung | `/lp/getriebespuelung-koeln` |
| Reifenservice | `/lp/reifenservice-koeln` |
| Ölwechsel | `/lp/oelwechsel-koeln` |

`/` redirects to https://timezone-reifenservice.de/

## Features

- German default + DE/EN toggle
- Sticky header call + WhatsApp
- Sticky mobile call/WhatsApp bar
- Lead form above the fold (max 5 fields)
- Price transparency, reviews, FAQ, map + hours
- Impressum / Datenschutz footer links
- GA4 / Google Ads ready via env vars
- CTA click + form events for conversion tracking

## Local dev

```bash
npm run dev
```

Open e.g. http://localhost:3000/lp/getriebespuelung-koeln

## Env (optional)

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXX
```

## Deploy (Vercel + subdomain)

1. Push to GitHub / import in Vercel
2. Add domain `landingpage.timezone-reifenservice.de` in Vercel
3. In one.com DNS: CNAME `landingpage` → value shown by Vercel
4. Point ads to:
   - `https://landingpage.timezone-reifenservice.de/lp/getriebespuelung-koeln`
   - `https://landingpage.timezone-reifenservice.de/lp/reifenservice-koeln`
   - `https://landingpage.timezone-reifenservice.de/lp/oelwechsel-koeln`

Do **not** change the apex A/AAAA records for WordPress.
