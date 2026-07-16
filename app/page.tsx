import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { HeroMarquee } from "@/components/HeroMarquee";
import { ServiceCard } from "@/components/ServiceCard";
import { WorkCard } from "@/components/WorkCard";
import { Stats } from "@/components/Stats";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { Mascot } from "@/components/Mascot";
import { JsonLd } from "@/components/JsonLd";
import { services, works, homeFaqs, methodology, marqueeTop, marqueeBottom } from "@/lib/content";
import { faqSchema } from "@/lib/schema";
import { asset } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="container-x grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="kicker font-serif">Strategic Social Agency</p>
            <h1 className="display mt-4 text-5xl sm:text-6xl xl:text-7xl">
              הופכים את הסיפור של העסק שלכם ל
              <span className="text-pink">נוכחות</span> ברשתות שאנשים מתחברים אליה.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-500">
              אסטרטגיה חדה, גאנטים מתוכננים וקריאייטיב מדויק שמביאים תוצאות, תופסים
              את הטרנדים הנכונים ובונים לכם מותג בולט.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-pink">
                בואו נרים את הפיד שלכם
              </Link>
              <Link href="/services" className="btn-ghost">
                השירותים שלנו
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-4 -rotate-3 rounded-brand bg-lime" aria-hidden="true" />
              <div className="relative flex aspect-square flex-col justify-between rounded-brand bg-ink p-8 text-paper">
                <div className="flex items-center justify-between">
                  <span className="kicker font-serif text-lime">Bold Mind</span>
                  <span className="text-xs font-bold text-gray-400">SOCIAL MASTERY</span>
                </div>
                <Mascot size={180} priority className="mx-auto" />
                <p className="text-sm text-gray-300">
                  מותג שנראה כמו מותג אמיתי — לא כמו עסק שמנסה &quot;לעשות שיווק&quot;.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HeroMarquee top={marqueeTop} bottom={marqueeBottom} />

      {/* ------------------------------------------------------ Services */}
      <Section>
        <SectionHeading
          kicker="What we do"
          title="מה אנחנו עושים?"
          intro="אנחנו פה כדי לבנות לעסק שלכם אסטרטגיית תוכן מדויקת, לפצח את המסרים הנכונים ולייצר נוכחות דינמית ועקבית ברשתות שמביאה תוצאות."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------------- Works */}
      <Section className="bg-gray-50">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading kicker="Selected work" title="עסקים שלקחנו קדימה." />
          <Link href="/works" className="btn-ghost">
            לכל העבודות
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {works.map((w) => (
            <WorkCard key={w.slug} work={w} />
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------- Methodology */}
      <Section dark>
        <SectionHeading
          kicker={methodology.kicker}
          title={methodology.title}
          intro={methodology.subtitle}
          dark
        />
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

      {/* ----------------------------------------------------- GSO / Why */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
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
          </div>
          <div className="rounded-brand bg-gray-50 p-8 sm:p-12">
            <p className="kicker font-serif">By the numbers</p>
            <div className="mt-8">
              <Stats />
            </div>
          </div>
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
        <SectionHeading kicker="FAQ" title="שאלות שאתם בטח שואלים את עצמכם." />
        <div className="mt-10 max-w-3xl">
          <Faq items={homeFaqs} />
        </div>
      </Section>

      {/* Reclining leopard sitting on the edge of the CTA (straddles the boundary) */}
      <div className="relative z-10 -mb-24 flex justify-center bg-paper pt-10 sm:-mb-28">
        <Mascot variant="call" size={460} />
      </div>

      <CtaBand showMascot={false} />
    </>
  );
}
