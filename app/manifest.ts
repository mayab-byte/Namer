import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Required for `output: export` (static generation).
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — סוכנות סושיאל`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#ff20bf",
    lang: "he",
    dir: "rtl",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/logo.png", sizes: "640x160", type: "image/png" },
    ],
  };
}
