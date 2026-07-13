import type { FAQ } from "@/lib/content";

/**
 * FAQ list built on native <details>/<summary>: content is always present in
 * the HTML (GSO commandment #7 — direct answers readable without JS) and it is
 * keyboard-accessible out of the box. Pair with faqSchema() for FAQPage JSON-LD.
 */
export function Faq({ items, dark = false }: { items: FAQ[]; dark?: boolean }) {
  return (
    <div className={dark ? "divide-y divide-white/10" : "divide-y divide-ink/10"}>
      {items.map((item, i) => (
        <details key={i} className="group py-5">
          <summary
            className={`flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-bold ${
              dark ? "text-paper" : "text-ink"
            }`}
          >
            <span>{item.q}</span>
            <span
              className="mt-1 shrink-0 text-pink transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className={`mt-3 max-w-2xl leading-relaxed ${dark ? "text-gray-200" : "text-gray-500"}`}>
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
