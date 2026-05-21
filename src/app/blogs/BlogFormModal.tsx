"use client";

import { useState } from "react";
import { Loader2, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { Marcellus, Jost } from "next/font/google";
import RichTextEditor from "@/components/shared/RichTextEditor";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export type BlogFormValues = {
  title: string;
  h2Subtitle: string;
  customSlug: string;
  featuredImage: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
};

export const EMPTY_BLOG_FORM: BlogFormValues = {
  title: "",
  h2Subtitle: "",
  customSlug: "",
  featuredImage: "",
  content: "",
  metaTitle: "",
  metaDescription: "",
};

type Props = {
  mode: "add" | "edit";
  initialValues: BlogFormValues;
  onClose: () => void;
  onSubmit: (values: BlogFormValues) => Promise<void>;
};

export default function BlogFormModal({ mode, initialValues, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<BlogFormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageInputType, setImageInputType] = useState<"url" | "gallery">("url");

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

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      alert("Please fill in Blog Title and Content");
      return;
    }
    try {
      setIsSubmitting(true);
      await onSubmit(form);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `w-full px-4 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#c89e3a] bg-white text-gray-900 ${jost.className}`;
  const labelClass = `block text-sm font-semibold text-gray-700 mb-2 ${jost.className}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-none max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className={`text-2xl font-semibold text-[#2d2d2d] ${marcellus.className}`}>
            {mode === "add" ? "Add New Article" : "Edit Blog"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className={labelClass}>
              Blog Title (H1) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
              placeholder="Enter blog title"
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className={labelClass}>Custom Slug (Optional)</label>
            <input
              type="text"
              value={form.customSlug}
              onChange={(e) => setForm({ ...form, customSlug: e.target.value })}
              className={inputClass}
              placeholder="custom-blog-slug (leave empty to auto-generate from title)"
              disabled={isSubmitting}
            />
            <p className={`text-xs text-gray-500 mt-1 ${jost.className}`}>
              Leave empty to auto-generate from title
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
                disabled={isSubmitting}
              >
                <LinkIcon size={16} className="inline mr-2" />
                Add URL
              </button>
              <label
                className={`px-4 py-2 rounded-none border transition-colors cursor-pointer inline-flex items-center ${
                  imageInputType === "gallery"
                    ? "bg-[#c89e3a] text-white border-[#c89e3a]"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                } ${jost.className} ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <ImageIcon size={16} className="inline mr-2" />
                Select from Device
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
            <p className={`text-xs text-gray-500 mt-1 ${jost.className}`}>
              Recommended: 150-160 characters
            </p>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className={`px-6 py-2 border border-gray-300 text-gray-700 rounded-none hover:bg-gray-50 transition-colors ${jost.className}`}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-2 bg-[#c89e3a] text-white rounded-none hover:bg-[#9d7400] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${jost.className}`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {mode === "add" ? "Creating..." : "Updating..."}
                </>
              ) : mode === "add" ? (
                "Create Blog"
              ) : (
                "Update Blog"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
