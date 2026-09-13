/**
 * Repoint frontend links that aim at a URL which now redirects.
 *
 * DRY RUN BY DEFAULT. Pass --apply to write.
 *
 * Usage:
 *   node scripts/fix-frontend-links.mjs
 *   node scripts/fix-frontend-links.mjs --apply
 *
 * The backend has fix-internal-links for article bodies, but the React pages
 * are built from data files and components in this repo, and those carry
 * links too. Nothing had looked at them, so pages went on pointing at
 * /sell-your-diamond-safely after it was merged away - including the site's
 * own resource navigation.
 *
 * The rules come from next.config.ts, the same file the redirects live in, so
 * this cannot drift from what actually ships.
 *
 * Locale copies are included. Unlike the article bodies, where the packages
 * say to finish English first, a link is structural: the Dutch page should not
 * take an extra hop because its copy was translated before the merge.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CONFIG = path.join(ROOT, "next.config.ts");
const SRC = path.join(ROOT, "src");
const APPLY = process.argv.includes("--apply");

/** source -> destination, exactly as next.config.ts declares them. */
function readRedirects() {
  const text = fs.readFileSync(CONFIG, "utf8");
  const map = new Map();
  for (const m of text.matchAll(/\[\s*'(\/[^']+)'\s*,\s*'(\/[^']+)'\s*\]/g)) {
    map.set(m[1].replace(/\/$/, ""), m[2]);
  }
  for (const m of text.matchAll(/source:\s*'([^']+)'\s*,\s*destination:\s*'([^']+)'/g)) {
    const [, from, to] = m;
    // Pattern rules and the special-character catch-alls are not link targets.
    if (from.includes(":") || from.includes("\\")) continue;
    map.set(from.replace(/\/$/, ""), to);
  }
  return map;
}

/**
 * The route a file under src/app serves, or null for anything else.
 *
 * A page that lives at /sell-your-diamond-safely refers to that path in its
 * own metadata - a canonical, an alternates entry - and those are statements
 * about itself, not links to somewhere else. Rewriting them would have the
 * page claim a canonical belonging to a different page.
 */
function ownRoute(file) {
  const rel = path.relative(path.join(SRC, "app"), file).replace(/\\/g, "/");
  if (rel.startsWith("..")) return null;
  const dir = path.posix.dirname(rel);
  if (dir === ".") return "/";
  const segments = dir.split("/").filter((s) => !/^\[.*\]$/.test(s) && !s.startsWith("("));
  return "/" + segments.join("/");
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(json|ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const redirects = readRedirects();
console.log(`redirect rules read from next.config.ts: ${redirects.size}\n`);

// Longest first, so /a/b is rewritten before a rule for /a could match it.
const sources = [...redirects.keys()].sort((a, b) => b.length - a.length);

let changedFiles = 0;
let changedLinks = 0;
const updates = [];

for (const file of walk(SRC)) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  let text = fs.readFileSync(file, "utf8");
  const before = text;
  const found = new Map();
  const self = ownRoute(file);
  const kept = [];

  for (const from of sources) {
    if (self && from === self) {
      if (text.includes(`"${from}"`) || text.includes(`'${from}'`)) kept.push(from);
      continue;
    }
    const to = redirects.get(from);
    // Only a whole quoted path, so /sud never matches inside /sudan and a
    // longer path that merely starts with a rule is left alone.
    const pattern = new RegExp(
      `(["'\`])${from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\/?)(["'\`])`,
      "g",
    );
    const hits = text.match(pattern);
    if (!hits) continue;
    text = text.replace(pattern, (_m, open, _slash, close) => `${open}${to}${close}`);
    found.set(from, { to, count: hits.length });
  }

  if (kept.length) {
    console.log(`${rel}`);
    for (const k of kept) {
      console.log(`   left alone: ${k} is this page's own route, not a link to elsewhere`);
    }
  }

  if (text === before) continue;

  changedFiles += 1;
  for (const { count } of found.values()) changedLinks += count;
  updates.push({ file, rel, text });

  console.log(rel);
  for (const [from, { to, count }] of found) {
    console.log(`   ${from}  ->  ${to}${count > 1 ? `   (${count}x)` : ""}`);
  }
}

console.log(`\nfiles to change: ${changedFiles}   link references: ${changedLinks}`);

if (!APPLY) {
  console.log("\nDry run. Nothing was written. Pass --apply to save.");
  process.exit(0);
}

for (const u of updates) fs.writeFileSync(u.file, u.text);
console.log(`\nupdated: ${updates.length} file(s)`);
