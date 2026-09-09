"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, AlertTriangle, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { marcellus, jost } from "@/lib/fonts";
import { blogApi } from "@/lib/api";
import type { BlogLanguage } from "@/lib/blogLanguages";

type Candidate = {
  id: string;
  title: string;
  contentLength: number;
  preview: string;
  createdAt: string | null;
  updatedAt: string | null;
  metaTitle: string;
  hasImage: boolean;
};

type Props = {
  open: boolean;
  articleTitle: string;
  language: BlogLanguage;
  ids: string[];
  /** Awaited before the dialog closes, so it never hands back to a stale table. */
  onResolved: () => void | Promise<void>;
  onCancel: () => void;
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDateTime(value: string | null): string {
  if (!value) return "unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "unknown";
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Resolve two documents competing for one URL.
 *
 * When a language holds more than one document, which of them the site serves
 * depends on result ordering, so the page can change without anyone editing
 * it. Rather than needing a migration script and a developer, this loads the
 * competing documents, shows what actually differs, and lets the admin keep
 * one. The others are soft-deleted, so the decision is reversible.
 */
export default function DuplicateResolver({
  open,
  articleTitle,
  language,
  ids,
  onResolved,
  onCancel,
}: Props) {
  const [candidates, setCandidates] = useState<Candidate[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [keepId, setKeepId] = useState<string | null>(null);
  const [isResolving, setIsResolving] = useState(false);

  useEffect(() => {
    if (!open) {
      setCandidates(null);
      setKeepId(null);
      setLoadError(null);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        // The list endpoint omits the body, so each candidate is fetched in
        // full — there are only ever two or three.
        const loaded = await Promise.all(
          ids.map(async (id) => {
            const response = await blogApi.getById(id);
            const data = response?.data;
            const content = data?.content || "";
            return {
              id,
              title: data?.title || "(untitled)",
              contentLength: content.length,
              preview: stripHtml(content).slice(0, 240),
              createdAt: data?.createdAt || null,
              updatedAt: data?.updatedAt || null,
              metaTitle: data?.metaTitle || "",
              hasImage: Boolean(data?.featuredImage?.trim()),
            } as Candidate;
          }),
        );
        if (cancelled) return;

        const sorted = loaded.sort(
          (a, b) =>
            new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime(),
        );
        setCandidates(sorted);
        // Default to keeping the original: where the copies are identical it is
        // the one that has been live longest.
        setKeepId(sorted[0]?.id ?? null);
      } catch {
        if (!cancelled) setLoadError("Could not load the duplicate versions.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, ids]);

  if (!open || typeof document === "undefined") return null;

  const identical =
    candidates !== null &&
    candidates.length > 1 &&
    new Set(candidates.map((c) => `${c.contentLength}::${c.preview}`)).size === 1;

  const resolve = async () => {
    if (!keepId || !candidates) return;
    const toDelete = candidates.filter((c) => c.id !== keepId);
    setIsResolving(true);
    try {
      for (const candidate of toDelete) {
        const response = await blogApi.delete(candidate.id);
        if (!response) throw new Error("Delete failed");
      }
      toast.success(
        `Kept one ${language.toUpperCase()} version, removed ${toDelete.length}.`,
      );
      // Hold the busy state until the caller has reloaded, otherwise the dialog
      // closes onto rows that still list the document just removed.
      await onResolved();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not resolve the duplicate.",
      );
    } finally {
      setIsResolving(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isResolving) onCancel();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-white shadow-xl">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className={`text-xl text-[#2d2d2d] ${marcellus.className}`}>
            Two {language.toUpperCase()} versions of this article
          </h2>
          <p className={`mt-1 text-sm text-gray-600 ${jost.className}`}>
            <span className="font-medium text-gray-800">{articleTitle}</span> has{" "}
            {ids.length} documents for {language.toUpperCase()}. They compete for the
            same URL, so which one visitors see is decided by result ordering rather
            than by you. Keep one; the rest are removed and can be restored.
          </p>
        </div>

        {loadError && (
          <p className={`px-6 py-8 text-center text-sm text-red-600 ${jost.className}`}>
            {loadError}
          </p>
        )}

        {!candidates && !loadError && (
          <p
            className={`flex items-center justify-center gap-2 px-6 py-12 text-sm text-gray-600 ${jost.className}`}
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading both versions
          </p>
        )}

        {candidates && (
          <>
            {identical && (
              <p
                className={`mx-6 mt-5 flex items-start gap-2 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 ${jost.className}`}
              >
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                These versions look identical. Almost certainly a double-submit, so
                keeping the original is the safe choice.
              </p>
            )}

            <div className="space-y-4 p-6">
              {candidates.map((candidate, index) => {
                const isKept = keepId === candidate.id;
                return (
                  <label
                    key={candidate.id}
                    className={`block cursor-pointer border p-4 transition-colors ${
                      isKept
                        ? "border-[#c89e3a] bg-[#c89e3a]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="keep-version"
                        checked={isKept}
                        onChange={() => setKeepId(candidate.id)}
                        disabled={isResolving}
                        className="mt-1 accent-[#c89e3a]"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`font-medium text-[#2d2d2d] ${jost.className}`}>
                            {isKept ? "Keep this one" : "Remove this one"}
                          </span>
                          {index === 0 && (
                            <span
                              className={`border border-gray-300 px-1.5 py-0.5 text-[11px] uppercase text-gray-500 ${jost.className}`}
                            >
                              original
                            </span>
                          )}
                        </div>

                        <p className={`mt-1 text-sm text-gray-800 ${jost.className}`}>
                          {candidate.title}
                        </p>

                        <dl
                          className={`mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-gray-600 sm:grid-cols-4 ${jost.className}`}
                        >
                          <div>
                            <dt className="text-gray-400">Created</dt>
                            <dd>{formatDateTime(candidate.createdAt)}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-400">Updated</dt>
                            <dd>{formatDateTime(candidate.updatedAt)}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-400">Body length</dt>
                            <dd>{candidate.contentLength.toLocaleString()} chars</dd>
                          </div>
                          <div>
                            <dt className="text-gray-400">Image</dt>
                            <dd>{candidate.hasImage ? "yes" : "no"}</dd>
                          </div>
                        </dl>

                        <p
                          className={`mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500 ${jost.className}`}
                        >
                          {candidate.preview || "(no body content)"}
                        </p>

                        <a
                          href={`/blogs/editor?id=${encodeURIComponent(candidate.id)}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`mt-2 inline-flex items-center gap-1 text-xs text-[#9d7400] hover:underline ${jost.className}`}
                        >
                          <ExternalLink size={12} />
                          Open in the editor
                        </a>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </>
        )}

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isResolving}
            className={`px-5 py-2 border border-gray-300 text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 ${jost.className}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={resolve}
            disabled={!keepId || isResolving || !candidates}
            className={`inline-flex items-center gap-2 bg-[#c89e3a] px-5 py-2 text-white transition-colors hover:bg-[#9d7400] disabled:cursor-not-allowed disabled:opacity-50 ${jost.className}`}
          >
            {isResolving && <Loader2 size={16} className="animate-spin" />}
            {isResolving ? "Resolving" : "Keep selected, remove the rest"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
