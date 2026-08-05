import { Metadata } from "next";
import { Locale, DEFAULT_LOCALE, LOCALES, getLocalizedPath } from "./config";
import { getDictionary } from "./getDictionary";

interface MetadataOptions {
  pageKey: "home" | "about" | "contact" | "inventory" | "s2s" | "ds4u" | "syd" | "b2b" | "cushion" | "knowledge" | "gradingReport" | "qualityChart" | "fluorescenceGuide" | "culetGuide" | "girdleGuide";
  path: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export function generateLocalizedMetadata(
  locale: Locale,
  { pageKey, path }: MetadataOptions
): Metadata {
  const dict = getDictionary(locale);

  let title = dict.meta.homeTitle;
  let description = dict.meta.homeDescription;

  if (pageKey === "about") {
    title = dict.meta.aboutTitle;
    description = dict.meta.aboutDescription;
  } else if (pageKey === "contact") {
    title = dict.meta.contactTitle;
    description = dict.meta.contactDescription;
  } else if (pageKey === "inventory") {
    title = dict.meta.inventoryTitle;
    description = dict.meta.inventoryDescription;
  } else if (pageKey === "s2s") {
    title = (dict.meta as any).s2sTitle || "S2S – Secure to Source | Dalila Diamonds";
    description = (dict.meta as any).s2sDescription || "";
  } else if (pageKey === "ds4u") {
    title = (dict.meta as any).ds4uTitle || "DS4U – Diamond Source For You | Dalila Diamonds";
    description = (dict.meta as any).ds4uDescription || "";
  } else if (pageKey === "syd") {
    title = (dict.meta as any).sydTitle || "Sell Your Diamond Safely | Dalila Diamonds";
    description = (dict.meta as any).sydDescription || "";
  } else if (pageKey === "b2b") {
    title = (dict.meta as any).b2bTitle || "Premium B2B Diamond Supplier Belgium | Dalila Diamonds";
    description = (dict.meta as any).b2bDescription || "";
  } else if (pageKey === "cushion") {
    title = (dict.meta as any).cushionTitle || "Elongated Cushion Cut Diamond Guide | Dalila Diamonds";
    description = (dict.meta as any).cushionDescription || "";
  } else if (pageKey === "knowledge") {
    title = (dict.meta as any).diamondKnowledgeTitle || "Diamond Knowledge Guide | Dalila Diamonds";
    description = (dict.meta as any).diamondKnowledgeDescription || "";
  } else if (pageKey === "gradingReport") {
    title = (dict.meta as any).gradingReportTitle || "Diamond Grading Report Guide | Dalila Diamonds";
    description =
      (dict.meta as any).gradingReportDescription ||
      "Understand diamond grading reports, verify report numbers, compare the 4Cs, proportions and fluorescence, and check a natural diamond before buying.";
  } else if (pageKey === "qualityChart") {
    title = (dict.meta as any).qualityChartTitle || "Diamond Quality Chart | Dalila Diamonds";
    description =
      (dict.meta as any).qualityChartDescription ||
      "Compare diamond cut, colour, clarity and carat grades. Use this natural diamond quality chart to understand the 4Cs and choose the right balance.";
  } else if (pageKey === "fluorescenceGuide") {
    title = (dict.meta as any).fluorescenceGuideTitle || "Diamond Fluorescence Guide | Dalila Diamonds";
    description =
      (dict.meta as any).fluorescenceGuideDescription ||
      "Understand diamond fluorescence, blue fluorescence and strength levels. Learn how fluorescence can affect appearance and price before buying a natural diamond.";
  } else if (pageKey === "culetGuide") {
    title = (dict.meta as any).culetGuideTitle || "Diamond Culet Guide: Size & Meaning | Dalila Diamonds";
    description =
      (dict.meta as any).culetGuideDescription ||
      "Learn what a diamond culet is, how GIA and HRD describe culet size, and how pointed, open, large or chipped culets can affect appearance and buying.";
  } else if (pageKey === "girdleGuide") {
    title = (dict.meta as any).girdleGuideTitle || "Diamond Girdle Guide: Thickness & Grades | Dalila Diamonds";
    description =
      (dict.meta as any).girdleGuideDescription ||
      "Learn what a diamond girdle is, how GIA and HRD grade its thickness, and how thin or thick girdles affect durability, size, setting and value.";
  }

  const baseUrl = "https://www.daliladiamonds.com";
  const canonicalUrl = `${baseUrl}${getLocalizedPath(path, locale)}`;

  const languageAlternates: Record<string, string> = {};
  LOCALES.forEach((loc) => {
    languageAlternates[loc] = `${baseUrl}${getLocalizedPath(path, loc)}`;
  });
  languageAlternates["x-default"] = `${baseUrl}${getLocalizedPath(path, DEFAULT_LOCALE)}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Dalila Diamonds",
      locale: locale === "en" ? "en_US" : `${locale}_${locale.toUpperCase()}`,
      type: "website",
    },
  };
}
