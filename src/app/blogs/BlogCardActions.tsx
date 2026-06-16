"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Trash2 } from "lucide-react";
import { blogApi } from "@/lib/api";
import { useIsAdmin } from "./useIsAdmin";
import BlogFormModal, { type BlogFormValues } from "./BlogFormModal";
import { refreshBlogs } from "./actions";

type Props = {
  blog: {
    _id: string;
    title: string;
    h2Subtitle?: string;
    customSlug?: string;
    featuredImage?: string;
    content?: string;
    description?: string;
    metaTitle?: string;
    metaDescription?: string;
  };
};

export default function BlogCardActions({ blog }: Props) {
  const isAdmin = useIsAdmin();
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editValues, setEditValues] = useState<BlogFormValues | null>(null);

  if (!isAdmin) return null;

  const toFormValues = (source: typeof blog): BlogFormValues => ({
    title: source.title,
    h2Subtitle: source.h2Subtitle || "",
    customSlug: source.customSlug || "",
    featuredImage: source.featuredImage || "",
    content: source.content || source.description || "",
    metaTitle: source.metaTitle || "",
    metaDescription: source.metaDescription || "",
  });

  const openEdit = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // The blog list omits the article body for performance, so fetch the full
    // blog by id before opening the editor (falls back to the card data).
    let source = blog;
    try {
      const response = await blogApi.getById(blog._id);
      if (response?.data) {
        source = { ...blog, ...response.data };
      }
    } catch (error) {
      console.error("Error loading blog for edit:", error);
    }
    setEditValues(toFormValues(source));
    setShowEditModal(true);
  };

  const handleUpdate = async (values: BlogFormValues) => {
    try {
      const response = await blogApi.update(blog._id, {
        ...values,
        description: values.content, // backward compatibility
      });
      if (response && response.success) {
        alert("Blog updated successfully!");
        setShowEditModal(false);
        await refreshBlogs();
        router.refresh();
      } else {
        alert("Failed to update blog. Please try again.");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert(error instanceof Error ? error.message : "Failed to update blog");
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
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
}
