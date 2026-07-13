import Link from "next/link";
import { Mascot } from "./Mascot";

export function CtaBand({
  title = "בואו נצוד.",
  text = "מוכנים להפוך לטורפים בעולם הדיגיטלי? בואו נבנה יחד נוכחות שאי אפשר להתעלם ממנה.",
  primaryHref = "/contact",
  primaryLabel = "בואו נדבר",
  secondaryHref = "/works",
  secondaryLabel = "צפו בעבודות",
}: {
  title?: string;
  text?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="bg-ink text-paper">
      <div className="container-x flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between">
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
        <Mascot size={200} className="hidden shrink-0 md:block" />
      </div>
    </section>
  );
}
