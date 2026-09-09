import { getAllBlogsForAdmin } from "@/lib/blogs";
import BlogsManageTable, { type ManageRow } from "./BlogsManageTable";
import { getBlogBaseSlug, isBlogLanguage, type BlogLanguage } from "@/lib/blogLanguages";

// Admin screen: always read fresh rather than serving a cached listing, so an
// edit is reflected the moment the admin comes back to this page.
export const dynamic = "force-dynamic";

/**
 * Collapse the document list into one row per article.
 *
 * The collection stores one document per language, so 627 documents are only
 * about 133 articles. An admin needs to see the article and which languages it
 * has, not 627 near-identical rows.
 */
function buildRows(
  blogs: Awaited<ReturnType<typeof getAllBlogsForAdmin>>,
): ManageRow[] {
  const resolveLanguage = (b: (typeof blogs)[number]): BlogLanguage =>
    isBlogLanguage(b.language) ? b.language : "en";

  // Which documents actually compete for a URL.
  //
  // Grouping alone is not enough: two documents can serve the same
  // /blogs/<slug> while sitting in different translation groups, in which case
  // they render as two unrelated rows and the clash stays invisible. A URL is
  // the base slug plus the served language, so that is what collisions are
  // keyed on here, across every document rather than within a group.
  const documentsByUrl = new Map<string, string[]>();
  for (const blog of blogs) {
    if (!blog._id) continue;
    const key = `${getBlogBaseSlug(blog.customSlug)}::${resolveLanguage(blog)}`;
    const bucket = documentsByUrl.get(key);
    if (bucket) bucket.push(blog._id);
    else documentsByUrl.set(key, [blog._id]);
  }

  const groups = new Map<string, typeof blogs>();

  for (const blog of blogs) {
    // Same key order as the public listing, so both agree on what one article
    // is: the translation group, else the base slug, else the document itself.
    const key =
      blog.translationGroupId ||
      getBlogBaseSlug(blog.customSlug) ||
      blog._id ||
      blog.title;
    if (!key) continue;
    const bucket = groups.get(key);
    if (bucket) bucket.push(blog);
    else groups.set(key, [blog]);
  }

  const rows: ManageRow[] = [];

  for (const [key, versions] of groups) {
    // Prefer English as the row's representative; it carries the canonical slug.
    const primary =
      versions.find((b) => resolveLanguage(b) === "en") ?? versions[0];

    const languages: ManageRow["languages"] = {};
    for (const version of versions) {
      const language = resolveLanguage(version);
      // If two documents claim the same language, the first wins here; the
      // duplicate is surfaced by the `duplicateLanguages` flag instead.
      if (!languages[language]) {
        languages[language] = {
          id: version._id || "",
          hasImage: Boolean(version.featuredImage?.trim()),
          hasMetaDescription: Boolean(version.metaDescription?.trim()),
          hasExcerpt: Boolean(version.excerpt?.trim()),
          updatedAt: version.updatedAt || null,
        };
      }
    }

    // Flag any language of this article whose URL is claimed by more than one
    // document, including documents belonging to another translation group.
    const seenLanguages = new Set<BlogLanguage>();
    const duplicates: Array<{ language: BlogLanguage; ids: string[] }> = [];
    for (const version of versions) {
      const language = resolveLanguage(version);
      if (seenLanguages.has(language)) continue;
      seenLanguages.add(language);
      const ids =
        documentsByUrl.get(`${getBlogBaseSlug(version.customSlug)}::${language}`) || [];
      if (ids.length > 1) duplicates.push({ language, ids });
    }

    // Data problems worth an admin's attention, collected per article.
    //
    // A malformed slug is stored with stray slashes. The URL already resolves
    // correctly because the read path strips them, so this is not broken - but
    // the stored value disagrees with the served one, which makes slug
    // comparisons unreliable. Saving the article normalises it.
    //
    // A missing language is the consequential one: the site treats an unset
    // language as English, so a Dutch article with no label is listed and
    // served as English.
    const malformedSlugs = versions
      .map((v) => v.customSlug || "")
      .filter((slug) => slug && slug !== slug.trim().replace(/^\/+|\/+$/g, ""));

    const missingLanguage = versions.filter((v) => !v.language).length;
    const ungrouped = versions.filter((v) => !v.translationGroupId).length;

    const updatedAt = versions
      .map((v) => v.updatedAt)
      .filter(Boolean)
      .sort()
      .pop();

    rows.push({
      key,
      id: primary._id || "",
      title: primary.title || "(untitled)",
      slug: getBlogBaseSlug(primary.customSlug) || "",
      languages,
      duplicates,
      malformedSlugs,
      missingLanguage,
      ungrouped,
      documentCount: versions.length,
      updatedAt: updatedAt || null,
      datePublished: primary.datePublished || primary.createdAt || null,
      lastReviewedAt: primary.lastReviewedAt || null,
      primaryKeyword: primary.primaryKeyword || "",
    });
  }

  return rows.sort((a, b) => a.title.localeCompare(b.title));
}

export default async function BlogsManagePage() {
  const blogs = await getAllBlogsForAdmin();
  const rows = buildRows(blogs);

  return <BlogsManageTable rows={rows} documentCount={blogs.length} />;
}
