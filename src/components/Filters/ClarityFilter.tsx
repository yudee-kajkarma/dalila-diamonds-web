"use client";
import React, { useState } from "react";
import Image from "next/image";
import { mavenPro } from "@/lib/fonts";
import { s3Asset } from "@/lib/s3Assets";

const STATIC_CLARITY_OPTIONS = [
  "FL",
  "IF",
  "VVS1",
  "VVS2",
  "VS1",
  "VS2",
  "SI1",
  "SI2",
  "SI3",
  "I1",
  "I2",
  "I3",
];

const STATIC_SPECIAL_OPTIONS = ["3EX", "EX-", "VG+", "VG-"];

const SPECIAL_GRADE_MAPPING: Record<
  string,
  { cut: string; polish: string; symmetry: string }
> = {
  "3EX": { cut: "EX", polish: "EX", symmetry: "EX" },
  "EX-": { cut: "EX", polish: "EX,VG", symmetry: "EX,VG" },
  "VG+": { cut: "VG", polish: "EX,VG", symmetry: "EX,VG" },
  "VG-": { cut: "VG", polish: "VG,GD", symmetry: "VG,GD" },
};

interface ClarityFilterProps {
  selectedClarity: string[];
  selectedSpecial: string;
  selectedCut: string;
  selectedPolish: string;
  selectedSymmetry: string;
  onClarityChange: (clarity: string[]) => void;
  onSpecialChange: (special: string) => void;
  onCutChange: (cut: string) => void;
  onPolishChange: (polish: string) => void;
  onSymmetryChange: (symmetry: string) => void;
  hideExtras?: boolean;
}

export default function ClarityFilter({
  selectedClarity,
  selectedSpecial,
  selectedCut,
  selectedPolish,
  selectedSymmetry,
  onClarityChange,
  onSpecialChange,
  onCutChange,
  onPolishChange,
  onSymmetryChange,
  hideExtras = false,
}: ClarityFilterProps) {
  const cutArray = selectedCut ? selectedCut.split(",") : [];
  const polishArray = selectedPolish ? selectedPolish.split(",") : [];
  const symmetryArray = selectedSymmetry ? selectedSymmetry.split(",") : [];

  const handleClarityClick = (value: string) => {
    let newClarity: string[];
    if (selectedClarity.includes(value)) {
      newClarity = selectedClarity.filter((c) => c !== value);
    } else {
      newClarity = [...selectedClarity, value];
    }
    onClarityChange(newClarity);
  };

  const handleSpecialClick = (value: string) => {
    const newSpecial = selectedSpecial === value ? "" : value;
    onSpecialChange(newSpecial);

    if (newSpecial && SPECIAL_GRADE_MAPPING[newSpecial]) {
      const { cut, polish, symmetry } = SPECIAL_GRADE_MAPPING[newSpecial];
      onCutChange(cut);
      onPolishChange(polish);
      onSymmetryChange(symmetry);
    } else {
      onCutChange("");
      onPolishChange("");
      onSymmetryChange("");
    }
  };

  const handleCutClick = (value: string) => {
    let newCutArray: string[];
    if (cutArray.includes(value)) {
      newCutArray = cutArray.filter((c) => c !== value);
    } else {
      newCutArray = [...cutArray, value];
    }
    onCutChange(newCutArray.join(","));
    if (selectedSpecial) {
      onSpecialChange("");
    }
  };

  const handlePolishClick = (value: string) => {
    let newPolishArray: string[];
    if (polishArray.includes(value)) {
      newPolishArray = polishArray.filter((p) => p !== value);
    } else {
      newPolishArray = [...polishArray, value];
    }
    onPolishChange(newPolishArray.join(","));
    if (selectedSpecial) {
      onSpecialChange("");
    }
  };

  const handleSymmetryClick = (value: string) => {
    let newSymmetryArray: string[];
    if (symmetryArray.includes(value)) {
      newSymmetryArray = symmetryArray.filter((s) => s !== value);
    } else {
      newSymmetryArray = [...symmetryArray, value];
    }
    onSymmetryChange(newSymmetryArray.join(","));
    if (selectedSpecial) {
      onSpecialChange("");
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

  // Desktop view (unchanged)
  const desktopView = (
    <div className={`${mavenPro.className} mb-1.5 mt-0.5 hidden lg:block`}>
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5"
        style={{ backgroundColor: "#000033" }}
      >
        <Image
          src={s3Asset("/filtersicon/clarity.png")}
          alt="Clarity"
          width={18}
          height={18}
          className="w-7 h-6"
        />
        <span className="text-base font-normal text-white">Clarity</span>
      </div>

      <div
        className="p-2 bg-white"
        style={{
          border: "0.25px solid #f9e8cd",
          borderTop: "none",
          height: hideExtras ? "auto" : "288px",
        }}
      >
        {/* Clarity Options */}
        <div className="grid grid-cols-6 gap-2 mb-4 mt-4">
          {STATIC_CLARITY_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => handleClarityClick(option)}
              className={`px-1 py-0.5 text-small font-normal transition-colors ${
                selectedClarity.includes(option)
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border: selectedClarity.includes(option)
                  ? "0.25px solid #FAF6EB"
                  : "0.25px solid #f9e8cd",
                borderRadius: "0",
                minHeight: "28px",
                minWidth: "48px",
              }}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Special Options */}
        {!hideExtras && (
          <>
            <div className="grid grid-cols-5 gap-1 mb-3 mt-3 items-center">
              <div style={{ minWidth: "35px" }}></div>
              {STATIC_SPECIAL_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSpecialClick(option)}
                  className={`px-1 py-0.5 transition-colors ${
                    selectedSpecial === option
                      ? "text-white"
                      : "text-white hover:opacity-80"
                  }`}
                  style={{
                    backgroundColor:
                      selectedSpecial === option ? "#00003390" : "#000033",
                    border: "none",
                    borderRadius: "0",
                    minHeight: "30px",
                    fontSize: "14px",
                    fontWeight: "400",
                    maxWidth: "55px",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Cut, Polish, Symmetry */}
            <div className="flex flex-col gap-4">
              {/* Cut Row */}
              <div className="grid grid-cols-5 gap-1 items-center">
                <div
                  className="px-1.5 py-1.5 text-xs font-normal text-white flex items-center justify-center"
                  style={{
                    backgroundColor: "#000033",
                    borderRadius: "0",
                    minHeight: "24px",
                    minWidth: "35px",
                  }}
                >
                  Cut :
                </div>
                {["EX", "VG", "GD", "FR"].map((cut) => (
                  <button
                    key={cut}
                    onClick={() => handleCutClick(cut)}
                    className={`px-1.5 py-0.5 text-small font-normal transition-colors ${
                      cutArray.includes(cut)
                        ? "text-gray-800 bg-[#FAF6EB]"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{
                      border: cutArray.includes(cut)
                        ? "0.25px solid #FAF6EB"
                        : "0.25px solid #f9e8cd",
                      borderRadius: "0",
                      minHeight: "24px",
                      maxWidth: "55px",
                    }}
                  >
                    {cut}
                  </button>
                ))}
              </div>

              {/* Polish Row */}
              <div className="grid grid-cols-5 gap-1 items-center">
                <div
                  className="px-1.5 py-1.5 text-xs font-normal text-white flex items-center justify-center"
                  style={{
                    backgroundColor: "#000033",
                    borderRadius: "0",
                    minHeight: "24px",
                    minWidth: "35px",
                  }}
                >
                  Pol :
                </div>
                {["EX", "VG", "GD", "FR"].map((polish) => (
                  <button
                    key={polish}
                    onClick={() => handlePolishClick(polish)}
                    className={`px-1.5 py-0.5 text-small font-medium transition-colors ${
                      polishArray.includes(polish)
                        ? "text-gray-800 bg-[#FAF6EB]"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{
                      border: polishArray.includes(polish)
                        ? "0.25px solid #FAF6EB"
                        : "0.25px solid #f9e8cd",
                      borderRadius: "0",
                      minHeight: "24px",
                      maxWidth: "55px",
                    }}
                  >
                    {polish}
                  </button>
                ))}
              </div>

              {/* Symmetry Row */}
              <div className="grid grid-cols-5 gap-1 items-center">
                <div
                  className="px-1.5 py-1.5 text-xs font-normal text-white flex items-center justify-center"
                  style={{
                    backgroundColor: "#000033",
                    borderRadius: "0",
                    minHeight: "24px",
                    minWidth: "35px",
                  }}
                >
                  Sym :
                </div>
                {["EX", "VG", "GD", "FR"].map((symmetry) => (
                  <button
                    key={symmetry}
                    onClick={() => handleSymmetryClick(symmetry)}
                    className={`px-1.5 py-0.5 text-small font-medium transition-colors ${
                      symmetryArray.includes(symmetry)
                        ? "text-gray-800 bg-[#FAF6EB]"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{
                      border: symmetryArray.includes(symmetry)
                        ? "0.25px solid #FAF6EB"
                        : "0.25px solid #f9e8cd",
                      borderRadius: "0",
                      minHeight: "24px",
                      maxWidth: "55px",
                    }}
                  >
                    {symmetry}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Mobile dropdown state
  const [open, setOpen] = useState(false);

  // Mobile view: dropdown, 2 columns for clarity options
  const mobileView = (
    <div className={`${mavenPro.className} mb-1.5 mt-0.5 block lg:hidden`}>
      <button
        type="button"
        className="w-full flex items-center justify-between px-2.5 py-1.5 focus:outline-none"
        style={{ backgroundColor: "#000033" }}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="clarity-filter-mobile-panel"
      >
        <div className="flex items-center gap-1.5">
          <Image
            src={s3Asset("/filtersicon/clarity.png")}
            alt="Clarity"
            width={16}
            height={16}
            className="w-6 h-6"
            priority
          />
          <span className="text-sm font-normal text-white">Clarity</span>
        </div>
        <div className="flex items-center ml-auto">
          <ChevronIcon open={open} />
        </div>
      </button>
      {open && (
        <div
          id="clarity-filter-mobile-panel"
          className="p-2.5 bg-white"
          style={{
            border: "0.25px solid #f9e8cd",
            borderTop: "none",
            height: "auto",
          }}
        >
          {/* Clarity Options */}
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {STATIC_CLARITY_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => handleClarityClick(option)}
                className={`px-1 py-0.5 text-xs font-normal transition-colors ${
                  selectedClarity.includes(option)
                    ? "text-gray-800 bg-[#FAF6EB]"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                style={{
                  border: selectedClarity.includes(option)
                    ? "0.25px solid #FAF6EB"
                    : "0.25px solid #f9e8cd",
                  borderRadius: "0",
                  minHeight: "24px",
                  minWidth: "40px",
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Special Options */}
          {!hideExtras && (
            <>
              <div className="grid grid-cols-4 gap-1.5 mb-2">
                {STATIC_SPECIAL_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSpecialClick(option)}
                    className={`px-1 py-0.5 transition-colors ${
                      selectedSpecial === option
                        ? "text-white"
                        : "text-white hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor:
                        selectedSpecial === option ? "#00003390" : "#000033",
                      border: "none",
                      borderRadius: "0",
                      minHeight: "26px",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Cut, Polish, Symmetry */}
              <div className="flex flex-col gap-2">
                {/* Cut Row */}
                <div className="flex items-center gap-1.5">
                  <div
                    className="px-1.5 py-1 text-xs font-normal text-white flex items-center justify-center"
                    style={{
                      backgroundColor: "#000033",
                      borderRadius: "0",
                      minHeight: "22px",
                      minWidth: "30px",
                    }}
                  >
                    Cut
                  </div>
                  <div className="flex gap-1 flex-1">
                    {["EX", "VG", "GD", "FR"].map((cut) => (
                      <button
                        key={cut}
                        onClick={() => handleCutClick(cut)}
                        className={`px-1.5 py-0.5 text-xs font-normal transition-colors flex-1 ${
                          cutArray.includes(cut)
                            ? "text-gray-800 bg-[#FAF6EB]"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                        style={{
                          border: cutArray.includes(cut)
                            ? "0.25px solid #FAF6EB"
                            : "0.25px solid #f9e8cd",
                          borderRadius: "0",
                          minHeight: "22px",
                        }}
                      >
                        {cut}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Polish Row */}
                <div className="flex items-center gap-1.5">
                  <div
                    className="px-1.5 py-1 text-xs font-normal text-white flex items-center justify-center"
                    style={{
                      backgroundColor: "#000033",
                      borderRadius: "0",
                      minHeight: "22px",
                      minWidth: "30px",
                    }}
                  >
                    Pol
                  </div>
                  <div className="flex gap-1 flex-1">
                    {["EX", "VG", "GD", "FR"].map((polish) => (
                      <button
                        key={polish}
                        onClick={() => handlePolishClick(polish)}
                        className={`px-1.5 py-0.5 text-xs font-normal transition-colors flex-1 ${
                          polishArray.includes(polish)
                            ? "text-gray-800 bg-[#FAF6EB]"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                        style={{
                          border: polishArray.includes(polish)
                            ? "0.25px solid #FAF6EB"
                            : "0.25px solid #f9e8cd",
                          borderRadius: "0",
                          minHeight: "22px",
                        }}
                      >
                        {polish}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Symmetry Row */}
                <div className="flex items-center gap-1.5">
                  <div
                    className="px-1.5 py-1 text-xs font-normal text-white flex items-center justify-center"
                    style={{
                      backgroundColor: "#000033",
                      borderRadius: "0",
                      minHeight: "22px",
                      minWidth: "30px",
                    }}
                  >
                    Sym
                  </div>
                  <div className="flex gap-1 flex-1">
                    {["EX", "VG", "GD", "FR"].map((symmetry) => (
                      <button
                        key={symmetry}
                        onClick={() => handleSymmetryClick(symmetry)}
                        className={`px-1.5 py-0.5 text-xs font-normal transition-colors flex-1 ${
                          symmetryArray.includes(symmetry)
                            ? "text-gray-800 bg-[#FAF6EB]"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                        style={{
                          border: symmetryArray.includes(symmetry)
                            ? "0.25px solid #FAF6EB"
                            : "0.25px solid #f9e8cd",
                          borderRadius: "0",
                          minHeight: "22px",
                        }}
                      >
                        {symmetry}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
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
