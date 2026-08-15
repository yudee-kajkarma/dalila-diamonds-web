import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/sell-diamond-without-certificate.json";
import de from "@/data/resources/sell-diamond-without-certificate.de.json";
import fr from "@/data/resources/sell-diamond-without-certificate.fr.json";
import it from "@/data/resources/sell-diamond-without-certificate.it.json";
import nl from "@/data/resources/sell-diamond-without-certificate.nl.json";
import es from "@/data/resources/sell-diamond-without-certificate.es.json";
import { withS3Assets } from "@/lib/s3Assets";

export type SellDiamondWithoutCertificatePageData = typeof en;

const byLocale: Record<Locale, SellDiamondWithoutCertificatePageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

// Static JSON holds absolute S3 URLs; rebase them onto NEXT_PUBLIC_S3_BASE_URL once.
const localized = withS3Assets(byLocale);

export function getSellDiamondWithoutCertificateData(locale: Locale = "en"): SellDiamondWithoutCertificatePageData {
  return localized[locale] ?? localized.en;
}
