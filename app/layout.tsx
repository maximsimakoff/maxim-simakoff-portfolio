import type { Metadata } from "next";
import "./globals.css";

import { portfolioContent } from "@/content/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: `${portfolioContent.person.name} | Interactive Resume`,
    template: `%s | ${portfolioContent.person.name}`
  },
  description: portfolioContent.meta.description,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }]
  },
  openGraph: {
    title: `${portfolioContent.person.name} | Interactive Resume`,
    description: portfolioContent.meta.description,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioContent.person.name} | Portfolio`,
    description: portfolioContent.meta.description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
