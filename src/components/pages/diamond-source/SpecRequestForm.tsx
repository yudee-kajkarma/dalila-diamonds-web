"use client";

import React, { useState, useRef } from "react";
import { Marcellus, Jost } from "next/font/google";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import { diamondApi } from "@/lib/api";
import toast from "react-hot-toast";
import { Upload, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const SHAPES = ["ROUND", "PRINCESS", "CUSHION", "OVAL", "EMERALD", "PEAR", "MARQUISE", "RADIANT", "ASSCHER", "HEART"];
const COLORS = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
const CLARITIES = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"];
const CUTS = ["EX", "VG", "GD", "FR", "PR"];
const FLUORS = ["NONE", "FNT", "MED", "STG", "VST"];
const LABS = ["GIA", "IGI", "HRD", "AGS"];

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

const initialForm: SpecFormData = {
  CARATS: "",
  SHAPE: "",
  COLOR: "",
  CLARITY: "",
  CUT: "",
  POL: "",
  SYM: "",
  LENGTH: "",
  WIDTH: "",
  DEPTH: "",
  FLOUR: "",
  LAB: "",
  message: "",
};

export default function SpecRequestForm() {
  const [form, setForm] = useState<SpecFormData>({ ...initialForm });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { dictionary } = useLanguage();

  const handleChange = (field: keyof SpecFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.SHAPE || !form.COLOR || !form.CLARITY || !form.CARATS) {
      toast.error(dictionary?.ds4u?.errRequired || "Please fill in Shape, Color, Clarity, and Carats");
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
      toast.success(dictionary?.ds4u?.successSubmit || "Your diamond request has been submitted!");
      setForm({ ...initialForm });
      removeImage();
    } catch (err) {
      console.error("Error submitting spec request:", err);
      toast.error(dictionary?.ds4u?.errSubmit || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `w-full bg-white/10 border border-white/20 rounded-md px-3 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#e4c75f] focus:border-[#e4c75f] ${jost.className}`;
  const selectClass = `${inputClass} appearance-none`;
  const labelClass = `block text-xs font-medium text-white/70 mb-1.5 ${jost.className}`;

  return (
    <div className="bg-[#0B1A33] py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Heading */}
        <AnimatedContainer direction="up">
          <div className="text-center mb-10">
            <span
              className={`inline-block text-sm sm:text-base uppercase tracking-[0.2em] font-medium bg-gradient-to-r from-[#bd9f41] via-[#e4c75f] to-[#bd9f41] bg-clip-text text-transparent mb-4 ${jost.className}`}
            >
              {dictionary?.ds4u?.formTag || "Request a Diamond"}
            </span>
            <h2
              className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-white tracking-tight ${marcellus.className}`}
            >
              {dictionary?.ds4u?.formTitle || "Tell Us What You Need"}
            </h2>
            <p className={`text-white/60 text-base md:text-lg mt-4 max-w-2xl mx-auto ${jost.className}`}>
              {dictionary?.ds4u?.formSubtitle || "Share your diamond specifications and we will source the perfect stone for you"}
            </p>
          </div>
        </AnimatedContainer>

        {/* Form */}
        <AnimatedContainer direction="up" delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Core specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className={labelClass}>{dictionary?.ds4u?.lblShape || "Shape *"}</label>
                <select
                  value={form.SHAPE}
                  onChange={(e) => handleChange("SHAPE", e.target.value)}
                  className={selectClass}
                  required
                  onInvalid={(e) => {
                    const target = e.target as HTMLSelectElement;
                    target.setCustomValidity(dictionary?.ds4u?.selectValidationMsg || "Please select an item in the list.");
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLSelectElement;
                    target.setCustomValidity("");
                  }}
                >
                  <option value="" className="text-gray-900">{dictionary?.ds4u?.selectPlaceholder || "Select"}</option>
                  {SHAPES.map((s) => (<option key={s} value={s} className="text-gray-900">{s}</option>))}
                </select>
              </div>
              <div>
                <label className={labelClass}>{dictionary?.ds4u?.lblCarats || "Carats *"}</label>
                <input
                  type="text"
                  value={form.CARATS}
                  onChange={(e) => handleChange("CARATS", e.target.value)}
                  className={inputClass}
                  placeholder="e.g. 1.02"
                  required
                  onInvalid={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity(dictionary?.ds4u?.inputValidationMsg || "Please fill out this field.");
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity("");
                  }}
                />
              </div>
              <div>
                <label className={labelClass}>{dictionary?.ds4u?.lblColor || "Color *"}</label>
                <select
                  value={form.COLOR}
                  onChange={(e) => handleChange("COLOR", e.target.value)}
                  className={selectClass}
                  required
                  onInvalid={(e) => {
                    const target = e.target as HTMLSelectElement;
                    target.setCustomValidity(dictionary?.ds4u?.selectValidationMsg || "Please select an item in the list.");
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLSelectElement;
                    target.setCustomValidity("");
                  }}
                >
                  <option value="" className="text-gray-900">{dictionary?.ds4u?.selectPlaceholder || "Select"}</option>
                  {COLORS.map((c) => (<option key={c} value={c} className="text-gray-900">{c}</option>))}
                </select>
              </div>
              <div>
                <label className={labelClass}>{dictionary?.ds4u?.lblClarity || "Clarity *"}</label>
                <select
                  value={form.CLARITY}
                  onChange={(e) => handleChange("CLARITY", e.target.value)}
                  className={selectClass}
                  required
                  onInvalid={(e) => {
                    const target = e.target as HTMLSelectElement;
                    target.setCustomValidity(dictionary?.ds4u?.selectValidationMsg || "Please select an item in the list.");
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLSelectElement;
                    target.setCustomValidity("");
                  }}
                >
                  <option value="" className="text-gray-900">{dictionary?.ds4u?.selectPlaceholder || "Select"}</option>
                  {CLARITIES.map((c) => (<option key={c} value={c} className="text-gray-900">{c}</option>))}
                </select>
              </div>
            </div>

            {/* Row 2: Grading */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className={labelClass}>{dictionary?.ds4u?.lblCut || "Cut"}</label>
                <select value={form.CUT} onChange={(e) => handleChange("CUT", e.target.value)} className={selectClass}>
                  <option value="" className="text-gray-900">{dictionary?.ds4u?.selectPlaceholder || "Select"}</option>
                  {CUTS.map((c) => (<option key={c} value={c} className="text-gray-900">{c}</option>))}
                </select>
              </div>
              <div>
                <label className={labelClass}>{dictionary?.ds4u?.lblPolish || "Polish"}</label>
                <select value={form.POL} onChange={(e) => handleChange("POL", e.target.value)} className={selectClass}>
                  <option value="" className="text-gray-900">{dictionary?.ds4u?.selectPlaceholder || "Select"}</option>
                  {CUTS.map((c) => (<option key={c} value={c} className="text-gray-900">{c}</option>))}
                </select>
              </div>
              <div>
                <label className={labelClass}>{dictionary?.ds4u?.lblSymmetry || "Symmetry"}</label>
                <select value={form.SYM} onChange={(e) => handleChange("SYM", e.target.value)} className={selectClass}>
                  <option value="" className="text-gray-900">{dictionary?.ds4u?.selectPlaceholder || "Select"}</option>
                  {CUTS.map((c) => (<option key={c} value={c} className="text-gray-900">{c}</option>))}
                </select>
              </div>
              <div>
                <label className={labelClass}>{dictionary?.ds4u?.lblFluorescence || "Fluorescence"}</label>
                <select value={form.FLOUR} onChange={(e) => handleChange("FLOUR", e.target.value)} className={selectClass}>
                  <option value="" className="text-gray-900">{dictionary?.ds4u?.selectPlaceholder || "Select"}</option>
                  {FLUORS.map((f) => (<option key={f} value={f} className="text-gray-900">{f}</option>))}
                </select>
              </div>
            </div>

            {/* Row 3: Measurements + Lab */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className={labelClass}>{dictionary?.ds4u?.lblLength || "Length"}</label>
                <input type="text" value={form.LENGTH} onChange={(e) => handleChange("LENGTH", e.target.value)} className={inputClass} placeholder="e.g. 6.45" />
              </div>
              <div>
                <label className={labelClass}>{dictionary?.ds4u?.lblWidth || "Width"}</label>
                <input type="text" value={form.WIDTH} onChange={(e) => handleChange("WIDTH", e.target.value)} className={inputClass} placeholder="e.g. 6.42" />
              </div>
              <div>
                <label className={labelClass}>{dictionary?.ds4u?.lblDepth || "Depth"}</label>
                <input type="text" value={form.DEPTH} onChange={(e) => handleChange("DEPTH", e.target.value)} className={inputClass} placeholder="e.g. 3.98" />
              </div>
              <div>
                <label className={labelClass}>{dictionary?.ds4u?.lblLab || "Lab"}</label>
                <select value={form.LAB} onChange={(e) => handleChange("LAB", e.target.value)} className={selectClass}>
                  <option value="" className="text-gray-900">{dictionary?.ds4u?.selectPlaceholder || "Select"}</option>
                  {LABS.map((l) => (<option key={l} value={l} className="text-gray-900">{l}</option>))}
                </select>
              </div>
            </div>

            {/* Row 4: Message */}
            <div>
              <label className={labelClass}>{dictionary?.ds4u?.lblMessage || "Message"}</label>
              <textarea
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className={`${inputClass} resize-none`}
                rows={3}
                placeholder={dictionary?.ds4u?.msgPlaceholder || "Tell us more about what you're looking for..."}
              />
            </div>

            {/* Row 5: Image upload */}
            <div>
              <label className={labelClass}>{dictionary?.ds4u?.lblImage || "Reference Image (optional)"}</label>
              {imagePreview ? (
                <div className="relative inline-block">
                  <img src={imagePreview} alt="Preview" className="h-24 w-24 object-cover rounded-md border border-white/20" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-white/30 rounded-md text-white/60 hover:border-[#e4c75f] hover:text-[#e4c75f] transition-colors text-sm"
                >
                  <Upload className="w-4 h-4" />
                  {dictionary?.ds4u?.btnUpload || "Upload Image"}
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

            {/* Submit */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-gradient-to-r from-[#bd9f41] via-[#e4c75f] to-[#bd9f41] text-[#0B1A33] font-semibold text-sm uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50 ${jost.className}`}
              >
                {isSubmitting
                  ? (dictionary?.ds4u?.btnSubmitting || "Submitting...")
                  : (dictionary?.ds4u?.btnSubmit || "Submit Request")}
              </button>
            </div>
          </form>
        </AnimatedContainer>
      </div>
    </div>
  );
}
