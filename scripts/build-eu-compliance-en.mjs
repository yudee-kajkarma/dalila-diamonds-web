/**
 * Build the EU Diamond Compliance hub data file from the revision-3 spec.
 *
 *   node scripts/build-eu-compliance-en.mjs            report what it would write
 *   node scripts/build-eu-compliance-en.mjs --write    write the JSON
 *
 * WHY THIS PARSES RATHER THAN RETYPES
 *
 * The earlier resource pages were hand-authored as literal objects, which is
 * fine for a guide whose wording is ours. This page is not: it states
 * sanctions thresholds, carat cut-offs and the exact names of legal
 * instruments, and the spec flags it as legally time-sensitive. Retyping
 * 8,000 words of that invites the one kind of error nobody notices - a
 * paraphrase that changes what the rule says. Parsing reproduces the author's
 * sentences exactly, and re-running it after a spec revision is a diff rather
 * than a re-read.
 *
 * WHAT IT DELIBERATELY DROPS
 *
 * The spec interleaves copy with notes to whoever builds the page. Those are
 * listed explicitly below rather than matched by pattern, because the obvious
 * pattern also matches real content: "the transaction should become
 * anonymous" is a sentence about money laundering, not an instruction.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SPEC = path.join(__dirname, '../../dalila-blogs-revision-3.md');
const OUT = path.join(__dirname, '../src/data/resources/eu-diamond-compliance.json');

/** The spec lives in one tab of a much larger document. */
const SPEC_FROM = 19326;
const SPEC_TO = 20640;

/**
 * Sections that are instructions to us, not content for a reader.
 *
 * 45 is a roadmap for pages that do not exist yet. The SEO block is the
 * brief itself.
 */
const DROP_SECTIONS = [
  /^SEO IMPLEMENTATION INFORMATION$/i,
  /^45\.\s*What This Compliance Hub Should Link To$/i,
  /^FEATURED IMAGE RECOMMENDATION$/i,
];

/**
 * Individual sentences that address an editor.
 *
 * Matched on a distinctive prefix so a later spec revision that rewords the
 * sentence fails loudly here rather than publishing it.
 */
const DROP_PARAGRAPHS = [
  "Dalila's existing Buying Diamonds in Antwerp Guide should internally link",
  "Dalila's Diamond Parcel Quality-Control Checklist should internally link",
];

/**
 * A labelled call to action: "CTA 1: Request B2B Diamond Supply".
 *
 * These name buttons for whoever builds the page, not sentences for a reader.
 * The same label reached 38 live CMS articles before anyone noticed, so it is
 * filtered per line rather than per paragraph: the spec runs the three of them
 * together with markdown line continuations, and they would otherwise arrive
 * joined into a single sentence.
 */
const CTA_LINE = /^\*{0,2}\s*CTA\s*\d*\s*:?\s*\*{0,2}/i;

/** Strip the export tool's escaping and the emphasis the data files do not carry. */
function plain(text) {
  return text
    .replace(/\\([\\`*_{}[\]()#+\-.!&>|~])/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1$2')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * A stable anchor id, since other pages are meant to deep-link into these.
 *
 * Capped at 60 characters on a word boundary: a heading like "What Is an EORI
 * Number and Why Does a Diamond Importer Need One?" makes an unusable
 * fragment otherwise, and cutting mid-word leaves a trailing hyphen that
 * looks like a typo in someone else's href.
 */
function slugify(title) {
  const full = plain(title)
    .toLowerCase()
    .replace(/^\d+\.\s*/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (full.length <= 60) return full;
  const cut = full.slice(0, 60);
  const boundary = cut.lastIndexOf('-');
  return (boundary > 30 ? cut.slice(0, boundary) : cut).replace(/-+$/, '');
}

/** Split the spec into `# **Heading**` blocks. */
function readSections() {
  const all = fs.readFileSync(SPEC, 'utf8').split('\n');
  const lines = all.slice(SPEC_FROM - 1, SPEC_TO);

  const sections = [];
  let current = null;

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    const h1 = /^#\s+(?!#)(.*)$/.exec(line);
    if (h1) {
      if (current) sections.push(current);
      current = { title: plain(h1[1]), body: [] };
      continue;
    }
    if (current) current.body.push(line);
  }
  if (current) sections.push(current);
  return sections;
}

/**
 * Turn a section body into paragraphs, a table, and sub-headed blocks.
 *
 * The spec writes many one-sentence paragraphs; that is the author's cadence
 * and it is preserved rather than joined, because a compliance page is read
 * by scanning.
 */
function parseBody(body) {
  const paragraphs = [];
  const subsections = [];
  let table = null;
  let tableRows = [];
  let sub = null;

  const flushTable = () => {
    if (!tableRows.length) return;
    const cells = tableRows
      .filter((r) => !/^\s*\|[\s:|-]+\|\s*$/.test(r))
      .map((r) =>
        r.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => plain(c)),
      );
    if (cells.length > 1) table = { headers: cells[0], rows: cells.slice(1) };
    tableRows = [];
  };

  const push = (text) => {
    const value = plain(text);
    if (!value) return;
    if (DROP_PARAGRAPHS.some((p) => value.startsWith(p))) return;
    if (sub) sub.paragraphs.push(value);
    else paragraphs.push(value);
  };

  let buffer = [];
  const flushBuffer = () => {
    if (buffer.length) push(buffer.join(' '));
    buffer = [];
  };

  for (const line of body) {
    if (/^\s*\|/.test(line)) {
      flushBuffer();
      tableRows.push(line);
      continue;
    }
    flushTable();

    const h2 = /^##\s+(.*)$/.exec(line);
    if (h2) {
      flushBuffer();
      if (sub) subsections.push(sub);
      sub = { title: plain(h2[1]), paragraphs: [] };
      continue;
    }

    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      flushBuffer();
      continue;
    }

    if (!line.trim()) {
      flushBuffer();
      continue;
    }

    if (CTA_LINE.test(line.trim())) {
      flushBuffer();
      continue;
    }

    buffer.push(line.trim());
  }

  flushBuffer();
  flushTable();
  if (sub) subsections.push(sub);

  return { paragraphs, subsections, table };
}

/**
 * How the 58 numbered sections are grouped in the page navigation.
 *
 * The sections stay individually anchored, because supporting pages are meant
 * to link into them; the grouping exists so the contents list is usable
 * rather than a column of 58 near-identical lines. Keyed on the leading
 * number, with the unnumbered sections placed by title.
 */
const NAV_GROUPS = [
  { title: 'Before you start', match: [1, 2, 3, 4] },
  { title: 'Moving diamonds through Belgium', match: [5, 6, 7] },
  { title: 'Rough diamonds and the Kimberley Process', match: [8, 9] },
  { title: 'Russian-diamond sanctions', match: [10, 11, 18] },
  { title: 'Origin due diligence', match: [12, 13, 14, 15, 16, 17] },
  { title: 'Shipment documentation', match: [19, 20, 21, 22, 23, 27] },
  { title: 'Screening, tax and records', match: [24, 25, 26, 28, 29, 30, 31] },
  { title: 'Transactions and practice', match: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44] },
];

function main() {
  const write = process.argv.includes('--write');
  const raw = readSections();

  const kept = raw.filter((s) => !DROP_SECTIONS.some((re) => re.test(s.title)));
  const dropped = raw.filter((s) => DROP_SECTIONS.some((re) => re.test(s.title)));

  const byTitle = (needle) => kept.find((s) => s.title.toLowerCase().startsWith(needle));

  const hub = byTitle('eu diamond compliance hub');
  const quick = byTitle('quick answer');
  const checklist = byTitle('eu diamond compliance checklist');
  const finalAnswer = byTitle('final answer');
  const sourcing = byTitle('natural-diamond sourcing through antwerp');
  const faq = byTitle('frequently asked questions');

  const framing = new Set([hub, quick, checklist, finalAnswer, sourcing, faq]);
  const body = kept.filter((s) => !framing.has(s));

  // The hub opener carries the compliance notice as a blockquote.
  const hubParsed = parseBody(hub.body);
  const notice = hubParsed.paragraphs.find((p) => p.startsWith('> ') || /^Compliance notice/i.test(p.replace(/^>\s*/, '')));
  const introParagraphs = hubParsed.paragraphs
    .filter((p) => p !== notice)
    .map((p) => p.replace(/^>\s*/, ''));

  const sections = body.map((s) => {
    const parsed = parseBody(s.body);
    const number = /^(\d+)\./.exec(s.title);
    const out = {
      id: slugify(s.title),
      number: number ? Number(number[1]) : null,
      title: plain(s.title).replace(/^\d+\.\s*/, ''),
      paragraphs: parsed.paragraphs,
    };
    if (parsed.table) out.table = parsed.table;
    if (parsed.subsections.length) out.subsections = parsed.subsections;
    return out;
  });

  // Unnumbered sections belong with the numbered one they follow.
  let lastNumber = 0;
  for (const s of sections) {
    if (s.number) lastNumber = s.number;
    else s.number = lastNumber;
  }

  const navGroups = NAV_GROUPS.map((g) => ({
    title: g.title,
    items: sections
      .filter((s) => g.match.includes(s.number))
      .map((s) => ({ id: s.id, label: s.title })),
  })).filter((g) => g.items.length);

  const placed = new Set(navGroups.flatMap((g) => g.items.map((i) => i.id)));
  const unplaced = sections.filter((s) => !placed.has(s.id));

  const checklistParsed = parseBody(checklist.body);
  const quickParsed = parseBody(quick.body);
  const finalParsed = parseBody(finalAnswer.body);
  const sourcingParsed = parseBody(sourcing.body);
  const faqParsed = parseBody(faq.body);

  const data = {
    meta: {
      title: 'EU Diamond Compliance: Sanctions & Imports | Dalila',
      description:
        'Navigate EU diamond compliance for natural diamonds, including Russian sanctions, origin evidence, Kimberley Process, EORI, declarations and Antwerp Diamond Office procedures.',
      canonical: 'https://www.daliladiamonds.com/resources/eu-diamond-compliance',
      dateModified: '2026-09-13',
    },
    urls: {
      euSanctions: 'https://finance.ec.europa.eu/eu-and-world/sanctions-restrictive-measures_en',
      eori: 'https://taxation-customs.ec.europa.eu/customs-4/customs-procedures-import-and-export/customs-procedures/economic-operators-registration-and-identification-number-eori_en',
      kimberley: 'https://www.kimberleyprocess.com/',
      awdc: 'https://www.awdc.be/',
      fpsEconomy: 'https://economie.fgov.be/',
    },
    banner: {
      title: 'EU Diamond Compliance Hub',
      breadcrumbHome: 'Home',
      breadcrumbResources: 'Resources',
      breadcrumbCurrent: 'EU Diamond Compliance',
      imageAlt: 'EU diamond compliance resource banner for professional natural diamond buyers',
    },
    hero: {
      title: plain(hub.title),
      subheading:
        'How customs, Belgian diamond rules, the Kimberley Process, EU sanctions and anti-money-laundering obligations fit together for professional natural-diamond trade in the European Union.',
      reviewDateLabel: 'Last reviewed:',
      reviewDate: 'September 2026',
    },
    complianceNotice: notice ? notice.replace(/^>\s*/, '') : '',
    introduction: { paragraphs: introParagraphs },
    quickAnswer: {
      id: slugify(quick.title),
      title: plain(quick.title),
      paragraphs: quickParsed.paragraphs,
    },
    checklistTable: {
      id: slugify(checklist.title),
      title: plain(checklist.title),
      paragraphs: checklistParsed.paragraphs,
      table: checklistParsed.table,
    },
    overviewNav: { title: 'On this page', groups: navGroups },
    sections,
    finalAnswer: {
      id: slugify(finalAnswer.title),
      title: plain(finalAnswer.title),
      paragraphs: finalParsed.paragraphs,
    },
    cta: {
      id: slugify(sourcing.title),
      title: plain(sourcing.title),
      richParagraphs: sourcingParsed.paragraphs.map((p) => [{ type: 'text', value: p }]),
    },
    faqs: {
      title: plain(faq.title),
      items: faqParsed.subsections.map((s) => ({
        question: s.title,
        answer: s.paragraphs.join(' '),
      })),
    },
  };

  const words = JSON.stringify(data).split(/\s+/).length;
  console.log(`spec sections read      : ${raw.length}`);
  console.log(`dropped as instructions : ${dropped.length}  ${dropped.map((d) => `"${d.title}"`).join(', ')}`);
  console.log(`content sections        : ${sections.length}`);
  console.log(`nav groups              : ${navGroups.length}`);
  if (unplaced.length) {
    console.log(`\nNOT IN THE NAV (${unplaced.length}) - add them to NAV_GROUPS:`);
    for (const s of unplaced) console.log(`   ${s.number ?? '?'}  ${s.title}`);
  }
  console.log(`\nchecklist table         : ${data.checklistTable.table ? `${data.checklistTable.table.rows.length} rows` : 'MISSING'}`);
  console.log(`faq items               : ${data.faqs.items.length}`);
  console.log(`compliance notice       : ${data.complianceNotice ? 'present' : 'MISSING'}`);
  console.log(`approx words            : ${words}`);

  // Anchors are a published interface once other pages link to them, so a
  // collision has to fail here rather than silently send two links to one place.
  const ids = sections.map((s) => s.id);
  const clashes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (clashes.length) {
    console.log(`\nDUPLICATE ANCHOR IDS: ${[...new Set(clashes)].join(', ')}`);
  }

  const empty = sections.filter((s) => !s.paragraphs.length && !s.table);
  if (empty.length) {
    console.log(`\nEMPTY SECTIONS (${empty.length}):`);
    for (const s of empty) console.log(`   ${s.title}`);
  }

  // Nothing addressed to an editor may reach the page.
  const leaked = JSON.stringify(data).match(
    /(?:should (?:be )?(?:internally )?link|CTA\s*\d*\s*:)[^"]{0,60}/gi,
  );
  if (leaked) console.log(`\nINSTRUCTION TEXT STILL PRESENT:\n   ${leaked.join('\n   ')}`);

  if (!write) {
    console.log('\nDry run. Pass --write to save the JSON.');
    return;
  }
  fs.writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`\nwrote ${OUT}`);
}

main();
