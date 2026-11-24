import type { Metadata } from "next";

const siteOrigin = "https://max.simakoff.com";
const shareImage = {
  url: `${siteOrigin}/workstation-share.jpg`,
  type: "image/jpeg",
  width: 1200,
  height: 630,
  alt: "A beige vintage computer displaying green MS initials against a lavender background."
};

export function getSharingMetadata(
  path: "/" | "/resume/",
  title: string,
  description: string
): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const canonical = `${siteOrigin}${path}`;

  return {
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      images: [shareImage]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: shareImage.url, alt: shareImage.alt }]
    }
  };
}
