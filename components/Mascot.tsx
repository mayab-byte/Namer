import Image from "next/image";
import { asset } from "@/lib/site";

/**
 * Brand leopard mascot (the sunglasses head). Swap `variant` to use the
 * peeking cub or the reclining "call" divider illustration.
 */
const SOURCES = {
  head: "/mascot/mascot.png",
  peek: "/mascot/peek.png",
  call: "/mascot/call-divider.png",
} as const;

export function Mascot({
  size = 120,
  variant = "head",
  className = "",
  priority = false,
}: {
  size?: number;
  variant?: keyof typeof SOURCES;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={asset(SOURCES[variant])}
      alt="נמר סושיאל"
      width={size}
      height={size}
      priority={priority}
      className={`h-auto w-auto object-contain ${className}`}
      style={{ maxWidth: size }}
    />
  );
}
