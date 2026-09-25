type EventName =
  | "page_view"
  | "click_call"
  | "click_whatsapp"
  | "click_email"
  | "form_submit"
  | "form_success";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const SESSION_KEY = "tz_session_id";

let analyticsContext: {
  page?: string;
  service?: string;
  locale?: string;
} = {};

export function setAnalyticsContext(ctx: {
  page: string;
  service: string;
  locale?: string;
}) {
  analyticsContext = ctx;
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

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, page, service, locale, ...params });

  if (typeof window.gtag === "function") {
    window.gtag("event", name, { page, service, locale, ...params });
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
