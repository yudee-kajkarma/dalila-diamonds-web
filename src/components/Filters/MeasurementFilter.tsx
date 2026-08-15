"use client";
import React, { useState } from "react";
import { mavenPro } from "@/lib/fonts";

const MEASUREMENT_FIELDS = [
  { label: "Length", key: "length" },
  { label: "Width", key: "width" },
  
  { label: "Table %", key: "table" },
  { label: "Depth %", key: "depthPercent" },
  { label: "Cr.Angle", key: "crAngle" },
  { label: "Pav.Angle", key: "pavAngle" },
  { label: "Cr.Height", key: "crHeight" },
  { label: "Pav.Height", key: "pavHeight" },
];

interface MeasurementRange {
  from: string;
  to: string;
}

export interface MeasurementFilters {
  length: MeasurementRange;
  width: MeasurementRange;
  depth: MeasurementRange;
  table: MeasurementRange;
  depthPercent: MeasurementRange;
  ratio: MeasurementRange;
  crAngle: MeasurementRange;
  pavAngle: MeasurementRange;
  gridle: MeasurementRange;
  crHeight: MeasurementRange;
  pavHeight: MeasurementRange;
}

interface MeasurementFilterProps {
  measurements: MeasurementFilters;
  onMeasurementChange: (measurements: MeasurementFilters) => void;
}

export default function MeasurementFilter({
  measurements,
  onMeasurementChange,
}: MeasurementFilterProps) {
  const handleChange = (
    key: keyof MeasurementFilters,
    field: "from" | "to",
    value: string,
  ) => {
    // Prevent negative values
    if (value && parseFloat(value) < 0) return;

    const updatedMeasurements = {
      ...measurements,
      [key]: {
        ...measurements[key],
        [field]: value,
      },
    };
    onMeasurementChange(updatedMeasurements);
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
    <div
      className={`${mavenPro.className} mb-2 mt-1 hidden lg:block`}
      style={{ width: "fit-content" }}
    >
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5"
        style={{ backgroundColor: "#000033" }}
      >
        <span className="text-base font-normal text-white">Measurement</span>
      </div>
      <div
        className="bg-white p-2"
        style={{ border: "1px solid #f9e8cd", borderTop: "none" }}
      >
        <div className="space-y-1.5">
          {MEASUREMENT_FIELDS.map((field) => (
            <div key={field.key} className="flex items-center gap-1.5">
              <div
                className="px-2 py-2 font-normal text-white rounded-none text-xs"
                style={{ backgroundColor: "#000033", minWidth: "80px" }}
              >
                {field.label}
              </div>

              {/* From Input */}
              <input
                type="number"
                step="0.01"
                min="0"
                value={
                  measurements[field.key as keyof MeasurementFilters]?.from ||
                  ""
                }
                onChange={(e) =>
                  handleChange(
                    field.key as keyof MeasurementFilters,
                    "from",
                    e.target.value,
                  )
                }
                placeholder="Min"
                className="w-20 px-2 py-1 text-center text-xs text-gray-900 rounded-none border border-[#f9e8cd] outline-none focus:border-[#d4b896]"
                style={{ fontFamily: "inherit", color: "#111827" }}
              />

              <span className="text-gray-500 text-xs font-normal">To</span>

              {/* To Input */}
              <input
                type="number"
                step="0.01"
                min="0"
                value={
                  measurements[field.key as keyof MeasurementFilters]?.to ||
                  ""
                }
                onChange={(e) =>
                  handleChange(
                    field.key as keyof MeasurementFilters,
                    "to",
                    e.target.value,
                  )
                }
                placeholder="Max"
                className="w-20 px-2 py-1 text-center text-xs text-gray-900 rounded-none border border-[#f9e8cd] outline-none focus:border-[#d4b896]"
                style={{ fontFamily: "inherit", color: "#111827" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Mobile dropdown state
  const [open, setOpen] = useState(false);

  // Mobile view: dropdown with compact layout
  const mobileView = (
    <div
      className={`${mavenPro.className} mb-1 mt-0.5 block lg:hidden`}
      style={{ width: "100%" }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-1.5 py-1 focus:outline-none"
        style={{ backgroundColor: "#000033" }}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="measurement-filter-mobile-panel"
      >
        <span className="text-xs font-normal text-white">Measurement</span>
        <div className="flex items-center ml-auto">
          <ChevronIcon open={open} />
        </div>
      </button>
      {open && (
        <div
          id="measurement-filter-mobile-panel"
          className="bg-white p-1"
          style={{ border: "1px solid #f9e8cd", borderTop: "none" }}
        >
          <div className="space-y-0.5">
            {MEASUREMENT_FIELDS.map((field) => (
              <div key={field.key} className="flex items-center gap-0.5">
                <div
                  className="px-1 py-0.5 font-normal text-white rounded-none"
                  style={{ backgroundColor: "#000033", minWidth: "45px", fontSize: "8px" }}
                >
                  {field.label}
                </div>

                {/* From Input */}
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={
                    measurements[field.key as keyof MeasurementFilters]?.from ||
                    ""
                  }
                  onChange={(e) =>
                    handleChange(
                      field.key as keyof MeasurementFilters,
                      "from",
                      e.target.value,
                    )
                  }
                  placeholder="Min"
                  className="w-11 px-0.5 py-0.5 text-center text-gray-900 rounded-none border border-[#f9e8cd] outline-none focus:border-[#d4b896]"
                  style={{ fontFamily: "inherit", color: "#111827", fontSize: "8px" }}
                />

                <span className="text-gray-500 font-normal" style={{ fontSize: "8px" }}>To</span>

                {/* To Input */}
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={
                    measurements[field.key as keyof MeasurementFilters]?.to ||
                    ""
                  }
                  onChange={(e) =>
                    handleChange(
                      field.key as keyof MeasurementFilters,
                      "to",
                      e.target.value,
                    )
                  }
                  placeholder="Max"
                  className="w-11 px-0.5 py-0.5 text-center text-gray-900 rounded-none border border-[#f9e8cd] outline-none focus:border-[#d4b896]"
                  style={{ fontFamily: "inherit", color: "#111827", fontSize: "8px" }}
                />
              </div>
            ))}
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
