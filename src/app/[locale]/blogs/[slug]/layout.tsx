import { Metadata } from 'next';
import { cache } from 'react';
import {
  DEFAULT_BLOG_DESCRIPTION,
  DEFAULT_BLOG_IMAGE,
  SITE_BASE_URL,
  blogToSlug,
  getAllBlogs,
  normalizeSlug,
  stripHtml,
  type BackendBlog,
} from '@/lib/blogs';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

type BlogSeoData = {
  title: string;
  description: string;
  url: string;
};

type BlogSchemaData = {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished?: string;
  dateModified?: string;
};

type BlogSeoSchemaEntry = {
  seo: BlogSeoData;
  schema: BlogSchemaData;
};

function getBestDescription(blog: BackendBlog): string {
  if (blog.metaDescription && blog.metaDescription.trim()) {
    return blog.metaDescription.trim();
  }

  const plain = stripHtml(blog.description || blog.content || '');
  if (!plain) {
    return DEFAULT_BLOG_DESCRIPTION;
  }

  return plain.length > 200 ? `${plain.slice(0, 197)}...` : plain;
}

const getBlogSeoSchemaBySlug = cache(async (locale: string): Promise<Record<string, BlogSeoSchemaEntry>> => {
  const blogs = await getAllBlogs();
  const entries: Record<string, BlogSeoSchemaEntry> = {};

  const prefix = locale === 'en' ? '' : `/${locale}`;

  for (const blog of blogs) {
    const slug = blogToSlug(blog);
    const url = `${SITE_BASE_URL}${prefix}/blogs/${slug}`;
    const title = blog.metaTitle?.trim() || blog.title || 'Blog Article - Dalila Diamonds';
    const description = getBestDescription(blog);

    entries[slug] = {
      seo: {
        title,
        description,
        url,
      },
      schema: {
        headline: blog.title || title,
        description,
        url,
        image: blog.featuredImage?.trim() || DEFAULT_BLOG_IMAGE,
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt || blog.createdAt,
      },
    };
  }

  return entries;
});

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  const locales = ['en', 'de', 'fr', 'it', 'nl', 'es'];
  const params: Array<{ slug: string; locale: string }> = [];
  for (const blog of blogs) {
    const slug = blogToSlug(blog);
    for (const locale of locales) {
      params.push({ slug, locale });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const slugKey = normalizeSlug(slug);
  const blogEntries = await getBlogSeoSchemaBySlug(locale);
  const matchedSeo = blogEntries[slugKey]?.seo;

  if (matchedSeo) {
    return {
      title: matchedSeo.title,
      description: matchedSeo.description,
      alternates: {
        canonical: matchedSeo.url,
      },
      openGraph: {
        title: matchedSeo.title,
        description: matchedSeo.description,
        url: matchedSeo.url,
        siteName: 'Dalila Diamonds',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: matchedSeo.title,
        description: matchedSeo.description,
      },
    };
  }

  const prefix = locale === 'en' ? '' : `/${locale}`;
  return {
    title: 'Blog Article - Dalila Diamonds',
    description: DEFAULT_BLOG_DESCRIPTION,
    alternates: {
      canonical: `${SITE_BASE_URL}${prefix}/blogs/${slugKey}`,
    },
    openGraph: {
      title: 'Blog Article - Dalila Diamonds',
      description: DEFAULT_BLOG_DESCRIPTION,
      url: `${SITE_BASE_URL}${prefix}/blogs/${slugKey}`,
      siteName: 'Dalila Diamonds',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog Article - Dalila Diamonds',
      description: DEFAULT_BLOG_DESCRIPTION,
    },
  };
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
  const blogEntries = await getBlogSeoSchemaBySlug(locale);
  const schemaConfig = blogEntries[slugKey]?.schema;

  const blogPostingSchema = schemaConfig
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': schemaConfig.url,
        },
        headline: schemaConfig.headline,
        description: schemaConfig.description,
        image: schemaConfig.image,
        ...(schemaConfig.datePublished ? { datePublished: schemaConfig.datePublished } : {}),
        ...(schemaConfig.dateModified ? { dateModified: schemaConfig.dateModified } : {}),
        author: {
          '@type': 'Organization',
          name: 'Dalila Diamonds',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Dalila Diamonds',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png',
          },
        },
      }
    : null;

  return (
    <>
      {blogPostingSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        />
      )}
      {children}
    </>
  );
}
