import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, "../src/data/blogs/blog6");
const en = JSON.parse(fs.readFileSync(path.join(base, "en.json"), "utf8"));

const locales = { de: "de", fr: "fr", it: "it", nl: "nl", es: "es" };
const inLanguageByLocale = {
  de: "de",
  fr: "fr",
  it: "it",
  nl: "nl",
  es: "es",
};

const SKIP_EXACT = new Set([
  "GIA",
  "HRD",
  "Dalila Diamonds",
  "Secure to Source",
  "text",
  "link",
  "VS1",
  "VS2",
  "SI1",
  "FL",
  "IF",
  "VVS1 and VVS2",
  "VS1 and VS2",
  "SI1 and SI2",
  "I1, I2 and I3",
  "D–F",
  "G–J",
  "K–M",
  "N–R",
  "S–Z",
]);

const SKIP_KEYS = new Set([
  "id",
  "canonical",
  "datePublished",
  "dateModified",
  "href",
  "primaryButtonHref",
  "secondaryButtonHref",
  "inventoryHref",
  "blogsHref",
  "phoneHref",
  "email",
  "phone",
  "src",
  "logo",
  "width",
  "height",
  "external",
  "type",
  "primaryKeyword",
  "robots",
  "inLanguage",
]);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, 20));
}

function shouldSkipString(text) {
  if (!text || !text.trim()) return true;
  if (SKIP_EXACT.has(text)) return true;
  if (/^https?:\/\//i.test(text)) return true;
  if (/^\/[a-z0-9\-_/]+$/i.test(text)) return true;
  if (/^\d+(\.\d+)?%?$/.test(text)) return true;
  if (/^mailto:/i.test(text)) return true;
  if (/^tel:/i.test(text)) return true;
  return false;
}

function collectStrings(value, keyHint = "", out = new Set()) {
  if (typeof value === "string") {
    if (!SKIP_KEYS.has(keyHint) && !shouldSkipString(value)) out.add(value);
    return out;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, "", out);
    return out;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (SKIP_KEYS.has(k)) continue;
      collectStrings(v, k, out);
    }
  }
  return out;
}

async function translateText(text, tl, retries = 6) {
  for (let i = 0; i < retries; i++) {
    try {
      const url =
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" +
        encodeURIComponent(tl) +
        "&dt=t&q=" +
        encodeURIComponent(text);
      const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (!res.ok) {
        await sleep(300 * (i + 1));
        continue;
      }
      const data = await res.json();
      return data[0].map((x) => x[0]).join("");
    } catch {
      await sleep(300 * (i + 1));
    }
  }
  return text;
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
  if (typeof value === "string") {
    if (SKIP_KEYS.has(keyHint) || shouldSkipString(value)) return value;
    return cache[value] ?? value;
  }
  if (Array.isArray(value)) return value.map((item) => applyCache(item, cache));
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      if (SKIP_KEYS.has(k)) {
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
  const cachePath = path.join(base, `.blog6-cache-${loc}.json`);
  const cache = fs.existsSync(cachePath) ? JSON.parse(fs.readFileSync(cachePath, "utf8")) : {};
  const strings = [...collectStrings(en)];
  const missing = strings.filter((s) => cache[s] === undefined);
  console.log(`${loc}: ${strings.length} strings, ${missing.length} to translate`);

  let done = 0;
  await mapPool(missing, 6, async (text) => {
    const translated = await translateText(text, tl);
    cache[text] = translated;
    done += 1;
    if (done % 40 === 0 || done === missing.length) {
      fs.writeFileSync(cachePath, JSON.stringify(cache));
      console.log(`${loc}: ${done}/${missing.length}`);
    }
    await sleep(20);
  });

  fs.writeFileSync(cachePath, JSON.stringify(cache));
  const translated = applyCache(en, cache);
  translated.meta.canonical = en.meta.canonical;
  translated.meta.datePublished = en.meta.datePublished;
  translated.meta.dateModified = en.meta.dateModified;
  translated.meta.robots = en.meta.robots;
  translated.meta.primaryKeyword = en.meta.primaryKeyword;
  translated.meta.inLanguage = inLanguageByLocale[loc];
  translated.images = {
    featured: { ...en.images.featured, alt: translated.images.featured.alt },
    howItForms: {
      ...en.images.howItForms,
      alt: translated.images.howItForms.alt,
    },
    severity: {
      ...en.images.severity,
      alt: translated.images.severity.alt,
    },
    inspection: {
      ...en.images.inspection,
      alt: translated.images.inspection.alt,
    },
    logo: en.images.logo,
  };
  fs.writeFileSync(path.join(base, `${loc}.json`), JSON.stringify(translated, null, 2) + "\n");
  console.log(`Done ${loc}`);
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
