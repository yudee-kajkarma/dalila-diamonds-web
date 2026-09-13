import type { Metadata } from "next";
import {
  DEFAULT_BLOG_DESCRIPTION,
  DEFAULT_BLOG_IMAGE,
  SITE_BASE_URL,
  stripHtml,
  type BackendBlog,
} from "@/lib/blogs";
import { s3Asset } from "@/lib/s3Assets";

const DEFAULT_TITLE = "Blog Article - Dalila Diamonds";

/**
 * Robots directive applied when an article does not override it.
 * max-image-preview:large lets Google show the hero image at full size in
 * search results, which the content packages ask for on every article.
 */
export const DEFAULT_META_ROBOTS = "index, follow, max-image-preview:large";

/**
 * Social images must be absolute and publicly reachable. Uploads already are
 * (they come back as S3 URLs), but an admin can paste a relative path into the
 * featured image field, so those are resolved against the asset base.
 */
function toAbsoluteUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  // Reject data URIs outright: a crawler cannot fetch one, and legacy records
  // may still hold base64 from before uploads were wired up.
  if (trimmed.startsWith("data:")) return undefined;
  return s3Asset(trimmed);
}

export function resolveBlogTitle(blog: BackendBlog): string {
  return blog.metaTitle?.trim() || blog.title?.trim() || DEFAULT_TITLE;
}

/**
 * Meta description, in the order the content packages expect.
 *
 * `excerpt` matters here: the list endpoint strips `content` and
 * `description`, so when metadata is built from list data those are the only
 * two fields that are reliably present.
 */
export function resolveBlogDescription(blog: BackendBlog): string {
  const meta = blog.metaDescription?.trim();
  if (meta) return meta;

  const excerpt = blog.excerpt?.trim();
  if (excerpt) return excerpt;

  const plain = stripHtml(blog.content || blog.description || "");
  if (!plain) return DEFAULT_BLOG_DESCRIPTION;
  return plain.length > 200 ? `${plain.slice(0, 197)}...` : plain;
}

/** The image used for og:image and twitter:image, or undefined when there is none. */
export function resolveSocialImage(
  blog: BackendBlog,
): { url: string; alt: string } | undefined {
  const url = toAbsoluteUrl(blog.ogImage) || toAbsoluteUrl(blog.featuredImage);
  if (!url) return undefined;
  return {
    url,
    alt: blog.featuredImageAlt?.trim() || blog.title?.trim() || "Dalila Diamonds",
  };
}

export function resolveCanonical(blog: BackendBlog, derivedUrl: string): string {
  return blog.canonicalUrl?.trim() || derivedUrl;
}

/**
 * Build the full <head> metadata for one article.
 *
 * `derivedUrl` is the URL this article is being served at, used as the
 * canonical unless the article overrides it (merged pages need to point at
 * the surviving URL).
 */
export function buildBlogMetadata(
  blog: BackendBlog,
  derivedUrl: string,
  extra?: { languages?: Record<string, string> },
): Metadata {
  const title = resolveBlogTitle(blog);
  const description = resolveBlogDescription(blog);
  const canonical = resolveCanonical(blog, derivedUrl);
  const social = resolveSocialImage(blog);

  return {
    title,
    description,
    robots: blog.metaRobots?.trim() || DEFAULT_META_ROBOTS,
    alternates: {
      canonical,
      ...(extra?.languages && Object.keys(extra.languages).length > 1
        ? { languages: extra.languages }
        : {}),
    },
    openGraph: {
      title: blog.ogTitle?.trim() || title,
      description: blog.ogDescription?.trim() || description,
      url: canonical,
      siteName: "Dalila Diamonds",
      type: "article",
      ...(blog.datePublished ? { publishedTime: blog.datePublished } : {}),
      ...(blog.updatedAt ? { modifiedTime: blog.updatedAt } : {}),
      ...(social ? { images: [{ url: social.url, alt: social.alt }] } : {}),
    },
    twitter: {
      // Only promise a large image when there is one. Declaring
      // summary_large_image with no image renders an empty card, which is
      // worse than the small card summary produces.
      card: social ? "summary_large_image" : "summary",
      title: blog.ogTitle?.trim() || title,
      description: blog.ogDescription?.trim() || description,
      ...(social ? { images: [{ url: social.url, alt: social.alt }] } : {}),
    },
  };
}

/** Metadata for a slug with no matching article, so the page still has a valid head. */
export function buildFallbackBlogMetadata(url: string): Metadata {
  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_BLOG_DESCRIPTION,
    robots: DEFAULT_META_ROBOTS,
    alternates: { canonical: url },
    openGraph: {
      title: DEFAULT_TITLE,
      description: DEFAULT_BLOG_DESCRIPTION,
      url,
      siteName: "Dalila Diamonds",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: DEFAULT_TITLE,
      description: DEFAULT_BLOG_DESCRIPTION,
    },
  };
}

type JsonLd = Record<string, unknown>;

/**
 * BlogPosting plus BreadcrumbList.
 *
 * The author stays an Organization rather than a Person: the stored
 * `authorName` is the admin account that typed the article, not a credited
 * writer, and the content packages are explicit that a byline must not be
 * invented.
 */
export function buildBlogJsonLd(
  blog: BackendBlog,
  derivedUrl: string,
  breadcrumbBase: string,
  /**
   * Article body, needed only to build FAQ schema.
   *
   * Metadata is otherwise assembled from the list endpoint, which strips
   * `content` - so an article that opts into FAQ schema has to be handed its
   * body separately or the schema comes out empty.
   */
  content?: string,
): JsonLd[] {
  const title = resolveBlogTitle(blog);
  const description = resolveBlogDescription(blog);
  const canonical = resolveCanonical(blog, derivedUrl);
  const social = resolveSocialImage(blog);
  const published = blog.datePublished || blog.createdAt;
  const modified = blog.updatedAt || published;

  const blogPosting: JsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    headline: blog.title?.trim() || title,
    description,
    url: canonical,
    image: social?.url || DEFAULT_BLOG_IMAGE,
    ...(blog.language ? { inLanguage: blog.language } : {}),
    ...(published ? { datePublished: published } : {}),
    ...(modified ? { dateModified: modified } : {}),
    author: { "@type": "Organization", name: "Dalila Diamonds" },
    publisher: {
      "@type": "Organization",
      name: "Dalila Diamonds",
      logo: {
        "@type": "ImageObject",
        url: s3Asset("/dalila_img/Dalila_Logo.png"),
      },
    },
  };

  const faqPage = buildFaqSchema(blog, content ?? blog.content ?? "");

  const breadcrumb: JsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blogs", item: breadcrumbBase },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.breadcrumbTitle?.trim() || blog.title?.trim() || title,
        item: canonical,
      },
    ],
  };

  return faqPage ? [blogPosting, breadcrumb, faqPage] : [blogPosting, breadcrumb];
}

/**
 * FAQPage structured data, built from the article's collapsible blocks.
 *
 * Only emitted when the article opts in. New articles should not carry FAQ
 * schema - the content packages are explicit about that - but the articles
 * migrated from the old hardcoded pages already have FAQ rich results, and
 * dropping them on migration would be a regression.
 */
function buildFaqSchema(blog: BackendBlog, html: string): JsonLd | null {
  if (!blog.emitFaqSchema || !html) return null;

  const entries: Array<{ question: string; answer: string }> = [];

  const pattern =
    /<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) !== null) {
    const question = stripHtml(match[1]);
    const answer = stripHtml(match[2]);
    if (question && answer) entries.push({ question, answer });
  }

  if (entries.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}
