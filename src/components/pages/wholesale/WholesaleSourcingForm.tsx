"use client";

import React, { useState } from "react";
import { Marcellus, Jost } from "next/font/google";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import { diamondApi } from "@/lib/api";
import toast from "react-hot-toast";
import type { Locale } from "@/lib/i18n/config";
import type { WholesaleLooseDiamondsPageData } from "@/lib/i18n/getWholesaleLooseDiamondsData";

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

type FormContent = WholesaleLooseDiamondsPageData["form"];

interface WholesaleFormState {
  businessName: string;
  location: string;
  fullName: string;
  email: string;
  phone: string;
  shape: string;
  quantity: string;
  caratRange: string;
  colour: string;
  clarity: string;
  cut: string;
  laboratory: string;
  fluorescence: string;
  budget: string;
  destination: string;
  requiredDate: string;
  message: string;
}

const initialForm: WholesaleFormState = {
  businessName: "",
  location: "",
  fullName: "",
  email: "",
  phone: "",
  shape: "",
  quantity: "",
  caratRange: "",
  colour: "",
  clarity: "",
  cut: "",
  laboratory: "",
  fluorescence: "",
  budget: "",
  destination: "",
  requiredDate: "",
  message: "",
};

const SHAPE_TO_API: Record<string, string> = {
  Round: "ROUND",
  Oval: "OVAL",
  Emerald: "EMERALD",
  Pear: "PEAR",
  Cushion: "CUSHION",
  Marquise: "MARQUISE",
  Radiant: "RADIANT",
  Princess: "PRINCESS",
  Asscher: "ASSCHER",
  Heart: "HEART",
  Other: "OTHER",
};

const FLUOR_TO_API: Record<string, string> = {
  None: "NONE",
  Faint: "FNT",
  Medium: "MED",
  Strong: "STG",
  "Very Strong": "VST",
};

interface WholesaleSourcingFormProps {
  content: FormContent;
  locale?: Locale;
}

export default function WholesaleSourcingForm({
  content,
}: WholesaleSourcingFormProps) {
  const [form, setForm] = useState<WholesaleFormState>({ ...initialForm });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof WholesaleFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.businessName.trim() || !form.email.trim() || !form.shape || !form.caratRange.trim()) {
      toast.error(content.incompleteMessage);
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      const shapeApi = SHAPE_TO_API[form.shape] || form.shape.toUpperCase();
      formData.append("SHAPE", shapeApi);
      formData.append("CARATS", form.caratRange.trim());

      if (form.colour.trim()) formData.append("COLOR", form.colour.trim());
      if (form.clarity.trim()) formData.append("CLARITY", form.clarity.trim());
      if (form.cut.trim()) formData.append("CUT", form.cut.trim());

      const fluorApi = FLUOR_TO_API[form.fluorescence];
      if (fluorApi) formData.append("FLOUR", fluorApi);

      if (form.laboratory && form.laboratory !== "Flexible") {
        formData.append("LAB", form.laboratory);
      }

      const messageParts = [
        "Wholesale sourcing request",
        `Business name: ${form.businessName.trim()}`,
        form.location.trim() ? `Location: ${form.location.trim()}` : null,
        form.fullName.trim() ? `Contact name: ${form.fullName.trim()}` : null,
        `Email: ${form.email.trim()}`,
        form.phone.trim() ? `Phone: ${form.phone.trim()}` : null,
        form.quantity.trim() ? `Quantity: ${form.quantity.trim()}` : null,
        form.budget.trim() ? `Budget: ${form.budget.trim()}` : null,
        form.destination.trim() ? `Destination: ${form.destination.trim()}` : null,
        form.requiredDate.trim() ? `Required date: ${form.requiredDate.trim()}` : null,
        form.fluorescence === "Flexible" ? "Fluorescence: Flexible" : null,
        form.laboratory === "Flexible" ? "Laboratory: Flexible" : null,
        form.message.trim() ? `Notes: ${form.message.trim()}` : null,
      ].filter(Boolean) as string[];

      formData.append("message", messageParts.join("\n"));

      await diamondApi.submitSpecRequest(formData);
      toast.success(content.successMessage);
      setForm({ ...initialForm });
    } catch (err) {
      console.error("Error submitting wholesale sourcing request:", err);
      toast.error(content.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `w-full bg-white/10 border border-white/20 rounded-md px-3 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#e4c75f] focus:border-[#e4c75f] ${jost.className}`;
  const selectClass = `${inputClass} appearance-none`;
  const labelClass = `block text-xs font-medium text-white/70 mb-1.5 ${jost.className}`;

  return (
    <section
      id={content.id || "wholesale-sourcing-form"}
      className={`scroll-mt-28 bg-[#0B1A33] py-16 md:py-20 ${marcellus.variable} ${jost.variable}`}
      aria-labelledby="wholesale-sourcing-form-heading"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <AnimatedContainer direction="up">
          <div className="text-center mb-10">
            <span
              className={`inline-block text-sm sm:text-base uppercase tracking-[0.2em] font-medium bg-linear-to-r from-[#bd9f41] via-[#e4c75f] to-[#bd9f41] bg-clip-text text-transparent mb-4 ${jost.className}`}
            >
              {content.tag}
            </span>
            <h2
              id="wholesale-sourcing-form-heading"
              className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-white tracking-tight ${marcellus.className}`}
            >
              {content.title}
            </h2>
            <p className={`text-white/60 text-base md:text-lg mt-4 max-w-2xl mx-auto ${jost.className}`}>
              {content.subtitle}
            </p>
          </div>
        </AnimatedContainer>

        <AnimatedContainer direction="up" delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} htmlFor="ws-businessName">
                  {content.labels.businessName}
                </label>
                <input
                  id="ws-businessName"
                  type="text"
                  value={form.businessName}
                  onChange={(e) => handleChange("businessName", e.target.value)}
                  className={inputClass}
                  placeholder={content.placeholders.businessName}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ws-location">
                  {content.labels.location}
                </label>
                <input
                  id="ws-location"
                  type="text"
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className={inputClass}
                  placeholder={content.placeholders.location}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ws-fullName">
                  {content.labels.fullName}
                </label>
                <input
                  id="ws-fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className={inputClass}
                  placeholder={content.placeholders.fullName}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ws-email">
                  {content.labels.email}
                </label>
                <input
                  id="ws-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={inputClass}
                  placeholder={content.placeholders.email}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ws-phone">
                  {content.labels.phone}
                </label>
                <input
                  id="ws-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={inputClass}
                  placeholder={content.placeholders.phone}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ws-shape">
                  {content.labels.shape}
                </label>
                <select
                  id="ws-shape"
                  value={form.shape}
                  onChange={(e) => handleChange("shape", e.target.value)}
                  className={selectClass}
                  required
                >
                  <option value="" className="text-gray-900">
                    Select
                  </option>
                  {content.shapeOptions.map((option) => (
                    <option key={option} value={option} className="text-gray-900">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="ws-quantity">
                  {content.labels.quantity}
                </label>
                <input
                  id="ws-quantity"
                  type="text"
                  value={form.quantity}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                  className={inputClass}
                  placeholder={content.placeholders.quantity}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ws-caratRange">
                  {content.labels.caratRange}
                </label>
                <input
                  id="ws-caratRange"
                  type="text"
                  value={form.caratRange}
                  onChange={(e) => handleChange("caratRange", e.target.value)}
                  className={inputClass}
                  placeholder={content.placeholders.caratRange}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ws-colour">
                  {content.labels.colour}
                </label>
                <input
                  id="ws-colour"
                  type="text"
                  value={form.colour}
                  onChange={(e) => handleChange("colour", e.target.value)}
                  className={inputClass}
                  placeholder={content.placeholders.colour}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ws-clarity">
                  {content.labels.clarity}
                </label>
                <input
                  id="ws-clarity"
                  type="text"
                  value={form.clarity}
                  onChange={(e) => handleChange("clarity", e.target.value)}
                  className={inputClass}
                  placeholder={content.placeholders.clarity}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ws-cut">
                  {content.labels.cut}
                </label>
                <input
                  id="ws-cut"
                  type="text"
                  value={form.cut}
                  onChange={(e) => handleChange("cut", e.target.value)}
                  className={inputClass}
                  placeholder={content.placeholders.cut}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ws-laboratory">
                  {content.labels.laboratory}
                </label>
                <select
                  id="ws-laboratory"
                  value={form.laboratory}
                  onChange={(e) => handleChange("laboratory", e.target.value)}
                  className={selectClass}
                >
                  <option value="" className="text-gray-900">
                    Select
                  </option>
                  {content.laboratoryOptions.map((option) => (
                    <option key={option} value={option} className="text-gray-900">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="ws-fluorescence">
                  {content.labels.fluorescence}
                </label>
                <select
                  id="ws-fluorescence"
                  value={form.fluorescence}
                  onChange={(e) => handleChange("fluorescence", e.target.value)}
                  className={selectClass}
                >
                  <option value="" className="text-gray-900">
                    Select
                  </option>
                  {content.fluorescenceOptions.map((option) => (
                    <option key={option} value={option} className="text-gray-900">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="ws-budget">
                  {content.labels.budget}
                </label>
                <input
                  id="ws-budget"
                  type="text"
                  value={form.budget}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  className={inputClass}
                  placeholder={content.placeholders.budget}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ws-destination">
                  {content.labels.destination}
                </label>
                <input
                  id="ws-destination"
                  type="text"
                  value={form.destination}
                  onChange={(e) => handleChange("destination", e.target.value)}
                  className={inputClass}
                  placeholder={content.placeholders.destination}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="ws-requiredDate">
                  {content.labels.requiredDate}
                </label>
                <input
                  id="ws-requiredDate"
                  type="text"
                  value={form.requiredDate}
                  onChange={(e) => handleChange("requiredDate", e.target.value)}
                  className={inputClass}
                  placeholder={content.placeholders.requiredDate}
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="ws-message">
                {content.labels.message}
              </label>
              <textarea
                id="ws-message"
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className={`${inputClass} resize-none`}
                rows={4}
                placeholder={content.placeholders.message}
              />
            </div>

            <p className={`text-white/50 text-xs text-center ${jost.className}`}>
              {content.requiredNote}
            </p>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-linear-to-r from-[#bd9f41] via-[#e4c75f] to-[#bd9f41] text-[#0B1A33] font-semibold text-sm uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50 ${jost.className}`}
              >
                {isSubmitting ? "Submitting…" : content.submitButton}
              </button>
            </div>
          </form>
        </AnimatedContainer>
      </div>
    </section>
  );
}
