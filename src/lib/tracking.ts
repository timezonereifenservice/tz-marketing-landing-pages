type EventName =
  | "page_view"
  | "click_call"
  | "click_whatsapp"
  | "click_email"
  | "click_form"
  | "click_map"
  | "click_locale"
  | "form_start"
  | "form_submit"
  | "form_success"
  | "form_error"
  | "scroll_depth"
  | "section_view"
  | "outbound_main_site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const SESSION_KEY = "tz_session_id";
const UTM_KEY = "tz_utm";

let analyticsContext: {
  page?: string;
  service?: string;
  locale?: string;
} = {};

export function setAnalyticsContext(ctx: {
  page?: string;
  service?: string;
  locale?: string;
}) {
  analyticsContext = { ...analyticsContext, ...ctx };
}

function getSessionId() {
  if (typeof window === "undefined") return "";
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return `s_${Date.now()}`;
  }
}

function captureUtmFromUrl() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source")?.trim();
    const utmMedium = params.get("utm_medium")?.trim();
    const utmCampaign = params.get("utm_campaign")?.trim();
    const utmContent = params.get("utm_content")?.trim();
    const utmTerm = params.get("utm_term")?.trim();
    const gclid = params.get("gclid")?.trim();
    if (
      !utmSource &&
      !utmMedium &&
      !utmCampaign &&
      !utmContent &&
      !utmTerm &&
      !gclid
    ) {
      return;
    }
    const existingRaw = sessionStorage.getItem(UTM_KEY);
    const existing = existingRaw
      ? (JSON.parse(existingRaw) as Record<string, string>)
      : {};
    sessionStorage.setItem(
      UTM_KEY,
      JSON.stringify({
        ...existing,
        ...(utmSource ? { utmSource } : {}),
        ...(utmMedium ? { utmMedium } : {}),
        ...(utmCampaign ? { utmCampaign } : {}),
        ...(utmContent ? { utmContent } : {}),
        ...(utmTerm ? { utmTerm } : {}),
        ...(gclid ? { gclid } : {}),
      }),
    );
  } catch {
    // ignore
  }
}

export function getStoredUtm(): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
} {
  if (typeof window === "undefined") return {};
  try {
    captureUtmFromUrl();
    const raw = sessionStorage.getItem(UTM_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return {
      utmSource:
        typeof parsed.utmSource === "string" ? parsed.utmSource : undefined,
      utmMedium:
        typeof parsed.utmMedium === "string" ? parsed.utmMedium : undefined,
      utmCampaign:
        typeof parsed.utmCampaign === "string" ? parsed.utmCampaign : undefined,
      utmContent:
        typeof parsed.utmContent === "string" ? parsed.utmContent : undefined,
      utmTerm: typeof parsed.utmTerm === "string" ? parsed.utmTerm : undefined,
      gclid: typeof parsed.gclid === "string" ? parsed.gclid : undefined,
    };
  } catch {
    return {};
  }
}

/** Fire once per session for a given key (scroll depth, form_start, section). */
export function trackOnce(
  onceKey: string,
  name: EventName,
  params?: TrackParams,
) {
  if (typeof window === "undefined") return;
  try {
    const storageKey = `tz_once_${onceKey}`;
    if (sessionStorage.getItem(storageKey)) return;
    sessionStorage.setItem(storageKey, "1");
  } catch {
    // still fire if storage blocked
  }
  trackEvent(name, params);
}

type TrackParams = Record<string, string | number | boolean | undefined> & {
  page?: string;
  service?: string;
  locale?: string;
  placement?: string;
};

/**
 * Fire-and-forget analytics. One request per user action.
 * Uses sendBeacon when available. No intervals / polling.
 */
export function trackEvent(name: EventName, params?: TrackParams) {
  if (typeof window === "undefined") return;

  const page = params?.page || analyticsContext.page;
  const service = params?.service || analyticsContext.service;
  const locale = params?.locale || analyticsContext.locale || "de";
  const utm = getStoredUtm();

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, page, service, locale, ...params, ...utm });

  if (typeof window.gtag === "function") {
    window.gtag("event", name, { page, service, locale, ...params, ...utm });
  }

  const payload = {
    event: name,
    page: page ? String(page) : undefined,
    service: service ? String(service) : undefined,
    locale: locale ? String(locale) : undefined,
    placement: params?.placement ? String(params.placement) : undefined,
    sessionId: getSessionId(),
    path: window.location.pathname,
    referrer: document.referrer || undefined,
    userAgent: navigator.userAgent,
    utmSource: utm.utmSource,
    utmMedium: utm.utmMedium,
    utmCampaign: utm.utmCampaign,
    meta:
      utm.gclid || utm.utmContent || utm.utmTerm
        ? {
            ...(utm.gclid ? { gclid: utm.gclid } : {}),
            ...(utm.utmContent ? { utmContent: utm.utmContent } : {}),
            ...(utm.utmTerm ? { utmTerm: utm.utmTerm } : {}),
          }
        : undefined,
  };

  const body = JSON.stringify(payload);

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      const ok = navigator.sendBeacon("/api/analytics", blob);
      if (ok) return;
    }
  } catch {
    // fall through
  }

  void fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}

export function trackPageView(params: {
  page: string;
  service: string;
  locale?: string;
}) {
  if (typeof window === "undefined") return;

  setAnalyticsContext(params);
  captureUtmFromUrl();

  const key = `tz_pv_${params.page}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    // continue
  }

  trackEvent("page_view", {
    page: params.page,
    service: params.service,
    locale: params.locale || "de",
  });
}

export function getAnalyticsSessionId() {
  return getSessionId();
}
