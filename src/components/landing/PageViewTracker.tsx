"use client";

import { useEffect, useRef } from "react";
import { trackPageView } from "@/lib/tracking";

/** Records one page_view per browser session per landing page. No polling. */
export function PageViewTracker({
  page,
  service,
  locale = "de",
}: {
  page: string;
  service: string;
  locale?: string;
}) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackPageView({ page, service, locale });
  }, [page, service, locale]);

  return null;
}
