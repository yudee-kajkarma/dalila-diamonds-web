"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { marcellus, jost } from "@/lib/fonts";

export type InputDialogField = {
  name: string;
  label: string;
  placeholder?: string;
  /** Blocks submission while empty. */
  required?: boolean;
  helpText?: string;
  multiline?: boolean;
};

type Props = {
  open: boolean;
  title: string;
  description?: string;
  fields: InputDialogField[];
  initialValues?: Record<string, string>;
  submitLabel?: string;
  onSubmit: (values: Record<string, string>) => void;
  onCancel: () => void;
};

/**
 * Replaces window.prompt().
 *
 * The native prompt only handles one unlabelled field, cannot explain what the
 * value is for, and is blocked outright by some browsers — which meant an
 * image could be inserted with no alt text and no warning. This collects one
 * or more labelled values instead, so requirements like alt text can actually
 * be enforced and explained.
 */
export default function InputDialog({
  open,
  title,
  description,
  fields,
  initialValues,
  submitLabel = "Insert",
  onSubmit,
  onCancel,
}: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const firstFieldRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Reset to the caller's values each time the dialog opens, so a previous
  // entry never leaks into the next one.
  useEffect(() => {
    if (!open) return;
    const seeded: Record<string, string> = {};
    for (const field of fields) {
      seeded[field.name] = initialValues?.[field.name] ?? "";
    }
    setValues(seeded);
    // Defer so the input exists before focusing.
    const id = window.setTimeout(() => firstFieldRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open || typeof document === "undefined") return null;

  const missingRequired = fields.some(
    (field) => field.required && !(values[field.name] || "").trim(),
  );

  const submit = () => {
    if (missingRequired) return;
    const trimmed: Record<string, string> = {};
    for (const field of fields) {
      trimmed[field.name] = (values[field.name] || "").trim();
    }
    onSubmit(trimmed);
  };

  const inputClass = `w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c89e3a] bg-white text-gray-900 ${jost.className}`;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="input-dialog-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="w-full max-w-lg bg-white shadow-xl">
        <div className="px-6 pt-6">
          <h2
            id="input-dialog-title"
            className={`text-xl text-[#2d2d2d] ${marcellus.className}`}
          >
            {title}
          </h2>
          {description && (
            <p className={`mt-2 text-sm leading-relaxed text-gray-600 ${jost.className}`}>
              {description}
            </p>
          )}
        </div>

        <div className="space-y-4 p-6">
          {fields.map((field, index) => (
            <div key={field.name}>
              <label
                htmlFor={`input-dialog-${field.name}`}
                className={`block text-sm font-semibold text-gray-700 mb-2 ${jost.className}`}
              >
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>
              {field.multiline ? (
                <textarea
                  id={`input-dialog-${field.name}`}
                  ref={(el) => {
                    if (index === 0) firstFieldRef.current = el;
                  }}
                  value={values[field.name] || ""}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [field.name]: e.target.value }))
                  }
                  placeholder={field.placeholder}
                  className={`${inputClass} min-h-20`}
                />
              ) : (
                <input
                  id={`input-dialog-${field.name}`}
                  ref={(el) => {
                    if (index === 0) firstFieldRef.current = el;
                  }}
                  type="text"
                  value={values[field.name] || ""}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [field.name]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      submit();
                    }
                  }}
                  placeholder={field.placeholder}
                  className={inputClass}
                />
              )}
              {field.helpText && (
                <p className={`mt-1 text-xs text-gray-500 ${jost.className}`}>
                  {field.helpText}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className={`px-5 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors ${jost.className}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={missingRequired}
            className={`px-5 py-2 bg-[#c89e3a] text-white hover:bg-[#9d7400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${jost.className}`}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
