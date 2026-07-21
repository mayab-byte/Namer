import { ServiceTile } from "./ServiceTile";
import type { Service } from "@/lib/content";

/**
 * Plain grid of service tiles for the /services page — same autoplay +
 * hover-reveal tile as the home page's ServicesShowcase, just without the
 * center heading (the page's own PageHero already carries that), so each
 * tile gets noticeably more width.
 */
export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => (
        <ServiceTile key={s.slug} service={s} />
      ))}
    </div>
  );
}
