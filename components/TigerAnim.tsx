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
}: {
  className?: string;
  size?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <video
      src={asset("/mascot/tiger-contact.mp4")}
      poster={asset("/mascot/tiger-contact-poster.webp")}
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
