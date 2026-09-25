import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendLeadEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = body?.name ? String(body.name).trim() : "";
    const phone = body?.phone ? String(body.phone).trim() : "";
    const service = body?.service ? String(body.service).trim() : "unknown";
    const page = body?.page ? String(body.page).trim() : "unknown";
    const locale = body?.locale ? String(body.locale).trim() : "de";

    if (!phone || phone.length < 6) {
      return NextResponse.json(
        { ok: false, error: "Phone required" },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: name || null,
        phone,
        email: body?.email ? String(body.email).trim() : null,
        vehicle: body?.vehicle ? String(body.vehicle).trim() : null,
        mileage: body?.mileage ? String(body.mileage).trim() : null,
        tireSize: body?.tireSize ? String(body.tireSize).trim() : null,
        preferredDate: body?.preferredDate
          ? String(body.preferredDate).trim()
          : null,
        service,
        page,
        locale,
        meta: {
          userAgent:
            typeof body?.userAgent === "string" ? body.userAgent.slice(0, 400) : null,
          referrer:
            typeof body?.referrer === "string" ? body.referrer.slice(0, 400) : null,
          sessionId:
            typeof body?.sessionId === "string" ? body.sessionId.slice(0, 80) : null,
        },
      },
    });

    // Analytics write only on submit (no intervals)
    await prisma.analyticsEvent.create({
      data: {
        event: "form_submit",
        page,
        service,
        locale,
        placement: "form",
        sessionId:
          typeof body?.sessionId === "string" ? body.sessionId.slice(0, 80) : null,
        path: typeof body?.path === "string" ? body.path.slice(0, 240) : null,
        referrer:
          typeof body?.referrer === "string" ? body.referrer.slice(0, 400) : null,
        userAgent:
          typeof body?.userAgent === "string" ? body.userAgent.slice(0, 400) : null,
        meta: { leadId: lead.id },
      },
    });

    let emailSent = false;
    let emailError: string | null = null;
    try {
      await sendLeadEmail(lead);
      emailSent = true;
      await prisma.lead.update({
        where: { id: lead.id },
        data: { emailSent: true },
      });
    } catch (err) {
      emailError = err instanceof Error ? err.message : "mail_failed";
      await prisma.lead.update({
        where: { id: lead.id },
        data: { emailSent: false, emailError },
      });
      console.error("[lead-mail]", emailError);
    }

    return NextResponse.json({
      ok: true,
      id: lead.id,
      emailSent,
    });
  } catch (error) {
    console.error("[lead]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
