import { Metadata } from "next";
import WeekendVanDeKlantPage from "@/components/pages/event/WeekendVanDeKlantPage";
import pageData from "@/data/event/weekend-van-de-klant-antwerp-diamond-appointments.json";
import { s3Asset } from "@/lib/s3Assets";
import { LOCALES, getLocalizedPath } from "@/lib/i18n/config";

const BASE_URL = "https://www.daliladiamonds.com";
const PAGE_PATH = "/weekend-van-de-klant-antwerp-diamond-appointments";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  robots: { index: true, follow: true },
  alternates: {
    canonical: `${BASE_URL}${PAGE_PATH}`,
    languages: Object.fromEntries(
      LOCALES.map((loc) => [
        loc,
        `${BASE_URL}${getLocalizedPath(PAGE_PATH, loc)}`,
      ])
    ),
  },
  openGraph: {
    title: pageData.meta.ogTitle,
    description: pageData.meta.ogDescription,
    url: `${BASE_URL}${PAGE_PATH}`,
    siteName: "Dalila Diamonds",
    locale: "en_GB",
    type: "website",
    images: [{ url: s3Asset("/dalila_img/Dalila_Logo.png") }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageData.meta.ogTitle,
    description: pageData.meta.ogDescription,
    images: [s3Asset("/dalila_img/Dalila_Logo.png")],
  },
};

export default function WeekendVanDeKlantDiamondAppointmentsPage() {
  return <WeekendVanDeKlantPage locale="en" />;
}
