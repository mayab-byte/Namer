import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { Stats } from "@/components/Stats";
import { TigerAnim } from "@/components/TigerAnim";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { methodology } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "מי אנחנו - סוכנות שהופכת לשותפה שלכם",
  description:
    "נמר סושיאל היא סוכנות סושיאל ווידאו שהופכת להיות שותפה של העסק. אנחנו מתחילים מלהכיר אתכם לעומק כדי לבנות מותג שנראה כמו מותג אמיתי.",
  alternates: { canonical: "/about" },
};

const crumbs = [
  { name: "בית", href: "/" },
  { name: "מי אנחנו", href: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        kicker="Why it feels different"
        title="אנחנו לא רק הסוכנות. אנחנו שותפים לדרך."
        answer={
          <>
            נמר סושיאל היא סוכנות סושיאל ווידאו שבונה לעסקים נוכחות דיגיטלית שנראית כמו מותג אמיתי.
            <br />
            במקום להיות ספק חיצוני, אנחנו הופכים לשותפים - וזה מתחיל מלהכיר אתכם באמת.
          </>
        }
        crumbs={crumbs}
        variant="dark"
        mascotMedia={
          <TigerAnim src="/mascot/story-partners.mp4" poster="/mascot/story-partners-poster.webp" size={280} />
        }
      />

      <Section>
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-gray-700">
          <p>
            אנחנו לא יודעים להיות רק הסוכנות. אנחנו הופכים להיות שותפים שלכם לדרך,
            והשלב הראשון הוא להבין איך אתם חושבים, מה משגע אתכם, מה אתם לא מוכנים
            לעשות גם אם כולם עושים, מה אתם שומעים מלקוחות שוב ושוב, ועל מה אתם
            יכולים לדבר שעה בלי להסתכל על השעון.
          </p>
          <p>
            בשלב מסוים אנחנו כבר לא צריכים לשאול הרבה - אנחנו כבר יודעים איך הייתם
            עונים. זאת הנקודה שאנחנו מחפשים להגיע אליה. כי רק כשמכירים עסק באמת,
            אפשר לגרום גם לעוד אנשים להכיר אותו.
          </p>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-gray-50">
        <SectionHeading kicker="Brand personality" title="איך המותג שלנו עובד" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Modern", d: "עיצוב מינימליסטי ונקי, טיפוגרפיה חזקה ושפה עדכנית." },
            { t: "Bold", d: "מסרים קצרים וברורים, בלי לפחד לבלוט בתוך פיד עמוס." },
            { t: "Expert", d: "תחושת מומחיות מקצועית שנשענת על אסטרטגיה, לא על ניחוש." },
            { t: "Premium", d: "שימוש בחלל לבן ותשומת לב לפרטים שנותנים תחושת מותג יוקרתי." },
            { t: "Dynamic", d: "גרידים ותנועה - נראות שמרגישה חיה ומתחדשת." },
            { t: "Partner", d: "שותפות אמיתית: אנחנו לומדים את העסק לעומק לפני שאנחנו יוצרים." },
          ].map((v) => (
            <div key={v.t} className="rounded-brand border border-ink/10 bg-paper p-6">
              <h3 className="font-serif text-2xl font-bold text-pink">{v.t}</h3>
              <p className="mt-3 leading-relaxed text-gray-500">{v.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Methodology */}
      <Section dark>
        <SectionHeading kicker={methodology.kicker} title={methodology.title} intro={methodology.subtitle} dark />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {methodology.steps.map((step) => (
            <div key={step.n} className="rounded-brand border border-white/10 bg-gray-900 p-6">
              <span className="text-3xl font-extrabold text-pink">{step.n}</span>
              <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.he}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-brand bg-gray-50 p-8 sm:p-12">
          <Stats cols={4} color="ink" />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
