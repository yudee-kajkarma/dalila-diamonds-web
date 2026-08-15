import WeekendVanDeKlantPage from "@/components/pages/event/WeekendVanDeKlantPage";
import { Locale, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { getWeekendVanDeKlantData } from "@/lib/i18n/getWeekendVanDeKlantData";
import { Metadata } from "next";
import { s3Asset } from "@/lib/s3Assets";

const BASE_URL = "https://www.daliladiamonds.com";
const PAGE_PATH = "/weekend-van-de-klant-antwerp-diamond-appointments";

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  const data = getWeekendVanDeKlantData(locale);

  const canonicalUrl = `${BASE_URL}${getLocalizedPath(PAGE_PATH, locale)}`;

  return {
    title: data.meta.title,
    description: data.meta.description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        LOCALES.map(loc => [loc, `${BASE_URL}${getLocalizedPath(PAGE_PATH, loc)}`])
      ),
    },
    openGraph: {
      title: data.meta.ogTitle,
      description: data.meta.ogDescription,
      url: canonicalUrl,
      siteName: "Dalila Diamonds",
      locale: locale === "nl" ? "nl_BE" : locale === "fr" ? "fr_BE" : locale === "de" ? "de_BE" : "en_GB",
      type: "website",
      images: [{ url: s3Asset("/dalila_img/Dalila_Logo.png") }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.meta.ogTitle,
      description: data.meta.ogDescription,
      images: [s3Asset("/dalila_img/Dalila_Logo.png")],
    },
  };
}

export default async function WeekendVanDeKlantLocalePage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  return <WeekendVanDeKlantPage locale={locale} />;
}
