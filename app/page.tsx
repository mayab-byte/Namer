import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { HeroMarquee } from "@/components/HeroMarquee";
import { CinematicHero } from "@/components/CinematicHero";
import { StorySection } from "@/components/StorySection";
import { TrustSection } from "@/components/TrustSection";
import { DepthReveal } from "@/components/DepthReveal";
import { ServiceCard } from "@/components/ServiceCard";
import { WorkCard } from "@/components/WorkCard";
import { Stats } from "@/components/Stats";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
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

      {/* ---------------------------------------------------------- Story */}
      <StorySection />

      {/* ------------------------------------------------------ Services */}
      <Section>
        <DepthReveal>
          <SectionHeading
            kicker="What we do"
            title="מה אנחנו עושים?"
            intro="אנחנו פה כדי לבנות לעסק שלכם אסטרטגיית תוכן מדויקת, לפצח את המסרים הנכונים ולייצר נוכחות דינמית ועקבית ברשתות שמביאה תוצאות."
          />
        </DepthReveal>
        <DepthReveal delay={0.1} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </DepthReveal>
      </Section>

      {/* --------------------------------------------------------- Works */}
      <Section className="bg-gray-50">
        <DepthReveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading kicker="Selected work" title="עסקים שלקחנו קדימה." />
          <Link href="/works" className="btn-ghost">
            לכל העבודות
          </Link>
        </DepthReveal>
        <DepthReveal delay={0.1} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {works.map((w) => (
            <WorkCard key={w.slug} work={w} />
          ))}
        </DepthReveal>
      </Section>

      {/* ---------------------------------------------------- Testimonials */}
      <TrustSection />

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

      {/* ----------------------------------------------------- GSO / Why */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <DepthReveal>
            <SectionHeading
              kicker="GSO · הדור הבא של הנוכחות"
              title="נמצאים בתשובות של ה-AI, לא רק בגוגל."
              intro="אנחנו בונים את הנוכחות שלכם כך שמנועי בינה מלאכותית — ChatGPT, Claude, Gemini ו-Perplexity — יכולים לקרוא אתכם, להבין אתכם ולצטט אתכם בתשובות שהם מייצרים."
            />
            <ul className="mt-8 space-y-4">
              {[
                { t: "כתיבה לפרומפטים אמיתיים", d: "התוכן נבנה סביב שאלות שאנשים באמת שואלים." },
                { t: "מבנה אטומי + Schema מלא", d: "בלוקים שמודלים יכולים לשלוף ולצטט מחוץ להקשר." },
                { t: "תשובה ישירה בכל עמוד", d: "בלי אינטרו — התשובה נמצאת ב-100 המילים הראשונות." },
              ].map((item) => (
                <li key={item.t} className="flex gap-4">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-pink" aria-hidden="true" />
                  <div>
                    <p className="font-bold">{item.t}</p>
                    <p className="text-sm text-gray-500">{item.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </DepthReveal>
          <DepthReveal delay={0.15} className="rounded-brand bg-gray-50 p-8 sm:p-12">
            <p className="kicker font-serif">By the numbers</p>
            <div className="mt-8">
              <Stats />
            </div>
          </DepthReveal>
        </div>
      </Section>

      {/* --------------------------------------------------- Newsletter */}
      <section className="bg-lime">
        <div className="container-x grid items-center gap-8 py-16 md:grid-cols-2">
          <div>
            <p className="kicker font-serif text-ink/70">Newsletter</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">המקום שבו אנחנו כותבים קצת אחרת.</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/80">
              במייל יש לנו יותר מקום לחשוב בקול, לשתף ברעיונות, בדילמות ובתהליכים
              שאנחנו פוגשים בעבודה עם עסקים. אם זה מעניין אתכם, כנראה שתיהנו גם מהמיילים שלנו.
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
