import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/diamond-appraisal-antwerp-belgium.json";
import de from "@/data/resources/diamond-appraisal-antwerp-belgium.de.json";
import fr from "@/data/resources/diamond-appraisal-antwerp-belgium.fr.json";
import it from "@/data/resources/diamond-appraisal-antwerp-belgium.it.json";
import nl from "@/data/resources/diamond-appraisal-antwerp-belgium.nl.json";
import es from "@/data/resources/diamond-appraisal-antwerp-belgium.es.json";

export type DiamondAppraisalAntwerpPageData = typeof en;

const byLocale: Record<Locale, DiamondAppraisalAntwerpPageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getDiamondAppraisalAntwerpData(locale: Locale = "en"): DiamondAppraisalAntwerpPageData {
  return byLocale[locale] ?? en;
}
