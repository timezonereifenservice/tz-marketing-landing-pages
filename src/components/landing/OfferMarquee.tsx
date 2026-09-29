"use client";

import { useEffect, useState } from "react";
import type { LandingCopy } from "@/lib/i18n/types";
import { ui } from "@/lib/i18n/ui";
import { useLocale } from "./LocaleProvider";

type OfferLine = { de: string; en: string };

const sharedOffers: OfferLine[] = [
  {
    de: "Rückruf innerhalb 1 Stunde · Mo–Fr 9–18 Uhr · Jetzt Termin sichern",
    en: "Callback within 1 hour · Mon–Fri 9–18 · Book your slot now",
  },
  {
    de: "Hebebühne bis 5,5 t · Pkw & Transporter · Faire Festpreise",
    en: "Lift up to 5.5 t · Cars & vans · Fair fixed prices",
  },
  {
    de: "WhatsApp oder Anruf · Schnelle Hilfe in Pulheim & Köln",
    en: "WhatsApp or call · Fast help in Pulheim & Cologne",
  },
];

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]"
    >
      <path
        d={dir === "left" ? "M15 6 9 12l6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OfferMarquee({ copy }: { copy: LandingCopy }) {
  const { t } = useLocale();
  const offers: OfferLine[] = [copy.urgency, ...sharedOffers];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % offers.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [offers.length]);

  const prev = () =>
    setIndex((i) => (i - 1 + offers.length) % offers.length);
  const next = () => setIndex((i) => (i + 1) % offers.length);

  return (
    <div className="relative z-[1] border-b border-[var(--tz-navy-deep)]/25 bg-[var(--tz-navy)] text-white">
      <div className="mx-auto flex max-w-[1400px] items-center gap-1 px-1 sm:gap-2 sm:px-3 lg:px-6">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous offer"
          className="flex h-10 w-9 shrink-0 cursor-pointer items-center justify-center text-white/85 transition hover:bg-white/10 hover:text-white sm:h-11 sm:w-10"
        >
          <Chevron dir="left" />
        </button>

        <div className="relative min-h-[2.75rem] flex-1 overflow-hidden py-2 sm:min-h-[3rem] sm:py-2.5">
          {offers.map((offer, i) => (
            <p
              key={offer.de}
              aria-hidden={i !== index}
              className={[
                "absolute inset-x-0 top-1/2 -translate-y-1/2 px-1 text-center text-[11px] font-bold leading-snug tracking-[0.06em] uppercase transition-all duration-500 sm:text-[12px] sm:tracking-[0.1em] md:text-[13px]",
                i === index
                  ? "opacity-100"
                  : "pointer-events-none translate-y-[-30%] opacity-0",
              ].join(" ")}
            >
              <span className="mx-auto block max-w-[52rem] text-balance">
                {t(offer)}
                {i === 0 ? (
                  <>
                    {" · "}
                    <a
                      href="#anfrage"
                      className="underline decoration-white/50 underline-offset-2 hover:decoration-white lg:hidden"
                    >
                      {t(ui.formQuoteSubmit)}
                    </a>
                    <a
                      href="#anfrage-desktop"
                      className="hidden underline decoration-white/50 underline-offset-2 hover:decoration-white lg:inline"
                    >
                      {t(ui.formQuoteSubmit)}
                    </a>
                  </>
                ) : null}
              </span>
            </p>
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next offer"
          className="flex h-10 w-9 shrink-0 cursor-pointer items-center justify-center text-white/85 transition hover:bg-white/10 hover:text-white sm:h-11 sm:w-10"
        >
          <Chevron dir="right" />
        </button>
      </div>
    </div>
  );
}
