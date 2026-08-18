import Link from "next/link";
import type { PackageTier, PackageFeatureRow } from "@/lib/content";

/**
 * Feature-comparison table for the three package tiers — no prices (final
 * quotes are built per business after a discovery call). A real grid table
 * on desktop; the same data reflows into one stacked card per tier on
 * mobile so nothing needs horizontal scrolling to read.
 */
export function PackagesTable({
  tiers,
  rows,
}: {
  tiers: PackageTier[];
  rows: PackageFeatureRow[];
}) {
  return (
    <div>
      <div className="hidden overflow-hidden rounded-brand border border-ink/10 lg:block">
        <div className="grid grid-cols-[1.1fr_repeat(3,minmax(0,1fr))]">
          <div className="border-b border-ink/10 p-6" />
          {tiers.map((t, ti) => (
            <div
              key={t.slug}
              className={`border-b p-6 text-center ${ti < tiers.length - 1 ? "border-e" : ""} border-ink/10 ${
                t.featured ? "bg-ink text-paper" : ""
              }`}
            >
              {t.featured ? (
                <span className="mb-3 inline-block rounded-full bg-pink px-3 py-1 text-xs font-bold text-paper">
                  הכי פופולרי
                </span>
              ) : (
                <span className="mb-3 block h-[26px]" aria-hidden="true" />
              )}
              <p className={`kicker font-serif ${t.featured ? "text-lime" : ""}`}>{t.tierLabel}</p>
              <h3 className="mt-1 text-xl font-extrabold">{t.name}</h3>
            </div>
          ))}

          {rows.map((row, ri) => (
            <FeatureRow key={row.label} row={row} tiers={tiers} striped={ri % 2 === 1} />
          ))}

          <div className="p-6" />
          {tiers.map((t, ti) => (
            <div key={t.slug} className={`p-6 ${ti < tiers.length - 1 ? "border-e border-ink/10" : ""}`}>
              <Link href="/contact" className={`w-full ${t.featured ? "btn-pink" : "btn-dark"}`}>
                בואו נדבר
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:hidden">
        {tiers.map((t, ti) => (
          <div
            key={t.slug}
            className={`rounded-brand border p-6 ${
              t.featured ? "border-pink bg-ink text-paper" : "border-ink/10 bg-paper"
            }`}
          >
            {t.featured && (
              <span className="mb-3 inline-block w-fit rounded-full bg-pink px-3 py-1 text-xs font-bold text-paper">
                הכי פופולרי
              </span>
            )}
            <p className={`kicker font-serif ${t.featured ? "text-lime" : ""}`}>{t.tierLabel}</p>
            <h3 className="mt-1 text-2xl font-extrabold">{t.name}</h3>

            <dl className="mt-6 space-y-4 border-t border-current/10 pt-6">
              {rows.map((row) => (
                <div key={row.label}>
                  <dt className={`text-xs font-bold uppercase tracking-wide ${t.featured ? "text-gray-400" : "text-gray-400"}`}>
                    {row.label}
                  </dt>
                  <dd className={`mt-1 text-sm leading-relaxed ${t.featured ? "text-gray-200" : "text-gray-700"}`}>
                    {row.values[ti]}
                  </dd>
                </div>
              ))}
            </dl>

            <Link href="/contact" className={`mt-7 w-full ${t.featured ? "btn-pink" : "btn-dark"}`}>
              בואו נדבר
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureRow({
  row,
  tiers,
  striped,
}: {
  row: PackageFeatureRow;
  tiers: PackageTier[];
  striped: boolean;
}) {
  return (
    <>
      <div className={`border-e border-b border-ink/10 p-6 text-sm font-bold ${striped ? "bg-gray-50" : ""}`}>
        {row.label}
      </div>
      {row.values.map((value, ti) => (
        <div
          key={ti}
          className={`border-b p-6 text-sm leading-relaxed text-gray-700 ${
            ti < tiers.length - 1 ? "border-e" : ""
          } border-ink/10 ${striped ? "bg-gray-50" : ""}`}
        >
          {value}
        </div>
      ))}
    </>
  );
}
