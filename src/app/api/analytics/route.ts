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
 * Client already session-dedupes page_view; skip extra SELECT to save DB CPU.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event = String(body?.event || "");

    if (!ALLOWED.has(event)) {
      return NextResponse.json({ ok: false, error: "Invalid event" }, { status: 400 });
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
    // Fail soft — never block UX for analytics
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
