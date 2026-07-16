/**
 * Two-row looping marquee band (brand energy). Each row duplicates its phrase
 * list once and animates by -50%/50% for a seamless loop. Pure CSS; respects
 * prefers-reduced-motion via globals.css.
 */
function Row({
  phrases,
  reverse = false,
  dark = false,
}: {
  phrases: string[];
  reverse?: boolean;
  dark?: boolean;
}) {
  const group = (
    <div className="flex shrink-0 items-center">
      {phrases.map((p, i) => (
        <span key={i} className="flex items-center whitespace-nowrap text-lg font-extrabold sm:text-xl">
          {p}
          <span className={dark ? "px-5 text-lime" : "px-5 text-pink"} aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div
      className={`overflow-hidden py-3 ${dark ? "bg-ink text-paper" : "bg-lime text-ink"}`}
      aria-hidden="true"
    >
      <div className={`flex w-max ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {group}
        {group}
      </div>
    </div>
  );
}

export function HeroMarquee({
  top,
  bottom,
}: {
  top: string[];
  bottom: string[];
}) {
  return (
    <div className="border-y border-ink/10">
      <Row phrases={top} />
      <Row phrases={bottom} reverse dark />
    </div>
  );
}
