/**
 * Blog content languages supported by the backend (subset of site locales).
 * Dutch (nl) exists on the site but is not a blog language yet.
 */

export type BlogLanguage = "en" | "de" | "fr" | "it" | "es";

export const BLOG_LANGUAGES: BlogLanguage[] = ["en", "de", "fr", "it", "es"];

export const BLOG_LANGUAGE_OPTIONS: { code: BlogLanguage; label: string }[] = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "es", label: "Español" },
];

const BLOG_LANGUAGE_SET = new Set<string>(BLOG_LANGUAGES);

export function isBlogLanguage(value: string | undefined | null): value is BlogLanguage {
  return !!value && BLOG_LANGUAGE_SET.has(value);
}

/** Map a site locale to a blog API language (unsupported locales fall back to English). */
export function toBlogLanguage(locale: string | undefined | null): BlogLanguage {
  if (isBlogLanguage(locale)) return locale;
  return "en";
}

/** Strip a leading language prefix from a stored customSlug (e.g. "es/my-blog" → "my-blog"). */
export function getBlogBaseSlug(customSlug: string | undefined | null): string {
  if (!customSlug) return "";
  const cleaned = customSlug.replace(/^\/+|\/+$/g, "").trim();
  const match = cleaned.match(/^(en|de|fr|it|es)\/(.+)$/i);
  if (match) return match[2];
  return cleaned;
}

/** Infer language from a stored customSlug prefix; defaults to en. */
export function getBlogLanguageFromSlug(
  customSlug: string | undefined | null,
  fallback: BlogLanguage = "en",
): BlogLanguage {
  if (!customSlug) return fallback;
  const cleaned = customSlug.replace(/^\/+|\/+$/g, "").trim();
  const match = cleaned.match(/^(en|de|fr|it|es)\//i);
  if (match && isBlogLanguage(match[1].toLowerCase())) {
    return match[1].toLowerCase() as BlogLanguage;
  }
  return fallback;
}

/**
 * Build the admin-visible slug path for a language.
 * English → `/my-blog`
 * Spanish → `/es/my-blog`
 * Italiano → `/it/my-blog`
 */
export function buildLocalizedBlogSlug(
  language: BlogLanguage,
  slugOrBase: string | undefined | null,
): string {
  const base = getBlogBaseSlug(slugOrBase).trim().replace(/^\/+|\/+$/g, "");
  if (!base) {
    return language === "en" ? "/" : `/${language}/`;
  }
  return language === "en" ? `/${base}` : `/${language}/${base}`;
}

/** @deprecated Use buildLocalizedBlogSlug — kept for existing imports. */
export function previewBlogSlugPath(language: BlogLanguage, baseSlug: string): string {
  return buildLocalizedBlogSlug(language, baseSlug);
}
