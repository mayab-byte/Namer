"use client";

import { useEffect, useRef, useState } from "react";
import { stats as defaultStats } from "@/lib/content";

const colorMap = {
  pink: "text-pink",
  lime: "text-lime",
  ink: "text-ink",
} as const;

/** Animated count-up for a single stat (e.g. "250%", "85M+", "24/7"). */
function CountUp({ value, color }: { value: string; color: keyof typeof colorMap }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^(\D*)(\d+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const prefix = match[1];
    const target = parseInt(match[2], 10);
    const suffix = match[3];

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(`${prefix}${target}${suffix}`);
      return;
    }

    setDisplay(`${prefix}0${suffix}`);
    let started = false;
    const run = () => {
      const duration = 1400;
      let startTs: number | null = null;
      const step = (ts: number) => {
        if (startTs === null) startTs = ts;
        const p = Math.min((ts - startTs) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        setDisplay(`${prefix}${Math.round(eased * target)}${suffix}`);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span
      ref={ref}
      dir="ltr"
      className={`block text-5xl font-extrabold tabular-nums sm:text-6xl ${colorMap[color]}`}
    >
      {display}
    </span>
  );
}

export function Stats({
  items = defaultStats,
  color = "pink",
  cols = 2,
}: {
  items?: { value: string; label: string }[];
  color?: keyof typeof colorMap;
  cols?: 2 | 4;
}) {
  const gridCols = cols === 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2";
  return (
    <dl className={`grid ${gridCols} gap-x-12 gap-y-12`}>
      {items.map((s) => (
        <div key={s.label} className="text-center md:text-start">
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <CountUp value={s.value} color={color} />
            <span className="mt-3 block text-sm leading-snug text-gray-500">
              {s.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
