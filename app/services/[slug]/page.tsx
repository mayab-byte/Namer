import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { services, getService } from "@/lib/content";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.answer,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | נמר סושיאל`,
      description: service.answer,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const crumbs = [
    { name: "בית", href: "/" },
    { name: "שירותים", href: "/services" },
    { name: service.title, href: `/services/${service.slug}` },
  ];
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd data={[serviceSchema(service), faqSchema(service.faqs), breadcrumbSchema(crumbs)]} />

      <PageHero kicker={service.kicker} title={service.title} answer={service.answer} crumbs={crumbs} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          {/* What's included */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold">מה כולל השירות</h2>
            <ul className="mt-6 space-y-3">
              {service.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-pink" aria-hidden="true" />
                  <span className="leading-relaxed text-gray-700">{b}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-14 text-2xl font-extrabold">איך זה עובד</h2>
            <ol className="mt-6 space-y-5">
              {service.steps.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-lg font-bold">{step.title}</p>
                    <p className="mt-1 leading-relaxed text-gray-500">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Sidebar: other services (internal linking, no orphans) */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-brand border border-ink/10 bg-gray-50 p-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">שירותים נוספים</h2>
              <ul className="mt-4 space-y-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/services/${o.slug}`} className="flex items-center justify-between gap-2 font-semibold hover:text-pink">
                      {o.title}
                      <span aria-hidden="true" className="text-pink">←</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-pink mt-6 w-full">
                לתיאום שיחה
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-gray-50">
        <h2 className="display text-4xl sm:text-5xl">שאלות נפוצות</h2>
        <div className="mt-10 max-w-3xl">
          <Faq items={service.faqs} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
