import Link from "next/link";
import Image from "next/image";
import { site, nav, asset } from "@/lib/site";
import { services } from "@/lib/content";

const socialLinks: { href: string; label: string }[] = [
  { href: site.socials.instagram, label: "Instagram" },
  { href: site.socials.facebook, label: "Facebook" },
  { href: site.socials.linkedin, label: "LinkedIn" },
  { href: site.socials.tiktok, label: "TikTok" },
];

export function Footer() {
  const year = 2026;
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link href="/" aria-label="נמר סושיאל - לעמוד הבית" className="inline-block">
            <Image
              src={asset("/brand/logo-vertical-white.png")}
              alt="Namer Social"
              width={140}
              height={136}
              className="h-auto w-32"
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-gray-400">
            {site.description}
          </p>
        </div>

        <nav aria-label="ניווט תחתון">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">ניווט</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-gray-200 hover:text-pink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="שירותים">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">שירותים</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-gray-200 hover:text-pink">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">יצירת קשר</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-gray-200">
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-pink">
                {site.contact.email}
              </a>
            </li>
            <li dir="ltr" className="text-right">
              <a href={`tel:${site.contact.phone}`} className="hover:text-pink">
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              {site.contact.address.street}, {site.contact.address.city}
            </li>
          </ul>
          <ul className="mt-5 flex flex-wrap gap-3 text-sm">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 px-3 py-1.5 text-gray-200 hover:border-pink hover:text-pink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-gray-400 sm:flex-row">
          <p>
            © {year} {site.name}. כל הזכויות שמורות.
          </p>
          <p>נבנה עם דגש על נגישות ומהירות.</p>
        </div>
      </div>
    </footer>
  );
}
