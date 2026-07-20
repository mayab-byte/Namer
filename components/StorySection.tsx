"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
            אנחנו מתחילים מלהקשיב לכם — לומדים את העסק לעומק, מזהים את הקול שכבר קיים אצלכם,
            ומוציאים אותו החוצה בשפה שאי אפשר להתעלם ממנה.
          </p>
        </div>

        <div ref={panelRef} className="flex justify-center lg:col-span-7 lg:justify-start" style={{ willChange: "transform" }}>
          <Image
            src={asset("/mascot/story-loop.webp")}
            alt="נמר סושיאל"
            width={500}
            height={500}
            className="h-auto w-[280px] sm:w-[360px] lg:w-[460px]"
          />
        </div>
      </div>
    </section>
  );
}
