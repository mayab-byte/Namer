import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ServicesGrid } from "@/components/ServicesGrid";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { services, processSteps } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "שירותים - סושיאל, וידאו, קמפיינים וניוזלטרים",
  description:
    "השירותים של נמר סושיאל: ניהול סושיאל, הפקת וידאו לרשתות, קמפיינים ממומנים וקידום GSO, וכתיבת ניוזלטרים - מעטפת מותג מלאה תחת גג אחד.",
  alternates: { canonical: "/services" },
};

const crumbs = [
  { name: "בית", href: "/" },
  { name: "שירותים", href: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        kicker="Services"
        title="שירותים"
        answer="נמר סושיאל מציעה מעטפת מותג מלאה: ניהול סושיאל, הפקת וידאו לרשתות, קמפיינים ממומנים וקידום GSO, וכתיבת ניוזלטרים. כל שירות עומד בפני עצמו ומשתלב לשפה מותגית אחת."
        crumbs={crumbs}
        variant="lime"
        mascot="head"
      />

      <Section>
        <ServicesGrid services={services} />
      </Section>

      {/* Process */}
      <Section className="bg-gray-50">
        <p className="kicker font-serif">Process</p>
        <h2 className="display mt-3 text-4xl sm:text-5xl">איך נראה תהליך העבודה שלנו</h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <div key={step.n} className="rounded-brand border border-ink/10 bg-paper p-6">
              <span className="text-3xl font-extrabold text-pink">{step.n}</span>
              <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
