"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { asset } from "@/lib/site";

/**
 * Small standalone animated tiger clip (shot on pure black, which matches
 * `--color-ink` exactly so it reads as a transparent-background character
 * rather than a video box — foreground character only, never used as a
 * section background). Placed beside body text per the brand direction: the
 * tiger reads as a character, not a scene.
 */
export function TigerAnim({
  className = "",
  size = 160,
  src = "/mascot/tiger-contact.mp4",
  poster = "/mascot/tiger-contact-poster.webp",
}: {
  className?: string;
  size?: number;
  src?: string;
  poster?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <video
      src={asset(src)}
      poster={asset(poster)}
      autoPlay={!reduced}
      muted
      loop
      playsInline
      preload="auto"
      aria-label="נמר סושיאל"
      style={{ maxWidth: size }}
      className={`h-auto w-auto object-contain ${className}`}
    />
  );
}
