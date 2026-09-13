import { cache } from 'react';
import { getBlogSlug } from '@/utils/helpers';
import type { BlogLanguage } from '@/lib/blogLanguages';
import { s3Asset } from "@/lib/s3Assets";

export type BackendBlog = {
  _id?: string;
  title: string;
  h2Subtitle?: string;
  customSlug?: string;
  language?: BlogLanguage;
  translationGroupId?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  metaRobots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  breadcrumbTitle?: string;
  lastReviewedAt?: string;
  datePublished?: string;
  excerpt?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  emitFaqSchema?: boolean;
  description?: string;
  content?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  createdAt?: string;
  updatedAt?: string;
  /** Absent means published. Only an explicit 'draft' hides an article. */
  status?: 'draft' | 'published';
  /** Absent means human-supplied; only generated versions carry a flag. */
  translationStatus?: 'machine' | 'reviewed';
  /** Fingerprint of this document's own body, refreshed on every save. */
  contentHash?: string;
  /** For a translation: the fingerprint of the English body it came from. */
  sourceContentHash?: string;
};

type BlogsApiResponse = {
  data?: BackendBlog[];
};

export const SITE_BASE_URL = 'https://www.daliladiamonds.com';
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://dalila-inventory-service-dev.caratlogic.com';
export const DEFAULT_BLOG_IMAGE =
  s3Asset("/dalila_img/Dalila_Logo.png");
export const DEFAULT_BLOG_DESCRIPTION =
  'Read our latest insights about diamonds and the diamond industry.';

export function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, '');
}

export function blogToSlug(blog: Pick<BackendBlog, 'title' | 'customSlug'>): string {
  return normalizeSlug(getBlogSlug({ title: blog.title, customSlug: blog.customSlug }));
}

// Revalidation window (seconds) for cached blog reads. Admin create/edit/delete
// busts these immediately via revalidatePath() in app/blogs/actions.ts.
const BLOG_REVALIDATE_SECONDS = 300;

export const getAllBlogs = cache(async (language: BlogLanguage = 'en'): Promise<BackendBlog[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/blogs?page=1&limit=1000&sortBy=createdAt&sortOrder=desc&language=${language}`,
      // The list endpoint omits the article body, so the payload is small and
      // safe to cache. Full content is fetched per-blog in getBlogById.
      { next: { revalidate: BLOG_REVALIDATE_SECONDS } },
    );

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as BlogsApiResponse;
    return Array.isArray(payload.data) ? payload.data : [];
  } catch {
    return [];
  }
});

/**
 * Fetch every blog document in the database with no language filter.
 * Used by the listing page so articles that only exist in one language
 * (e.g. only English so far) are never hidden from other locales.
 */
export const getAllBlogsUnfiltered = cache(async (): Promise<BackendBlog[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/blogs?page=1&limit=1000&sortBy=createdAt&sortOrder=desc`,
      { next: { revalidate: BLOG_REVALIDATE_SECONDS } },
    );

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as BlogsApiResponse;
    return Array.isArray(payload.data) ? payload.data : [];
  } catch {
    return [];
  }
});

/**
 * Every blog document, read fresh on each request.
 *
 * The admin dashboard must never show a version of the data that predates an
 * edit or a duplicate resolution, so this deliberately opts out of the Data
 * Cache that getAllBlogsUnfiltered relies on. React's cache() still dedupes it
 * within a single render.
 */
/**
 * Words carrying no topical signal when matching one article to another.
 * "diamond" is in here deliberately: it appears in nearly every title on this
 * site, so leaving it in would make everything look related to everything.
 */
const RELATED_STOPWORDS = new Set([
  'a','an','the','and','or','but','for','of','to','in','on','at','by','with','from',
  'is','are','was','be','been','it','its','this','that','these','those','you','your',
  'what','which','how','why','when','where','who','should','can','do','does','vs',
  'versus','guide','complete','ultimate','best','top','explained','everything',
  'about','need','know','buying','buyer','buyers','dalila','diamond','diamonds',
]);

function topicalWords(blog: BackendBlog): Set<string> {
  const source = [
    blog.title || '',
    blog.primaryKeyword || '',
    (blog.secondaryKeywords || []).join(' '),
  ].join(' ');

  return new Set(
    source
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/[\s-]+/)
      .filter((word) => word.length > 2 && !RELATED_STOPWORDS.has(word)),
  );
}

/**
 * Pick a handful of genuinely related articles for the sidebar.
 *
 * The sidebar used to list every article, which put ~130 links on each of 627
 * pages. The content packages call for four to six related guides instead, both
 * to stop diluting internal linking and because a catalogue is not navigation.
 *
 * There is no category or tag field to match on, so relatedness is scored from
 * words shared between titles and target keywords. Articles with nothing in
 * common fall back to the most recent, so the sidebar is never empty.
 */
export function selectRelatedBlogs(
  current: BackendBlog,
  all: BackendBlog[],
  limit = 5,
): BackendBlog[] {
  const currentSlug = blogToSlug(current);
  const currentWords = topicalWords(current);

  const candidates = all.filter((blog) => blogToSlug(blog) !== currentSlug);

  const scored = candidates.map((blog) => {
    let overlap = 0;
    for (const word of topicalWords(blog)) {
      if (currentWords.has(word)) overlap += 1;
    }
    return { blog, overlap };
  });

  const related = scored
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      // Same relevance: prefer the more recently published.
      const aDate = a.blog.datePublished || a.blog.createdAt || '';
      const bDate = b.blog.datePublished || b.blog.createdAt || '';
      return bDate.localeCompare(aDate);
    })
    .map((entry) => entry.blog);

  if (related.length >= limit) return related.slice(0, limit);

  // Top up with the newest articles not already chosen.
  const chosen = new Set(related.map((blog) => blogToSlug(blog)));
  const filler = candidates
    .filter((blog) => !chosen.has(blogToSlug(blog)))
    .sort((a, b) => {
      const aDate = a.datePublished || a.createdAt || '';
      const bDate = b.datePublished || b.createdAt || '';
      return bDate.localeCompare(aDate);
    });

  return [...related, ...filler].slice(0, limit);
}

export const getBlogById = cache(async (id: string): Promise<BackendBlog | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
      next: { revalidate: BLOG_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { data?: BackendBlog };
    return payload.data ?? null;
  } catch {
    return null;
  }
});

type BlogBySlugResponse = {
  data?: BackendBlog;
  servedLanguage?: string;
  isFallback?: boolean;
};

/**
 * Resolve one article from its slug.
 *
 * This used to download every blog and match the slug in memory, because the
 * API had no slug lookup - so rendering a single article pulled the whole
 * collection, then fetched the matched document again by id for its body. The
 * query now runs in the database and returns the full document in one call.
 *
 * The endpoint also applies the English fallback, so an article that exists
 * only in English still renders on a localised route.
 */
const fetchBlogBySlug = cache(async (
  slug: string,
  language: BlogLanguage,
): Promise<{ blog: BackendBlog | null; servedLanguage: BlogLanguage; isFallback: boolean }> => {
  const target = normalizeSlug(slug);
  const empty = { blog: null, servedLanguage: language, isFallback: false };
  if (!target) return empty;

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/blogs/by-slug?slug=${encodeURIComponent(target)}&language=${language}`,
      { next: { revalidate: BLOG_REVALIDATE_SECONDS } },
    );

    if (!response.ok) {
      return empty;
    }

    const payload = (await response.json()) as BlogBySlugResponse;
    if (!payload.data) return empty;

    return {
      blog: payload.data,
      servedLanguage: (payload.servedLanguage as BlogLanguage) || language,
      isFallback: Boolean(payload.isFallback),
    };
  } catch {
    return empty;
  }
});

export const getBlogBySlug = cache(async (
  slug: string,
  language: BlogLanguage = 'en',
): Promise<BackendBlog | null> => {
  const { blog } = await fetchBlogBySlug(slug, language);
  return blog;
});

export type LocalizedBlogResult = {
  blog: BackendBlog | null;
  /** True when the requested language had no translation and English is shown. */
  isFallback: boolean;
  /** The language actually served. */
  language: BlogLanguage;
};

/**
 * Resolve an article for a locale, falling back to the English version when
 * that language has no translation yet. Without this, every untranslated
 * article would hard-404 on all non-English locales.
 */
export const getLocalizedBlogBySlug = cache(async (
  slug: string,
  language: BlogLanguage = 'en',
): Promise<LocalizedBlogResult> => {
  // The endpoint applies the English fallback itself and reports whether it
  // did, so this no longer needs a second request to find out.
  const { blog, servedLanguage, isFallback } = await fetchBlogBySlug(slug, language);
  return { blog, isFallback, language: servedLanguage };
});

/**
 * Build a deduplicated blog list for a given locale.
 *
 * Strategy:
 * 1. Fetch ALL documents with no language filter so articles that only have
 *    one language version (e.g. only EN so far) are never hidden.
 * 2. Group documents by translationGroupId.  Articles that predate the
 *    grouping feature (no translationGroupId) are treated as their own group
 *    keyed by _id.
 * 3. For each group pick the best document to show:
 *    a. The version in the requested language  ← preferred
 *    b. The English version                    ← first fallback
 *    c. Any version present                    ← last fallback
 * 4. Return one representative document per article, sorted newest first.
 */
export const getLocalizedBlogList = cache(async (
  language: BlogLanguage = 'en',
): Promise<BackendBlog[]> => {
  const all = await getAllBlogsUnfiltered();
  if (all.length === 0) return [];

  // Group by translationGroupId (or _id for legacy docs without a group).
  const groups = new Map<string, BackendBlog[]>();
  for (const blog of all) {
    const key = blog.translationGroupId || blog._id || blog.customSlug || blog.title;
    if (!key) continue;
    const bucket = groups.get(key);
    if (bucket) {
      bucket.push(blog);
    } else {
      groups.set(key, [blog]);
    }
  }

  const result: BackendBlog[] = [];
  for (const versions of groups.values()) {
    // a. Exact match for requested language
    const exact = versions.find((b) => b.language === language);
    if (exact) { result.push(exact); continue; }

    // b. English fallback
    const english = versions.find((b) => b.language === 'en' || !b.language);
    if (english) { result.push(english); continue; }

    // c. Any version
    result.push(versions[0]);
  }

  // Sort by the OLDEST createdAt within each group so that adding a new
  // language translation never changes the article's position in the listing.
  // The original article's creation date is always the earliest in the group.
  result.sort((a, b) => {
    // Find the earliest createdAt across all versions of each article's group.
    const groupKeyA = a.translationGroupId || a._id || '';
    const groupKeyB = b.translationGroupId || b._id || '';

    const allVersionsA = groups.get(groupKeyA) ?? [a];
    const allVersionsB = groups.get(groupKeyB) ?? [b];

    const oldestA = Math.min(
      ...allVersionsA.map((v) => (v.createdAt ? new Date(v.createdAt).getTime() : 0))
    );
    const oldestB = Math.min(
      ...allVersionsB.map((v) => (v.createdAt ? new Date(v.createdAt).getTime() : 0))
    );

    // Newest article first (by the original creation date, not the translation date).
    return oldestB - oldestA;
  });

  return result;
});

/**
 * Routes that exist only at the top level, with no [locale] counterpart.
 *
 * Prefixing a link to one of these would send a reader to a 404, so they stay
 * as they are and a non-English reader follows them into English.
 */
const ROUTES_WITHOUT_LOCALE = ['downloads', 'limitedEdition', 'sitemap', 'sitemap.xml', 'spec-requests'];

/**
 * Point an article's internal links at the reader's own language.
 *
 * Article bodies are stored with unprefixed paths - /blogs/some-guide - and
 * injected as raw HTML, so a reader on /nl/blogs/... used to follow every
 * internal link straight out of Dutch and into English. There were 809 such
 * links across the translations.
 *
 * Rewriting happens here rather than in the stored content on purpose. The
 * database keeps one canonical body per language, a re-translation cannot undo
 * the work, and every future article is covered without anyone remembering to.
 *
 * A blog link is only localised when that article really exists in the
 * language. Prefixing one that does not would turn a working cross-language
 * link into a 404, and landing on the English article is the better failure.
 */
export function localizeContentLinks(
  html: string,
  locale: string,
  availableBlogSlugs: ReadonlySet<string>,
): string {
  if (!html || !locale || locale === 'en') return html;

  return html.replace(/href="(\/[^"#]*)"/g, (whole, rawPath: string) => {
    const path = rawPath.replace(/\/+$/, '') || '/';

    // Already localised, or a path that is not a page.
    if (new RegExp(`^/${locale}(/|$)`).test(path)) return whole;
    if (path.startsWith('/_') || path.startsWith('/api/')) return whole;

    const [first] = path.slice(1).split('/');
    if (!first || ROUTES_WITHOUT_LOCALE.includes(first)) return whole;

    if (first === 'blogs') {
      const slug = path.slice('/blogs/'.length);
      // The listing itself is always available; an article only when
      // this language actually has it.
      if (slug && !availableBlogSlugs.has(normalizeSlug(slug))) return whole;
    }

    return `href="/${locale}${path}"`;
  });
}
