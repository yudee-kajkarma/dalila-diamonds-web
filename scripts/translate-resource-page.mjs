/**
 * Translate a resource page JSON (en) into de, fr, it, nl, es.
 * Usage: node scripts/translate-resource-page.mjs diamond-size-chart
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, "../src/data/resources");
const slug = process.argv[2];

if (!slug) {
  console.error("Usage: node scripts/translate-resource-page.mjs <slug>");
  process.exit(1);
}

const enPath = path.join(base, `${slug}.json`);
if (!fs.existsSync(enPath)) {
  console.error(`Missing ${enPath}`);
  process.exit(1);
}

const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
console.log(process.env.OPENAI_API_KEY ? "provider: openai" : "provider: google (set OPENAI_API_KEY to switch)");
const locales = { de: "de", fr: "fr", it: "it", nl: "nl", es: "es" };

const SKIP_EXACT = new Set([
  "None",
  "Round",
  "Oval",
  "Cushion",
  "Princess",
  "Emerald",
  "Radiant",
  "Pear",
  "Marquise",
  "Asscher",
  "Heart",
  "Square cushion",
  "Extremely Thin",
  "Small",
  "Medium",
  "Slightly Thick",
  "Large",
  "Very Thick",
  "Extremely Thick",
  "Excellent",
  "Very Good",
  "Good",
  "Fair",
  "Poor",
  "FL",
  "IF",
  "VVS1",
  "VVS2",
  "VS1",
  "VS2",
  "SI1",
  "SI2",
  "I1",
  "I2",
  "I3",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "GIA",
  "HRD",
  "HRD Antwerp",
  "IGI",
  "S2S – Secure To Source",
  "DS4U – Diamond Source For You",
  "DS4U",
  "BROWSE NATURAL DIAMONDS",
  "text",
  "link",
  "en-GB",
  "index, follow",
]);

const SKIP_SUBTREE_KEYS = new Set([
  "shapes",
  "carats",
  "results",
  "urls",
]);

const SKIP_KEYS = new Set([
  "id",
  "canonical",
  "dateModified",
  "datePublished",
  "href",
  "primaryButtonHref",
  "secondaryButtonHref",
  "sizeChartHref",
  "qualityChartHref",
  "gradingReportHref",
  "fluorescenceGuideHref",
  "culetGuideHref",
  "girdleGuideHref",
  "inventoryHref",
  "ds4uHref",
  "s2sHref",
  "external",
  "type",
  "src",
  "width",
  "height",
  "inLanguage",
  "robots",
  "gia4Cs",
  "giaCut",
  "giaColour",
  "giaClarity",
  "giaCarat",
  "giaColor",
  "shape",
  "value",
  "leadSource",
  "labelKey",
  "key",
  "formPurpose",
  "mode",
]);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function shouldSkipString(text, keyHint = "") {
  if (!text || !text.trim()) return true;
  if (SKIP_KEYS.has(keyHint)) return true;
  if (SKIP_EXACT.has(text)) return true;
  if (/^https?:\/\//i.test(text)) return true;
  if (/^\/[a-z0-9\-_/]+$/i.test(text)) return true;
  if (text.startsWith("#")) return true;
  if (/^\d+(\.\d+)?$/.test(text)) return true;
  if (/^[A-Za-z]+\|\d+(\.\d+)?$/.test(text)) return true;
  if (/^[\d.–\-×x\smm%]+$/i.test(text)) return true;
  if (/^approximately [\d.–\-×x\smm]+$/i.test(text)) return true;
  if (/^[\d.]+–[\d.]+\s×\s[\d.]+–[\d.]+\smm$/i.test(text)) return true;
  if (/^[\d.]+–[\d.]+\smm$/i.test(text)) return true;
  return false;
}

function collectStrings(value, keyHint = "", out = new Set()) {
  if (SKIP_SUBTREE_KEYS.has(keyHint)) return out;

  if (typeof value === "string") {
    if (!shouldSkipString(value, keyHint)) out.add(value);
    return out;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, keyHint, out);
    return out;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (SKIP_KEYS.has(k) || SKIP_SUBTREE_KEYS.has(k)) continue;
      collectStrings(v, k, out);
    }
  }
  return out;
}

const LANGUAGE_NAMES = {
  de: "German",
  fr: "French",
  it: "Italian",
  nl: "Dutch",
  es: "Spanish",
};

/**
 * Translate through OpenAI when a key is available.
 *
 * Preferred over the public Google endpoint, which answers 429 as soon as a
 * run is more than a trickle. Set OPENAI_API_KEY to use it.
 */
async function translateViaOpenAI(text, tl) {
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
            `Translate the user's text from English into ${LANGUAGE_NAMES[tl] || tl}. ` +
            "It is copy from a natural-diamond retailer's website. Keep diamond trade " +
            "terms and grade codes exactly as written. Reply with the translation only, " +
            "with no quotes, notes or preamble.",
        },
        { role: "user", content: text },
      ],
    }),
    signal: AbortSignal.timeout(60000),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${(await res.text()).slice(0, 160)}`);
  const data = await res.json();
  const out = data.choices?.[0]?.message?.content?.trim();
  if (!out) throw new Error("OpenAI returned no content");
  return out;
}

async function translateViaGoogle(text, tl) {
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" +
    encodeURIComponent(tl) +
    "&dt=t&q=" +
    encodeURIComponent(text);
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`Google ${res.status}`);
  const data = await res.json();
  return data[0].map((x) => x[0]).join("");
}

/**
 * Never returns the English text as a stand-in for a translation.
 *
 * It used to, and the caller caches whatever comes back, so a run against a
 * rate-limited endpoint quietly filled the cache with English and reported
 * success. Because a cached value is never retried, that state is invisible
 * and permanent. Failing loudly is the only safe behaviour here.
 */
async function translateText(text, tl, retries = 6) {
  const useOpenAI = Boolean(process.env.OPENAI_API_KEY);
  let last;
  for (let i = 0; i < retries; i++) {
    try {
      return useOpenAI ? await translateViaOpenAI(text, tl) : await translateViaGoogle(text, tl);
    } catch (error) {
      last = error;
      await sleep(300 * (i + 1));
    }
  }
  throw new Error(`could not translate to ${tl} after ${retries} tries: ${last?.message}`);
}

async function mapPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let index = 0;
  async function run() {
    while (index < items.length) {
      const i = index++;
      results[i] = await worker(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => run()));
  return results;
}

function applyCache(value, cache, keyHint = "") {
  if (SKIP_SUBTREE_KEYS.has(keyHint)) return value;

  if (typeof value === "string") {
    if (shouldSkipString(value, keyHint)) return value;
    return cache[value] ?? value;
  }
  if (Array.isArray(value)) return value.map((item) => applyCache(item, cache, keyHint));
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      if (SKIP_KEYS.has(k) || SKIP_SUBTREE_KEYS.has(k)) {
        out[k] = v;
        continue;
      }
      out[k] = applyCache(v, cache, k);
    }
    return out;
  }
  return value;
}

async function runLocale(loc, tl) {
  const cachePath = path.join(base, `.${slug}-cache-${loc}.json`);
  const cache = fs.existsSync(cachePath) ? JSON.parse(fs.readFileSync(cachePath, "utf8")) : {};
  const strings = [...collectStrings(en)];
  const missing = strings.filter((s) => cache[s] === undefined);
  console.log(`${slug} ${loc}: ${strings.length} strings, ${missing.length} to translate`);

  let done = 0;
  await mapPool(missing, 6, async (text) => {
    const translated = await translateText(text, tl);
    cache[text] = translated;
    done += 1;
    if (done % 40 === 0 || done === missing.length) {
      fs.writeFileSync(cachePath, JSON.stringify(cache));
      console.log(`${slug} ${loc}: ${done}/${missing.length}`);
    }
    await sleep(20);
  });

  fs.writeFileSync(cachePath, JSON.stringify(cache));
  const translated = applyCache(en, cache);
  translated.meta.canonical = en.meta.canonical;
  if (en.meta.dateModified) translated.meta.dateModified = en.meta.dateModified;
  if (en.meta.datePublished) translated.meta.datePublished = en.meta.datePublished;
  if (en.meta.inLanguage) translated.meta.inLanguage = en.meta.inLanguage;
  if (en.meta.robots) translated.meta.robots = en.meta.robots;
  fs.writeFileSync(path.join(base, `${slug}.${loc}.json`), JSON.stringify(translated, null, 2) + "\n");
  console.log(`Done ${slug} ${loc}`);
}

async function main() {
  for (const [loc, tl] of Object.entries(locales)) {
    await runLocale(loc, tl);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
