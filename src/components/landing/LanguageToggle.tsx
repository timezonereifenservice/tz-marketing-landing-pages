"use client";

import { useLocale } from "./LocaleProvider";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-[var(--tz-line)] bg-white p-0.5 text-[11px] font-bold tracking-[0.14em] uppercase"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale("de")}
        className={`cursor-pointer rounded-full px-2.5 py-1.5 transition duration-200 ${
          locale === "de"
            ? "bg-[var(--tz-navy)] text-white"
            : "text-[var(--tz-muted)] hover:text-[var(--tz-navy)]"
        }`}
      >
        DE
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`cursor-pointer rounded-full px-2.5 py-1.5 transition duration-200 ${
          locale === "en"
            ? "bg-[var(--tz-navy)] text-white"
            : "text-[var(--tz-muted)] hover:text-[var(--tz-navy)]"
        }`}
      >
        EN
      </button>
    </div>
  );
}
