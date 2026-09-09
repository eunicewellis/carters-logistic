import { Resend } from "resend";
import type { Shipment } from "@/types";

const FROM =
  process.env.EMAIL_FROM || "Carters Logistics <support@carterslogistic.com>";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(value?: string): string {
  if (!value) return "—";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return escapeHtml(value);
  const name = MONTHS[Number(month) - 1] ?? month;
  return `${name} ${Number(day)}, ${year}`;
}

function joinAddress(...parts: Array<string | undefined>): string {
  const value = parts.filter(Boolean).join(", ");
  return value ? escapeHtml(value) : "—";
}

export async function sendTrackingEmail(
  to: string,
  shipment: Shipment,
  greetingName?: string
): Promise<void> {
  if (!to) return;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping tracking email.");
    return;
  }

  const resend = new Resend(apiKey);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://carterslogistic.com";
  const trackingUrl = `${siteUrl}/track?number=${encodeURIComponent(
    shipment.trackingNumber
  )}`;
  const destination = [
    shipment.destinationAddress,
    shipment.destinationCity,
    shipment.destinationState,
    shipment.destinationZip,
  ]
    .filter(Boolean)
    .join(", ");

  const sender = joinAddress(shipment.senderName, shipment.senderAddress);
  const recipient = joinAddress(shipment.recipientName, destination);
  const origin = shipment.origin ? escapeHtml(shipment.origin) : "—";
  const hello = greetingName?.trim() ? ` ${escapeHtml(greetingName.trim())}` : "";
  const rows = [
    ["Product", escapeHtml(shipment.productName)],
    ["Sender", sender],
    ["Recipient", recipient],
    ["Origin", origin],
    ["Destination", destination ? escapeHtml(destination) : "—"],
    ["Estimated delivery", formatDate(shipment.estimatedDelivery)],
    ["Status", escapeHtml(shipment.statusLabel)],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 0; color:#6b7280;">${label}</td><td style="padding:6px 0; text-align:right;">${value}</td></tr>`
    )
    .join("");

  await resend.emails.send({
    from: FROM,
    to,
    subject: `Your shipment is confirmed — tracking number ${shipment.trackingNumber}`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937; background-color: #f8fafc; padding: 24px;">
        <div style="background: #0b1a30; padding: 28px 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 0.3px;">Carters Logistics</h1>
          <p style="color: #f97316; margin: 6px 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px;">Shipment Confirmation</p>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-top: none; padding: 28px 24px; border-radius: 0 0 12px 12px;">
          <p style="margin: 0 0 16px; font-size: 15px;">Hello${hello},</p>
          <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6;">Good news — your shipment has been booked and is now ready to track. Please keep your tracking number safe and use it to follow your package's journey in real time.</p>
          <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 10px; padding: 18px; text-align: center; margin-bottom: 20px;">
            <p style="margin: 0 0 6px; font-size: 12px; color: #9a3412; text-transform: uppercase; letter-spacing: 1px;">Your tracking number</p>
            <p style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #0b1a30;">${escapeHtml(shipment.trackingNumber)}</p>
          </div>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">${rows}</table>
          <a href="${trackingUrl}" style="display: block; background: #f97316; color: #ffffff; text-decoration: none; text-align: center; padding: 14px; border-radius: 10px; font-weight: bold; margin-top: 22px;">Track My Shipment</a>
          <p style="margin: 18px 0 0; font-size: 12px; color: #9ca3af; line-height: 1.6;">If you have any questions, reply to this email or contact our support team at <a href="mailto:support@carterslogistic.com" style="color: #f97316; text-decoration: none;">support@carterslogistic.com</a>.</p>
        </div>
        <p style="text-align: center; font-size: 12px; color: #9ca3af; margin: 16px 0 0;">© ${new Date().getFullYear()} Carters Logistics. All rights reserved.</p>
      </div>
    `,
  });
}

export async function sendShipmentNotification(
  shipment: Shipment
): Promise<void> {
  const targets: Array<{ email: string; name: string }> = [];
  if (shipment.clientEmail) {
    targets.push({ email: shipment.clientEmail, name: shipment.recipientName });
  }
  if (shipment.senderEmail) {
    targets.push({
      email: shipment.senderEmail,
      name: shipment.senderName ?? "",
    });
  }

  const seen = new Set<string>();
  const unique = targets.filter((t) => {
    const key = t.email.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  await Promise.all(
    unique.map((t) => sendTrackingEmail(t.email, shipment, t.name))
  );
}
