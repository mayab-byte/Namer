"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { RotatingHeadline } from "./RotatingHeadline";
import { asset } from "@/lib/site";

const HEADLINES = [
  "אנחנו בונים נוכחות עוצמתית ומעניינת",
  "הופכים את הסיפור של העסק שלכם",
  "למשהו שאנשים ברשתות מתחברים אליו",
];

const FRAME_COUNT = 70;
const framePath = (i: number) => asset(`/mascot/hero-frames/frame-${String(i).padStart(3, "0")}.webp`);

/**
 * Cinematic hero: the whole scene is scroll-scrubbed — the tiger walk
 * advances frame-by-frame and the headline switches phrase, both driven by
 * scroll progress while this section stays pinned in the viewport (the
 * "virtual camera" from the master spec, not the user paging past a video).
 *
 * Under prefers-reduced-motion the section is a normal, non-pinned static
 * screen (first frame, first phrase) — no scroll-linked motion at all.
 */
export function CinematicHero() {
  const reduced = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastPhraseRef = useRef(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  function draw(index: number) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  }

  // Preload every frame immediately — this is above-the-fold hero content,
  // regardless of reduced-motion (only the scroll-driven advancing is gated).
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = framePath(i);
      img.onload = () => {
        if (!cancelled && i === 0) draw(0);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduced) return;
    const frameIdx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(v * FRAME_COUNT)));
    draw(frameIdx);

    const phraseIdx = Math.min(
      HEADLINES.length - 1,
      Math.max(0, Math.floor(v * HEADLINES.length)),
    );
    if (phraseIdx !== lastPhraseRef.current) {
      lastPhraseRef.current = phraseIdx;
      setPhraseIndex(phraseIdx);
    }
  });

  // Reduced motion: normal-height static hero, first frame, first phrase, no pin/scrub.
  if (reduced) {
    return (
      <section className="relative flex h-[100svh] min-h-[560px] flex-col overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-deep via-ink to-ink" aria-hidden="true" />
        <HeroLayers />
        <HeroContent phraseIndex={0} canvasRef={canvasRef} />
      </section>
    );
  }

  return (
    <div ref={wrapperRef} className="relative bg-ink" style={{ height: "280vh" }}>
      <section className="sticky top-0 flex h-[100svh] min-h-[560px] flex-col overflow-hidden text-paper">
        <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
          <div className="absolute inset-0 bg-gradient-to-br from-pink-deep via-ink to-ink" aria-hidden="true" />
        </motion.div>
        <HeroLayers />
        <HeroContent phraseIndex={phraseIndex} canvasRef={canvasRef} scrollCueOpacity={cueOpacity} />
      </section>
    </div>
  );
}

/** Fog/atmosphere gradients shared by both the pinned and reduced-motion hero. */
function HeroLayers() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent"
        aria-hidden="true"
      />
    </>
  );
}

function HeroContent({
  phraseIndex,
  canvasRef,
  scrollCueOpacity,
}: {
  phraseIndex: number;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  scrollCueOpacity?: MotionValue<number>;
}) {
  return (
    <div className="container-x relative z-10 flex flex-1 flex-col justify-between py-8 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="kicker font-serif text-lime">Strategic Social Agency</p>
      </motion.div>

      <div className="flex flex-1 items-center py-6">
        <div className="grid w-full items-center gap-10 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <RotatingHeadline
              phrases={HEADLINES}
              index={phraseIndex}
              className="display max-w-3xl text-4xl sm:text-6xl lg:text-7xl"
            />

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-pink">
                בואו נרים את הפיד שלכם
              </Link>
              <Link href="/services" className="btn-ghost border-white/25 text-paper hover:border-white/60">
                השירותים שלנו
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:col-span-5 lg:justify-start"
          >
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className="h-auto w-[300px] object-contain sm:w-[380px] lg:w-[460px]"
            />
          </motion.div>
        </div>
      </div>

      {scrollCueOpacity && (
        <motion.div
          style={{ opacity: scrollCueOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
            <rect x="1" y="1" width="18" height="26" rx="9" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
            <circle cx="10" cy="9" r="2.5" fill="rgba(255,255,255,.7)" />
          </svg>
        </motion.div>
      )}
    </div>
  );
}
