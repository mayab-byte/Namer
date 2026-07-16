"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Cinematic hero: independent depth layers (background / fog / content)
 * parallax at different rates as the camera moves past the scene, instead
 * of a plain fade transition.
 */
export function CinematicHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 0.2]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[560px] flex-col overflow-hidden bg-ink text-paper"
    >
      {/* Depth layer 1: background */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <div
          className="absolute inset-0 bg-gradient-to-br from-pink-deep via-ink to-ink"
          aria-hidden="true"
        />
      </motion.div>

      {/* Depth layer 2: fog / atmosphere for legibility */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent"
        aria-hidden="true"
      />

      {/* Depth layer 3: content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative z-10 flex flex-1 flex-col justify-between py-8 sm:py-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="kicker font-serif text-lime">Strategic Social Agency</p>
        </motion.div>

        <div className="flex flex-col gap-8 pb-6 sm:pb-10 md:flex-row md:items-end md:justify-between">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="display max-w-3xl text-4xl sm:text-6xl lg:text-7xl"
          >
            הופכים את הסיפור של העסק שלכם ל<span className="text-pink">נוכחות</span> ברשתות שאנשים
            מתחברים אליה.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex shrink-0 flex-wrap gap-3"
          >
            <Link href="/contact" className="btn-pink">
              בואו נרים את הפיד שלכם
            </Link>
            <Link href="/services" className="btn-ghost border-white/25 text-paper hover:border-white/60">
              השירותים שלנו
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
            <rect x="1" y="1" width="18" height="26" rx="9" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
            <circle cx="10" cy="9" r="2.5" fill="rgba(255,255,255,.7)" />
          </svg>
        </motion.div>
      )}
    </section>
  );
}
