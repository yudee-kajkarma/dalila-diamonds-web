import { Metadata } from "next";
import Vs1VsVs2DiamondClarity from "@/components/pages/blogs/blog2/Vs1VsVs2DiamondClarity";
import { Locale, LOCALES, DEFAULT_LOCALE, getLocalizedPath } from "@/lib/i18n/config";
import { getBlog2Data, BLOG2_PATH } from "@/lib/i18n/getBlog2Data";

const baseUrl = "https://www.daliladiamonds.com";

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  const data = getBlog2Data(locale);
  const canonicalUrl = `${baseUrl}${getLocalizedPath(BLOG2_PATH, locale)}`;

  const languageAlternates: Record<string, string> = {};
  LOCALES.forEach((loc) => {
    languageAlternates[loc] = `${baseUrl}${getLocalizedPath(BLOG2_PATH, loc)}`;
  });
  languageAlternates["x-default"] = `${baseUrl}${getLocalizedPath(BLOG2_PATH, DEFAULT_LOCALE)}`;

  const ogImage = data.images.featured.src.startsWith("http")
    ? data.images.featured.src
    : `${baseUrl}${data.images.featured.src}`;

  return {
    title: data.meta.title,
    description: data.meta.description,
    robots: {
      index: true,
      follow: true,
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
      type: "article",
      images: [
        {
          url: ogImage,
          width: data.images.featured.width,
          height: data.images.featured.height,
          alt: data.images.featured.alt,
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

export default async function Vs1VsVs2DiamondClarityLocalePage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;

  return <Vs1VsVs2DiamondClarity locale={locale} />;
}
