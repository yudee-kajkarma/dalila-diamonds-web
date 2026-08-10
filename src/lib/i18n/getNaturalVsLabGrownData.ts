import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/natural-vs-lab-grown-diamonds.json";
import de from "@/data/resources/natural-vs-lab-grown-diamonds.de.json";
import fr from "@/data/resources/natural-vs-lab-grown-diamonds.fr.json";
import it from "@/data/resources/natural-vs-lab-grown-diamonds.it.json";
import nl from "@/data/resources/natural-vs-lab-grown-diamonds.nl.json";
import es from "@/data/resources/natural-vs-lab-grown-diamonds.es.json";

export type NaturalVsLabGrownPageData = typeof en;

const byLocale: Record<Locale, NaturalVsLabGrownPageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getNaturalVsLabGrownData(locale: Locale = "en"): NaturalVsLabGrownPageData {
  return byLocale[locale] ?? en;
}
