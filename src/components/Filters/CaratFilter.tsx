"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Maven_Pro } from "next/font/google";

const mavenPro = Maven_Pro({
    variable: "--font-maven-pro",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

interface CaratFilterProps {
    selectedCaratRanges: { min: string; max: string }[];
    onCaratChange: (ranges: { min: string; max: string }[]) => void;
}

interface CaratRange {
    label: string;
    value: string;
    min: number;
    max: number;
}

const STATIC_CARAT_RANGES: CaratRange[] = [
    { label: "0.30 - 0.39", value: "0.30-0.39", min: 0.3, max: 0.39 },
    { label: "0.40 - 0.49", value: "0.40-0.49", min: 0.4, max: 0.49 },
    { label: "0.50 - 0.69", value: "0.50-0.69", min: 0.5, max: 0.69 },
    { label: "0.70 - 0.79", value: "0.70-0.79", min: 0.7, max: 0.79 },
    { label: "0.80 - 0.89", value: "0.80-0.89", min: 0.8, max: 0.89 },
    { label: "0.90 - 0.99", value: "0.90-0.99", min: 0.9, max: 0.99 },
    { label: "1.00 - 1.49", value: "1.00-1.49", min: 1.0, max: 1.49 },
    { label: "1.59 - 1.99", value: "1.59-1.99", min: 1.59, max: 1.99 },
    { label: "2.00 - 2.99", value: "2.00-2.99", min: 2.0, max: 2.99 },
    { label: "3.00 - 3.99", value: "3.00-3.99", min: 3.0, max: 3.99 },
    { label: "4.00 - 4.99", value: "4.00-4.99", min: 4.0, max: 4.99 },
    { label: "5.00 - 6.99", value: "5.00-6.99", min: 5.0, max: 6.99 },
    { label: "7.01 - 9.99", value: "7.01-9.99", min: 7.01, max: 9.99 },
    { label: "10+", value: "10+", min: 10, max: 50 },
];

export default function CaratFilter({
    selectedCaratRanges,
    onCaratChange,
}: CaratFilterProps) {
    const [fromValue, setFromValue] = useState("");
    const [toValue, setToValue] = useState("");

    // When parent clears all custom ranges, also clear local input state so
    // the inputs don't visually persist after a reset.
    useEffect(() => {
        if (selectedCaratRanges.length === 0) {
            setFromValue("");
            setToValue("");
        }
    }, [selectedCaratRanges]);

    // Helper to check if a static range is selected
    const isRangeSelected = (range: CaratRange) =>
        selectedCaratRanges.some(
            (r) =>
                r.min === range.min.toString() && r.max === range.max.toString()
        );

    // Toggle static range selection
    const handleRangeClick = (range: CaratRange) => {
        const min = range.min.toString();
        const max = range.max.toString();
        const exists = selectedCaratRanges.some(
            (r) => r.min === min && r.max === max
        );
        let newRanges;
        if (exists) {
            newRanges = selectedCaratRanges.filter(
                (r) => !(r.min === min && r.max === max)
            );
        } else {
            newRanges = [...selectedCaratRanges, { min, max }];
        }
        onCaratChange(newRanges);
    };

    // Handle manual input (single custom range)
    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value && parseFloat(value) < 0) return;
        setFromValue(value);
        // Always drop the previous custom range first so partial erases don't
        // leave a stale range in parent state.
        const filtered = selectedCaratRanges.filter(
            (r) => !(r.min === fromValue && r.max === toValue)
        );
        if (value && toValue) {
            onCaratChange([...filtered, { min: value, max: toValue }]);
        } else {
            onCaratChange(filtered);
        }
    };

    const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value && parseFloat(value) < 0) return;
        setToValue(value);
        const filtered = selectedCaratRanges.filter(
            (r) => !(r.min === fromValue && r.max === toValue)
        );
        if (fromValue && value) {
            onCaratChange([...filtered, { min: fromValue, max: value }]);
        } else {
            onCaratChange(filtered);
        }
    };

    // Chevron icon for dropdown
    const ChevronIcon = ({ open }: { open: boolean }) => (
        <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1"
        >
            {open ? (
                <path d="M6 12l4-4 4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
                <path d="M6 8l4 4 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            )}
        </svg>
    );

    // Desktop layout (unchanged)
    const desktopView = (
        <div className={`${mavenPro.className} mb-1.5 mt-0.5 hidden lg:block`}>
            {/* Header */}
            <div
                className="flex items-center gap-1.5 px-2.5 py-1.5"
                style={{ backgroundColor: "#000033" }}
            >
                <Image
                    src="/filtersicon/carat.png"
                    alt="Carat"
                    width={18}
                    height={18}
                    className="w-7 h-6"
                />
                <span className="text-base font-normal text-white">Carat</span>
            </div>

            {/* Body */}
            <div
                className="p-3 bg-white"
                style={{
                    border: "0.25px solid #f9e8cd",
                    borderTop: "none",
                    minHeight: "288px",
                }}
            >
                {/* Input Fields */}
                <div className="flex gap-2 mb-3">
                    <div className="relative flex-1">
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={fromValue}
                            onChange={handleFromChange}
                            className="w-full px-2 py-1.5 text-xs text-gray-900 border border-[#f9e8cd] min-h-[36px] focus:outline-none focus:border-[#d4b896]"
                            placeholder="From"
                            style={{ color: "#111827", borderRadius: "0" }}
                        />
                    </div>
                    <div className="relative flex-1">
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={toValue}
                            onChange={handleToChange}
                            className="w-full px-2 py-1.5 text-xs text-gray-900 border border-[#f9e8cd] min-h-[36px] focus:outline-none focus:border-[#d4b896]"
                            placeholder="To"
                            style={{ color: "#111827", borderRadius: "0" }}
                        />
                    </div>
                </div>

                {/* Range Buttons */}
                <div className="grid grid-cols-3 gap-1">
                    {STATIC_CARAT_RANGES.map((range) => {
                        const isSelected = isRangeSelected(range);
                        return (
                            <button
                                key={range.value}
                                onClick={() => handleRangeClick(range)}
                                className={`px-2 py-1.5 text-small font-normal transition-colors ${
                                    isSelected
                                        ? "text-gray-800 bg-[#FAF6EB] border border-[#FAF6EB]"
                                        : "bg-white text-gray-700 hover:bg-gray-50 border border-[#f9e8cd]"
                                } min-h-[36px] min-w-[90px]`}
                                style={{ borderRadius: "0" }}
                            >
                                {range.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    // Mobile dropdown state
    const [open, setOpen] = useState(false);

    // Mobile layout: dropdown, 2 columns for ranges
    const mobileView = (
        <div className={`${mavenPro.className} mb-1.5 mt-0.5 block lg:hidden`}>
            <button
                type="button"
                className="w-full flex items-center justify-between px-2.5 py-1.5 focus:outline-none"
                style={{ backgroundColor: "#000033" }}
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                aria-controls="carat-filter-mobile-panel"
            >
                <div className="flex items-center gap-1.5">
                    <Image
                        src="/filtersicon/carat.png"
                        alt="Carat"
                        width={16}
                        height={16}
                        className="w-6 h-6"
                        priority
                    />
                    <span className="text-sm font-normal text-white">Carat</span>
                </div>
                <div className="flex items-center ml-auto">
                    <ChevronIcon open={open} />
                </div>
            </button>
            {open && (
                <div
                    id="carat-filter-mobile-panel"
                    className="p-2.5 bg-white"
                    style={{
                        border: "0.25px solid #f9e8cd",
                        borderTop: "none",
                        height: "auto",
                    }}
                >
                    {/* Input Fields */}
                    <div className="flex gap-2 mb-2">
                        <div className="relative flex-1">
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={fromValue}
                                onChange={handleFromChange}
                                className="w-full px-2 py-1 text-xs text-gray-900 border border-[#f9e8cd] min-h-[32px] focus:outline-none focus:border-[#d4b896]"
                                placeholder="From"
                                style={{ color: "#111827", borderRadius: "0" }}
                            />
                        </div>
                        <div className="relative flex-1">
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={toValue}
                                onChange={handleToChange}
                                className="w-full px-2 py-1 text-xs text-gray-900 border border-[#f9e8cd] min-h-[32px] focus:outline-none focus:border-[#d4b896]"
                                placeholder="To"
                                style={{ color: "#111827", borderRadius: "0" }}
                            />
                        </div>
                    </div>
                    {/* Range Buttons */}
                    <div className="grid grid-cols-2 gap-1">
                        {STATIC_CARAT_RANGES.map((range) => {
                            const isSelected = isRangeSelected(range);
                            return (
                                <button
                                    key={range.value}
                                    onClick={() => handleRangeClick(range)}
                                    className={`px-2 py-1 text-xs font-normal transition-colors ${
                                        isSelected
                                            ? "text-gray-800 bg-[#FAF6EB] border border-[#FAF6EB]"
                                            : "bg-white text-gray-700 hover:bg-gray-50 border border-[#f9e8cd]"
                                    } min-h-[32px] min-w-[70px]`}
                                    style={{ borderRadius: "0" }}
                                >
                                    {range.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <>
            {desktopView}
            {mobileView}
        </>
    );
}
