"use client";

import { useEffect, useState } from "react";

/** True when the user's OS/browser requests reduced motion. Cinematic
 * effects (parallax, Lenis smooth scroll, video autoplay) must degrade to
 * simple fades/native scroll when this is true. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
