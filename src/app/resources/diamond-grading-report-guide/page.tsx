import { Metadata } from "next";
import DiamondGradingGuide from "@/components/pages/resources/DiamondGradingGuide";
import pageData from "@/data/resources/diamond-grading-report-guide.json";
import { s3Asset } from "@/lib/s3Assets";

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
    locale: "en_US",
    type: "website",
    images: [
      {
        url: s3Asset("/dalila_img/Dalila_Logo.png"),
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageData.meta.title,
    description: pageData.meta.description,
    images: [s3Asset("/dalila_img/Dalila_Logo.png")],
  },
};

export default function DiamondGradingReportGuidePage() {
  return <DiamondGradingGuide />;
}
