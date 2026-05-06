import Link from "next/link";
import { notFound } from "next/navigation";
import { Marcellus, Jost } from "next/font/google";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ArticlesBanner from "@/components/pages/blogs/ArticlesBanner";
import FeaturedDiamondsCarousel from "@/components/pages/blogs/FeaturedDiamondsCarousel";
import { blogToSlug, getAllBlogs, getBlogBySlug } from "@/lib/blogs";

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

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const cleanSlug = slug.split("?")[0].split("#")[0];

  const [blog, allBlogs] = await Promise.all([getBlogBySlug(cleanSlug), getAllBlogs()]);

  if (!blog) {
    notFound();
  }

  const currentSlugKey = blogToSlug(blog);

  return (
    <div className="bg-white min-h-screen">
      <ArticlesBanner />

      <div className="container mx-auto max-w-7xl px-4 pt-8 pb-6">
        <Link
          href="/blogs"
          className={`inline-flex items-center gap-2 text-[#c89e3a] hover:text-[#b8922e] font-medium transition-all ${jost.className} hover:gap-3`}
        >
          <ArrowLeft size={18} />
          Back to Articles
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">
          <aside className="sticky-sidebar">
            <div className="mb-6">
              <h3 className={`text-xl font-bold text-[#2d2d2d] mb-5 ${marcellus.className}`}>
                Our Articles
              </h3>
              {allBlogs.length === 0 ? (
                <p className={`text-sm text-gray-500 ${jost.className}`}>
                  No other articles available.
                </p>
              ) : (
                <ul className="space-y-4">
                  {allBlogs.map((articleItem, index) => {
                    const itemSlug = blogToSlug(articleItem);
                    const isActive = itemSlug === currentSlugKey;
                    return (
                      <li key={articleItem._id || itemSlug}>
                        <Link
                          href={`/blogs/${itemSlug}`}
                          className={`text-left hover:text-[#c89e3a] transition-colors group w-full flex items-start justify-between gap-3 py-1 ${
                            isActive ? "text-[#c89e3a]" : "text-gray-700"
                          }`}
                        >
                          <span
                            className={`text-base flex-1 ${
                              index === 0 ? "" : "line-clamp-2"
                            } ${jost.className}`}
                          >
                            {articleItem.title}
                          </span>
                          <ArrowRight
                            size={16}
                            className={`shrink-0 -mt-0.5 transition-transform group-hover:translate-x-1 ${
                              isActive
                                ? "text-[#c89e3a]"
                                : "text-gray-400 group-hover:text-[#c89e3a]"
                            }`}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="mb-6">
              <div className="bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] text-white p-6 shadow-lg">
                <h3 className={`text-xl font-bold mb-4 ${marcellus.className}`}>Find Us</h3>
                <div className={`space-y-3 text-sm text-gray-200 ${jost.className}`}>
                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#c89e3a] shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-white mb-1">Dalila Diamonds</p>
                      <p className="leading-relaxed">
                        Hoveniersstraat 30, Box - 105
                        <br />
                        Suite 326, 2018 Antwerpen
                        <br />
                        Belgium
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#c89e3a] shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href="mailto:business@daliladiamonds.com"
                      className="hover:text-[#c89e3a] transition-colors"
                    >
                      business@daliladiamonds.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#c89e3a] shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <a href="tel:+32487939351" className="hover:text-[#c89e3a] transition-colors">
                      +32 487 93 93 51
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-[#c89e3a] text-white p-6 shadow-lg">
                <h3 className={`text-xl font-bold mb-3 ${marcellus.className}`}>
                  Browse Our Inventory
                </h3>
                <p className={`text-sm mb-4 text-white/90 ${jost.className}`}>
                  Discover our exquisite collection of premium diamonds
                </p>
                <Link
                  href="/inventory"
                  className={`w-full bg-white text-[#2d2d2d] py-2.5 px-4 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 group font-semibold ${jost.className}`}
                >
                  <span>View Inventory</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </aside>

          <article className="flex-1">
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a] font-bold leading-tight mb-6 ${marcellus.className}`}
            >
              {blog.title}
            </h1>

            <div
              className={`blog-content ${jost.className}`}
              dangerouslySetInnerHTML={{ __html: blog.content || blog.description || "" }}
            />
          </article>
        </div>
      </section>

      <FeaturedDiamondsCarousel />
    </div>
  );
}
