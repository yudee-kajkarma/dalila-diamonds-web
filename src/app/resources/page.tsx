import { Metadata } from "next";
import ResourcesLanding from "@/components/pages/resources/ResourcesLanding";

export const metadata: Metadata = {
  title: "Diamond Resources & Guides | Dalila Diamonds",
  description:
    "Explore Dalila Diamonds' expert guides on diamond quality, grading reports, culet, girdle, fluorescence, selling safely and more.",
  alternates: {
    canonical: "https://www.daliladiamonds.com/resources",
  },
};

export default function ResourcesPage() {
  return <ResourcesLanding />;
}
