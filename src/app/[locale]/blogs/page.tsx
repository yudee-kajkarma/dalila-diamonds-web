import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import ArticlesBanner from "@/components/pages/blogs/ArticlesBanner";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import { blogToSlug, getAllBlogs } from "@/lib/blogs";
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

export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params;
  const { page } = await searchParams;
  const allBlogs = await getAllBlogs();
  const totalRecords = allBlogs.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / ITEMS_PER_PAGE));
  const parsed = Number.parseInt(page ?? "1", 10);
  const currentPage = Number.isNaN(parsed) ? 1 : Math.min(Math.max(parsed, 1), totalPages);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageBlogs = allBlogs.slice(start, start + ITEMS_PER_PAGE);

  const localizedPath = (path: string) => {
    if (!locale || locale === "en") return path;
    return `/${locale}${path}`;
  };

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
                {pageBlogs.map((blog, index) => {
                  const slug = blogToSlug(blog);
                  return (
                    <AnimatedContainer key={blog._id || slug} direction="up" delay={index * 0.1}>
                      <Link
                        href={localizedPath(`/blogs/${slug}`)}
                        className="bg-white border border-gray-200 hover:border-[#c89e3a] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col relative group overflow-hidden"
                      >
                        {blog.featuredImage && (
                          <div className="w-full h-56 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={blog.featuredImage}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <BlogCardActions
                          blog={{
                            _id: blog._id || "",
                            title: blog.title,
                            h2Subtitle: blog.h2Subtitle,
                            customSlug: blog.customSlug,
                            featuredImage: blog.featuredImage,
                            content: blog.content,
                            description: blog.description,
                            metaTitle: blog.metaTitle,
                            metaDescription: blog.metaDescription,
                          }}
                        />
                        <div className="p-6 flex-1 flex flex-col justify-center">
                          <h3
                            className={`text-xl md:text-2xl font-bold text-[#1a1a1a] group-hover:text-[#c89e3a] transition-colors line-clamp-3 ${marcellus.className}`}
                          >
                            {blog.title}
                          </h3>
                        </div>
                      </Link>
                    </AnimatedContainer>
                  );
                })}
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
