"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { TableKit } from "@tiptap/extension-table";
import { Details, DetailsContent, DetailsSummary } from "@tiptap/extension-details";
import { EditorImage } from "@/components/shared/editor/EditorImage";
import InputDialog from "@/components/shared/InputDialog";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  MousePointerClick,
  ImagePlus,
  Loader2,
  Table as TableIcon,
  ChevronDown,
  Rows3,
  Columns3,
  Trash,
} from "lucide-react";
import { blogApi } from "@/lib/api";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** Set false where no blog image upload endpoint applies. */
  allowImageUpload?: boolean;
  /**
   * Height of the scrollable writing area. The default suits a compact form;
   * the full-page editor passes a much taller value so long articles can be
   * read without scrolling inside a small box.
   */
  heightClass?: string;
  /**
   * Pixels from the viewport top where the toolbar parks when the page
   * scrolls. The default assumes the editor sits at the top of its own scroll
   * context; the full-page editor measures the site header and its own action
   * bar and passes their combined height.
   */
  toolbarTop?: number;
}

/**
 * The page template already owns the single <h1> (the article title), so body
 * content must never contain one. Authors paste these articles in from Google
 * Docs, where every section heading arrives as an <h1> — that is how ~90 H1s
 * per article ended up in the database. Removing the toolbar button is not
 * enough on its own; this demotes any h1 that arrives by paste or by loading a
 * not-yet-migrated article.
 *
 * Keep in sync with demoteH1 in backend-dalila/server/scripts/demote-blog-h1.ts
 */
export function demoteH1InHtml(html: string): string {
  return html
    .replace(/<h1(\s[^>]*)?>/gi, (_m, attrs) => `<h2${attrs || ""}>`)
    .replace(/<\/h1\s*>/gi, "</h2>");
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  disabled = false,
  className = "",
  allowImageUpload = true,
  heightClass = "max-h-96",
  toolbarTop,
}: RichTextEditorProps) {
  const [showCtaModal, setShowCtaModal] = useState(false);
  const [ctaText, setCtaText] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  // Held while an image waits for its alt text: either a freshly uploaded URL
  // to insert, or an existing image whose alt is being edited.
  const [pendingImageUrl, setPendingImageUrl] = useState<string | null>(null);
  const [altTextRequest, setAltTextRequest] = useState<{
    current: string;
    apply: (next: string) => void;
  } | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      // Without this node TipTap has no schema entry for <img>, so it silently
      // strips every image out of existing content the moment an article is
      // opened for editing. The node view adds Remove and Alt text controls,
      // so an image no longer has to be deleted with Backspace.
      // Tables and collapsible blocks exist because the static articles being
      // moved into the CMS use both. Without the schema nodes for them, TipTap
      // silently strips the markup the first time an article is opened - the
      // same way it was stripping images before the image node was added.
      TableKit.configure({
        table: { resizable: true, HTMLAttributes: { class: "blog-content-table" } },
      }),
      // Renders as <details>/<summary>, so an FAQ entry stays collapsible on
      // the published page without any client JavaScript.
      Details.configure({
        persist: true,
        HTMLAttributes: { class: "blog-content-details" },
      }),
      DetailsSummary,
      DetailsContent,
      EditorImage.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: { class: "blog-content-image" },
        onRequestAltText: (current, apply) => {
          setAltTextRequest({ current, apply });
        },
      }),
    ],
    content: value,
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(demoteH1InHtml(editor.getHTML()));
    },
  });

  useEffect(() => {
    if (!editor) return;
    // Demote on the way in too, so opening a not-yet-migrated article shows the
    // corrected hierarchy immediately rather than only after the first keystroke.
    const normalized = demoteH1InHtml(value);
    if (normalized !== editor.getHTML()) {
      editor.commands.setContent(normalized);
    }
  }, [value, editor]);

  const insertCtaButton = () => {
    if (!ctaText.trim() || !ctaUrl.trim()) {
      toast.error("Enter both the button text and the URL.");
      return;
    }

    if (editor) {
      // Create HTML for CTA button with strong color enforcement
      const ctaHtml = `<p><a href="${ctaUrl}" class="cta-button" style="display: inline-block !important; padding: 12px 24px !important; background-color: #030822 !important; color: #ffffff !important; text-decoration: none !important; border-radius: 4px !important; font-weight: 600 !important; transition: background-color 0.3s !important; margin: 16px 0 !important;" target="_blank" rel="noopener noreferrer"><span style="color: #ffffff !important;">${ctaText}</span></a></p>`;
      
      editor.chain().focus().insertContent(ctaHtml).run();
      
      // Reset form
      setCtaText("");
      setCtaUrl("");
      setShowCtaModal(false);
    }
  };

  const applyLink = (url: string) => {
    setShowLinkDialog(false);
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  /**
   * Upload an in-body image and insert it at the cursor.
   *
   * Alt text is prompted for rather than optional: an image with no alt is an
   * accessibility failure and every SEO content package requires one.
   */
  const handleImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const input = event.target;
    const file = input.files?.[0];
    if (!file || !editor) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be smaller than 10MB.");
      input.value = "";
      return;
    }

    setIsUploadingImage(true);
    try {
      const url = await blogApi.uploadImage(file);
      // Ask for alt text before inserting, so an image never lands without it.
      setPendingImageUrl(url);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload image.",
      );
    } finally {
      setIsUploadingImage(false);
      input.value = "";
    }
  };

  const insertPendingImage = (alt: string) => {
    if (pendingImageUrl && editor) {
      editor
        .chain()
        .focus()
        .setImage({ src: pendingImageUrl, alt: alt || undefined })
        .run();
    }
    setPendingImageUrl(null);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className={`border border-gray-300 rounded-none bg-white ${className}`}>
      {/* Toolbar - Sticky at top of editor */}
      <div
        className="sticky top-0 z-10 flex flex-wrap items-center gap-1 p-2 border-b border-gray-300 bg-gray-50"
        style={toolbarTop === undefined ? undefined : { top: `${toolbarTop}px` }}
      >
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={disabled}
          className={`p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 ${
            editor.isActive("bold") ? "bg-gray-300 text-gray-900" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          title="Bold"
        >
          <Bold size={18} className="text-gray-700" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={disabled}
          className={`p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 ${
            editor.isActive("italic") ? "bg-gray-300 text-gray-900" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          title="Italic"
        >
          <Italic size={18} className="text-gray-700" />
        </button>

        <div className="w-px h-8 bg-gray-300 mx-1"></div>

        {/* No H1 button: the article title in the page template is the page's
            single H1. Body headings start at H2. */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={disabled}
          className={`p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-300 text-gray-900" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          title="Heading 2"
        >
          <Heading2 size={18} className="text-gray-700" />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={disabled}
          className={`p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 ${
            editor.isActive("heading", { level: 3 }) ? "bg-gray-300 text-gray-900" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          title="Heading 3"
        >
          <Heading3 size={18} className="text-gray-700" />
        </button>

        <div className="w-px h-8 bg-gray-300 mx-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={disabled}
          className={`p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 ${
            editor.isActive("bulletList") ? "bg-gray-300 text-gray-900" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          title="Bullet List"
        >
          <List size={18} className="text-gray-700" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={disabled}
          className={`p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 ${
            editor.isActive("orderedList") ? "bg-gray-300 text-gray-900" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          title="Numbered List"
        >
          <ListOrdered size={18} className="text-gray-700" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={disabled}
          className={`p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 ${
            editor.isActive("blockquote") ? "bg-gray-300 text-gray-900" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          title="Quote"
        >
          <Quote size={18} className="text-gray-700" />
        </button>

        <div className="w-px h-8 bg-gray-300 mx-1"></div>

        <button
          type="button"
          onClick={() => setShowLinkDialog(true)}
          disabled={disabled}
          className={`p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 ${
            editor.isActive("link") ? "bg-gray-300 text-gray-900" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          title="Add Link"
        >
          <LinkIcon size={18} className="text-gray-700" />
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          disabled={disabled}
          className={`p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Insert table"
        >
          <TableIcon size={18} className="text-gray-700" />
        </button>

        {/* Row and column controls only mean anything inside a table, so they
            appear once the caret is in one. */}
        {editor.isActive("table") && (
          <>
            <button
              type="button"
              onClick={() => editor.chain().focus().addRowAfter().run()}
              disabled={disabled}
              className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-700"
              title="Add row"
            >
              <Rows3 size={18} className="text-gray-700" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              disabled={disabled}
              className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-700"
              title="Add column"
            >
              <Columns3 size={18} className="text-gray-700" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().deleteTable().run()}
              disabled={disabled}
              className="p-2 rounded hover:bg-gray-200 transition-colors text-red-600"
              title="Delete table"
            >
              <Trash size={18} className="text-red-600" />
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => editor.chain().focus().setDetails().run()}
          disabled={disabled || !editor.can().setDetails()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 ${
            disabled || !editor.can().setDetails() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Insert collapsible section (for an FAQ entry)"
        >
          <ChevronDown size={18} className="text-gray-700" />
        </button>

        <div className="w-px h-8 bg-gray-300 mx-1"></div>

        {allowImageUpload && (
          <>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              onChange={handleImageSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              disabled={disabled || isUploadingImage}
              className={`p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 ${
                disabled || isUploadingImage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Insert Image"
            >
              {isUploadingImage ? (
                <Loader2 size={18} className="text-gray-700 animate-spin" />
              ) : (
                <ImagePlus size={18} className="text-gray-700" />
              )}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => setShowCtaModal(true)}
          disabled={disabled}
          className={`p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Add CTA Button"
        >
          <MousePointerClick size={18} className="text-gray-700" />
        </button>

        <div className="w-px h-8 bg-gray-300 mx-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={disabled || !editor.can().undo()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 ${
            disabled || !editor.can().undo() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Undo"
        >
          <Undo size={18} className="text-gray-700" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={disabled || !editor.can().redo()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 ${
            disabled || !editor.can().redo() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Redo"
        >
          <Redo size={18} className="text-gray-700" />
        </button>
      </div>

      {/* Editor Content - Scrollable */}
      <div className={`${heightClass} overflow-y-auto`}>
        <EditorContent
          editor={editor}
          className="prose max-w-none p-4 min-h-[200px] bg-white focus:outline-none text-gray-900"
        />
      </div>

      <InputDialog
        open={showLinkDialog}
        title="Add a link"
        description="Paste the destination. Use a full URL for external sites, or a path like /inventory for pages on this site."
        fields={[
          {
            name: "url",
            label: "Link URL",
            placeholder: "https://example.com or /inventory",
            required: true,
          },
        ]}
        submitLabel="Add link"
        onSubmit={(values) => applyLink(values.url)}
        onCancel={() => setShowLinkDialog(false)}
      />

      <InputDialog
        open={pendingImageUrl !== null}
        title="Describe this image"
        description="Alt text is read aloud by screen readers and used by search engines. Write what the image shows, not a list of keywords."
        fields={[
          {
            name: "alt",
            label: "Alt text",
            placeholder: "Natural diamond and moissanite shown side by side",
            helpText: "Leave empty only if the image is purely decorative.",
          },
        ]}
        submitLabel="Insert image"
        onSubmit={(values) => insertPendingImage(values.alt)}
        onCancel={() => setPendingImageUrl(null)}
      />

      <InputDialog
        open={altTextRequest !== null}
        title="Edit alt text"
        description="Describe what this image shows for screen readers and search engines."
        fields={[
          {
            name: "alt",
            label: "Alt text",
            placeholder: "Natural diamond and moissanite shown side by side",
          },
        ]}
        initialValues={{ alt: altTextRequest?.current ?? "" }}
        submitLabel="Save alt text"
        onSubmit={(values) => {
          altTextRequest?.apply(values.alt);
          setAltTextRequest(null);
        }}
        onCancel={() => setAltTextRequest(null)}
      />

      {/* CTA Button Modal */}
      {showCtaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add CTA Button</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  placeholder="e.g., Shop Now, Learn More, View Products"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#030822] text-gray-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button URL
                </label>
                <input
                  type="url"
                  value={ctaUrl}
                  onChange={(e) => setCtaUrl(e.target.value)}
                  placeholder="e.g., https://example.com/products or /inventory/ABC123"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#030822] text-gray-900 bg-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Can be full URL (https://...) or relative path (/inventory/ABC123)
                </p>
              </div>

              {/* Preview */}
              {ctaText && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview:
                  </label>
                  <a
                    href="#"
                    className="inline-block px-6 py-3 bg-[#030822] text-white rounded font-semibold hover:bg-[#020615] transition-colors pointer-events-none"
                  >
                    {ctaText}
                  </a>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6 justify-end">
              <button
                onClick={() => {
                  setShowCtaModal(false);
                  setCtaText("");
                  setCtaUrl("");
                }}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={insertCtaButton}
                disabled={!ctaText.trim() || !ctaUrl.trim()}
                className="px-4 py-2 bg-[#030822] text-white rounded hover:bg-[#020615] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Insert Button
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
