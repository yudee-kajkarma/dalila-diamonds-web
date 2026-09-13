"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ArrowUpDown,
  ExternalLink,
  RefreshCw,
  Archive,
  Loader2,
  AlertTriangle,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { marcellus, jost } from "@/lib/fonts";
import { blogApi } from "@/lib/api";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import {
  BLOG_LANGUAGE_OPTIONS,
  getBlogBaseSlug,
  isBlogLanguage,
  type BlogLanguage,
} from "@/lib/blogLanguages";
import type { Blog } from "@/services/api/types/user.types";
import { deriveLanguageState, describeLanguageState } from "@/lib/translationState";
import DuplicateResolver from "./DuplicateResolver";
import DeletedBlogsPanel from "./DeletedBlogsPanel";
import { useIsAdmin } from "../useIsAdmin";
import { refreshBlogs } from "../actions";

type LanguageInfo = {
  id: string;
  hasImage: boolean;
  hasMetaDescription: boolean;
  hasExcerpt: boolean;
  updatedAt: string | null;
  /** Who wrote it: supplied by hand, generated, or generated then read. */
  health: "supplied" | "machine" | "reviewed";
  /** The English version has changed since this one was written. */
  stale: boolean;
  /** Kept off the site until published. */
  isDraft: boolean;
};

export type ManageRow = {
  key: string;
  id: string;
  title: string;
  slug: string;
  languages: Partial<Record<BlogLanguage, LanguageInfo>>;
  /** Languages holding more than one document — records fighting for one URL. */
  duplicates: Array<{ language: BlogLanguage; ids: string[] }>;
  /** Stored slugs carrying stray slashes. The URL still resolves; the stored value is wrong. */
  malformedSlugs: string[];
  /** Documents with no language. The site treats those as English. */
  missingLanguage: number;
  /** Documents not linked to a translation group. */
  ungrouped: number;
  /** Language versions kept off the site until someone publishes them. */
  drafts: number;
  /** Language versions this feature wrote that nobody has read yet. */
  unreviewed: number;
  /** Language versions whose English source has moved on since. */
  outOfDate: number;
  documentCount: number;
  updatedAt: string | null;
  datePublished: string | null;
  lastReviewedAt: string | null;
  primaryKeyword: string;
};

type SortKey = "title" | "languages" | "updated";
type Filter =
  | "all"
  | "missingImage"
  | "missingMeta"
  | "incomplete"
  | "duplicates"
  | "dataIssues"
  | "unreviewed"
  | "outOfDate"
  | "drafts";

const ALL_LANGUAGES = BLOG_LANGUAGE_OPTIONS.map((o) => o.code);

function formatDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
}

/**
 * Collapse the document list into one row per article.
 *
 * The collection stores one document per language, so 627 documents are only
 * about 133 articles. An admin needs to see the article and which languages it
 * has, not 627 near-identical rows.
 */
function buildRows(blogs: Blog[]): ManageRow[] {
  const resolveLanguage = (b: Blog): BlogLanguage =>
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

  const groups = new Map<string, Blog[]>();

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

    // The English version is the reference every translation is measured
    // against, both for the quality columns and for staleness.
    const englishVersion = versions.find((v) => resolveLanguage(v) === "en");

    const languages: ManageRow["languages"] = {};
    for (const version of versions) {
      const language = resolveLanguage(version);
      // If two documents claim the same language, the first wins here; the
      // duplicate is surfaced by the `duplicateLanguages` flag instead.
      if (!languages[language]) {
        const state = deriveLanguageState(englishVersion, version);
        languages[language] = {
          id: version._id || "",
          hasImage: Boolean(version.featuredImage?.trim()),
          hasMetaDescription: Boolean(version.metaDescription?.trim()),
          hasExcerpt: Boolean(version.excerpt?.trim()),
          updatedAt: version.updatedAt || null,
          // deriveLanguageState only reports "missing" when the version is
          // absent, and this one is in front of us.
          health: state.health === "missing" ? "supplied" : state.health,
          stale: state.stale,
          isDraft: version.status === "draft",
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

    // Two different queues, deliberately counted apart: unreviewed is a
    // proofreading job, out-of-date is a re-translation job.
    const drafts = versions.filter((v) => v.status === "draft").length;
    const unreviewed = versions.filter(
      (v) => v.translationStatus === "machine",
    ).length;
    const outOfDate = Object.values(languages).filter(
      (info) => info?.stale,
    ).length;

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
      drafts,
      unreviewed,
      outOfDate,
      documentCount: versions.length,
      updatedAt: updatedAt || null,
      datePublished: primary.datePublished || primary.createdAt || null,
      lastReviewedAt: primary.lastReviewedAt || null,
      primaryKeyword: primary.primaryKeyword || "",
    });
  }

  return rows.sort((a, b) => a.title.localeCompare(b.title));
}

export default function BlogsManageTable() {
  const isAdmin = useIsAdmin();

  const [rows, setRows] = useState<ManageRow[]>([]);
  const [documentCount, setDocumentCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [languageFilter, setLanguageFilter] = useState<BlogLanguage | "">("");
  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [sortAsc, setSortAsc] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<ManageRow | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [resolving, setResolving] = useState<{
    row: ManageRow;
    language: BlogLanguage;
    ids: string[];
  } | null>(null);

  // English is the reference version: the checks below describe the article's
  // primary version rather than averaging across translations.
  const primaryOf = (row: ManageRow): LanguageInfo | undefined =>
    row.languages.en ?? Object.values(row.languages)[0];

  const stats = useMemo(() => {
    let missingImage = 0;
    let missingMeta = 0;
    let incomplete = 0;
    let duplicates = 0;
    let dataIssues = 0;
    let drafts = 0;
    let unreviewed = 0;
    let outOfDate = 0;
    for (const row of rows) {
      const primary = primaryOf(row);
      if (!primary?.hasImage) missingImage += 1;
      if (!primary?.hasMetaDescription) missingMeta += 1;
      if (Object.keys(row.languages).length < ALL_LANGUAGES.length) incomplete += 1;
      if (row.duplicates.length > 0) duplicates += 1;
      if (
        row.malformedSlugs.length > 0 ||
        row.missingLanguage > 0 ||
        row.ungrouped > 0
      ) {
        dataIssues += 1;
      }
      if (row.drafts > 0) drafts += 1;
      if (row.unreviewed > 0) unreviewed += 1;
      if (row.outOfDate > 0) outOfDate += 1;
    }
    return {
      missingImage,
      missingMeta,
      incomplete,
      duplicates,
      dataIssues,
      drafts,
      unreviewed,
      outOfDate,
    };
  }, [rows]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    let result = rows.filter((row) => {
      if (needle) {
        const haystack = `${row.title} ${row.slug} ${row.primaryKeyword}`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }
      if (languageFilter && !row.languages[languageFilter]) return false;

      const primary = primaryOf(row);
      switch (filter) {
        case "missingImage":
          return !primary?.hasImage;
        case "missingMeta":
          return !primary?.hasMetaDescription;
        case "incomplete":
          return Object.keys(row.languages).length < ALL_LANGUAGES.length;
        case "duplicates":
          return row.duplicates.length > 0;
        case "dataIssues":
          return (
            row.malformedSlugs.length > 0 ||
            row.missingLanguage > 0 ||
            row.ungrouped > 0
          );
        case "drafts":
          return row.drafts > 0;
        case "unreviewed":
          return row.unreviewed > 0;
        case "outOfDate":
          return row.outOfDate > 0;
        default:
          return true;
      }
    });

    result = [...result].sort((a, b) => {
      let comparison = 0;
      if (sortKey === "title") comparison = a.title.localeCompare(b.title);
      else if (sortKey === "languages")
        comparison = Object.keys(a.languages).length - Object.keys(b.languages).length;
      else comparison = (a.updatedAt || "").localeCompare(b.updatedAt || "");
      return sortAsc ? comparison : -comparison;
    });

    return result;
  }, [rows, query, filter, languageFilter, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  /**
   * Read every document from the admin endpoint.
   *
   * Not the public one: that hides drafts and soft-deleted articles, which are
   * exactly what this screen exists to show.
   */
  const reload = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const blogs = await blogApi.getAllAdmin("all");
      const live = blogs.filter((blog) => !blog.isDeleted);
      setRows(buildRows(live));
      setDocumentCount(live.length);
      setLoadError(null);
      // Keeps the public listing and sitemap in step with anything changed here.
      await refreshBlogs();
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Could not load the articles.",
      );
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    void reload();
  }, [isAdmin, reload]);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setIsDeleting(true);
    try {
      // A row is an article, not a document: six language versions sit behind
      // it and the table deliberately hides that. Deleting only the English
      // record left five translations live and unreachable from here, so the
      // whole group goes.
      const response = await blogApi.delete(pendingDelete.id, "group");
      if (response) {
        const removed = response?.data?.deleted ?? 0;
        toast.success(
          removed > 1
            ? `"${pendingDelete.title}" deleted, including ${removed - 1} translation${removed - 1 === 1 ? "" : "s"}.`
            : `"${pendingDelete.title}" deleted.`,
        );
        await reload();
      } else {
        toast.error("Could not delete the article. Try again.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not delete the article.",
      );
    } finally {
      setIsDeleting(false);
      setPendingDelete(null);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f6f3] px-6 pt-24">
        <div className={`text-center ${jost.className}`}>
          <p className="text-lg text-[#2d2d2d]">
            You need an admin account to manage articles.
          </p>
          <Link
            href="/blogs"
            className="mt-4 inline-block bg-[#c89e3a] px-6 py-2.5 text-white transition-colors hover:bg-[#9d7400]"
          >
            Back to articles
          </Link>
        </div>
      </div>
    );
  }

  const filterButton = (value: Filter, label: string, count?: number) => (
    <button
      type="button"
      onClick={() => setFilter(value)}
      className={`border px-3 py-1.5 text-sm transition-colors ${
        filter === value
          ? "border-[#c89e3a] bg-[#c89e3a] text-white"
          : "border-gray-300 text-gray-700 hover:bg-gray-50"
      } ${jost.className}`}
    >
      {label}
      {count !== undefined && (
        <span className={filter === value ? "ml-1.5 text-white/80" : "ml-1.5 text-gray-400"}>
          {count}
        </span>
      )}
    </button>
  );

  const sortHeader = (key: SortKey, label: string, className = "") => (
    <th className={`px-4 py-3 text-left font-semibold ${className}`}>
      <button
        type="button"
        onClick={() => toggleSort(key)}
        className="inline-flex items-center gap-1 hover:text-[#c89e3a]"
      >
        {label}
        <ArrowUpDown size={13} className={sortKey === key ? "text-[#c89e3a]" : "text-gray-400"} />
      </button>
    </th>
  );

  return (
    <div className="min-h-screen bg-[#f7f6f3] pt-16 lg:pt-[132px]">
      <div className="mx-auto max-w-[1600px] px-6 py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className={`text-3xl text-[#2d2d2d] ${marcellus.className}`}>
              Manage articles
            </h1>
            <p className={`mt-1 text-sm text-gray-600 ${jost.className}`}>
              {rows.length} articles across {documentCount} documents in{" "}
              {ALL_LANGUAGES.length} languages
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowDeleted((v) => !v)}
              className={`inline-flex items-center gap-2 border px-4 py-2.5 transition-colors ${
                showDeleted
                  ? "border-[#c89e3a] bg-[#c89e3a] text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              } ${jost.className}`}
            >
              <Archive size={16} />
              {showDeleted ? "Hide deleted" : "Deleted"}
            </button>
            <button
              type="button"
              onClick={() => void reload()}
              disabled={isRefreshing}
              className={`inline-flex items-center gap-2 border border-gray-300 px-4 py-2.5 text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 ${jost.className}`}
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
              {isRefreshing ? "Refreshing" : "Refresh"}
            </button>
            <Link
              href="/blogs"
              className={`inline-flex items-center gap-2 border border-gray-300 px-4 py-2.5 text-gray-700 transition-colors hover:bg-gray-50 ${jost.className}`}
            >
              <ExternalLink size={16} />
              View public page
            </Link>
            <Link
              href="/blogs/editor"
              className={`inline-flex items-center gap-2 bg-[#c89e3a] px-5 py-2.5 text-white transition-colors hover:bg-[#9d7400] ${jost.className}`}
            >
              <Plus size={18} />
              New article
            </Link>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[280px] flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, URL or keyword"
              className={`w-full border border-gray-300 bg-white py-2.5 pl-9 pr-9 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#c89e3a] ${jost.className}`}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value as BlogLanguage | "")}
            className={`border border-gray-300 bg-white px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#c89e3a] ${jost.className}`}
            aria-label="Filter by language"
          >
            <option value="">Any language</option>
            {BLOG_LANGUAGE_OPTIONS.map((option) => (
              <option key={option.code} value={option.code}>
                Has {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {filterButton("all", "All", rows.length)}
          {filterButton("missingImage", "No image", stats.missingImage)}
          {filterButton("missingMeta", "No meta description", stats.missingMeta)}
          {filterButton("incomplete", "Missing translations", stats.incomplete)}
          {stats.duplicates > 0 && filterButton("duplicates", "Duplicates", stats.duplicates)}
          {stats.dataIssues > 0 &&
            filterButton("dataIssues", "Data issues", stats.dataIssues)}
          {stats.drafts > 0 && filterButton("drafts", "Drafts", stats.drafts)}
          {stats.unreviewed > 0 &&
            filterButton("unreviewed", "Unreviewed", stats.unreviewed)}
          {stats.outOfDate > 0 &&
            filterButton("outOfDate", "Out of date", stats.outOfDate)}
        </div>

        {showDeleted && (
          <div className="mb-6">
            <h2 className={`mb-2 text-lg text-[#2d2d2d] ${marcellus.className}`}>
              Recycle bin
            </h2>
            <div className="overflow-x-auto">
              <DeletedBlogsPanel onRestored={() => void reload()} />
            </div>
          </div>
        )}

        <div className="overflow-x-auto bg-white shadow-sm">
          <table className={`w-full min-w-[1000px] text-sm ${jost.className}`}>
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-700">
              <tr>
                {sortHeader("title", "Article")}
                {sortHeader("languages", "Languages", "w-[260px]")}
                <th className="w-[80px] px-4 py-3 text-center font-semibold">Image</th>
                <th className="w-[80px] px-4 py-3 text-center font-semibold">Meta</th>
                <th className="w-[110px] px-4 py-3 text-left font-semibold">Reviewed</th>
                {sortHeader("updated", "Updated", "w-[110px]")}
                <th className="w-[110px] px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isRefreshing && rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                    <Loader2 size={18} className="mx-auto animate-spin" />
                  </td>
                </tr>
              )}

              {!isRefreshing && loadError && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <p className="text-red-600">{loadError}</p>
                    <button
                      type="button"
                      onClick={() => void reload()}
                      className="mt-3 border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      Try again
                    </button>
                  </td>
                </tr>
              )}

              {!isRefreshing && !loadError && visible.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                    {rows.length === 0
                      ? "No articles yet."
                      : "No articles match this search."}
                  </td>
                </tr>
              )}

              {visible.map((row) => {
                const primary = primaryOf(row);
                return (
                  <tr key={row.key} className="border-b border-gray-100 hover:bg-[#faf9f6]">
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#2d2d2d]">{row.title}</div>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                        <span className="truncate">/{row.slug}</span>
                        {row.malformedSlugs.length > 0 && (
                          <Link
                            href={`/blogs/editor?id=${encodeURIComponent(row.id)}`}
                            className="inline-flex items-center gap-1 border border-amber-300 bg-amber-50 px-1.5 py-0.5 text-amber-800 transition-colors hover:bg-amber-100"
                            title={`Stored as ${row.malformedSlugs
                              .map((s) => `"${s}"`)
                              .join(", ")}. The page still loads, but the stored slug has stray slashes. Open and save the article to clean it.`}
                          >
                            <AlertTriangle size={11} />
                            slug needs cleaning
                          </Link>
                        )}

                        {row.missingLanguage > 0 && (
                          <Link
                            href={`/blogs/editor?id=${encodeURIComponent(row.id)}`}
                            className="inline-flex items-center gap-1 border border-amber-300 bg-amber-50 px-1.5 py-0.5 text-amber-800 transition-colors hover:bg-amber-100"
                            title="No language is set, so the site treats this as English. If it is not English it will appear in the wrong listing and be served at an English URL. Open the article, pick its language and save."
                          >
                            <AlertTriangle size={11} />
                            {row.missingLanguage === 1
                              ? "no language set"
                              : `${row.missingLanguage} without language`}
                          </Link>
                        )}

                        {row.ungrouped > 0 && (
                          <span
                            className="inline-flex items-center gap-1 border border-gray-200 px-1.5 py-0.5 text-gray-500"
                            title="Not linked to a translation group. Harmless while the article has only one language; it is linked automatically when a translation is added."
                          >
                            ungrouped
                          </span>
                        )}

                        {row.duplicates.map((duplicate) => (
                          <button
                            key={duplicate.language}
                            type="button"
                            onClick={() =>
                              setResolving({
                                row,
                                language: duplicate.language,
                                ids: duplicate.ids,
                              })
                            }
                            className="inline-flex items-center gap-1 border border-amber-300 bg-amber-50 px-1.5 py-0.5 text-amber-800 transition-colors hover:bg-amber-100"
                            title={`${duplicate.ids.length} documents share the ${duplicate.language.toUpperCase()} URL. Click to resolve.`}
                          >
                            <AlertTriangle size={11} />
                            {duplicate.ids.length}x {duplicate.language.toUpperCase()} — resolve
                          </button>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {ALL_LANGUAGES.map((language) => {
                          const info = row.languages[language];
                          return info ? (
                            <Link
                              key={language}
                              href={`/blogs/editor?id=${encodeURIComponent(info.id)}`}
                              className={`border px-1.5 py-0.5 text-[11px] font-semibold uppercase transition-colors ${
                                info.isDraft
                                  ? "border-gray-400 bg-gray-100 text-gray-500 hover:bg-gray-400 hover:text-white"
                                  : info.stale
                                  ? "border-amber-400 bg-amber-50 text-amber-800 hover:bg-amber-400 hover:text-white"
                                  : info.health === "machine"
                                    ? "border-dashed border-[#c89e3a] text-[#9d7400] hover:bg-[#c89e3a] hover:text-white"
                                    : "border-[#c89e3a] bg-[#c89e3a]/10 text-[#9d7400] hover:bg-[#c89e3a] hover:text-white"
                              }`}
                              // The tooltip is what stops the colours being a
                              // private code only this file understands.
                              title={
                                info.isDraft
                                  ? `${language.toUpperCase()}: draft, not on the site`
                                  : describeLanguageState(
                                      { health: info.health, stale: info.stale },
                                      language,
                                    )
                              }
                            >
                              {language}
                            </Link>
                          ) : (
                            <span
                              key={language}
                              className="border border-gray-200 px-1.5 py-0.5 text-[11px] font-semibold uppercase text-gray-300"
                              title={`No ${language.toUpperCase()} version yet`}
                            >
                              {language}
                            </span>
                          );
                        })}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-center">
                      {primary?.hasImage ? (
                        <span className="text-green-600" title="Featured image set">✓</span>
                      ) : (
                        <span className="text-red-500" title="No featured image">✗</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {primary?.hasMetaDescription ? (
                        <span className="text-green-600" title="Meta description set">✓</span>
                      ) : (
                        <span className="text-red-500" title="No meta description">✗</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {formatDate(row.lastReviewedAt)}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(row.updatedAt)}</td>

                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/blogs/editor?id=${encodeURIComponent(row.id)}`}
                          className="p-2 text-[#c89e3a] transition-colors hover:bg-[#c89e3a] hover:text-white"
                          title="Edit article"
                        >
                          <Pencil size={15} />
                        </Link>
                        <Link
                          href={`/blogs/${row.slug}`}
                          target="_blank"
                          className="p-2 text-gray-500 transition-colors hover:bg-gray-200"
                          title="Open the live article"
                        >
                          <ExternalLink size={15} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setPendingDelete(row)}
                          className="p-2 text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                          title="Delete article"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className={`mt-4 text-sm text-gray-500 ${jost.className}`}>
          Showing {visible.length} of {rows.length} articles. A filled language badge
          links straight to that version in the editor.
        </p>
      </div>

      <DuplicateResolver
        open={resolving !== null}
        articleTitle={resolving?.row.title || ""}
        language={resolving?.language || "en"}
        ids={resolving?.ids || []}
        onResolved={async () => {
          await reload();
          setResolving(null);
        }}
        onCancel={() => setResolving(null)}
      />

      <ConfirmDialog
        open={pendingDelete !== null}
        tone="danger"
        title="Delete this article?"
        message={
          <>
            <span className="font-medium text-gray-800">{pendingDelete?.title}</span> will
            be removed from the site and the sitemap. Only the version shown in the
            Article column is deleted; other languages keep their own records.
          </>
        }
        confirmLabel={isDeleting ? "Deleting" : "Delete article"}
        cancelLabel="Keep it"
        busy={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
