import type { Metadata } from "next";
import Script from "next/script";
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
    "Carters Logistics is a worldwide consignment and freight company offering reliable shipping, warehousing, and real-time package tracking for individuals and businesses.",
  keywords: [
    "logistics",
    "shipping",
    "consignment",
    "package tracking",
    "freight",
    "Carters Logistics",
    "worldwide",
  ],
  metadataBase: new URL("https://carterslogistic.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen font-sans">
        {children}
        <Script id="smartsupp-chat" strategy="afterInteractive">
          {`var _smartsupp = _smartsupp || {};
_smartsupp.key = '4ff3eb5e87e332e1d022c3c3a9f7f26b6544c3c6';
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
  c.type='text/javascript';c.charset='utf-8';c.async=true;
  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);`}
        </Script>
        <noscript>
          Powered by{" "}
          <a href="https://www.smartsupp.com" target="_blank" rel="noreferrer">
            Smartsupp
          </a>
        </noscript>
      </body>
    </html>
  );
}
