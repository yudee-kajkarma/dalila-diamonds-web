"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, Check, AlertTriangle, Languages } from "lucide-react";
import { marcellus, jost } from "@/lib/fonts";
import { blogApi } from "@/lib/api";
import {
  TranslationConflictError,
  TranslationRejectedError,
  TranslationUnavailableError,
  type TranslationTarget,
} from "@/services/api/admin/blogService";
import { BLOG_LANGUAGE_OPTIONS, type BlogLanguage } from "@/lib/blogLanguages";
import type { LanguageState } from "@/lib/translationState";

export type TranslateTargetState = { language: BlogLanguage; state: LanguageState };

type RowStatus =
  | { kind: "idle" }
  | { kind: "running" }
  | { kind: "done"; replaced: boolean }
  | { kind: "failed"; reason: string; retryable: boolean };

type Props = {
  open: boolean;
  /** The English document. Translations are always made from it. */
  sourceBlogId: string;
  articleTitle: string;
  targets: TranslateTargetState[];
  /** Awaited before the panel closes, so it never hands back to stale tabs. */
  onFinished: (completed: BlogLanguage[]) => void | Promise<void>;
  onClose: () => void;
};

const LABELS = new Map(BLOG_LANGUAGE_OPTIONS.map((o) => [o.code, o.label]));

/**
 * Choose languages, then watch them arrive.
 *
 * Requests run one at a time rather than in parallel: it keeps well inside the
 * rate limit, and it makes progress legible. Each language is written to the
 * database the moment it succeeds, so closing the tab after three keeps three
 * — only the one in flight is lost. That is the trade for having no job queue.
 */
export default function TranslatePanel({
  open,
  sourceBlogId,
  articleTitle,
  targets,
  onFinished,
  onClose,
}: Props) {
  const [selected, setSelected] = useState<Set<BlogLanguage>>(new Set());
  const [statuses, setStatuses] = useState<Record<string, RowStatus>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState<BlogLanguage[]>([]);

  // Empty languages are ticked, existing ones are not, so nothing that is
  // already published gets replaced by an absent-minded click.
  useEffect(() => {
    if (!open) return;
    setSelected(
      new Set(targets.filter((t) => t.state.health === "missing").map((t) => t.language)),
    );
    setStatuses({});
    setCompleted([]);
    setIsRunning(false);
  }, [open, targets]);

  // Escape closes, matching the other dialogs — but not mid-run, where it
  // would look like it had cancelled work that is still going.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isRunning) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, isRunning, onClose]);

  const replacingCount = useMemo(
    () =>
      targets.filter((t) => selected.has(t.language) && t.state.health !== "missing")
        .length,
    [targets, selected],
  );

  if (!open || typeof document === "undefined") return null;

  const toggle = (language: BlogLanguage) => {
    if (isRunning) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(language)) next.delete(language);
      else next.add(language);
      return next;
    });
  };

  const runOne = async (target: TranslateTargetState) => {
    const replacing = target.state.health !== "missing";
    setStatuses((prev) => ({ ...prev, [target.language]: { kind: "running" } }));

    try {
      await blogApi.translate(
        sourceBlogId,
        target.language as TranslationTarget,
        replacing,
      );
      setStatuses((prev) => ({
        ...prev,
        [target.language]: { kind: "done", replaced: replacing },
      }));
      setCompleted((prev) =>
        prev.includes(target.language) ? prev : [...prev, target.language],
      );
    } catch (error) {
      // Each failure gets the offer that fits it. A missing API key is not
      // something a Retry button can fix, so it does not get one.
      let reason = "Translation failed.";
      let retryable = true;

      if (error instanceof TranslationUnavailableError) {
        reason = error.message;
        retryable = false;
      } else if (error instanceof TranslationRejectedError) {
        reason = error.problems[0]
          ? `Rejected: ${error.problems[0]}`
          : error.message;
      } else if (error instanceof TranslationConflictError) {
        reason = "A version already exists. Tick this language to replace it.";
        retryable = false;
      } else if (error instanceof Error) {
        reason = error.message;
      }

      setStatuses((prev) => ({
        ...prev,
        [target.language]: { kind: "failed", reason, retryable },
      }));
    }
  };

  const run = async () => {
    setIsRunning(true);
    for (const target of targets.filter((t) => selected.has(t.language))) {
      await runOne(target);
    }
    setIsRunning(false);
  };

  const finish = async () => {
    await onFinished(completed);
    onClose();
  };

  const selectedCount = selected.size;
  const hasRun = Object.keys(statuses).length > 0;
  const failedCount = Object.values(statuses).filter((s) => s.kind === "failed").length;

  const describeExisting = (target: TranslateTargetState) => {
    if (target.state.health === "missing") return "No version yet";
    if (target.state.stale) return "Version exists, but the English article has changed";
    if (target.state.health === "machine") return "Version exists, not yet reviewed";
    if (target.state.health === "reviewed") return "Version exists, reviewed";
    return "Version exists";
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[220] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Translate this article"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isRunning) onClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white shadow-xl">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2
            className={`flex items-center gap-2 text-xl text-[#2d2d2d] ${marcellus.className}`}
          >
            <Languages size={20} className="text-[#c89e3a]" />
            Translate this article
          </h2>
          <p className={`mt-1 truncate text-sm text-gray-600 ${jost.className}`}>
            From the English version of{" "}
            <span className="font-medium text-gray-800">{articleTitle}</span>
          </p>
        </div>

        <div className={`px-6 py-4 ${jost.className}`}>
          <ul className="divide-y divide-gray-100">
            {targets.map((target) => {
              const status = statuses[target.language] || { kind: "idle" };

              return (
                <li key={target.language} className="flex items-start gap-3 py-3">
                  <input
                    type="checkbox"
                    id={`translate-${target.language}`}
                    checked={selected.has(target.language)}
                    onChange={() => toggle(target.language)}
                    disabled={isRunning}
                    className="mt-1 h-4 w-4 shrink-0 accent-[#c89e3a]"
                  />

                  <label
                    htmlFor={`translate-${target.language}`}
                    className="min-w-0 flex-1 cursor-pointer"
                  >
                    <span className="font-medium text-[#2d2d2d]">
                      {LABELS.get(target.language) || target.language.toUpperCase()}
                    </span>
                    <span
                      className={`ml-2 text-sm ${
                        target.state.stale ? "text-amber-700" : "text-gray-500"
                      }`}
                    >
                      {describeExisting(target)}
                    </span>

                    {status.kind === "done" && (
                      <span className="mt-0.5 block text-sm text-green-700">
                        {status.replaced ? "Replaced." : "Created."} Review it before
                        it is trusted.
                      </span>
                    )}

                    {status.kind === "failed" && (
                      <span className="mt-0.5 flex items-start gap-1 text-sm text-red-600">
                        <AlertTriangle size={13} className="mt-0.5 shrink-0" />
                        <span>
                          {status.reason}
                          {status.retryable && (
                            <button
                              type="button"
                              onClick={() => void runOne(target)}
                              disabled={isRunning}
                              className="ml-1.5 underline hover:text-red-800 disabled:opacity-50"
                            >
                              Retry
                            </button>
                          )}
                        </span>
                      </span>
                    )}
                  </label>

                  <span className="mt-0.5 w-5 shrink-0 text-right">
                    {status.kind === "running" && (
                      <Loader2 size={16} className="animate-spin text-[#c89e3a]" />
                    )}
                    {status.kind === "done" && (
                      <Check size={16} className="text-green-600" />
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          {replacingCount > 0 && !hasRun && (
            <p className="mt-4 border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              {replacingCount === 1
                ? "One language already has a version and will be replaced."
                : `${replacingCount} languages already have versions and will be replaced.`}{" "}
              The current text is kept and can be restored from that language tab.
            </p>
          )}

          {isRunning && (
            <p className="mt-4 text-sm text-gray-600">
              Keep this tab open. Languages are saved one at a time as they
              finish, so anything already ticked green is safe.
            </p>
          )}

          {hasRun && !isRunning && failedCount > 0 && (
            <p className="mt-4 text-sm text-gray-600">
              {completed.length > 0
                ? `${completed.length} saved, ${failedCount} failed. The saved ones are already live.`
                : `${failedCount} failed. Nothing was written.`}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={hasRun && !isRunning ? () => void finish() : onClose}
            disabled={isRunning}
            className={`border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 ${jost.className}`}
          >
            {hasRun && !isRunning ? "Done" : "Cancel"}
          </button>
          <button
            type="button"
            onClick={() => void run()}
            disabled={isRunning || selectedCount === 0}
            className={`bg-[#c89e3a] px-5 py-2 text-white transition-colors hover:bg-[#9d7400] disabled:cursor-not-allowed disabled:opacity-50 ${jost.className}`}
          >
            {isRunning
              ? "Translating"
              : hasRun
                ? `Translate ${selectedCount} again`
                : `Translate ${selectedCount} ${selectedCount === 1 ? "language" : "languages"}`}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
