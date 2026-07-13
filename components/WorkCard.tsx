import type { Work } from "@/lib/content";

const gradientMap: Record<Work["accent"], string> = {
  pink: "from-pink to-pink-deep",
  lime: "from-lime to-[#7ea300]",
  dark: "from-gray-700 to-ink",
};

export function WorkCard({ work }: { work: Work }) {
  return (
    <article className="group overflow-hidden rounded-brand border border-ink/10 bg-paper">
      <div className={`relative aspect-[4/3] bg-gradient-to-br ${gradientMap[work.accent]}`}>
        <span className="absolute right-4 top-4 rounded-full bg-black/25 px-3 py-1 text-xs font-bold text-paper backdrop-blur">
          {work.category}
        </span>
        <div className="absolute inset-0 flex items-end p-5">
          <span className="text-3xl font-extrabold text-paper/95 transition-transform duration-300 group-hover:-translate-y-1">
            {work.title}
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm font-semibold text-gray-700">{work.result}</p>
      </div>
    </article>
  );
}
