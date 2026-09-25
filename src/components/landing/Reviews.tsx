"use client";

import type { Review } from "@/lib/i18n/types";
import { SITE } from "@/lib/site";
import { ui } from "@/lib/i18n/ui";
import { useLocale } from "./LocaleProvider";
import { Reveal } from "./Reveal";

export function Reviews({ reviews }: { reviews: Review[] }) {
  const { t } = useLocale();

  return (
    <section className="bg-[var(--tz-surface)] py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="tz-kicker">Google</p>
              <h2 className="tz-display mt-3 max-w-xl text-[clamp(1.9rem,4.5vw,3rem)]">
                {t(ui.reviewsTitle)}
              </h2>
            </div>
            <p className="text-sm font-semibold tracking-[0.08em] text-[var(--tz-muted)] uppercase">
              ★★★★★ · {SITE.googleReviews} Reviews
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal
              key={review.name + review.date}
              delay={Math.min(i + 1, 3) as 1 | 2 | 3}
            >
              <article className="tz-lift flex h-full flex-col rounded-3xl border border-[var(--tz-line)] bg-white p-6 sm:p-7">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-amber-500">★★★★★</span>
                  <span className="rounded-full bg-[var(--tz-red-soft)] px-2.5 py-1 text-[10px] font-bold tracking-wide text-[var(--tz-red)] uppercase">
                    {t(ui.verified)}
                  </span>
                </div>
                <p className="mt-5 flex-1 text-[15px] leading-relaxed text-[var(--tz-ink)]/85">
                  “{t(review.text)}”
                </p>
                <div className="mt-6 border-t border-[var(--tz-line)] pt-4">
                  <p className="font-semibold text-[var(--tz-navy)]">
                    {review.name}
                  </p>
                  <p className="mt-1 text-xs text-[var(--tz-muted)]">
                    {review.vehicle ? `${review.vehicle} · ` : ""}
                    {review.date}
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
