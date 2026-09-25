"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/i18n/types";
import { ui } from "@/lib/i18n/ui";
import { useLocale } from "./LocaleProvider";
import { Reveal } from "./Reveal";

export function Faq({ items }: { items: FaqItem[] }) {
  const { t } = useLocale();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[880px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <p className="tz-kicker">FAQ</p>
          <h2 className="tz-display mt-3 text-[clamp(1.9rem,4.5vw,3rem)]">
            {t(ui.faqTitle)}
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <Reveal key={item.q.de} delay={Math.min(index, 3) as 0 | 1 | 2 | 3}>
                <div
                  className={`overflow-hidden rounded-2xl border transition duration-300 ${
                    isOpen
                      ? "border-[var(--tz-navy)]/25 bg-[var(--tz-navy-soft)]/50 shadow-sm"
                      : "border-[var(--tz-line)] bg-white hover:border-[var(--tz-navy)]/20"
                  }`}
                >
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-start justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-semibold text-[var(--tz-navy)] sm:text-base">
                      {t(item.q)}
                    </span>
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold transition duration-300 ${
                        isOpen
                          ? "bg-[var(--tz-red)] text-white"
                          : "bg-[var(--tz-surface)] text-[var(--tz-navy)]"
                      }`}
                    >
                      {isOpen ? "–" : "+"}
                    </span>
                  </button>
                  {isOpen ? (
                    <p className="px-5 pb-5 text-sm leading-relaxed text-[var(--tz-muted)]">
                      {t(item.a)}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
