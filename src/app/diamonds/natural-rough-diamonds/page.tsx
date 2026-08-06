import { Metadata } from "next";
import NaturalRoughDiamonds from "@/components/pages/diamonds/NaturalRoughDiamonds";
import pageData from "@/data/diamonds/page10/en.json";
import { LOCALES, DEFAULT_LOCALE, getLocalizedPath } from "@/lib/i18n/config";
import { NATURAL_ROUGH_PATH } from "@/lib/i18n/getNaturalRoughDiamondsData";

const baseUrl = "https://www.daliladiamonds.com";

const languageAlternates: Record<string, string> = {};
LOCALES.forEach((loc) => {
  languageAlternates[loc] = `${baseUrl}${getLocalizedPath(NATURAL_ROUGH_PATH, loc)}`;
});
languageAlternates["x-default"] = `${baseUrl}${getLocalizedPath(NATURAL_ROUGH_PATH, DEFAULT_LOCALE)}`;

const ogImage = pageData.images.hero.src.startsWith("http")
  ? pageData.images.hero.src
  : `${baseUrl}${pageData.images.hero.src}`;

const robotsDirective = pageData.meta.robots || "noindex, nofollow";
const shouldIndex = !robotsDirective.includes("noindex");
const shouldFollow = !robotsDirective.includes("nofollow");

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  robots: {
    index: shouldIndex,
    follow: shouldFollow,
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

export default function NaturalRoughDiamondsPage() {
  return <NaturalRoughDiamonds />;
}
