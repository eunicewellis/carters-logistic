// Shared domain types for Carters Logistics

export type StatusCode =
  | "order_created"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered";

export interface Shipment {
  id: string;
  trackingNumber: string;
  productName: string;
  productImage: string | null; // path (e.g. /api/uploads/...) or full URL
  recipientName: string;
  clientEmail?: string;
  origin: string;
  destinationAddress: string;
  destinationCity: string;
  destinationState: string;
  destinationZip: string;
  statusCode: StatusCode;
  statusLabel: string; // editable display text, e.g. "In Transit"
  description?: string;
  estimatedDelivery?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StatusStep {
  key: StatusCode;
  label: string;
}

export interface SiteSettings {
  companyName: string;
  companyEmail: string;
  contactCtaText: string;
  trackingTitle: string;
  trackingSubtitle: string;
  statusSteps: StatusStep[];
}

export interface AdminRecord {
  salt: string;
  passwordHash: string;
}

