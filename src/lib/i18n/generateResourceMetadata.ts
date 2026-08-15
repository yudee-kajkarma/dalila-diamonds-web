import { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, Locale, getLocalizedPath } from "./config";

type ResourceMeta = {
  title: string;
  description: string;
  canonical?: string;
};

type ResourceImage = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
};

type ResourceImages = {
  featured?: ResourceImage;
  [key: string]: ResourceImage | undefined;
};

function getFeaturedImageSrc(images?: ResourceImages): string | undefined {
  if (!images) return undefined;
  if (images.featured?.src) return images.featured.src;
  for (const value of Object.values(images)) {
    if (value?.src) return value.src;
  }
  return undefined;
}

export function generateResourceMetadata(
  locale: Locale,
  path: string,
  meta: ResourceMeta,
  images?: ResourceImages,
): Metadata {
  const baseUrl = "https://www.daliladiamonds.com";
  const canonicalUrl = meta.canonical || `${baseUrl}${getLocalizedPath(path, locale)}`;
  const featuredSrc = getFeaturedImageSrc(images);
  const imageUrl = featuredSrc ? `${baseUrl}${featuredSrc}` : undefined;

  const languageAlternates: Record<string, string> = {};
  LOCALES.forEach((loc) => {
    languageAlternates[loc] = `${baseUrl}${getLocalizedPath(path, loc)}`;
  });
  languageAlternates["x-default"] = `${baseUrl}${getLocalizedPath(path, DEFAULT_LOCALE)}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      siteName: "Dalila Diamonds",
      locale: locale === "en" ? "en_GB" : `${locale}_${locale.toUpperCase()}`,
      type: "article",
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}
