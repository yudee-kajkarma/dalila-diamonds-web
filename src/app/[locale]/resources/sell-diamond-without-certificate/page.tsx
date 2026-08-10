import SellDiamondWithoutCertificate from "@/components/pages/resources/SellDiamondWithoutCertificate";
import { generateResourceMetadata } from "@/lib/i18n/generateResourceMetadata";
import { getSellDiamondWithoutCertificateData } from "@/lib/i18n/getSellDiamondWithoutCertificateData";
import { Locale } from "@/lib/i18n/config";

const PATH = "/resources/sell-diamond-without-certificate";

export async function generateMetadata({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  const pageData = getSellDiamondWithoutCertificateData(locale);
  return {
    ...generateResourceMetadata(locale, PATH, pageData.meta, pageData.images),
    robots: { index: true, follow: true },
  };
}

export default async function SellDiamondWithoutCertificateLocalePage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  return <SellDiamondWithoutCertificate locale={locale} />;
}
