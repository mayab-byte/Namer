import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Mascot } from "./Mascot";
import { asset } from "@/lib/site";

type Variant = "cream" | "pink" | "lime" | "dark" | "darkPattern";
type MascotPose = "head" | "peek" | "call";

const styles: Record<
  Variant,
  { bg: string; dark: boolean; kicker: string; title: string; answer: string }
> = {
  cream: { bg: "bg-gray-50", dark: false, kicker: "text-pink", title: "text-ink", answer: "text-gray-700" },
  pink: { bg: "bg-pink", dark: false, kicker: "text-paper", title: "text-ink", answer: "text-ink/80" },
  lime: { bg: "bg-lime", dark: false, kicker: "text-pink-deep", title: "text-ink", answer: "text-ink/75" },
  dark: { bg: "bg-ink", dark: true, kicker: "text-lime", title: "text-paper", answer: "text-gray-200" },
  darkPattern: { bg: "bg-ink", dark: true, kicker: "text-lime", title: "text-paper", answer: "text-gray-200" },
};

/**
 * Per-page hero. Each page picks a `variant` (brand palette) and optional
 * `mascot` pose, so every page gets a distinct hero within one design language.
 * Opens with a direct answer under the H1 (GSO commandment #7).
 */
export function PageHero({
  kicker,
  title,
  answer,
  crumbs,
  children,
  variant = "cream",
  mascot,
  sideMedia,
}: {
  kicker?: string;
  title: string;
  answer?: ReactNode;
  crumbs: { name: string; href: string }[];
  children?: ReactNode;
  variant?: Variant;
  mascot?: MascotPose;
  /** Small standalone character clip placed beside the answer paragraph
   * (e.g. <TigerAnim />) — an alternative to the large corner `mascot`. */
  sideMedia?: ReactNode;
}) {
  const s = styles[variant];
  return (
    <header className={`relative overflow-hidden border-b border-ink/10 ${s.bg}`}>
      {variant === "darkPattern" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-2/3 opacity-40"
          style={{
            backgroundImage: `url(${asset("/brand/leo-pattern.webp")})`,
            backgroundSize: "cover",
            backgroundPosition: "left center",
            WebkitMaskImage: "linear-gradient(to right, #000 0%, transparent 75%)",
            maskImage: "linear-gradient(to right, #000 0%, transparent 75%)",
          }}
        />
      )}

      {mascot && (
        <div className="pointer-events-none absolute bottom-0 left-4 hidden items-end md:flex lg:left-10">
          <Mascot variant={mascot} size={mascot === "call" ? 320 : 220} />
        </div>
      )}

      <div className="container-x relative z-10 py-12 sm:py-16">
        <Breadcrumbs items={crumbs} dark={s.dark} />
        {kicker && <p className={`kicker font-serif mt-6 ${s.kicker}`}>{kicker}</p>}
        <h1 className={`display mt-3 max-w-3xl text-4xl sm:text-6xl ${s.title}`}>{title}</h1>
        {answer && (
          <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <p className={`max-w-2xl text-lg leading-relaxed ${s.answer}`}>{answer}</p>
            {sideMedia && <div className="shrink-0">{sideMedia}</div>}
          </div>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}
