/**
 * Blog Service ,Handles blog management operations
 */

import apiClient from "../base/apiClient";
import { getAuthToken } from "../base/authHandler";
import { handleApiError } from "../base/errorHandler";
import type { Blog, BlogPaginationData } from "../types/user.types";

/**
 * Thrown when the API refuses a save because another live article already owns
 * the slug. Carries that article so the editor can offer to open it instead of
 * just reporting a failure.
 */
export class BlogSlugConflictError extends Error {
  constructor(
    message: string,
    public readonly existing: { _id: string; title: string; language?: string },
  ) {
    super(message);
    this.name = "BlogSlugConflictError";
  }
}

/** Pull the 409 payload off an axios error, if that is what this is. */
function asSlugConflict(error: unknown): BlogSlugConflictError | null {
  const response = (error as {
    response?: {
      status?: number;
      data?: { message?: string; conflict?: { _id: string; title: string; language?: string } };
    };
  })?.response;

  if (response?.status !== 409 || !response.data?.conflict) return null;
  return new BlogSlugConflictError(
    response.data.message || "That URL is already in use.",
    response.data.conflict,
  );
}

interface BlogResponse {
  success: boolean;
  message: string;
  data: Blog;
}

// Get all blogs (Public - non-deleted only) with pagination
export const getAllBlogs = async (params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  language?: string;
}): Promise<BlogPaginationData | null> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);
    if (params?.language) queryParams.append("language", params.language);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/api/blogs?${queryString}` : "/api/blogs";

    const response = await apiClient.get<BlogPaginationData>(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
};

// Get single blog by ID (Public)
export const getBlogById = async (blogId: string): Promise<BlogResponse | null> => {
  try {
    const response = await apiClient.get<BlogResponse>(`/api/blogs/${blogId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

// Admin: Get a language version of an article.
// Prefers translationGroupId (survives a translation having its own localized
// slug); falls back to baseSlug for blogs created before groups existed.
export const getBlogByBaseSlugAndLanguage = async (
  baseSlug: string,
  language: string,
  translationGroupId?: string,
): Promise<BlogResponse | null> => {
  try {
    const token = getAuthToken();
    if (!token || token.trim() === "") {
      throw new Error("Unauthorized. Please log in.");
    }

    const queryParams = new URLSearchParams({
      baseSlug,
      language,
    });
    if (translationGroupId) {
      queryParams.append("translationGroupId", translationGroupId);
    }
    const response = await apiClient.get<BlogResponse>(
      `/api/admin/blogs/by-slug?${queryParams.toString()}`,
    );
    return response.data;
  } catch (error: unknown) {
    const status =
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: { status?: number } }).response?.status === "number"
        ? (error as { response: { status: number } }).response.status
        : undefined;
    if (status === 404) {
      return null;
    }
    console.error("Error fetching blog by base slug/language:", error);
    return null;
  }
};

// Admin: Create new blog
export const createBlog = async (data: {
  title: string;
  h2Subtitle?: string;
  customSlug?: string;
  language?: string;
  translationGroupId?: string;
  featuredImage?: string; 
  featuredImageAlt?: string; 
  canonicalUrl?: string;
  metaRobots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  breadcrumbTitle?: string;
  lastReviewedAt?: string;
  datePublished?: string;
  excerpt?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  description?: string; 
  content?: string; 
  metaTitle?: string; 
  metaDescription?: string; 
}): Promise<BlogResponse> => {
  try {
    const token = getAuthToken();
    if (!token || token.trim() === "") {
      throw new Error("Unauthorized. Please log in.");
    }

    console.log("Creating blog with data:", data);

    const response = await apiClient.post<BlogResponse>("/api/admin/blogs", data);

    console.log("Blog created successfully:", response.data);
    return response.data;
  } catch (error) {
    const conflict = asSlugConflict(error);
    if (conflict) throw conflict;

    console.error("Create blog error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to create blog");
  }
};

// Admin: Update blog
export const updateBlog = async (
  blogId: string,
  data: {
    title?: string; // H1 Title - Blog Title
    h2Subtitle?: string; // H2 Subtitle - Blog Subtitle
    customSlug?: string; // Custom slug (optional - auto-generated from title if empty)
    language?: string; // Blog content language (en | de | fr | it | es)
    featuredImage?: string; // Featured image URL
    featuredImageAlt?: string; // Alt text for the featured image
    canonicalUrl?: string;
    metaRobots?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    breadcrumbTitle?: string;
    lastReviewedAt?: string;
    datePublished?: string;
    excerpt?: string;
    primaryKeyword?: string;
    secondaryKeywords?: string[];
    description?: string; // Kept for backward compatibility
    content?: string; // Rich text content
    metaTitle?: string; // Meta title (optional)
    metaDescription?: string; // Meta description (optional)
    /**
     * Sent as "reviewed" when a human saves a machine translation. That save
     * is the whole review flow — a separate button gets forgotten, and the
     * flag would then never become true.
     */
    translationStatus?: "machine" | "reviewed";
  }
): Promise<BlogResponse> => {
  try {
    const token = getAuthToken();
    if (!token || token.trim() === "") {
      throw new Error("Unauthorized. Please log in.");
    }

    const response = await apiClient.put<BlogResponse>(`/api/admin/blogs/${blogId}`, data);
    return response.data;
  } catch (error) {
    const conflict = asSlugConflict(error);
    if (conflict) throw conflict;

    console.error("Update blog error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to update blog");
  }
};

// Admin: Delete blog
export const deleteBlog = async (blogId: string) => {
  try {
    const token = getAuthToken();
    if (!token || token.trim() === "") {
      throw new Error("Unauthorized. Please log in.");
    }

    const response = await apiClient.delete(`/api/admin/blogs/${blogId}`);
    return response.data;
  } catch (error) {
    console.error("Delete blog error:", error);
    return null;
  }
};

interface BlogImageUploadResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
    key: string;
    fileName: string;
    fileSize: number;
  };
}

/**
 * Admin: upload a blog image and get back its permanent public URL.
 *
 * Featured images used to be stored as base64 data URIs on the blog document.
 * A data URI cannot be used as an og:image and bloated every record, so images
 * now live in the public asset bucket and only the URL is stored.
 */
export const uploadBlogImage = async (file: File): Promise<string> => {
  try {
    const token = getAuthToken();
    if (!token || token.trim() === "") {
      throw new Error("Unauthorized. Please log in.");
    }

    const formData = new FormData();
    formData.append("image", file);

    // The shared client defaults to application/json. Naming multipart here
    // makes axios attach the boundary instead of sending the default type,
    // and uploads need more headroom than the client's 30s default.
    const response = await apiClient.post<BlogImageUploadResponse>(
      "/api/admin/blogs/images",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 120000,
      },
    );

    const url = response.data?.data?.url;
    if (!url) {
      throw new Error("Upload succeeded but no image URL was returned");
    }
    return url;
  } catch (error) {
    console.error("Upload blog image error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to upload image");
  }
};

interface AdminBlogListResponse {
  success: boolean;
  message: string;
  data: Blog[];
}

/**
 * Admin: blogs from the admin endpoint, which is the only one that can return
 * soft-deleted documents.
 *
 * `scope: "deleted"` filters server-side. Fetching everything and filtering in
 * the client meant downloading all ~660 documents to display the few dozen in
 * the recycle bin, which was slow enough to fail.
 */
export const getAllBlogsAdmin = async (
  scope: "all" | "deleted" = "all",
): Promise<Blog[]> => {
  try {
    const token = getAuthToken();
    if (!token || token.trim() === "") {
      throw new Error("Unauthorized. Please log in.");
    }

    const response = await apiClient.get<AdminBlogListResponse>(
      `/api/admin/blogs/all?scope=${scope}`,
    );
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching admin blogs:", error);
    throw error instanceof Error ? error : new Error("Failed to fetch blogs");
  }
};

/** Admin: bring a soft-deleted blog back. */
export const restoreBlog = async (blogId: string): Promise<BlogResponse> => {
  try {
    const token = getAuthToken();
    if (!token || token.trim() === "") {
      throw new Error("Unauthorized. Please log in.");
    }

    const response = await apiClient.patch<BlogResponse>(
      `/api/admin/blogs/${blogId}/restore`,
    );
    return response.data;
  } catch (error) {
    console.error("Restore blog error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to restore blog");
  }
};

/**
 * Admin: remove a blog permanently. There is no recovery.
 *
 * The server only accepts this for blogs that are already soft-deleted, so a
 * live article cannot be destroyed in a single call.
 */
export const permanentlyDeleteBlog = async (blogId: string): Promise<BlogResponse> => {
  try {
    const token = getAuthToken();
    if (!token || token.trim() === "") {
      throw new Error("Unauthorized. Please log in.");
    }

    const response = await apiClient.delete<BlogResponse>(
      `/api/admin/blogs/${blogId}/permanent`,
    );
    return response.data;
  } catch (error) {
    console.error("Permanent delete error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to permanently delete blog");
  }
};

export type TranslationTarget = "de" | "fr" | "it" | "es" | "nl";

export type TranslateResult = {
  blogId: string;
  language: string;
  created: boolean;
  overwrote: boolean;
  translationStatus: "machine";
};

/** The target language already has a version; replacing it must be deliberate. */
export class TranslationConflictError extends Error {
  constructor(
    message: string,
    public readonly existing: {
      _id: string;
      title: string;
      language: string;
      updatedAt?: string;
    },
  ) {
    super(message);
    this.name = "TranslationConflictError";
  }
}

/** The model's output failed validation twice. Nothing was written. */
export class TranslationRejectedError extends Error {
  constructor(
    message: string,
    public readonly problems: string[],
  ) {
    super(message);
    this.name = "TranslationRejectedError";
  }
}

/** The server has no OPENAI_API_KEY, so no amount of retrying will help. */
export class TranslationUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TranslationUnavailableError";
  }
}

/**
 * Admin: translate the English article into one language.
 *
 * One language per call. That is what lets the panel show progress per
 * language and retry a single failure rather than the whole article, and it
 * means each language is saved the moment it succeeds.
 */
export const translateBlog = async (
  blogId: string,
  targetLanguage: TranslationTarget,
  overwrite = false,
): Promise<TranslateResult> => {
  const token = getAuthToken();
  if (!token || token.trim() === "") {
    throw new Error("Unauthorized. Please log in.");
  }

  try {
    const response = await apiClient.post<{ success: boolean; data: TranslateResult }>(
      `/api/admin/blogs/${blogId}/translate`,
      { targetLanguage, overwrite },
      // A translation is a long model call, far beyond the client default.
      { timeout: 300000 },
    );
    return response.data.data;
  } catch (error: unknown) {
    const response = (error as {
      response?: {
        status?: number;
        data?: {
          message?: string;
          problems?: string[];
          existing?: { _id: string; title: string; language: string; updatedAt?: string };
        };
      };
    })?.response;

    // Distinct types, because each needs a different offer in the panel:
    // replace what exists, show what the model got wrong, or tell the admin
    // the server is not configured.
    if (response?.status === 409 && response.data?.existing) {
      throw new TranslationConflictError(
        response.data.message || "That language already has a version.",
        response.data.existing,
      );
    }
    if (response?.status === 422) {
      throw new TranslationRejectedError(
        response.data?.message || "The translation could not be validated.",
        response.data?.problems || [],
      );
    }
    if (response?.status === 503) {
      throw new TranslationUnavailableError(
        response.data?.message || "Translation is not configured on this server.",
      );
    }

    console.error("Translate blog error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to translate this article");
  }
};

/**
 * Admin: put back the body a translation replaced.
 *
 * `blogId` is the TRANSLATED version, not the English source.
 */
export const restorePreviousContent = async (
  blogId: string,
): Promise<{ blogId: string }> => {
  const token = getAuthToken();
  if (!token || token.trim() === "") {
    throw new Error("Unauthorized. Please log in.");
  }

  try {
    const response = await apiClient.post<{ success: boolean; data: { blogId: string } }>(
      `/api/admin/blogs/${blogId}/restore-previous`,
    );
    return response.data.data;
  } catch (error) {
    console.error("Restore previous content error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to restore the previous version");
  }
};
