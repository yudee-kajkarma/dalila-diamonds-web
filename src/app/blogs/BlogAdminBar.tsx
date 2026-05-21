"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Jost } from "next/font/google";
import { blogApi } from "@/lib/api";
import { useIsAdmin } from "./useIsAdmin";
import BlogFormModal, { EMPTY_BLOG_FORM, type BlogFormValues } from "./BlogFormModal";
import { refreshBlogs } from "./actions";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default function BlogAdminBar() {
  const isAdmin = useIsAdmin();
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);

  if (!isAdmin) return null;

  const handleCreate = async (values: BlogFormValues) => {
    try {
      const response = await blogApi.create({
        ...values,
        description: values.content, // backward compatibility
      });
      if (response && response.success) {
        alert("Blog created successfully!");
        setShowAddModal(false);
        await refreshBlogs();
        router.refresh();
      } else {
        alert("Failed to create blog. Please try again.");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert(error instanceof Error ? error.message : "Failed to create blog");
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
          onClose={() => setShowAddModal(false)}
          onSubmit={handleCreate}
        />
      )}
    </>
  );
}
