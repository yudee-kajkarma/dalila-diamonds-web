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

const STATIC_SHAPE_OPTIONS = [
  { value: "ROUND", label: "Round", image: s3Asset("/shapefilter/round.png") },
  { value: "RADIANT", label: "Radiant", image: s3Asset("/shapefilter/radiant.png") },
  { value: "PEAR", label: "Pear", image: s3Asset("/shapefilter/pear.png") },
  { value: "SQUARE", label: "Square", image: s3Asset("/shapefilter/square.png") },
  { value: "EMERALD", label: "Emerald", image: s3Asset("/shapefilter/emerald.png") },
  { value: "OVAL", label: "Oval", image: s3Asset("/shapefilter/oval.png") },
  { value: "CUSHION", label: "Cushion", image: s3Asset("/shapefilter/cushion.png") },
  {
    value: "TRILLIANT",
    label: "Trilliant",
    image: s3Asset("/shapefilter/trilliant.png"),
  },
  { value: "HEART", label: "Heart", image: s3Asset("/shapefilter/Heart.png") },
  {
    value: "PRINCESS",
    label: "Princess",
    image: s3Asset("/shapefilter/princess.png"),
  },
  { value: "MARQUISE", label: "Marquise", image: s3Asset("/shapefilter/marque.png") },
  { value: "OTHER", label: "Other", image: s3Asset("/shapefilter/others.png") },
];

interface ShapeFilterProps {
  selectedShape: string[];
  onShapeChange: (shapes: string[]) => void;
}

export default function ShapeFilter({
  selectedShape,
  onShapeChange,
}: ShapeFilterProps) {
  const handleShapeClick = (shape: string) => {
    const currentShapes = Array.isArray(selectedShape) ? selectedShape : [];
    if (currentShapes.includes(shape)) {
      // Remove shape if already selected
      onShapeChange(currentShapes.filter((s) => s !== shape));
    } else {
      // Add shape to selection
      onShapeChange([...currentShapes, shape]);
    }
  };

  const isSelected = (shape: string) => {
    return Array.isArray(selectedShape) && selectedShape.includes(shape);
  };

  // Helper for mobile: chunk array into rows of 2
  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  // Desktop layout (unchanged)
  const desktopView = (
    <div className={`${mavenPro.className} mb-1.5 mt-0.5 hidden lg:block`}>
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5"
        style={{ backgroundColor: "#000033" }}
      >
        <Image
          src={s3Asset("/filtersicon/shape.png")}
          alt="Shape"
          width={18}
          height={18}
          priority
        />
        <span className="text-base font-normal text-white">Shape</span>
      </div>
      <div
        className="p-2.5 bg-white"
        style={{
          border: "0.25px solid #f9e8cd",
          borderTop: "none",
          height: "288px",
        }}
      >
        <div className="grid grid-cols-4 gap-2">
          {STATIC_SHAPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleShapeClick(option.value)}
              className={`flex flex-col items-center justify-center gap-0.4 px-2 py-2 transition-colors ${
                isSelected(option.value)
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                minWidth: "72px",
                minHeight: "82px",
                border: isSelected(option.value)
                  ? "0.25px solid #FAF6EB"
                  : "0.25px solid #f9e8cd",
              }}
            >
              <div className="w-7 h-7 flex items-center justify-center">
                <Image
                  src={option.image}
                  alt={option.label}
                  width={28}
                  height={28}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-small font-normal">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );


  // Mobile dropdown state
  const [open, setOpen] = useState(false);

  // Simple chevron icon (down/up)
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

  // Mobile layout: 2 shapes per row, dropdown
  const mobileView = (
    <div className={`${mavenPro.className} mb-1.5 mt-0.5 block lg:hidden`}>
      <button
        type="button"
        className="w-full flex items-center justify-between px-2.5 py-1.5 focus:outline-none"
        style={{ backgroundColor: "#000033" }}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="shape-filter-mobile-panel"
      >
        <div className="flex items-center gap-1.5">
          <Image
            src={s3Asset("/filtersicon/shape.png")}
            alt="Shape"
            width={16}
            height={16}
            priority
          />
          <span className="text-sm font-normal text-white">Shape</span>
        </div>
        <div className="flex items-center ml-auto">
          <ChevronIcon open={open} />
        </div>
      </button>
      {open && (
        <div
          id="shape-filter-mobile-panel"
          className="p-2.5 bg-white"
          style={{
            border: "0.25px solid #f9e8cd",
            borderTop: "none",
            height: "auto",
          }}
        >
          <div className="flex flex-col gap-2">
            {chunkArray(STATIC_SHAPE_OPTIONS, 2).map((row, rowIdx) => (
              <div className="flex gap-2" key={rowIdx}>
                {row.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleShapeClick(option.value)}
                    className={`flex flex-col items-center justify-center gap-0.4 px-2 py-2 flex-1 transition-colors ${
                      isSelected(option.value)
                        ? "text-gray-800 bg-[#FAF6EB]"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{
                      minWidth: "0", // let flex-1 handle width
                      minHeight: "72px",
                      border: isSelected(option.value)
                        ? "0.25px solid #FAF6EB"
                        : "0.25px solid #f9e8cd",
                    }}
                  >
                    <div className="w-7 h-7 flex items-center justify-center">
                      <Image
                        src={option.image}
                        alt={option.label}
                        width={24}
                        height={24}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <span className="text-xs font-normal">{option.label}</span>
                  </button>
                ))}
                {/* If row has only 1 item, add an empty flex-1 for alignment */}
                {row.length === 1 && <div className="flex-1" />}
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
