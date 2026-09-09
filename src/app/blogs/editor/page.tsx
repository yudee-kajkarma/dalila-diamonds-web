"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { jost } from "@/lib/fonts";
import { blogApi } from "@/lib/api";
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
  metaTitle?: string;
  metaDescription?: string;
};

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
    metaTitle: source.metaTitle || "",
    metaDescription: source.metaDescription || "",
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

  const exit = useCallback(() => {
    router.push("/blogs");
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
      meta: { blogId: string | null },
    ): Promise<BlogFormSubmitResult> => {
      const language = values.language.toUpperCase();
      try {
        const payload = {
          ...values,
          // The repository normalises the localised slug, so it is sent as-is.
          customSlug: values.customSlug,
          // Omit when empty so the backend starts a new translation group.
          translationGroupId: values.translationGroupId || undefined,
          description: values.content,
        };

        if (meta.blogId) {
          const response = await blogApi.update(meta.blogId, payload);
          if (response?.success) {
            toast.success(`${language} version saved.`);
            await refreshBlogs();
            router.refresh();
            return {
              blogId: response.data?._id || meta.blogId,
              translationGroupId: response.data?.translationGroupId,
            };
          }
          toast.error(`Could not save the ${language} version. Try again.`);
          return { blogId: meta.blogId };
        }

        const response = await blogApi.create(payload);
        if (response?.success) {
          toast.success(
            `${language} version created. Switch language above to add another.`,
          );
          await refreshBlogs();
          router.refresh();
          return {
            blogId: response.data?._id || null,
            translationGroupId: response.data?.translationGroupId,
          };
        }
        toast.error(`Could not create the ${language} version. Try again.`);
        return { blogId: null };
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Could not save the article.",
        );
        return { blogId: meta.blogId };
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
