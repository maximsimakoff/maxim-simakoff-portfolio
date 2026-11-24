import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  icons: { icon: `${process.env.NEXT_PUBLIC_PORTFOLIO_BASE_PATH ?? ""}/favicon.svg` }
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
