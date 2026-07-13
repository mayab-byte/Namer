"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-ink/10 bg-paper/85 backdrop-blur"
          : "border-transparent bg-paper"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="ניווט ראשי">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                isActive(item.href)
                  ? "text-pink"
                  : "text-gray-700 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn-pink hidden text-sm sm:inline-flex">
            בואו נדבר
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">תפריט</span>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-ink/10 bg-paper lg:hidden">
          <nav className="container-x flex flex-col py-3" aria-label="ניווט נייד">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-xl px-3 py-3 text-base font-semibold ${
                  isActive(item.href) ? "bg-gray-50 text-pink" : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-pink mt-2">
              בואו נדבר
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
