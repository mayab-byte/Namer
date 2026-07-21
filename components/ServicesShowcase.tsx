"use client";

import { SectionHeading } from "./Section";
import { DepthReveal } from "./DepthReveal";
import { ServiceTile } from "./ServiceTile";
import type { Service } from "@/lib/content";

/**
 * "What we do" scene: the heading sits at the center with the four service
 * tiles flanking it left and right (two per side on desktop; a 2x2 grid
 * under the heading on mobile).
 */
export function ServicesShowcase({ services }: { services: Service[] }) {
  const [left1, left2, right1, right2] = services;

  return (
    <div className="grid grid-cols-2 items-center gap-5 sm:gap-6 lg:grid-cols-[1fr_1fr_auto_1fr_1fr] lg:gap-5">
      <ServiceTile service={left1} />
      <ServiceTile service={left2} className="lg:mt-16" />

      <DepthReveal className="order-first col-span-2 text-center lg:order-none lg:col-span-1 lg:w-[280px]">
        <SectionHeading kicker="What we do" title="מה אנחנו עושים?" align="center" />
        <p className="mt-5 text-base leading-relaxed text-gray-500">
          אנחנו פה כדי לבנות לעסק שלכם אסטרטגיית תוכן מדויקת, לפצח את המסרים הנכונים ולייצר נוכחות
          דינמית ועקבית ברשתות שמביאה תוצאות.
        </p>
      </DepthReveal>

      <ServiceTile service={right1} className="lg:mt-16" />
      <ServiceTile service={right2} />
    </div>
  );
}
