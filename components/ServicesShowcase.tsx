"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { SectionHeading } from "./Section";
import { DepthReveal } from "./DepthReveal";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { asset } from "@/lib/site";
import type { Service } from "@/lib/content";

const media: Record<string, { src: string; poster: string }> = {
  "social-management": {
    src: asset("/services/social-management.mp4"),
    poster: asset("/services/social-management-poster.webp"),
  },
  "video-production": {
    src: asset("/services/video-production.mp4"),
    poster: asset("/services/video-production-poster.webp"),
  },
  campaigns: {
    src: asset("/services/campaigns.mp4"),
    poster: asset("/services/campaigns-poster.webp"),
  },
  newsletters: {
    src: asset("/services/newsletters.mp4"),
    poster: asset("/services/newsletters-poster.webp"),
  },
};

/**
 * "What we do" scene: the heading sits at the center with the four service
 * tiles flanking it left and right (two per side on desktop; a 2x2 grid
 * under the heading on mobile). Each tile autoplays its clip on loop and
 * pauses — revealing the service's full detail — on hover.
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

function ServiceTile({ service, className = "" }: { service: Service; className?: string }) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const m = media[service.slug];

  function onEnter() {
    setHovered(true);
    videoRef.current?.pause();
  }
  function onLeave() {
    setHovered(false);
    if (!reduced) videoRef.current?.play().catch(() => {});
  }

  return (
    <DepthReveal delay={0.1} className={className}>
      <div
        className="group relative aspect-[2/3] w-full overflow-hidden rounded-brand bg-ink"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={m.src}
          poster={m.poster}
          autoPlay={!reduced}
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* Top overlay — title + link to the service page, always visible */}
        <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/75 via-black/20 to-transparent p-4">
          <h3 className="text-base font-extrabold text-paper sm:text-lg">{service.title}</h3>
          <Link
            href={`/services/${service.slug}`}
            className="pointer-events-auto mt-2 inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1 text-xs font-bold text-ink transition-colors hover:bg-pink hover:text-paper"
          >
            לשירות
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="rotate-180">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Hover reveal — full detail, video paused underneath */}
        <div
          className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-black/10 p-4 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-sm leading-relaxed text-gray-100">{service.short}</p>
        </div>
      </div>
    </DepthReveal>
  );
}
