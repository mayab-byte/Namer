import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 * - output: "export"      → builds a fully static site into ./out (no server)
 * - basePath / assetPrefix → the site is served under /<repo> on github.io
 * - images.unoptimized     → required for export (no image optimizer at runtime)
 *
 * The GitHub Actions workflow sets NEXT_PUBLIC_BASE_PATH=/Namer at build time.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
