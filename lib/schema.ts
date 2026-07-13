/**
 * JSON-LD schema builders (GSO commandment #4 — speak to the model in its
 * own language). Every builder returns a plain object ready to be embedded
 * via the <JsonLd> component.
 */
import { site, siteUrl, sameAs } from "./site";
import type { FAQ, Service, Post } from "./content";

const ORG_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    alternateName: site.nameHe,
    legalName: site.legalName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og.png`,
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.city,
      addressCountry: site.contact.address.country,
    },
    areaServed: "IL",
    sameAs,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteUrl,
    name: site.name,
    inLanguage: "he-IL",
    publisher: { "@id": ORG_ID },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.kicker,
    description: service.answer,
    provider: { "@id": ORG_ID },
    areaServed: "IL",
    url: `${siteUrl}/services/${service.slug}`,
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.href}`,
    })),
  };
}

export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${siteUrl}/og.png`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: "he-IL",
    author: { "@type": "Organization", name: site.name, url: siteUrl },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };
}
