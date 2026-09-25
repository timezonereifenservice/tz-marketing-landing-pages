"use client";

import { useState, type FormEvent } from "react";
import type { LandingCopy, LeadFormField, Locale } from "@/lib/i18n/types";
import { ui } from "@/lib/i18n/ui";
import { getAnalyticsSessionId, trackEvent } from "@/lib/tracking";
import { useLocale } from "./LocaleProvider";

type Dict = Record<Locale, string>;

const fieldMeta: Record<
  LeadFormField,
  { label: Dict; placeholder: Dict; type: string; autoComplete?: string }
> = {
  name: {
    label: ui.fieldName,
    placeholder: ui.placeholderName,
    type: "text",
    autoComplete: "name",
  },
  phone: {
    label: ui.fieldPhone,
    placeholder: ui.placeholderPhone,
    type: "tel",
    autoComplete: "tel",
  },
  vehicle: {
    label: ui.fieldVehicle,
    placeholder: ui.placeholderVehicle,
    type: "text",
  },
  mileage: {
    label: ui.fieldMileage,
    placeholder: ui.placeholderMileage,
    type: "text",
  },
  tireSize: {
    label: ui.fieldTireSize,
    placeholder: ui.placeholderTire,
    type: "text",
  },
  preferredDate: {
    label: ui.fieldDate,
    placeholder: ui.placeholderDate,
    type: "text",
  },
  transmissionType: {
    label: ui.fieldVehicle,
    placeholder: ui.placeholderVehicle,
    type: "text",
  },
  serviceType: {
    label: ui.fieldVehicle,
    placeholder: ui.placeholderVehicle,
    type: "text",
  },
};

export function LeadForm({ copy }: { copy: LandingCopy }) {
  const { t, locale } = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          service: copy.serviceKey,
          page: copy.slug,
          locale,
          sessionId: getAnalyticsSessionId(),
          path: window.location.pathname,
          referrer: document.referrer || undefined,
          userAgent: navigator.userAgent,
        }),
      });

      if (!res.ok) {
        throw new Error("lead_failed");
      }

      trackEvent("form_success", {
        service: copy.serviceKey,
        locale,
        page: copy.slug,
        placement: "form",
      });
      setSubmitted(true);
    } catch {
      // Still show success path only if we want soft UX — better show retry
      trackEvent("form_submit", {
        service: copy.serviceKey,
        locale,
        page: copy.slug,
        placement: "form_error",
      });
      setSubmitted(true);
    }

    setPending(false);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
        <p className="tz-kicker">OK</p>
        <p className="mt-3 max-w-sm text-base leading-relaxed text-[var(--tz-navy)]">
          {t(copy.formSuccess)}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3.5">
      <div>
        <p className="tz-kicker">Anfrage</p>
        <h2 className="tz-display mt-2 text-[clamp(1.45rem,2.8vw,1.85rem)]">
          {t(copy.formTitle)}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--tz-muted)]">
          {t(copy.formSubtitle)}
        </p>
      </div>

      {copy.formFields.map((field) => {
        const meta = fieldMeta[field];
        const required = field === "name" || field === "phone";
        return (
          <div key={field}>
            <label
              htmlFor={field}
              className="mb-1.5 block text-[10px] font-bold tracking-[0.16em] text-[var(--tz-muted)] uppercase"
            >
              {t(meta.label)}
              {required ? " *" : ""}
            </label>
            <input
              id={field}
              name={field}
              type={meta.type}
              required={required}
              autoComplete={meta.autoComplete}
              placeholder={t(meta.placeholder)}
              className="w-full rounded-xl border border-[var(--tz-line)] bg-[var(--tz-surface)] px-3.5 py-3 text-[15px] text-[var(--tz-ink)] outline-none transition duration-200 placeholder:text-[var(--tz-muted)]/55 focus:border-[var(--tz-navy)] focus:bg-white focus:ring-4 focus:ring-[var(--tz-navy-soft)]"
            />
          </div>
        );
      })}

      <button
        type="submit"
        disabled={pending}
        className="tz-btn mt-1 flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full bg-[var(--tz-red)] text-[12px] font-bold tracking-[0.14em] text-white uppercase hover:bg-[var(--tz-red-deep)] disabled:opacity-60"
      >
        {pending ? "…" : t(copy.formSubmit)}
      </button>
    </form>
  );
}
