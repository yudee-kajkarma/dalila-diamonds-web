import { Metadata } from "next";
import BuyWholesaleDiamondsOnline from "@/components/pages/wholesale/BuyWholesaleDiamondsOnline";
import pageData from "@/data/wholesale/page8/en.json";
import { LOCALES, DEFAULT_LOCALE, getLocalizedPath } from "@/lib/i18n/config";
import { WHOLESALE_LOOSE_PATH } from "@/lib/i18n/getWholesaleLooseDiamondsData";

const baseUrl = "https://www.daliladiamonds.com";

const languageAlternates: Record<string, string> = {};
LOCALES.forEach((loc) => {
  languageAlternates[loc] = `${baseUrl}${getLocalizedPath(WHOLESALE_LOOSE_PATH, loc)}`;
});
languageAlternates["x-default"] = `${baseUrl}${getLocalizedPath(WHOLESALE_LOOSE_PATH, DEFAULT_LOCALE)}`;

const ogImage = pageData.images.hero.src.startsWith("http")
  ? pageData.images.hero.src
  : `${baseUrl}${pageData.images.hero.src}`;

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
    type: "website",
    images: [
      {
        url: ogImage,
        width: pageData.images.hero.width,
        height: pageData.images.hero.height,
        alt: pageData.images.hero.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageData.meta.title,
    description: pageData.meta.description,
    images: [ogImage],
  },
};

export default function BuyWholesaleDiamondsOnlinePage() {
  return <BuyWholesaleDiamondsOnline />;
}
