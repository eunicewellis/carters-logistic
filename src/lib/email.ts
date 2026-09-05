import { Resend } from "resend";
import type { Shipment } from "@/types";

export async function sendTrackingEmail(
  to: string,
  shipment: Shipment
): Promise<void> {
  if (!to) return;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping tracking email.");
    return;
  }

  const resend = new Resend(apiKey);
  const from =
    process.env.EMAIL_FROM || "Carters Logistics <onboarding@resend.dev>";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://carterslogistic.com";
  const trackingUrl = `${siteUrl}/track?number=${shipment.trackingNumber}`;
  const destination = [
    shipment.destinationAddress,
    shipment.destinationCity,
    shipment.destinationState,
    shipment.destinationZip,
  ]
    .filter(Boolean)
    .join(", ");

  await resend.emails.send({
    from,
    to,
    subject: `Your shipment is confirmed — tracking number ${shipment.trackingNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1f2937;">
        <div style="background:#0b1a30; padding:24px; border-radius:12px 12px 0 0;">
          <h1 style="color:#ffffff; margin:0; font-size:20px;">Carters Logistics</h1>
          <p style="color:#f97316; margin:4px 0 0; font-size:13px;">Shipment Confirmation</p>
        </div>
        <div style="border:1px solid #e5e7eb; border-top:none; padding:24px; border-radius:0 0 12px 12px;">
          <p style="margin:0 0 16px;">Hello${shipment.recipientName ? ` ${shipment.recipientName}` : ""},</p>
          <p style="margin:0 0 16px;">Your shipment has been booked. Use the tracking number below to follow its progress.</p>
          <div style="background:#fff7ed; border:1px solid #fed7aa; border-radius:10px; padding:16px; text-align:center; margin-bottom:16px;">
            <p style="margin:0 0 6px; font-size:12px; color:#9a3412; text-transform:uppercase; letter-spacing:1px;">Your tracking number</p>
            <p style="margin:0; font-size:22px; font-weight:bold; letter-spacing:2px; color:#0b1a30;">${shipment.trackingNumber}</p>
          </div>
          <table style="width:100%; font-size:14px; border-collapse:collapse;">
            <tr><td style="padding:6px 0; color:#6b7280;">Product</td><td style="padding:6px 0; text-align:right;">${shipment.productName}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Shipping to</td><td style="padding:6px 0; text-align:right;">${destination || "—"}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Status</td><td style="padding:6px 0; text-align:right;">${shipment.statusLabel}</td></tr>
          </table>
          <a href="${trackingUrl}" style="display:block; background:#f97316; color:#ffffff; text-decoration:none; text-align:center; padding:14px; border-radius:10px; font-weight:bold; margin-top:20px;">Track My Shipment</a>
          <p style="margin:16px 0 0; font-size:12px; color:#9ca3af;">Questions? Just reply to this email or contact our customer care team.</p>
        </div>
      </div>
    `,
  });
}
