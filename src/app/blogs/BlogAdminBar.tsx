"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { jost } from "@/lib/fonts";
import { blogApi } from "@/lib/api";
import { getBlogBaseSlug } from "@/lib/blogLanguages";
import { useIsAdmin } from "./useIsAdmin";
import BlogFormModal, {
  EMPTY_BLOG_FORM,
  type BlogFormSubmitResult,
  type BlogFormValues,
} from "./BlogFormModal";
import { refreshBlogs } from "./actions";

export default function BlogAdminBar() {
  const isAdmin = useIsAdmin();
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);

  if (!isAdmin) return null;

  const handleSave = async (
    values: BlogFormValues,
    meta: { blogId: string | null },
  ): Promise<BlogFormSubmitResult> => {
    try {
      const payload = {
        ...values,
        customSlug: getBlogBaseSlug(values.customSlug) || values.customSlug,
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
          `${values.language.toUpperCase()} version saved. Switch language in this form to add another version.`,
        );
        await refreshBlogs();
        router.refresh();
        return {
          blogId: response.data?._id || null,
          translationGroupId: response.data?.translationGroupId,
        };
      }
      alert("Failed to create blog. Please try again.");
      return { blogId: null };
    } catch (error) {
      console.error("Error saving blog:", error);
      alert(error instanceof Error ? error.message : "Failed to create blog");
      return { blogId: meta.blogId };
    }
  };

  return (
    <>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-[#c89e3a] text-white hover:bg-[#b8922e] transition-all shadow-md hover:shadow-lg"
          title="Add New Blog"
        >
          <Plus size={20} />
          <span className={`text-sm font-semibold ${jost.className}`}>Add Article</span>
        </button>
      </div>

      {showAddModal && (
        <BlogFormModal
          mode="add"
          initialValues={EMPTY_BLOG_FORM}
          initialBlogId={null}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleSave}
        />
      )}
    </>
  );
}
