import { DepthReveal } from "./DepthReveal";
import { works } from "@/lib/content";

/**
 * The "Testimonials" beat from the master spec, built from verified data
 * only (real client handles, categories and results already confirmed from
 * their public profiles) rather than invented spoken quotes.
 */
export function TrustSection() {
  return (
    <section className="bg-ink py-24 text-paper sm:py-32">
      <div className="container-x">
        <DepthReveal>
          <p className="kicker font-serif text-lime">Real trust</p>
          <h2 className="display mt-4 max-w-2xl text-4xl sm:text-5xl">
            עסקים אמיתיים, תוצאות אמיתיות.
          </h2>
        </DepthReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {works.map((w, i) => (
            <DepthReveal key={w.slug} delay={i * 0.08}>
              <div className="rounded-brand border border-white/10 bg-white/[.03] p-6 backdrop-blur-sm">
                <p className="text-lg font-extrabold">{w.title}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-lime">
                  {w.category}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-gray-300">{w.result}</p>
              </div>
            </DepthReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
