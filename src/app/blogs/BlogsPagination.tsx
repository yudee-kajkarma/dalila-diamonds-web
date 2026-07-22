import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  locale?: string;
};

// Server-rendered, link-based pagination so every page is a real, crawlable
// URL that Google can follow (no client-side onClick navigation).
export default function BlogsPagination({ currentPage, totalPages, locale }: Props) {
  const pageHref = (page: number): string => {
    const prefix = locale && locale !== "en" ? `/${locale}` : "";
    return page <= 1 ? `${prefix}/blogs` : `${prefix}/blogs?page=${page}`;
  };

  if (totalPages <= 1) return null;

  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) pages.push(i);

  const baseBtn = "px-4 py-2 rounded-none border transition-colors";
  const idleBtn = "border-[#c89e3a] text-[#c89e3a] hover:bg-[#c89e3a] hover:text-white";

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          className={`p-2 rounded-none border ${idleBtn}`}
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </Link>
      ) : (
        <span className="p-2 rounded-none border border-gray-300 text-gray-400 cursor-not-allowed">
          <ChevronLeft size={20} />
        </span>
      )}

      {startPage > 1 && (
        <>
          <Link href={pageHref(1)} className={`${baseBtn} ${idleBtn}`}>
            1
          </Link>
          {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={pageHref(page)}
          className={`${baseBtn} ${
            currentPage === page ? "bg-[#c89e3a] text-white border-[#c89e3a]" : idleBtn
          }`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
          <Link href={pageHref(totalPages)} className={`${baseBtn} ${idleBtn}`}>
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1)}
          className={`p-2 rounded-none border ${idleBtn}`}
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </Link>
      ) : (
        <span className="p-2 rounded-none border border-gray-300 text-gray-400 cursor-not-allowed">
          <ChevronRight size={20} />
        </span>
      )}
    </div>
  );
}
