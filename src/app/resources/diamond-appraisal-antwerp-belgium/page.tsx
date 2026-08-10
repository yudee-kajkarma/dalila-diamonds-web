import { Metadata } from "next";
import DiamondAppraisalAntwerp from "@/components/pages/resources/DiamondAppraisalAntwerp";
import pageData from "@/data/resources/diamond-appraisal-antwerp-belgium.json";

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

export default function DiamondAppraisalAntwerpPage() {
  return <DiamondAppraisalAntwerp locale="en" />;
}
