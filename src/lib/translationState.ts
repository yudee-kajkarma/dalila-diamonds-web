/**
 * What condition each language version of an article is in.
 *
 * Two independent signals, deliberately not collapsed into one:
 *
 * - `health`  who wrote it, and whether a human has read it
 * - `stale`   whether the English version has moved on since
 *
 * They are different problems with different queues. Unreviewed is a
 * proofreading job; out-of-date is a re-translation job. An article can be
 * both, or either, and the dashboard shows them as separate filters.
 */

export type LanguageHealth = "missing" | "supplied" | "machine" | "reviewed";

export type LanguageState = { health: LanguageHealth; stale: boolean };

export type TranslationSource = {
  language?: string;
  updatedAt?: string;
  /** Absent on every document written before the translation feature. */
  translationStatus?: "machine" | "reviewed";
  /** This document's own body fingerprint, stamped on every save. */
  contentHash?: string;
  /** For a translation: the fingerprint of the English body it came from. */
  sourceContentHash?: string;
};

/**
 * How far apart two saves must be before one counts as "after" the other.
 *
 * Bulk imports and migrations write a whole article's languages in one pass,
 * and whichever row lands last is milliseconds newer. Measured against the
 * live data, 80 of 169 apparently-stale versions had a gap under a minute and
 * several were 0.0s — pure write ordering. Without this tolerance the chip
 * would report 99 of 140 articles as out of date on a day when nothing had
 * been edited at all, which teaches people to ignore it.
 *
 * Only the coarse path needs this. The hash comparison is exact.
 */
const CO_WRITE_TOLERANCE_MS = 60_000;

function timestamp(value: string | undefined): number | null {
  if (!value) return null;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : parsed;
}

export function deriveLanguageState(
  english: TranslationSource | undefined,
  version: TranslationSource | undefined,
): LanguageState {
  if (!version) return { health: "missing", stale: false };

  // An absent status means human-supplied. This is what keeps the 522
  // translations that predate the feature from being reported as needing
  // work, and it is why no migration was required.
  const health: LanguageHealth = version.translationStatus ?? "supplied";

  return { health, stale: isStale(english, version) };
}

function isStale(
  english: TranslationSource | undefined,
  version: TranslationSource,
): boolean {
  if (!english) return false;

  // Exact, for translations this feature wrote: only a change to the English
  // body counts, so fixing a typo in the English meta description does not
  // mark five translations out of date.
  if (version.sourceContentHash && english.contentHash) {
    return version.sourceContentHash !== english.contentHash;
  }

  // Coarse fallback for translations we did not write, which have no
  // fingerprint to compare. Some false positives from trivial English edits,
  // but it is the only signal available and it catches the case that matters:
  // an English article rewritten while its translations were left behind.
  const versionAt = timestamp(version.updatedAt);
  const englishAt = timestamp(english.updatedAt);
  if (versionAt === null || englishAt === null) return false;

  return englishAt - versionAt > CO_WRITE_TOLERANCE_MS;
}

export function describeLanguageState(
  state: LanguageState,
  language: string,
): string {
  const code = language.toUpperCase();
  if (state.health === "missing") return `No ${code} version yet`;

  const origin =
    state.health === "machine"
      ? `${code}: machine translation, not yet reviewed`
      : state.health === "reviewed"
        ? `${code}: machine translation, reviewed`
        : `${code} version`;

  return state.stale
    ? `${origin} — the English article has changed since this was written`
    : origin;
}
