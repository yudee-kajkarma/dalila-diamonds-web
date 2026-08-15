"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import type { BlogLanguage } from "@/lib/blogLanguages";
import BlogCardActions from "./BlogCardActions";
import BlogsPagination from "./BlogsPagination";

export const BLOGS_PER_PAGE = 9;

export type BlogListingItem = {
  id: string;
  href: string;
  title: string;
  featuredImage?: string;
  /** Present only for API-backed blogs; drives the admin edit/delete island. */
  adminBlog?: {
    _id: string;
    title: string;
    h2Subtitle?: string;
    customSlug?: string;
    language?: BlogLanguage;
    translationGroupId?: string;
    featuredImage?: string;
    content?: string;
    description?: string;
    metaTitle?: string;
    metaDescription?: string;
  };
};

type ViewProps = {
  items: BlogListingItem[];
  currentPage: number;
  locale?: string;
  marcellusClass: string;
  jostClass: string;
};

// Presentational half. The server page renders it directly (page 1) as the
// Suspense fallback so crawlers and no-JS visitors get the full first page,
// while BlogsListing below re-renders it with the ?page from the URL.
export function BlogsListingView({
  items,
  currentPage,
  locale,
  marcellusClass,
  jostClass,
}: ViewProps) {
  const totalPages = Math.max(1, Math.ceil(items.length / BLOGS_PER_PAGE));
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (page - 1) * BLOGS_PER_PAGE;
  const pageItems = items.slice(start, start + BLOGS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageItems.map((item, index) => (
          <AnimatedContainer key={item.id} direction="up" delay={index * 0.1}>
            <div className="bg-white border border-gray-200 hover:border-[#c89e3a] shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col relative group overflow-hidden">
              {/* Keep admin actions outside <Link> so edit modal clicks never navigate. */}
              {item.adminBlog ? <BlogCardActions blog={item.adminBlog} /> : null}

              <Link href={item.href} className="cursor-pointer h-full flex flex-col flex-1">
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

                <div className="p-6 flex-1 flex flex-col justify-center">
                  <h3
                    className={`text-xl md:text-2xl font-bold text-[#1a1a1a] group-hover:text-[#c89e3a] transition-colors line-clamp-3 ${marcellusClass}`}
                  >
                    {item.title}
                  </h3>
                </div>
              </Link>
            </div>
          </AnimatedContainer>
        ))}
      </div>

      <BlogsPagination currentPage={page} totalPages={totalPages} locale={locale} />

      <div className="text-center mt-8">
        <p className={`text-gray-600 text-sm ${jostClass}`}>
          Showing {pageItems.length} of {items.length} article
          {items.length !== 1 ? "s" : ""}
        </p>
      </div>
    </>
  );
}

// Interactive half: reads ?page from the URL after hydration. Reading it here
// instead of via the page's searchParams prop keeps the listing route
// statically prerenderable (searchParams in a server page forces per-request
// SSR of every hit).
export default function BlogsListing(props: Omit<ViewProps, "currentPage">) {
  const searchParams = useSearchParams();
  const parsed = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const currentPage = Number.isNaN(parsed) ? 1 : parsed;
  return <BlogsListingView {...props} currentPage={currentPage} />;
}
