import {
  Boxes,
  Globe2,
  Plane,
  Ship,
  Truck,
  Warehouse,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    icon: Boxes,
    title: "Consignment Shipping",
    description:
      "End-to-end consignment handling with real-time tracking, secure packaging, and dependable delivery across the USA.",
  },
  {
    icon: Truck,
    title: "Ground Freight",
    description:
      "Cost-effective LTL and FTL ground transportation for pallets, furniture, and oversized cargo nationwide.",
  },
  {
    icon: Plane,
    title: "Air Freight",
    description:
      "Expedited air cargo services for time-sensitive shipments with same-week delivery to major U.S. hubs.",
  },
  {
    icon: Ship,
    title: "Ocean Freight",
    description:
      "International sea freight with customs clearance support and seamless hand-off to domestic carriers.",
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description:
      "Secure, climate-controlled storage facilities with inventory management and fulfillment services.",
  },
  {
    icon: Globe2,
    title: "Last-Mile Delivery",
    description:
      "White-glove final-mile delivery with scheduling, door-to-door service, and proof of delivery.",
  },
];
