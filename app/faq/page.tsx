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
    q: "מה קורה אם נרצה להפסיק את ההתקשרות?",
    a: "אנחנו עובדים בגאנט חודשי בלי נעילה ארוכת טווח. כשמגיע הרגע לעצור, מספיקה הודעה מראש, ואנחנו מעבירים אליכם את כל מה שנבנה - גישות, קבצים ונתוני ביצועים - בצורה מסודרת.",
  },
  {
    q: "מה בדיוק כלול בניהול הסושיאל, ומה לא?",
    a: "ניהול הסושיאל כולל אסטרטגיה, עיצוב, כתיבה, סטוריז ותזמון פרסום. קמפיינים ממומנים, הפקת וידאו מורחבת וכתיבת ניוזלטרים הן תוספות נפרדות שאפשר לשלב לפי הצורך, כך שתמיד ברור מה כלול ומה דורש תיאום נוסף.",
  },
  {
    q: "יש לכם ניסיון עם עסקים בתחום שלי?",
    a: "בכל פרויקט חדש אנחנו מתחילים משיחת היכרות מעמיקה עם העסק - הקהל, השפה והמתחרים שלו - גם אם זו הפעם הראשונה שאנחנו עובדים בתחום הספציפי. ההיכרות הזו היא מה שמאפשר לנו לבנות תוכן שמדבר בדיוק לקהל שלכם.",
  },
  {
    q: "מה קורה אם מישהו כותב תגובה שלילית על העסק?",
    a: "אנחנו לא מוחקים תגובות באופן אוטומטי. אנחנו עוקבים אחרי התגובות, מגיבים במקצועיות כשנדרש ומעדכנים אתכם מיד אם עולה משהו שדורש התייחסות אישית שלכם.",
  },
  {
    q: "כל כמה זמן אני מקבל עדכון או דוח ביצועים?",
    a: "אתם מקבלים דוח ביצועים ברור מדי חודש, לצד תקשורת שוטפת מול איש קשר קבוע שמכיר את העסק שלכם.",
  },
  {
    q: "מי הבעלים של התוכן והעמודים שלנו?",
    a: "אתם. העמודים, הסיסמאות והתוכן שמופק עבורכם שייכים לעסק שלכם מהיום הראשון - אנחנו מתווספים כמנהלים, לא כבעלים. אם בשלב כלשהו תרצו לעצור, אנחנו מעבירים הכל בצורה מסודרת: גישות, קבצים ונתוני ביצועים.",
  },
  ...homeFaqs,
];

const faqSections = services.filter((s) => s.slug !== "newsletters");

// Collect every FAQ across the site for a single, comprehensive FAQPage.
const allFaqs: FAQ[] = [...generalFaqs, ...faqSections.flatMap((s) => s.faqs)];

export const metadata: Metadata = {
  title: "שאלות נפוצות על ניהול סושיאל ווידאו",
  description:
    "תשובות ישירות לשאלות הנפוצות על ניהול סושיאל, הפקת וידאו, קמפיינים ממומנים ותהליך העבודה עם נמר סושיאל.",
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
        variant="pink"
      />

      <Section>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-extrabold">כללי ותהליך עבודה</h2>
          <div className="mt-6">
            <Faq items={generalFaqs} />
          </div>

          {faqSections.map((s) => (
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
