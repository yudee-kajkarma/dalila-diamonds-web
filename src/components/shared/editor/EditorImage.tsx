"use client";

import Image, { type ImageOptions } from "@tiptap/extension-image";
import {
  NodeViewWrapper,
  ReactNodeViewRenderer,
  type NodeViewProps,
} from "@tiptap/react";
import { Trash2, Pencil, AlertTriangle } from "lucide-react";
import { jost } from "@/lib/fonts";

/**
 * Image node with visible controls.
 *
 * The plain Image extension renders a bare <img> that can only be removed by
 * placing the caret next to it and pressing Backspace — not discoverable, and
 * easy to get wrong in a long article. This wraps the image in a node view with
 * an explicit Remove button and an Edit alt text button.
 *
 * Missing alt text is surfaced on the image itself rather than left silent,
 * since every SEO content package requires it.
 */
/** Opens the host's alt-text dialog and applies whatever it returns. */
export type RequestAltText = (
  current: string,
  apply: (next: string) => void,
) => void;

function EditorImageView({
  node,
  deleteNode,
  updateAttributes,
  editor,
  extension,
}: NodeViewProps) {
  const src = node.attrs.src as string;
  const alt = (node.attrs.alt as string) || "";
  const isEditable = editor.isEditable;

  const editAlt = () => {
    // The host supplies the dialog, so the node view owns no modal state.
    const request = extension.options.onRequestAltText as RequestAltText | null;
    request?.(alt, (next) => updateAttributes({ alt: next }));
  };

  return (
    <NodeViewWrapper
      className="relative my-4 inline-block max-w-full group/image"
      data-drag-handle
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`max-w-full h-auto ${
          alt ? "" : "ring-2 ring-amber-400 ring-offset-2"
        }`}
      />

      {isEditable && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/image:opacity-100 focus-within:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={editAlt}
            className={`inline-flex items-center gap-1 px-2 py-1 text-xs bg-white/95 text-gray-700 shadow hover:bg-[#c89e3a] hover:text-white transition-colors ${jost.className}`}
            title="Edit alt text"
          >
            <Pencil size={13} />
            Alt text
          </button>
          <button
            type="button"
            onClick={() => deleteNode()}
            className={`inline-flex items-center gap-1 px-2 py-1 text-xs bg-white/95 text-red-600 shadow hover:bg-red-600 hover:text-white transition-colors ${jost.className}`}
            title="Remove image"
          >
            <Trash2 size={13} />
            Remove
          </button>
        </div>
      )}

      {isEditable && !alt && (
        <p
          className={`mt-1 inline-flex items-center gap-1 text-xs text-amber-700 ${jost.className}`}
        >
          <AlertTriangle size={13} />
          No alt text. Add it so screen readers and search engines can read this image.
        </p>
      )}
    </NodeViewWrapper>
  );
}

/**
 * Image extension wired to the node view above. Behaves exactly like the
 * standard Image node in terms of schema and serialised HTML, so stored content
 * is unchanged — only the editing affordances differ.
 */
export const EditorImage = Image.extend<
  ImageOptions & { onRequestAltText: RequestAltText | null }
>({
  addOptions() {
    // parent() is typed as possibly-undefined, which would make every inherited
    // option optional and no longer satisfy ImageOptions.
    const parent = this.parent?.() as ImageOptions;
    return {
      ...parent,
      onRequestAltText: null,
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(EditorImageView);
  },
});

export default EditorImage;
