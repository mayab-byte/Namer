"use client";

import { useRef } from "react";
import type { Work } from "@/lib/content";
import { WorkCard } from "./WorkCard";

/**
 * Horizontally-scrollable, swipeable row of project cards (native scroll +
 * snap, no extra dependency) with prev/next arrows for pointer users.
 *
 * This site is RTL-only, and under RTL the browser's scrollLeft range runs
 * from 0 (first card, at rest) down to a negative maximum (last card) — so
 * "next" means scrolling toward negative, "prev" toward positive. That's the
 * opposite of the LTR-intuitive +1/-1, hence the explicit sign below rather
 * than a generic ±1 direction argument.
 */
export function WorksCarousel({ works }: { works: Work[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(toward: "next" | "prev") {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-work-card]");
    const amount = (card?.offsetWidth ?? 300) + 24;
    track.scrollBy({ left: toward === "next" ? -amount : amount, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {works.map((w) => (
          <div key={w.slug} data-work-card className="w-[78vw] shrink-0 snap-start sm:w-[320px]">
            <WorkCard work={w} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCard("next")}
          aria-label="הפרויקט הבא"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-pink hover:text-pink"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollByCard("prev")}
          aria-label="הפרויקט הקודם"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-pink hover:text-pink"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="rotate-180">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
