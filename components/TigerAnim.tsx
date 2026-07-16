import Image from "next/image";
import { asset } from "@/lib/site";

/**
 * Small standalone animated tiger clip (transparent background, foreground
 * character only — never used as a section background). Placed beside body
 * text per the brand direction: the tiger reads as a character, not a scene.
 */
export function TigerAnim({
  className = "",
  size = 160,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src={asset("/mascot/tiger-anim.webp")}
      alt="נמר סושיאל"
      width={size}
      height={size}
      className={`h-auto w-auto object-contain ${className}`}
    />
  );
}
