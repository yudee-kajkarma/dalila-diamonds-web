import type { Locale } from "@/lib/i18n/config";
import en from "@/data/diamonds/page10/en.json";
import de from "@/data/diamonds/page10/de.json";
import fr from "@/data/diamonds/page10/fr.json";
import it from "@/data/diamonds/page10/it.json";
import nl from "@/data/diamonds/page10/nl.json";
import es from "@/data/diamonds/page10/es.json";

export type NaturalRoughDiamondsPageData = typeof en;

const byLocale: Record<Locale, NaturalRoughDiamondsPageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getNaturalRoughDiamondsData(
  locale: Locale = "en",
): NaturalRoughDiamondsPageData {
  return byLocale[locale] ?? en;
}

export const NATURAL_ROUGH_SLUG = "natural-rough-diamonds";
export const NATURAL_ROUGH_PATH = `/diamonds/${NATURAL_ROUGH_SLUG}`;
