"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, RotateCcw, Trash2, AlertTriangle, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { marcellus, jost } from "@/lib/fonts";
import { blogApi } from "@/lib/api";
import type { Blog } from "@/services/api/types/user.types";

type DeletedBlog = {
  id: string;
  title: string;
  slug: string;
  language: string;
  updatedAt: string | null;
};

function formatDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
}

/**
 * Confirmation for an irreversible delete.
 *
 * Deliberately harder than the ordinary confirm dialog: the article's title has
 * to be typed. Everything else in this admin area is recoverable, so a single
 * mistaken click should not be able to destroy a document outright.
 */
function PermanentDeleteDialog({
  blog,
  busy,
  onConfirm,
  onCancel,
}: {
  blog: DeletedBlog | null;
  busy: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setTyped("");
  }, [blog?.id]);

  if (!blog || typeof document === "undefined") return null;

  const matches = typed.trim() === blog.title.trim();

  return createPortal(
    <div
      className="fixed inset-0 z-[210] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !busy) onCancel();
      }}
    >
      <div className="w-full max-w-lg bg-white shadow-xl">
        <div className="flex gap-4 p-6">
          <AlertTriangle size={22} className="mt-0.5 shrink-0 text-red-600" />
          <div className="min-w-0">
            <h2 className={`text-xl text-[#2d2d2d] ${marcellus.className}`}>
              Delete permanently?
            </h2>
            <div className={`mt-2 space-y-3 text-sm leading-relaxed text-gray-600 ${jost.className}`}>
              <p>
                This removes the document from the database. It cannot be restored
                from the recycle bin, and the migration backups will not bring it
                back either.
              </p>
              <p>
                Type the article title to confirm:
                <br />
                <span className="font-medium text-gray-800">{blog.title}</span>
              </p>
              <input
                type="text"
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                disabled={busy}
                placeholder="Type the title exactly"
                className={`w-full border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 ${jost.className}`}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className={`border border-gray-300 px-5 py-2 text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 ${jost.className}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!matches || busy}
            className={`inline-flex items-center gap-2 bg-red-600 px-5 py-2 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 ${jost.className}`}
          >
            {busy && <Loader2 size={16} className="animate-spin" />}
            {busy ? "Deleting" : "Delete permanently"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/**
 * Recycle bin for soft-deleted articles.
 *
 * Deleting an article only sets isDeleted, so until now those documents were
 * invisible and unrecoverable through the UI. This lists them, restores them,
 * and offers a permanent delete for the ones that should really be gone.
 *
 * Loaded on demand from the admin endpoint, which is the only one that returns
 * deleted documents and needs a token, so it cannot come from the server
 * component that renders the live table.
 */
export default function DeletedBlogsPanel({ onRestored }: { onRestored: () => void }) {
  const [blogs, setBlogs] = useState<DeletedBlog[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [pendingPurge, setPendingPurge] = useState<DeletedBlog | null>(null);
  const [isPurging, setIsPurging] = useState(false);

  const load = useCallback(async () => {
    setBlogs(null);
    setLoadError(null);
    try {
      // scope=deleted so the server returns only the recycle bin, rather than
      // every document for the client to sift through.
      const deleted = (await blogApi.getAllAdmin("deleted")) as Blog[];
      setBlogs(
        deleted
          .map((b) => ({
            id: b._id || "",
            title: b.title || "(untitled)",
            slug: b.customSlug || "",
            language: b.language || "—",
            updatedAt: b.updatedAt || null,
          }))
          .sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || "")),
      );
    } catch (error) {
      setBlogs([]);
      setLoadError(
        error instanceof Error ? error.message : "Could not load deleted articles.",
      );
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const restore = async (blog: DeletedBlog) => {
    setBusyId(blog.id);
    try {
      const response = await blogApi.restore(blog.id);
      if (response?.success) {
        toast.success(`"${blog.title}" restored.`);
        await load();
        onRestored();
      } else {
        toast.error("Could not restore the article.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not restore the article.",
      );
    } finally {
      setBusyId(null);
    }
  };

  const purge = async () => {
    if (!pendingPurge) return;
    setIsPurging(true);
    try {
      const response = await blogApi.deletePermanently(pendingPurge.id);
      if (response?.success) {
        toast.success(`"${pendingPurge.title}" permanently deleted.`);
        setPendingPurge(null);
        await load();
      } else {
        toast.error("Could not delete the article.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not delete the article.",
      );
    } finally {
      setIsPurging(false);
    }
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <p className={`text-sm text-gray-600 ${jost.className}`}>
          {blogs === null
            ? "Loading deleted articles"
            : `${blogs.length} deleted ${blogs.length === 1 ? "document" : "documents"}. Restoring puts one back on the site immediately.`}
        </p>
        <button
          type="button"
          onClick={() => void load()}
          className={`inline-flex items-center gap-2 border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 ${jost.className}`}
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {blogs === null && (
        <p
          className={`flex items-center justify-center gap-2 px-4 py-12 text-sm text-gray-600 ${jost.className}`}
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading
        </p>
      )}

      {loadError && (
        <p className={`px-4 py-12 text-center text-sm text-red-600 ${jost.className}`}>
          {loadError}
        </p>
      )}

      {!loadError && blogs !== null && blogs.length === 0 && (
        <p className={`px-4 py-12 text-center text-sm text-gray-500 ${jost.className}`}>
          Nothing has been deleted.
        </p>
      )}

      {blogs !== null && blogs.length > 0 && (
        <table className={`w-full min-w-[800px] text-sm ${jost.className}`}>
          <thead className="border-b border-gray-200 bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Article</th>
              <th className="w-[90px] px-4 py-3 text-left font-semibold">Language</th>
              <th className="w-[110px] px-4 py-3 text-left font-semibold">Deleted</th>
              <th className="w-[220px] px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-b border-gray-100 hover:bg-[#faf9f6]">
                <td className="px-4 py-3">
                  <div className="font-medium text-[#2d2d2d]">{blog.title}</div>
                  <div className="mt-0.5 text-xs text-gray-500">/{blog.slug}</div>
                </td>
                <td className="px-4 py-3 uppercase text-gray-600">{blog.language}</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(blog.updatedAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => void restore(blog)}
                      disabled={busyId === blog.id}
                      className={`inline-flex items-center gap-1.5 border border-[#c89e3a] px-3 py-1.5 text-[#9d7400] transition-colors hover:bg-[#c89e3a] hover:text-white disabled:opacity-50 ${jost.className}`}
                    >
                      {busyId === blog.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <RotateCcw size={14} />
                      )}
                      Restore
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingPurge(blog)}
                      className={`inline-flex items-center gap-1.5 border border-red-300 px-3 py-1.5 text-red-600 transition-colors hover:bg-red-600 hover:text-white ${jost.className}`}
                    >
                      <Trash2 size={14} />
                      Delete forever
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <PermanentDeleteDialog
        blog={pendingPurge}
        busy={isPurging}
        onConfirm={() => void purge()}
        onCancel={() => setPendingPurge(null)}
      />
    </div>
  );
}
