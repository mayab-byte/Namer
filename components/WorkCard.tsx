import Image from "next/image";
import type { Work } from "@/lib/content";
import { asset } from "@/lib/site";

const gradientMap: Record<Work["accent"], string> = {
  pink: "from-pink to-pink-deep",
  lime: "from-lime to-[#7ea300]",
  dark: "from-gray-700 to-ink",
};

export function WorkCard({ work }: { work: Work }) {
  const href = work.handle ? `https://www.instagram.com/${work.handle}` : undefined;
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group flex flex-col overflow-hidden rounded-brand border border-ink/10 bg-paper transition-all hover:-translate-y-1 hover:border-pink"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        {work.image ? (
          <Image
            src={asset(work.image)}
            alt={`${work.title} - עבודה של נמר סושיאל`}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${gradientMap[work.accent]}`} />
        )}
        <span className="absolute right-3 top-3 rounded-full bg-black/45 px-3 py-1 text-xs font-bold text-paper backdrop-blur">
          {work.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-extrabold">{work.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{work.result}</p>
        {work.handle && (
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-pink" dir="ltr">
            @{work.handle}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>
    </Wrapper>
  );
}
