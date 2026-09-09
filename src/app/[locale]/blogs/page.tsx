import { Suspense } from "react";
import { marcellus, jost } from "@/lib/fonts";
import ArticlesBanner from "@/components/pages/blogs/ArticlesBanner";
import { blogToSlug, getLocalizedBlogList } from "@/lib/blogs";
import { toBlogLanguage } from "@/lib/blogLanguages";
import type { Locale } from "@/lib/i18n/config";
import BlogAdminBar from "@/app/blogs/BlogAdminBar";
import BlogsListing, {
  BlogsListingView,
  type BlogListingItem,
} from "@/app/blogs/BlogsListing";

type Props = {
  params: Promise<{ locale: string }>;
};

// Statically prerendered per locale (see [locale]/layout.tsx). Pagination
// reads ?page client-side in BlogsListing so this page never needs
// per-request SSR.
export default async function Page({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = (localeParam || "en") as Locale;

  const blogLanguage = toBlogLanguage(locale);
  // Every article now comes from the CMS, including the seven that used to be
  // hardcoded, so there is no static set to merge and no filter hiding them.
  const apiBlogs = await getLocalizedBlogList(blogLanguage);

  const localizedPath = (path: string) => {
    if (!locale || locale === "en") return path;
    return `/${locale}${path}`;
  };

  const apiItems: BlogListingItem[] = apiBlogs
    .map((blog) => {
      const slug = blogToSlug(blog);
      return {
        id: blog._id || slug,
        href: localizedPath(`/blogs/${slug}`),
        title: blog.title,
        featuredImage: blog.featuredImage,
        adminBlog: {
          _id: blog._id || "",
          title: blog.title,
          h2Subtitle: blog.h2Subtitle,
          customSlug: blog.customSlug,
          language: blog.language,
          translationGroupId: blog.translationGroupId,
          featuredImage: blog.featuredImage,
          content: blog.content,
          description: blog.description,
          metaTitle: blog.metaTitle,
          metaDescription: blog.metaDescription,
        },
      };
    });

  const allItems = apiItems;

  return (
    <div className="bg-white min-h-screen">
      <ArticlesBanner asPageHeading />
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <BlogAdminBar />
          {allItems.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 border border-gray-200">
              <p className={`text-gray-600 text-xl ${jost.className}`}>
                No blogs available at the moment.
              </p>
            </div>
          ) : (
            <Suspense
              fallback={
                <BlogsListingView
                  items={allItems}
                  currentPage={1}
                  locale={locale}
                  marcellusClass={marcellus.className}
                  jostClass={jost.className}
                />
              }
            >
              <BlogsListing
                items={allItems}
                locale={locale}
                marcellusClass={marcellus.className}
                jostClass={jost.className}
              />
            </Suspense>
          )}
        </div>
      </section>
    </div>
  );
}
