"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { blogApi } from "@/lib/api";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { useIsAdmin } from "./useIsAdmin";
import { refreshBlogs } from "./actions";
import {
  getBlogBaseSlug,
  getBlogLanguageFromSlug,
  isBlogLanguage,
  type BlogLanguage,
} from "@/lib/blogLanguages";

type Props = {
  blog: {
    _id: string;
    title: string;
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
  /** Current site language — the editor opens on this tab where a version exists. */
  siteLanguage?: BlogLanguage;
};

export default function BlogCardActions({ blog, siteLanguage = "en" }: Props) {
  const isAdmin = useIsAdmin();
  const router = useRouter();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isAdmin) return null;

  const resolveLanguage = (source: typeof blog): BlogLanguage => {
    if (isBlogLanguage(source.language)) return source.language;
    return getBlogLanguageFromSlug(source.customSlug, "en");
  };

  /**
   * Open the editor on the version that matches the site language where one
   * exists, otherwise on this card's own version. Resolving the id here keeps
   * the editor route a simple "load this id" screen.
   */
  const openEdit = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let targetId = blog._id;
    let source = blog;

    try {
      const response = await blogApi.getById(blog._id);
      if (response?.data) {
        source = { ...blog, ...response.data };
      }
    } catch {
      // Fall back to the card's own data; the editor reloads it anyway.
    }

    const baseSlug = getBlogBaseSlug(source.customSlug);
    const groupId = source.translationGroupId || "";

    if (siteLanguage !== resolveLanguage(source) && (baseSlug || groupId)) {
      try {
        const langResponse = await blogApi.getByBaseSlugAndLanguage(
          baseSlug,
          siteLanguage,
          groupId || undefined,
        );
        if (langResponse?.data?._id) {
          targetId = langResponse.data._id;
        }
      } catch {
        // No version in the site language yet — open the card's own version and
        // let the editor's language tabs handle creating the translation.
      }
    }

    router.push(`/blogs/editor?id=${encodeURIComponent(targetId)}`);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      // A card is an article, so deleting it takes every language version -
      // the same meaning the dashboard's delete has.
      const response = await blogApi.delete(blog._id, "group");
      if (response) {
        const removed = response?.data?.deleted ?? 0;
        toast.success(
          removed > 1 ? `Article deleted, including ${removed - 1} translations.` : "Article deleted.",
        );
        await refreshBlogs();
        router.refresh();
      } else {
        toast.error("Could not delete the article. Try again.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not delete the article.",
      );
    } finally {
      setIsDeleting(false);
      setConfirmingDelete(false);
    }
  };

  return (
    <>
      <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={openEdit}
          className="cursor-pointer p-2 bg-white/90 backdrop-blur shadow-md hover:bg-[#c89e3a] hover:text-white transition-all group/btn"
          title="Edit article"
        >
          <Edit2 size={16} className="text-[#c89e3a] group-hover/btn:text-white" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setConfirmingDelete(true);
          }}
          className="cursor-pointer p-2 bg-white/90 backdrop-blur shadow-md hover:bg-red-600 hover:text-white transition-all group/btn"
          title="Delete article"
        >
          <Trash2 size={16} className="text-red-600 group-hover/btn:text-white" />
        </button>
      </div>

      <ConfirmDialog
        open={confirmingDelete}
        tone="danger"
        title="Delete this article?"
        message={
          <>
            <span className="font-medium text-gray-800">{blog.title}</span> will be
            removed from the site and from the sitemap. This cannot be undone from
            here.
          </>
        }
        confirmLabel={isDeleting ? "Deleting" : "Delete article"}
        cancelLabel="Keep it"
        busy={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmingDelete(false)}
      />
    </>
  );
}
