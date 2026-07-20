import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { posts } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "בלוג ותובנות - סושיאל, מיתוג ו-GSO",
  description:
    "מדריכים ותובנות מקצועיות על ניהול סושיאל, מיתוג דיגיטלי, הפקת וידאו ו-GSO - הדרך להיכנס לתשובות של מנועי הבינה המלאכותית.",
  alternates: { canonical: "/blog" },
};

const crumbs = [
  { name: "בית", href: "/" },
  { name: "בלוג", href: "/blog" },
];

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        kicker="Insights"
        title="בלוג ותובנות"
        answer="מדריכים ותובנות מקצועיות על סושיאל, מיתוג דיגיטלי, וידאו ו-GSO - כתובים כדי לעזור לכם, וגם כדי שמנועי AI יוכלו לצטט אותם."
        crumbs={crumbs}
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((p) => (
            <article key={p.slug} className="group flex flex-col rounded-brand border border-ink/10 p-8 transition-all hover:-translate-y-1 hover:border-pink">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                <span className="text-pink">{p.category}</span>
                <span aria-hidden="true">·</span>
                <span>{p.readingTime}</span>
              </div>
              <h2 className="mt-4 text-2xl font-extrabold leading-snug">
                <Link href={`/blog/${p.slug}`} className="hover:text-pink">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 leading-relaxed text-gray-500">{p.excerpt}</p>
              <Link href={`/blog/${p.slug}`} className="mt-6 inline-flex items-center gap-1.5 font-bold text-ink group-hover:text-pink">
                לקריאה
                <span aria-hidden="true">←</span>
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
