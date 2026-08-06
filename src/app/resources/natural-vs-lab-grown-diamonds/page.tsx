import { Metadata } from "next";
import NaturalVsLabGrownDiamonds from "@/components/pages/resources/NaturalVsLabGrownDiamonds";
import pageData from "@/data/resources/natural-vs-lab-grown-diamonds.json";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: pageData.meta.canonical,
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
        url: "https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageData.meta.title,
    description: pageData.meta.description,
    images: ["https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png"],
  },
};

export default function NaturalVsLabGrownDiamondsPage() {
  return <NaturalVsLabGrownDiamonds />;
}
