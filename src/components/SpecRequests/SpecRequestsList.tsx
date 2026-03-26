"use client";

import { useState, useEffect, useCallback } from "react";
import { diamondApi } from "@/lib/api";
import { RefreshCw, Loader2, Eye, X, ChevronDown, ChevronRight, User, Building2, Phone, MapPin } from "lucide-react";
import { Marcellus, Maven_Pro } from "next/font/google";
import Image from "next/image";

const marcellus = Marcellus({
    variable: "--font-marcellus",
    weight: "400",
    subsets: ["latin"],
});

const mavenPro = Maven_Pro({
    variable: "--font-maven-pro",
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});

interface SpecRequestImage {
    s3Key?: string;
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
}

interface SpecRequest {
    id: string;
    userId?: string;
    userEmail?: string;
    SHAPE?: string;
    CARATS?: string;
    COLOR?: string;
    CLARITY?: string;
    CUT?: string;
    POL?: string;
    SYM?: string;
    FLOUR?: string;
    LAB?: string;
    LENGTH?: string;
    WIDTH?: string;
    DEPTH?: string;
    message?: string;
    image?: SpecRequestImage;
    imageUrl?: string;
    createdAt: string;
    updatedAt?: string;
}

interface CustomerData {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    landlineNumber?: string;
    countryCode?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
    };
    businessInfo?: {
        companyName?: string;
        businessType?: string;
        vatNumber?: string;
    };
    submittedAt?: string;
}

interface GroupedRequest {
    email: string;
    userId: string;
    username: string;
    customerData: CustomerData | null;
    requests: SpecRequest[];
}

// Modal detail includes parent group info
interface SelectedDetail {
    request: SpecRequest;
    group: GroupedRequest;
}

export default function SpecRequestsList() {
    const [groupedRequests, setGroupedRequests] = useState<GroupedRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDetail, setSelectedDetail] = useState<SelectedDetail | null>(null);
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

    const fetchRequests = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await diamondApi.getAllSpecRequests();

            if (response?.success && response?.data?.groupedRequests) {
                setGroupedRequests(response.data.groupedRequests);
                // Auto-expand all groups on first load
                const allIds = new Set<string>(
                    response.data.groupedRequests.map((g: GroupedRequest) => g.userId)
                );
                setExpandedGroups(allIds);
            } else {
                setError("No data available.");
            }
        } catch (err) {
            console.error("Error fetching spec requests:", err);
            setError("Failed to load spec requests.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const toggleGroup = (userId: string) => {
        setExpandedGroups((prev) => {
            const next = new Set(prev);
            if (next.has(userId)) {
                next.delete(userId);
            } else {
                next.add(userId);
            }
            return next;
        });
    };

    const totalRequests = groupedRequests.reduce((sum, g) => sum + g.requests.length, 0);

    return (
        <div className={mavenPro.className}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className={`text-2xl font-bold text-gray-900 ${marcellus.className}`}>
                        Diamond Spec Requests
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {!loading && !error && groupedRequests.length > 0
                            ? `${totalRequests} request${totalRequests !== 1 ? "s" : ""} from ${groupedRequests.length} user${groupedRequests.length !== 1 ? "s" : ""}`
                            : "All diamond specification requests from users"}
                    </p>
                </div>
                <button
                    onClick={fetchRequests}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-[#050c3a] text-white text-sm font-medium rounded-md hover:bg-[#0a1560] transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                </button>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-[#050c3a]" />
                </div>
            )}

            {/* Error */}
            {error && !loading && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {error}
                </div>
            )}

            {/* Empty */}
            {!loading && !error && groupedRequests.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No spec requests found.
                </div>
            )}

            {/* Grouped Requests */}
            {!loading && !error && groupedRequests.length > 0 && (
                <div className="space-y-4">
                    {groupedRequests.map((group) => {
                        const isExpanded = expandedGroups.has(group.userId);
                        return (
                            <div
                                key={group.userId}
                                className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden"
                            >
                                {/* Group Header */}
                                <button
                                    onClick={() => toggleGroup(group.userId)}
                                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-[#050c3a] flex items-center justify-center text-white text-sm font-semibold">
                                            {group.username?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-semibold text-gray-900">
                                                {group.username}
                                                {group.customerData && (
                                                    <span className="ml-2 text-xs font-normal text-gray-500">
                                                        ({group.customerData.firstName} {group.customerData.lastName})
                                                    </span>
                                                )}
                                            </p>
                                            <p className="text-xs text-gray-500">{group.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                                            {group.requests.length} request{group.requests.length !== 1 ? "s" : ""}
                                        </span>
                                        {isExpanded ? (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                </button>

                                {/* Customer Data Bar */}
                                {isExpanded && group.customerData && (
                                    <div className="px-5 py-3 bg-blue-50 border-t border-blue-100 flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-600">
                                        {group.customerData.businessInfo?.companyName && (
                                            <span className="flex items-center gap-1">
                                                <Building2 className="w-3.5 h-3.5 text-gray-400" />
                                                {group.customerData.businessInfo.companyName}
                                                {group.customerData.businessInfo.businessType && (
                                                    <span className="text-gray-400">({group.customerData.businessInfo.businessType})</span>
                                                )}
                                            </span>
                                        )}
                                        {group.customerData.phoneNumber && (
                                            <span className="flex items-center gap-1">
                                                <Phone className="w-3.5 h-3.5 text-gray-400" />
                                                {group.customerData.countryCode} {group.customerData.phoneNumber}
                                            </span>
                                        )}
                                        {group.customerData.address?.city && (
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                                {[group.customerData.address.city, group.customerData.address.state, group.customerData.address.country]
                                                    .filter(Boolean)
                                                    .join(", ")}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Requests Table */}
                                {isExpanded && (
                                    <div className="border-t border-gray-200 overflow-x-auto">
                                        <table className="w-full border-collapse">
                                            <thead className="bg-[#050c3a] text-white">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium">Shape</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium">Carats</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium">Color</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium">Clarity</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium">Cut</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium">Pol</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium">Sym</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium">Fluor</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium">Lab</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium">Image</th>
                                                    <th className="px-4 py-3 text-center text-sm font-medium">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {group.requests.map((req, idx) => (
                                                    <tr
                                                        key={req.id}
                                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                                        style={{
                                                            background: idx % 2 === 1 ? "#faf6eb" : "white",
                                                        }}
                                                    >
                                                        <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                                                            {new Date(req.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-700">{req.SHAPE || "N/A"}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-700">{req.CARATS || "N/A"}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-700">{req.COLOR || "N/A"}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-700">{req.CLARITY || "N/A"}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-700">{req.CUT || "N/A"}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-700">{req.POL || "N/A"}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-700">{req.SYM || "N/A"}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-700">{req.FLOUR || "N/A"}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-700">{req.LAB || "N/A"}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-700">
                                                            {req.image?.fileName ? (
                                                                <span className="text-xs text-blue-600">{req.image.fileName}</span>
                                                            ) : (
                                                                <span className="text-xs text-gray-400">None</span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <button
                                                                onClick={() => setSelectedDetail({ request: req, group })}
                                                                className="p-1.5 rounded-md hover:bg-gray-200 transition-colors text-gray-600 hover:text-[#050c3a]"
                                                                title="View Details"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Detail Modal */}
            {selectedDetail && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                        <div className="border-b border-gray-200 p-6 flex justify-between items-center">
                            <h2 className={`text-xl font-bold text-[#040d39] ${marcellus.className}`}>
                                Request Details
                            </h2>
                            <button
                                onClick={() => setSelectedDetail(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                            {/* User info */}
                            <div className="mb-5">
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Requested by</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#050c3a] flex items-center justify-center text-white text-xs font-semibold">
                                        {selectedDetail.group.username?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-900 font-medium">
                                            {selectedDetail.group.username}
                                            {selectedDetail.group.customerData && (
                                                <span className="ml-1 text-gray-500 font-normal">
                                                    ({selectedDetail.group.customerData.firstName} {selectedDetail.group.customerData.lastName})
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-xs text-gray-500">{selectedDetail.group.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Customer details */}
                            {selectedDetail.group.customerData && (
                                <div className="mb-5 bg-gray-50 rounded-md p-4 grid grid-cols-2 gap-3 text-sm">
                                    {selectedDetail.group.customerData.businessInfo?.companyName && (
                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 uppercase">Company</p>
                                            <p className="text-gray-900">
                                                {selectedDetail.group.customerData.businessInfo.companyName}
                                                {selectedDetail.group.customerData.businessInfo.businessType && (
                                                    <span className="text-gray-500 text-xs ml-1">({selectedDetail.group.customerData.businessInfo.businessType})</span>
                                                )}
                                            </p>
                                        </div>
                                    )}
                                    {selectedDetail.group.customerData.businessInfo?.vatNumber && (
                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 uppercase">VAT Number</p>
                                            <p className="text-gray-900">{selectedDetail.group.customerData.businessInfo.vatNumber}</p>
                                        </div>
                                    )}
                                    {selectedDetail.group.customerData.phoneNumber && (
                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
                                            <p className="text-gray-900">{selectedDetail.group.customerData.countryCode} {selectedDetail.group.customerData.phoneNumber}</p>
                                        </div>
                                    )}
                                    {selectedDetail.group.customerData.landlineNumber && (
                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 uppercase">Landline</p>
                                            <p className="text-gray-900">{selectedDetail.group.customerData.landlineNumber}</p>
                                        </div>
                                    )}
                                    {selectedDetail.group.customerData.address && (
                                        <div className="col-span-2">
                                            <p className="text-xs font-semibold text-gray-500 uppercase">Address</p>
                                            <p className="text-gray-900">
                                                {[
                                                    selectedDetail.group.customerData.address.street,
                                                    selectedDetail.group.customerData.address.city,
                                                    selectedDetail.group.customerData.address.state,
                                                    selectedDetail.group.customerData.address.postalCode,
                                                    selectedDetail.group.customerData.address.country,
                                                ].filter(Boolean).join(", ")}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Specs grid */}
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-5">
                                {[
                                    ["Shape", selectedDetail.request.SHAPE],
                                    ["Carats", selectedDetail.request.CARATS],
                                    ["Color", selectedDetail.request.COLOR],
                                    ["Clarity", selectedDetail.request.CLARITY],
                                    ["Cut", selectedDetail.request.CUT],
                                    ["Polish", selectedDetail.request.POL],
                                    ["Symmetry", selectedDetail.request.SYM],
                                    ["Fluorescence", selectedDetail.request.FLOUR],
                                    ["Lab", selectedDetail.request.LAB],
                                    ["Length", selectedDetail.request.LENGTH],
                                    ["Width", selectedDetail.request.WIDTH],
                                    ["Depth", selectedDetail.request.DEPTH],
                                ].map(([label, value]) => (
                                    <div key={label as string}>
                                        <p className="text-xs font-semibold text-gray-500 uppercase">{label}</p>
                                        <p className="text-sm text-gray-900">{(value as string) || "N/A"}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Message */}
                            {selectedDetail.request.message && (
                                <div className="mb-5">
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Message</p>
                                    <p className="text-sm text-gray-700 bg-gray-50 rounded-md p-3">{selectedDetail.request.message}</p>
                                </div>
                            )}

                            {/* Image */}
                            {selectedDetail.request.imageUrl && (
                                <div className="mb-5">
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                                        Reference Image
                                        {selectedDetail.request.image?.fileName && (
                                            <span className="ml-2 font-normal text-gray-400 normal-case">
                                                ({selectedDetail.request.image.fileName})
                                            </span>
                                        )}
                                    </p>
                                    <div className="relative w-full h-64 bg-gray-100 rounded-md overflow-hidden">
                                        <Image
                                            src={selectedDetail.request.imageUrl}
                                            alt="Reference"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Meta */}
                            <div className="text-xs text-gray-400 pt-3 border-t border-gray-100">
                                <span>Submitted: {new Date(selectedDetail.request.createdAt).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
