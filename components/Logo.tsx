import Link from "next/link";
import { Mascot } from "./Mascot";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="נמר סושיאל — לעמוד הבית"
    >
      <Mascot size={40} priority />
      <span className="text-xl font-extrabold tracking-tight">
        Namer<span className="text-pink"> Social</span>
      </span>
    </Link>
  );
}
