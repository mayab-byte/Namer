"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ScrollFrames } from "./ScrollFrames";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STORY_FRAME_COUNT = 80;

/**
 * "Story" scene: the tiger character advances frame-by-frame as the user
 * scrolls past this section (a scroll-scrubbed sprite sequence, not a
 * looping video) — see ScrollFrames. The panel itself still enters with
 * depth + rotateX via GSAP ScrollTrigger, scrubbed to scroll.
 */
export function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !panelRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 90, scale: 0.88, rotateX: 8, transformPerspective: 1000 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 30%",
            scrub: 0.6,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-5 lg:-mr-16">
          <p className="kicker font-serif text-lime">Why it feels different</p>
          <h2 className="display mt-4 text-4xl text-paper sm:text-5xl">
            אנחנו לא רק הסוכנות.
            <br />
            אנחנו שותפים לדרך.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-300">
            אנחנו מתחילים מלהקשיב לכם — לומדים את העסק לעומק, מזהים את הקול שכבר קיים אצלכם,
            ומוציאים אותו החוצה בשפה שאי אפשר להתעלם ממנה.
          </p>
        </div>

        <div ref={panelRef} className="relative lg:col-span-7" style={{ willChange: "transform" }}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] border border-white/10 bg-gray-900 sm:rounded-[48px]">
            <ScrollFrames
              frameCount={STORY_FRAME_COUNT}
              basePath="/mascot/story-frames"
              className="h-full w-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
