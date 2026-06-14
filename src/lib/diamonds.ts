import { cache } from "react";
import { SITE_BASE_URL, API_BASE_URL } from "./blogs";

export { SITE_BASE_URL };

// Public diamond shape as returned by /api/diamonds/safe.
// All numeric fields are strings in the API response.
export type PublicDiamond = {
  STONE_NO: string;
  diamondId?: string;
  SHAPE?: string;
  CARATS?: string;
  COLOR?: string;
  CLARITY?: string;
  CUT?: string;
  POL?: string;
  SYM?: string;
  FLOUR?: string;
  LAB?: string;
  RATIO?: string;
  LENGTH?: string;
  WIDTH?: string;
  DEPTH?: string;
  DEPTH_PER?: string;
  TABLE_PER?: string;
  CROWN_ANGLE?: string;
  CROWN_HEIGHT?: string;
  PAVILLION_ANGLE?: string;
  PAVILLION_HEIGHT?: string;
  GIRDLE?: string;
  REPORT_DATE?: string;
  REAL_IMAGE?: string;
  ARROW_IMAGE?: string;
  HEART_IMAGE?: string;
  MP4?: string;
  HandVideo?: string;
  TweezerVideo?: string;
  CERTI_PDF?: string;
  COMMENTS_1?: string;
  [key: string]: unknown;
};

type SafeApiResponse = {
  data?: PublicDiamond[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
  };
};

// Industry shape codes → human-friendly names used in titles, slugs, copy.
// Unknown codes fall back to a title-cased version of the code itself.
const SHAPE_NAMES: Record<string, string> = {
  RD: "Round",
  RB: "Round",
  RBC: "Round Brilliant",
  BR: "Round Brilliant",
  OV: "Oval",
  OMO: "Oval Modified",
  PR: "Princess",
  PS: "Pear",
  EM: "Emerald",
  SE: "Square Emerald",
  AS: "Asscher",
  SQE: "Square Emerald",
  CU: "Cushion",
  CB: "Cushion Brilliant",
  CMB: "Cushion Modified Brilliant",
  RA: "Radiant",
  MQ: "Marquise",
  HS: "Heart",
  HT: "Heart",
  TR: "Trillion",
  TRI: "Trillion",
  TZ: "Trapezoid",
  BG: "Baguette",
};

export function shapeName(code: string | undefined): string {
  if (!code) return "Diamond";
  const upper = code.trim().toUpperCase();
  if (SHAPE_NAMES[upper]) return SHAPE_NAMES[upper];
  return upper
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/\./g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Builds the SEO slug per the product format:
// {carat}-carat-{shape}-natural-diamond-{color}-{clarity}-{lab}-certified-{stoneNo}
// Accepts both the public API shape (string fields) and the internal
// DiamondData shape (CARATS is number) by coercing everything to string.
export type SlugDiamond = {
  STONE_NO?: string | number;
  SHAPE?: string;
  CARATS?: string | number;
  COLOR?: string;
  CLARITY?: string;
  LAB?: string;
};

function s(v: string | number | undefined): string {
  if (v === undefined || v === null) return "";
  return typeof v === "number" ? String(v) : v.trim();
}

export function diamondToSlug(d: SlugDiamond): string {
  const carat = s(d.CARATS);
  const shape = shapeName(d.SHAPE);
  const color = s(d.COLOR);
  const clarity = s(d.CLARITY);
  const lab = s(d.LAB);
  const stone = s(d.STONE_NO);
  const parts = [
    carat ? `${carat}-carat` : "",
    shape ? `${shape}-natural-diamond` : "natural-diamond",
    color || "",
    clarity || "",
    lab ? `${lab}-certified` : "",
    stone,
  ]
    .filter(Boolean)
    .join("-");
  return slugify(parts);
}

// Extracts the trailing STONE_NO from a slug.
export function stoneNoFromSlug(slug: string): string | null {
  const cleaned = slug.replace(/^\/+|\/+$/g, "");
  const m =
    cleaned.match(/-certified-([A-Za-z0-9]+)$/i) ?? cleaned.match(/-([A-Za-z0-9]+)$/);
  return m ? m[1] : null;
}

// Reverses the slugified shape name (e.g. "oval-modified") back to the API
// shape code (e.g. "OMO") so it can be passed to the safe endpoint's SHAPE
// filter. Returns null if no match.
function shapeCodeFromSlug(shapeSlug: string): string | null {
  for (const [code, name] of Object.entries(SHAPE_NAMES)) {
    if (slugify(name) === shapeSlug) return code;
  }
  return null;
}

// Parses a product slug into the filter values we use to look up the diamond
// via the safe endpoint (which has no STONE_NO param).
// Expected: {carat}-carat-{shape-slug}-natural-diamond-{color}-{clarity}-{lab}-certified-{stoneNo}
function parseProductSlug(slug: string): {
  stoneNo: string;
  carat?: string;
  shapeCode?: string | null;
  color?: string;
  clarity?: string;
  lab?: string;
} | null {
  const cleaned = slug.replace(/^\/+|\/+$/g, "").toLowerCase();
  const certIdx = cleaned.lastIndexOf("-certified-");
  if (certIdx === -1) {
    const trailing = cleaned.match(/-([a-z0-9]+)$/);
    return trailing ? { stoneNo: trailing[1] } : null;
  }
  const stoneNo = cleaned.slice(certIdx + "-certified-".length);
  const withoutCert = cleaned.slice(0, certIdx);

  const ndMarker = "-natural-diamond-";
  const ndIdx = withoutCert.indexOf(ndMarker);
  if (ndIdx === -1) return { stoneNo };
  const left = withoutCert.slice(0, ndIdx);
  const right = withoutCert.slice(ndIdx + ndMarker.length);

  const rightTokens = right.split("-");
  if (rightTokens.length < 3) return { stoneNo };
  const lab = rightTokens.pop()!.toUpperCase();
  const clarity = rightTokens.pop()!.toUpperCase();
  const color = rightTokens.join("-").toUpperCase();

  const caratMarker = "-carat-";
  const caratIdx = left.indexOf(caratMarker);
  if (caratIdx === -1) return { stoneNo, color, clarity, lab };
  const caratPart = left.slice(0, caratIdx);
  const shapeSlug = left.slice(caratIdx + caratMarker.length);
  const carat = caratPart.replace(/-/g, ".");
  const shapeCode = shapeCodeFromSlug(shapeSlug);

  return { stoneNo, carat, shapeCode, color, clarity, lab };
}

// --- API fetchers ---------------------------------------------------------

const PAGE_SIZE = 1000;
const PARALLEL_PAGES = 10;

// Looks up a single diamond from its product slug. The safe API doesn't expose
// a STONE_NO filter, so we narrow by carat/colour/clarity/lab/shape (all
// derivable from the slug) and then pick the exact STONE_NO match.
export const getDiamondFromSlug = cache(
  async (slug: string): Promise<PublicDiamond | null> => {
    const parsed = parseProductSlug(slug);
    if (!parsed?.stoneNo) return null;

    // Filter by carat + colour + clarity + lab only. SHAPE is intentionally
    // omitted: the backend stores it inconsistently (sometimes as a code like
    // "OMO", sometimes as the full name "OVAL MODIFIED"), so filtering by
    // SHAPE causes false-negative 404s. The other four filters narrow the
    // result set enough that scanning the response for STONE_NO is fast.
    const params = new URLSearchParams();
    params.set("limit", "1000");
    params.set("page", "1");
    if (parsed.carat) {
      params.set("CARATS_MIN", parsed.carat);
      params.set("CARATS_MAX", parsed.carat);
    }
    if (parsed.color) params.set("COLOR", parsed.color);
    if (parsed.clarity) params.set("CLARITY", parsed.clarity);
    if (parsed.lab) params.set("LAB", parsed.lab);

    // Slug-encoded STONE_NO loses information (spaces/dashes/case) — e.g.
    // API "VED 1" → slug "ved-1", API "ZSMFI122" → slug "zsmfi122". Normalize
    // both sides to upper-cased alphanumerics before comparing.
    const norm = (v: string) => v.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const target = norm(parsed.stoneNo);
    const MAX_PAGES = 5; // up to 5000 results before giving up
    try {
      for (let page = 1; page <= MAX_PAGES; page++) {
        params.set("page", String(page));
        const response = await fetch(
          `${API_BASE_URL}/api/diamonds/safe?${params.toString()}`,
          // Page declares revalidate=3600 (ISR). The inner fetch must also
          // be cacheable — `no-store` here forces the route fully dynamic
          // and Next throws "static to dynamic at runtime". Filtered
          // responses are well under Next's 2MB fetch-cache cap.
          { next: { revalidate: 3600 } },
        );
        if (!response.ok) return null;
        const payload = (await response.json()) as SafeApiResponse;
        const list = Array.isArray(payload.data) ? payload.data : [];
        const hit = list.find((d) => norm(d.STONE_NO ?? "") === target);
        if (hit) return hit;
        const totalPages = payload.pagination?.totalPages ?? 0;
        if (list.length === 0 || (totalPages && page >= totalPages)) return null;
      }
      return null;
    } catch {
      return null;
    }
  },
);

// Returns the total number of public diamonds (used for sitemap chunking).
export const getPublicDiamondCount = cache(async (): Promise<number> => {
  try {
    const url = `${API_BASE_URL}/api/diamonds/safe?limit=1&page=1`;
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) return 0;
    const payload = (await response.json()) as SafeApiResponse;
    return payload.pagination?.totalRecords ?? 0;
  } catch {
    return 0;
  }
});

async function fetchPage(page: number): Promise<PublicDiamond[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/diamonds/safe?limit=${PAGE_SIZE}&page=${page}`,
      // Response per page can exceed 2MB; skip the Next data cache.
      // The sitemap route itself is cached at the route level via ISR.
      { cache: "no-store" },
    );
    if (!response.ok) return [];
    const payload = (await response.json()) as SafeApiResponse;
    return Array.isArray(payload.data) ? payload.data : [];
  } catch {
    return [];
  }
}

// Fetches a contiguous slice of public diamonds spanning [offset, offset + size).
// Used by sitemap chunks. Pages are fetched in parallel batches to keep
// build/runtime within Next's 60s prerender budget.
export async function getPublicDiamondsSlice(
  offset: number,
  size: number,
): Promise<PublicDiamond[]> {
  if (size <= 0) return [];
  const firstPage = Math.floor(offset / PAGE_SIZE) + 1;
  const skipInFirstPage = offset % PAGE_SIZE;
  const lastPage = Math.ceil((offset + size) / PAGE_SIZE);
  const out: PublicDiamond[] = [];

  for (let start = firstPage; start <= lastPage; start += PARALLEL_PAGES) {
    const end = Math.min(start + PARALLEL_PAGES - 1, lastPage);
    const batch = await Promise.all(
      Array.from({ length: end - start + 1 }, (_, i) => fetchPage(start + i)),
    );
    let stop = false;
    for (let i = 0; i < batch.length; i++) {
      const page = start + i;
      const list = batch[i];
      if (list.length === 0) {
        stop = true;
        break;
      }
      const sliceStart = page === firstPage ? skipInFirstPage : 0;
      for (let j = sliceStart; j < list.length && out.length < size; j++) {
        out.push(list[j]);
      }
      if (out.length >= size) {
        stop = true;
        break;
      }
    }
    if (stop) break;
  }
  return out;
}

// --- Template formatters (per dalila product format.md) -------------------

export function parsedCarat(d: PublicDiamond): string {
  const c = (d.CARATS ?? "").trim();
  const n = Number.parseFloat(c);
  return Number.isFinite(n) ? n.toFixed(2) : c;
}

export function shortTitle(d: PublicDiamond): string {
  return `${parsedCarat(d)}ct ${shapeName(d.SHAPE)} Natural Diamond | ${d.COLOR ?? ""} ${
    d.CLARITY ?? ""
  } | ${d.LAB ?? ""} Certified`.replace(/\s+/g, " ").trim();
}

export function metaTitle(d: PublicDiamond): string {
  return `Buy ${parsedCarat(d)}ct ${shapeName(d.SHAPE)} Natural Diamond – ${
    d.COLOR ?? ""
  } ${d.CLARITY ?? ""}, ${d.LAB ?? ""} Certified`
    .replace(/\s+/g, " ")
    .trim();
}

export function metaDescription(d: PublicDiamond): string {
  return `Discover this ${parsedCarat(d)} carat ${shapeName(d.SHAPE)} natural diamond with ${
    d.COLOR ?? ""
  } colour, ${d.CLARITY ?? ""} clarity, ${d.POL ?? ""} polish and ${
    d.SYM ?? ""
  } symmetry. ${d.LAB ?? ""} certified natural diamond available from Dalila Diamonds for trusted diamond sourcing.`
    .replace(/\s+/g, " ")
    .trim();
}

export function h1Title(d: PublicDiamond): string {
  return `${parsedCarat(d)} Carat ${shapeName(d.SHAPE)} Natural Diamond – ${
    d.COLOR ?? ""
  } Colour, ${d.CLARITY ?? ""} Clarity, ${d.LAB ?? ""} Certified`
    .replace(/\s+/g, " ")
    .trim();
}

export function realImageUrl(d: PublicDiamond): string | null {
  const url = (d.REAL_IMAGE ?? "").trim();
  if (!url || url.toLowerCase() === "false") return null;
  if (!/^https?:\/\//i.test(url)) return null;
  return url;
}

export function viewerUrl(d: PublicDiamond): string | null {
  const url = (d.MP4 ?? "").trim();
  if (!url || url.toLowerCase() === "false") return null;
  if (!/^https?:\/\//i.test(url)) return null;
  return url;
}

export function diamondUrl(d: PublicDiamond): string {
  return `${SITE_BASE_URL}/inventory/${diamondToSlug(d)}`;
}
