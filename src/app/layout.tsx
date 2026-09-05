import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Carters Logistics | Shipping, Consignment & Package Tracking",
    template: "%s | Carters Logistics",
  },
  description:
    "Carters Logistics is a USA-based consignment and freight company offering reliable shipping, warehousing, and real-time package tracking for individuals and businesses.",
  keywords: [
    "logistics",
    "shipping",
    "consignment",
    "package tracking",
    "freight",
    "Carters Logistics",
    "USA",
  ],
  metadataBase: new URL("https://carterslogistics.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
