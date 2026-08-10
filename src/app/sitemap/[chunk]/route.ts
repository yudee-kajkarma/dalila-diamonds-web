import { SITE_BASE_URL, blogToSlug, getAllBlogs } from "@/lib/blogs";
import { diamondToSlug, getPublicDiamondsSlice } from "@/lib/diamonds";

// Must match CHUNK_SIZE in app/sitemap.xml/route.ts.
// 5k keeps per-chunk fetch fast and response small (Google allows up to 50k).
const CHUNK_SIZE = 5000;

const STATIC_PAGES: Array<{ path: string; priority: number; changefreq: string }> = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/aboutUs", priority: 0.8, changefreq: "monthly" },
  { path: "/secure-to-source", priority: 0.8, changefreq: "monthly" },
  { path: "/diamond-source", priority: 0.8, changefreq: "monthly" },
  { path: "/sell-your-diamond", priority: 0.8, changefreq: "monthly" },
  { path: "/diamondKnowledge", priority: 0.8, changefreq: "monthly" },
  { path: "/premium-b2b-diamond-supplier-belgium", priority: 0.8, changefreq: "monthly" },
  { path: "/wholesale/buy-wholesale-diamonds-online", priority: 0.8, changefreq: "weekly" },
  { path: "/sell-your-diamond-safely", priority: 0.8, changefreq: "monthly" },
  { path: "/elongated-cushion-cut-diamond-guide", priority: 0.7, changefreq: "monthly" },
  { path: "/resources/diamond-grading-report-guide", priority: 0.7, changefreq: "monthly" },
  { path: "/resources/diamond-quality-chart", priority: 0.7, changefreq: "monthly" },
  { path: "/resources/diamond-fluorescence-guide", priority: 0.7, changefreq: "monthly" },
  { path: "/resources/diamond-culet-guide", priority: 0.7, changefreq: "monthly" },
  { path: "/resources/diamond-girdle-guide", priority: 0.7, changefreq: "monthly" },
  { path: "/resources/diamond-size-chart", priority: 0.7, changefreq: "monthly" },
  { path: "/resources/natural-vs-lab-grown-diamonds", priority: 0.7, changefreq: "monthly" },
  { path: "/resources/diamond-valuation-calculator", priority: 0.7, changefreq: "monthly" },
  { path: "/resources/where-to-sell-diamond-ring", priority: 0.7, changefreq: "monthly" },
  { path: "/resources/how-to-sell-diamond-ring", priority: 0.7, changefreq: "monthly" },
  { path: "/resources/diamond-appraisal-antwerp-belgium", priority: 0.7, changefreq: "monthly" },
  { path: "/resources/sell-diamond-without-certificate", priority: 0.7, changefreq: "monthly" },
  { path: "/blogs", priority: 0.8, changefreq: "weekly" },
  { path: "/blogs/most-expensive-diamond-shapes", priority: 0.7, changefreq: "monthly" },
  { path: "/blogs/vs1-vs-vs2-diamond-clarity", priority: 0.7, changefreq: "monthly" },
  { path: "/blogs/best-diamond-colour-clarity-combination", priority: 0.7, changefreq: "monthly" },
  { path: "/blogs/fancy-shaped-diamond-cut-quality", priority: 0.7, changefreq: "monthly" },
  { path: "/blogs/cushion-cut-diamond", priority: 0.7, changefreq: "monthly" },
  { path: "/blogs/diamond-bow-tie-effect", priority: 0.7, changefreq: "monthly" },
  { path: "/blogs/igi-diamond-certification", priority: 0.7, changefreq: "monthly" },
  { path: "/inventory", priority: 0.9, changefreq: "daily" },
];

export const revalidate = 3600;

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

type Entry = { url: string; lastmod?: string; changefreq?: string; priority?: number };

function renderUrlset(entries: Entry[]): string {
  const body = entries
    .map((e) => {
      const lastmod = e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : "";
      const changefreq = e.changefreq ? `\n    <changefreq>${e.changefreq}</changefreq>` : "";
      const priority =
        e.priority !== undefined ? `\n    <priority>${e.priority.toFixed(1)}</priority>` : "";
      return `  <url>\n    <loc>${esc(e.url)}</loc>${lastmod}${changefreq}${priority}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ chunk: string }> },
) {
  const { chunk } = await params;
  const id = Number.parseInt(chunk.replace(/\.xml$/i, ""), 10);
  if (!Number.isFinite(id) || id < 0) {
    return new Response("Not Found", { status: 404 });
  }

  const offset = id * CHUNK_SIZE;
  const diamonds = await getPublicDiamondsSlice(offset, CHUNK_SIZE);

  const diamondEntries: Entry[] = diamonds.map((d) => ({
    url: `${SITE_BASE_URL}/inventory/${diamondToSlug(d)}`,
    changefreq: "weekly",
    priority: 0.5,
  }));

  // Chunk 0 also carries static pages + blog entries so robots only need to
  // find them in one place.
  let entries: Entry[];
  if (id === 0) {
    const staticEntries: Entry[] = STATIC_PAGES.map((p) => ({
      url: `${SITE_BASE_URL}${p.path}`,
      changefreq: p.changefreq,
      priority: p.priority,
    }));

    const blogs = await getAllBlogs();
    const blogEntries: Entry[] = blogs.map((blog) => {
      const lastModifiedSource = blog.updatedAt || blog.createdAt;
      const lastmod = lastModifiedSource
        ? new Date(lastModifiedSource).toISOString()
        : undefined;
      return {
        url: `${SITE_BASE_URL}/blogs/${blogToSlug(blog)}`,
        ...(lastmod ? { lastmod } : {}),
        changefreq: "monthly",
        priority: 0.6,
      };
    });

    entries = [...staticEntries, ...blogEntries, ...diamondEntries];
  } else {
    entries = diamondEntries;
  }

  return new Response(renderUrlset(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
