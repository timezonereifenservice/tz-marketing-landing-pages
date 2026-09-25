import nodemailer from "nodemailer";

type LeadMailPayload = {
  id: string;
  name?: string | null;
  phone: string;
  email?: string | null;
  vehicle?: string | null;
  mileage?: string | null;
  tireSize?: string | null;
  preferredDate?: string | null;
  service: string;
  page: string;
  locale: string;
};

export async function sendLeadEmail(lead: LeadMailPayload) {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  // Gmail app passwords work with or without spaces — normalize
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

  const subject = `[Lead] ${lead.service} · ${lead.name || lead.phone} · ${lead.page}`;

  const text = [
    "Neue Anfrage von einer Ads-Landingpage",
    "",
    `ID: ${lead.id}`,
    `Service: ${lead.service}`,
    `Seite: ${lead.page}`,
    `Sprache: ${lead.locale}`,
    "",
    `Name: ${lead.name || "—"}`,
    `Telefon: ${lead.phone}`,
    `E-Mail: ${lead.email || "—"}`,
    `Fahrzeug: ${lead.vehicle || "—"}`,
    `Kilometerstand: ${lead.mileage || "—"}`,
    `Reifengröße: ${lead.tireSize || "—"}`,
    `Wunschtermin: ${lead.preferredDate || "—"}`,
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
