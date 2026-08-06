import { Metadata } from "next";
import IgiDiamondCertification from "@/components/pages/blogs/blog7/IgiDiamondCertification";
import pageData from "@/data/blogs/blog7/en.json";
import { LOCALES, DEFAULT_LOCALE, getLocalizedPath } from "@/lib/i18n/config";
import { BLOG7_PATH } from "@/lib/i18n/getBlog7Data";

const baseUrl = "https://www.daliladiamonds.com";

const languageAlternates: Record<string, string> = {};
LOCALES.forEach((loc) => {
  languageAlternates[loc] = `${baseUrl}${getLocalizedPath(BLOG7_PATH, loc)}`;
});
languageAlternates["x-default"] = `${baseUrl}${getLocalizedPath(BLOG7_PATH, DEFAULT_LOCALE)}`;

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

export default function IgiDiamondCertificationPage() {
  return <IgiDiamondCertification />;
}
