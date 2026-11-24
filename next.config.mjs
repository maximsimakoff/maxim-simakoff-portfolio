import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const exportTarget = process.env.PORTFOLIO_STATIC_EXPORT;
const basePath = exportTarget === "pages" ? "/maxim-simakoff-portfolio" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(exportTarget === "pages" || exportTarget === "domain"
    ? { output: "export", trailingSlash: true }
    : {}),
  basePath,
  env: { NEXT_PUBLIC_PORTFOLIO_BASE_PATH: basePath },
  devIndicators: false,
  outputFileTracingRoot: projectRoot,
  reactStrictMode: true,
  turbopack: {
    root: projectRoot
  }
};

export default nextConfig;
