import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { posts, getPost } from "@/lib/content";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const crumbs = [
    { name: "בית", href: "/" },
    { name: "בלוג", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ];
  const related = posts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <JsonLd data={[articleSchema(post), breadcrumbSchema(crumbs)]} />
      <PageHero kicker={post.category} title={post.title} answer={post.excerpt} crumbs={crumbs}>
        <p className="text-sm text-gray-500">
          פורסם ב-{post.datePublished} · עודכן ב-{post.dateModified} · {post.readingTime}
        </p>
      </PageHero>

      <Section>
        <article className="max-w-3xl">
          {post.body.map((block) => (
            <section key={block.heading} className="mb-10">
              <h2 className="text-2xl font-extrabold">{block.heading}</h2>
              {block.paragraphs.map((para, i) => (
                <p key={i} className="mt-4 text-lg leading-relaxed text-gray-700">
                  {para}
                </p>
              ))}
            </section>
          ))}

          <div className="mt-4 rounded-brand border border-ink/10 bg-gray-50 p-6 text-sm text-gray-600">
            נכתב על ידי צוות {site.name} - סוכנות סושיאל, וידאו וקידום.
          </div>
        </article>

        {related.length > 0 && (
          <div className="mt-16 border-t border-ink/10 pt-10">
            <h2 className="text-xl font-extrabold">מאמרים נוספים</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}`} className="font-semibold hover:text-pink">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <CtaBand />
    </>
  );
}
