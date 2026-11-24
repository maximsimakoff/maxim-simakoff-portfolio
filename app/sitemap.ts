import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/sharing-metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteOrigin}/` }, { url: `${siteOrigin}/resume/` }];
}
