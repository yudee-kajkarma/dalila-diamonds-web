"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
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
  content: string;
  metaTitle: string;
  metaDescription: string;
};

export const EMPTY_BLOG_FORM: BlogFormValues = {
  title: "",
  h2Subtitle: "",
  customSlug: "",
  language: "en",
  translationGroupId: "",
  featuredImage: "",
  content: "",
  metaTitle: "",
  metaDescription: "",
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
  onClose: () => void;
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
  content?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
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
    content: source.content || source.description || "",
    metaTitle: source.metaTitle || "",
    metaDescription: source.metaDescription || "",
  };
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
    content: "",
    metaTitle: "",
    metaDescription: "",
  };
}

export default function BlogFormModal({
  mode,
  initialValues,
  initialBlogId = null,
  onClose,
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
  const [languageHint, setLanguageHint] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stopCardNavigation = (event: React.SyntheticEvent) => {
    // Only stop bubbling — do not preventDefault here or inputs/radios lose focus/selection.
    event.stopPropagation();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, featuredImage: reader.result as string }));
      setImageInputType("url");
    };
    reader.readAsDataURL(file);
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
      alert("Please fill in Blog Title and Content");
      return;
    }
    if (!form.language) {
      alert("Please select a language");
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
      ? "Save Blog"
      : "Update This Language"
    : "Create This Language";

  // Render outside the blog card <Link> so radio/button clicks cannot navigate away.
  const modal = (
    <div
      className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={stopCardNavigation}
      onMouseDown={stopCardNavigation}
      onPointerDown={stopCardNavigation}
    >
      <div
        className="bg-white rounded-none max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={stopCardNavigation}
        onMouseDown={stopCardNavigation}
        onPointerDown={stopCardNavigation}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className={`text-2xl font-semibold text-[#2d2d2d] ${marcellus.className}`}>
            {mode === "add" ? "Add New Article" : "Edit Blog"}
          </h2>
          <button
            type="button"
            onClick={(e) => {
              stopCardNavigation(e);
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isBusy}
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className={labelClass}>
              Language <span className="text-red-500">*</span>
            </label>
            <div
              className={`flex flex-wrap gap-x-6 gap-y-2 ${jost.className}`}
              role="radiogroup"
              aria-label="Blog language"
              onClick={stopCardNavigation}
              onMouseDown={stopCardNavigation}
            >
              {BLOG_LANGUAGE_OPTIONS.map((option) => (
                <label
                  key={option.code}
                  className={`inline-flex items-center gap-2 text-sm text-gray-800 ${
                    isBusy ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                  onClick={stopCardNavigation}
                  onMouseDown={stopCardNavigation}
                >
                  <input
                    type="radio"
                    name="blog-language"
                    value={option.code}
                    checked={form.language === option.code}
                    onChange={(e) => {
                      stopCardNavigation(e);
                      void handleLanguageChange(option.code, e);
                    }}
                    onClick={stopCardNavigation}
                    disabled={isBusy}
                    className="accent-[#c89e3a]"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            <p className={`text-xs text-gray-500 mt-1 ${jost.className}`}>
              Switching language stays in this form. Each language is its own version of this
              article — enter fresh content and save.
            </p>
            {languageHint && (
              <p className={`text-xs text-[#9d7400] mt-1 font-medium ${jost.className}`}>
                {languageHint}
              </p>
            )}
            {isSwitchingLanguage && (
              <p
                className={`text-xs text-gray-500 mt-1 inline-flex items-center gap-1 ${jost.className}`}
              >
                <Loader2 className="w-3 h-3 animate-spin" />
                Loading language version…
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Blog Title (H1) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className={inputClass}
              placeholder="Enter blog title"
              disabled={isBusy}
            />
          </div>

          <div>
            <label className={labelClass}>Blog Subtitle (H2)</label>
            <input
              type="text"
              value={form.h2Subtitle}
              onChange={(e) => setForm({ ...form, h2Subtitle: e.target.value })}
              className={inputClass}
              placeholder="Enter blog subtitle (optional)"
              disabled={isBusy}
            />
          </div>

          <div>
            <label className={labelClass}>CustomSlug</label>
            <input
              type="text"
              value={form.customSlug}
              onChange={(e) => setForm({ ...form, customSlug: e.target.value })}
              onBlur={handleSlugBlur}
              className={inputClass}
              placeholder={
                form.language === "en"
                  ? "/my-blog-name"
                  : `/${form.language}/my-blog-name`
              }
              disabled={isBusy}
            />
            <p className={`text-xs text-gray-500 mt-1 ${jost.className}`}>
              Choosing a language auto-fills this slug. English →{" "}
              <span className="font-medium text-gray-700">/blog-name</span>
              {" · "}
              Español → <span className="font-medium text-gray-700">/es/blog-name</span>
              {" · "}
              Italiano → <span className="font-medium text-gray-700">/it/blog-name</span>
            </p>
          </div>

          <div>
            <label className={labelClass}>Featured Image</label>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => setImageInputType("url")}
                className={`px-4 py-2 rounded-none border transition-colors ${
                  imageInputType === "url"
                    ? "bg-[#c89e3a] text-white border-[#c89e3a]"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                } ${jost.className}`}
                disabled={isBusy}
              >
                <LinkIcon size={16} className="inline mr-2" />
                Add URL
              </button>
              <label
                className={`px-4 py-2 rounded-none border transition-colors cursor-pointer inline-flex items-center ${
                  imageInputType === "gallery"
                    ? "bg-[#c89e3a] text-white border-[#c89e3a]"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                } ${jost.className} ${isBusy ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <ImageIcon size={16} className="inline mr-2" />
                Select from Device
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isBusy}
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
            {form.featuredImage && (
              <div className="mt-2 border border-gray-300 rounded p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.featuredImage}
                  alt="Preview"
                  className="max-h-40 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Paragraph Content <span className="text-red-500">*</span>
            </label>
            <RichTextEditor
              value={form.content}
              onChange={(value) => setForm({ ...form, content: value })}
              placeholder="Start writing your blog content..."
              disabled={isBusy}
            />
          </div>

          <div>
            <label className={labelClass}>Meta Title (Optional)</label>
            <input
              type="text"
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              className={inputClass}
              placeholder="SEO meta title"
              disabled={isBusy}
            />
            <p className={`text-xs text-gray-500 mt-1 ${jost.className}`}>
              Recommended: 50-60 characters
            </p>
          </div>

          <div>
            <label className={labelClass}>Meta Description (Optional)</label>
            <textarea
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              className={`${inputClass} min-h-20`}
              placeholder="SEO meta description"
              disabled={isBusy}
            />
            <p className={`text-xs text-gray-500 mt-1 ${jost.className}`}>
              Recommended: 150-160 characters
            </p>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={(e) => {
                stopCardNavigation(e);
                onClose();
              }}
              className={`px-6 py-2 border border-gray-300 text-gray-700 rounded-none hover:bg-gray-50 transition-colors ${jost.className}`}
              disabled={isBusy}
            >
              Close
            </button>
            <button
              type="button"
              onClick={(e) => {
                void handleSubmit(e);
              }}
              disabled={isBusy}
              className={`px-6 py-2 bg-[#c89e3a] text-white rounded-none hover:bg-[#9d7400] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${jost.className}`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving…
                </>
              ) : (
                saveLabel
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!mounted) {
    return null;
  }

  return createPortal(modal, document.body);
}
