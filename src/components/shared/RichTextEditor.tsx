"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useState } from "react";
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
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
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
}: RichTextEditorProps) {
  const [showCtaModal, setShowCtaModal] = useState(false);
  const [ctaText, setCtaText] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");

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
      alert("Please enter both button text and URL");
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

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className={`border border-gray-300 rounded-none bg-white ${className}`}>
      {/* Toolbar - Sticky at top of editor */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 p-2 border-b border-gray-300 bg-gray-50">
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
          onClick={addLink}
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
      <div className="max-h-96 overflow-y-auto">
        <EditorContent
          editor={editor}
          className="prose max-w-none p-4 min-h-[200px] bg-white focus:outline-none text-gray-900"
        />
      </div>

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
