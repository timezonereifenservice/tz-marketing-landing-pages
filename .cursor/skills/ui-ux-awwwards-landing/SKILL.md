---
name: ui-ux-awwwards-landing
description: >-
  Designs Awwwards-caliber, conversion-focused marketing landing pages with
  cinematic composition, expressive type, purposeful motion, and mobile-first
  responsiveness. Use when building or redesigning landing pages, heroes, ad
  campaign pages, lead-capture UIs, or when the user asks for Awwwards-quality,
  premium, or agency-level UI/UX.
---

# Awwwards Landing Page Design

Apply this skill for all landing page and marketing UI work in this project.

## North star

Build pages that feel like a short film with one job: convert. Craft first, conversion second — never sacrifice either.

## Composition rules

1. **One composition per viewport** — not a dashboard. Hero = brand + one headline + one support line + one CTA group + one dominant visual plane.
2. **Brand first** — brand name is a hero-level signal. If removing the nav would make the page feel generic, branding is too weak.
3. **Full-bleed hero** — edge-to-edge visual plane (image, video still, or atmospheric field). No inset media cards in the hero.
4. **No hero overlays** — no floating badges, promo stickers, or info chips on media.
5. **One job per section** — one headline, one short support line, one clear action.
6. **Cards only for interaction** — forms and expandable FAQ may use contained surfaces. Decorative card grids are banned in heroes and trust strips.

## Typography

- Expressive display + refined body. Never Inter, Roboto, Arial, or system-ui as the primary stack.
- Large, confident headlines (clamp-based fluid type). Tight leading on display; generous on body.
- Prefer German-friendly fonts with strong Latin support (this project defaults: Syne + Outfit).

## Color & atmosphere

- Define CSS variables for brand, surface, ink, accent, muted.
- Avoid: purple-on-white / purple-indigo gradients; warm cream + terracotta + serif; broadsheet hairline newspaper layouts; default dark-mode purple glow kits.
- For Time Zone: asphalt charcoal, signal orange `#FF6600`, cool steel highlights, subtle film grain / noise — industrial editorial, not neon SaaS.

## Motion (ship 2–3 intentional motions)

- Hero entrance (fade/slide/reveal of type + form)
- Scroll-triggered section reveals (IntersectionObserver or CSS)
- Sticky CTA presence (pulse sparingly on primary phone CTA only)
- Prefer transform/opacity; respect `prefers-reduced-motion`

## Conversion non-negotiables (ads LPs)

- Sticky mobile click-to-call + WhatsApp
- Lead form above the fold (≤5 fields)
- Price transparency block
- Hours + response promise
- 3 real reviews
- Footer: Impressum + Datenschutz
- No main site navigation on ad landing pages

## Responsive

- Mobile-first. Touch targets ≥44px. Sticky bars must not cover primary content (pad bottom).
- Fluid type via `clamp()`. Test 375 / 768 / 1280+.
- Forms stack cleanly; map and CTAs remain usable with thumbs.

## Negative constraints

- No generic AI template look (gradient orbs + pill badges + icon grids)
- No emoji decoration
- No multi-layer drop shadows for depth theater
- No rounded-full pill clusters
- No stock-photo collage heroes unless real workshop assets exist
- No inline style soup — use design tokens in CSS

## Workflow

1. Read this skill + any UI Pro Max skill if present
2. Confirm brand tokens in `globals.css`
3. Redesign shared landing shell first, then page copy
4. Verify conversion elements still fire tracking events
5. Visual-check mobile sticky bar + form above fold
