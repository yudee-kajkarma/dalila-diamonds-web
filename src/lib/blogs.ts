import { cache } from 'react';
import { getBlogSlug } from '@/utils/helpers';

export type BackendBlog = {
  _id?: string;
  title: string;
  h2Subtitle?: string;
  customSlug?: string;
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
export const DEFAULT_BLOG_IMAGE = `${SITE_BASE_URL}/dalila_img/Dalila_Logo.png`;
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

export const getAllBlogs = cache(async (): Promise<BackendBlog[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/blogs?page=1&limit=1000&sortBy=createdAt&sortOrder=desc`,
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

export const getBlogBySlug = cache(async (slug: string): Promise<BackendBlog | null> => {
  const target = normalizeSlug(slug);
  const blogs = await getAllBlogs();
  const match = blogs.find((blog) => blogToSlug(blog) === target);
  if (!match?._id) {
    return match ?? null;
  }

  // The list response omits content/description for performance; fetch the
  // full document by id so the detail page has the article body.
  const full = await getBlogById(match._id);
  return full ?? match;
});
