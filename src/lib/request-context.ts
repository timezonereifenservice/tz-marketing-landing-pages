export type RequestGeoDevice = {
  country: string | null;
  city: string | null;
  region: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  userAgent: string | null;
};

function header(req: Request, name: string) {
  return req.headers.get(name)?.trim() || null;
}

/** Lightweight UA taxonomy — no heavy client/server analytics SDK. */
export function parseUserAgent(uaRaw: string | null | undefined): {
  device: string;
  browser: string;
  os: string;
} {
  const ua = (uaRaw || "").trim();
  if (!ua) {
    return { device: "unknown", browser: "unknown", os: "unknown" };
  }

  const lower = ua.toLowerCase();
  let device = "desktop";
  if (/ipad|tablet|kindle|silk|(android(?!.*mobile))/i.test(ua)) {
    device = "tablet";
  } else if (/mobi|iphone|ipod|android.*mobile|windows phone/i.test(ua)) {
    device = "mobile";
  }

  let os = "unknown";
  if (/windows nt/i.test(ua)) os = "Windows";
  else if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/mac os x/i.test(ua)) os = "macOS";
  else if (/cros/i.test(ua)) os = "ChromeOS";
  else if (/linux/i.test(ua)) os = "Linux";

  let browser = "unknown";
  if (/edg\//i.test(ua)) browser = "Edge";
  else if (/opr\/|opera/i.test(ua)) browser = "Opera";
  else if (/firefox\//i.test(ua)) browser = "Firefox";
  else if (/chrome\//i.test(ua) && !/edg\//i.test(ua)) browser = "Chrome";
  else if (/safari\//i.test(ua) && !/chrome\//i.test(ua)) browser = "Safari";
  else if (lower.includes("msie") || lower.includes("trident/")) browser = "IE";

  return { device, browser, os };
}

/** Geo from Vercel edge headers (empty off-Vercel). Never stores raw IP. */
export function getRequestGeoDevice(
  req: Request,
  clientUserAgent?: string | null,
): RequestGeoDevice {
  const userAgent =
    (clientUserAgent && clientUserAgent.trim()) ||
    header(req, "user-agent") ||
    null;
  const parsed = parseUserAgent(userAgent);

  return {
    country: header(req, "x-vercel-ip-country")?.slice(0, 8) || null,
    city: header(req, "x-vercel-ip-city")?.slice(0, 80) || null,
    region: header(req, "x-vercel-ip-country-region")?.slice(0, 40) || null,
    device: parsed.device,
    browser: parsed.browser,
    os: parsed.os,
    userAgent: userAgent ? userAgent.slice(0, 400) : null,
  };
}

export function strUtm(value: unknown, max = 120) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}
