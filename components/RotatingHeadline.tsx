"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Headline that cycles through a list of phrases (crossfade + slide).
 * Auto-updating text is paused under prefers-reduced-motion — shows only
 * the first phrase, per WCAG guidance against unstoppable moving content.
 */
export function RotatingHeadline({
  phrases,
  interval = 2800,
  className = "",
}: {
  phrases: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || phrases.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, interval);
    return () => clearInterval(id);
  }, [reduced, phrases.length, interval]);

  if (reduced) {
    return <h1 className={className}>{phrases[0]}</h1>;
  }

  return (
    <h1 className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="block"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </h1>
  );
}
