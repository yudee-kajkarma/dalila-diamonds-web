import { Locale, DEFAULT_LOCALE } from "./config";
import en from "@/dictionaries/en.json";
import de from "@/dictionaries/de.json";
import fr from "@/dictionaries/fr.json";
import it from "@/dictionaries/it.json";
import nl from "@/dictionaries/nl.json";
import es from "@/dictionaries/es.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  de,
  fr: fr as unknown as Dictionary,
  it: it as unknown as Dictionary,
  nl: nl as unknown as Dictionary,
  es: es as unknown as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}
