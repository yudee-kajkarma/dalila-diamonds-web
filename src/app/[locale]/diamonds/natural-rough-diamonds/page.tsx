import { Metadata } from "next";
import NaturalRoughDiamonds from "@/components/pages/diamonds/NaturalRoughDiamonds";
import { Locale, LOCALES, DEFAULT_LOCALE, getLocalizedPath } from "@/lib/i18n/config";
import {
  getNaturalRoughDiamondsData,
  NATURAL_ROUGH_PATH,
} from "@/lib/i18n/getNaturalRoughDiamondsData";

const baseUrl = "https://www.daliladiamonds.com";

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  const data = getNaturalRoughDiamondsData(locale);
  const canonicalUrl = `${baseUrl}${getLocalizedPath(NATURAL_ROUGH_PATH, locale)}`;

  const languageAlternates: Record<string, string> = {};
  LOCALES.forEach((loc) => {
    languageAlternates[loc] = `${baseUrl}${getLocalizedPath(NATURAL_ROUGH_PATH, loc)}`;
  });
  languageAlternates["x-default"] = `${baseUrl}${getLocalizedPath(NATURAL_ROUGH_PATH, DEFAULT_LOCALE)}`;

  const ogImage = data.images.hero.src.startsWith("http")
    ? data.images.hero.src
    : `${baseUrl}${data.images.hero.src}`;

  const robotsDirective = data.meta.robots || "noindex, nofollow";
  const shouldIndex = !robotsDirective.includes("noindex");
  const shouldFollow = !robotsDirective.includes("nofollow");

  return {
    title: data.meta.title,
    description: data.meta.description,
    robots: {
      index: shouldIndex,
      follow: shouldFollow,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      url: canonicalUrl,
      siteName: "Dalila Diamonds",
      locale: locale === "en" ? "en_GB" : `${locale}_${locale.toUpperCase()}`,
      type: "website",
      images: [
        {
          url: ogImage,
          width: data.images.hero.width,
          height: data.images.hero.height,
          alt: data.images.hero.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.meta.title,
      description: data.meta.description,
      images: [ogImage],
    },
  };
}

export default async function NaturalRoughDiamondsLocalePage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;

  return <NaturalRoughDiamonds locale={locale} />;
}
