"use client";
import React, { useState } from "react";
import { mavenPro } from "@/lib/fonts";

const INCLUSION_OPTIONS = [
  "NONE",
  "NOT VISIBLE",
  "MINOR",
  "MEDIUM",
  "HEAVY",
  "PINPOINT",
];

const INCLUSION_TYPES = [
  { label: "Center Black", key: "centerBlack" },
  { label: "Center White", key: "centerWhite" },
  { label: "Side Black", key: "sideBlack" },
  { label: "Side White", key: "sideWhite" },
];

export interface InclusionFilters {
  centerBlack: string[];
  centerWhite: string[];
  sideBlack: string[];
  sideWhite: string[];
}

interface InclusionFilterProps {
  inclusions: InclusionFilters;
  onInclusionChange: (inclusions: InclusionFilters) => void;
  className?: string;
}

export default function InclusionFilter({
  inclusions,
  onInclusionChange,
  className = "",
}: InclusionFilterProps) {
  const toggleInclusion = (type: keyof InclusionFilters, value: string) => {
    const currentValues = inclusions[type] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onInclusionChange({
      ...inclusions,
      [type]: newValues,
    });
  };

  const isSelected = (type: keyof InclusionFilters, value: string) => {
    return inclusions[type]?.includes(value) || false;
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

  // Desktop view (unchanged)
  const desktopView = (
    <div className={`mt-1 ${className} hidden lg:block`} style={{ width: "100%" }}>
      {/* Header */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5"
        style={{ backgroundColor: "#000033" }}
      >
        <span
          className={`${mavenPro.className} text-base font-normal text-white`}
        >
          INCLUSION
        </span>
      </div>

      {/* Inclusion Filters */}
      <div style={{ marginTop: "6px" }}>
        {INCLUSION_TYPES.map((type) => (
          <div key={type.key}>
            {/* Sub-header */}
            <div
              className={`${mavenPro.className} px-2.5 py-1.5 font-normal text-white text-sm`}
              style={{ backgroundColor: "#000033" }}
            >
              {type.label}
            </div>

            {/* Options */}
            <div
              className="bg-white"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "6px",
                padding: "6px",
                borderLeft: "1px solid #f9e8cd",
                borderRight: "1px solid #f9e8cd",
                borderBottom: "1px solid #f9e8cd",
              }}
            >
              {INCLUSION_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    toggleInclusion(type.key as keyof InclusionFilters, option)
                  }
                  className={`${mavenPro.className} font-normal transition-colors ${
                    isSelected(type.key as keyof InclusionFilters, option)
                      ? "text-gray-800 bg-[#FAF6EB]"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  style={{
                    minWidth: "80px",
                    height: "28px",
                    fontSize: "14px",
                    padding: "4px 6px",
                    border: isSelected(
                      type.key as keyof InclusionFilters,
                      option,
                    )
                      ? "0.25px solid #FAF6EB"
                      : "0.25px solid #f9e8cd",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Mobile dropdown state
  const [open, setOpen] = useState(false);

  // Mobile view: dropdown with compact layout
  const mobileView = (
    <div className={`mt-1 ${className} block lg:hidden`} style={{ width: "100%" }}>
      <button
        type="button"
        className="w-full flex items-center justify-between px-2.5 py-1.5 focus:outline-none"
        style={{ backgroundColor: "#000033" }}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="inclusion-filter-mobile-panel"
      >
        <span className={`${mavenPro.className} text-sm font-normal text-white`}>
          INCLUSION
        </span>
        <div className="flex items-center ml-auto">
          <ChevronIcon open={open} />
        </div>
      </button>

      {open && (
        <div id="inclusion-filter-mobile-panel" style={{ marginTop: "6px" }}>
          {INCLUSION_TYPES.map((type) => (
            <div key={type.key}>
              {/* Sub-header */}
              <div
                className={`${mavenPro.className} px-2.5 py-1.5 font-normal text-white text-xs`}
                style={{ backgroundColor: "#000033" }}
              >
                {type.label}
              </div>

              {/* Options */}
              <div
                className="bg-white"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "4px",
                  padding: "4px",
                  borderLeft: "1px solid #f9e8cd",
                  borderRight: "1px solid #f9e8cd",
                  borderBottom: "1px solid #f9e8cd",
                }}
              >
                {INCLUSION_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() =>
                      toggleInclusion(type.key as keyof InclusionFilters, option)
                    }
                    className={`${mavenPro.className} font-normal transition-colors ${
                      isSelected(type.key as keyof InclusionFilters, option)
                        ? "text-gray-800 bg-[#FAF6EB]"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{
                      minWidth: "60px",
                      height: "24px",
                      fontSize: "11px",
                      padding: "2px 4px",
                      border: isSelected(
                        type.key as keyof InclusionFilters,
                        option,
                      )
                        ? "0.25px solid #FAF6EB"
                        : "0.25px solid #f9e8cd",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
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
