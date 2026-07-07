"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import { diamondApi } from "@/lib/api";
import type { DiamondData } from "@/types/diamond.types";

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
const GRADES = ["EX", "VG", "GD", "FR", "PR"];
const FLUORS = ["NONE", "FNT", "MED", "STG", "VST"];
const LABS = ["GIA", "IGI", "HRD", "AGS"];

const GRADE_ALIASES: Record<string, string> = {
    EXCELLENT: "EX",
    "VERY GOOD": "VG",
    GOOD: "GD",
    FAIR: "FR",
    POOR: "PR",
};

const FLUOR_ALIASES: Record<string, string> = {
    N: "NONE",
    NON: "NONE",
    FAINT: "FNT",
    MEDIUM: "MED",
    STRONG: "STG",
    "VERY STRONG": "VST",
};

interface SpecFormData {
    CARATS: string;
    SHAPE: string;
    COLOR: string;
    CLARITY: string;
    CUT: string;
    POL: string;
    SYM: string;
    LENGTH: string;
    WIDTH: string;
    DEPTH: string;
    FLOUR: string;
    LAB: string;
    message: string;
}

interface DiamondSpecEnquiryModalProps {
    diamond: DiamondData;
    isOpen: boolean;
    onClose: () => void;
}

const cleanValue = (value: unknown) => String(value ?? "").trim();

const normalizeValue = (
    value: unknown,
    aliases: Record<string, string> = {},
) => {
    const normalized = cleanValue(value).toUpperCase();
    return aliases[normalized] || normalized;
};

const optionsWithCurrent = (options: string[], current: string) => {
    if (!current || options.includes(current)) return options;
    return [current, ...options];
};

const buildInitialForm = (diamond: DiamondData): SpecFormData => ({
    CARATS: cleanValue(diamond.CARATS),
    SHAPE: normalizeValue(diamond.SHAPE),
    COLOR: normalizeValue(diamond.COLOR),
    CLARITY: normalizeValue(diamond.CLARITY),
    CUT: normalizeValue(diamond.CUT, GRADE_ALIASES),
    POL: normalizeValue(diamond.POL, GRADE_ALIASES),
    SYM: normalizeValue(diamond.SYM, GRADE_ALIASES),
    LENGTH: cleanValue(diamond.LENGTH),
    WIDTH: cleanValue(diamond.WIDTH),
    DEPTH: cleanValue(diamond.DEPTH),
    FLOUR: normalizeValue(diamond.FLOUR, FLUOR_ALIASES),
    LAB: normalizeValue(diamond.LAB),
    message: "",
});

export default function DiamondSpecEnquiryModal({
    diamond,
    isOpen,
    onClose,
}: DiamondSpecEnquiryModalProps) {
    const [form, setForm] = useState<SpecFormData>(() =>
        buildInitialForm(diamond),
    );
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        setForm(buildInitialForm(diamond));
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }, [diamond, isOpen]);

    if (!isOpen) return null;

    const handleChange = (field: keyof SpecFormData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const closeModal = () => {
        removeImage();
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.SHAPE || !form.COLOR || !form.CLARITY || !form.CARATS) {
            toast.error("Please fill in Shape, Color, Clarity, and Carats");
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();

            Object.entries(form).forEach(([key, value]) => {
                if (value.trim()) {
                    formData.append(key, value);
                }
            });

            if (image) {
                formData.append("image", image);
            }

            await diamondApi.submitSpecRequest(formData);
            toast.success("Your diamond request has been submitted!");
            closeModal();
        } catch (err) {
            console.error("Error submitting public diamond enquiry:", err);
            toast.error("Failed to submit request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass =
        "w-full border border-[#C89E3A] bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 rounded-none focus:outline-none focus:ring-2 focus:ring-[#050C3A]";
    const selectClass = `${inputClass} appearance-none`;
    const labelClass = "block text-xs font-semibold text-gray-600 mb-1.5";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
            onClick={closeModal}
        >
            <div
                className="w-full max-w-4xl max-h-[92vh] overflow-hidden bg-white shadow-2xl border border-[#C89E3A]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-[#050C3A] text-white px-5 py-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#C89E3A]">
                            Request a Diamond
                        </p>
                        <h3 className="text-lg font-semibold">
                            Tell Us What You Need
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="text-white hover:text-gray-300 transition-colors"
                        aria-label="Close enquiry form"
                    >
                        <X size={22} />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-h-[calc(92vh-76px)] overflow-y-auto"
                >
                    <div className="p-5 sm:p-6 space-y-5">
                        <div className="border border-[#C89E3A] bg-[#faf6eb] px-4 py-3 text-sm text-gray-700">
                            <span className="font-semibold text-[#050C3A]">
                                Selected diamond:
                            </span>{" "}
                            {diamond.SHAPE} {diamond.CARATS}ct {diamond.COLOR}{" "}
                            {diamond.CLARITY}
                            {(diamond.diamondId || diamond.STONE_NO) && (
                                <>
                                    {" "}
                                    <span className="text-gray-500">|</span>{" "}
                                    Stock ID:{" "}
                                    <span className="font-semibold text-gray-900">
                                        {diamond.diamondId || diamond.STONE_NO}
                                    </span>
                                </>
                            )}
                            {diamond.REPORT_NO && (
                                <>
                                    {" "}
                                    <span className="text-gray-500">|</span>{" "}
                                    Report #:{" "}
                                    <span className="font-semibold text-gray-900">
                                        {diamond.REPORT_NO}
                                    </span>
                                </>
                            )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className={labelClass}>Shape *</label>
                                <select
                                    name="SHAPE"
                                    value={form.SHAPE}
                                    onChange={(e) =>
                                        handleChange("SHAPE", e.target.value)
                                    }
                                    className={selectClass}
                                    required
                                >
                                    <option value="">Select</option>
                                    {optionsWithCurrent(
                                        SHAPES,
                                        form.SHAPE,
                                    ).map((shape) => (
                                        <option key={shape} value={shape}>
                                            {shape}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Carats *</label>
                                <input
                                    name="CARATS"
                                    type="text"
                                    value={form.CARATS}
                                    onChange={(e) =>
                                        handleChange("CARATS", e.target.value)
                                    }
                                    className={inputClass}
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Color *</label>
                                <select
                                    name="COLOR"
                                    value={form.COLOR}
                                    onChange={(e) =>
                                        handleChange("COLOR", e.target.value)
                                    }
                                    className={selectClass}
                                    required
                                >
                                    <option value="">Select</option>
                                    {optionsWithCurrent(
                                        COLORS,
                                        form.COLOR,
                                    ).map((color) => (
                                        <option key={color} value={color}>
                                            {color}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Clarity *</label>
                                <select
                                    name="CLARITY"
                                    value={form.CLARITY}
                                    onChange={(e) =>
                                        handleChange("CLARITY", e.target.value)
                                    }
                                    className={selectClass}
                                    required
                                >
                                    <option value="">Select</option>
                                    {optionsWithCurrent(
                                        CLARITIES,
                                        form.CLARITY,
                                    ).map((clarity) => (
                                        <option key={clarity} value={clarity}>
                                            {clarity}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className={labelClass}>Cut</label>
                                <select
                                    name="CUT"
                                    value={form.CUT}
                                    onChange={(e) =>
                                        handleChange("CUT", e.target.value)
                                    }
                                    className={selectClass}
                                >
                                    <option value="">Select</option>
                                    {optionsWithCurrent(GRADES, form.CUT).map(
                                        (grade) => (
                                            <option key={grade} value={grade}>
                                                {grade}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Polish</label>
                                <select
                                    name="POL"
                                    value={form.POL}
                                    onChange={(e) =>
                                        handleChange("POL", e.target.value)
                                    }
                                    className={selectClass}
                                >
                                    <option value="">Select</option>
                                    {optionsWithCurrent(GRADES, form.POL).map(
                                        (grade) => (
                                            <option key={grade} value={grade}>
                                                {grade}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Symmetry</label>
                                <select
                                    name="SYM"
                                    value={form.SYM}
                                    onChange={(e) =>
                                        handleChange("SYM", e.target.value)
                                    }
                                    className={selectClass}
                                >
                                    <option value="">Select</option>
                                    {optionsWithCurrent(GRADES, form.SYM).map(
                                        (grade) => (
                                            <option key={grade} value={grade}>
                                                {grade}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>
                                    Fluorescence
                                </label>
                                <select
                                    name="FLOUR"
                                    value={form.FLOUR}
                                    onChange={(e) =>
                                        handleChange("FLOUR", e.target.value)
                                    }
                                    className={selectClass}
                                >
                                    <option value="">Select</option>
                                    {optionsWithCurrent(
                                        FLUORS,
                                        form.FLOUR,
                                    ).map((fluor) => (
                                        <option key={fluor} value={fluor}>
                                            {fluor}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className={labelClass}>Length</label>
                                <input
                                    name="LENGTH"
                                    type="text"
                                    value={form.LENGTH}
                                    onChange={(e) =>
                                        handleChange("LENGTH", e.target.value)
                                    }
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Width</label>
                                <input
                                    name="WIDTH"
                                    type="text"
                                    value={form.WIDTH}
                                    onChange={(e) =>
                                        handleChange("WIDTH", e.target.value)
                                    }
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Depth</label>
                                <input
                                    name="DEPTH"
                                    type="text"
                                    value={form.DEPTH}
                                    onChange={(e) =>
                                        handleChange("DEPTH", e.target.value)
                                    }
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Lab</label>
                                <select
                                    name="LAB"
                                    value={form.LAB}
                                    onChange={(e) =>
                                        handleChange("LAB", e.target.value)
                                    }
                                    className={selectClass}
                                >
                                    <option value="">Select</option>
                                    {optionsWithCurrent(LABS, form.LAB).map(
                                        (lab) => (
                                            <option key={lab} value={lab}>
                                                {lab}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={(e) =>
                                    handleChange("message", e.target.value)
                                }
                                className={`${inputClass} resize-none`}
                                rows={3}
                                placeholder="Tell us more about what you're looking for..."
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Reference Image (optional)
                            </label>
                            {imagePreview ? (
                                <div className="relative inline-block">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-24 w-24 object-cover border border-[#C89E3A]"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute -top-2 -right-2 bg-[#050C3A] text-white rounded-full p-1 hover:bg-[#030822]"
                                        aria-label="Remove image"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-[#C89E3A] text-[#050C3A] hover:bg-[#faf6eb] transition-colors text-sm"
                                >
                                    <Upload className="w-4 h-4" />
                                    Upload Image
                                </button>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    <div className="border-t border-[#C89E3A] bg-gray-50 px-5 py-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 border border-[#C89E3A] text-gray-700 hover:bg-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-5 py-2 bg-[#050C3A] text-white hover:bg-[#030822] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit Request"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
