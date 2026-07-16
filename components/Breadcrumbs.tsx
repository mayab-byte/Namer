import Link from "next/link";

/**
 * Visible breadcrumb trail. Pair with breadcrumbSchema() for BreadcrumbList
 * JSON-LD (GSO commandment #5 — semantic architecture, no orphan pages).
 */
export function Breadcrumbs({
  items,
  dark = false,
}: {
  items: { name: string; href: string }[];
  dark?: boolean;
}) {
  return (
    <nav aria-label="נתיב ניווט" className={`text-sm ${dark ? "text-paper/70" : "text-gray-500"}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className={`font-semibold ${dark ? "text-paper" : "text-ink"}`}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-pink">
                  {item.name}
                </Link>
              )}
              {!last && <span aria-hidden="true" className={dark ? "text-paper/40" : "text-gray-400"}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
