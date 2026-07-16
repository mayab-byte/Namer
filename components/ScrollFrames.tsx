"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { asset } from "@/lib/site";

/**
 * Scroll-scrubbed image sequence: as the container passes through the
 * viewport, the current scroll fraction picks which pre-rendered frame to
 * paint onto a canvas — the classic "product page" scrub effect, built
 * from discrete frames rather than a video (so it can pause exactly on
 * any frame, and needs no video codec).
 *
 * Frames are only fetched once the container nears the viewport, and under
 * prefers-reduced-motion we skip scroll-driven scrubbing entirely and just
 * paint one representative frame.
 */
export function ScrollFrames({
  frameCount,
  basePath,
  pad = 3,
  className = "",
}: {
  frameCount: number;
  basePath: string;
  pad?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();

  const frameSrc = (i: number) => asset(`${basePath}/frame-${String(i).padStart(pad, "0")}.webp`);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
      img.onload = () => {
        if (cancelled) return;
        if (i === 0) draw(0);
        if (reduced && i === Math.floor(frameCount / 2)) draw(i);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduced) return;
    const idx = Math.min(frameCount - 1, Math.max(0, Math.floor(v * frameCount)));
    draw(idx);
  });

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="h-full w-full object-contain" aria-hidden="true" />
    </div>
  );
}
