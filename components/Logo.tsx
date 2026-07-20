import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/site";

/**
 * Brand wordmark logo (leopard + "Namer Social"). Uses the white variant on
 * dark backgrounds (footer) and the default black variant elsewhere.
 */
export function Logo({
  variant = "default",
  className = "",
  priority = false,
}: {
  variant?: "default" | "dark";
  className?: string;
  priority?: boolean;
}) {
  const src = variant === "dark" ? "/brand/logo-white.png" : "/brand/logo.png";
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="נמר סושיאל - לעמוד הבית">
      <Image
        src={asset(src)}
        alt="Namer Social"
        width={159}
        height={40}
        priority={priority}
        className="h-9 w-auto"
      />
    </Link>
  );
}
