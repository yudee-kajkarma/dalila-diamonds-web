/**
 * Slug utility functions for URL-safe string generation
 */

import { getBlogBaseSlug } from "@/lib/blogLanguages";

/**
 * Generates a URL-safe slug from a string
 * @param text - The text to convert to slug
 * @returns URL-safe slug string
 */
export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Remove special characters
    .replace(/[^\w\s-]/g, '')
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Replace multiple hyphens with single hyphen
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Gets the slug from a blog, using customSlug if available or generating from title.
 * Strips a language prefix (e.g. "es/my-blog" → "my-blog") so frontend routes stay
 * /blogs/my-blog or /es/blogs/my-blog rather than embedding the prefix twice.
 */
export function getBlogSlug(blog: { title: string; customSlug?: string }): string {
  if (blog.customSlug && blog.customSlug.trim()) {
    return getBlogBaseSlug(blog.customSlug);
  }
  return generateSlug(blog.title);
}
