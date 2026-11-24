import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { getSharingMetadata } from "@/lib/sharing-metadata";
import "./globals.css";

const geist = localFont({
  src: "../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap"
});

const geistMono = localFont({
  src: "../node_modules/next/dist/next-devtools/server/font/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false
});

const title = "Maxim Simakoff | Engineering Portfolio";
const description = "Selected software projects and experience from Maxim Simakoff, AI Engineer at Tribe Capital and Forward Deployed Engineer at SmartStart Education.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | Maxim Simakoff" },
  description,
  icons: { icon: `${process.env.NEXT_PUBLIC_PORTFOLIO_BASE_PATH ?? ""}/favicon.svg` },
  ...getSharingMetadata("/", title, description)
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f8f7f2"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
