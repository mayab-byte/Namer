import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

/**
 * Standard hero for inner pages. Opens with a direct answer/summary
 * (GSO commandment #7) placed right under the H1.
 */
export function PageHero({
  kicker,
  title,
  answer,
  crumbs,
  children,
}: {
  kicker?: string;
  title: string;
  answer?: string;
  crumbs: { name: string; href: string }[];
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-ink/10 bg-gray-50">
      <div className="container-x py-12 sm:py-16">
        <Breadcrumbs items={crumbs} />
        {kicker && <p className="kicker font-serif mt-6">{kicker}</p>}
        <h1 className="display mt-3 text-4xl sm:text-6xl">{title}</h1>
        {answer && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-700">{answer}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}
