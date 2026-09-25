"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { LandingCopy } from "@/lib/i18n/types";
import { IMAGES, serviceImage } from "@/lib/images";
import { SITE, telUrl, whatsappUrl } from "@/lib/site";
import { trackEvent } from "@/lib/tracking";
import { ui } from "@/lib/i18n/ui";
import { Faq } from "./Faq";
import { LeadForm } from "./LeadForm";
import { LocaleProvider, useLocale } from "./LocaleProvider";
import { MapHours } from "./MapHours";
import { Reveal } from "./Reveal";
import { Reviews } from "./Reviews";
import { StickyHeader } from "./StickyHeader";
import { StickyMobileBar } from "./StickyMobileBar";
import { PageViewTracker } from "./PageViewTracker";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";

function SoftParallax({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const y = Math.max(-24, Math.min(24, (progress - 0.5) * 40));
      el.style.setProperty("--parallax-y", `${y}px`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="tz-img-zoom absolute inset-0">
      <div className="tz-parallax-bg absolute inset-[-8%]">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/55 lg:to-white/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />
    </div>
  );
}

function LandingInner({ copy }: { copy: LandingCopy }) {
  const { t, locale } = useLocale();
  const wa = t(copy.whatsappMessage);
  const featureImage = serviceImage(copy.serviceKey);

  return (
    <div
      id="top"
      className="min-h-screen overflow-x-hidden bg-white text-[var(--foreground)] pb-[5.5rem] md:pb-0"
    >
      <PageViewTracker
        page={copy.slug}
        service={copy.serviceKey}
        locale={locale}
      />
      <div className="border-b border-[var(--tz-red)]/15 bg-[var(--tz-red-soft)] px-4 py-2.5 text-center text-[11px] font-semibold tracking-[0.04em] text-[var(--tz-red-deep)] sm:text-xs">
        {t(copy.urgency)}
      </div>

      <StickyHeader whatsappMessage={wa} />

      {/* Hero */}
      <section className="relative isolate min-h-[calc(100svh-7rem)] overflow-hidden">
        <SoftParallax src={IMAGES.hero} alt="Time Zone Werkstatt Pulheim" />

        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-16 xl:py-20">
          <div className="flex flex-col justify-center lg:col-span-7">
            <Reveal>
              <p className="tz-kicker">{t(copy.badge)}</p>
            </Reveal>

            <Reveal delay={1}>
              <h1 className="mt-5">
                <span className="sr-only">Time Zone</span>
                <span className="tz-display block max-w-[18ch] text-[clamp(1.9rem,4.6vw,3.35rem)]">
                  {t(copy.h1)}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={2}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--tz-muted)] sm:text-lg">
                {t(copy.sub)}
              </p>
              <div className="tz-rule mt-6" />
            </Reveal>

            <Reveal delay={3}>
              <ul className="mt-7 grid max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-2">
                {copy.highlights.map((item) => (
                  <li
                    key={item.de}
                    className="flex items-center gap-2.5 rounded-2xl border border-[var(--tz-line)] bg-white/80 px-3.5 py-2.5 text-sm font-medium text-[var(--tz-navy)] shadow-sm backdrop-blur-sm"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--tz-red)] text-[10px] font-bold text-white">
                      ✓
                    </span>
                    {t(item)}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={telUrl()}
                  onClick={() => trackEvent("click_call", { placement: "hero" })}
                  className="tz-btn inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--tz-red)] px-7 text-[12px] font-bold tracking-[0.12em] text-white uppercase hover:bg-[var(--tz-red-deep)]"
                >
                  <PhoneIcon className="h-4 w-4" />
                  {t(copy.primaryCta)} · {SITE.phoneDisplay}
                </a>
                <a
                  href={whatsappUrl(wa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("click_whatsapp", { placement: "hero" })
                  }
                  className="tz-btn inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--tz-line)] bg-white px-7 text-[12px] font-bold tracking-[0.12em] text-[var(--tz-navy)] uppercase hover:border-[var(--tz-navy)]"
                >
                  <WhatsAppIcon className="h-[1.15rem] w-[1.15rem] text-[var(--tz-whatsapp)]" />
                  {t(copy.secondaryCta)}
                </a>
              </div>

              <p className="mt-7 text-[11px] font-semibold tracking-[0.12em] text-[var(--tz-muted)] uppercase">
                {t(ui.trustLift)} · {t(ui.trustYears)} · {t(ui.trustReviews)}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:flex lg:items-center">
            <Reveal delay={2} className="w-full">
              <div
                id="anfrage"
                className="tz-lift relative overflow-hidden rounded-[1.75rem] border border-[var(--tz-line)] bg-white/95 p-6 shadow-[0_24px_60px_rgba(11,61,122,0.12)] backdrop-blur-md sm:p-8"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--tz-red)]/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-[var(--tz-navy)]/10 blur-2xl" />
                <LeadForm copy={copy} />
                <p className="mt-4 text-center text-[11px] text-[var(--tz-muted)]">
                  {t(ui.response)}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Visual proof band */}
      <section className="border-y border-[var(--tz-line)] bg-white py-10">
        <div className="mx-auto grid max-w-[1400px] gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-10">
          {[
            { src: featureImage, label: t(copy.h1) },
            { src: IMAGES.transporter, label: t(ui.trustLift) },
            { src: IMAGES.hero, label: "Werkstatt Pulheim" },
          ].map((item, i) => (
            <Reveal
              key={item.src + i}
              delay={Math.min(i + 1, 3) as 1 | 2 | 3}
              className={i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <figure className="tz-img-zoom tz-lift group relative h-52 overflow-hidden rounded-3xl border border-[var(--tz-line)] sm:h-60">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--tz-navy)]/80 to-transparent px-4 pb-4 pt-10 text-sm font-semibold text-white">
                  {item.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sections */}
      {copy.sections.map((section, sIndex) => (
        <section
          key={section.id}
          className={`py-20 sm:py-28 ${
            sIndex % 2 === 1 ? "bg-[var(--tz-surface)]" : "bg-white"
          }`}
        >
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <div
              className={`grid items-center gap-10 lg:grid-cols-12 ${
                sIndex === 0 ? "" : ""
              }`}
            >
              <div
                className={`${
                  sIndex === 0 ? "lg:col-span-6" : "lg:col-span-12"
                }`}
              >
                <Reveal>
                  <p className="tz-kicker">
                    {String(sIndex + 1).padStart(2, "0")}
                  </p>
                  <h2 className="tz-display mt-3 max-w-3xl text-[clamp(1.9rem,4.5vw,3rem)]">
                    {t(section.title)}
                  </h2>
                  {section.body ? (
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--tz-muted)]">
                      {t(section.body)}
                    </p>
                  ) : null}
                </Reveal>
              </div>

              {sIndex === 0 ? (
                <Reveal delay={2} className="lg:col-span-6">
                  <div className="tz-img-zoom tz-lift relative h-64 overflow-hidden rounded-[1.75rem] border border-[var(--tz-line)] sm:h-80">
                    <Image
                      src={featureImage}
                      alt={t(section.title)}
                      fill
                      sizes="(max-width:1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              ) : null}
            </div>

            {section.items ? (
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item, i) => (
                  <Reveal
                    key={item.title.de}
                    delay={Math.min(i + 1, 3) as 1 | 2 | 3}
                  >
                    <div className="tz-lift h-full rounded-3xl border border-[var(--tz-line)] bg-white p-6">
                      <p className="text-[11px] font-bold tracking-[0.18em] text-[var(--tz-red)]">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="tz-display mt-3 text-[1.35rem]">
                        {t(item.title)}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[var(--tz-muted)]">
                        {t(item.body)}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ))}

      {/* Price */}
      <section className="relative overflow-hidden border-y border-[var(--tz-line)] bg-[var(--tz-navy)] py-20 text-white sm:py-24">
        <div className="absolute inset-0 opacity-25">
          <Image
            src={IMAGES.transporter}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[var(--tz-navy)]/88" />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[var(--tz-red)] uppercase">
              Preis
            </p>
            <h2 className="tz-display mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)] !text-white">
              {t(ui.priceTitle)}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {t(copy.priceNote)}
            </p>
            <a
              href="#anfrage"
              className="tz-btn mt-8 inline-flex min-h-12 cursor-pointer items-center rounded-full bg-[var(--tz-red)] px-7 text-[12px] font-bold tracking-[0.14em] text-white uppercase hover:bg-[var(--tz-red-deep)]"
            >
              {t(copy.formSubmit)}
            </a>
          </Reveal>
        </div>
      </section>

      <Reviews reviews={copy.reviews} />
      <Faq items={copy.faqs} />
      <MapHours whatsappMessage={wa} />

      {/* Final CTA */}
      <section className="bg-[var(--tz-red)] py-14 text-white sm:py-16">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-10">
          <div>
            <h2 className="tz-display text-[clamp(1.9rem,5vw,3.2rem)] !text-white">
              {t(ui.finalCtaTitle)}
            </h2>
            <p className="mt-3 max-w-lg text-sm text-white/85 sm:text-base">
              {t(ui.finalCtaBody)}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={telUrl()}
              onClick={() => trackEvent("click_call", { placement: "final" })}
              className="tz-btn inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-white px-7 text-[12px] font-bold tracking-[0.12em] text-[var(--tz-navy)] uppercase hover:bg-[var(--tz-navy-soft)]"
            >
              <PhoneIcon className="h-4 w-4" />
              {SITE.phoneDisplay}
            </a>
            <a
              href={whatsappUrl(wa)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("click_whatsapp", { placement: "final" })
              }
              className="tz-btn inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 text-[12px] font-bold tracking-[0.12em] text-white uppercase backdrop-blur-sm hover:bg-white/20"
            >
              <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--tz-line)] bg-white py-10 text-xs text-[var(--tz-muted)]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <Image
              src={IMAGES.logo}
              alt="Time Zone"
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
            />
            <p>
              © 2026 {SITE.brand} · {SITE.address}
            </p>
          </div>
          <div className="flex flex-wrap gap-5">
            <a
              href={SITE.impressum}
              className="cursor-pointer transition hover:text-[var(--tz-navy)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(ui.footerLegal)}
            </a>
            <a
              href={SITE.datenschutz}
              className="cursor-pointer transition hover:text-[var(--tz-navy)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(ui.footerPrivacy)}
            </a>
            <a
              href={SITE.mainSite}
              className="cursor-pointer transition hover:text-[var(--tz-navy)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              timezone-reifenservice.de
            </a>
          </div>
        </div>
      </footer>

      <StickyMobileBar whatsappMessage={wa} />
    </div>
  );
}

export function LandingPage({ copy }: { copy: LandingCopy }) {
  return (
    <LocaleProvider>
      <LandingInner copy={copy} />
    </LocaleProvider>
  );
}
