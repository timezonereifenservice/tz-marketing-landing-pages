"use client";

import type { StatItem } from "@/lib/i18n/types";
import { ui } from "@/lib/i18n/ui";
import { useLocale } from "./LocaleProvider";
import { Reveal } from "./Reveal";

export function ExperienceStats({ stats }: { stats: StatItem[] }) {
  const { t } = useLocale();
  const count = stats.length;

  return (
    <section className="relative overflow-hidden bg-[var(--tz-navy)] py-16 text-white sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #fff 0.6px, transparent 0.7px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <span className="inline-flex rounded-md bg-[var(--tz-red)] px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white uppercase">
            {t(ui.trustYears)}
          </span>
          <h2 className="tz-display mt-5 max-w-2xl text-[clamp(1.85rem,4.2vw,2.85rem)] !text-white">
            {t(ui.experienceTitle)}
          </h2>
          <p className="mt-4 max-w-2xl border-l-4 border-[var(--tz-red)] pl-4 text-sm leading-relaxed text-white/80 sm:text-base">
            {t(ui.experienceSub)}
          </p>
        </Reveal>

        {/* Mobile: snap carousel · md+: balanced grid (no orphan fifth card) */}
        <div
          className={[
            "mt-10 -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2",
            "sm:mx-0 sm:grid sm:snap-none sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0",
            count <= 4
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
          ].join(" ")}
        >
          {stats.map((stat, i) => (
            <Reveal
              key={stat.value + t(stat.label)}
              delay={Math.min(i + 1, 3) as 1 | 2 | 3}
              className={[
                "w-[min(72vw,15.5rem)] shrink-0 snap-center sm:w-auto sm:shrink",
                count === 5 && i === 4 ? "sm:col-span-2 sm:mx-auto sm:max-w-xs lg:col-span-1 lg:mx-0 lg:max-w-none" : "",
              ].join(" ")}
            >
              <div className="flex h-full flex-col items-center rounded-2xl border border-white/15 bg-white/[0.04] px-3 py-5 text-center sm:px-4 sm:py-6">
                <div className="flex min-h-[4.25rem] w-full items-center justify-center rounded-xl bg-[var(--tz-red)] px-2 py-3">
                  <p className="tz-display text-[clamp(1.55rem,3.2vw,2.15rem)] !text-white">
                    {stat.value}
                  </p>
                </div>
                <p className="mt-3 text-[10px] font-semibold leading-snug tracking-[0.08em] text-white/75 uppercase sm:text-[11px]">
                  {t(stat.label)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
