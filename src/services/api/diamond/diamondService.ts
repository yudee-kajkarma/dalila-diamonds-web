/**
 * Diamond Service , Handles all diamond-related API operations
 */

import { DiamondData } from "@/types/diamond.types";
import apiClient, { API_URL } from "../base/apiClient";
import { handleApiError } from "../base/errorHandler";
import type {
    ApiResponse,
    PaginatedResponse,
    DashboardStats,
} from "../types/api.types";
import type {
    Diamond,
    LimitedEditionDiamond,
    LimitedEditionFilters,
} from "../types/diamond.types";

// Get all diamonds with pagination
export const getAllDiamonds = async (params?: {
    page?: number;
    limit?: number;
}): Promise<ApiResponse<PaginatedResponse<Diamond>> | null> => {
    try {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());

        const url = queryParams.toString()
            ? `/api/diamonds?${queryParams}`
            : "/api/diamonds";
        const response =
            await apiClient.get<ApiResponse<PaginatedResponse<Diamond>>>(url);

        return response.data;
    } catch (error) {
        console.error("Get all diamonds error:", error);
        return null;
    }
};

// Get diamond by ID
export const getDiamondById = async (
    id: string,
): Promise<ApiResponse<Diamond> | null> => {
    try {
        const response = await apiClient.get<ApiResponse<Diamond>>(
            `/api/diamonds/${id}`,
        );
        return response.data;
    } catch (error) {
        console.error("Get diamond by ID error:", error);
        return null;
    }
};

// Get dashboard statistics
export const getDashboardStats =
    async (): Promise<ApiResponse<DashboardStats> | null> => {
        try {
            const response = await apiClient.get<ApiResponse<DashboardStats>>(
                "/api/diamonds/dashboard",
            );
            return response.data;
        } catch (error) {
            console.error("Get dashboard stats error:", error);
            return null;
        }
    };

// Sync diamonds from external API
export const syncDiamonds = async (credentials: {
    username: string;
    password: string;
}): Promise<ApiResponse<{ message: string }>> => {
    try {
        const response = await apiClient.post<ApiResponse<{ message: string }>>(
            "/api/diamonds/sync",
            credentials,
        );
        return response.data;
    } catch (error) {
        const apiError = handleApiError(error);
        return {
            success: false,
            error: apiError.message,
            message: apiError.message,
        };
    }
};

// Refresh diamonds data
export const refreshDiamonds = async (): Promise<
    ApiResponse<{ message: string }>
> => {
    try {
        const response = await apiClient.post<ApiResponse<{ message: string }>>(
            "/api/diamonds/refresh",
            {},
        );
        return response.data;
    } catch (error) {
        const apiError = handleApiError(error);
        return {
            success: false,
            error: apiError.message,
            message: apiError.message,
        };
    }
};

// Email diamond details
export const emailDiamonds = async (data: {
    stoneNumbers: string[];
    emails: string[];
}): Promise<
    ApiResponse<{
        totalRequested: number;
        totalFound: number;
        totalEmailed: number;
        foundStoneNumbers: string[];
        notFoundStoneNumbers: string[];
        result: string;
    }>
> => {
    try {
        const response = await apiClient.post<
            ApiResponse<{
                totalRequested: number;
                totalFound: number;
                totalEmailed: number;
                foundStoneNumbers: string[];
                notFoundStoneNumbers: string[];
                result: string;
            }>
        >("/api/diamonds/email", data);
        return response.data;
    } catch (error) {
        const apiError = handleApiError(error);
        throw new Error(apiError.message);
    }
};

// Get all spec requests (Admin)
export const getAllSpecRequests = async () => {
    try {
        const response = await apiClient.get("/api/diamonds/spec-requests/admin/all");
        return response.data;
    } catch (error) {
        console.error("Get spec requests error:", error);
        throw error;
    }
};

// Submit a diamond spec request (user, with optional image)
export const submitSpecRequest = async (formData: FormData) => {
    try {
        const response = await apiClient.post("/api/diamonds/spec-requests", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Submit spec request error:", error);
        throw error;
    }
};

// Get limited edition diamonds
export const getLimitedEditionDiamonds = async (): Promise<ApiResponse<{
    diamonds: LimitedEditionDiamond[];
    count: number;
}> | null> => {
    try {
        const response = await apiClient.get<
            ApiResponse<{ diamonds: LimitedEditionDiamond[]; count: number }>
        >("/api/diamonds/limited-edition");
        return response.data;
    } catch (error) {
        console.error("Get limited edition diamonds error:", error);
        return null;
    }
};

// Save limited edition filters
export const saveLimitedEditionFilters = async (
    filters: LimitedEditionFilters,
): Promise<ApiResponse<{
    diamonds: LimitedEditionDiamond[];
    count: number;
}> | null> => {
    try {
        const response = await apiClient.post<
            ApiResponse<{ diamonds: LimitedEditionDiamond[]; count: number }>
        >("/api/diamonds/limited-edition", filters);
        return response.data;
    } catch (error) {
        console.error("Save limited edition filters error:", error);
        return null;
    }
};

/**
 * Get public diamonds (safe data for non-logged-in users)
 */
export const getPublicDiamonds = async (params?: {
    page?: number;
    limit?: number;
    [key: string]: string | number | boolean | string[] | number[] | undefined;
}): Promise<ApiResponse<any>> => {
    try {
        const queryParams = new URLSearchParams();

        // Parameter name mapping for the safe API
        // Map frontend filter names to backend API parameter names
        const parameterMapping: { [key: string]: string } = {
            mincarats: "CARATS_MIN",
            maxcarats: "CARATS_MAX",
            shape: "SHAPE",
            color: "COLOR",
            clarity: "CLARITY",
            cut: "CUT",
            polish: "POL",
            symmetry: "SYM",
            fluorescence: "FLOUR",
            fluor: "FLOUR",
            lab: "LAB",
            ratio: "RATIO",
            length: "LENGTH",
            width: "WIDTH",
            depth: "DEPTH",
            depthper: "DEPTH_PER",
            depthpercent: "DEPTH_PER",
            tableper: "TABLE_PER",
            crownangle: "CROWN_ANGLE",
            crangle: "CROWN_ANGLE",
            crownheight: "CROWN_HEIGHT",
            crheight: "CROWN_HEIGHT",
            pavillionangle: "PAVILLION_ANGLE",
            pavangle: "PAVILLION_ANGLE",
            pavillionheight: "PAVILLION_HEIGHT",
            pavheight: "PAVILLION_HEIGHT",
            girdle: "GIRDLE",
            gridle: "GIRDLE",
            comments: "COMMENTS_1",
            comments_1: "COMMENTS_1",
            reportdate: "REPORT_DATE",
            sortby: "sortBy",
            sortorder: "sortOrder",
        };

        // Allowed parameters for the safe API
        const allowedParams = [
            "limit",
            "page",
            "sortBy",
            "sortOrder",
            "CARATS_MIN",
            "CARATS_MAX",
            "SHAPE",
            "COLOR",
            "CLARITY",
            "CUT",
            "POL",
            "SYM",
            "FLOUR",
            "LAB",
            "RATIO",
            "LENGTH",
            "WIDTH",
            "DEPTH",
            "DEPTH_PER",
            "TABLE_PER",
            "CROWN_ANGLE",
            "CROWN_HEIGHT",
            "PAVILLION_ANGLE",
            "PAVILLION_HEIGHT",
            "GIRDLE",
            "COMMENTS_1",
            "REPORT_DATE",
        ];

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    // Keep page and limit lowercase
                    if (["page", "limit"].includes(key.toLowerCase())) {
                        queryParams.append(key.toLowerCase(), String(value));
                        return;
                    }

                    // Keep sortBy and sortOrder as-is
                    if (["sortby", "sortorder"].includes(key.toLowerCase())) {
                        queryParams.append(
                            key.toLowerCase() === "sortby"
                                ? "sortBy"
                                : "sortOrder",
                            String(value),
                        );
                        return;
                    }

                    // Check if parameter needs mapping
                    const lowerKey = key.toLowerCase();
                    const apiKey =
                        parameterMapping[lowerKey] || key.toUpperCase();

                    // Only add if it's in the allowed list
                    if (!allowedParams.includes(apiKey)) {
                        console.warn(
                            `Parameter ${key} (mapped to ${apiKey}) is not allowed in safe API`,
                        );
                        return;
                    }

                    if (Array.isArray(value)) {
                        // Append each value separately with the same key
                        value.forEach((v) => {
                            if (v !== undefined && v !== null && v !== "") {
                                queryParams.append(
                                    apiKey,
                                    String(v).toUpperCase(),
                                );
                            }
                        });
                    } else {
                        // Handle comma-separated string values (split and append separately)
                        const stringValue = String(value);
                        if (stringValue.includes(",")) {
                            const values = stringValue
                                .split(",")
                                .map((v) => v.trim());
                            values.forEach((v) => {
                                if (v) {
                                    queryParams.append(apiKey, v.toUpperCase());
                                }
                            });
                        } else {
                            queryParams.append(
                                apiKey,
                                stringValue.toUpperCase(),
                            );
                        }
                    }
                }
            });
        }

        const url = `${API_URL}/api/diamonds/safe?${queryParams.toString()}`;

        const response = await fetch(url, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching public diamonds:", error);
        throw error;
    }
};
