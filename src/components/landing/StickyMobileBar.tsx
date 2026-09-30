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
    <>
      {/* Mobile: full-width sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--tz-line)] bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(11,61,122,0.08)] backdrop-blur-xl md:hidden">
        <div className="flex gap-2">
          <a
            href={telUrl()}
            onClick={() =>
              trackEvent("click_call", { placement: "mobile_bar" })
            }
            className="tz-pulse flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--tz-navy)] text-[11px] font-bold tracking-[0.08em] text-white uppercase"
          >
            <PhoneIcon className="h-4 w-4 shrink-0" />
            {SITE.phoneDisplay}
          </a>
          <a
            href={whatsappUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("click_whatsapp", { placement: "mobile_bar" })
            }
            className="flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--tz-whatsapp)] text-[11px] font-bold tracking-[0.08em] text-white uppercase"
          >
            <WhatsAppIcon className="h-[1.1rem] w-[1.1rem] shrink-0" />
            {t(ui.whatsapp)}
          </a>
        </div>
      </div>

      {/* Desktop: stacked circular FABs (tz-transport style) */}
      <div className="pointer-events-none fixed right-6 bottom-6 z-50 hidden flex-col-reverse items-center gap-3 md:flex">
        <a
          href={whatsappUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(ui.whatsapp)}
          onClick={() =>
            trackEvent("click_whatsapp", { placement: "desktop_fab" })
          }
          className="pointer-events-auto group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[var(--tz-whatsapp)] text-white shadow-lg transition duration-300 hover:scale-110 hover:shadow-xl sm:h-16 sm:w-16"
        >
          <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
          <span className="sr-only">{t(ui.whatsapp)}</span>
        </a>
        <a
          href={telUrl()}
          aria-label={`${t(ui.call)} ${SITE.phoneDisplay}`}
          onClick={() =>
            trackEvent("click_call", { placement: "desktop_fab" })
          }
          className="tz-pulse pointer-events-auto flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[var(--tz-navy)] text-white shadow-lg transition duration-300 hover:scale-110 hover:bg-[var(--tz-navy-deep)] hover:shadow-xl sm:h-16 sm:w-16"
        >
          <PhoneIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          <span className="sr-only">
            {t(ui.call)} {SITE.phoneDisplay}
          </span>
        </a>
      </div>
    </>
  );
}
