"use client";

import { useRef, useState } from "react";
import { DepthReveal } from "./DepthReveal";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { asset } from "@/lib/site";
import type { Service } from "@/lib/content";

export const serviceMedia: Record<string, { src: string; poster: string }> = {
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
 * A single service tile: autoplaying looping clip with the title + a link
 * to the service page always visible up top; hovering pauses the clip and
 * reveals the service's full description. Shared by the home page's
 * ServicesShowcase and the /services page grid.
 */
export function ServiceTile({ service, className = "" }: { service: Service; className?: string }) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const m = serviceMedia[service.slug];

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

        {/* Top overlay — title, always visible */}
        <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/75 via-black/20 to-transparent p-4">
          <h3 className="text-base font-extrabold text-paper sm:text-lg">{service.title}</h3>
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
