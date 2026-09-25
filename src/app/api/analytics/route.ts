import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const ALLOWED = new Set([
  "page_view",
  "click_call",
  "click_whatsapp",
  "click_email",
  "form_submit",
  "form_success",
]);

/**
 * Single write per user action — no polling / heartbeats.
 * Keeps Supabase + Vercel load minimal.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event = String(body?.event || "");

    if (!ALLOWED.has(event)) {
      return NextResponse.json({ ok: false, error: "Invalid event" }, { status: 400 });
    }

    // Deduplicate rapid page_view retries for same session+page (e.g. React Strict Mode)
    if (event === "page_view" && body?.sessionId && body?.page) {
      const recent = await prisma.analyticsEvent.findFirst({
        where: {
          event: "page_view",
          sessionId: String(body.sessionId),
          page: String(body.page),
          createdAt: { gte: new Date(Date.now() - 30_000) },
        },
        select: { id: true },
      });
      if (recent) {
        return NextResponse.json({ ok: true, deduped: true });
      }
    }

    await prisma.analyticsEvent.create({
      data: {
        event,
        page: body.page ? String(body.page).slice(0, 120) : null,
        service: body.service ? String(body.service).slice(0, 80) : null,
        locale: body.locale ? String(body.locale).slice(0, 8) : null,
        placement: body.placement ? String(body.placement).slice(0, 80) : null,
        sessionId: body.sessionId ? String(body.sessionId).slice(0, 80) : null,
        path: body.path ? String(body.path).slice(0, 240) : null,
        referrer: body.referrer ? String(body.referrer).slice(0, 400) : null,
        userAgent: body.userAgent ? String(body.userAgent).slice(0, 400) : null,
        meta: body.meta && typeof body.meta === "object" ? body.meta : undefined,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[analytics]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
