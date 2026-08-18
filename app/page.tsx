import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { HeroMarquee } from "@/components/HeroMarquee";
import { CinematicHero } from "@/components/CinematicHero";
import { StorySection } from "@/components/StorySection";
import { DepthReveal } from "@/components/DepthReveal";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { WorksCarousel } from "@/components/WorksCarousel";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { Stats } from "@/components/Stats";
import { JsonLd } from "@/components/JsonLd";
import { services, works, homeFaqs, methodology, marqueeTop, marqueeBottom } from "@/lib/content";
import { faqSchema } from "@/lib/schema";
import { asset } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      {/* ---------------------------------------------------------- Hero */}
      <CinematicHero />

      <HeroMarquee top={marqueeTop} bottom={marqueeBottom} />

      {/* ------------------------------------------------------ Services */}
      <Section>
        <ServicesShowcase services={services} />
      </Section>

      {/* ---------------------------------------------------------- Story */}
      <StorySection />

      {/* --------------------------------------------------------- Works */}
      <Section className="bg-gray-50">
        <DepthReveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading kicker="Selected work" title="עסקים שלקחנו קדימה." />
          <Link href="/works" className="btn-ghost">
            לכל העבודות
          </Link>
        </DepthReveal>
        <DepthReveal delay={0.1} className="mt-12">
          <WorksCarousel works={works} />
        </DepthReveal>
      </Section>

      {/* --------------------------------------------------- Methodology */}
      <Section dark>
        <DepthReveal>
          <SectionHeading
            kicker={methodology.kicker}
            title={methodology.title}
            intro={methodology.subtitle}
            dark
          />
        </DepthReveal>
        <DepthReveal delay={0.1} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {methodology.steps.map((step) => (
            <div key={step.n} className="rounded-brand border border-white/10 bg-gray-900 p-6">
              <span className="text-3xl font-extrabold text-pink">{step.n}</span>
              <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.he}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">{step.text}</p>
            </div>
          ))}
        </DepthReveal>
      </Section>

      {/* ---------------------------------------------------------- Stats */}
      <Section className="bg-gray-50">
        <DepthReveal>
          <Stats cols={4} />
        </DepthReveal>
      </Section>

      {/* --------------------------------------------------- Newsletter */}
      <section className="bg-lime">
        <div className="container-x grid items-center gap-8 py-16 md:grid-cols-2">
          <div>
            <p className="kicker font-serif text-ink/70">Newsletter</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">תוכן שווה, ישר לתיבה שלכם.</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/80">
              הצטרפו לניוזלטר של נמר סושיאל וקבלו אחת לכמה שבועות תובנות, טרנדים
              וטיפים בגובה העיניים - בלי הרצאות, רק דברים שבאמת עוזרים לעסק שלכם לצמוח.
            </p>
          </div>
          <form
            className="flex w-full flex-col gap-3 sm:flex-row"
            action={asset("/contact/")}
            aria-label="הרשמה לניוזלטר"
          >
            <label htmlFor="nl-email" className="sr-only">
              כתובת אימייל
            </label>
            <input
              id="nl-email"
              name="email"
              type="email"
              required
              placeholder="האימייל שלכם"
              className="w-full rounded-full border border-ink/20 bg-paper px-6 py-3.5 text-base outline-none focus:border-ink"
            />
            <button type="submit" className="btn-dark shrink-0">
              אני בפנים.
            </button>
          </form>
        </div>
      </section>

      {/* ---------------------------------------------------------- FAQ */}
      <Section>
        <DepthReveal>
          <SectionHeading kicker="FAQ" title="שאלות שאתם בטח שואלים את עצמכם." />
        </DepthReveal>
        <div className="mt-10 max-w-3xl">
          <Faq items={homeFaqs} />
        </div>
      </Section>

      <CtaBand showMascot={false} straddleMascot />
    </>
  );
}
