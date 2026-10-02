"use client";

import { SITE, telUrl, whatsappUrl } from "@/lib/site";
import { trackEvent } from "@/lib/tracking";
import { ui } from "@/lib/i18n/ui";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { useLocale } from "./LocaleProvider";

export function StickyMobileBar({
  whatsappMessage,
}: {
  whatsappMessage: string;
}) {
  const { t } = useLocale();

  return (
    <div className="pointer-events-none fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex flex-col-reverse items-center gap-3 sm:right-6 sm:bottom-6">
      <a
        href={whatsappUrl(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t(ui.whatsapp)}
        onClick={() =>
          trackEvent("click_whatsapp", { placement: "fab" })
        }
        className="pointer-events-auto flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[var(--tz-whatsapp)] text-white shadow-lg transition duration-300 hover:scale-110 hover:shadow-xl sm:h-16 sm:w-16"
      >
        <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
        <span className="sr-only">{t(ui.whatsapp)}</span>
      </a>
      <a
        href={telUrl()}
        aria-label={`${t(ui.call)} ${SITE.phoneDisplay}`}
        onClick={() => trackEvent("click_call", { placement: "fab" })}
        className="tz-pulse pointer-events-auto flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[var(--tz-navy)] text-white shadow-lg transition duration-300 hover:scale-110 hover:bg-[var(--tz-navy-deep)] hover:shadow-xl sm:h-16 sm:w-16"
      >
        <PhoneIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        <span className="sr-only">
          {t(ui.call)} {SITE.phoneDisplay}
        </span>
      </a>
    </div>
  );
}
