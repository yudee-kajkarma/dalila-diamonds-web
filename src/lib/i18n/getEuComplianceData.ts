import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/eu-diamond-compliance.json";
import { withS3Assets } from "@/lib/s3Assets";

export type EuCompliancePageData = typeof en;

// English only for now. This page states sanctions thresholds and the names of
// legal instruments, so it is reviewed in English before it is translated;
// until then every locale is served the English text rather than a partial
// translation, which on a compliance page would be worse than none.
// Add the five locale JSONs here once scripts/translate-resource-page.mjs has
// produced them.
const byLocale: Record<Locale, EuCompliancePageData> = {
  en,
  de: en,
  fr: en,
  it: en,
  nl: en,
  es: en,
};

// Static JSON holds absolute S3 URLs; rebase them onto NEXT_PUBLIC_S3_BASE_URL once.
const localized = withS3Assets(byLocale);

export function getEuComplianceData(locale: Locale = "en"): EuCompliancePageData {
  return localized[locale] ?? localized.en;
}
