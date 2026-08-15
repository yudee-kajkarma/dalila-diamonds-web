import { Metadata } from "next";
import NaturalVsLabGrownDiamonds from "@/components/pages/resources/NaturalVsLabGrownDiamonds";
import rawPageData from "@/data/resources/natural-vs-lab-grown-diamonds.json";
import { s3Asset } from "@/lib/s3Assets";
import { withS3Assets } from "@/lib/s3Assets";

// Static JSON holds absolute S3 URLs; rebase onto NEXT_PUBLIC_S3_BASE_URL.
const pageData = withS3Assets(rawPageData);

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

export default function NaturalVsLabGrownDiamondsPage() {
  return <NaturalVsLabGrownDiamonds />;
}
