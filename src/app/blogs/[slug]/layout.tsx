import { Metadata } from 'next';
import { cache } from 'react';
import {
  SITE_BASE_URL,
  blogToSlug,
  getAllBlogs,
  normalizeSlug,
  type BackendBlog,
} from '@/lib/blogs';
import {
  buildBlogJsonLd,
  buildBlogMetadata,
  buildFallbackBlogMetadata,
} from '@/lib/blogMetadata';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Articles keyed by slug, built once per request.
 *
 * This reads the list endpoint, which omits `content` and `description` for
 * payload reasons. Everything the head needs — title, meta description,
 * excerpt, social image, canonical, dates — is present there, so the body is
 * never fetched just to render metadata.
 */
const getBlogsBySlug = cache(async (): Promise<Record<string, BackendBlog>> => {
  const blogs = await getAllBlogs('en');
  const entries: Record<string, BackendBlog> = {};
  for (const blog of blogs) {
    entries[blogToSlug(blog)] = blog;
  }
  return entries;
});

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugKey = normalizeSlug(slug);
  const url = `${SITE_BASE_URL}/blogs/${slugKey}`;
  const blog = (await getBlogsBySlug())[slugKey];

  return blog ? buildBlogMetadata(blog, url) : buildFallbackBlogMetadata(url);
}

export default async function BlogDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugKey = normalizeSlug(slug);
  const blog = (await getBlogsBySlug())[slugKey];

  const jsonLd = blog
    ? buildBlogJsonLd(
        blog,
        `${SITE_BASE_URL}/blogs/${slugKey}`,
        `${SITE_BASE_URL}/blogs`,
      )
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
