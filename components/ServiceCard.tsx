"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Service } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

const accentMap: Record<Service["accent"], string> = {
  pink: "bg-paper/70 border-ink/10 hover:border-pink",
  lime: "bg-paper/70 border-ink/10 hover:border-lime",
  dark: "bg-ink/80 text-paper border-white/10 hover:border-pink",
};

const dotMap: Record<Service["accent"], string> = {
  pink: "bg-pink",
  lime: "bg-lime",
  dark: "bg-pink",
};

// Motion-wrapped Next.js Link — keeps client-side navigation/prefetch while
// gaining framer-motion props (React 19 requires motion.create, not motion()).
const MotionLink = motion.create(Link);

/** Floating glass panel with a subtle mouse-driven tilt (master spec:
 * services cards feel like floating glass panels; hover = depth + rotation). */
export function ServiceCard({ service }: { service: Service }) {
  const dark = service.accent === "dark";
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 220, damping: 20 });
  const springRy = useSpring(ry, { stiffness: 220, damping: 20 });
  const shadowY = useTransform(springRx, [-8, 8], [4, -4]);
  const boxShadow = useTransform(shadowY, (v) => `0 ${20 + v}px 40px -20px rgba(0,0,0,.35)`);

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  }
  function onMouseLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <MotionLink
      ref={ref}
      href={`/services/${service.slug}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: springRx,
        rotateY: springRy,
        transformPerspective: 800,
        boxShadow: reduced ? undefined : boxShadow,
      }}
      className={`group flex flex-col rounded-brand border p-7 backdrop-blur-md transition-colors duration-200 ${accentMap[service.accent]}`}
    >
      <span className={`h-3 w-3 rounded-full ${dotMap[service.accent]}`} aria-hidden="true" />
      <h3 className="mt-6 text-2xl font-extrabold">{service.title}</h3>
      <p className={`mt-3 flex-1 text-sm leading-relaxed ${dark ? "text-gray-200" : "text-gray-500"}`}>
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
    </MotionLink>
  );
}
