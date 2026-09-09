import { Metadata } from 'next';
import { cache } from 'react';
import {
  SITE_BASE_URL,
  blogToSlug,
  getAllBlogs,
  normalizeSlug,
  type BackendBlog,
} from '@/lib/blogs';
import { BLOG_LANGUAGES, toBlogLanguage } from '@/lib/blogLanguages';
import {
  buildBlogJsonLd,
  buildBlogMetadata,
  buildFallbackBlogMetadata,
} from '@/lib/blogMetadata';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

type LocalisedBlog = {
  blog: BackendBlog;
  url: string;
};

/**
 * Articles for one locale, keyed by slug. Reads the list endpoint, which
 * carries everything the head needs (title, meta description, excerpt, social
 * image, canonical, dates) without the article body.
 */
const getBlogsBySlug = cache(
  async (locale: string): Promise<Record<string, LocalisedBlog>> => {
    const blogs = await getAllBlogs(toBlogLanguage(locale));
    const prefix = locale === 'en' ? '' : `/${locale}`;
    const entries: Record<string, LocalisedBlog> = {};

    for (const blog of blogs) {
      const slug = blogToSlug(blog);
      entries[slug] = {
        blog,
        url: `${SITE_BASE_URL}${prefix}/blogs/${slug}`,
      };
    }
    return entries;
  },
);

/**
 * An article may exist only in English. The page falls back to the English
 * version in that case, so its metadata must describe what is actually served.
 */
const resolveBlogEntry = cache(
  async (locale: string, slugKey: string): Promise<LocalisedBlog | undefined> => {
    const localised = (await getBlogsBySlug(locale))[slugKey];
    if (localised) return localised;
    return (await getBlogsBySlug('en'))[slugKey];
  },
);

export async function generateStaticParams() {
  return [];
}

/**
 * hreflang map for an article: one entry per language that actually has a
 * translation, so search engines can pair the localised versions.
 */
const getLanguageAlternates = cache(
  async (slugKey: string): Promise<Record<string, string>> => {
    const pairs = await Promise.all(
      BLOG_LANGUAGES.map(async (language) => {
        const entries = await getBlogsBySlug(language);
        const url = entries[slugKey]?.url;
        return url ? ([language, url] as const) : null;
      }),
    );

    const languages: Record<string, string> = {};
    for (const pair of pairs) {
      if (pair) languages[pair[0]] = pair[1];
    }
    if (languages.en) {
      languages['x-default'] = languages.en;
    }
    return languages;
  },
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const slugKey = normalizeSlug(slug);
  const entry = await resolveBlogEntry(locale, slugKey);
  const languages = await getLanguageAlternates(slugKey);

  if (entry) {
    return buildBlogMetadata(entry.blog, entry.url, { languages });
  }

  const prefix = locale === 'en' ? '' : `/${locale}`;
  return buildFallbackBlogMetadata(`${SITE_BASE_URL}${prefix}/blogs/${slugKey}`);
}

export default async function BlogDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const slugKey = normalizeSlug(slug);
  const entry = await resolveBlogEntry(locale, slugKey);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const jsonLd = entry
    ? buildBlogJsonLd(entry.blog, entry.url, `${SITE_BASE_URL}${prefix}/blogs`)
    : [];

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  );
}
