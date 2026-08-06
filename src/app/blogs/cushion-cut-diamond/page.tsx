import { Metadata } from "next";
import CushionCutDiamondGuide from "@/components/pages/blogs/blog5/CushionCutDiamondGuide";
import pageData from "@/data/blogs/blog5/en.json";
import { LOCALES, DEFAULT_LOCALE, getLocalizedPath } from "@/lib/i18n/config";
import { BLOG5_PATH } from "@/lib/i18n/getBlog5Data";

const baseUrl = "https://www.daliladiamonds.com";

const languageAlternates: Record<string, string> = {};
LOCALES.forEach((loc) => {
  languageAlternates[loc] = `${baseUrl}${getLocalizedPath(BLOG5_PATH, loc)}`;
});
languageAlternates["x-default"] = `${baseUrl}${getLocalizedPath(BLOG5_PATH, DEFAULT_LOCALE)}`;

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: pageData.meta.canonical,
    languages: languageAlternates,
  },
  openGraph: {
    title: pageData.meta.title,
    description: pageData.meta.description,
    url: pageData.meta.canonical,
    siteName: "Dalila Diamonds",
    locale: "en_GB",
    type: "article",
    images: [
      {
        url: pageData.images.featured.src.startsWith("http")
          ? pageData.images.featured.src
          : `${baseUrl}${pageData.images.featured.src}`,
        width: pageData.images.featured.width,
        height: pageData.images.featured.height,
        alt: pageData.images.featured.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageData.meta.title,
    description: pageData.meta.description,
    images: [
      pageData.images.featured.src.startsWith("http")
        ? pageData.images.featured.src
        : `${baseUrl}${pageData.images.featured.src}`,
    ],
  },
};

export default function CushionCutDiamondGuidePage() {
  return <CushionCutDiamondGuide />;
}
