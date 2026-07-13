import Image from "next/image";

/**
 * Brand leopard mascot. Currently uses a placeholder SVG — drop the real
 * transparent artwork at /public/mascot/leopard.svg (or .png and update src)
 * to swap it everywhere.
 */
export function Mascot({
  size = 120,
  className = "",
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/mascot/leopard.svg"
      alt="נמר סושיאל"
      width={size}
      height={Math.round((size * 200) / 240)}
      className={className}
      priority={priority}
    />
  );
}
