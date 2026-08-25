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
  description?: string;
  content?: string;
  featuredImage?: string;
  createdAt?: string;
  updatedAt?: string;
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

export const getBlogBySlug = cache(async (
  slug: string,
  language: BlogLanguage = 'en',
): Promise<BackendBlog | null> => {
  const target = normalizeSlug(slug);

  // Use the unfiltered pool so legacy articles (no language field in DB) are
  // never excluded. Pick the best language version in-memory.
  const all = await getAllBlogsUnfiltered();

  // Separate docs matching the target slug (by base slug, language-prefix stripped)
  const candidates = all.filter((blog) => blogToSlug(blog) === target);
  if (candidates.length === 0) return null;

  // Prefer the requested language, then English, then any version present.
  const pick =
    candidates.find((b) => b.language === language) ??
    candidates.find((b) => b.language === 'en' || !b.language) ??
    candidates[0];

  if (!pick._id) return pick;

  // The list response omits content/description for performance; fetch the
  // full document by id so the detail page has the article body.
  const full = await getBlogById(pick._id);
  return full ?? pick;
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
  const localized = await getBlogBySlug(slug, language);
  if (localized) {
    return { blog: localized, isFallback: false, language };
  }

  if (language === 'en') {
    return { blog: null, isFallback: false, language };
  }

  const english = await getBlogBySlug(slug, 'en');
  return {
    blog: english,
    isFallback: Boolean(english),
    language: 'en',
  };
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

  // Preserve newest-first order from the API response.
  result.sort((a, b) => {
    const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return tb - ta;
  });

  return result;
});
