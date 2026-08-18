/**
 * Central site configuration — a single source of truth for brand name,
 * URL, contact details, navigation and social profiles.
 *
 * NOTE: contact details, address and phone are placeholders taken from the
 * design mockups. Replace them with real values before launch — they also
 * feed the Organization JSON-LD (GSO commandments #4 and #9: NAP consistency).
 */

/**
 * Base path the site is served under. Empty in local dev; set to "/Namer" by
 * the GitHub Pages workflow (the site lives at github.io/<repo>).
 */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

/**
 * Absolute site URL (origin + basePath). Used for canonical links, sitemap,
 * robots and JSON-LD. Override via NEXT_PUBLIC_SITE_URL for the real domain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://mayab-byte.github.io/Namer"
).replace(/\/$/, "");

/** Prefix a public asset path with the basePath (for metadata/manifest icons). */
export const asset = (path: string) => `${basePath}${path.startsWith("/") ? "" : "/"}${path}`;

export const site = {
  name: "Namer Social",
  nameHe: "נמר סושיאל",
  legalName: "Namer Social",
  tagline: "Strategic Social Agency",
  taglineHe: "סוכנות סושיאל אסטרטגית",
  description:
    "נמר סושיאל היא סוכנות בוטיק לניהול סושיאל והפקת וידאו, שבונה לעסקים נוכחות דיגיטלית שנראית כמו מותג אמיתי - שילוב של אסטרטגיה, תוכן, וידאו וקמפיינים ממוקדי תוצאות.",
  url: siteUrl,
  locale: "he_IL",
  contact: {
    email: "hello@namersocial.co.il",
    phone: "+972-50-123-4567",
    phoneDisplay: "050-123-4567",
    address: {
      street: "שדרות רוטשילד 42",
      city: "תל אביב",
      country: "IL",
    },
  },
  socials: {
    instagram: "https://www.instagram.com/namersocial",
    facebook: "https://www.facebook.com/namersocial",
    linkedin: "https://www.linkedin.com/company/namersocial",
    tiktok: "https://www.tiktok.com/@namersocial",
    youtube: "https://www.youtube.com/@namersocial",
  },
} as const;

/** Social profile URLs as an array — used for schema.org `sameAs`. */
export const sameAs = Object.values(site.socials);

/** Primary navigation (multi-page, hub-and-spoke architecture). */
export const nav: { href: string; label: string }[] = [
  { href: "/", label: "בית" },
  { href: "/services", label: "שירותים" },
  { href: "/works", label: "עבודות" },
  { href: "/about", label: "מי אנחנו" },
  { href: "/packages", label: "חבילות" },
  { href: "/blog", label: "בלוג" },
  { href: "/faq", label: "שאלות נפוצות" },
  { href: "/contact", label: "צור קשר" },
];
