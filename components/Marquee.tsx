/**
 * Infinite scrolling wordmark band (brand motion — "NAMER SOCIAL").
 * Pure CSS; respects prefers-reduced-motion via globals.css.
 */
export function Marquee({ text = "NAMER SOCIAL" }: { text?: string }) {
  const items = Array.from({ length: 8 });
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-lime py-4 select-none" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {items.map((_, i) => (
          <span key={i} className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {text} <span className="text-pink">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
