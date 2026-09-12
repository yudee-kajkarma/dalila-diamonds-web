/**
 * Check every redirect in next.config.ts against a running site.
 *
 * Usage:
 *   node scripts/verify-redirects.mjs                        # http://localhost:3000
 *   node scripts/verify-redirects.mjs --base https://www.daliladiamonds.com
 *   node scripts/verify-redirects.mjs --variants             # also ?query and trailing slash
 *   node scripts/verify-redirects.mjs --sources-only         # skip the locale copies
 *
 * This is Phase 1 step 6: "verify the source returns a single-hop 301 and
 * the target returns 200". It reads the rules out of next.config.ts rather
 * than repeating them, so it cannot drift from what is deployed.
 *
 * What counts as a failure:
 *   - any status that is not 301 (308 in particular: the packages ask for a
 *     genuine 301, and Next.js emits 308 for `permanent: true`)
 *   - a Location that does not match the configured destination
 *   - a destination that is itself a source, which makes a redirect chain
 *   - a target that does not answer 200
 *
 * Exits non-zero if anything fails, so it can gate a deploy.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG = path.join(__dirname, "../next.config.ts");
const LOCALES = ["de", "fr", "it", "nl", "es"];

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : null;
};
const BASE = (arg("base") || "http://localhost:3000").replace(/\/+$/, "");
const VARIANTS = process.argv.includes("--variants");
const SOURCES_ONLY = process.argv.includes("--sources-only");

/** Every source -> destination pair the config declares, in either style. */
function readRules(text) {
  const rules = [];
  const seen = new Set();
  const add = (from, to) => {
    if (!from || !to || from.includes(":") || from.includes("\\")) return;
    const key = `${from} ${to}`;
    if (seen.has(key)) return;
    seen.add(key);
    rules.push({ from, to });
  };

  for (const m of text.matchAll(/\[\s*'(\/[^']+)'\s*,\s*'(\/[^']+)'\s*\]/g)) {
    add(m[1], m[2]);
    if (!SOURCES_ONLY) {
      for (const loc of LOCALES) add(`/${loc}${m[1]}`, `/${loc}${m[2]}`);
    }
  }
  for (const m of text.matchAll(/source:\s*'([^']+)'\s*,\s*destination:\s*'([^']+)'/g)) {
    add(m[1], m[2]);
  }
  return rules;
}

const rules = readRules(fs.readFileSync(CONFIG, "utf8"));
const sources = new Set(rules.map((r) => r.from));

async function head(url) {
  // Some hosts answer HEAD differently from GET; GET with a manual redirect
  // is what a crawler actually sees.
  const res = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(20000) });
  return { status: res.status, location: res.headers.get("location") };
}

/**
 * Compare a Location header with the configured destination.
 *
 * Only the path is compared. Next.js carries the query string across to the
 * destination, so a source requested with ?utm_source=... lands with that
 * parameter still attached - which is the wanted behaviour, not a mismatch.
 */
function sameTarget(location, destination) {
  if (!location) return false;
  const path = (url) =>
    url
      .replace(/^https?:\/\/[^/]+/, "")
      .split(/[?#]/)[0]
      .replace(/\/+$/, "") || "/";
  return path(location) === path(destination);
}

async function pool(items, size, worker) {
  let i = 0;
  const out = [];
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (i < items.length) {
        const index = i++;
        out[index] = await worker(items[index]);
      }
    }),
  );
  return out;
}

const failures = [];
const notes = [];

console.log(`base : ${BASE}`);
console.log(`rules: ${rules.length}${SOURCES_ONLY ? " (unprefixed only)" : ""}\n`);

await pool(rules, 8, async (rule) => {
  try {
    const { status, location } = await head(BASE + rule.from);

    if (status !== 301) {
      failures.push(`${rule.from}  expected 301, got ${status}`);
      return;
    }
    if (!sameTarget(location, rule.to)) {
      failures.push(`${rule.from}  301 -> ${location} (expected ${rule.to})`);
      return;
    }
    if (sources.has(rule.to)) {
      failures.push(`${rule.from}  chains: ${rule.to} is itself a redirect source`);
      return;
    }

    if (VARIANTS) {
      const query = await head(`${BASE}${rule.from}?utm_source=chatgpt.com`);
      if (query.status !== 301 || !sameTarget(query.location, rule.to)) {
        failures.push(`${rule.from}?utm_source=...  got ${query.status} -> ${query.location}`);
      }
      const slash = await head(`${BASE}${rule.from}/`);
      // Next normalises the trailing slash first, so two hops here is its
      // own behaviour rather than a bad rule - worth seeing, not failing.
      if (slash.status === 308) {
        notes.push(`${rule.from}/  308 -> ${slash.location} (slash normalised, then redirects)`);
      } else if (slash.status !== 301 || !sameTarget(slash.location, rule.to)) {
        failures.push(`${rule.from}/  got ${slash.status} -> ${slash.location}`);
      }
    }
  } catch (error) {
    failures.push(`${rule.from}  request failed: ${error.message}`);
  }
});

// Each destination must actually answer, and only needs checking once.
const targets = [...new Set(rules.map((r) => r.to))];
console.log(`checking ${targets.length} distinct targets...\n`);

await pool(targets, 8, async (target) => {
  try {
    const res = await fetch(BASE + target, { signal: AbortSignal.timeout(30000) });
    if (res.status !== 200) failures.push(`TARGET ${target}  expected 200, got ${res.status}`);
  } catch (error) {
    failures.push(`TARGET ${target}  request failed: ${error.message}`);
  }
});

if (notes.length) {
  console.log("NOTES");
  for (const n of notes) console.log(`  ${n}`);
  console.log("");
}

if (failures.length) {
  console.log(`FAILED — ${failures.length} problem(s)\n`);
  for (const f of failures.sort()) console.log(`  ${f}`);
  process.exit(1);
}

console.log(`OK — ${rules.length} redirect(s) single-hop 301, ${targets.length} target(s) 200.`);
