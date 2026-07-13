import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  dark = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${dark ? "bg-ink text-paper" : ""} py-16 sm:py-24 ${className}`}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  intro,
  align = "start",
  dark = false,
}: {
  kicker?: string;
  title: ReactNode;
  intro?: string;
  align?: "start" | "center";
  dark?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {kicker && <p className="kicker font-serif">{kicker}</p>}
      <h2 className={`display mt-3 text-4xl sm:text-5xl ${dark ? "text-paper" : "text-ink"}`}>
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-gray-200" : "text-gray-500"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
