"use client";

import Image from "next/image";
import { SITE, telUrl, whatsappUrl } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { trackEvent } from "@/lib/tracking";
import { ui } from "@/lib/i18n/ui";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { useLocale } from "./LocaleProvider";
import { LanguageToggle } from "./LanguageToggle";

export function StickyHeader({ whatsappMessage }: { whatsappMessage: string }) {
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--tz-line)] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-[1400px] items-center justify-between gap-3 px-4 sm:h-[4.75rem] sm:px-6 lg:px-10">
        <a href="#top" className="group flex min-w-0 items-center">
          <Image
            src={IMAGES.logo}
            alt="Time Zone Kfz Transporter Service"
            width={168}
            height={56}
            className="h-10 w-auto object-contain transition duration-300 group-hover:scale-[1.03] sm:h-12"
            priority
          />
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <a
            href={whatsappUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_whatsapp", { placement: "header" })}
            className="tz-btn hidden cursor-pointer items-center gap-2 rounded-full border border-[var(--tz-line)] bg-white px-4 py-2.5 text-[11px] font-bold tracking-[0.12em] text-[var(--tz-navy)] uppercase hover:border-[var(--tz-whatsapp)] hover:text-[var(--tz-whatsapp-deep)] sm:inline-flex"
          >
            <WhatsAppIcon className="h-[1.05rem] w-[1.05rem] text-[var(--tz-whatsapp)]" />
            {t(ui.whatsapp)}
          </a>
          <a
            href={telUrl()}
            onClick={() => trackEvent("click_call", { placement: "header" })}
            className="tz-btn tz-pulse inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--tz-red)] px-4 py-2.5 text-[11px] font-bold tracking-[0.1em] text-white uppercase hover:bg-[var(--tz-red-deep)]"
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="hidden md:inline">{SITE.phoneDisplay}</span>
            <span className="md:hidden">{t(ui.call)}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
