import { Metadata } from "next";
import MostExpensiveDiamondShapes from "@/components/pages/blogs/blog1/MostExpensiveDiamondShapes";
import pageData from "@/data/blogs/blog1/en.json";
import { LOCALES, DEFAULT_LOCALE, getLocalizedPath } from "@/lib/i18n/config";
import { BLOG1_PATH } from "@/lib/i18n/getBlog1Data";

const baseUrl = "https://www.daliladiamonds.com";

const languageAlternates: Record<string, string> = {};
LOCALES.forEach((loc) => {
  languageAlternates[loc] = `${baseUrl}${getLocalizedPath(BLOG1_PATH, loc)}`;
});
languageAlternates["x-default"] = `${baseUrl}${getLocalizedPath(BLOG1_PATH, DEFAULT_LOCALE)}`;

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

export default function MostExpensiveDiamondShapesPage() {
  return <MostExpensiveDiamondShapes />;
}
