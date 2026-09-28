import nodemailer from "nodemailer";

type LeadMailPayload = {
  id: string;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone: string;
  email?: string | null;
  vehicle?: string | null;
  brand?: string | null;
  model?: string | null;
  year?: string | null;
  hsn?: string | null;
  tsn?: string | null;
  vin?: string | null;
  service: string;
  serviceLabel?: string | null;
  page: string;
  locale: string;
};

export async function sendLeadEmail(lead: LeadMailPayload) {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  const to = process.env.MAIL_TO || "abubakar.consoledot@gmail.com";
  const from = process.env.MAIL_FROM || user;

  if (!user || !pass || !to) {
    throw new Error("SMTP is not configured");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const displayName =
    lead.name ||
    [lead.firstName, lead.lastName].filter(Boolean).join(" ") ||
    lead.phone;
  const serviceName = lead.serviceLabel || lead.service;
  const subject = `[Lead] ${serviceName} · ${displayName} · ${lead.page}`;

  const text = [
    "Neue Anfrage von einer Ads-Landingpage",
    "",
    `ID: ${lead.id}`,
    `Service: ${serviceName} (${lead.service})`,
    `Seite: ${lead.page}`,
    `Sprache: ${lead.locale}`,
    "",
    "— Persönliche Informationen —",
    `Vorname: ${lead.firstName || "—"}`,
    `Nachname: ${lead.lastName || "—"}`,
    `Name: ${displayName}`,
    `Telefon: ${lead.phone}`,
    `E-Mail: ${lead.email || "—"}`,
    "",
    "— Fahrzeug & Service —",
    `Marke: ${lead.brand || "—"}`,
    `Modell: ${lead.model || "—"}`,
    `Baujahr: ${lead.year || "—"}`,
    `2.1 HSN: ${lead.hsn || "—"}`,
    `2.2 TSN: ${lead.tsn || "—"}`,
    `FIN/VIN: ${lead.vin || "—"}`,
    `Fahrzeug (kurz): ${lead.vehicle || "—"}`,
    "",
    `Zeit: ${new Date().toISOString()}`,
  ].join("\n");

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    replyTo: lead.email || undefined,
  });
}
