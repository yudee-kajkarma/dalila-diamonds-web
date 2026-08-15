import { SITE_BASE_URL } from "@/lib/blogs";
import { getPublicDiamondCount } from "@/lib/diamonds";

// Must mirror CHUNK_SIZE in app/sitemap/[chunk]/route.ts.
// 5k keeps per-chunk fetch fast and response small (Google allows up to 50k).
const CHUNK_SIZE = 5000;

// Revalidate the sitemap index daily, matching the chunks. Each regeneration
// costs multi-second backend fetches, and inventory churn does not need
// hourly sitemap freshness.
export const revalidate = 86400;

// Next.js's generateSitemaps creates the individual chunk files
// (/sitemap/0.xml, /sitemap/1.xml, ...) but doesn't produce a top-level
// /sitemap.xml index. robots.txt references /sitemap.xml, and that's
// also the canonical entry point Search Console expects, so we hand-build
// the <sitemapindex> here.
export async function GET() {
  const total = await getPublicDiamondCount();
  const chunkCount = Math.max(1, Math.ceil(total / CHUNK_SIZE));
  // Day-granular lastmod: an always-"now" timestamp tells crawlers the whole
  // catalog changed on every regeneration, inviting constant recrawl of every
  // advertised URL.
  const now = new Date().toISOString().slice(0, 10);

  const entries = Array.from({ length: chunkCount }, (_, i) => {
    return `  <sitemap>
    <loc>${SITE_BASE_URL}/sitemap/${i}.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
