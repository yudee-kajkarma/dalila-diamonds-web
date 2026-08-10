import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import ArticlesBanner from "@/components/pages/blogs/ArticlesBanner";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import { blogToSlug, getAllBlogs } from "@/lib/blogs";
import { getStaticBlogCards, isStaticBlogSlug } from "@/lib/staticBlogs";
import type { Locale } from "@/lib/i18n/config";
import BlogAdminBar from "@/app/blogs/BlogAdminBar";
import BlogCardActions from "@/app/blogs/BlogCardActions";
import BlogsPagination from "@/app/blogs/BlogsPagination";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const ITEMS_PER_PAGE = 9;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
};

type ListingItem =
  | {
      kind: "static";
      id: string;
      slug: string;
      href: string;
      title: string;
      featuredImage?: string;
    }
  | {
      kind: "api";
      id: string;
      slug: string;
      href: string;
      title: string;
      featuredImage?: string;
      blog: Awaited<ReturnType<typeof getAllBlogs>>[number];
    };

export default async function Page({ params, searchParams }: Props) {
  const { locale: localeParam } = await params;
  const locale = (localeParam || "en") as Locale;
  const { page } = await searchParams;

  const [apiBlogs, staticBlogs] = await Promise.all([
    getAllBlogs(),
    Promise.resolve(getStaticBlogCards(locale)),
  ]);

  const localizedPath = (path: string) => {
    if (!locale || locale === "en") return path;
    return `/${locale}${path}`;
  };

  const staticItems: ListingItem[] = staticBlogs.map((blog) => ({
    kind: "static",
    id: blog.id,
    slug: blog.slug,
    href: localizedPath(blog.path),
    title: blog.title,
    featuredImage: blog.featuredImage,
  }));

  const apiItems: ListingItem[] = apiBlogs
    .filter((blog) => !isStaticBlogSlug(blogToSlug(blog)))
    .map((blog) => {
      const slug = blogToSlug(blog);
      return {
        kind: "api" as const,
        id: blog._id || slug,
        slug,
        href: localizedPath(`/blogs/${slug}`),
        title: blog.title,
        featuredImage: blog.featuredImage,
        blog,
      };
    });

  const allItems = [...staticItems, ...apiItems];
  const totalRecords = allItems.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / ITEMS_PER_PAGE));
  const parsed = Number.parseInt(page ?? "1", 10);
  const currentPage = Number.isNaN(parsed) ? 1 : Math.min(Math.max(parsed, 1), totalPages);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageBlogs = allItems.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="bg-white min-h-screen">
      <ArticlesBanner />
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <BlogAdminBar />
          {totalRecords === 0 ? (
            <div className="text-center py-20 bg-gray-50 border border-gray-200">
              <p className={`text-gray-600 text-xl ${jost.className}`}>
                No blogs available at the moment.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pageBlogs.map((item, index) => (
                  <AnimatedContainer key={item.id} direction="up" delay={index * 0.1}>
                    <Link
                      href={item.href}
                      className="bg-white border border-gray-200 hover:border-[#c89e3a] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col relative group overflow-hidden"
                    >
                      {item.featuredImage && (
                        <div className="w-full h-56 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.featuredImage}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}
                      {item.kind === "api" ? (
                        <BlogCardActions
                          blog={{
                            _id: item.blog._id || "",
                            title: item.blog.title,
                            h2Subtitle: item.blog.h2Subtitle,
                            customSlug: item.blog.customSlug,
                            featuredImage: item.blog.featuredImage,
                            content: item.blog.content,
                            description: item.blog.description,
                            metaTitle: item.blog.metaTitle,
                            metaDescription: item.blog.metaDescription,
                          }}
                        />
                      ) : null}
                      <div className="p-6 flex-1 flex flex-col justify-center">
                        <h3
                          className={`text-xl md:text-2xl font-bold text-[#1a1a1a] group-hover:text-[#c89e3a] transition-colors line-clamp-3 ${marcellus.className}`}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  </AnimatedContainer>
                ))}
              </div>
              <BlogsPagination currentPage={currentPage} totalPages={totalPages} locale={locale} />
              <div className="text-center mt-8">
                <p className={`text-gray-600 text-sm ${jost.className}`}>
                  Showing {pageBlogs.length} of {totalRecords} article
                  {totalRecords !== 1 ? "s" : ""}
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
