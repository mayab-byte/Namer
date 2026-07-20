import Link from "next/link";
import { Mascot } from "@/components/Mascot";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <Mascot size={140} />
      <p className="kicker font-serif mt-8">404</p>
      <h1 className="display mt-3 text-5xl sm:text-6xl">העמוד נעלם מהפיד.</h1>
      <p className="mt-5 max-w-md text-lg text-gray-500">
        לא מצאנו את העמוד שחיפשתם. אולי הוא עבר, אולי הקישור שגוי - בואו נחזיר אתכם למסלול.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-pink">
          חזרה לעמוד הבית
        </Link>
        <Link href="/services" className="btn-ghost">
          לשירותים שלנו
        </Link>
      </div>
    </section>
  );
}
