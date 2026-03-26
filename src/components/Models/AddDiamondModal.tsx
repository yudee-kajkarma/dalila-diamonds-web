"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { Maven_Pro, Marcellus } from "next/font/google";
import { inventoryApi } from "@/lib/api";
import type { ManualDiamondPayload } from "@/services/api/types/diamond.types";

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

export interface DiamondEditData {
    _id: string;
    diamondId: string;
    STONE_NO: string;
    SHAPE: string;
    CARATS: string;
    COLOR: string;
    CLARITY: string;
    sourceType: string;
    CUT?: string;
    POL?: string;
    SYM?: string;
    FLOUR?: string;
    LAB?: string;
    LOCATION?: string;
    NET_RATE?: string;
    DISC_PER?: string;
    NET_VALUE?: string;
    RAP_PRICE?: string;
    DEPTH_PER?: string;
    TABLE_PER?: string;
    MEASUREMENTS?: string;
    REPORT_NO?: string;
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
    STAGE?: string;
    BRANCH?: string;
    HA?: string;
    DNA?: string;
}

interface AddDiamondModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDiamondAdded?: () => void;
    editData?: DiamondEditData | null;
}

const SHAPES = [
    "ROUND",
    "PRINCESS",
    "CUSHION",
    "OVAL",
    "EMERALD",
    "PEAR",
    "MARQUISE",
    "RADIANT",
    "ASSCHER",
    "HEART",
];
const COLORS = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
const CLARITIES = [
    "FL",
    "IF",
    "VVS1",
    "VVS2",
    "VS1",
    "VS2",
    "SI1",
    "SI2",
    "I1",
    "I2",
    "I3",
];
const CUTS = ["EX", "VG", "GD", "FR", "PR"];
const POLISHES = ["EX", "VG", "GD", "FR", "PR"];
const SYMMETRIES = ["EX", "VG", "GD", "FR", "PR"];
const FLUORS = ["NON", "FNT", "MED", "STG", "VST"];
const LABS = ["GIA", "IGI", "HRD", "AGS"];
const SOURCE_TYPES = ["DS4U", "MANUAL"];

const initialForm: ManualDiamondPayload = {
    STONE_NO: "",
    SHAPE: "",
    CARATS: "",
    COLOR: "",
    CLARITY: "",
    sourceType: "DS4U",
    CUT: "",
    POL: "",
    SYM: "",
    FLOUR: "",
    LAB: "",
    LOCATION: "",
    NET_RATE: "",
    DISC_PER: "",
    NET_VALUE: "",
    RAP_PRICE: "",
    DEPTH_PER: "",
    TABLE_PER: "",
    MEASUREMENTS: "",
    REPORT_NO: "",
    REPORT_COMMENTS: "",
    REPORT_DATE: "",
    CROWN_ANGLE: "",
    CROWN_HEIGHT: "",
    PAVILLION_ANGLE: "",
    PAVILLION_HEIGHT: "",
    CN: "",
    CW: "",
    SN: "",
    SW: "",
    TINGE: "",
    LENGTH: "",
    WIDTH: "",
    DEPTH: "",
    GIRDLE: "",
    GIRDLE_PER: "",
    STAR: "",
    RATIO: "",
    STAGE: "",
    BRANCH: "",
    HA: "",
    DNA: "",
};

const AddDiamondModal: React.FC<AddDiamondModalProps> = ({
    isOpen,
    onClose,
    onDiamondAdded,
    editData,
}) => {
    const [form, setForm] = useState<ManualDiamondPayload>({ ...initialForm });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEditMode = !!editData;

    // Populate form when editData changes
    useEffect(() => {
        if (editData) {
            setForm({
                STONE_NO: editData.STONE_NO || "",
                SHAPE: editData.SHAPE || "",
                CARATS: editData.CARATS || "",
                COLOR: editData.COLOR || "",
                CLARITY: editData.CLARITY || "",
                sourceType: editData.sourceType || "DS4U",
                CUT: editData.CUT || "",
                POL: editData.POL || "",
                SYM: editData.SYM || "",
                FLOUR: editData.FLOUR || "",
                LAB: editData.LAB || "",
                LOCATION: editData.LOCATION || "",
                NET_RATE: editData.NET_RATE || "",
                DISC_PER: editData.DISC_PER || "",
                NET_VALUE: editData.NET_VALUE || "",
                RAP_PRICE: editData.RAP_PRICE || "",
                DEPTH_PER: editData.DEPTH_PER || "",
                TABLE_PER: editData.TABLE_PER || "",
                MEASUREMENTS: editData.MEASUREMENTS || "",
                REPORT_NO: editData.REPORT_NO || "",
                REPORT_COMMENTS: editData.REPORT_COMMENTS || "",
                REPORT_DATE: editData.REPORT_DATE || "",
                CROWN_ANGLE: editData.CROWN_ANGLE || "",
                CROWN_HEIGHT: editData.CROWN_HEIGHT || "",
                PAVILLION_ANGLE: editData.PAVILLION_ANGLE || "",
                PAVILLION_HEIGHT: editData.PAVILLION_HEIGHT || "",
                CN: editData.CN || "",
                CW: editData.CW || "",
                SN: editData.SN || "",
                SW: editData.SW || "",
                TINGE: editData.TINGE || "",
                LENGTH: editData.LENGTH || "",
                WIDTH: editData.WIDTH || "",
                DEPTH: editData.DEPTH || "",
                GIRDLE: editData.GIRDLE || "",
                GIRDLE_PER: editData.GIRDLE_PER || "",
                STAR: editData.STAR || "",
                RATIO: editData.RATIO || "",
                STAGE: editData.STAGE || "",
                BRANCH: editData.BRANCH || "",
                HA: editData.HA || "",
                DNA: editData.DNA || "",
            });
        } else {
            setForm({ ...initialForm });
        }
    }, [editData]);

    const handleChange = (field: keyof ManualDiamondPayload, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !form.STONE_NO ||
            !form.SHAPE ||
            !form.CARATS ||
            !form.COLOR ||
            !form.CLARITY
        ) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsSubmitting(true);
        try {
            if (isEditMode && editData) {
                await inventoryApi.updateManualDiamond(
                    editData.diamondId,
                    form,
                );
                toast.success("Diamond updated successfully");
            } else {
                await inventoryApi.addManualDiamond(form);
                toast.success("Diamond added successfully");
            }
            setForm({ ...initialForm });
            onDiamondAdded?.();
            onClose();
        } catch (err) {
            console.error("Error saving diamond:", err);
            toast.error(
                isEditMode
                    ? "Failed to update diamond"
                    : "Failed to add diamond",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isEditMode) {
            setForm({ ...initialForm });
        }
        onClose();
    };

    if (!isOpen) return null;

    const inputClass =
        "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]";

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div
                className={`bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden ${mavenPro.className}`}
            >
                {/* Header */}
                <div className="bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                    <h2
                        className={`text-2xl font-bold text-[#040d39] ${marcellus.className}`}
                    >
                        {isEditMode ? "Edit Diamond" : "Add Diamond"}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
                >
                    {/* Required Fields */}
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                        Required Fields
                    </p>
                    <div
                        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 `}
                    >
                        <div
                            className={`${isEditMode ? "pointer-events-none opacity-50" : ""}`}
                        >
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Stone No *
                            </label>
                            <input
                                type="text"
                                value={form.STONE_NO}
                                onChange={(e) =>
                                    handleChange("STONE_NO", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. MANUAL-001"
                                required
                                disabled={isEditMode}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Shape *
                            </label>
                            <select
                                value={form.SHAPE}
                                onChange={(e) =>
                                    handleChange("SHAPE", e.target.value)
                                }
                                className={inputClass}
                                required
                            >
                                <option value="">Select Shape</option>
                                {SHAPES.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Carats *
                            </label>
                            <input
                                type="text"
                                value={form.CARATS}
                                onChange={(e) =>
                                    handleChange("CARATS", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 1.00"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Color *
                            </label>
                            <select
                                value={form.COLOR}
                                onChange={(e) =>
                                    handleChange("COLOR", e.target.value)
                                }
                                className={inputClass}
                                required
                            >
                                <option value="">Select Color</option>
                                {COLORS.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Clarity *
                            </label>
                            <select
                                value={form.CLARITY}
                                onChange={(e) =>
                                    handleChange("CLARITY", e.target.value)
                                }
                                className={inputClass}
                                required
                            >
                                <option value="">Select Clarity</option>
                                {CLARITIES.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Source Type *
                            </label>
                            <select
                                value={form.sourceType}
                                onChange={(e) =>
                                    handleChange("sourceType", e.target.value)
                                }
                                className={inputClass}
                                required
                            >
                                {SOURCE_TYPES.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Optional Fields - Grading */}
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                        Grading
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Cut
                            </label>
                            <select
                                value={form.CUT}
                                onChange={(e) =>
                                    handleChange("CUT", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Select Cut</option>
                                {CUTS.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Polish
                            </label>
                            <select
                                value={form.POL}
                                onChange={(e) =>
                                    handleChange("POL", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Select Polish</option>
                                {POLISHES.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Symmetry
                            </label>
                            <select
                                value={form.SYM}
                                onChange={(e) =>
                                    handleChange("SYM", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Select Symmetry</option>
                                {SYMMETRIES.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Fluorescence
                            </label>
                            <select
                                value={form.FLOUR}
                                onChange={(e) =>
                                    handleChange("FLOUR", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Select Fluorescence</option>
                                {FLUORS.map((f) => (
                                    <option key={f} value={f}>
                                        {f}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Lab
                            </label>
                            <select
                                value={form.LAB}
                                onChange={(e) =>
                                    handleChange("LAB", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Select Lab</option>
                                {LABS.map((l) => (
                                    <option key={l} value={l}>
                                        {l}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                value={form.LOCATION}
                                onChange={(e) =>
                                    handleChange("LOCATION", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. Mumbai"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Stage
                            </label>
                            <input
                                type="text"
                                value={form.STAGE}
                                onChange={(e) =>
                                    handleChange("STAGE", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. Stock"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Tinge
                            </label>
                            <input
                                type="text"
                                value={form.TINGE}
                                onChange={(e) =>
                                    handleChange("TINGE", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. None"
                            />
                        </div>
                    </div>

                    {/* Pricing */}
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                        Pricing
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Rap Price
                            </label>
                            <input
                                type="text"
                                value={form.RAP_PRICE}
                                onChange={(e) =>
                                    handleChange("RAP_PRICE", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 5000"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Discount %
                            </label>
                            <input
                                type="text"
                                value={form.DISC_PER}
                                onChange={(e) =>
                                    handleChange("DISC_PER", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. -35"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Net Rate ($/ct)
                            </label>
                            <input
                                type="text"
                                value={form.NET_RATE}
                                onChange={(e) =>
                                    handleChange("NET_RATE", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 3250"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Net Value ($)
                            </label>
                            <input
                                type="text"
                                value={form.NET_VALUE}
                                onChange={(e) =>
                                    handleChange("NET_VALUE", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 3250"
                            />
                        </div>
                    </div>

                    {/* Measurements */}
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                        Measurements
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Measurements
                            </label>
                            <input
                                type="text"
                                value={form.MEASUREMENTS}
                                onChange={(e) =>
                                    handleChange("MEASUREMENTS", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 6.5-6.52x4.03"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Length
                            </label>
                            <input
                                type="text"
                                value={form.LENGTH}
                                onChange={(e) =>
                                    handleChange("LENGTH", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 6.5"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Width
                            </label>
                            <input
                                type="text"
                                value={form.WIDTH}
                                onChange={(e) =>
                                    handleChange("WIDTH", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 6.52"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Depth
                            </label>
                            <input
                                type="text"
                                value={form.DEPTH}
                                onChange={(e) =>
                                    handleChange("DEPTH", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 4.03"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Depth %
                            </label>
                            <input
                                type="text"
                                value={form.DEPTH_PER}
                                onChange={(e) =>
                                    handleChange("DEPTH_PER", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 61.5"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Table %
                            </label>
                            <input
                                type="text"
                                value={form.TABLE_PER}
                                onChange={(e) =>
                                    handleChange("TABLE_PER", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 57"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Ratio
                            </label>
                            <input
                                type="text"
                                value={form.RATIO}
                                onChange={(e) =>
                                    handleChange("RATIO", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 1.00"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Girdle
                            </label>
                            <input
                                type="text"
                                value={form.GIRDLE}
                                onChange={(e) =>
                                    handleChange("GIRDLE", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. Medium"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Girdle %
                            </label>
                            <input
                                type="text"
                                value={form.GIRDLE_PER}
                                onChange={(e) =>
                                    handleChange("GIRDLE_PER", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 3.5"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Star
                            </label>
                            <input
                                type="text"
                                value={form.STAR}
                                onChange={(e) =>
                                    handleChange("STAR", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Crown Angle
                            </label>
                            <input
                                type="text"
                                value={form.CROWN_ANGLE}
                                onChange={(e) =>
                                    handleChange("CROWN_ANGLE", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 34.5"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Crown Height
                            </label>
                            <input
                                type="text"
                                value={form.CROWN_HEIGHT}
                                onChange={(e) =>
                                    handleChange("CROWN_HEIGHT", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 15"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Pavilion Angle
                            </label>
                            <input
                                type="text"
                                value={form.PAVILLION_ANGLE}
                                onChange={(e) =>
                                    handleChange(
                                        "PAVILLION_ANGLE",
                                        e.target.value,
                                    )
                                }
                                className={inputClass}
                                placeholder="e.g. 40.8"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Pavilion Height
                            </label>
                            <input
                                type="text"
                                value={form.PAVILLION_HEIGHT}
                                onChange={(e) =>
                                    handleChange(
                                        "PAVILLION_HEIGHT",
                                        e.target.value,
                                    )
                                }
                                className={inputClass}
                                placeholder="e.g. 43"
                            />
                        </div>
                    </div>

                    {/* Certification & Inclusions */}
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                        Certification & Inclusions
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Report No
                            </label>
                            <input
                                type="text"
                                value={form.REPORT_NO}
                                onChange={(e) =>
                                    handleChange("REPORT_NO", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 1234567890"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Report Date
                            </label>
                            <input
                                type="text"
                                value={form.REPORT_DATE}
                                onChange={(e) =>
                                    handleChange("REPORT_DATE", e.target.value)
                                }
                                className={inputClass}
                                placeholder="e.g. 2024-01-15"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Report Comments
                            </label>
                            <input
                                type="text"
                                value={form.REPORT_COMMENTS}
                                onChange={(e) =>
                                    handleChange(
                                        "REPORT_COMMENTS",
                                        e.target.value,
                                    )
                                }
                                className={inputClass}
                                placeholder="e.g. Additional grading notes"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                CN (Center Black)
                            </label>
                            <input
                                type="text"
                                value={form.CN}
                                onChange={(e) =>
                                    handleChange("CN", e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                CW (Center White)
                            </label>
                            <input
                                type="text"
                                value={form.CW}
                                onChange={(e) =>
                                    handleChange("CW", e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                SN (Side Black)
                            </label>
                            <input
                                type="text"
                                value={form.SN}
                                onChange={(e) =>
                                    handleChange("SN", e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                SW (Side White)
                            </label>
                            <input
                                type="text"
                                value={form.SW}
                                onChange={(e) =>
                                    handleChange("SW", e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Branch
                            </label>
                            <input
                                type="text"
                                value={form.BRANCH}
                                onChange={(e) =>
                                    handleChange("BRANCH", e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                H&A
                            </label>
                            <input
                                type="text"
                                value={form.HA}
                                onChange={(e) =>
                                    handleChange("HA", e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                DNA
                            </label>
                            <input
                                type="text"
                                value={form.DNA}
                                onChange={(e) =>
                                    handleChange("DNA", e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm font-medium text-white bg-[#050c3a] rounded-md hover:bg-[#0a1560] transition-colors disabled:opacity-50"
                        >
                            {isSubmitting
                                ? isEditMode
                                    ? "Updating..."
                                    : "Adding..."
                                : isEditMode
                                  ? "Update Diamond"
                                  : "Add Diamond"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDiamondModal;
