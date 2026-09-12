/**
 * Translate the Sell Your Diamond page into de, fr, it, nl and es.
 *
 * Usage: node scripts/translate-syd.mjs [locale ...]
 *
 * This page is not a JSON resource, so translate-resource-page.mjs does not
 * apply. Its copy lives in one TypeScript object, enContent, which stays the
 * single source of structure. Only the strings are translated, into a
 * dictionary per locale keyed by the English text, and getSydContent maps
 * enContent through that dictionary at runtime.
 *
 * Keeping structure in one place means a new English section needs no
 * matching edit in five other files, and anything absent from a dictionary
 * simply falls back to English rather than disappearing.
 *
 * Existing entries are kept, so a re-run only asks for new strings.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "../src/lib/i18n/sydTranslations.ts");
const OUT = path.join(__dirname, "../src/data/sell-your-diamond");

const LANGUAGE_NAMES = {
  de: "German",
  fr: "French",
  it: "Italian",
  nl: "Dutch",
  es: "Spanish",
};

const locales = process.argv.slice(2).filter((a) => LANGUAGE_NAMES[a]);
const targets = locales.length ? locales : Object.keys(LANGUAGE_NAMES);

/** Keys whose values are identifiers or routes, never prose. */
const SKIP_KEYS = new Set(["id", "imageSrc", "tag"]);

function isProse(text) {
  if (!text || !text.trim()) return false;
  if (text.startsWith("/") || text.startsWith("#") || text.startsWith("__S3__")) return false;
  if (/^https?:\/\//i.test(text)) return false;
  return /\s/.test(text.trim());
}

function collect(value, key, out) {
  if (SKIP_KEYS.has(key) || (key && key.endsWith("Href"))) return out;
  if (typeof value === "string") {
    if (isProse(value)) out.add(value);
    return out;
  }
  if (Array.isArray(value)) {
    for (const item of value) collect(item, key, out);
    return out;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) collect(v, k, out);
  }
  return out;
}

function readEnglish() {
  const text = fs.readFileSync(SRC, "utf8");
  const start = text.indexOf("const enContent: SydContent = ");
  const end = text.indexOf("export function getSydContent");
  if (start < 0 || end < 0) throw new Error("could not locate enContent");

  let literal = text.slice(start + "const enContent: SydContent = ".length, end).trim();
  literal = literal.replace(/;\s*$/, "");
  // s3Asset() is the only call in the literal; stub it so this parses.
  literal = literal.replace(/s3Asset\((["'])(.*?)\1\)/g, '"__S3__$2"');
  return new Function(`return (${literal});`)();
}

async function translate(text, tl, retries = 5) {
  let last;
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
          messages: [
            {
              role: "system",
              content:
                `Translate the user's text from English into ${LANGUAGE_NAMES[tl]}. ` +
                "It is copy from a page where people sell diamonds to an Antwerp dealer. " +
                "Translate the whole text, including terms such as grading report and " +
                "carat weight; leave only proper nouns, street addresses and laboratory " +
                "names (GIA, IGI, HRD, Febelfin, Dalila Diamonds) as written. Preserve " +
                "the tone and any trailing space. Reply with the translation only.",
            },
            { role: "user", content: text },
          ],
        }),
        signal: AbortSignal.timeout(60000),
      });
      if (!res.ok) throw new Error(`OpenAI ${res.status}: ${(await res.text()).slice(0, 140)}`);
      const data = await res.json();
      const out = data.choices?.[0]?.message?.content?.trim();
      if (!out) throw new Error("empty completion");
      return out;
    } catch (error) {
      last = error;
      await new Promise((r) => setTimeout(r, 400 * (i + 1)));
    }
  }
  // Never fall back to English: the caller stores what it gets, and a stored
  // value is never retried, so a silent fallback is permanent and invisible.
  throw new Error(`could not translate to ${tl}: ${last?.message}`);
}

async function pool(items, size, worker) {
  let i = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (i < items.length) await worker(items[i++]);
    }),
  );
}

const en = readEnglish();
const strings = [...collect(en, "", new Set())];
console.log(`translatable strings: ${strings.length}`);
fs.mkdirSync(OUT, { recursive: true });

for (const loc of targets) {
  const file = path.join(OUT, `syd.${loc}.json`);
  const dict = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
  const missing = strings.filter((s) => dict[s] === undefined);
  console.log(`${loc}: ${strings.length} strings, ${missing.length} to translate`);

  let done = 0;
  await pool(missing, 6, async (text) => {
    dict[text] = await translate(text, loc);
    done += 1;
    if (done % 25 === 0 || done === missing.length) {
      fs.writeFileSync(file, JSON.stringify(dict, null, 2) + "\n");
      console.log(`${loc}: ${done}/${missing.length}`);
    }
  });

  fs.writeFileSync(file, JSON.stringify(dict, null, 2) + "\n");
  console.log(`Done ${loc}`);
}
