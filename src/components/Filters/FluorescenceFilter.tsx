"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Maven_Pro } from "next/font/google";
import { s3Asset } from "@/lib/s3Assets";

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const STATIC_FLUOR_OPTIONS = ["NON", "VSL", "FNT", "SL", "MED", "STG", "VST"];

interface FluorFilterProps {
  selectedFluor: string[]; // Changed to array
  onFluorChange: (fluor: string[]) => void; // Changed to array
}

export default function FluorFilter({
  selectedFluor,
  onFluorChange,
}: FluorFilterProps) {
  const handleFluorClick = (value: string) => {
    const currentFluor = Array.isArray(selectedFluor) ? selectedFluor : [];

    if (currentFluor.includes(value)) {
      // Remove fluor if already selected
      onFluorChange(currentFluor.filter((f) => f !== value));
    } else {
      // Add fluor to selection
      onFluorChange([...currentFluor, value]);
    }
  };

  const isSelected = (fluor: string) => {
    return Array.isArray(selectedFluor) && selectedFluor.includes(fluor);
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
    <div className="hidden lg:block">
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5 mt-0.5"
        style={{ backgroundColor: "#000033" }}
      >
        <Image
          src={s3Asset("/filtersicon/flour.png")}
          alt="Fluor"
          width={18}
          height={18}
          className="w-7 h-6"
        />
        <span
          className={`${mavenPro.className} text-base font-normal text-white`}
        >
          Fluor
        </span>
      </div>

      <div
        className="grid grid-cols-5 gap-1 p-1.5 bg-white"
        style={{
          border: "0.25px solid #f9e8cd",
          borderTop: "none",
        }}
      >
        {STATIC_FLUOR_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => handleFluorClick(option)}
            className={`${mavenPro.className} px-1 py-0.5 text-small font-normal transition-colors ${
              isSelected(option)
                ? "text-gray-800 bg-[#FAF6EB]"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: 44,
              border: isSelected(option)
                ? "0.25px solid #FAF6EB"
                : "0.25px solid #f9e8cd",
              borderRadius: "0",
              minHeight: "41px",
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  // Mobile dropdown state
  const [open, setOpen] = useState(false);

  // Mobile view: dropdown
  const mobileView = (
    <div className="block lg:hidden mt-0.5">
      <button
        type="button"
        className="w-full flex items-center justify-between px-2.5 py-1.5 focus:outline-none"
        style={{ backgroundColor: "#000033" }}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="fluor-filter-mobile-panel"
      >
        <div className="flex items-center gap-1.5">
          <Image
            src={s3Asset("/filtersicon/flour.png")}
            alt="Fluor"
            width={16}
            height={16}
            className="w-6 h-6"
            priority
          />
          <span className={`${mavenPro.className} text-sm font-normal text-white`}>
            Fluor
          </span>
        </div>
        <div className="flex items-center ml-auto">
          <ChevronIcon open={open} />
        </div>
      </button>
      {open && (
        <div
          id="fluor-filter-mobile-panel"
          className="grid grid-cols-3 gap-1 p-1.5 bg-white"
          style={{
            border: "0.25px solid #f9e8cd",
            borderTop: "none",
          }}
        >
          {STATIC_FLUOR_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => handleFluorClick(option)}
              className={`${mavenPro.className} px-1 py-0.5 text-xs font-normal transition-colors ${
                isSelected(option)
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                minWidth: 36,
                border: isSelected(option)
                  ? "0.25px solid #FAF6EB"
                  : "0.25px solid #f9e8cd",
                borderRadius: "0",
                minHeight: "36px",
              }}
            >
              {option}
            </button>
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
