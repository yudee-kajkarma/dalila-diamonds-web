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

export const getAllBlogs = cache(async (): Promise<BackendBlog[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/blogs?page=1&limit=1000&sortBy=createdAt&sortOrder=desc`,
      { next: { revalidate: 600 } },
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

export const getBlogBySlug = cache(async (slug: string): Promise<BackendBlog | null> => {
  const target = normalizeSlug(slug);
  const blogs = await getAllBlogs();
  return blogs.find((blog) => blogToSlug(blog) === target) ?? null;
});
