"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { jost } from "@/lib/fonts";
import { blogApi } from "@/lib/api";
import { BlogSlugConflictError } from "@/services/api/admin/blogService";
import {
  buildLocalizedBlogSlug,
  getBlogBaseSlug,
  getBlogLanguageFromSlug,
  isBlogLanguage,
  type BlogLanguage,
} from "@/lib/blogLanguages";
import { useIsAdmin } from "../useIsAdmin";
import { refreshBlogs } from "../actions";
import BlogEditorForm, {
  EMPTY_BLOG_FORM,
  type BlogFormSubmitResult,
  type BlogFormValues,
} from "./BlogEditorForm";

type LoadedBlog = {
  _id?: string;
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
  translationStatus?: "machine" | "reviewed";
  previousContent?: string;
  updatedAt?: string;
  contentHash?: string;
  sourceContentHash?: string;
};

/** ISO timestamp -> yyyy-mm-dd for a date input; empty when unset or invalid. */
function toDateInputValue(value?: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function toFormValues(source: LoadedBlog): BlogFormValues {
  const language: BlogLanguage = isBlogLanguage(source.language)
    ? source.language
    : getBlogLanguageFromSlug(source.customSlug, "en");

  return {
    title: source.title || "",
    h2Subtitle: source.h2Subtitle || "",
    customSlug: buildLocalizedBlogSlug(language, getBlogBaseSlug(source.customSlug)),
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
    translationStatus: source.translationStatus,
    hasPreviousContent: Boolean(source.previousContent),
    updatedAt: source.updatedAt,
    contentHash: source.contentHash,
    sourceContentHash: source.sourceContentHash,
  };
}

function EditorScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAdmin = useIsAdmin();

  const blogId = searchParams.get("id");
  const mode = blogId ? "edit" : "add";

  const [initialValues, setInitialValues] = useState<BlogFormValues | null>(
    blogId ? null : EMPTY_BLOG_FORM,
  );
  const [loadError, setLoadError] = useState<string | null>(null);
  // Admin status resolves on the client only, so wait a tick before deciding
  // the visitor is not an admin.
  const [adminChecked, setAdminChecked] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setAdminChecked(true), 300);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!blogId) return;
    let cancelled = false;

    (async () => {
      try {
        const response = await blogApi.getById(blogId);
        if (cancelled) return;
        if (response?.data) {
          setInitialValues(toFormValues(response.data));
        } else {
          setLoadError("That article could not be found.");
        }
      } catch {
        if (!cancelled) setLoadError("That article could not be loaded.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [blogId]);

  /**
   * Leave the editor the way the browser's own back button would.
   *
   * A fixed push to /blogs sent an admin who arrived from the dashboard back
   * to the public listing instead of the table they were working through.
   * history.length > 1 guards the case where the editor was opened directly
   * in a fresh tab, where going back would leave the site entirely.
   */
  const exit = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/blogs/manage");
  }, [router]);

  /**
   * Save the active language version.
   *
   * This logic previously existed twice — once in the add bar and once on each
   * blog card — which let the two drift apart. The editor route is now the one
   * place an article is written.
   */
  const handleSave = useCallback(
    async (
      values: BlogFormValues,
      meta: { blogId: string | null; quiet?: boolean },
    ): Promise<BlogFormSubmitResult> => {
      const language = values.language.toUpperCase();
      try {
        // The banner reads these off the form, but they are signals the server
        // owns: sending them back would let a save overwrite what the
        // translation service recorded.
        const translationStatus = values.translationStatus;
        const editable: Partial<BlogFormValues> = { ...values };
        delete editable.translationStatus;
        delete editable.hasPreviousContent;
        delete editable.updatedAt;
        delete editable.contentHash;
        delete editable.sourceContentHash;

        const payload = {
          ...(editable as BlogFormValues),
          // The repository normalises the localised slug, so it is sent as-is.
          customSlug: values.customSlug,
          // Omit when empty so the backend starts a new translation group.
          translationGroupId: values.translationGroupId || undefined,
          // `description` no longer mirrors the body. It used to be sent as a
          // copy of `content`, which stored every article twice and left the
          // field meaning two different things. `excerpt` is the summary now.
          description: undefined,
          // Empty strings would fail the Date cast on the server.
          lastReviewedAt: values.lastReviewedAt || undefined,
          datePublished: values.datePublished || undefined,
          secondaryKeywords: values.secondaryKeywords
            .split(",")
            .map((keyword) => keyword.trim())
            .filter(Boolean),
        };

        if (meta.blogId) {
          const response = await blogApi.update(meta.blogId, {
            ...payload,
            // Saving a machine translation by hand IS the review. A separate
            // "mark as reviewed" button is one people forget to press, and the
            // flag would then never become true.
            ...(translationStatus === "machine"
              ? { translationStatus: "reviewed" as const }
              : {}),
          });
          if (response?.success) {
            // A Save all reports once at the end, and revalidates once, rather
            // than firing five toasts and six cache purges each.
            if (!meta.quiet) {
              toast.success(`${language} version saved.`);
              await refreshBlogs();
              router.refresh();
            }
            return {
              blogId: response.data?._id || meta.blogId,
              translationGroupId: response.data?.translationGroupId,
            };
          }
          if (!meta.quiet) {
            toast.error(`Could not save the ${language} version. Try again.`);
          }
          return { blogId: meta.blogId, failed: true };
        }

        const response = await blogApi.create(payload);
        if (response?.success) {
          if (!meta.quiet) {
            toast.success(
              `${language} version created. Switch language above to add another.`,
            );
            await refreshBlogs();
            router.refresh();
          }
          return {
            blogId: response.data?._id || null,
            translationGroupId: response.data?.translationGroupId,
          };
        }
        if (!meta.quiet) {
          toast.error(`Could not create the ${language} version. Try again.`);
        }
        return { blogId: null, failed: true };
      } catch (error) {
        if (error instanceof BlogSlugConflictError) {
          toast.error(error.message, { duration: 6000 });
          return { blogId: meta.blogId, conflict: error.existing };
        }
        const message =
          error instanceof Error ? error.message : "Could not save the article.";
        // A Save all reports once at the end; without this a failed batch
        // fired one toast per language on top of its own summary.
        if (!meta.quiet) toast.error(message);
        // `failed` matters more than it looks: without it a save the server
        // rejected was treated as successful, and a machine translation was
        // marked reviewed locally while the server still held the old copy.
        return { blogId: meta.blogId, failed: true, error: message };
      }
    },
    [router],
  );

  if (adminChecked && !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f6f3] px-6">
        <div className={`text-center ${jost.className}`}>
          <p className="text-lg text-[#2d2d2d]">You need an admin account to edit articles.</p>
          <button
            type="button"
            onClick={exit}
            className="mt-4 bg-[#c89e3a] px-6 py-2.5 text-white transition-colors hover:bg-[#9d7400]"
          >
            Back to articles
          </button>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f6f3] px-6">
        <div className={`text-center ${jost.className}`}>
          <p className="text-lg text-[#2d2d2d]">{loadError}</p>
          <button
            type="button"
            onClick={exit}
            className="mt-4 bg-[#c89e3a] px-6 py-2.5 text-white transition-colors hover:bg-[#9d7400]"
          >
            Back to articles
          </button>
        </div>
      </div>
    );
  }

  if (!initialValues) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f6f3]">
        <span
          className={`inline-flex items-center gap-2 text-sm text-gray-600 ${jost.className}`}
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading article
        </span>
      </div>
    );
  }

  return (
    <BlogEditorForm
      mode={mode}
      initialValues={initialValues}
      initialBlogId={blogId}
      onExit={exit}
      onSubmit={handleSave}
    />
  );
}

export default function BlogEditorPage() {
  // useSearchParams needs a Suspense boundary during prerender.
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f7f6f3]">
          <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
        </div>
      }
    >
      <EditorScreen />
    </Suspense>
  );
}
