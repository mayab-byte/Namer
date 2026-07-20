import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Mascot } from "@/components/Mascot";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { packages } from "@/lib/content";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import type { FAQ } from "@/lib/content";

export const metadata: Metadata = {
  title: "חבילות ומחירים - ניהול סושיאל לעסקים",
  description:
    "חבילות ניהול הסושיאל של נמר סושיאל: מהתנעה עם נוכחות מקצועית ועקבית, ועד מעטפת מותג מלאה עם וידאו, קמפיינים ו-GSO. בוחרים לפי השלב שבו העסק נמצא.",
  alternates: { canonical: "/packages" },
};

const crumbs = [
  { name: "בית", href: "/" },
  { name: "חבילות", href: "/packages" },
];

const packageFaqs: FAQ[] = [
  {
    q: "כמה עולה ניהול סושיאל לעסק?",
    a: "המחיר נקבע לפי היקף השירות: כמות התכנים, הפקות וידאו, קמפיינים ממומנים וליווי אסטרטגי. אנחנו מתאימים חבילה לשלב שבו העסק נמצא - מהתנעה ועד מעטפת מלאה.",
  },
  {
    q: "אפשר לשדרג חבילה תוך כדי?",
    a: "בהחלט. הרבה עסקים מתחילים בחבילת התנעה ומשדרגים לווידאו וקמפיינים ככל שהנוכחות גדלה. המעבר חלק ובלי לאבד רצף.",
  },
  {
    q: "יש התחייבות לתקופה?",
    a: "אנחנו עובדים בגאנט חודשי. בניית מותג היא תהליך מצטבר, ולכן אנחנו ממליצים על מחויבות של כמה חודשים כדי לראות תוצאות אמיתיות - אבל התנאים המדויקים נסגרים יחד.",
  },
];

export default function PackagesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(packageFaqs)]} />
      <PageHero
        kicker="Packages"
        title="חבילות שמתאימות לשלב שלכם."
        answer="נמר סושיאל מציעה ארבע חבילות ניהול סושיאל - מהתנעה עם נוכחות מקצועית ועקבית, ועד מעטפת מותג מלאה עם וידאו, קמפיינים ו-GSO. בוחרים לפי המטרות והשלב שבו העסק נמצא."
        crumbs={crumbs}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {packages.map((p) => (
            <div
              key={p.slug}
              className={`flex flex-col rounded-brand border p-7 ${
                p.featured ? "border-pink bg-ink text-paper" : "border-ink/10 bg-paper"
              }`}
            >
              {p.featured && (
                <span className="mb-3 inline-block w-fit rounded-full bg-pink px-3 py-1 text-xs font-bold text-paper">
                  הכי פופולרי
                </span>
              )}
              <p className={`kicker font-serif ${p.featured ? "text-lime" : ""}`}>{p.nameHe}</p>
              <h2 className="mt-2 text-2xl font-extrabold">{p.name}</h2>
              <p className={`mt-3 text-sm leading-relaxed ${p.featured ? "text-gray-300" : "text-gray-500"}`}>
                {p.tagline}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <span className="text-pink" aria-hidden="true">✓</span>
                    <span className={p.featured ? "text-gray-200" : "text-gray-700"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-7 ${p.featured ? "btn-pink" : "btn-dark"} w-full`}
              >
                לפרטים והצעת מחיר
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-gray-400">
          * חבילות מותאמות אישית. הצעת מחיר סופית נבנית אחרי פגישת אפיון.
        </p>
      </Section>

      <Section className="relative bg-gray-50">
        {/* Mascot straddles the seam with the section above: paws rest on
            this section's own top edge, body rising into the white space. */}
        <div className="pointer-events-none absolute inset-x-0 -top-24 flex justify-center">
          <Mascot variant="peek" size={280} />
        </div>
        <h2 className="display text-4xl sm:text-5xl">שאלות על חבילות ומחירים</h2>
        <div className="mt-10 max-w-3xl">
          <Faq items={packageFaqs} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
