"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
 * tiles flanking it left and right — stacked two-per-side on desktop (each
 * tile at roughly double the width a single-row layout would allow), a
 * single full-width column on mobile. Tiles drift in a gentle idle float,
 * autoplay their clip on loop, and pause — revealing the full service
 * detail — on hover.
 */
export function ServicesShowcase({ services }: { services: Service[] }) {
  const [left1, left2, right1, right2] = services;

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
        <ServiceTile service={left1} floatDelay={0} />
        <ServiceTile service={left2} floatDelay={0.6} className="lg:mt-16" />
      </div>

      <DepthReveal className="text-center lg:w-[300px]">
        <SectionHeading kicker="What we do" title="מה אנחנו עושים?" align="center" />
        <p className="mt-5 text-base leading-relaxed text-gray-500">
          אנחנו פה כדי לבנות לעסק שלכם אסטרטגיית תוכן מדויקת, לפצח את המסרים הנכונים ולייצר נוכחות
          דינמית ועקבית ברשתות שמביאה תוצאות.
        </p>
      </DepthReveal>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
        <ServiceTile service={right1} floatDelay={0.3} className="lg:mt-16" />
        <ServiceTile service={right2} floatDelay={0.9} />
      </div>
    </div>
  );
}

function ServiceTile({
  service,
  className = "",
  floatDelay = 0,
}: {
  service: Service;
  className?: string;
  floatDelay?: number;
}) {
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
      <motion.div
        animate={reduced ? undefined : { y: [0, -14, 0] }}
        transition={reduced ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
        className="group relative aspect-[2/3] w-full overflow-hidden rounded-brand bg-ink shadow-xl shadow-ink/10"
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
        <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/75 via-black/20 to-transparent p-5">
          <h3 className="text-lg font-extrabold text-paper sm:text-xl">{service.title}</h3>
          <Link
            href={`/services/${service.slug}`}
            className="pointer-events-auto mt-2 inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-3.5 py-1.5 text-sm font-bold text-ink transition-colors hover:bg-pink hover:text-paper"
          >
            לשירות
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="rotate-180">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Hover reveal — full detail, video paused underneath */}
        <div
          className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-black/10 p-5 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-base leading-relaxed text-gray-100">{service.short}</p>
        </div>
      </motion.div>
    </DepthReveal>
  );
}
