"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { useRouter } from "next/navigation";
import { Maven_Pro, Marcellus } from "next/font/google";
import { Package, Users, ChevronUp, ChevronDown, Plus } from "lucide-react";
import InventoryDiamondTable from "@/components/InventoryDiamondTable";
import DiamondStockTable from "@/components/DiamondStockTable";
import ShapeFilter from "@/components/Filters/ShapeFilter";
import CaratFilter from "@/components/Filters/CaratFilter";
import ColorFilter from "@/components/Filters/ColorFilter";
import ClarityFilter from "@/components/Filters/ClarityFilter";
import FluorFilter from "@/components/Filters/FluorescenceFilter";
import SupplierManagementModal from "@/components/Models/SupplierManagementModal";
import AddDiamondModal, {
    type DiamondEditData,
} from "@/components/Models/AddDiamondModal";
import SearchBar from "@/components/shared/SearchBar";
import InclusionFilter, {
    type InclusionFilters,
} from "@/components/Filters/InclusionFilter";
import KeySymbolFilter, {
    type KeySymbolFilters,
} from "@/components/Filters/KeyToSymbolFilter";
import PriceLocationFilter, {
    type PriceLocationFilters,
} from "@/components/Filters/PriceAndLocationFilter";
import MeasurementFilter from "@/components/Filters/MeasurementFilter";
import { inventoryApi } from "@/lib/api";
import toast from "react-hot-toast";
import { API_URL } from "@/services/api/base/apiClient";

const marcellus = Marcellus({
    variable: "--font-marcellus",
    subsets: ["latin"],
    weight: "400",
});

const mavenPro = Maven_Pro({
    variable: "--font-maven-pro",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

// Singleton wrapper to ensure DiamondStockTable only renders once
const ActiveDiamondsTableWrapper = memo(
    () => {
        const hasRendered = useRef(false);
        const isMounted = useRef(true);

        useEffect(() => {
            if (!hasRendered.current) {
                hasRendered.current = true;
                console.log("ActiveDiamondsTable mounted");
            }

            return () => {
                isMounted.current = false;
                console.log("ActiveDiamondsTable unmounting");
            };
        }, []);

        // Only render once, never update
        if (!isMounted.current) {
            return null;
        }

        return <DiamondStockTable key="active-diamonds-singleton" />;
    },
    () => true,
); // Always return true to prevent any re-renders

ActiveDiamondsTableWrapper.displayName = "ActiveDiamondsTableWrapper";

interface InventoryDiamond {
    _id: string;
    STONE_NO: string;
    source: string;
    sourceType?: string;
    diamondId?: string;
    SHAPE: string;
    CARATS: string;
    COLOR: string;
    CLARITY: string;
    CUT: string;
    POL: string;
    SYM: string;
    FLOUR: string;
    LAB: string;
    LOCATION: string;
    NET_RATE: string;
    DISC_PER: string;
    NET_VALUE: string;
    RAP_PRICE: string;
    DEPTH_PER: string;
    TABLE_PER: string;
    MEASUREMENTS: string;
    REPORT_NO: string;
    REAL_IMAGE: string;
    MP4: string;
    CERTI_PDF?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default function InventoryManagement() {
    const router = useRouter();
    // Separate filter states for each view
    const [showFilters, setShowFilters] = useState(false);

    // Inventory View filters
    const [inventorySelectedShape, setInventorySelectedShape] = useState<
        string[]
    >([]);
    const [inventorySelectedCaratRanges, setInventorySelectedCaratRanges] =
        useState<{ min: string; max: string }[]>([]);
    const [inventorySelectedColor, setInventorySelectedColor] = useState<
        string[]
    >([]);
    const [inventorySelectedClarity, setInventorySelectedClarity] = useState<
        string[]
    >([]);
    const [inventorySelectedSpecial, setInventorySelectedSpecial] =
        useState("");
    const [inventorySelectedCut, setInventorySelectedCut] = useState("");
    const [inventorySelectedPolish, setInventorySelectedPolish] = useState("");
    const [inventorySelectedSymmetry, setInventorySelectedSymmetry] =
        useState("");
    const [inventorySelectedFluor, setInventorySelectedFluor] = useState<
        string[]
    >([]);
    // Advanced filters for inventory view
    const [inventoryInclusions, setInventoryInclusions] =
        useState<InclusionFilters>({
            centerBlack: [],
            centerWhite: [],
            sideBlack: [],
            sideWhite: [],
        });
    const [inventoryKeySymbols, setInventoryKeySymbols] =
        useState<KeySymbolFilters>({ keyToSymbol: [] });
    const [inventoryPriceLocation, setInventoryPriceLocation] =
        useState<PriceLocationFilters>({
            pricePerCarat: { from: "", to: "" },
            discount: { from: "", to: "" },
            totalPrice: { from: "", to: "" },
            locations: [],
            labs: [],
        });
    const [inventoryMeasurements, setInventoryMeasurements] = useState({
        length: { from: "", to: "" },
        width: { from: "", to: "" },
        depth: { from: "", to: "" },
        table: { from: "", to: "" },
        depthPercent: { from: "", to: "" },
        ratio: { from: "", to: "" },
        crAngle: { from: "", to: "" },
        pavAngle: { from: "", to: "" },
        gridle: { from: "", to: "" },
        crHeight: { from: "", to: "" },
        pavHeight: { from: "", to: "" },
    });

    // Active Diamonds View filters
    const [activeSelectedShape, setActiveSelectedShape] = useState<string[]>(
        [],
    );
    const [activeSelectedCaratRanges, setActiveSelectedCaratRanges] = useState<
        { min: string; max: string }[]
    >([]);
    const [activeSelectedColor, setActiveSelectedColor] = useState<string[]>(
        [],
    );
    const [activeSelectedClarity, setActiveSelectedClarity] = useState<
        string[]
    >([]);
    const [activeSelectedSpecial, setActiveSelectedSpecial] = useState("");
    const [activeSelectedCut, setActiveSelectedCut] = useState("");
    const [activeSelectedPolish, setActiveSelectedPolish] = useState("");
    const [activeSelectedSymmetry, setActiveSelectedSymmetry] = useState("");
    const [activeSelectedFluor, setActiveSelectedFluor] = useState<string[]>(
        [],
    );
    // Advanced filters for active diamonds view
    const [activeInclusions, setActiveInclusions] = useState<InclusionFilters>({
        centerBlack: [],
        centerWhite: [],
        sideBlack: [],
        sideWhite: [],
    });
    const [activeKeySymbols, setActiveKeySymbols] = useState<KeySymbolFilters>({
        keyToSymbol: [],
    });
    const [activePriceLocation, setActivePriceLocation] =
        useState<PriceLocationFilters>({
            pricePerCarat: { from: "", to: "" },
            discount: { from: "", to: "" },
            totalPrice: { from: "", to: "" },
            locations: [],
            labs: [],
        });
    const [activeMeasurements, setActiveMeasurements] = useState({
        length: { from: "", to: "" },
        width: { from: "", to: "" },
        depth: { from: "", to: "" },
        table: { from: "", to: "" },
        depthPercent: { from: "", to: "" },
        ratio: { from: "", to: "" },
        crAngle: { from: "", to: "" },
        pavAngle: { from: "", to: "" },
        gridle: { from: "", to: "" },
        crHeight: { from: "", to: "" },
        pavHeight: { from: "", to: "" },
    });

    // Manual Diamonds View filters
    const [manualSelectedShape, setManualSelectedShape] = useState<string[]>(
        [],
    );
    const [manualSelectedCaratRanges, setManualSelectedCaratRanges] = useState<
        { min: string; max: string }[]
    >([]);
    const [manualSelectedColor, setManualSelectedColor] = useState<string[]>(
        [],
    );
    const [manualSelectedClarity, setManualSelectedClarity] = useState<
        string[]
    >([]);
    const [manualSelectedSpecial, setManualSelectedSpecial] = useState("");
    const [manualSelectedCut, setManualSelectedCut] = useState("");
    const [manualSelectedPolish, setManualSelectedPolish] = useState("");
    const [manualSelectedSymmetry, setManualSelectedSymmetry] = useState("");
    const [manualSelectedFluor, setManualSelectedFluor] = useState<string[]>(
        [],
    );
    const [manualInclusions, setManualInclusions] = useState<InclusionFilters>({
        centerBlack: [],
        centerWhite: [],
        sideBlack: [],
        sideWhite: [],
    });
    const [manualKeySymbols, setManualKeySymbols] = useState<KeySymbolFilters>({
        keyToSymbol: [],
    });
    const [manualPriceLocation, setManualPriceLocation] =
        useState<PriceLocationFilters>({
            pricePerCarat: { from: "", to: "" },
            discount: { from: "", to: "" },
            totalPrice: { from: "", to: "" },
            locations: [],
            labs: [],
        });
    const [manualMeasurements, setManualMeasurements] = useState({
        length: { from: "", to: "" },
        width: { from: "", to: "" },
        depth: { from: "", to: "" },
        table: { from: "", to: "" },
        depthPercent: { from: "", to: "" },
        ratio: { from: "", to: "" },
        crAngle: { from: "", to: "" },
        pavAngle: { from: "", to: "" },
        gridle: { from: "", to: "" },
        crHeight: { from: "", to: "" },
        pavHeight: { from: "", to: "" },
    });

    const [totalDiamonds, setTotalDiamonds] = useState(0);
    const [activeDiamonds, setActiveDiamonds] = useState(0);
    const [activeSuppliers, setActiveSuppliers] = useState(0);
    const [totalSuppliers, setTotalSuppliers] = useState(0);
    const [inventoryRefreshNonce, setInventoryRefreshNonce] = useState(0);
    const [suppliers] = useState<
        Array<{ name: string; totalDiamonds: number; isVisible: boolean }>
    >([]);
    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [showAddDiamondModal, setShowAddDiamondModal] = useState(false);
    const [editDiamondData, setEditDiamondData] =
        useState<DiamondEditData | null>(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [viewMode, setViewMode] = useState<"inventory" | "active" | "manual">(
        "inventory",
    );
    const [isSearching, setIsSearching] = useState(false);
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const [searchResults, setSearchResults] = useState<InventoryDiamond[]>([]);
    const [searchPagination, setSearchPagination] = useState<
        | {
              currentPage: number;
              totalPages: number;
              totalRecords: number;
              recordsPerPage: number;
              hasNextPage: boolean;
              hasPrevPage: boolean;
          }
        | undefined
    >(undefined);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [hasActiveDiamondsBeenViewed, setHasActiveDiamondsBeenViewed] =
        useState(false);
    const [currentSearchTerm, setCurrentSearchTerm] = useState("");

    useEffect(() => {
        // Check if user is admin or superadmin
        const checkAuthorization = () => {
            if (typeof window !== "undefined") {
                const user = localStorage.getItem("user");
                if (user) {
                    try {
                        const userData = JSON.parse(user);
                        const role = userData.role?.toLowerCase();
                        if (
                            role === "admin" ||
                            role === "superadmin" ||
                            role === "super_admin"
                        ) {
                            setIsAuthorized(true);
                            return true;
                        }
                    } catch (err) {
                        console.error("Error parsing user data:", err);
                    }
                }
                router.push("/login");
                return false;
            }
            return false;
        };

        if (checkAuthorization()) {
            fetchInventoryData();
            fetchActiveDiamondsCount();
            fetchSupplierCounts();
        }
    }, [router]);

    // Listen for supplier status changes
    useEffect(() => {
        const handleSupplierStatusChange = (event: CustomEvent) => {
            const { isVisible } = event.detail;
            // Update supplier counts based on toggle status
            if (isVisible) {
                setActiveSuppliers(1);
                setTotalSuppliers(1);
            } else {
                setActiveSuppliers(0);
                setTotalSuppliers(1);
            }
        };

        if (typeof window !== "undefined") {
            window.addEventListener(
                "supplierStatusChanged",
                handleSupplierStatusChange as EventListener,
            );
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener(
                    "supplierStatusChanged",
                    handleSupplierStatusChange as EventListener,
                );
            }
        };
    }, []);

    const handleSearchBar = async (term: string) => {
        // If search term is empty, exit search mode and show all inventory
        if (term.trim() === "") {
            setIsSearchMode(false);
            setSearchResults([]);
            setSearchPagination(undefined);
            setIsSearching(false);
            setCurrentSearchTerm("");
            return;
        }

        setIsSearching(true);
        setIsSearchMode(true);
        setCurrentSearchTerm(term);

        try {
            let response;
            if (viewMode === "active") {
                // Active Diamonds: hit /api/diamonds/search (no limit to show all results)
                const apiUrl = `${API_URL}/api/diamonds/search?searchTerm=${encodeURIComponent(term)}`;
                const res = await fetch(apiUrl);
                response = await res.json();
                // Normalize response for compatibility
                if (response.success && response.data) {
                    setSearchResults(response.data);
                    setSearchPagination(response.pagination);
                } else {
                    setSearchResults([]);
                    setSearchPagination(undefined);
                }
            } else {
                // Inventory: use existing logic (no limit to show all results)
                response = await inventoryApi.searchDiamonds({
                    searchTerm: term,
                });
                if (response.success && response.data) {
                    setSearchResults(response.data);
                    setSearchPagination(response.pagination);
                } else {
                    setSearchResults([]);
                    setSearchPagination(undefined);
                }
            }
        } catch (err) {
            console.error("Error searching diamonds:", err);
            setSearchResults([]);
            setSearchPagination(undefined);
        } finally {
            setIsSearching(false);
        }
    };

    const fetchActiveDiamondsCount = async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/diamonds/search`,
            );
            const data = await response.json();

            if (data.success && data.totalFilteredRecords !== undefined) {
                setActiveDiamonds(data.totalFilteredRecords);
            }
        } catch (err) {
            console.error("Error fetching active diamonds count:", err);
        }
    };

    const fetchSupplierCounts = async () => {
        try {
            // Check localStorage for supplier visibility status for both suppliers
            const suppliers = ["Dharam Web Api", "Finestar"];

            // Set total suppliers to the count of suppliers we have
            setTotalSuppliers(suppliers.length);

            // Count how many suppliers are visible
            let visibleCount = 0;
            suppliers.forEach((supplierName) => {
                const storedStatus = localStorage.getItem(
                    `supplier_${supplierName}_visible`,
                );
                if (storedStatus === "true") {
                    visibleCount++;
                } else if (storedStatus === null) {
                    // Default to visible if not set
                    visibleCount++;
                    localStorage.setItem(
                        `supplier_${supplierName}_visible`,
                        "true",
                    );
                }
            });

            setActiveSuppliers(visibleCount);
        } catch (err) {
            console.error("Error fetching supplier counts:", err);
            // Default values on error
            setTotalSuppliers(2);
            setActiveSuppliers(2);
        }
    };

    const fetchInventoryData = async () => {
        try {
            setIsLoadingStats(true);
            // Fetch diamonds from the correct API endpoint with a safe limit
            const response = await fetch(
                `${API_URL}/api/diamonds/admin/search?page=1&limit=10`,
                {
                    method: "GET",
                    credentials: "include", // Include cookies for admin authentication
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            if (!response.ok) {
                console.error(
                    `Failed to fetch inventory data: ${response.status}`,
                );
                return;
            }

            const data = await response.json();
            console.log("Fetched inventory data:", data);

            if (
                data.success &&
                data.pagination &&
                typeof data.pagination.totalRecords === "number"
            ) {
                setTotalDiamonds(data.pagination.totalRecords);
                console.log(
                    "Total diamonds set to:",
                    data.pagination.totalRecords,
                );
            } else {
                console.warn("Invalid response format:", data);
            }
        } catch (err) {
            console.error("Error fetching inventory:", err);
        } finally {
            setIsLoadingStats(false);
        }
    };

    const handleSupplierUpdate = () => {
        // Refresh inventory, supplier data, and active diamonds count after supplier update
        fetchInventoryData();
        fetchActiveDiamondsCount();
        fetchSupplierCounts();
        setInventoryRefreshNonce((n) => n + 1);
    };

    const handleCopyToManual = async (diamond: InventoryDiamond) => {
        try {
            // Access all fields via a loose-typed reference for fields not on the local interface
            const d = diamond as unknown as Record<
                string,
                string | string[] | undefined
            >;

            const payload = {
                SHAPE: diamond.SHAPE,
                CARATS: diamond.CARATS,
                COLOR: diamond.COLOR,
                CLARITY: diamond.CLARITY,
                sourceType: "DS4U",
                CUT: diamond.CUT || "",
                POL: diamond.POL || "",
                SYM: diamond.SYM || "",
                FLOUR: diamond.FLOUR || "",
                LAB: diamond.LAB || "",
                LOCATION: diamond.LOCATION || "",
                NET_RATE: diamond.NET_RATE || "",
                DISC_PER: diamond.DISC_PER || "",
                NET_VALUE: diamond.NET_VALUE || "",
                RAP_PRICE: diamond.RAP_PRICE || "",
                DEPTH_PER: diamond.DEPTH_PER || "",
                TABLE_PER: diamond.TABLE_PER || "",
                MEASUREMENTS: diamond.MEASUREMENTS || "",
                REPORT_NO: diamond.REPORT_NO || "",
                REAL_IMAGE: diamond.REAL_IMAGE || "",
                MP4: diamond.MP4 || "",
                REPORT_COMMENTS: (d.REPORT_COMMENTS as string) || "",
                REPORT_DATE: (d.REPORT_DATE as string) || "",
                CROWN_ANGLE: (d.CROWN_ANGLE as string) || "",
                CROWN_HEIGHT: (d.CROWN_HEIGHT as string) || "",
                PAVILLION_ANGLE: (d.PAVILLION_ANGLE as string) || "",
                PAVILLION_HEIGHT: (d.PAVILLION_HEIGHT as string) || "",
                CN: (d.CN as string) || "",
                CW: (d.CW as string) || "",
                SN: (d.SN as string) || "",
                SW: (d.SW as string) || "",
                TINGE: (d.TINGE as string) || "",
                LENGTH: (d.LENGTH as string) || "",
                WIDTH: (d.WIDTH as string) || "",
                DEPTH: (d.DEPTH as string) || "",
                GIRDLE: (d.GIRDLE as string) || "",
                GIRDLE_PER: (d.GIRDLE_PER as string) || "",
                STAR: (d.STAR as string) || "",
                RATIO: (d.RATIO as string) || "",
                STAGE: (d.STAGE as string) || "",
                BRANCH: (d.BRANCH as string) || "",
                HA: (d.HA as string) || "",
                DNA: (d.DNA as string) || "",
            };

            await inventoryApi.addManualDiamond(payload);
            toast.success("Diamond copied to Manual Diamonds");
            handleSupplierUpdate();
        } catch (err) {
            console.error("Error copying diamond:", err);
            toast.error("Failed to copy diamond");
        }
    };

    const handleEditDiamond = (diamond: InventoryDiamond) => {
        const d = diamond as unknown as Record<
            string,
            string | string[] | undefined
        >;
        setEditDiamondData({
            _id: diamond._id,
            diamondId: diamond.diamondId || diamond._id,
            STONE_NO: diamond.STONE_NO,
            SHAPE: diamond.SHAPE,
            CARATS: diamond.CARATS,
            COLOR: diamond.COLOR,
            CLARITY: diamond.CLARITY,
            sourceType: diamond.sourceType || "DS4U",
            CUT: diamond.CUT || "",
            POL: diamond.POL || "",
            SYM: diamond.SYM || "",
            FLOUR: diamond.FLOUR || "",
            LAB: diamond.LAB || "",
            LOCATION: diamond.LOCATION || "",
            NET_RATE: diamond.NET_RATE || "",
            DISC_PER: diamond.DISC_PER || "",
            NET_VALUE: diamond.NET_VALUE || "",
            RAP_PRICE: diamond.RAP_PRICE || "",
            DEPTH_PER: diamond.DEPTH_PER || "",
            TABLE_PER: diamond.TABLE_PER || "",
            MEASUREMENTS: diamond.MEASUREMENTS || "",
            REPORT_NO: diamond.REPORT_NO || "",
            REPORT_COMMENTS: (d.REPORT_COMMENTS as string) || "",
            REPORT_DATE: (d.REPORT_DATE as string) || "",
            CROWN_ANGLE: (d.CROWN_ANGLE as string) || "",
            CROWN_HEIGHT: (d.CROWN_HEIGHT as string) || "",
            PAVILLION_ANGLE: (d.PAVILLION_ANGLE as string) || "",
            PAVILLION_HEIGHT: (d.PAVILLION_HEIGHT as string) || "",
            CN: (d.CN as string) || "",
            CW: (d.CW as string) || "",
            SN: (d.SN as string) || "",
            SW: (d.SW as string) || "",
            TINGE: (d.TINGE as string) || "",
            LENGTH: (d.LENGTH as string) || "",
            WIDTH: (d.WIDTH as string) || "",
            DEPTH: (d.DEPTH as string) || "",
            GIRDLE: (d.GIRDLE as string) || "",
            GIRDLE_PER: (d.GIRDLE_PER as string) || "",
            STAR: (d.STAR as string) || "",
            RATIO: (d.RATIO as string) || "",
            STAGE: (d.STAGE as string) || "",
            BRANCH: (d.BRANCH as string) || "",
            HA: (d.HA as string) || "",
            DNA: (d.DNA as string) || "",
        });
        setShowAddDiamondModal(true);
    };

    const handleDeleteDiamond = async (diamond: InventoryDiamond) => {
        const diamondId = diamond.diamondId || diamond._id;
        if (!confirm(`Delete diamond ${diamond.STONE_NO}?`)) return;

        try {
            await inventoryApi.deleteManualDiamond(diamondId);
            toast.success("Diamond deleted successfully");
            handleSupplierUpdate();
        } catch (err) {
            console.error("Error deleting diamond:", err);
            toast.error("Failed to delete diamond");
        }
    };

    if (!isAuthorized) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gray-50 w-full">
                <div className="px-2 sm:px-4 py-3 w-full mt-30">
                    <h1
                        className={`text-xl font-bold text-gray-900 ${marcellus.className}`}
                    >
                        Inventory and Suppliers
                    </h1>
                </div>
            </div>
            {/* Stats Cards */}
            <div
                className={`w-full px-1 sm:px-2 md:px-4 py-4 ${mavenPro.className}`}
            >
                {isLoadingStats ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-[#050c3a]"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        {/* Total Diamonds Card */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 font-medium flex items-center gap-2">
                                        <Package className="w-4 h-4" />
                                        Total Diamonds
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {totalDiamonds}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        All stocks (currently available)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Active Diamonds Card */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 font-medium flex items-center gap-2">
                                        <Package className="w-4 h-4" />
                                        Active Diamonds
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {activeDiamonds < 10
                                            ? `0${activeDiamonds}`
                                            : activeDiamonds}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Filtered and active stocks
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Active Suppliers Card */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 font-medium flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        Active Suppliers
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {typeof activeSuppliers === "number" &&
                                        activeSuppliers > 0
                                            ? activeSuppliers < 10
                                                ? `0${activeSuppliers}`
                                                : activeSuppliers
                                            : "00"}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Not try to follow dealer assets
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Total Suppliers Card */}
                        <div
                            className={`bg-white rounded-lg shadow-sm p-6 border border-gray-200 ${mavenPro.className}`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 font-medium flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        Total Suppliers
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {typeof totalSuppliers === "number" &&
                                        totalSuppliers > 0
                                            ? totalSuppliers < 10
                                                ? `0${totalSuppliers}`
                                                : totalSuppliers
                                            : "00"}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Onboarding successfully
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Control Bar - Table/Grid View, Search, Manage Suppliers, Filter Toggle */}
                {!isLoadingStats && (
                    <div className="bg-[#FAF6EB] rounded-lg shadow-sm p-1 sm:p-2 border border-gray-200 mt-4 w-full">
                        <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-2 min-h-[38px]">
                            {/* Left Side - View Toggles */}
                            <div className="flex items-center gap-1 bg-gray-100 rounded-md p-0.5">
                                <button
                                    onClick={() => setViewMode("inventory")}
                                    className={`flex items-center gap-1 px-2 py-1 text-sm transition-colors ${
                                        viewMode === "inventory"
                                            ? "bg-[#050c3a] text-white"
                                            : "text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    <span className="hidden sm:inline">
                                        Inventory View
                                    </span>
                                </button>
                                <button
                                    onClick={() => {
                                        setViewMode("active");
                                        setHasActiveDiamondsBeenViewed(true);
                                    }}
                                    className={`flex items-center gap-1 px-2 py-1  text-sm transition-colors ${
                                        viewMode === "active"
                                            ? "bg-[#050c3a] text-white"
                                            : "text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    <span className="hidden sm:inline">
                                        Active Diamonds
                                    </span>
                                </button>
                                <button
                                    onClick={() => setViewMode("manual")}
                                    className={`flex items-center gap-1 px-2 py-1 text-sm transition-colors ${
                                        viewMode === "manual"
                                            ? "bg-[#050c3a] text-white"
                                            : "text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    <span className="hidden sm:inline">
                                        Manual Diamonds
                                    </span>
                                </button>
                            </div>

                            {/* Right Side - Search, Filter Toggle, Manage Suppliers */}
                            <div className="flex items-center gap-2 flex-1 justify-end">
                                {/* Search Bar */}
                                <div className="max-w-xs w-full mr-30">
                                    <SearchBar
                                        onSearch={handleSearchBar}
                                        isSearching={isSearching}
                                    />
                                </div>

                                {/* Filter Toggle Button */}
                                <button
                                    onClick={() =>
                                        setShowFilters((prev) => !prev)
                                    }
                                    className="bg-[#000033] text-white px-3 py-1.5 transition-colors font-medium flex items-center gap-1 text-sm whitespace-nowrap"
                                    style={{ minWidth: 90 }}
                                >
                                    {showFilters ? (
                                        <ChevronUp className="w-4 h-4" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4" />
                                    )}
                                    <span className="hidden sm:inline">
                                        Filter
                                    </span>
                                </button>

                                {/* Add Diamond Button */}
                                <button
                                    onClick={() => setShowAddDiamondModal(true)}
                                    className="bg-[#050C3A] text-white px-3 py-1.5 transition-colors font-medium flex items-center gap-1 text-sm whitespace-nowrap"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span className="hidden sm:inline">
                                        Add Diamond
                                    </span>
                                </button>

                                {/* Manage Suppliers Button */}
                                <button
                                    onClick={() => setShowSupplierModal(true)}
                                    className="bg-[#050C3A] text-white px-3 py-1.5 transition-colors font-medium flex items-center gap-1 text-sm whitespace-nowrap"
                                >
                                    <Users className="w-4 h-4" />
                                    <span className="hidden sm:inline">
                                        Manage Suppliers
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters Row - Only show when toggled */}
                {showFilters && !isLoadingStats && (
                    <div className="w-full flex flex-col gap-3 bg-white rounded-lg shadow-sm p-4 border border-gray-200 mt-2 mb-2">
                        {/* Main filter row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {viewMode === "inventory" ? (
                                <>
                                    <ShapeFilter
                                        selectedShape={inventorySelectedShape}
                                        onShapeChange={
                                            setInventorySelectedShape
                                        }
                                    />
                                    <CaratFilter
                                        selectedCaratRanges={
                                            inventorySelectedCaratRanges
                                        }
                                        onCaratChange={
                                            setInventorySelectedCaratRanges
                                        }
                                    />
                                    <div className="flex flex-col">
                                        <FluorFilter
                                            selectedFluor={
                                                inventorySelectedFluor
                                            }
                                            onFluorChange={
                                                setInventorySelectedFluor
                                            }
                                        />
                                        <ColorFilter
                                            selectedColor={
                                                inventorySelectedColor
                                            }
                                            onColorChange={
                                                setInventorySelectedColor
                                            }
                                        />
                                    </div>
                                    <ClarityFilter
                                        selectedClarity={
                                            inventorySelectedClarity
                                        }
                                        selectedSpecial={
                                            inventorySelectedSpecial
                                        }
                                        selectedCut={inventorySelectedCut}
                                        selectedPolish={inventorySelectedPolish}
                                        selectedSymmetry={
                                            inventorySelectedSymmetry
                                        }
                                        onClarityChange={
                                            setInventorySelectedClarity
                                        }
                                        onSpecialChange={
                                            setInventorySelectedSpecial
                                        }
                                        onCutChange={setInventorySelectedCut}
                                        onPolishChange={
                                            setInventorySelectedPolish
                                        }
                                        onSymmetryChange={
                                            setInventorySelectedSymmetry
                                        }
                                        hideExtras={false}
                                    />
                                </>
                            ) : viewMode === "active" ? (
                                <>
                                    <ShapeFilter
                                        selectedShape={activeSelectedShape}
                                        onShapeChange={setActiveSelectedShape}
                                    />
                                    <CaratFilter
                                        selectedCaratRanges={
                                            activeSelectedCaratRanges
                                        }
                                        onCaratChange={
                                            setActiveSelectedCaratRanges
                                        }
                                    />
                                    <div className="flex flex-col">
                                        <FluorFilter
                                            selectedFluor={activeSelectedFluor}
                                            onFluorChange={
                                                setActiveSelectedFluor
                                            }
                                        />
                                        <ColorFilter
                                            selectedColor={activeSelectedColor}
                                            onColorChange={
                                                setActiveSelectedColor
                                            }
                                        />
                                    </div>
                                    <ClarityFilter
                                        selectedClarity={activeSelectedClarity}
                                        selectedSpecial={activeSelectedSpecial}
                                        selectedCut={activeSelectedCut}
                                        selectedPolish={activeSelectedPolish}
                                        selectedSymmetry={
                                            activeSelectedSymmetry
                                        }
                                        onClarityChange={
                                            setActiveSelectedClarity
                                        }
                                        onSpecialChange={
                                            setActiveSelectedSpecial
                                        }
                                        onCutChange={setActiveSelectedCut}
                                        onPolishChange={setActiveSelectedPolish}
                                        onSymmetryChange={
                                            setActiveSelectedSymmetry
                                        }
                                        hideExtras={false}
                                    />
                                </>
                            ) : (
                                <>
                                    <ShapeFilter
                                        selectedShape={manualSelectedShape}
                                        onShapeChange={setManualSelectedShape}
                                    />
                                    <CaratFilter
                                        selectedCaratRanges={
                                            manualSelectedCaratRanges
                                        }
                                        onCaratChange={
                                            setManualSelectedCaratRanges
                                        }
                                    />
                                    <div className="flex flex-col">
                                        <FluorFilter
                                            selectedFluor={manualSelectedFluor}
                                            onFluorChange={
                                                setManualSelectedFluor
                                            }
                                        />
                                        <ColorFilter
                                            selectedColor={manualSelectedColor}
                                            onColorChange={
                                                setManualSelectedColor
                                            }
                                        />
                                    </div>
                                    <ClarityFilter
                                        selectedClarity={manualSelectedClarity}
                                        selectedSpecial={manualSelectedSpecial}
                                        selectedCut={manualSelectedCut}
                                        selectedPolish={manualSelectedPolish}
                                        selectedSymmetry={
                                            manualSelectedSymmetry
                                        }
                                        onClarityChange={
                                            setManualSelectedClarity
                                        }
                                        onSpecialChange={
                                            setManualSelectedSpecial
                                        }
                                        onCutChange={setManualSelectedCut}
                                        onPolishChange={setManualSelectedPolish}
                                        onSymmetryChange={
                                            setManualSelectedSymmetry
                                        }
                                        hideExtras={false}
                                    />
                                </>
                            )}
                        </div>
                        {/* Advanced filter row */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.5fr_0.8fr_0.8fr] gap-3">
                            {viewMode === "inventory" ? (
                                <>
                                    <InclusionFilter
                                        inclusions={inventoryInclusions}
                                        onInclusionChange={
                                            setInventoryInclusions
                                        }
                                    />
                                    <KeySymbolFilter
                                        filters={inventoryKeySymbols}
                                        onFiltersChange={setInventoryKeySymbols}
                                    />
                                    <PriceLocationFilter
                                        filters={inventoryPriceLocation}
                                        onFiltersChange={
                                            setInventoryPriceLocation
                                        }
                                    />
                                    <MeasurementFilter
                                        measurements={inventoryMeasurements}
                                        onMeasurementChange={
                                            setInventoryMeasurements
                                        }
                                    />
                                </>
                            ) : viewMode === "active" ? (
                                <>
                                    <InclusionFilter
                                        inclusions={activeInclusions}
                                        onInclusionChange={setActiveInclusions}
                                    />
                                    <KeySymbolFilter
                                        filters={activeKeySymbols}
                                        onFiltersChange={setActiveKeySymbols}
                                    />
                                    <PriceLocationFilter
                                        filters={activePriceLocation}
                                        onFiltersChange={setActivePriceLocation}
                                    />
                                    <MeasurementFilter
                                        measurements={activeMeasurements}
                                        onMeasurementChange={
                                            setActiveMeasurements
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <InclusionFilter
                                        inclusions={manualInclusions}
                                        onInclusionChange={setManualInclusions}
                                    />
                                    <KeySymbolFilter
                                        filters={manualKeySymbols}
                                        onFiltersChange={setManualKeySymbols}
                                    />
                                    <PriceLocationFilter
                                        filters={manualPriceLocation}
                                        onFiltersChange={setManualPriceLocation}
                                    />
                                    <MeasurementFilter
                                        measurements={manualMeasurements}
                                        onMeasurementChange={
                                            setManualMeasurements
                                        }
                                    />
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Inventory Table/Active Diamonds */}
                {!isLoadingStats && (
                    <div className="mt-4 w-full">
                        {/* Active Diamonds Table - Only mount after first view */}
                        {hasActiveDiamondsBeenViewed && (
                            <div
                                key="active-diamonds-container"
                                style={{
                                    display:
                                        viewMode === "active"
                                            ? "block"
                                            : "none",
                                }}
                            >
                                <DiamondStockTable
                                    searchTerm={
                                        isSearchMode ? currentSearchTerm : ""
                                    }
                                    selectedShape={activeSelectedShape}
                                    selectedColor={activeSelectedColor}
                                    selectedMinCarat={
                                        activeSelectedCaratRanges[0]?.min || ""
                                    }
                                    selectedMaxCarat={
                                        activeSelectedCaratRanges[0]?.max || ""
                                    }
                                    selectedClarity={activeSelectedClarity}
                                    selectedFluor={activeSelectedFluor}
                                    selectedCut={activeSelectedCut}
                                    selectedPolish={activeSelectedPolish}
                                    selectedSymmetry={activeSelectedSymmetry}
                                    inclusionFilters={activeInclusions}
                                    keySymbolFilters={activeKeySymbols}
                                    priceFilters={activePriceLocation}
                                    selectedLocations={
                                        activePriceLocation.locations
                                    }
                                    selectedLabs={activePriceLocation.labs}
                                    measurementFilters={{
                                        length: activeMeasurements.length,
                                        width: activeMeasurements.width,
                                        depth: activeMeasurements.depth,
                                        table: activeMeasurements.table,
                                        depthPercent:
                                            activeMeasurements.depthPercent,
                                        pavAngle: activeMeasurements.pavAngle,
                                        pavHeight: activeMeasurements.pavHeight,
                                        crAngle: activeMeasurements.crAngle,
                                        crHeight: activeMeasurements.crHeight,
                                    }}
                                />
                            </div>
                        )}

                        {/* Inventory Table - Always mounted */}
                        <div
                            style={{
                                display:
                                    viewMode === "inventory" ? "block" : "none",
                            }}
                        >
                            {isSearchMode ? (
                                <InventoryDiamondTable
                                    data={searchResults}
                                    loading={isSearching}
                                    error={null}
                                    viewMode="list"
                                    externalPagination={searchPagination}
                                    onCopyToManual={handleCopyToManual}
                                    refreshNonce={inventoryRefreshNonce}
                                    filterProps={{
                                        shapes: inventorySelectedShape,
                                        colors: inventorySelectedColor,
                                        clarities: inventorySelectedClarity,
                                        minCarats:
                                            inventorySelectedCaratRanges[0]?.min
                                                ? parseFloat(
                                                      inventorySelectedCaratRanges[0]
                                                          .min,
                                                  )
                                                : undefined,
                                        maxCarats:
                                            inventorySelectedCaratRanges[0]?.max
                                                ? parseFloat(
                                                      inventorySelectedCaratRanges[0]
                                                          .max,
                                                  )
                                                : undefined,
                                        fluors: inventorySelectedFluor,
                                        cut: inventorySelectedCut,
                                        polish: inventorySelectedPolish,
                                        symmetry: inventorySelectedSymmetry,
                                        inclusions: inventoryInclusions,
                                        keySymbols: inventoryKeySymbols,
                                        priceFilters: inventoryPriceLocation,
                                        locations:
                                            inventoryPriceLocation.locations,
                                        labs: inventoryPriceLocation.labs,
                                        measurements: {
                                            length: inventoryMeasurements.length,
                                            width: inventoryMeasurements.width,
                                            depth: inventoryMeasurements.depth,
                                            table: inventoryMeasurements.table,
                                            depthPercent:
                                                inventoryMeasurements.depthPercent,
                                            pavAngle:
                                                inventoryMeasurements.pavAngle,
                                            pavHeight:
                                                inventoryMeasurements.pavHeight,
                                            crAngle:
                                                inventoryMeasurements.crAngle,
                                            crHeight:
                                                inventoryMeasurements.crHeight,
                                        },
                                    }}
                                />
                            ) : (
                                <InventoryDiamondTable
                                    viewMode="list"
                                    onCopyToManual={handleCopyToManual}
                                    refreshNonce={inventoryRefreshNonce}
                                    filterProps={{
                                        shapes: inventorySelectedShape,
                                        colors: inventorySelectedColor,
                                        clarities: inventorySelectedClarity,
                                        minCarats:
                                            inventorySelectedCaratRanges[0]?.min
                                                ? parseFloat(
                                                      inventorySelectedCaratRanges[0]
                                                          .min,
                                                  )
                                                : undefined,
                                        maxCarats:
                                            inventorySelectedCaratRanges[0]?.max
                                                ? parseFloat(
                                                      inventorySelectedCaratRanges[0]
                                                          .max,
                                                  )
                                                : undefined,
                                        fluors: inventorySelectedFluor,
                                        cut: inventorySelectedCut,
                                        polish: inventorySelectedPolish,
                                        symmetry: inventorySelectedSymmetry,
                                        inclusions: inventoryInclusions,
                                        keySymbols: inventoryKeySymbols,
                                        priceFilters: inventoryPriceLocation,
                                        locations:
                                            inventoryPriceLocation.locations,
                                        labs: inventoryPriceLocation.labs,
                                        measurements: {
                                            length: inventoryMeasurements.length,
                                            width: inventoryMeasurements.width,
                                            depth: inventoryMeasurements.depth,
                                            table: inventoryMeasurements.table,
                                            depthPercent:
                                                inventoryMeasurements.depthPercent,
                                            pavAngle:
                                                inventoryMeasurements.pavAngle,
                                            pavHeight:
                                                inventoryMeasurements.pavHeight,
                                            crAngle:
                                                inventoryMeasurements.crAngle,
                                            crHeight:
                                                inventoryMeasurements.crHeight,
                                        },
                                    }}
                                />
                            )}
                        </div>

                        {/* Manual Diamonds Table */}
                        <div
                            style={{
                                display:
                                    viewMode === "manual" ? "block" : "none",
                            }}
                        >
                            <InventoryDiamondTable
                                viewMode="list"
                                onEditDiamond={handleEditDiamond}
                                onDeleteDiamond={handleDeleteDiamond}
                                filterProps={{
                                    source: "Dalila_Manual",
                                    shapes: manualSelectedShape,
                                    colors: manualSelectedColor,
                                    clarities: manualSelectedClarity,
                                    minCarats: manualSelectedCaratRanges[0]?.min
                                        ? parseFloat(
                                              manualSelectedCaratRanges[0].min,
                                          )
                                        : undefined,
                                    maxCarats: manualSelectedCaratRanges[0]?.max
                                        ? parseFloat(
                                              manualSelectedCaratRanges[0].max,
                                          )
                                        : undefined,
                                    fluors: manualSelectedFluor,
                                    cut: manualSelectedCut,
                                    polish: manualSelectedPolish,
                                    symmetry: manualSelectedSymmetry,
                                    inclusions: manualInclusions,
                                    keySymbols: manualKeySymbols,
                                    priceFilters: manualPriceLocation,
                                    locations: manualPriceLocation.locations,
                                    labs: manualPriceLocation.labs,
                                    measurements: {
                                        length: manualMeasurements.length,
                                        width: manualMeasurements.width,
                                        depth: manualMeasurements.depth,
                                        table: manualMeasurements.table,
                                        depthPercent:
                                            manualMeasurements.depthPercent,
                                        pavAngle: manualMeasurements.pavAngle,
                                        pavHeight: manualMeasurements.pavHeight,
                                        crAngle: manualMeasurements.crAngle,
                                        crHeight: manualMeasurements.crHeight,
                                    },
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Supplier Management Modal */}
            <SupplierManagementModal
                isOpen={showSupplierModal}
                onClose={() => setShowSupplierModal(false)}
                suppliers={suppliers}
                onSupplierUpdate={handleSupplierUpdate}
            />

            {/* Add/Edit Diamond Modal */}
            <AddDiamondModal
                isOpen={showAddDiamondModal}
                onClose={() => {
                    setShowAddDiamondModal(false);
                    setEditDiamondData(null);
                }}
                onDiamondAdded={handleSupplierUpdate}
                editData={editDiamondData}
            />
        </div>
    );
}
