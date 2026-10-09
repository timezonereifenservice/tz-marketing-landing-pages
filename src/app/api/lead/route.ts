import { after, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendLeadEmail } from "@/lib/mail";
import {
  getRequestGeoDevice,
  strUtm,
} from "@/lib/request-context";

export const runtime = "nodejs";
/** Keep Fluid/serverless warm work bounded for ads traffic */
export const maxDuration = 20;

function str(value: unknown, max = 200) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = str(body?.firstName, 80);
    const lastName = str(body?.lastName, 80);
    const phone = str(body?.phone, 40);
    const email = str(body?.email, 160);
    const brand = str(body?.brand, 80);
    const model = str(body?.model, 80);
    const year = str(body?.year, 10);
    const hsn = str(body?.hsn, 20);
    const tsn = str(body?.tsn, 20);
    const vin = str(body?.vin, 32);
    const service = str(body?.service, 40) || "unknown";
    const serviceLabel = str(body?.serviceLabel, 120);
    const page = str(body?.page, 120) || "unknown";
    const locale = str(body?.locale, 8) || "de";
    const sessionId = str(body?.sessionId, 80);
    const path = str(body?.path, 240);
    const referrer = str(body?.referrer, 400);
    const utmSource = strUtm(body?.utmSource);
    const utmMedium = strUtm(body?.utmMedium);
    const utmCampaign = strUtm(body?.utmCampaign);

    if (
      !firstName ||
      !lastName ||
      !phone ||
      phone.length < 6 ||
      !email ||
      !brand ||
      !model ||
      !year
    ) {
      return NextResponse.json(
        { ok: false, error: "Required fields missing" },
        { status: 400 },
      );
    }

    const name = `${firstName} ${lastName}`.trim();
    const vehicle = [brand, model, year].filter(Boolean).join(" ");
    const ctx = getRequestGeoDevice(
      request,
      typeof body?.userAgent === "string" ? body.userAgent : null,
    );

    const lead = await prisma.lead.create({
      data: {
        name,
        firstName,
        lastName,
        phone,
        email,
        vehicle,
        brand,
        model,
        year,
        hsn,
        tsn,
        vin,
        service,
        serviceLabel,
        page,
        locale,
        sessionId,
        country: ctx.country,
        city: ctx.city,
        region: ctx.region,
        device: ctx.device,
        browser: ctx.browser,
        os: ctx.os,
        utmSource,
        utmMedium,
        utmCampaign,
        meta: {
          userAgent: ctx.userAgent,
          referrer,
          sessionId,
          path,
        },
      },
    });

    // Fire analytics write in parallel with response path
    const analyticsPromise = prisma.analyticsEvent.create({
      data: {
        event: "form_submit",
        page,
        service,
        locale,
        placement: "form",
        sessionId,
        path,
        referrer,
        userAgent: ctx.userAgent,
        country: ctx.country,
        city: ctx.city,
        region: ctx.region,
        device: ctx.device,
        browser: ctx.browser,
        os: ctx.os,
        utmSource,
        utmMedium,
        utmCampaign,
        meta: { leadId: lead.id },
      },
    });

    // SMTP after response — cuts user-visible latency (Vercel Fluid after())
    after(async () => {
      try {
        await analyticsPromise;
      } catch (err) {
        console.error("[lead-analytics]", err);
      }

      try {
        await sendLeadEmail(lead);
        await prisma.lead.update({
          where: { id: lead.id },
          data: { emailSent: true, emailError: null },
        });
      } catch (err) {
        const emailError = err instanceof Error ? err.message : "mail_failed";
        await prisma.lead.update({
          where: { id: lead.id },
          data: { emailSent: false, emailError },
        });
        console.error("[lead-mail]", emailError);
      }
    });

    return NextResponse.json({
      ok: true,
      id: lead.id,
      emailQueued: true,
    });
  } catch (error) {
    console.error("[lead]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
