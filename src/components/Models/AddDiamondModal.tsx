"use client";

import React, { useState } from "react";
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

interface AddDiamondModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDiamondAdded?: () => void;
}

const SHAPES = ["ROUND", "PRINCESS", "CUSHION", "OVAL", "EMERALD", "PEAR", "MARQUISE", "RADIANT", "ASSCHER", "HEART"];
const COLORS = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
const CLARITIES = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"];
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
};

const AddDiamondModal: React.FC<AddDiamondModalProps> = ({
  isOpen,
  onClose,
  onDiamondAdded,
}) => {
  const [form, setForm] = useState<ManualDiamondPayload>({ ...initialForm });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ManualDiamondPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.STONE_NO || !form.SHAPE || !form.CARATS || !form.COLOR || !form.CLARITY) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // Build payload — only send non-empty optional fields
      const payload: ManualDiamondPayload = {
        STONE_NO: form.STONE_NO,
        SHAPE: form.SHAPE,
        CARATS: form.CARATS,
        COLOR: form.COLOR,
        CLARITY: form.CLARITY,
        sourceType: form.sourceType,
      };

      const optionalFields: (keyof ManualDiamondPayload)[] = [
        "CUT", "POL", "SYM", "FLOUR", "LAB", "LOCATION",
        "NET_RATE", "DISC_PER", "NET_VALUE", "RAP_PRICE",
        "DEPTH_PER", "TABLE_PER", "MEASUREMENTS", "REPORT_NO",
      ];

      optionalFields.forEach((key) => {
        if (form[key]?.trim()) {
          payload[key] = form[key];
        }
      });

      await inventoryApi.addManualDiamond(payload);
      toast.success("Diamond added successfully");
      setForm({ ...initialForm });
      onDiamondAdded?.();
      onClose();
    } catch (err) {
      console.error("Error adding diamond:", err);
      toast.error("Failed to add diamond");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden ${mavenPro.className}`}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className={`text-2xl font-bold text-[#040d39] ${marcellus.className}`}>
            Add Diamond
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Required Fields */}
          <p className="text-sm font-semibold text-gray-700 mb-3">Required Fields</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Stone No *</label>
              <input
                type="text"
                value={form.STONE_NO}
                onChange={(e) => handleChange("STONE_NO", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
                placeholder="e.g. MANUAL-001"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Shape *</label>
              <select
                value={form.SHAPE}
                onChange={(e) => handleChange("SHAPE", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
                required
              >
                <option value="">Select Shape</option>
                {SHAPES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Carats *</label>
              <input
                type="text"
                value={form.CARATS}
                onChange={(e) => handleChange("CARATS", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
                placeholder="e.g. 1.00"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Color *</label>
              <select
                value={form.COLOR}
                onChange={(e) => handleChange("COLOR", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
                required
              >
                <option value="">Select Color</option>
                {COLORS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Clarity *</label>
              <select
                value={form.CLARITY}
                onChange={(e) => handleChange("CLARITY", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
                required
              >
                <option value="">Select Clarity</option>
                {CLARITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Source Type *</label>
              <select
                value={form.sourceType}
                onChange={(e) => handleChange("sourceType", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
                required
              >
                {SOURCE_TYPES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Fields */}
          <p className="text-sm font-semibold text-gray-700 mb-3">Optional Fields</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Cut</label>
              <select
                value={form.CUT}
                onChange={(e) => handleChange("CUT", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
              >
                <option value="">Select Cut</option>
                {CUTS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Polish</label>
              <select
                value={form.POL}
                onChange={(e) => handleChange("POL", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
              >
                <option value="">Select Polish</option>
                {POLISHES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Symmetry</label>
              <select
                value={form.SYM}
                onChange={(e) => handleChange("SYM", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
              >
                <option value="">Select Symmetry</option>
                {SYMMETRIES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Fluorescence</label>
              <select
                value={form.FLOUR}
                onChange={(e) => handleChange("FLOUR", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
              >
                <option value="">Select Fluorescence</option>
                {FLUORS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Lab</label>
              <select
                value={form.LAB}
                onChange={(e) => handleChange("LAB", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
              >
                <option value="">Select Lab</option>
                {LABS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
              <input
                type="text"
                value={form.LOCATION}
                onChange={(e) => handleChange("LOCATION", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
                placeholder="e.g. Mumbai"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Rap Price</label>
              <input
                type="text"
                value={form.RAP_PRICE}
                onChange={(e) => handleChange("RAP_PRICE", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
                placeholder="e.g. 5000"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Discount %</label>
              <input
                type="text"
                value={form.DISC_PER}
                onChange={(e) => handleChange("DISC_PER", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
                placeholder="e.g. -35"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Net Rate ($/ct)</label>
              <input
                type="text"
                value={form.NET_RATE}
                onChange={(e) => handleChange("NET_RATE", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
                placeholder="e.g. 3250"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Net Value ($)</label>
              <input
                type="text"
                value={form.NET_VALUE}
                onChange={(e) => handleChange("NET_VALUE", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
                placeholder="e.g. 3250"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Depth %</label>
              <input
                type="text"
                value={form.DEPTH_PER}
                onChange={(e) => handleChange("DEPTH_PER", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
                placeholder="e.g. 61.5"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Table %</label>
              <input
                type="text"
                value={form.TABLE_PER}
                onChange={(e) => handleChange("TABLE_PER", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
                placeholder="e.g. 57"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Measurements</label>
              <input
                type="text"
                value={form.MEASUREMENTS}
                onChange={(e) => handleChange("MEASUREMENTS", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
                placeholder="e.g. 6.5-6.52x4.03"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Report No</label>
              <input
                type="text"
                value={form.REPORT_NO}
                onChange={(e) => handleChange("REPORT_NO", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#050c3a]"
                placeholder="e.g. 1234567890"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-[#050c3a] rounded-md hover:bg-[#0a1560] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Diamond"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDiamondModal;
