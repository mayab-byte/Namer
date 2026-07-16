import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { WorkCard } from "@/components/WorkCard";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { works } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "עבודות — מותגים שלקחנו קדימה",
  description:
    "פרויקטים נבחרים של נמר סושיאל: ניהול סושיאל, הפקת וידאו וקמפיינים שהביאו תוצאות מדידות למותגים בתחומי לייפסטייל, נדל\"ן, בריאות ופרימיום.",
  alternates: { canonical: "/works" },
};

const crumbs = [
  { name: "בית", href: "/" },
  { name: "עבודות", href: "/works" },
];

export default function WorksPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        kicker="Selected work"
        title="עסקים שלקחנו קדימה."
        answer="אוסף פרויקטים נבחרים שבהם שילבנו אסטרטגיה, תוכן, וידאו וקמפיינים כדי לבנות נוכחות מותגית שמביאה תוצאות מדידות."
        crumbs={crumbs}
        variant="darkPattern"
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {works.map((w) => (
            <WorkCard key={w.slug} work={w} />
          ))}
        </div>
      </Section>

      <CtaBand title="רוצים להיות הפרויקט הבא?" text="ספרו לנו על העסק שלכם ונבנה יחד נוכחות שאי אפשר להתעלם ממנה." />
    </>
  );
}
