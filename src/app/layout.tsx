import type { Metadata } from "next";
import localFont from "next/font/local";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import LenisSmoothScroll from "@/components/Lenis";

// Google Font — Red Hat Display
const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat",
  display: "swap",
});

// Local Serif Font — IvyMode
const ivyMode = localFont({
  src: "./fonts/IvyMode-Regular.woff2",
  variable: "--font-ivy",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Origin Realty | Premium Real Estate & Land Investments in India",
  description:
    "Origin Realty specializes in premium land parcels, plotted developments, and long-term real estate investments across India. Discover strategically located properties with high growth potential.",
  keywords: [
    "Origin Realty",
    "real estate investment India",
    "premium land parcels",
    "plotted development",
    "real estate projects India",
    "land investment",
    "property developer India",
  ],
  authors: [{ name: "Origin Realty" }],
  creator: "Origin Realty",
  publisher: "Origin Realty",
  metadataBase: new URL("https://originrealty.in"), 
  openGraph: {
    title: "Origin Realty | Premium Real Estate & Land Investments",
    description:
      "Invest in high-potential land and plotted developments with Origin Realty. Trusted real estate opportunities across India.",
    url: "https://originrealty.in",
    siteName: "Origin Realty",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Origin Realty – Premium Real Estate Investments",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Origin Realty | Premium Real Estate Investments",
    description:
      "Premium land and plotted real estate investments with long-term growth potential.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`
          ${redHatDisplay.variable}
          ${ivyMode.variable}
          antialiased
        `}
      >
        <LenisSmoothScroll />
        {children}
      </body>
    </html>
  );
}
