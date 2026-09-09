"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Image as ImageIcon, Link as LinkIcon, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { marcellus, jost } from "@/lib/fonts";
import RichTextEditor from "@/components/shared/RichTextEditor";
import { blogApi } from "@/lib/api";
import {
  BLOG_LANGUAGE_OPTIONS,
  buildLocalizedBlogSlug,
  getBlogBaseSlug,
  getBlogLanguageFromSlug,
  isBlogLanguage,
  type BlogLanguage,
} from "@/lib/blogLanguages";
import { generateSlug } from "@/utils/helpers/slugUtils";

export type BlogFormValues = {
  title: string;
  h2Subtitle: string;
  customSlug: string;
  language: BlogLanguage;
  /** Links this article's language versions; empty until the first save. */
  translationGroupId: string;
  featuredImage: string;
  featuredImageAlt: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  metaRobots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  breadcrumbTitle: string;
  /** yyyy-mm-dd, as produced by a date input. Empty means unset. */
  lastReviewedAt: string;
  datePublished: string;
  primaryKeyword: string;
  /** Comma-separated while editing; split into an array on save. */
  secondaryKeywords: string;
};

export const EMPTY_BLOG_FORM: BlogFormValues = {
  title: "",
  h2Subtitle: "",
  customSlug: "",
  language: "en",
  translationGroupId: "",
  featuredImage: "",
  featuredImageAlt: "",
  content: "",
  excerpt: "",
  metaTitle: "",
  metaDescription: "",
  canonicalUrl: "",
  metaRobots: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  breadcrumbTitle: "",
  lastReviewedAt: "",
  datePublished: "",
  primaryKeyword: "",
  secondaryKeywords: "",
};

export type BlogFormSubmitResult = {
  blogId?: string | null;
  /** Returned by the API on save; later languages join this group. */
  translationGroupId?: string | null;
};

type Props = {
  mode: "add" | "edit";
  initialValues: BlogFormValues;
  /** Mongo id of the language version currently loaded (null when writing a new translation). */
  initialBlogId?: string | null;
  /** Called after a successful save when the editor should leave the page. */
  onExit: () => void;
  /**
   * Save the active language version.
   * - If blogId is set → update that document
   * - If blogId is null → create a new language version
   * Keep the modal open after success; return the saved blog id when available.
   */
  onSubmit: (
    values: BlogFormValues,
    meta: { blogId: string | null },
  ) => Promise<BlogFormSubmitResult | void>;
};

function blogToFormValues(source: {
  title?: string;
  h2Subtitle?: string;
  customSlug?: string;
  language?: string;
  translationGroupId?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  content?: string;
  description?: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  metaRobots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  breadcrumbTitle?: string;
  lastReviewedAt?: string;
  datePublished?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
}): BlogFormValues {
  const language = isBlogLanguage(source.language)
    ? source.language
    : getBlogLanguageFromSlug(source.customSlug, "en");

  const baseSlug = getBlogBaseSlug(source.customSlug);

  return {
    title: source.title || "",
    h2Subtitle: source.h2Subtitle || "",
    customSlug: buildLocalizedBlogSlug(language, baseSlug),
    language,
    translationGroupId: source.translationGroupId || "",
    featuredImage: source.featuredImage || "",
    featuredImageAlt: source.featuredImageAlt || "",
    content: source.content || source.description || "",
    excerpt: source.excerpt || "",
    metaTitle: source.metaTitle || "",
    metaDescription: source.metaDescription || "",
    canonicalUrl: source.canonicalUrl || "",
    metaRobots: source.metaRobots || "",
    ogTitle: source.ogTitle || "",
    ogDescription: source.ogDescription || "",
    ogImage: source.ogImage || "",
    breadcrumbTitle: source.breadcrumbTitle || "",
    lastReviewedAt: toDateInputValue(source.lastReviewedAt),
    datePublished: toDateInputValue(source.datePublished),
    primaryKeyword: source.primaryKeyword || "",
    secondaryKeywords: (source.secondaryKeywords || []).join(", "),
  };
}

/** ISO timestamp -> yyyy-mm-dd for a date input; empty when unset or invalid. */
function toDateInputValue(value?: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function resolveBaseSlug(customSlug: string, title: string): string {
  return getBlogBaseSlug(customSlug) || generateSlug(title) || "";
}

function blankLanguageDraft(
  language: BlogLanguage,
  baseSlug: string,
  featuredImage: string,
  translationGroupId: string,
): BlogFormValues {
  return {
    title: "",
    h2Subtitle: "",
    customSlug: buildLocalizedBlogSlug(language, baseSlug),
    language,
    translationGroupId,
    featuredImage,
    // Alt text is prose, so it does not carry across languages the way the
    // image URL does. Each translation writes its own.
    featuredImageAlt: "",
    content: "",
    excerpt: "",
    metaTitle: "",
    metaDescription: "",
    // Canonical, dates and keywords describe the article rather than the
    // wording, so a new translation starts from the same values.
    canonicalUrl: "",
    metaRobots: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    breadcrumbTitle: "",
    lastReviewedAt: "",
    datePublished: "",
    primaryKeyword: "",
    secondaryKeywords: "",
  };
}

export default function BlogEditorForm({
  mode,
  initialValues,
  initialBlogId = null,
  onExit,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<BlogFormValues>(initialValues);
  const [activeBlogId, setActiveBlogId] = useState<string | null>(initialBlogId);
  const [drafts, setDrafts] = useState<Partial<Record<BlogLanguage, BlogFormValues>>>({
    [initialValues.language]: initialValues,
  });
  const [draftIds, setDraftIds] = useState<Partial<Record<BlogLanguage, string | null>>>({
    [initialValues.language]: initialBlogId,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSwitchingLanguage, setIsSwitchingLanguage] = useState(false);
  const [imageInputType, setImageInputType] = useState<"url" | "gallery">("url");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [languageHint, setLanguageHint] = useState<string | null>(null);

  // The site header is fixed, so this page has to reserve room for it. Its
  // height differs by breakpoint (a single bar on mobile; nav + rule + tagline
  // on desktop) and would drift if hard-coded, so it is measured instead. The
  // Tailwind classes below stay as the first-paint fallback until this runs.
  const actionBarRef = useRef<HTMLElement | null>(null);
  const [siteHeaderHeight, setSiteHeaderHeight] = useState<number | null>(null);
  const [actionBarHeight, setActionBarHeight] = useState<number>(0);

  useEffect(() => {
    const measure = () => {
      // The page's own action bar is sticky, not fixed, so filtering on
      // position:fixed picks out the site header without matching it.
      const fixedHeader = Array.from(document.querySelectorAll("header")).find(
        (el) => {
          const style = window.getComputedStyle(el);
          return (
            style.position === "fixed" &&
            style.display !== "none" &&
            el.getBoundingClientRect().height > 0
          );
        },
      );
      setSiteHeaderHeight(fixedHeader ? fixedHeader.getBoundingClientRect().height : 0);
      setActionBarHeight(actionBarRef.current?.getBoundingClientRect().height ?? 0);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const stickyBelowHeader =
    siteHeaderHeight === null ? undefined : { top: `${siteHeaderHeight}px` };
  // The sidebar sticks below both bars. Capping its height and letting it
  // scroll on its own keeps it from driving the page height: with the
  // metadata sections expanded it grew taller than the article column, which
  // left a long blank gap on the left when scrolling.
  const sidebarOffset =
    siteHeaderHeight === null ? null : siteHeaderHeight + actionBarHeight;
  const stickyBelowBars =
    sidebarOffset === null
      ? undefined
      : {
          top: `${sidebarOffset}px`,
          maxHeight: `calc(100vh - ${sidebarOffset + 24}px)`,
        };

  /**
   * Upload the chosen file and store the returned URL.
   *
   * This previously base64-encoded the file into the document with
   * FileReader.readAsDataURL. A data URI cannot serve as an og:image and it
   * bloated every blog record, which is why no article had a usable featured
   * image. The file now goes to the public asset bucket and only its URL is
   * kept on the document.
   */
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) return;

    setImageUploadError(null);

    if (!file.type.startsWith("image/")) {
      setImageUploadError("Please select an image file.");
      input.value = "";
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setImageUploadError("Image must be smaller than 10MB.");
      input.value = "";
      return;
    }

    setIsUploadingImage(true);
    try {
      const url = await blogApi.uploadImage(file);
      setForm((prev) => ({ ...prev, featuredImage: url }));
      setImageInputType("url");
    } catch (error) {
      setImageUploadError(
        error instanceof Error ? error.message : "Failed to upload image.",
      );
    } finally {
      setIsUploadingImage(false);
      // Allow re-selecting the same file after a failure.
      input.value = "";
    }
  };

  const handleLanguageChange = async (
    nextLanguage: BlogLanguage,
    event?: React.SyntheticEvent,
  ) => {
    event?.stopPropagation();

    if (nextLanguage === form.language || isSwitchingLanguage || isSubmitting) {
      return;
    }

    // Cache the current language draft so switching back restores unsaved work.
    const currentDraft = { ...form };
    const nextDrafts = { ...drafts, [form.language]: currentDraft };
    const nextDraftIds = { ...draftIds, [form.language]: activeBlogId };
    setDrafts(nextDrafts);
    setDraftIds(nextDraftIds);

    const sharedBaseSlug = resolveBaseSlug(form.customSlug, form.title);
    // The group is what ties the language versions together once the article
    // has been saved once — it survives a translation using its own slug.
    const groupId = form.translationGroupId;

    // Prefer in-memory draft for this language (already loaded / typed this session).
    const cached = nextDrafts[nextLanguage];
    if (cached) {
      const withLocalizedSlug = {
        ...cached,
        language: nextLanguage,
        translationGroupId: cached.translationGroupId || groupId,
        customSlug: buildLocalizedBlogSlug(
          nextLanguage,
          resolveBaseSlug(cached.customSlug, cached.title) || sharedBaseSlug,
        ),
      };
      setForm(withLocalizedSlug);
      setActiveBlogId(nextDraftIds[nextLanguage] ?? null);
      setLanguageHint(
        nextDraftIds[nextLanguage]
          ? `Editing existing ${nextLanguage.toUpperCase()} version.`
          : `Writing new ${nextLanguage.toUpperCase()} content for this article.`,
      );
      return;
    }

    // Load existing translation from API when we can identify the article.
    if (sharedBaseSlug || groupId) {
      try {
        setIsSwitchingLanguage(true);
        const response = await blogApi.getByBaseSlugAndLanguage(
          sharedBaseSlug,
          nextLanguage,
          groupId,
        );
        if (response?.data) {
          const loaded = blogToFormValues(response.data);
          const loadedId = response.data._id;
          setForm(loaded);
          setActiveBlogId(loadedId);
          setDrafts((prev) => ({ ...prev, [nextLanguage]: loaded }));
          setDraftIds((prev) => ({ ...prev, [nextLanguage]: loadedId }));
          setLanguageHint(
            `Loaded existing ${nextLanguage.toUpperCase()} version. You can edit and save.`,
          );
          return;
        }
      } catch (error) {
        console.error("Error loading language version:", error);
      } finally {
        setIsSwitchingLanguage(false);
      }
    }

    // No translation yet — keep slug/image/group, clear text for fresh content.
    const blank = blankLanguageDraft(
      nextLanguage,
      sharedBaseSlug,
      form.featuredImage,
      groupId,
    );
    setForm(blank);
    setActiveBlogId(null);
    setDrafts((prev) => ({ ...prev, [nextLanguage]: blank }));
    setDraftIds((prev) => ({ ...prev, [nextLanguage]: null }));
    setLanguageHint(
      `No ${nextLanguage.toUpperCase()} version yet. Enter fresh content and save to publish it.`,
    );
  };

  const normalizeSlugForLanguage = (
    language: BlogLanguage,
    slugValue: string,
    title = "",
  ) => buildLocalizedBlogSlug(language, resolveBaseSlug(slugValue, title));

  const handleSlugBlur = () => {
    setForm((prev) => ({
      ...prev,
      customSlug: normalizeSlugForLanguage(prev.language, prev.customSlug, prev.title),
    }));
  };

  const handleTitleChange = (title: string) => {
    setForm((prev) => {
      const previousBase = getBlogBaseSlug(prev.customSlug);
      const previousAuto = generateSlug(prev.title);
      const shouldSyncSlug =
        !previousBase || previousBase === previousAuto || previousBase === "/";

      return {
        ...prev,
        title,
        customSlug: shouldSyncSlug
          ? buildLocalizedBlogSlug(prev.language, generateSlug(title))
          : buildLocalizedBlogSlug(prev.language, previousBase),
      };
    });
  };

  const handleSubmit = async (event?: React.MouseEvent) => {
    event?.preventDefault();
    event?.stopPropagation();

    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Add a blog title and some content before saving.");
      return;
    }
    if (!form.language) {
      toast.error("Choose a language for this version.");
      return;
    }
    try {
      setIsSubmitting(true);
      const wasUpdate = Boolean(activeBlogId);
      const normalizedForm: BlogFormValues = {
        ...form,
        customSlug: normalizeSlugForLanguage(form.language, form.customSlug, form.title),
      };
      setForm(normalizedForm);
      const result = await onSubmit(normalizedForm, { blogId: activeBlogId });
      const savedId = result?.blogId ?? activeBlogId;
      if (savedId) {
        setActiveBlogId(savedId);
        setDraftIds((prev) => ({ ...prev, [normalizedForm.language]: savedId }));
      }

      // Carry the group id forward so the next language joins this article
      // instead of starting a new one.
      const resolvedGroupId =
        result?.translationGroupId || normalizedForm.translationGroupId;

      const savedForm: BlogFormValues = {
        ...normalizedForm,
        translationGroupId: resolvedGroupId,
      };
      setForm(savedForm);

      // Propagate the resolved translationGroupId into ALL in-memory drafts so
      // every subsequent language switch (including switching back to a draft
      // typed earlier this session) carries the correct group id and never
      // creates an orphaned document.
      setDrafts((prev) => {
        const updated: Partial<Record<BlogLanguage, BlogFormValues>> = {};
        for (const [lang, draft] of Object.entries(prev) as [BlogLanguage, BlogFormValues][]) {
          updated[lang] = { ...draft, translationGroupId: resolvedGroupId };
        }
        updated[savedForm.language] = savedForm;
        return updated;
      });
      setLanguageHint(
        wasUpdate
          ? `${normalizedForm.language.toUpperCase()} version updated. Switch language to edit another version.`
          : `${normalizedForm.language.toUpperCase()} version created. Switch language to add another version.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBusy = isSubmitting || isSwitchingLanguage;
  const inputClass = `w-full px-4 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#c89e3a] bg-white text-gray-900 ${jost.className}`;
  const labelClass = `block text-sm font-semibold text-gray-700 mb-2 ${jost.className}`;
  const saveLabel = activeBlogId
    ? mode === "add"
      ? "Save article"
      : "Save changes"
    : "Create this language";

  const metaTitleCount = form.metaTitle.length;
  const metaDescriptionCount = form.metaDescription.length;

  return (
    <div
      className="min-h-screen bg-[#f7f6f3] pt-16 lg:pt-[132px]"
      style={
        siteHeaderHeight === null ? undefined : { paddingTop: `${siteHeaderHeight}px` }
      }
    >
      {/* Action bar. Sticky because the article body is long and Save must stay
          reachable without scrolling back to the top. It parks directly beneath
          the site header rather than at the viewport top, and sits below it in
          the stacking order. */}
      <header
        ref={actionBarRef}
        className="sticky top-16 lg:top-[132px] z-30 border-b border-gray-200 bg-white"
        style={stickyBelowHeader}
      >
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-4 px-6 py-3">
          <button
            type="button"
            onClick={onExit}
            disabled={isBusy}
            className={`inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#c89e3a] transition-colors disabled:opacity-50 ${jost.className}`}
          >
            <ArrowLeft size={18} />
            Articles
          </button>

          <div className="h-6 w-px bg-gray-200" aria-hidden="true" />

          <h1 className={`text-xl text-[#2d2d2d] ${marcellus.className}`}>
            {mode === "add" ? "New article" : "Edit article"}
          </h1>

          <div className="ml-auto flex items-center gap-3">
            {isSwitchingLanguage && (
              <span
                className={`inline-flex items-center gap-1.5 text-xs text-gray-500 ${jost.className}`}
              >
                <Loader2 className="h-3 w-3 animate-spin" />
                Loading language version
              </span>
            )}
            <button
              type="button"
              onClick={onExit}
              disabled={isBusy}
              className={`border border-gray-300 px-5 py-2.5 text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 ${jost.className}`}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={isBusy}
              className={`inline-flex items-center gap-2 bg-[#c89e3a] px-6 py-2.5 text-white transition-colors hover:bg-[#9d7400] disabled:cursor-not-allowed disabled:opacity-50 ${jost.className}`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving
                </>
              ) : (
                saveLabel
              )}
            </button>
          </div>
        </div>

        {/* Language is the primary axis of this screen: each one is a separate
            document, so it reads as tabs rather than a buried radio group. */}
        <div className="mx-auto max-w-[1600px] px-6">
          <div
            className="-mb-px flex flex-wrap gap-1"
            role="tablist"
            aria-label="Article language"
          >
            {BLOG_LANGUAGE_OPTIONS.map((option) => {
              const isActive = form.language === option.code;
              return (
                <button
                  key={option.code}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  disabled={isBusy}
                  onClick={(e) => void handleLanguageChange(option.code, e)}
                  className={`border-b-2 px-4 py-2.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                    isActive
                      ? "border-[#c89e3a] text-[#9d7400] font-semibold"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  } ${jost.className}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {languageHint && (
        <div className="border-b border-amber-200 bg-amber-50">
          <p
            className={`mx-auto max-w-[1600px] px-6 py-2 text-xs text-[#9d7400] ${jost.className}`}
          >
            {languageHint}
          </p>
        </div>
      )}

      <div className="mx-auto max-w-[1600px] px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* Main column: what the reader will actually see. */}
          <main className="min-w-0 space-y-6">
            <section className="bg-white p-6 shadow-sm">
              <div className="space-y-5">
                <div>
                  <label className={labelClass} htmlFor="blog-title">
                    Blog title (H1) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="blog-title"
                    type="text"
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className={`${inputClass} text-lg`}
                    placeholder="Enter blog title"
                    disabled={isBusy}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="blog-subtitle">
                    Blog subtitle (H2)
                  </label>
                  <input
                    id="blog-subtitle"
                    type="text"
                    value={form.h2Subtitle}
                    onChange={(e) => setForm({ ...form, h2Subtitle: e.target.value })}
                    className={inputClass}
                    placeholder="Enter blog subtitle (optional)"
                    disabled={isBusy}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="blog-slug">
                    URL slug
                  </label>
                  <input
                    id="blog-slug"
                    type="text"
                    value={form.customSlug}
                    onChange={(e) => setForm({ ...form, customSlug: e.target.value })}
                    onBlur={handleSlugBlur}
                    className={inputClass}
                    placeholder={
                      form.language === "en" ? "blog-name" : `${form.language}/blog-name`
                    }
                    disabled={isBusy}
                  />
                  <p className={`mt-1 text-xs text-gray-500 ${jost.className}`}>
                    English lives at <span className="font-medium text-gray-700">/blog-name</span>.
                    Other languages are prefixed, for example{" "}
                    <span className="font-medium text-gray-700">/nl/blog-name</span>.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 shadow-sm">
              <label className={labelClass}>
                Article content <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                value={form.content}
                onChange={(value) => setForm({ ...form, content: value })}
                placeholder="Start writing your blog content..."
                disabled={isBusy}
                heightClass="min-h-[32rem]"
                toolbarTop={
                  siteHeaderHeight === null
                    ? undefined
                    : siteHeaderHeight + actionBarHeight
                }
              />
              <p className={`mt-2 text-xs text-gray-500 ${jost.className}`}>
                Headings start at H2. The blog title above is the page&rsquo;s only H1.
              </p>
            </section>
          </main>

          {/* Sidebar: everything that describes the article rather than being it.
              Sticks below the site header (80px) plus the action bar (~104px). */}
          <aside
            className="space-y-6 lg:sticky lg:top-[15rem] lg:self-start lg:max-h-[calc(100vh-15rem)] lg:overflow-y-auto lg:pr-1"
            style={stickyBelowBars}
          >
            <section className="bg-white p-6 shadow-sm">
              <h2 className={`mb-4 text-lg text-[#2d2d2d] ${marcellus.className}`}>
                Featured image
              </h2>

              <div className="mb-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setImageInputType("url")}
                  className={`inline-flex items-center px-3 py-2 text-sm border transition-colors ${
                    imageInputType === "url"
                      ? "border-[#c89e3a] bg-[#c89e3a] text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  } ${jost.className}`}
                  disabled={isBusy}
                >
                  <LinkIcon size={15} className="mr-1.5" />
                  Use a URL
                </button>
                <label
                  className={`inline-flex cursor-pointer items-center px-3 py-2 text-sm border transition-colors ${
                    imageInputType === "gallery"
                      ? "border-[#c89e3a] bg-[#c89e3a] text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  } ${jost.className} ${
                    isBusy || isUploadingImage ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  {isUploadingImage ? (
                    <Loader2 size={15} className="mr-1.5 animate-spin" />
                  ) : (
                    <ImageIcon size={15} className="mr-1.5" />
                  )}
                  {isUploadingImage ? "Uploading" : "Upload"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isBusy || isUploadingImage}
                  />
                </label>
              </div>

              {imageInputType === "url" && (
                <input
                  type="text"
                  value={form.featuredImage}
                  onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
                  className={inputClass}
                  placeholder="https://example.com/image.jpg"
                  disabled={isBusy}
                />
              )}

              {imageUploadError && (
                <p className={`mt-2 text-sm text-red-600 ${jost.className}`}>
                  {imageUploadError}
                </p>
              )}

              {form.featuredImage && (
                <div className="mt-3 border border-gray-200 p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.featuredImage}
                    alt={form.featuredImageAlt || "Featured image preview"}
                    className="max-h-48 w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}

              <div className="mt-4">
                <label className={labelClass} htmlFor="featured-alt">
                  Alt text
                </label>
                <input
                  id="featured-alt"
                  type="text"
                  value={form.featuredImageAlt}
                  onChange={(e) =>
                    setForm({ ...form, featuredImageAlt: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Natural diamond and moissanite shown side by side"
                  disabled={isBusy}
                />
                <p className={`mt-1 text-xs text-gray-500 ${jost.className}`}>
                  Describe what the image shows, not a list of keywords.
                </p>
              </div>
            </section>

            <section className="bg-white p-6 shadow-sm">
              <h2 className={`mb-4 text-lg text-[#2d2d2d] ${marcellus.className}`}>
                Search appearance
              </h2>

              <div className="space-y-5">
                <div>
                  <label className={labelClass} htmlFor="meta-title">
                    Meta title
                  </label>
                  <input
                    id="meta-title"
                    type="text"
                    value={form.metaTitle}
                    onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                    className={inputClass}
                    placeholder="SEO meta title"
                    disabled={isBusy}
                  />
                  <p
                    className={`mt-1 text-xs ${
                      metaTitleCount > 60 ? "text-red-600" : "text-gray-500"
                    } ${jost.className}`}
                  >
                    {metaTitleCount} characters. Aim for 50 to 60.
                  </p>
                </div>

                <div>
                  <label className={labelClass} htmlFor="meta-description">
                    Meta description
                  </label>
                  <textarea
                    id="meta-description"
                    value={form.metaDescription}
                    onChange={(e) =>
                      setForm({ ...form, metaDescription: e.target.value })
                    }
                    className={`${inputClass} min-h-28`}
                    placeholder="SEO meta description"
                    disabled={isBusy}
                  />
                  <p
                    className={`mt-1 text-xs ${
                      metaDescriptionCount > 160 ? "text-red-600" : "text-gray-500"
                    } ${jost.className}`}
                  >
                    {metaDescriptionCount} characters. Aim for 150 to 160.
                  </p>
                </div>

                <div>
                  <label className={labelClass} htmlFor="excerpt">
                    Excerpt
                  </label>
                  <textarea
                    id="excerpt"
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    className={`${inputClass} min-h-24`}
                    placeholder="Short summary shown on article cards"
                    disabled={isBusy}
                  />
                  <p className={`mt-1 text-xs text-gray-500 ${jost.className}`}>
                    Shown on listing cards, and used as the meta description when
                    that field is empty.
                  </p>
                </div>
              </div>
            </section>

            <details className="bg-white shadow-sm">
              <summary
                className={`cursor-pointer p-6 text-lg text-[#2d2d2d] ${marcellus.className}`}
              >
                Social sharing
              </summary>
              <div className="space-y-5 border-t border-gray-100 p-6">
                <p className={`text-xs text-gray-500 ${jost.className}`}>
                  Leave these empty to reuse the meta title, meta description and
                  featured image. Without an image the share card falls back to the
                  small format rather than showing an empty banner.
                </p>

                <div>
                  <label className={labelClass} htmlFor="og-title">
                    Social title
                  </label>
                  <input
                    id="og-title"
                    type="text"
                    value={form.ogTitle}
                    onChange={(e) => setForm({ ...form, ogTitle: e.target.value })}
                    className={inputClass}
                    placeholder="Defaults to the meta title"
                    disabled={isBusy}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="og-description">
                    Social description
                  </label>
                  <textarea
                    id="og-description"
                    value={form.ogDescription}
                    onChange={(e) =>
                      setForm({ ...form, ogDescription: e.target.value })
                    }
                    className={`${inputClass} min-h-24`}
                    placeholder="Defaults to the meta description"
                    disabled={isBusy}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="og-image">
                    Social image URL
                  </label>
                  <input
                    id="og-image"
                    type="text"
                    value={form.ogImage}
                    onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
                    className={inputClass}
                    placeholder="Defaults to the featured image"
                    disabled={isBusy}
                  />
                  <p className={`mt-1 text-xs text-gray-500 ${jost.className}`}>
                    Set this only when the share card needs a different crop.
                    1200 x 630 pixels works best.
                  </p>
                </div>
              </div>
            </details>

            <details className="bg-white shadow-sm">
              <summary
                className={`cursor-pointer p-6 text-lg text-[#2d2d2d] ${marcellus.className}`}
              >
                Indexing and dates
              </summary>
              <div className="space-y-5 border-t border-gray-100 p-6">
                <div>
                  <label className={labelClass} htmlFor="canonical-url">
                    Canonical URL
                  </label>
                  <input
                    id="canonical-url"
                    type="text"
                    value={form.canonicalUrl}
                    onChange={(e) =>
                      setForm({ ...form, canonicalUrl: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Defaults to this article's own URL"
                    disabled={isBusy}
                  />
                  <p className={`mt-1 text-xs text-gray-500 ${jost.className}`}>
                    Point this at another page only when this article duplicates it.
                  </p>
                </div>

                <div>
                  <label className={labelClass} htmlFor="meta-robots">
                    Robots directive
                  </label>
                  <input
                    id="meta-robots"
                    type="text"
                    value={form.metaRobots}
                    onChange={(e) => setForm({ ...form, metaRobots: e.target.value })}
                    className={inputClass}
                    placeholder="index, follow, max-image-preview:large"
                    disabled={isBusy}
                  />
                  <p className={`mt-1 text-xs text-gray-500 ${jost.className}`}>
                    Empty uses the site default shown above.
                  </p>
                </div>

                <div>
                  <label className={labelClass} htmlFor="breadcrumb-title">
                    Breadcrumb label
                  </label>
                  <input
                    id="breadcrumb-title"
                    type="text"
                    value={form.breadcrumbTitle}
                    onChange={(e) =>
                      setForm({ ...form, breadcrumbTitle: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Defaults to the article title"
                    disabled={isBusy}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="date-published">
                      Published
                    </label>
                    <input
                      id="date-published"
                      type="date"
                      value={form.datePublished}
                      onChange={(e) =>
                        setForm({ ...form, datePublished: e.target.value })
                      }
                      className={inputClass}
                      disabled={isBusy}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="last-reviewed">
                      Last reviewed
                    </label>
                    <input
                      id="last-reviewed"
                      type="date"
                      value={form.lastReviewedAt}
                      onChange={(e) =>
                        setForm({ ...form, lastReviewedAt: e.target.value })
                      }
                      className={inputClass}
                      disabled={isBusy}
                    />
                  </div>
                </div>
                <p className={`text-xs text-gray-500 ${jost.className}`}>
                  The review date is shown on the article. Set it whenever the
                  facts are rechecked.
                </p>
              </div>
            </details>

            <details className="bg-white shadow-sm">
              <summary
                className={`cursor-pointer p-6 text-lg text-[#2d2d2d] ${marcellus.className}`}
              >
                Target keywords
              </summary>
              <div className="space-y-5 border-t border-gray-100 p-6">
                <p className={`text-xs text-gray-500 ${jost.className}`}>
                  Recorded so two articles do not end up competing for the same
                  search. Not published on the page.
                </p>
                <div>
                  <label className={labelClass} htmlFor="primary-keyword">
                    Primary keyword
                  </label>
                  <input
                    id="primary-keyword"
                    type="text"
                    value={form.primaryKeyword}
                    onChange={(e) =>
                      setForm({ ...form, primaryKeyword: e.target.value })
                    }
                    className={inputClass}
                    placeholder="best diamond clarity for engagement ring"
                    disabled={isBusy}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="secondary-keywords">
                    Secondary keywords
                  </label>
                  <textarea
                    id="secondary-keywords"
                    value={form.secondaryKeywords}
                    onChange={(e) =>
                      setForm({ ...form, secondaryKeywords: e.target.value })
                    }
                    className={`${inputClass} min-h-20`}
                    placeholder="Separate with commas"
                    disabled={isBusy}
                  />
                </div>
              </div>
            </details>
          </aside>
        </div>
      </div>
    </div>
  );
}
