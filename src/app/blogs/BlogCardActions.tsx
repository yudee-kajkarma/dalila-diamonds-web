"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Trash2 } from "lucide-react";
import { blogApi } from "@/lib/api";
import {
  buildLocalizedBlogSlug,
  getBlogBaseSlug,
  getBlogLanguageFromSlug,
  isBlogLanguage,
  type BlogLanguage,
} from "@/lib/blogLanguages";
import { useIsAdmin } from "./useIsAdmin";
import BlogFormModal, {
  type BlogFormSubmitResult,
  type BlogFormValues,
} from "./BlogFormModal";
import { refreshBlogs } from "./actions";

type Props = {
  blog: {
    _id: string;
    title: string;
    h2Subtitle?: string;
    customSlug?: string;
    language?: string;
    translationGroupId?: string;
    featuredImage?: string;
    content?: string;
    description?: string;
    metaTitle?: string;
    metaDescription?: string;
  };
  /** Current site language — the modal opens on this tab by default. */
  siteLanguage?: BlogLanguage;
};

export default function BlogCardActions({ blog, siteLanguage = "en" }: Props) {
  const isAdmin = useIsAdmin();
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editValues, setEditValues] = useState<BlogFormValues | null>(null);
  const [editBlogId, setEditBlogId] = useState<string | null>(null);

  if (!isAdmin) return null;

  const resolveLanguage = (source: typeof blog): BlogLanguage => {
    if (isBlogLanguage(source.language)) return source.language;
    return getBlogLanguageFromSlug(source.customSlug, "en");
  };

  const toFormValues = (source: typeof blog): BlogFormValues => {
    const language = resolveLanguage(source);
    return {
      title: source.title,
      h2Subtitle: source.h2Subtitle || "",
      customSlug: buildLocalizedBlogSlug(language, getBlogBaseSlug(source.customSlug)),
      language,
      translationGroupId: source.translationGroupId || "",
      featuredImage: source.featuredImage || "",
      content: source.content || source.description || "",
      metaTitle: source.metaTitle || "",
      metaDescription: source.metaDescription || "",
    };
  };

  const openEdit = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Step 1: fetch the full doc for the card's own language (to get translationGroupId
    // and the base slug, which we need to look up the site-language version).
    let source = blog;
    try {
      const response = await blogApi.getById(blog._id);
      if (response?.data) {
        source = { ...blog, ...response.data };
      }
    } catch (error) {
      console.error("Error loading blog for edit:", error);
    }

    const baseSlug = getBlogBaseSlug(source.customSlug);
    const groupId = source.translationGroupId || "";

    // Step 2: if the site language differs from the card's language, try to load
    // the site-language version so the modal opens on the correct tab.
    if (siteLanguage !== resolveLanguage(source) && (baseSlug || groupId)) {
      try {
        const langResponse = await blogApi.getByBaseSlugAndLanguage(
          baseSlug,
          siteLanguage,
          groupId || undefined,
        );
        if (langResponse?.data) {
          // Found the site-language version — open the modal on that tab.
          setEditValues(toFormValues({ ...langResponse.data, _id: langResponse.data._id || source._id }));
          setEditBlogId(langResponse.data._id || source._id);
          setShowEditModal(true);
          return;
        }
      } catch {
        // Site-language version doesn't exist yet — fall through to open on
        // the card's own language with a blank tab pre-selected below.
      }
    }

    // Step 3: site language version not found (or same language) — open on the
    // card's own language. The modal's language-switch will show empty for
    // site language, letting the admin add it fresh.
    setEditValues(toFormValues(source));
    setEditBlogId(source._id);
    setShowEditModal(true);
  };

  const handleSave = async (
    values: BlogFormValues,
    meta: { blogId: string | null },
  ): Promise<BlogFormSubmitResult> => {
    try {
      const payload = {
        ...values,
        // Keep the full localised slug as-is (e.g. "es/my-blog" for Spanish,
        // "my-blog" for English). The repository normalises it before saving so
        // we never need to strip the prefix here.
        customSlug: values.customSlug,
        // Omit when empty so the backend starts a new translation group.
        translationGroupId: values.translationGroupId || undefined,
        description: values.content,
      };

      if (meta.blogId) {
        const response = await blogApi.update(meta.blogId, payload);
        if (response && response.success) {
          alert(`${values.language.toUpperCase()} version updated successfully.`);
          await refreshBlogs();
          router.refresh();
          return {
            blogId: response.data?._id || meta.blogId,
            translationGroupId: response.data?.translationGroupId,
          };
        }
        alert("Failed to update blog. Please try again.");
        return { blogId: meta.blogId };
      }

      const response = await blogApi.create(payload);
      if (response && response.success) {
        alert(
          `${values.language.toUpperCase()} version created successfully. You can switch language to edit another version.`,
        );
        await refreshBlogs();
        router.refresh();
        return {
          blogId: response.data?._id || null,
          translationGroupId: response.data?.translationGroupId,
        };
      }
      alert("Failed to create language version. Please try again.");
      return { blogId: null };
    } catch (error) {
      console.error("Error saving blog language version:", error);
      alert(error instanceof Error ? error.message : "Failed to save blog");
      return { blogId: meta.blogId };
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const confirmed = window.confirm(
      `Are you sure you want to delete "${blog.title}"? This action cannot be undone.`,
    );
    if (!confirmed) return;
    try {
      const response = await blogApi.delete(blog._id);
      if (response) {
        alert("Blog deleted successfully!");
        await refreshBlogs();
        router.refresh();
      } else {
        alert("Failed to delete blog. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog. Please try again.");
    }
  };

  return (
    <>
      <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={openEdit}
          className="cursor-pointer p-2 bg-white/90 backdrop-blur shadow-md hover:bg-[#c89e3a] hover:text-white transition-all group/btn"
          title="Edit Blog"
        >
          <Edit2 size={16} className="text-[#c89e3a] group-hover/btn:text-white" />
        </button>
        <button
          onClick={handleDelete}
          className="cursor-pointer p-2 bg-white/90 backdrop-blur shadow-md hover:bg-red-600 hover:text-white transition-all group/btn"
          title="Delete Blog"
        >
          <Trash2 size={16} className="text-red-600 group-hover/btn:text-white" />
        </button>
      </div>

      {showEditModal && editValues && (
        <BlogFormModal
          mode="edit"
          initialValues={editValues}
          initialBlogId={editBlogId}
          onClose={() => {
            setShowEditModal(false);
            setEditValues(null);
            setEditBlogId(null);
          }}
          onSubmit={handleSave}
        />
      )}
    </>
  );
}
