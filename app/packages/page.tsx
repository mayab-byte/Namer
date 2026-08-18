import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Mascot } from "@/components/Mascot";
import { PackagesTable } from "@/components/PackagesTable";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { packages, packageFeatures } from "@/lib/content";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import type { FAQ } from "@/lib/content";

export const metadata: Metadata = {
  title: "חבילות ניהול סושיאל לעסקים",
  description:
    "חבילות ניהול הסושיאל של נמר סושיאל: משלוש רמות שירות - Social Boost, Social Premium ו-Social Premium Plus. בוחרים לפי השלב שבו העסק נמצא.",
  alternates: { canonical: "/packages" },
};

const crumbs = [
  { name: "בית", href: "/" },
  { name: "חבילות", href: "/packages" },
];

const packageFaqs: FAQ[] = [
  {
    q: "כמה עולה ניהול סושיאל לעסק?",
    a: "המחיר נקבע לפי היקף השירות: כמות התכנים, פלטפורמות, קידום ממומן וליווי אסטרטגי. אנחנו מתאימים חבילה לשלב שבו העסק נמצא - מהתנעה ועד צמיחה מלאה עם קידום ממומן.",
  },
  {
    q: "אפשר לשדרג חבילה תוך כדי?",
    a: "בהחלט. הרבה עסקים מתחילים ב-Social Boost ומשדרגים ל-Premium או Premium Plus ככל שהנוכחות גדלה. המעבר חלק ובלי לאבד רצף.",
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
        answer="נמר סושיאל מציעה שלוש רמות ניהול סושיאל - מהתנעה עם נוכחות מקצועית ועקבית, ועד צמיחה מלאה עם קידום ממומן. בוחרים לפי המטרות והשלב שבו העסק נמצא."
        crumbs={crumbs}
      />

      <Section>
        <PackagesTable tiers={packages} rows={packageFeatures} />
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
