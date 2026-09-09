"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Loader2 } from "lucide-react";
import { marcellus, jost } from "@/lib/fonts";

type Props = {
  open: boolean;
  title: string;
  /** What will happen, in plain terms. Keep it to one or two sentences. */
  message: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Red treatment for destructive actions such as deleting an article. */
  tone?: "default" | "danger";
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * Replaces window.confirm().
 *
 * The native dialog blocks the whole tab, cannot be styled, and on some
 * browsers is suppressed entirely — which silently turned "delete" into a
 * no-op. This keeps the same blocking intent while staying inside the app's
 * own visual language and remaining keyboard accessible.
 */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
  busy = false,
  onConfirm,
  onCancel,
}: Props) {
  const confirmRef = useRef<HTMLButtonElement | null>(null);

  // Focus the confirm action so the dialog is operable from the keyboard the
  // moment it opens, and close on Escape the way a native dialog would.
  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, busy, onCancel]);

  if (!open || typeof document === "undefined") return null;

  const isDanger = tone === "danger";

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !busy) onCancel();
      }}
    >
      <div className="w-full max-w-md bg-white shadow-xl">
        <div className="flex gap-4 p-6">
          <div
            className={`mt-0.5 shrink-0 ${isDanger ? "text-red-600" : "text-[#c89e3a]"}`}
            aria-hidden="true"
          >
            <AlertTriangle size={22} />
          </div>
          <div className="min-w-0">
            <h2
              id="confirm-dialog-title"
              className={`text-xl text-[#2d2d2d] ${marcellus.className}`}
            >
              {title}
            </h2>
            <div className={`mt-2 text-sm leading-relaxed text-gray-600 ${jost.className}`}>
              {message}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className={`px-5 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 ${jost.className}`}
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className={`inline-flex items-center gap-2 px-5 py-2 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isDanger
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#c89e3a] hover:bg-[#9d7400]"
            } ${jost.className}`}
          >
            {busy && <Loader2 size={16} className="animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
