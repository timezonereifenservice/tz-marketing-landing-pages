"use client";

import { useEffect } from "react";
import { trackOnce } from "@/lib/tracking";

const DEPTHS = [25, 50, 75, 100] as const;

/**
 * Once-per-session scroll depth + section views.
 * No timers/polling — scroll listener (passive) + IntersectionObserver.
 */
export function EngagementTracker({
  page,
  service,
}: {
  page: string;
  service: string;
}) {
  useEffect(() => {
    const fired = new Set<number>();

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = Math.min(
        100,
        Math.round((window.scrollY / scrollable) * 100),
      );
      for (const depth of DEPTHS) {
        if (pct >= depth && !fired.has(depth)) {
          fired.add(depth);
          trackOnce(`scroll_${page}_${depth}`, "scroll_depth", {
            page,
            service,
            placement: String(depth),
          });
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [page, service]);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-track-section]"),
    );
    if (!nodes.length) return;

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const section = entry.target.getAttribute("data-track-section");
          if (!section || seen.has(section)) continue;
          seen.add(section);
          trackOnce(`section_${page}_${section}`, "section_view", {
            page,
            service,
            placement: section,
          });
        }
      },
      { threshold: 0.35 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [page, service]);

  return null;
}
