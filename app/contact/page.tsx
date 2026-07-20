import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { TigerAnim } from "@/components/TigerAnim";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "צור קשר - בואו נבנה נוכחות אמיתית",
  description:
    "רוצים להרים את הפיד של העסק? השאירו פרטים ונחזור אליכם, או דברו איתנו ישירות במייל ובטלפון. נמר סושיאל - סוכנות סושיאל, וידאו וקמפיינים.",
  alternates: { canonical: "/contact" },
};

const crumbs = [
  { name: "בית", href: "/" },
  { name: "צור קשר", href: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <header className="relative overflow-hidden border-b border-ink/10 bg-ink text-paper">
        <div className="container-x relative z-10 mx-auto max-w-4xl py-12 sm:py-16">
          <Breadcrumbs items={crumbs} dark />
          <p className="kicker font-serif mt-6 text-lime">Get in touch</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="relative flex aspect-square items-end justify-center rounded-brand">
              <TigerAnim size={420} className="!max-w-[220px] sm:!max-w-[420px]" />
            </div>
            <div className="flex aspect-square flex-col justify-center rounded-brand">
              <h1 className="display text-4xl sm:text-5xl">בואו נבנה משהו גדול.</h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-200">
                מוכנים להפוך לטורפים בעולם הדיגיטלי? השאירו פרטים ונחזור אליכם, או דברו איתנו ישירות.
              </p>
            </div>
          </div>
        </div>
      </header>

      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <aside className="lg:col-span-2">
            <div className="rounded-brand bg-gray-50 p-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">פרטי התקשרות</h2>
              <ul className="mt-5 space-y-4 text-lg">
                <li>
                  <span className="block text-sm text-gray-500">אימייל</span>
                  <a href={`mailto:${site.contact.email}`} className="font-semibold hover:text-pink">
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <span className="block text-sm text-gray-500">טלפון</span>
                  <a href={`tel:${site.contact.phone}`} dir="ltr" className="block text-right font-semibold hover:text-pink">
                    {site.contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <span className="block text-sm text-gray-500">כתובת</span>
                  <span className="font-semibold">
                    {site.contact.address.street}, {site.contact.address.city}
                  </span>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/15 px-4 py-2 font-semibold hover:border-pink hover:text-pink">
                  Instagram
                </a>
                <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/15 px-4 py-2 font-semibold hover:border-pink hover:text-pink">
                  LinkedIn
                </a>
                <a href={site.socials.tiktok} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/15 px-4 py-2 font-semibold hover:border-pink hover:text-pink">
                  TikTok
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
