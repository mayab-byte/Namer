"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Headline that cycles through a list of phrases (crossfade + slide).
 *
 * Two modes:
 * - Timer mode (default): rotates on its own interval.
 * - Controlled mode: pass `index` (e.g. driven by scroll progress) and the
 *   component just renders that phrase — no internal timer.
 *
 * Auto-updating text is paused under prefers-reduced-motion — shows only
 * the first phrase, per WCAG guidance against unstoppable moving content.
 */
export function RotatingHeadline({
  phrases,
  interval = 2800,
  index: controlledIndex,
  className = "",
}: {
  phrases: ReactNode[];
  interval?: number;
  /** Externally-controlled phrase index (e.g. synced to scroll). Omit to
   * fall back to automatic timer-based rotation. */
  index?: number;
  className?: string;
}) {
  const [autoIndex, setAutoIndex] = useState(0);
  const reduced = useReducedMotion();
  const isControlled = controlledIndex !== undefined;

  useEffect(() => {
    if (isControlled || reduced || phrases.length <= 1) return;
    const id = setInterval(() => {
      setAutoIndex((i) => (i + 1) % phrases.length);
    }, interval);
    return () => clearInterval(id);
  }, [isControlled, reduced, phrases.length, interval]);

  const index = isControlled ? controlledIndex : autoIndex;

  if (reduced) {
    return <h1 className={className}>{phrases[isControlled ? index : 0]}</h1>;
  }

  return (
    <h1 className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="block"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </h1>
  );
}
