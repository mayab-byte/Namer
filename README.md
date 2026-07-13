# Namer Social — אתר תדמית (Next.js)

אתר תדמית רב-עמודי לסוכנות **Namer Social** — סוכנות סושיאל, וידאו וקמפיינים.
נבנה עם דגש על **מהירות, נגישות ו-GSO** (Generative Search Optimization) —
כך שגם בני אדם וגם מנועי בינה מלאכותית (ChatGPT, Claude, Gemini, Perplexity)
יכולים לקרוא, להבין ולצטט את התוכן.

## סטאק

- **Next.js 16** (App Router) + **React 19** — רינדור סטטי/שרת, HTML קריא לבוטים
- **TypeScript**
- **Tailwind CSS v4** — מערכת עיצוב עם טוקנים של המותג
- **next/font** — Heebo (עברית) + Bodoni Moda (הדגשות סריף), נטענים עצמאית

## הרצה מקומית

```bash
npm install
npm run dev      # פיתוח → http://localhost:3000
npm run build    # בנייה לפרודקשן
npm start        # הרצת גרסת פרודקשן
```

## מבנה

```
app/                עמודים (App Router) + robots/sitemap/manifest
  services/[slug]/  עמודי שירות (hub & spoke)
  blog/[slug]/      מאמרים
components/          רכיבי UI משותפים
lib/
  site.ts           קונפיגורציה: שם, כתובת, קשר, ניווט, רשתות
  content.ts        כל התוכן (שירותים, FAQ, חבילות, תהליך, בלוג)
  schema.ts         בוני JSON-LD (Organization, Service, FAQPage, Article...)
public/
  mascot/           מאסקוט הנמר  ← placeholder, ראו למטה
```

## שכבת GSO/SEO

- `robots.ts` — פותח את הדלת לכל הבוטים הגנרטיביים (GPTBot, ClaudeBot, PerplexityBot, Google-Extended ועוד)
- `sitemap.ts` — מפת אתר מלאה ומעודכנת
- JSON-LD בכל עמוד: Organization, WebSite, Service, FAQPage, BreadcrumbList, Article
- כל עמוד פותח ב**תשובה ישירה** ב-100 המילים הראשונות
- בלוקים אטומיים + FAQ בכל עמוד מרכזי
- מטא-דאטה, Open Graph ו-canonical לכל עמוד

## ⚠️ פריטים להחלפה לפני עלייה לאוויר (placeholders)

1. **מאסקוט הנמר** — `public/mascot/leopard.svg` הוא placeholder מסוגנן.
   יש להחליף בקבצי ה-PNG/SVG הרשמיים (רקע שקוף) של המותג.
2. **פרטי קשר** — אימייל, טלפון וכתובת ב-`lib/site.ts` הם placeholders מהעיצוב.
3. **כתובת האתר** — נקבעת ע"י `NEXT_PUBLIC_SITE_URL` (ברירת מחדל: `https://www.namersocial.co.il`).
4. **פונט Ploni** — הוחלף ב-Heebo (חינמי) בשל רישוי. ניתן להחליף אם יש רישיון.
5. **מספרים/סטטיסטיקות** ב-`lib/content.ts` הם להמחשה — יש להחליף בנתונים אמיתיים עם מקור.
6. **טופס יצירת קשר** — כרגע עובד דרך `mailto:`. לחיבור ל-CRM/endpoint ראו `components/ContactForm.tsx`.
