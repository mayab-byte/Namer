import Link from "next/link";
import type { Service } from "@/lib/content";

const accentMap: Record<Service["accent"], string> = {
  pink: "bg-paper border-ink/10 hover:border-pink",
  lime: "bg-paper border-ink/10 hover:border-lime",
  dark: "bg-ink text-paper border-ink hover:border-pink",
};

const dotMap: Record<Service["accent"], string> = {
  pink: "bg-pink",
  lime: "bg-lime",
  dark: "bg-pink",
};

export function ServiceCard({ service }: { service: Service }) {
  const dark = service.accent === "dark";
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group flex flex-col rounded-brand border p-7 transition-all duration-200 hover:-translate-y-1 ${accentMap[service.accent]}`}
    >
      <span className={`h-3 w-3 rounded-full ${dotMap[service.accent]}`} aria-hidden="true" />
      <h3 className="mt-6 text-2xl font-extrabold">{service.title}</h3>
      <p
        className={`mt-3 flex-1 text-sm leading-relaxed ${dark ? "text-gray-200" : "text-gray-500"}`}
      >
        {service.short}
      </p>
      <span
        className={`mt-6 inline-flex items-center gap-1.5 text-sm font-bold ${dark ? "text-pink" : "text-ink group-hover:text-pink"}`}
      >
        {service.kicker}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="rotate-180">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
