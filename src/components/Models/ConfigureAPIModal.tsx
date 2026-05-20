"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, ArrowLeft, Package, Globe, Check, Clock, Save, Loader2 } from "lucide-react";
import ShapeFilter from "../Filters/ShapeFilter";
import CaratFilter from "../Filters/CaratFilter";
import ClarityFilter from "../Filters/ClarityFilter";
import ColorFilter from "../Filters/ColorFilter";
import InventoryDiamondTable from "../InventoryDiamondTable";
import { inventoryApi } from "@/lib/api";
import toast from "react-hot-toast";
import DiamondDetailView from "../DiamondDetailView";
import { API_URL } from "@/services/api/base/apiClient";

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
  REPORT_COMMENTS?: string;
  REPORT_DATE?: string;
  CROWN_ANGLE?: string;
  CROWN_HEIGHT?: string;
  PAVILLION_ANGLE?: string;
  PAVILLION_HEIGHT?: string;
  CN?: string;
  CW?: string;
  SN?: string;
  SW?: string;
  TINGE?: string;
  LENGTH?: string;
  WIDTH?: string;
  DEPTH?: string;
  GIRDLE?: string;
  GIRDLE_PER?: string;
  STAR?: string;
  RATIO?: string;
  KEY_TO_SYMBOLS?: string | string[];
  ARROW_IMAGE?: string;
  HEART_IMAGE?: string;
  DNA?: string;
  HA?: string;
  BRANCH?: string;
  STAGE?: string;
}

interface ConfigureAPIModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplierName: string;
  onConfigSaved?: () => void;
}

interface RapnetScheduleData {
  jobKey: string;
  enabled: boolean;
  cronExpression: string;
  timezone: string;
  startTime: string;
  intervalHours: number;
  resolvedFrom: string;
  lastRunAt: string | null;
  lastRunSuccess: boolean | null;
  lastRunMessage: string | null;
  nextRunAt: string | null;
  credentialsConfigured: boolean;
}

const RAPNET_SCHEDULE_API = `${API_URL}/api/diamonds/admin/rapnet-schedule`;

const ALLOWED_INTERVAL_HOURS = [1, 2, 3, 4, 6, 8, 12, 24] as const;

const ALL_SHAPES = [
  "ROUND",
  "RADIANT",
  "PEAR",
  "SQUARE",
  "EMERALD",
  "OVAL",
  "CUSHION",
  "TRILLIANT",
  "HEART",
  "PRINCESS",
  "MARQUISE",
  "OTHER",
];

const formatScheduleDateTime = (iso: string | null, timeZone?: string) => {
  if (!iso) return "—";
  try {
    const date = new Date(iso);
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: timeZone || undefined,
      timeZoneName: "short",
    }).format(date);
  } catch {
    return iso;
  }
};

const ConfigureAPIModal: React.FC<ConfigureAPIModalProps> = ({
  isOpen,
  onClose,
  supplierName,
  onConfigSaved,
}) => {
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [selectedCaratRanges, setSelectedCaratRanges] = useState<
    { min: string; max: string }[]
  >([]);
  const [selectedClarities, setSelectedClarities] = useState<string[]>([]);
  const [selectedSpecial, setSelectedSpecial] = useState<string>("");
  const [selectedCut, setSelectedCut] = useState<string>("");
  const [selectedPolish, setSelectedPolish] = useState<string>("");
  const [selectedSymmetry, setSelectedSymmetry] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCutsForPayload, setSelectedCutsForPayload] = useState<
    string[]
  >([]);

  const [isApplying, setIsApplying] = useState(false);
  const [activeTab, setActiveTab] = useState<'inventory' | 'api'>('inventory');
  const [diamondData, setDiamondData] = useState<InventoryDiamond[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paginationInfo, setPaginationInfo] = useState<{
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    recordsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  } | undefined>(undefined);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDiamond, setSelectedDiamond] = useState<InventoryDiamond | null>(null);

  // For Check button and dropdown
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filterData, setFilterData] = useState<Record<string, string[]> | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  // For Discount management
  const [showDiscountDropdown, setShowDiscountDropdown] = useState(false);
  const [discountData, setDiscountData] = useState<any>(null);
  const [isGettingDiscount, setIsGettingDiscount] = useState(false);
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [discountValue, setDiscountValue] = useState("");

  // For RapNet schedule (only used when supplierName === "rapnet")
  const isRapnet = supplierName === "rapnet";
  const [rapnetSchedule, setRapnetSchedule] = useState<RapnetScheduleData | null>(null);
  const [rapnetStartTime, setRapnetStartTime] = useState<string>("");
  const [rapnetIntervalHours, setRapnetIntervalHours] = useState<number>(24);
  const [rapnetScheduleLoading, setRapnetScheduleLoading] = useState(false);
  const [rapnetScheduleSaving, setRapnetScheduleSaving] = useState(false);

  const fetchRapnetSchedule = useCallback(async () => {
    setRapnetScheduleLoading(true);
    try {
      const response = await fetch(RAPNET_SCHEDULE_API, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch RapNet schedule");
      const json = await response.json();
      if (json.success && json.data) {
        setRapnetSchedule(json.data);
        setRapnetStartTime(json.data.startTime || "");
        setRapnetIntervalHours(json.data.intervalHours || 24);
      } else {
        toast.error(json.message || "Failed to load schedule");
      }
    } catch (err) {
      console.error("Error fetching RapNet schedule:", err);
      toast.error(err instanceof Error ? err.message : "Failed to load schedule");
    } finally {
      setRapnetScheduleLoading(false);
    }
  }, []);

  const handleSaveRapnetSchedule = async () => {
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(rapnetStartTime)) {
      toast.error("Start time must be in HH:MM (24-hour) format");
      return;
    }
    if (
      !ALLOWED_INTERVAL_HOURS.includes(
        rapnetIntervalHours as (typeof ALLOWED_INTERVAL_HOURS)[number],
      )
    ) {
      toast.error(
        `Interval hours must be one of: ${ALLOWED_INTERVAL_HOURS.join(", ")}`,
      );
      return;
    }

    setRapnetScheduleSaving(true);
    try {
      const response = await fetch(RAPNET_SCHEDULE_API, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startTime: rapnetStartTime,
          intervalHours: rapnetIntervalHours,
          enabled: true,
        }),
      });
      if (!response.ok) throw new Error("Failed to update RapNet schedule");
      const json = await response.json();
      if (json.success) {
        toast.success(json.message || "Schedule updated successfully");
        if (json.data) {
          setRapnetSchedule(json.data);
          setRapnetStartTime(json.data.startTime || rapnetStartTime);
          setRapnetIntervalHours(json.data.intervalHours || rapnetIntervalHours);
        } else {
          fetchRapnetSchedule();
        }
      } else {
        toast.error(json.message || "Failed to update schedule");
      }
    } catch (err) {
      console.error("Error saving RapNet schedule:", err);
      toast.error(err instanceof Error ? err.message : "Failed to save schedule");
    } finally {
      setRapnetScheduleSaving(false);
    }
  };

  // Handle Check button click
  const handleCheckFilters = async () => {
    setIsChecking(true);
    setShowFilterDropdown(false);
    setFilterData(null);
    try {
      const response = await fetch(
        `${API_URL}/api/users/admin/supplier-settings/${encodeURIComponent(supplierName)}/filters`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch filter data");
      const data = await response.json();
      if (data.success && data.data) {
        setFilterData(data.data);
        setShowFilterDropdown(true);
      } else {
        toast.error(data.message || "No filter data found");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to fetch filter data");
    } finally {
      setIsChecking(false);
    }
  };

  // Handle Get Discount button click
  const handleGetDiscount = async () => {
    setIsGettingDiscount(true);
    setShowDiscountDropdown(false);
    setDiscountData(null);
    try {
      const response = await inventoryApi.getDiscountRules(supplierName);
      if (response.success && response.data) {
        setDiscountData(response.data);
        setShowDiscountDropdown(true);
        toast.success("Discount rules fetched successfully");
      } else {
        toast.error(response.message || "No discount rules found");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to fetch discount rules");
    } finally {
      setIsGettingDiscount(false);
    }
  };

  // Handle Apply Discount button click - Opens modal
  const handleOpenDiscountModal = () => {
    setDiscountValue("");
    setShowDiscountModal(true);
  };

  const allShapesSelected =
    selectedShapes.length > 0 &&
    ALL_SHAPES.every((s) => selectedShapes.includes(s));

  const handleToggleAllShapes = () => {
    if (allShapesSelected) {
      setSelectedShapes([]);
    } else {
      setSelectedShapes([...ALL_SHAPES]);
    }
  };

  // Handle discount confirmation
  const handleConfirmDiscount = async () => {
    const discount = parseFloat(discountValue);
    if (isNaN(discount)) {
      toast.error("Please enter a valid numeric discount value");
      return;
    }

    setShowDiscountModal(false);
    setIsApplyingDiscount(true);
    
    // Show loading toast
    const loadingToast = toast.loading("Applying discount... This may take a moment.");
    
    try {
      // Convert selectedCut string to array
      const cutArray = selectedCut ? selectedCut.split(",").map(c => c.trim()) : [];
      
      // Calculate min and max carat from selected ranges
      let minCarat: number | undefined;
      let maxCarat: number | undefined;
      if (selectedCaratRanges.length > 0) {
        const mins = selectedCaratRanges.map((r) => parseFloat(r.min));
        const maxs = selectedCaratRanges.map((r) => parseFloat(r.max));
        minCarat = Math.min(...mins);
        maxCarat = Math.max(...maxs);
      }

      const discountPayload = {
        discount: discount,
        shapes: selectedShapes.length > 0 ? selectedShapes : undefined,
        colors: selectedColors.length > 0 ? selectedColors : undefined,
        carats: minCarat && maxCarat ? { min: minCarat, max: maxCarat } : undefined,
        cuts: cutArray.length > 0 ? cutArray : undefined,
        clarities: selectedClarities.length > 0 ? selectedClarities : undefined,
      };

      const response = await inventoryApi.applyDiscountRules(supplierName, discountPayload);

      toast.dismiss(loadingToast);
      
      if (response.success) {
        toast.success(response.message || "Discount applied successfully!");
        // Refresh discount data
        handleGetDiscount();
      } else {
        toast.error(response.message || "Failed to apply discount");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error("Error applying discount:", err);
      toast.error(err instanceof Error ? err.message : "Failed to apply discount");
    } finally {
      setIsApplyingDiscount(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      // Reset filters when modal closes
      clearAllFilters();
      setDiamondData([]);
      setCurrentPage(1);
      setPaginationInfo(undefined);
      setSelectedDiamond(null);
    }
  }, [isOpen]);

  const fetchFilteredData = useCallback(async (page: number = currentPage) => {
    try {
      setLoading(true);
      setError(null);

      // Calculate min and max carat from selected ranges
      let minCarat: number | undefined;
      let maxCarat: number | undefined;
      if (selectedCaratRanges.length > 0) {
        const mins = selectedCaratRanges.map((r) => parseFloat(r.min));
        const maxs = selectedCaratRanges.map((r) => parseFloat(r.max));
        minCarat = Math.min(...mins);
        maxCarat = Math.max(...maxs);
      }

      console.log('Fetching with filters:', {
        source: supplierName,
        shapes: selectedShapes,
        colors: selectedColors,
        clarities: selectedClarities,
        minCarat,
        maxCarat,
        page,
        limit: rowsPerPage
      });

      // Fetch diamonds with pagination
      const response = await inventoryApi.searchDiamonds({
        source: supplierName,
        page: page,
        limit: rowsPerPage,
        shapes: selectedShapes.length > 0 ? selectedShapes : undefined,
        colors: selectedColors.length > 0 ? selectedColors : undefined,
        clarities: selectedClarities.length > 0 ? selectedClarities : undefined,
        minCarats: minCarat,
        maxCarats: maxCarat,
      });

      console.log('Filtered response:', response);
      console.log('Number of diamonds:', response.data?.length || 0);
      setDiamondData(response.data || []);
      setPaginationInfo(response.pagination || null);
    } catch (err) {
      console.error('Error fetching diamond data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setDiamondData([]);
    } finally {
      setLoading(false);
    }
  }, [supplierName, selectedShapes, selectedCaratRanges, selectedClarities, selectedColors, currentPage, rowsPerPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (isOpen && activeTab === 'inventory') {
      setCurrentPage(1);
    }
  }, [isOpen, activeTab, selectedShapes, selectedCaratRanges, selectedClarities, selectedColors]);

  // Fetch diamond data when page or filters change
  useEffect(() => {
    if (isOpen && activeTab === 'inventory') {
      fetchFilteredData(currentPage);
    }
  }, [isOpen, activeTab, currentPage, rowsPerPage, supplierName, fetchFilteredData]);

  // Fetch RapNet schedule when API tab opens for rapnet
  useEffect(() => {
    if (isOpen && activeTab === 'api' && isRapnet) {
      fetchRapnetSchedule();
    }
  }, [isOpen, activeTab, isRapnet, fetchRapnetSchedule]);

  const handlePageChange = (page: number, newRowsPerPage: number) => {
    console.log('Page change requested:', { page, newRowsPerPage });
    if (newRowsPerPage !== rowsPerPage) {
      setRowsPerPage(newRowsPerPage);
      setCurrentPage(1); // Reset to page 1 when rows per page changes
    } else {
      setCurrentPage(page);
    }
  };

  const clearAllFilters = () => {
    setSelectedShapes([]);
    setSelectedCaratRanges([]);
    setSelectedClarities([]);
    setSelectedSpecial("");
    setSelectedCut("");
    setSelectedPolish("");
    setSelectedSymmetry("");
    setSelectedColors([]);
    setSelectedCutsForPayload([]);
  };

  const handleApplyFilters = async () => {
    try {
      setIsApplying(true);

      // Calculate min and max carat from selected ranges
      let minCarat = 0;
      let maxCarat = 0;
      if (selectedCaratRanges.length > 0) {
        const mins = selectedCaratRanges.map((r) => parseFloat(r.min));
        const maxs = selectedCaratRanges.map((r) => parseFloat(r.max));
        minCarat = Math.min(...mins);
        maxCarat = Math.max(...maxs);
      }

      const filterPayload = {
        isFilterEnabled: true,
        shapes: selectedShapes.length > 0 ? selectedShapes : undefined,
        colors: selectedColors.length > 0 ? selectedColors : undefined,
        carats: selectedCaratRanges.length > 0 ? {
          min: minCarat,
          max: maxCarat,
        } : undefined,
        cuts:
          selectedCutsForPayload.length > 0
            ? selectedCutsForPayload
            : undefined,
        clarities:
          selectedClarities.length > 0 ? selectedClarities : undefined,
      };

      const response = await inventoryApi.applySupplierFilters(
        supplierName,
        filterPayload
      );

      if (response.success) {
        toast.success(response.message || "Filters applied successfully!");
        if (onConfigSaved) {
          onConfigSaved();
        }
        onClose();
      } else {
        toast.error(response.message || "Failed to apply filters");
      }
    } catch (err) {
      console.error("Error applying filters:", err);
      toast.error(err instanceof Error ? err.message : "Failed to apply filters");
    } finally {
      setIsApplying(false);
    }
  };

  if (!isOpen) return null;

  // If a diamond is selected, show DiamondDetailView instead of modal
  if (selectedDiamond) {
    return (
      <DiamondDetailView
        diamond={{
          ...selectedDiamond,
          CARATS: parseFloat(selectedDiamond.CARATS) || 0,
          RAP_PRICE: parseFloat(selectedDiamond.RAP_PRICE) || 0,
          DISC_PER: parseFloat(selectedDiamond.DISC_PER) || 0,
          NET_VALUE: parseFloat(selectedDiamond.NET_VALUE) || 0,
          NET_RATE: selectedDiamond.NET_RATE,
          TABLE_PER: selectedDiamond.TABLE_PER ? parseFloat(selectedDiamond.TABLE_PER) : undefined,
          DEPTH_PER: selectedDiamond.DEPTH_PER ? parseFloat(selectedDiamond.DEPTH_PER) : undefined,
          CROWN_ANGLE: selectedDiamond.CROWN_ANGLE ? parseFloat(selectedDiamond.CROWN_ANGLE) : undefined,
          CROWN_HEIGHT: selectedDiamond.CROWN_HEIGHT ? parseFloat(selectedDiamond.CROWN_HEIGHT) : undefined,
          PAVILLION_ANGLE: selectedDiamond.PAVILLION_ANGLE ? parseFloat(selectedDiamond.PAVILLION_ANGLE) : undefined,
          PAVILLION_HEIGHT: selectedDiamond.PAVILLION_HEIGHT ? parseFloat(selectedDiamond.PAVILLION_HEIGHT) : undefined,
          KEY_TO_SYMBOLS: Array.isArray(selectedDiamond.KEY_TO_SYMBOLS) 
            ? selectedDiamond.KEY_TO_SYMBOLS.join(", ") 
            : selectedDiamond.KEY_TO_SYMBOLS,
          STAGE: selectedDiamond.STAGE || 'inventory',
        }}
        onClose={() => setSelectedDiamond(null)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white p-6 flex justify-between items-center flex-shrink-0 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-1 border border-[#B6B8C6] rounded px-2 py-1 bg-white text-[#373B5C] font-normal text-base shadow-sm hover:bg-gray-50 focus:outline-none"
              style={{ boxShadow: '0 0 0 1px #E0E1EA', minWidth: 'auto' }}
            >
              <ArrowLeft size={18} stroke="#373B5C" strokeWidth={2} />
              <span style={{fontFamily: 'inherit', fontWeight: 400, fontSize: '15px'}}>Back to List</span>
            </button>
            <h2 className="text-xl font-bold text-[#050C3A] ml-1">Configure API</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#050C3A] hover:text-gray-400 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Top Toggle */}
        <div className="flex border-b border-gray-200">
          <button
            className={`w-1/2 py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'inventory' ? 'text-white' : 'text-gray-700'
            }`}
            style={{ backgroundColor: activeTab === 'inventory' ? '#050C3A' : '#FAF6EB' }}
            onClick={() => setActiveTab('inventory')}
          >
            <Package className="w-4 h-4" />
            Configure Inventory Data
          </button>
          <button
            className={`w-1/2 py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'api' ? 'text-white' : 'text-gray-700'
            }`}
            style={{ backgroundColor: activeTab === 'api' ? '#050C3A' : '#FAF6EB' }}
            onClick={() => setActiveTab('api')}
          >
            <Globe className="w-4 h-4" />
            Configure API Data
          </button>
        </div>
        
        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'inventory' ? (
            <>
              <div className="grid grid-cols-3 gap-4 mb-3">
                {/* Shape Filter - Column 1 */}
                <div>
                  <ShapeFilter
                    selectedShape={selectedShapes}
                    onShapeChange={setSelectedShapes}
                  />
                </div>

                {/* Carat Filter - Column 2 */}
                <div>
                  <CaratFilter
                    selectedCaratRanges={selectedCaratRanges}
                    onCaratChange={setSelectedCaratRanges}
                  />
                </div>

                {/* Column 3 - Clarity and Color stacked */}
                <div className="flex flex-col gap-4">
                  {/* Clarity Filter */}
                  <div>
                    <ClarityFilter
                      selectedClarity={selectedClarities}
                      selectedSpecial={selectedSpecial}
                      selectedCut={selectedCut}
                      selectedPolish={selectedPolish}
                      selectedSymmetry={selectedSymmetry}
                      onClarityChange={setSelectedClarities}
                      onSpecialChange={setSelectedSpecial}
                      onCutChange={setSelectedCut}
                      onPolishChange={setSelectedPolish}
                      onSymmetryChange={setSelectedSymmetry}
                      hideExtras={true}
                    />
                  </div>

                  {/* Color Filter - Below Clarity */}
                  <div>
                    <ColorFilter
                      selectedColor={selectedColors}
                      onColorChange={setSelectedColors}
                    />
                  </div>
                </div>
              </div>

              {/* Save Button - Positioned at the right end below filters */}
              <div className="flex justify-end mb-3 gap-2">
                {/* Select All Shapes Button */}
                <button
                  onClick={handleToggleAllShapes}
                  className="bg-[#050C3A] text-white px-6 py-2 rounded-md hover:bg-[#070d4a] transition-colors font-medium flex items-center gap-2"
                  title="Select all shapes for discount"
                >
                  <Check className="w-4 h-4" />
                  {allShapesSelected ? "Clear All Shapes" : "Select All Shapes"}
                </button>

                {/* Check Button */}
                <div className="relative">
                  <button
                    onClick={handleCheckFilters}
                    disabled={isChecking}
                    className="bg-[#050C3A] text-white px-6 py-2 rounded-md hover:bg-[#070d4a] transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {isChecking ? "Loading..." : "Applied Filters"}
                  </button>
                  {/* Dropdown for filter data */}
                  {showFilterDropdown && filterData && (
                    <div className="absolute right-0 mt-2 w-80 bg-[#FAF6EB] text-gray-900 border border-gray-300 rounded shadow-lg z-50 p-4 text-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">Applied Filters</span>
                        <button onClick={() => setShowFilterDropdown(false)} className="text-gray-600 hover:text-gray-900"><X className="w-4 h-4" /></button>
                      </div>
                      <div className="space-y-1">
                        {Object.entries(filterData).map(([key, value]) => (
                          <div key={key} className="flex gap-2 text-gray-800">
                            <span className="font-medium capitalize min-w-[80px]">{key}:</span>
                            <span>
                              {Array.isArray(value)
                                ? value.join(", ")
                                : typeof value === "object" && value !== null
                                  ? Object.entries(value).map(([k, v]) => `${k}: ${v}`).join(", ")
                                  : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Get Discount Button */}
                <div className="relative">
                  <button
                    onClick={handleGetDiscount}
                    disabled={isGettingDiscount}
                    className="bg-[#050C3A] text-white px-6 py-2 rounded-md hover:bg-[#070d4a] transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {isGettingDiscount ? "Loading..." : "Get Discount"}
                  </button>
                  {/* Dropdown for discount data */}
                  {showDiscountDropdown && discountData && (
                    <div className="absolute right-0 mt-2 w-80 bg-[#FAF6EB] text-gray-900 border border-gray-300 rounded shadow-lg z-50 p-4 text-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">Current Discount Rules</span>
                        <button onClick={() => setShowDiscountDropdown(false)} className="text-gray-600 hover:text-gray-900"><X className="w-4 h-4" /></button>
                      </div>
                      <div className="space-y-1">
                        <div className="flex gap-2 text-gray-800">
                          <span className="font-medium min-w-[80px]">Discount:</span>
                          <span className="font-bold">{discountData.discount}%</span>
                        </div>
                        {discountData.shapes && (
                          <div className="flex gap-2 text-gray-800">
                            <span className="font-medium min-w-[80px]">Shapes:</span>
                            <span>{discountData.shapes.join(", ")}</span>
                          </div>
                        )}
                        {discountData.colors && (
                          <div className="flex gap-2 text-gray-800">
                            <span className="font-medium min-w-[80px]">Colors:</span>
                            <span>{discountData.colors.join(", ")}</span>
                          </div>
                        )}
                        {discountData.clarities && (
                          <div className="flex gap-2 text-gray-800">
                            <span className="font-medium min-w-[80px]">Clarities:</span>
                            <span>{discountData.clarities.join(", ")}</span>
                          </div>
                        )}
                        {discountData.cuts && (
                          <div className="flex gap-2 text-gray-800">
                            <span className="font-medium min-w-[80px]">Cuts:</span>
                            <span>{discountData.cuts.join(", ")}</span>
                          </div>
                        )}
                        {discountData.carats && (
                          <div className="flex gap-2 text-gray-800">
                            <span className="font-medium min-w-[80px]">Carats:</span>
                            <span>{discountData.carats.min} - {discountData.carats.max}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Apply Discount Button */}
                <div className="relative">
                  <button
                    onClick={handleOpenDiscountModal}
                    disabled={isApplyingDiscount}
                    className="bg-[#050C3A] text-white px-6 py-2 rounded-md hover:bg-[#070d4a] transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isApplyingDiscount ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    {isApplyingDiscount ? "Applying..." : "Apply Discount"}
                  </button>

                  {/* Discount Input Modal */}
                  {showDiscountModal && (
                    <div className="absolute bottom-full right-0 mb-2 bg-white border-2 border-[#050C3A] rounded-lg shadow-xl p-4 z-50 w-80">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-base font-semibold text-[#050C3A]">Enter Discount Percentage</h3>
                        <button
                          onClick={() => setShowDiscountModal(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="mb-3">
                        <input
                          type="number"
                          value={discountValue}
                          onChange={(e) => setDiscountValue(e.target.value)}
                          placeholder="Enter discount value"
                          step="0.1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#050C3A] focus:border-transparent"
                          autoFocus
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleConfirmDiscount();
                            }
                          }}
                        />
                      </div>

                      {/* Selected Filters Summary */}
                      <div className="mb-3 p-2 bg-[#FAF6EB] rounded text-xs">
                        <p className="font-semibold text-gray-700 mb-1">Selected Filters:</p>
                        <div className="space-y-0.5 text-gray-600">
                          {selectedShapes.length > 0 && (
                            <p><span className="font-medium">Shapes:</span> {selectedShapes.join(", ")}</p>
                          )}
                          {selectedColors.length > 0 && (
                            <p><span className="font-medium">Colors:</span> {selectedColors.join(", ")}</p>
                          )}
                          {selectedClarities.length > 0 && (
                            <p><span className="font-medium">Clarities:</span> {selectedClarities.join(", ")}</p>
                          )}
                          {selectedCut && (
                            <p><span className="font-medium">Cuts:</span> {selectedCut}</p>
                          )}
                          {selectedCaratRanges.length > 0 && (
                            <p><span className="font-medium">Carats:</span> {Math.min(...selectedCaratRanges.map(r => parseFloat(r.min)))} - {Math.max(...selectedCaratRanges.map(r => parseFloat(r.max)))}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowDiscountModal(false)}
                          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleConfirmDiscount}
                          className="flex-1 px-4 py-2 bg-[#050C3A] text-white rounded-md hover:bg-[#070d4a] transition-colors font-medium"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <button
                  onClick={handleApplyFilters}
                  disabled={isApplying}
                  className="bg-[#050c3a] text-white px-12 py-2 rounded-md hover:bg-[#070d4a] transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 mr-5"
                >
                  <Check className="w-4 h-4" />
                  {isApplying ? "Saving..." : "Save"}
                </button>
              </div>

              {/* Diamond Data Table */}
              <div>
                <InventoryDiamondTable
                  data={diamondData}
                  loading={loading}
                  error={error}
                  viewMode="list"
                  externalPagination={paginationInfo}
                  onPageChange={handlePageChange}
                  pageSize={rowsPerPage}
                  onDiamondSelect={(diamond) => setSelectedDiamond(diamond)}
                />
                {/* Diamond count summary */}
                {paginationInfo && (
                  <div className="mt-4 p-3 bg-[#050C3A] border border-blue-200">
                    <p className="text-sm font-semibold text-white">
                      Total diamonds {paginationInfo.totalRecords.toLocaleString()} from {supplierName}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : isRapnet ? (
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#050C3A]" />
                <h3 className="text-lg font-semibold text-[#050C3A]">RapNet Schedule</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Configure the RapNet inventory refresh cron schedule
              </p>

              {rapnetScheduleLoading && !rapnetSchedule ? (
                <div className="flex items-center justify-center h-40">
                  <span className="text-gray-500">Loading schedule…</span>
                </div>
              ) : (
                <>
                  {/* Editable fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time (HH:MM, 24-hour)
                      </label>
                      <input
                        type="time"
                        value={rapnetStartTime}
                        onChange={(e) => setRapnetStartTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#050C3A] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Interval (hours)
                      </label>
                      <select
                        value={rapnetIntervalHours}
                        onChange={(e) => setRapnetIntervalHours(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#050C3A] focus:border-transparent bg-white"
                      >
                        {ALLOWED_INTERVAL_HOURS.map((h) => (
                          <option key={h} value={h}>
                            {h} {h === 1 ? "hour" : "hours"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Read-only info */}
                  {rapnetSchedule && (
                    <div className="bg-[#FAF6EB] border border-gray-200 rounded-md p-4 text-sm space-y-2 mb-4">
                      <div className="flex justify-between gap-4">
                        <span className="font-medium text-gray-700">Status</span>
                        <span className={rapnetSchedule.enabled ? "text-green-700" : "text-red-700"}>
                          {rapnetSchedule.enabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="font-medium text-gray-700">Timezone</span>
                        <span className="text-gray-900">{rapnetSchedule.timezone}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="font-medium text-gray-700">Credentials</span>
                        <span className={rapnetSchedule.credentialsConfigured ? "text-green-700" : "text-red-700"}>
                          {rapnetSchedule.credentialsConfigured ? "Configured" : "Not configured"}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="font-medium text-gray-700">Last Run</span>
                        <span className="text-gray-900">
                          {formatScheduleDateTime(rapnetSchedule.lastRunAt, rapnetSchedule.timezone)}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="font-medium text-gray-700">Last Run Result</span>
                        <span
                          className={
                            rapnetSchedule.lastRunSuccess
                              ? "text-green-700"
                              : rapnetSchedule.lastRunSuccess === false
                              ? "text-red-700"
                              : "text-gray-900"
                          }
                        >
                          {rapnetSchedule.lastRunSuccess === null
                            ? "—"
                            : rapnetSchedule.lastRunSuccess
                            ? "Success"
                            : "Failed"}
                        </span>
                      </div>
                      {rapnetSchedule.lastRunMessage && (
                        <div className="flex justify-between gap-4">
                          <span className="font-medium text-gray-700">Last Run Message</span>
                          <span className="text-gray-900 text-right">{rapnetSchedule.lastRunMessage}</span>
                        </div>
                      )}
                      <div className="flex justify-between gap-4">
                        <span className="font-medium text-gray-700">Next Run</span>
                        <span className="text-gray-900">
                          {formatScheduleDateTime(rapnetSchedule.nextRunAt, rapnetSchedule.timezone)}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveRapnetSchedule}
                      disabled={rapnetScheduleSaving || rapnetScheduleLoading}
                      className="bg-[#050C3A] text-white px-6 py-2 rounded-md hover:bg-[#070d4a] transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {rapnetScheduleSaving ? "Saving…" : "Save Schedule"}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <span className="text-2xl font-bold text-gray-400 mb-2">Coming Soon</span>
              <span className="text-gray-500">This feature will be available in a future update.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigureAPIModal;