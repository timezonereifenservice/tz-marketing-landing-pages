"use client";

import { SITE, mailtoUrl, telUrl, whatsappUrl } from "@/lib/site";
import { trackEvent } from "@/lib/tracking";
import { ui } from "@/lib/i18n/ui";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { useLocale } from "./LocaleProvider";
import { Reveal } from "./Reveal";

export function MapHours({ whatsappMessage }: { whatsappMessage: string }) {
  const { t } = useLocale();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-10">
        <Reveal>
          <p className="tz-kicker">{t(ui.location)}</p>
          <h2 className="tz-display mt-3 text-[clamp(1.9rem,4.5vw,3rem)]">
            {t(ui.mapTitle)}
          </h2>
          <p className="mt-4 text-sm text-[var(--tz-muted)] sm:text-base">
            {t(ui.response)}
          </p>

          <dl className="mt-8 space-y-5">
            <div>
              <dt className="text-[10px] font-bold tracking-[0.18em] text-[var(--tz-muted)] uppercase">
                {t(ui.location)}
              </dt>
              <dd className="mt-1.5 text-lg font-medium text-[var(--tz-navy)]">
                {SITE.address}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold tracking-[0.18em] text-[var(--tz-muted)] uppercase">
                {t(ui.hours)}
              </dt>
              <dd className="mt-1.5 text-lg font-medium text-[var(--tz-navy)]">
                {SITE.hours}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold tracking-[0.18em] text-[var(--tz-muted)] uppercase">
                E-Mail
              </dt>
              <dd className="mt-1.5">
                <a
                  href={mailtoUrl()}
                  onClick={() => trackEvent("click_email", { placement: "map" })}
                  className="cursor-pointer text-lg font-medium text-[var(--tz-navy)] underline-offset-4 transition hover:text-[var(--tz-red)] hover:underline"
                >
                  {SITE.email}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={telUrl()}
              onClick={() => trackEvent("click_call", { placement: "map" })}
              className="tz-btn inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-[var(--tz-red)] px-6 text-[11px] font-bold tracking-[0.12em] text-white uppercase hover:bg-[var(--tz-red-deep)]"
            >
              <PhoneIcon className="h-4 w-4" />
              {SITE.phoneDisplay}
            </a>
            <a
              href={whatsappUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_whatsapp", { placement: "map" })}
              className="tz-btn inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-[var(--tz-whatsapp)] px-6 text-[11px] font-bold tracking-[0.12em] text-white uppercase hover:bg-[var(--tz-whatsapp-deep)]"
            >
              <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
              WhatsApp
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tz-btn inline-flex min-h-12 cursor-pointer items-center rounded-full border border-[var(--tz-line)] bg-white px-6 text-[11px] font-bold tracking-[0.12em] text-[var(--tz-navy)] uppercase hover:border-[var(--tz-navy)]"
            >
              {t(ui.openMap)}
            </a>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div className="tz-lift overflow-hidden rounded-[1.75rem] border border-[var(--tz-line)] bg-[var(--tz-surface)] shadow-sm">
            <iframe
              title={SITE.address}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE.address)}&z=15&output=embed`}
              className="h-[300px] w-full sm:h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
