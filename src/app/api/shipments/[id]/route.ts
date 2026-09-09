import { NextRequest, NextResponse } from "next/server";
import { getShipments, saveShipments } from "@/lib/store";
import { isFile, saveUploadedImage } from "@/lib/uploads";
import type { Shipment, StatusCode } from "@/types";

export const dynamic = "force-dynamic";

const VALID_STATUSES: StatusCode[] = [
  "order_created",
  "picked_up",
  "in_transit",
  "out_for_delivery",
  "delivered",
];

type RouteContext = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const shipments = await getShipments();
  const shipment = shipments.find((s) => s.id === params.id);
  if (!shipment) {
    return NextResponse.json({ error: "Shipment not found." }, { status: 404 });
  }
  return NextResponse.json({ shipment });
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const shipments = await getShipments();
    const index = shipments.findIndex((s) => s.id === params.id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Shipment not found." },
        { status: 404 }
      );
    }

    const existing = shipments[index];
    const formData = await req.formData();

    const productName = String(formData.get("productName") ?? "").trim();
    if (!productName) {
      return NextResponse.json(
        { error: "Product name is required." },
        { status: 400 }
      );
    }

    // Image handling — keep existing unless a new file/URL is provided.
    let productImage = existing.productImage;
    const file = formData.get("productImage");
    if (isFile(file) && file.size > 0) {
      productImage = await saveUploadedImage(file);
    } else {
      const url = String(formData.get("productImageUrl") ?? "").trim();
      if (url) productImage = url;
    }
    const clearImage = String(formData.get("clearImage") ?? "") === "1";
    if (clearImage) productImage = null;

    const rawStatus = String(formData.get("statusCode") ?? existing.statusCode);
    const statusCode: StatusCode = VALID_STATUSES.includes(
      rawStatus as StatusCode
    )
      ? (rawStatus as StatusCode)
      : existing.statusCode;

    const updated: Shipment = {
      ...existing,
      productName,
      productImage,
      recipientName: String(formData.get("recipientName") ?? "").trim(),
      clientEmail:
        String(formData.get("clientEmail") ?? "").trim() ||
        existing.clientEmail,
      senderName:
        String(formData.get("senderName") ?? "").trim() || undefined,
      senderEmail:
        String(formData.get("senderEmail") ?? "").trim() || undefined,
      senderAddress:
        String(formData.get("senderAddress") ?? "").trim() || undefined,
      origin: String(formData.get("origin") ?? "").trim(),
      destinationAddress: String(
        formData.get("destinationAddress") ?? ""
      ).trim(),
      destinationCity: String(formData.get("destinationCity") ?? "").trim(),
      destinationState: String(formData.get("destinationState") ?? "").trim(),
      destinationZip: String(formData.get("destinationZip") ?? "").trim(),
      statusCode,
      statusLabel:
        String(formData.get("statusLabel") ?? "").trim() || existing.statusLabel,
      description: String(formData.get("description") ?? "").trim(),
      estimatedDelivery: String(
        formData.get("estimatedDelivery") ?? ""
      ).trim(),
      notes: String(formData.get("notes") ?? "").trim(),
      updatedAt: new Date().toISOString(),
    };

    shipments[index] = updated;
    await saveShipments(shipments);

    return NextResponse.json({ shipment: updated });
  } catch (err) {
    console.error("Failed to update shipment:", err);
    const message =
      err instanceof Error
        ? err.message
        : "Something went wrong while updating the shipment.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const shipments = await getShipments();
  const filtered = shipments.filter((s) => s.id !== params.id);
  if (filtered.length === shipments.length) {
    return NextResponse.json({ error: "Shipment not found." }, { status: 404 });
  }
  await saveShipments(filtered);
  return NextResponse.json({ ok: true });
}
