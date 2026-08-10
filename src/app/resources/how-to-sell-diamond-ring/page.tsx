import { Metadata } from "next";
import HowToSellDiamondRing from "@/components/pages/resources/HowToSellDiamondRing";
import pageData from "@/data/resources/how-to-sell-diamond-ring.json";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  robots: { index: true, follow: true },
  alternates: { canonical: pageData.meta.canonical },
  openGraph: {
    title: pageData.meta.title,
    description: pageData.meta.description,
    url: pageData.meta.canonical,
    siteName: "Dalila Diamonds",
    locale: "en_GB",
    type: "article",
    images: [{ url: `https://www.daliladiamonds.com${pageData.images.featured.src}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageData.meta.title,
    description: pageData.meta.description,
    images: [`https://www.daliladiamonds.com${pageData.images.featured.src}`],
  },
};

export default function HowToSellDiamondRingPage() {
  return <HowToSellDiamondRing locale="en" />;
}
