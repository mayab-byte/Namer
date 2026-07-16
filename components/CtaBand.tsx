import Link from "next/link";
import type { ReactNode } from "react";
import { Mascot } from "./Mascot";
import { asset } from "@/lib/site";

export function CtaBand({
  title = "בואו נצוד.",
  text = "מוכנים להפוך לטורפים בעולם הדיגיטלי?\nבואו נבנה יחד נוכחות שאי אפשר להתעלם ממנה.",
  primaryHref = "/contact",
  primaryLabel = "בואו נדבר",
  secondaryHref = "/works",
  secondaryLabel = "צפו בעבודות",
  showMascot = true,
  straddleMascot = false,
}: {
  title?: string;
  text?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  showMascot?: boolean;
  /** Renders the reclining mascot poking above the section's own top edge,
   * straddling the boundary with whatever comes before it — layered so it
   * sits ON the background but never covers the heading/text below it. */
  straddleMascot?: boolean;
}) {
  return (
    <section className="relative bg-ink text-paper">
      {/* Background layer (z-0): decorative leopard pattern, clipped to the section */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-y-0 right-0 w-full opacity-40 md:w-2/3"
          style={{
            backgroundImage: `url(${asset("/brand/leo-pattern.webp")})`,
            backgroundSize: "cover",
            backgroundPosition: "right center",
            WebkitMaskImage: "linear-gradient(to left, #000 0%, transparent 72%)",
            maskImage: "linear-gradient(to left, #000 0%, transparent 72%)",
          }}
        />
      </div>

      {/* Mascot layer (z-10): above the background, below the text — allowed to
          overflow above the section's own box so it visually straddles the seam. */}
      {straddleMascot && (
        <div className="pointer-events-none absolute inset-x-0 -top-24 z-10 flex justify-center sm:-top-28">
          <Mascot variant="call" size={460} />
        </div>
      )}

      {/* Content layer (z-20): always on top, never obscured */}
      <div className="container-x relative z-20 flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="display text-5xl sm:text-6xl">
            {title.replace(/\.$/, "")}
            <span className="text-pink">.</span>
          </h2>
          <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-gray-200">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={primaryHref} className="btn-pink">
              {primaryLabel}
            </Link>
            <Link href={secondaryHref} className="btn-ghost border-white/25 text-paper hover:border-white/60">
              {secondaryLabel}
            </Link>
          </div>
        </div>
        {showMascot && <Mascot size={220} className="hidden shrink-0 md:block" />}
      </div>
    </section>
  );
}
