import { Metadata } from "next";
import Vs1VsVs2DiamondClarity from "@/components/pages/blogs/blog2/Vs1VsVs2DiamondClarity";
import pageData from "@/data/blogs/blog2/en.json";
import { LOCALES, DEFAULT_LOCALE, getLocalizedPath } from "@/lib/i18n/config";
import { BLOG2_PATH } from "@/lib/i18n/getBlog2Data";

const baseUrl = "https://www.daliladiamonds.com";

const languageAlternates: Record<string, string> = {};
LOCALES.forEach((loc) => {
  languageAlternates[loc] = `${baseUrl}${getLocalizedPath(BLOG2_PATH, loc)}`;
});
languageAlternates["x-default"] = `${baseUrl}${getLocalizedPath(BLOG2_PATH, DEFAULT_LOCALE)}`;

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

export default function Vs1VsVs2DiamondClarityPage() {
  return <Vs1VsVs2DiamondClarity />;
}
