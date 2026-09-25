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
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--tz-line)] bg-white/95 p-3 shadow-[0_-8px_30px_rgba(11,61,122,0.08)] backdrop-blur-xl md:hidden">
      <div className="flex gap-2">
        <a
          href={telUrl()}
          onClick={() => trackEvent("click_call", { placement: "mobile_bar" })}
          className="tz-pulse flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--tz-red)] text-[11px] font-bold tracking-[0.08em] text-white uppercase"
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
  );
}
