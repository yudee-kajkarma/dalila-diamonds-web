import type { MetadataRoute } from "next";
import { SITE_BASE_URL, blogToSlug, getAllBlogs } from "@/lib/blogs";

const STATIC_PAGES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/aboutUs", priority: 0.8, changeFrequency: "monthly" },
  { path: "/secure-to-source", priority: 0.8, changeFrequency: "monthly" },
  { path: "/diamond-source", priority: 0.8, changeFrequency: "monthly" },
  { path: "/sud", priority: 0.7, changeFrequency: "monthly" },
  { path: "/diamondKnowledge", priority: 0.8, changeFrequency: "monthly" },
  { path: "/premium-b2b-diamond-supplier-belgium", priority: 0.8, changeFrequency: "monthly" },
  { path: "/sell-your-diamond-safely", priority: 0.8, changeFrequency: "monthly" },
  { path: "/elongated-cushion-cut-diamond-guide", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blogs", priority: 0.8, changeFrequency: "weekly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getAllBlogs();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${SITE_BASE_URL}${path}`,
      priority,
      changeFrequency,
    }),
  );

  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => {
    const lastModifiedSource = blog.updatedAt || blog.createdAt;
    const lastModified = lastModifiedSource ? new Date(lastModifiedSource) : undefined;
    return {
      url: `${SITE_BASE_URL}/blogs/${blogToSlug(blog)}`,
      ...(lastModified && !Number.isNaN(lastModified.getTime()) ? { lastModified } : {}),
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [...staticEntries, ...blogEntries];
}
