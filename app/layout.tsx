import type { Metadata } from "next";
import { Heebo, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { site, siteUrl } from "@/lib/site";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — סוכנות סושיאל, וידאו וקידום`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "ניהול סושיאל",
    "סוכנות סושיאל",
    "הפקת וידאו לרשתות",
    "קמפיינים ממומנים",
    "GSO",
    "אסטרטגיית תוכן",
    "מיתוג דיגיטלי",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — סוכנות סושיאל, וידאו וקידום`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — סוכנות סושיאל, וידאו וקידום`,
    description: site.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${bodoni.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          דילוג לתוכן
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
