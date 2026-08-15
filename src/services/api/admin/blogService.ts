/**
 * Blog Service ,Handles blog management operations
 */

import apiClient from "../base/apiClient";
import { getAuthToken } from "../base/authHandler";
import { handleApiError } from "../base/errorHandler";
import type { Blog, BlogPaginationData } from "../types/user.types";

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
    description?: string; // Kept for backward compatibility
    content?: string; // Rich text content
    metaTitle?: string; // Meta title (optional)
    metaDescription?: string; // Meta description (optional)
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


