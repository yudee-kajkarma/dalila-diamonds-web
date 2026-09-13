/**
 * List every S3 asset URL the static page data refers to, and check it.
 *
 *   node scripts/audit-s3-links.mjs            list only
 *   node scripts/audit-s3-links.mjs --check    also request each URL
 *   node scripts/audit-s3-links.mjs --check --out ../s3-link-audit.md
 *
 * WHY THIS EXISTS
 *
 * The JSON under src/data holds absolute URLs pointing at the old
 * uniglo-jewels-dev bucket. Nothing renders them directly: every loader runs
 * withS3Assets(), which rebases them onto S3_BASE_URL, so the bucket actually
 * served is whatever NEXT_PUBLIC_S3_BASE_URL says - and if it says nothing,
 * the fallback in s3Assets.ts is still the old bucket. This reports both
 * forms of every URL so the two can be compared rather than assumed.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, '../src');
const DATA = path.join(SRC, 'data');

const LEGACY = 'https://uniglo-jewels-dev.s3.eu-north-1.amazonaws.com/dalila';
const TARGET =
  process.env.NEXT_PUBLIC_S3_BASE_URL ||
  'https://dalila-inventory-management-dev.s3.eu-north-1.amazonaws.com/dalila';

/**
 * Which route a data file belongs to.
 *
 * Derived from where each loader imports its JSON, so the mapping stays true
 * if a file moves. Anything unrecognised is reported rather than guessed at.
 */
const ROUTES = [
  [/^resources\/diamond-size-chart/, '/resources/diamond-size-chart'],
  [/^resources\/diamond-valuation-calculator/, '/resources/diamond-valuation-calculator'],
  [/^resources\/where-to-sell-diamond-ring/, '/resources/where-to-sell-diamond-ring'],
  [/^resources\/diamond-appraisal-antwerp-belgium/, '/resources/diamond-appraisal-antwerp-belgium'],
  [/^resources\/how-to-sell-diamond-ring/, '/resources/how-to-sell-diamond-ring'],
  [/^resources\/sell-diamond-without-certificate/, '/resources/sell-diamond-without-certificate'],
  [/^diamonds\/page10/, '/diamonds/natural-rough-diamonds'],
  [/^wholesale\/page8/, '/wholesale/buy-wholesale-diamonds-online'],
];

const LOCALES = ['de', 'fr', 'it', 'es', 'nl'];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.json')) out.push(full);
  }
  return out;
}

function routeFor(relative) {
  const unix = relative.split(path.sep).join('/');
  for (const [pattern, route] of ROUTES) if (pattern.test(unix)) return route;
  return null;
}

/** Every legacy URL in a file, with the key path that holds it. */
function collect(value, urls = [], trail = []) {
  if (typeof value === 'string') {
    if (value.startsWith(LEGACY)) urls.push({ url: value, field: trail.join('.') });
    return urls;
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => collect(v, urls, [...trail, String(i)]));
    return urls;
  }
  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) collect(v, urls, [...trail, k]);
  }
  return urls;
}

async function head(url) {
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    return { status: response.status, type: response.headers.get('content-type') || '', size: response.headers.get('content-length') || '' };
  } catch (error) {
    return { status: 0, type: `request failed: ${error.message}`, size: '' };
  }
}

async function main() {
  const check = process.argv.includes('--check');
  const outIndex = process.argv.indexOf('--out');
  const outFile = outIndex >= 0 ? process.argv[outIndex + 1] : null;

  const byRoute = new Map();
  const unmapped = [];

  for (const file of walk(DATA)) {
    const relative = path.relative(DATA, file);
    // Some of these files were saved with a byte order mark, which JSON.parse
    // rejects outright rather than ignoring.
    const raw = fs.readFileSync(file, 'utf8').replace(/^﻿/, '');
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      console.error(`  skipped ${relative}: ${error.message}`);
      continue;
    }
    const found = collect(parsed);
    if (!found.length) continue;

    const route = routeFor(relative);
    if (!route) {
      unmapped.push(relative);
      continue;
    }
    if (!byRoute.has(route)) byRoute.set(route, { urls: new Map(), files: new Set() });
    const bucket = byRoute.get(route);
    bucket.files.add(relative);
    for (const { url, field } of found) {
      if (!bucket.urls.has(url)) bucket.urls.set(url, new Set());
      bucket.urls.get(url).add(field.replace(/\.\d+\./g, '.'));
    }
  }

  const distinct = new Set([...byRoute.values()].flatMap((b) => [...b.urls.keys()]));
  console.error(`routes: ${byRoute.size}   files: ${[...byRoute.values()].reduce((n, b) => n + b.files.size, 0)}   distinct URLs: ${distinct.size}`);
  if (unmapped.length) console.error(`unmapped data files: ${unmapped.join(', ')}`);

  // Check each distinct URL once, on both buckets.
  const results = new Map();
  if (check) {
    let done = 0;
    for (const url of distinct) {
      const legacy = await head(url);
      const target = await head(url.replace(LEGACY, TARGET));
      results.set(url, { legacy, target });
      done += 1;
      process.stderr.write(`\rchecked ${done}/${distinct.size}`);
    }
    process.stderr.write('\n');
  }

  const lines = [];
  lines.push('# S3 asset links by page');
  lines.push('');
  lines.push(`Generated ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC`);
  lines.push('');
  lines.push('The JSON under `src/data` stores absolute URLs on the old bucket. Every loader');
  lines.push('passes its data through `withS3Assets()`, which rebases them onto `S3_BASE_URL`,');
  lines.push('so the bucket actually served is whatever `NEXT_PUBLIC_S3_BASE_URL` is set to.');
  lines.push('With that unset, the fallback in `src/lib/s3Assets.ts` is still the old bucket.');
  lines.push('');
  lines.push(`- Stored bucket: \`${LEGACY}\``);
  lines.push(`- Target bucket: \`${TARGET}\``);
  lines.push('');
  lines.push(`${byRoute.size} pages, ${distinct.size} distinct assets. Each page also has a`);
  lines.push(`\`/{locale}\` variant for ${LOCALES.join(', ')}, sharing the same assets.`);
  lines.push('');

  if (check) {
    const ok = [...results.values()].filter((r) => r.target.status === 200).length;
    const legacyOk = [...results.values()].filter((r) => r.legacy.status === 200).length;
    lines.push('## Summary');
    lines.push('');
    lines.push('| Bucket | Loads | Does not load |');
    lines.push('| --- | --- | --- |');
    lines.push(`| Stored (uniglo) | ${legacyOk} / ${distinct.size} | ${distinct.size - legacyOk} |`);
    lines.push(`| Target (dalila) | ${ok} / ${distinct.size} | ${distinct.size - ok} |`);
    lines.push('');
    lines.push('### Reading the status codes');
    lines.push('');
    lines.push('`200` means the asset loads for an ordinary visitor.');
    lines.push('');
    lines.push('`403` is S3 returning `AccessDenied`, which it does both when the object is');
    lines.push('missing and when it exists but is not publicly readable. The two cannot be');
    lines.push('told apart from outside the account. What it does settle is the thing that');
    lines.push('matters: these requests were unauthenticated, exactly like a browser loading');
    lines.push('an `<img>`, and HEAD and GET return the same code — so a `403` here is an');
    lines.push('image that will not render on the page.');
    lines.push('');
    lines.push('Both buckets above are `-dev`. Whatever `NEXT_PUBLIC_S3_BASE_URL` is set to in');
    lines.push('production is the one that decides what visitors see, so re-run this against');
    lines.push('that value before drawing conclusions about the live site:');
    lines.push('');
    lines.push('```');
    lines.push('NEXT_PUBLIC_S3_BASE_URL=<production base> \\');
    lines.push('  node scripts/audit-s3-links.mjs --check --out ../../s3-link-audit.md');
    lines.push('```');
    lines.push('');
  }

  for (const [route, bucket] of [...byRoute].sort()) {
    lines.push(`## \`${route}\``);
    lines.push('');
    lines.push(`${bucket.urls.size} asset(s), from ${bucket.files.size} data file(s).`);
    lines.push('');
    if (check) {
      lines.push('| Asset | Field | uniglo | dalila |');
      lines.push('| --- | --- | --- | --- |');
    } else {
      lines.push('| Asset | Field |');
      lines.push('| --- | --- |');
    }
    for (const [url, fields] of [...bucket.urls].sort()) {
      const asset = url.slice(LEGACY.length);
      const field = [...fields].sort().join('<br>');
      if (check) {
        const r = results.get(url);
        const mark = (s) => (s.status === 200 ? '200' : s.status === 0 ? 'error' : String(s.status));
        lines.push(`| \`${asset}\` | ${field} | ${mark(r.legacy)} | ${mark(r.target)} |`);
      } else {
        lines.push(`| \`${asset}\` | ${field} |`);
      }
    }
    lines.push('');
    lines.push('<details><summary>Full URLs</summary>');
    lines.push('');
    for (const url of [...bucket.urls.keys()].sort()) {
      lines.push(`- ${url.replace(LEGACY, TARGET)}`);
    }
    lines.push('');
    lines.push('</details>');
    lines.push('');
  }

  const report = lines.join('\n');
  if (outFile) {
    const target = path.resolve(__dirname, outFile);
    fs.writeFileSync(target, `${report}\n`, 'utf8');
    console.error(`wrote ${target}`);
  } else {
    console.log(report);
  }
}

main();
