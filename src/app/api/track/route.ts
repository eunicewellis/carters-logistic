import { NextRequest, NextResponse } from "next/server";
import { getShipments } from "@/lib/store";
import { normalizeTrackingNumber } from "@/lib/tracking";

function findShipment(number: string) {
  return async () => {
    const shipments = await getShipments();
    const match = shipments.find(
      (s) => normalizeTrackingNumber(s.trackingNumber) === number
    );
    return match;
  };
}

export async function GET(req: NextRequest) {
  const number = normalizeTrackingNumber(
    req.nextUrl.searchParams.get("number") ?? ""
  );
  if (!number) {
    return NextResponse.json(
      { error: "Please enter a tracking number." },
      { status: 400 }
    );
  }
  const shipment = await findShipment(number)();
  if (!shipment) {
    return NextResponse.json(
      { error: "No shipment found with that tracking number." },
      { status: 404 }
    );
  }
  return NextResponse.json({ shipment });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const number = normalizeTrackingNumber(
    typeof body.trackingNumber === "string" ? body.trackingNumber : ""
  );
  if (!number) {
    return NextResponse.json(
      { error: "Please enter a tracking number." },
      { status: 400 }
    );
  }
  const shipment = await findShipment(number)();
  if (!shipment) {
    return NextResponse.json(
      { error: "No shipment found with that tracking number." },
      { status: 404 }
    );
  }
  return NextResponse.json({ shipment });
}
