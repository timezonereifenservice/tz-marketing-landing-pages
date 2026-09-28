"use client";

import type { BeforeAfterItem } from "@/lib/i18n/types";
import { ui } from "@/lib/i18n/ui";
import { useLocale } from "./LocaleProvider";
import { Reveal } from "./Reveal";

export function BeforeAfter({ items }: { items: BeforeAfterItem[] }) {
  const { t } = useLocale();

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <p className="tz-kicker">Results</p>
          <h2 className="tz-display mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)]">
            {t(ui.beforeAfterTitle)}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--tz-muted)]">
            {t(ui.beforeAfterSub)}
          </p>
        </Reveal>

        <div className="mt-12 -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
          {items.map((item, i) => (
            <Reveal
              key={item.before.de}
              delay={Math.min(i + 1, 3) as 1 | 2 | 3}
              className="w-[min(88vw,22rem)] shrink-0 snap-center md:w-auto md:shrink"
            >
              <article className="tz-lift flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--tz-line)] bg-[var(--tz-surface)]">
                <div className="border-b border-[var(--tz-line)] bg-white/60 px-5 py-5 sm:px-6">
                  <p className="text-[10px] font-bold tracking-[0.18em] text-[var(--tz-muted)] uppercase">
                    {t(ui.beforeLabel)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--tz-ink)]/80">
                    {t(item.before)}
                  </p>
                </div>
                <div className="relative flex-1 px-5 py-5 sm:px-6">
                  <div className="absolute left-5 top-0 h-px w-10 bg-[var(--tz-red)] sm:left-6" />
                  <p className="text-[10px] font-bold tracking-[0.18em] text-[var(--tz-red)] uppercase">
                    {t(ui.afterLabel)}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--tz-navy)]">
                    {t(item.after)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
