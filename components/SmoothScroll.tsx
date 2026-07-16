"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Drives the "virtual camera" feel from the master spec: the page scrolls
 * with inertia instead of a raw native jump. Fully disabled under
 * prefers-reduced-motion, falling back to native scrolling.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame: number;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
