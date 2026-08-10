"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Maven_Pro } from "next/font/google";

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const STATIC_COLOR_OPTIONS = [
  { label: "D", value: "D" },
  { label: "E", value: "E" },
  { label: "F", value: "F" },
  { label: "G", value: "G" },
  { label: "H", value: "H" },
  { label: "I", value: "I" },
  { label: "J", value: "J" },
  { label: "K", value: "K" },
  { label: "L", value: "L" },
  { label: "M", value: "M" },
  { label: "N", value: "N" },
  { label: "N-Z", value: "N-Z" },
  { label: "Fancy", value: "FANCY" },
];

interface ColorFilterProps {
  selectedColor: string[]; // Changed to array
  onColorChange: (color: string[]) => void; // Changed to array
}

export default function ColorFilter({
  selectedColor,
  onColorChange,
}: ColorFilterProps) {
  const handleColorClick = (color: string) => {
    const currentColors = Array.isArray(selectedColor) ? selectedColor : [];

    if (currentColors.includes(color)) {
      // Remove color if already selected
      onColorChange(currentColors.filter((c) => c !== color));
    } else {
      // Add color to selection
      onColorChange([...currentColors, color]);
    }
  };

  const isSelected = (color: string) => {
    return Array.isArray(selectedColor) && selectedColor.includes(color);
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
        className="flex items-center gap-1.5 px-2.5 py-1.5"
        style={{ backgroundColor: "#000033" }}
      >
        <Image
          src="https://uniglo-jewels-dev.s3.eu-north-1.amazonaws.com/dalila/filtersicon/color.png"
          alt="Color"
          width={18}
          height={18}
          className="w-7 h-6"
        />
        <span
          className={`${mavenPro.className} text-base font-normal text-white`}
        >
          Color
        </span>
      </div>
      <div
        className="grid grid-cols-5 gap-1 p-1.5 bg-white"
        style={{
          border: "0.25px solid #f9e8cd",
          borderTop: "none",
        }}
      >
        {STATIC_COLOR_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleColorClick(option.value)}
            className={`${mavenPro.className} px-1 py-0.5 text-small font-normal transition-colors ${
              isSelected(option.value)
                ? "text-gray-800 bg-[#FAF6EB]"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: 44,
              border: isSelected(option.value)
                ? "0.25px solid #FAF6EB"
                : "0.25px solid #f9e8cd",
              borderRadius: "0",
              minHeight: "44px",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );

  // Mobile dropdown state
  const [open, setOpen] = useState(false);

  // Mobile view: dropdown
  const mobileView = (
    <div className="block lg:hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between px-2.5 py-1.5 focus:outline-none"
        style={{ backgroundColor: "#000033" }}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="color-filter-mobile-panel"
      >
        <div className="flex items-center gap-1.5">
          <Image
            src="https://uniglo-jewels-dev.s3.eu-north-1.amazonaws.com/dalila/filtersicon/color.png"
            alt="Color"
            width={16}
            height={16}
            className="w-6 h-6"
            priority
          />
          <span className={`${mavenPro.className} text-sm font-normal text-white`}>
            Color
          </span>
        </div>
        <div className="flex items-center ml-auto">
          <ChevronIcon open={open} />
        </div>
      </button>
      {open && (
        <div
          id="color-filter-mobile-panel"
          className="grid grid-cols-3 gap-1 p-1.5 bg-white"
          style={{
            border: "0.25px solid #f9e8cd",
            borderTop: "none",
          }}
        >
          {STATIC_COLOR_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleColorClick(option.value)}
              className={`${mavenPro.className} px-1 py-0.5 text-xs font-normal transition-colors ${
                isSelected(option.value)
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                minWidth: 36,
                border: isSelected(option.value)
                  ? "0.25px solid #FAF6EB"
                  : "0.25px solid #f9e8cd",
                borderRadius: "0",
                minHeight: "36px",
              }}
            >
              {option.label}
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
