"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Shared "camera enters a new scene" reveal: depth (translateZ via scale +
 * perspective) combined with opacity and a slight y-drift, per the master
 * spec's motion rules (every reveal = depth + opacity + subtle scale, no
 * fade-only transitions). Falls back to a plain opacity fade under
 * prefers-reduced-motion.
 */
export function DepthReveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  scale = 0.94,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, margin: "-10% 0px" }}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
