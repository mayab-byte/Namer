import Link from "next/link";
import { Mascot } from "./Mascot";
import { asset } from "@/lib/site";

export function CtaBand({
  title = "בואו נצוד.",
  text = "מוכנים להפוך לטורפים בעולם הדיגיטלי? בואו נבנה יחד נוכחות שאי אפשר להתעלם ממנה.",
  primaryHref = "/contact",
  primaryLabel = "בואו נדבר",
  secondaryHref = "/works",
  secondaryLabel = "צפו בעבודות",
  showMascot = true,
}: {
  title?: string;
  text?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  showMascot?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* Decorative leopard pattern — right side, ~40% opacity, gradient-faded into the black */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-40 md:w-2/3"
        style={{
          backgroundImage: `url(${asset("/brand/leo-pattern.webp")})`,
          backgroundSize: "cover",
          backgroundPosition: "right center",
          WebkitMaskImage: "linear-gradient(to left, #000 0%, transparent 72%)",
          maskImage: "linear-gradient(to left, #000 0%, transparent 72%)",
        }}
      />
      <div className="container-x relative z-10 flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="display text-5xl sm:text-6xl">
            {title.replace(/\.$/, "")}
            <span className="text-pink">.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-200">{text}</p>
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
