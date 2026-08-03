import Image from "next/image";
import Link from "next/link";
import { getLocalizedPath, Locale } from "@/lib/i18n/config";
import type { GradingReportContent } from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { jost, marcellus } from "./gradingReportFonts";

interface GradingReportBannerProps {
  content: GradingReportContent["banner"];
  locale?: Locale;
}

export default function GradingReportBanner({ content, locale = "en" }: GradingReportBannerProps) {
  const localizedPath = (path: string) => getLocalizedPath(path, locale);

  return (
    <div className="relative bg-slate-900">
      <section
        className="relative h-[36vh] xs:h-[44vh] sm:h-[60vh] md:h-[55vh] lg:h-[50vh] flex items-center justify-center overflow-hidden"
        aria-label="Page banner"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/banner-dalila-contact.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/80 to-slate-900" />
        </div>

        <div className="container mx-auto px-3 xs:px-4 sm:px-6 relative z-10 text-center py-8 sm:py-14">
          <p
            className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide text-white mb-3 mt-8 sm:mt-30 whitespace-nowrap sm:whitespace-normal ${marcellus.className}`}
            style={{ lineHeight: 1.15 }}
          >
            {content.title}
          </p>
          <div className="w-2/3 sm:w-[35%] h-px bg-amber-400 mx-auto mb-6" aria-hidden="true" />

          <nav
            aria-label="Breadcrumb"
            className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 text-gray-300 text-xs xs:text-sm md:text-base"
          >
            <Link href={localizedPath("/")} className={`hover:text-amber-400 transition-colors ${jost.className}`}>
              {content.breadcrumbHome}
            </Link>
            <span aria-hidden="true">›</span>
            <Link
              href={localizedPath("/blogs")}
              className={`hover:text-amber-400 transition-colors ${jost.className}`}
            >
              {content.breadcrumbResources}
            </Link>
            <span aria-hidden="true">›</span>
            <span className={jost.className}>{content.breadcrumbCurrent}</span>
          </nav>
        </div>
      </section>
    </div>
  );
}
