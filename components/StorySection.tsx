"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { asset } from "@/lib/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "Story" scene: the second tiger clip enters as the camera pushes toward
 * it (depth + rotateX via GSAP ScrollTrigger, scrubbed to scroll — not a
 * plain fade). The heading overlaps the video's edge so the tiger reads as
 * passing behind the typography, per the master spec's tiger rules.
 */
export function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);

  // Lazy-load the video only once the section is near the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
            {inView && (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src={asset("/video/tiger-2.mp4")}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
