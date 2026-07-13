import Link from "next/link";

/**
 * Visible breadcrumb trail. Pair with breadcrumbSchema() for BreadcrumbList
 * JSON-LD (GSO commandment #5 — semantic architecture, no orphan pages).
 */
export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav aria-label="נתיב ניווט" className="text-sm text-gray-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-semibold text-ink">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-pink">
                  {item.name}
                </Link>
              )}
              {!last && <span aria-hidden="true" className="text-gray-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
