import { stats as defaultStats } from "@/lib/content";

export function Stats({
  items = defaultStats,
  dark = false,
}: {
  items?: { value: string; label: string }[];
  dark?: boolean;
}) {
  return (
    <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="text-center md:text-start">
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className={`block text-4xl font-extrabold sm:text-5xl ${dark ? "text-lime" : "text-pink"}`}>
              {s.value}
            </span>
            <span className={`mt-2 block text-sm ${dark ? "text-gray-300" : "text-gray-500"}`}>
              {s.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
