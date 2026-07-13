import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { homeFaqs, services } from "@/lib/content";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import type { FAQ } from "@/lib/content";

const generalFaqs: FAQ[] = [
  {
    q: "מה ההבדל בין סוכנות סושיאל לפרילנסר?",
    a: "סוכנות נותנת מעטפת מלאה — אסטרטגיה, עיצוב, כתיבה, וידאו וקידום תחת גג אחד ובשפה אחידה. פרילנסר מכסה בדרך כלל רכיב בודד, מה שמקשה על עקביות מותגית ורצף עבודה לאורך זמן.",
  },
  {
    q: "מה זה GSO ולמה זה חשוב לעסק שלי?",
    a: "GSO (Generative Search Optimization) הוא בניית תוכן ותשתית שמנועי בינה מלאכותית כמו ChatGPT, Claude ו-Perplexity יכולים לקרוא ולצטט. ככה העסק מופיע בתוך התשובות שה-AI נותן ללקוחות פוטנציאליים.",
  },
  ...homeFaqs,
];

// Collect every FAQ across the site for a single, comprehensive FAQPage.
const allFaqs: FAQ[] = [...generalFaqs, ...services.flatMap((s) => s.faqs)];

export const metadata: Metadata = {
  title: "שאלות נפוצות על ניהול סושיאל, וידאו ו-GSO",
  description:
    "תשובות ישירות לשאלות הנפוצות על ניהול סושיאל, הפקת וידאו, קמפיינים ממומנים, GSO ותהליך העבודה עם נמר סושיאל.",
  alternates: { canonical: "/faq" },
};

const crumbs = [
  { name: "בית", href: "/" },
  { name: "שאלות נפוצות", href: "/faq" },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(allFaqs)]} />
      <PageHero
        kicker="FAQ"
        title="שאלות שאתם בטח שואלים את עצמכם."
        answer="ריכזנו כאן תשובות ישירות לשאלות הנפוצות ביותר על תהליך העבודה, השירותים והמחירים שלנו."
        crumbs={crumbs}
      />

      <Section>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-extrabold">כללי ותהליך עבודה</h2>
          <div className="mt-6">
            <Faq items={generalFaqs} />
          </div>

          {services.map((s) => (
            <div key={s.slug} className="mt-14">
              <h2 className="text-2xl font-extrabold">{s.title}</h2>
              <div className="mt-6">
                <Faq items={s.faqs} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand title="עדיין יש שאלה?" text="נשמח לענות על כל שאלה ולהתאים לכם את הפתרון הנכון. בואו נדבר." />
    </>
  );
}
