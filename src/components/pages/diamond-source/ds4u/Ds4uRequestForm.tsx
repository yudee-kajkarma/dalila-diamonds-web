"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import { diamondApi } from "@/lib/api";
import type { Ds4uContent } from "@/lib/i18n/ds4uTranslations";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

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
const CLARITIES = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"];
const CUTS = ["EX", "VG", "GD", "FR", "PR"];
const FLUORS = ["NONE", "FNT", "MED", "STG", "VST"];
const LABS = ["GIA", "IGI", "HRD"];
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

interface FormState {
  fullName: string;
  companyName: string;
  buyerType: string;
  email: string;
  phone: string;
  country: string;
  SHAPE: string;
  CARATS: string;
  COLOR: string;
  CLARITY: string;
  budget: string;
  currency: string;
  deliveryDestination: string;
  requiredDate: string;
  CUT: string;
  POL: string;
  SYM: string;
  FLOUR: string;
  LENGTH: string;
  WIDTH: string;
  DEPTH: string;
  lengthToWidthRatio: string;
  LAB: string;
  quantity: string;
  jewelleryUse: string;
  reportNumber: string;
  additionalRequirements: string;
  privacyConsent: boolean;
}

const initialForm: FormState = {
  fullName: "",
  companyName: "",
  buyerType: "",
  email: "",
  phone: "",
  country: "",
  SHAPE: "",
  CARATS: "",
  COLOR: "",
  CLARITY: "",
  budget: "",
  currency: "EUR",
  deliveryDestination: "",
  requiredDate: "",
  CUT: "",
  POL: "",
  SYM: "",
  FLOUR: "",
  LENGTH: "",
  WIDTH: "",
  DEPTH: "",
  lengthToWidthRatio: "",
  LAB: "",
  quantity: "",
  jewelleryUse: "",
  reportNumber: "",
  additionalRequirements: "",
  privacyConsent: false,
};

interface Ds4uRequestFormProps {
  content: Ds4uContent["form"];
}

export default function Ds4uRequestForm({ content }: Ds4uRequestFormProps) {
  const [form, setForm] = useState<FormState>({ ...initialForm });
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setForm((prev) => ({ ...prev, [name]: e.target.checked }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!ACCEPTED_TYPES.includes(selected.type)) {
      toast.error("Please upload a JPG, PNG, WEBP or PDF file.");
      return;
    }
    if (selected.size > MAX_FILE_BYTES) {
      toast.error("File must be 5MB or smaller.");
      return;
    }

    setFile(selected);
    if (selected.type.startsWith("image/")) {
      setFilePreview(URL.createObjectURL(selected));
    } else {
      setFilePreview(null);
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.buyerType ||
      !form.email ||
      !form.phone ||
      !form.country ||
      !form.SHAPE ||
      !form.CARATS ||
      !form.COLOR ||
      !form.CLARITY ||
      !form.budget ||
      !form.currency ||
      !form.deliveryDestination ||
      !form.requiredDate ||
      !form.privacyConsent
    ) {
      toast.error("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const message = [
        "DS4U Diamond Request",
        `Full name: ${form.fullName}`,
        `Company: ${form.companyName || "N/A"}`,
        `Buyer type: ${form.buyerType}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Country: ${form.country}`,
        `Budget: ${form.budget} ${form.currency}`,
        `Delivery destination: ${form.deliveryDestination}`,
        `Required date: ${form.requiredDate}`,
        `Length-to-width ratio: ${form.lengthToWidthRatio || "N/A"}`,
        `Quantity: ${form.quantity || "N/A"}`,
        `Intended jewellery use: ${form.jewelleryUse || "N/A"}`,
        `Reference report number: ${form.reportNumber || "N/A"}`,
        `Additional requirements: ${form.additionalRequirements || "N/A"}`,
      ].join("\n");

      const submitData = new FormData();
      submitData.append("SHAPE", form.SHAPE);
      submitData.append("CARATS", form.CARATS);
      submitData.append("COLOR", form.COLOR);
      submitData.append("CLARITY", form.CLARITY);
      if (form.CUT) submitData.append("CUT", form.CUT);
      if (form.POL) submitData.append("POL", form.POL);
      if (form.SYM) submitData.append("SYM", form.SYM);
      if (form.LENGTH) submitData.append("LENGTH", form.LENGTH);
      if (form.WIDTH) submitData.append("WIDTH", form.WIDTH);
      if (form.DEPTH) submitData.append("DEPTH", form.DEPTH);
      if (form.FLOUR) submitData.append("FLOUR", form.FLOUR);
      if (form.LAB) submitData.append("LAB", form.LAB);
      submitData.append("message", message);
      if (file) submitData.append("image", file);

      await diamondApi.submitSpecRequest(submitData);
      toast.success(content.successMessage);
      setForm({ ...initialForm });
      removeFile();
      setSubmitted(true);

      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "ds4u_form_submit", {
          event_category: "conversion",
          event_label: "DS4U diamond request",
        });
      }
    } catch (error) {
      console.error("DS4U form submission error:", error);
      toast.error(content.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `w-full bg-white/10 border border-white/20 rounded-md px-3 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#e4c75f] focus:border-[#e4c75f] ${jost.className}`;
  const labelClass = `block text-xs font-medium text-white/70 mb-1.5 ${jost.className}`;

  return (
    <section
      id={content.id}
      className="bg-[#0B1A33] py-16 md:py-20"
      aria-labelledby="ds4u-form-heading"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center mb-10">
          <span
            className={`inline-block text-sm sm:text-base uppercase tracking-[0.2em] font-medium bg-gradient-to-r from-[#bd9f41] via-[#e4c75f] to-[#bd9f41] bg-clip-text text-transparent mb-4 ${jost.className}`}
          >
            {content.tag}
          </span>
          <h2
            id="ds4u-form-heading"
            className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-white tracking-tight ${marcellus.className}`}
          >
            {content.title}
          </h2>
          <p className={`text-white/60 text-base md:text-lg mt-4 max-w-2xl mx-auto ${jost.className}`}>
            {content.subtitle}
          </p>
        </div>

        {submitted ? (
          <div className="bg-white/5 border border-[#e4c75f]/40 p-8 text-center">
            <h3 className={`text-2xl text-white mb-4 ${marcellus.className}`}>{content.successTitle}</h3>
            <p className={`text-white/80 leading-relaxed ${jost.className}`}>{content.successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ds4u-fullName" className={labelClass}>
                  {content.labels.fullName}
                </label>
                <input
                  id="ds4u-fullName"
                  name="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  className={inputClass}
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="ds4u-companyName" className={labelClass}>
                  {content.labels.companyName}
                </label>
                <input
                  id="ds4u-companyName"
                  name="companyName"
                  type="text"
                  value={form.companyName}
                  onChange={handleChange}
                  className={inputClass}
                  autoComplete="organization"
                />
              </div>
              <div>
                <label htmlFor="ds4u-buyerType" className={labelClass}>
                  {content.labels.buyerType}
                </label>
                <select
                  id="ds4u-buyerType"
                  name="buyerType"
                  required
                  value={form.buyerType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="" className="text-gray-900">
                    Select
                  </option>
                  {content.buyerTypes.map((type) => (
                    <option key={type} value={type} className="text-gray-900">
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="ds4u-email" className={labelClass}>
                  {content.labels.email}
                </label>
                <input
                  id="ds4u-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="ds4u-phone" className={labelClass}>
                  {content.labels.phone}
                </label>
                <input
                  id="ds4u-phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                  autoComplete="tel"
                />
              </div>
              <div>
                <label htmlFor="ds4u-country" className={labelClass}>
                  {content.labels.country}
                </label>
                <input
                  id="ds4u-country"
                  name="country"
                  type="text"
                  required
                  value={form.country}
                  onChange={handleChange}
                  className={inputClass}
                  autoComplete="country-name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label htmlFor="ds4u-shape" className={labelClass}>
                  {content.labels.shape}
                </label>
                <select
                  id="ds4u-shape"
                  name="SHAPE"
                  required
                  value={form.SHAPE}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="" className="text-gray-900">
                    Select
                  </option>
                  {SHAPES.map((shape) => (
                    <option key={shape} value={shape} className="text-gray-900">
                      {shape}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="ds4u-carat" className={labelClass}>
                  {content.labels.carat}
                </label>
                <input
                  id="ds4u-carat"
                  name="CARATS"
                  type="text"
                  required
                  value={form.CARATS}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. 1.00–1.20"
                />
              </div>
              <div>
                <label htmlFor="ds4u-colour" className={labelClass}>
                  {content.labels.colour}
                </label>
                <select
                  id="ds4u-colour"
                  name="COLOR"
                  required
                  value={form.COLOR}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="" className="text-gray-900">
                    Select
                  </option>
                  {COLORS.map((colour) => (
                    <option key={colour} value={colour} className="text-gray-900">
                      {colour}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="ds4u-clarity" className={labelClass}>
                  {content.labels.clarity}
                </label>
                <select
                  id="ds4u-clarity"
                  name="CLARITY"
                  required
                  value={form.CLARITY}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="" className="text-gray-900">
                    Select
                  </option>
                  {CLARITIES.map((clarity) => (
                    <option key={clarity} value={clarity} className="text-gray-900">
                      {clarity}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="ds4u-budget" className={labelClass}>
                  {content.labels.budget}
                </label>
                <input
                  id="ds4u-budget"
                  name="budget"
                  type="text"
                  required
                  value={form.budget}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="ds4u-currency" className={labelClass}>
                  {content.labels.currency}
                </label>
                <select
                  id="ds4u-currency"
                  name="currency"
                  required
                  value={form.currency}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {content.currencies.map((currency) => (
                    <option key={currency} value={currency} className="text-gray-900">
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="ds4u-destination" className={labelClass}>
                  {content.labels.deliveryDestination}
                </label>
                <input
                  id="ds4u-destination"
                  name="deliveryDestination"
                  type="text"
                  required
                  value={form.deliveryDestination}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="ds4u-requiredDate" className={labelClass}>
                  {content.labels.requiredDate}
                </label>
                <input
                  id="ds4u-requiredDate"
                  name="requiredDate"
                  type="date"
                  required
                  value={form.requiredDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label htmlFor="ds4u-cut" className={labelClass}>
                  {content.labels.cut}
                </label>
                <select id="ds4u-cut" name="CUT" value={form.CUT} onChange={handleChange} className={inputClass}>
                  <option value="" className="text-gray-900">
                    Select
                  </option>
                  {CUTS.map((cut) => (
                    <option key={cut} value={cut} className="text-gray-900">
                      {cut}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="ds4u-polish" className={labelClass}>
                  {content.labels.polish}
                </label>
                <select id="ds4u-polish" name="POL" value={form.POL} onChange={handleChange} className={inputClass}>
                  <option value="" className="text-gray-900">
                    Select
                  </option>
                  {CUTS.map((cut) => (
                    <option key={cut} value={cut} className="text-gray-900">
                      {cut}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="ds4u-symmetry" className={labelClass}>
                  {content.labels.symmetry}
                </label>
                <select id="ds4u-symmetry" name="SYM" value={form.SYM} onChange={handleChange} className={inputClass}>
                  <option value="" className="text-gray-900">
                    Select
                  </option>
                  {CUTS.map((cut) => (
                    <option key={cut} value={cut} className="text-gray-900">
                      {cut}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="ds4u-fluorescence" className={labelClass}>
                  {content.labels.fluorescence}
                </label>
                <select
                  id="ds4u-fluorescence"
                  name="FLOUR"
                  value={form.FLOUR}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="" className="text-gray-900">
                    Select
                  </option>
                  {FLUORS.map((fluor) => (
                    <option key={fluor} value={fluor} className="text-gray-900">
                      {fluor}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label htmlFor="ds4u-length" className={labelClass}>
                  {content.labels.length}
                </label>
                <input
                  id="ds4u-length"
                  name="LENGTH"
                  type="text"
                  value={form.LENGTH}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="ds4u-width" className={labelClass}>
                  {content.labels.width}
                </label>
                <input
                  id="ds4u-width"
                  name="WIDTH"
                  type="text"
                  value={form.WIDTH}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="ds4u-depth" className={labelClass}>
                  {content.labels.depth}
                </label>
                <input
                  id="ds4u-depth"
                  name="DEPTH"
                  type="text"
                  value={form.DEPTH}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="ds4u-ratio" className={labelClass}>
                  {content.labels.lengthToWidthRatio}
                </label>
                <input
                  id="ds4u-ratio"
                  name="lengthToWidthRatio"
                  type="text"
                  value={form.lengthToWidthRatio}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. 1.35–1.45"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="ds4u-lab" className={labelClass}>
                  {content.labels.lab}
                </label>
                <select id="ds4u-lab" name="LAB" value={form.LAB} onChange={handleChange} className={inputClass}>
                  <option value="" className="text-gray-900">
                    Select
                  </option>
                  {LABS.map((lab) => (
                    <option key={lab} value={lab} className="text-gray-900">
                      {lab}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="ds4u-quantity" className={labelClass}>
                  {content.labels.quantity}
                </label>
                <input
                  id="ds4u-quantity"
                  name="quantity"
                  type="text"
                  value={form.quantity}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="ds4u-reportNumber" className={labelClass}>
                  {content.labels.reportNumber}
                </label>
                <input
                  id="ds4u-reportNumber"
                  name="reportNumber"
                  type="text"
                  value={form.reportNumber}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="ds4u-jewelleryUse" className={labelClass}>
                {content.labels.jewelleryUse}
              </label>
              <input
                id="ds4u-jewelleryUse"
                name="jewelleryUse"
                type="text"
                value={form.jewelleryUse}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="ds4u-additional" className={labelClass}>
                {content.labels.additionalRequirements}
              </label>
              <textarea
                id="ds4u-additional"
                name="additionalRequirements"
                rows={4}
                value={form.additionalRequirements}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <label className={labelClass}>{content.labels.fileUpload}</label>
              {file ? (
                <div className="flex items-center gap-3">
                  {filePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={filePreview}
                      alt="Upload preview"
                      className="h-20 w-20 object-cover rounded-md border border-white/20"
                    />
                  ) : (
                    <span className={`text-white/70 text-sm ${jost.className}`}>{file.name}</span>
                  )}
                  <button
                    type="button"
                    onClick={removeFile}
                    className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    aria-label="Remove file"
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
                  Upload file
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className={`text-white/40 text-xs mt-2 ${jost.className}`}>{content.fileFormatsNote}</p>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="ds4u-privacy"
                name="privacyConsent"
                type="checkbox"
                required
                checked={form.privacyConsent}
                onChange={handleChange}
                className="mt-1"
              />
              <label htmlFor="ds4u-privacy" className={`text-white/70 text-sm ${jost.className}`}>
                {content.privacyLabel}{" "}
                <Link href={content.privacyHref} className="text-[#e4c75f] underline hover:text-white">
                  {content.privacyLinkText}
                </Link>
                .
              </label>
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-gradient-to-r from-[#bd9f41] via-[#e4c75f] to-[#bd9f41] text-[#0B1A33] font-semibold text-sm uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50 ${jost.className}`}
              >
                {isSubmitting ? content.submittingText : content.submitText}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
