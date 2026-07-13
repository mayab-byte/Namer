import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Required for `output: export` (static generation).
export const dynamic = "force-static";

/**
 * robots.txt (GSO commandment #3 — open the door to generative bots).
 * Explicitly welcomes the major AI crawlers alongside classic search engines.
 */
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "Bytespider",
    "Amazonbot",
    "cohere-ai",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiBots.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
