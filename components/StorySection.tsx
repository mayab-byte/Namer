"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { asset } from "@/lib/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "Story" scene: the tiger character just loops on its own (autoplay,
 * independent of scroll). The panel itself still reveals with depth +
 * rotateX via GSAP ScrollTrigger as it enters the viewport.
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
            אנחנו מתחילים מלהקשיב לכם, לומדים את העסק לעומק, מזהים את הקול שכבר קיים אצלכם
            ומוציאים אותו החוצה בשפה שאי אפשר להתעלם ממנה.
          </p>
          <Link href="/about" className="btn-ghost mt-8 border-white/25 text-paper hover:border-white/60">
            בואו נכיר
          </Link>
        </div>

        <div ref={panelRef} className="flex justify-center lg:col-span-7" style={{ willChange: "transform" }}>
          <video
            src={asset("/mascot/story-partners.mp4")}
            poster={asset("/mascot/story-partners-poster.webp")}
            autoPlay={!reduced}
            muted
            loop
            playsInline
            preload="auto"
            aria-label="נמר סושיאל"
            className="h-auto w-[240px] sm:w-[320px] lg:w-[360px]"
          />
        </div>
      </div>
    </section>
  );
}
