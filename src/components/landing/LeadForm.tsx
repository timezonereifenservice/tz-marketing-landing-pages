"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import type { LandingCopy } from "@/lib/i18n/types";
import { ui } from "@/lib/i18n/ui";
import { getAnalyticsSessionId, trackEvent } from "@/lib/tracking";
import { useLocale } from "./LocaleProvider";

const inputClass =
  "w-full min-h-10 rounded-lg border border-[var(--tz-line)] bg-[var(--tz-surface)] px-2.5 py-2 text-[13px] text-[var(--tz-ink)] outline-none transition duration-200 placeholder:text-[var(--tz-muted)]/50 focus:border-[var(--tz-navy)] focus:bg-white focus:ring-2 focus:ring-[var(--tz-navy-soft)] sm:px-3";

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-0.5 block truncate text-[9px] font-bold tracking-[0.1em] text-[var(--tz-muted)] uppercase"
    >
      {children}
      {required ? (
        <span className="text-[var(--tz-alert)]" aria-hidden>
          {" "}
          *
        </span>
      ) : null}
    </label>
  );
}

function Field({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`min-w-0 ${className}`}>{children}</div>;
}

export function LeadForm({ copy }: { copy: LandingCopy }) {
  const { t, locale } = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExtra, setShowExtra] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          service: copy.serviceKey,
          serviceLabel: t(copy.serviceLabel),
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
      trackEvent("form_submit", {
        service: copy.serviceKey,
        locale,
        page: copy.slug,
        placement: "form_error",
      });
      setError(
        locale === "de"
          ? "Senden fehlgeschlagen. Bitte erneut versuchen oder anrufen."
          : "Could not send. Please try again or call us.",
      );
    }

    setPending(false);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[160px] flex-col items-center justify-center text-center">
        <p className="tz-kicker">OK</p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--tz-navy)]">
          {t(copy.formSuccess)}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <p className="tz-kicker">Anfrage</p>
        <h2 className="tz-display mt-1 text-[clamp(1.25rem,2.2vw,1.55rem)]">
          {t(copy.formTitle)}
        </h2>
      </div>

      <fieldset>
        <legend className="mb-1.5 text-[10px] font-bold tracking-[0.14em] text-[var(--tz-navy)] uppercase">
          {t(ui.formPersonal)}
        </legend>
        <div className="grid grid-cols-2 gap-x-2 gap-y-2">
          <Field>
            <FieldLabel htmlFor="firstName" required>
              {t(ui.fieldFirstName)}
            </FieldLabel>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              placeholder={t(ui.placeholderFirstName)}
              className={inputClass}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="lastName" required>
              {t(ui.fieldLastName)}
            </FieldLabel>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              placeholder={t(ui.placeholderLastName)}
              className={inputClass}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email" required>
              {t(ui.fieldEmail)}
            </FieldLabel>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={t(ui.placeholderEmail)}
              className={inputClass}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="phone" required>
              {t(ui.fieldPhone)}
            </FieldLabel>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder={t(ui.placeholderPhone)}
              className={inputClass}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-1.5 text-[10px] font-bold tracking-[0.14em] text-[var(--tz-navy)] uppercase">
          {t(ui.formVehicle)}
        </legend>
        <div className="grid grid-cols-2 gap-x-2 gap-y-2">
          <Field>
            <FieldLabel htmlFor="brand" required>
              {t(ui.fieldBrand)}
            </FieldLabel>
            <input
              id="brand"
              name="brand"
              type="text"
              required
              placeholder={t(ui.placeholderBrand)}
              className={inputClass}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="model" required>
              {t(ui.fieldModel)}
            </FieldLabel>
            <input
              id="model"
              name="model"
              type="text"
              required
              placeholder={t(ui.placeholderModel)}
              className={inputClass}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="year" required>
              {t(ui.fieldYearShort)}
            </FieldLabel>
            <input
              id="year"
              name="year"
              type="text"
              inputMode="numeric"
              required
              placeholder={t(ui.placeholderYear)}
              className={inputClass}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="serviceDisplay" required>
              {t(ui.fieldServiceShort)}
            </FieldLabel>
            <input
              id="serviceDisplay"
              type="text"
              readOnly
              tabIndex={-1}
              value={t(copy.serviceLabel)}
              aria-readonly="true"
              className={`${inputClass} cursor-default border-[var(--tz-navy)]/15 bg-[var(--tz-navy-soft)] font-semibold text-[var(--tz-navy)]`}
            />
          </Field>
        </div>

        <button
          type="button"
          onClick={() => setShowExtra((v) => !v)}
          className="mt-2.5 flex w-full cursor-pointer items-center justify-between rounded-lg border border-dashed border-[var(--tz-line)] bg-[var(--tz-surface)]/80 px-3 py-2 text-left text-[11px] font-semibold tracking-wide text-[var(--tz-navy)] transition hover:border-[var(--tz-navy)]/30"
        >
          <span>{t(ui.formExtraToggle)}</span>
          <span className="text-[var(--tz-muted)]" aria-hidden>
            {showExtra ? "−" : "+"}
          </span>
        </button>

        {showExtra ? (
          <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-2">
            <Field>
              <FieldLabel htmlFor="hsn">{t(ui.fieldHsn)}</FieldLabel>
              <input
                id="hsn"
                name="hsn"
                type="text"
                placeholder={t(ui.placeholderHsn)}
                className={inputClass}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="tsn">{t(ui.fieldTsn)}</FieldLabel>
              <input
                id="tsn"
                name="tsn"
                type="text"
                placeholder={t(ui.placeholderTsn)}
                className={inputClass}
              />
            </Field>
            <Field className="col-span-2">
              <FieldLabel htmlFor="vin">{t(ui.fieldVinShort)}</FieldLabel>
              <input
                id="vin"
                name="vin"
                type="text"
                placeholder={t(ui.placeholderVin)}
                className={inputClass}
              />
            </Field>
          </div>
        ) : null}
      </fieldset>

      {error ? (
        <p className="text-sm font-medium text-[var(--tz-alert)]">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="tz-btn flex min-h-11 w-full cursor-pointer items-center justify-center rounded-full bg-[var(--tz-navy)] text-[12px] font-bold tracking-[0.14em] text-white uppercase hover:bg-[var(--tz-navy-deep)] disabled:opacity-60"
      >
        {pending ? "…" : t(ui.formQuoteSubmit)}
      </button>
    </form>
  );
}
