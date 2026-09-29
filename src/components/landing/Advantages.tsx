"use client";

import type { AdvantageItem } from "@/lib/i18n/types";
import { ui } from "@/lib/i18n/ui";
import { useLocale } from "./LocaleProvider";
import { Reveal } from "./Reveal";

export function Advantages({ items }: { items: AdvantageItem[] }) {
  const { t } = useLocale();

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <p className="tz-kicker">Time Zone</p>
          <h2 className="tz-display mt-3 max-w-3xl text-[clamp(1.9rem,4.5vw,3rem)]">
            {t(ui.advantagesTitle)}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--tz-muted)]">
            {t(ui.advantagesSub)}
          </p>
        </Reveal>

        {/* Column headers — desktop comparison */}
        <div className="mt-12 hidden grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4 lg:grid">
          <p className="text-[11px] font-bold tracking-[0.16em] text-[var(--tz-muted)] uppercase">
            &nbsp;
          </p>
          <p className="rounded-xl bg-[var(--tz-navy)] px-4 py-2.5 text-center text-[11px] font-bold tracking-[0.14em] text-white uppercase">
            {t(ui.usLabel)}
          </p>
          <p className="rounded-xl border border-[var(--tz-line)] bg-[var(--tz-surface)] px-4 py-2.5 text-center text-[11px] font-bold tracking-[0.14em] text-[var(--tz-muted)] uppercase">
            {t(ui.othersLabel)}
          </p>
        </div>

        <div className="mt-4 space-y-3 lg:mt-3 lg:space-y-0 lg:divide-y lg:divide-[var(--tz-line)] lg:rounded-3xl lg:border lg:border-[var(--tz-line)] lg:bg-[var(--tz-surface)]/40">
          {items.map((item, i) => (
            <Reveal key={item.title.de} delay={Math.min((i % 3) + 1, 3) as 1 | 2 | 3}>
              {/* Mobile / tablet card */}
              <article className="overflow-hidden rounded-2xl border border-[var(--tz-line)] bg-white lg:hidden">
                <div className="border-b border-[var(--tz-line)] bg-[var(--tz-navy)] px-5 py-3.5">
                  <h3 className="text-[15px] font-bold tracking-tight text-white">
                    {t(item.title)}
                  </h3>
                </div>
                <div className="grid gap-0 sm:grid-cols-2">
                  <div className="border-b border-[var(--tz-line)] bg-[var(--tz-navy-soft)]/70 px-5 py-4 sm:border-b-0 sm:border-r">
                    <p className="text-[10px] font-bold tracking-[0.16em] text-[var(--tz-navy)] uppercase">
                      {t(ui.usLabel)}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--tz-navy)]">
                      {t(item.us)}
                    </p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[10px] font-bold tracking-[0.16em] text-[var(--tz-muted)] uppercase">
                      {t(ui.othersLabel)}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--tz-muted)]">
                      {t(item.others)}
                    </p>
                  </div>
                </div>
              </article>

              {/* Desktop comparison row */}
              <div className="hidden grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4 px-5 py-5 lg:grid lg:items-stretch">
                <div className="flex items-center">
                  <h3 className="tz-display text-[1.2rem] text-[var(--tz-navy)]">
                    {t(item.title)}
                  </h3>
                </div>
                <div className="rounded-xl border border-[var(--tz-navy)]/20 bg-white px-4 py-3.5">
                  <p className="text-sm leading-relaxed text-[var(--tz-navy)]">
                    {t(item.us)}
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--tz-line)] bg-white/70 px-4 py-3.5">
                  <p className="text-sm leading-relaxed text-[var(--tz-muted)]">
                    {t(item.others)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
