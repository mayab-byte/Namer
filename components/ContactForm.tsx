"use client";

import { useState } from "react";
import { site } from "@/lib/site";

/**
 * Contact form. With no backend wired yet, it composes a pre-filled email via
 * a mailto: link so the form is fully functional out of the box. Swap
 * handleSubmit for a POST to your form endpoint / CRM when ready.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const business = String(data.get("business") || "");
    const phone = String(data.get("phone") || "");
    const message = String(data.get("message") || "");
    const body = `שם: ${name}\nעסק: ${business}\nטלפון: ${phone}\n\n${message}`;
    const subject = `פנייה חדשה מהאתר — ${name}`;
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-base outline-none focus:border-pink";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="טופס יצירת קשר">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
            שם מלא
          </label>
          <input id="name" name="name" required className={field} placeholder="השם שלכם" />
        </div>
        <div>
          <label htmlFor="business" className="mb-1.5 block text-sm font-semibold">
            שם העסק
          </label>
          <input id="business" name="business" className={field} placeholder="שם העסק / המותג" />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">
          טלפון
        </label>
        <input id="phone" name="phone" type="tel" required className={field} placeholder="050-0000000" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">
          במה נוכל לעזור?
        </label>
        <textarea id="message" name="message" rows={4} className={field} placeholder="ספרו לנו קצת על העסק ועל המטרות" />
      </div>
      <button type="submit" className="btn-pink w-full sm:w-auto">
        שליחת הפנייה
      </button>
      {sent && (
        <p role="status" className="text-sm font-semibold text-pink">
          תודה! נפתח עבורכם חלון מייל עם הפרטים — רק ללחוץ שליחה. אפשר גם להתקשר אלינו ישירות.
        </p>
      )}
    </form>
  );
}
