import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/diamond-grading-report-guide.json";
import de from "@/data/resources/diamond-grading-report-guide.de.json";
import fr from "@/data/resources/diamond-grading-report-guide.fr.json";
import it from "@/data/resources/diamond-grading-report-guide.it.json";
import nl from "@/data/resources/diamond-grading-report-guide.nl.json";
import es from "@/data/resources/diamond-grading-report-guide.es.json";

export type GradingReportPageData = typeof en;

const byLocale: Record<Locale, GradingReportPageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getGradingReportData(locale: Locale = "en"): GradingReportPageData {
  return byLocale[locale] ?? en;
}
