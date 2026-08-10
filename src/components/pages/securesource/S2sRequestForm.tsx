"use client";

import React, { useRef, useState } from "react";
import { Marcellus, Jost } from "next/font/google";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import { formApi } from "@/lib/api";
import type { S2sContent } from "@/lib/i18n/s2sTranslations";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

interface S2sFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  platform: string;
  listingUrl: string;
  stockNumber: string;
  reportNumber: string;
  listedPrice: string;
  deliveryDestination: string;
  message: string;
}

const initialForm: S2sFormData = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  platform: "",
  listingUrl: "",
  stockNumber: "",
  reportNumber: "",
  listedPrice: "",
  deliveryDestination: "",
  message: "",
};

interface S2sRequestFormProps {
  content: S2sContent["form"];
}

export default function S2sRequestForm({ content }: S2sRequestFormProps) {
  const [form, setForm] = useState<S2sFormData>({ ...initialForm });
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      if (selected.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(selected));
      } else {
        setFilePreview(null);
      }
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
      !form.companyName ||
      !form.email ||
      !form.phone ||
      !form.country ||
      !form.platform ||
      !form.listingUrl ||
      !form.reportNumber ||
      !form.deliveryDestination
    ) {
      toast.error("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const description = [
        "S2S Request",
        `Company: ${form.companyName}`,
        `Country: ${form.country}`,
        `Platform: ${form.platform}`,
        `Listing URL: ${form.listingUrl}`,
        `Stock number: ${form.stockNumber || "N/A"}`,
        `Report number: ${form.reportNumber}`,
        `Listed price: ${form.listedPrice || "N/A"}`,
        `Delivery destination: ${form.deliveryDestination}`,
        `Message: ${form.message || "N/A"}`,
      ].join("\n");

      const submitData = new FormData();
      submitData.append("fullName", form.fullName);
      submitData.append("email", form.email);
      submitData.append("phone", form.phone);
      submitData.append("material", form.companyName);
      submitData.append("description", description);
      submitData.append("fullAddress", form.deliveryDestination);
      submitData.append("condition", form.platform);
      submitData.append("carat", form.listedPrice);

      if (file) {
        submitData.append("images", file);
      }

      const response = await formApi.submitSellDiamond(submitData);
      if (response.success) {
        toast.success(content.successMessage);
        setForm({ ...initialForm });
        removeFile();
      } else {
        toast.error(response.message || content.errorMessage);
      }
    } catch (error) {
      console.error("S2S form submission error:", error);
      toast.error(content.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `w-full bg-white/10 border border-white/20 rounded-md px-3 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#e4c75f] focus:border-[#e4c75f] ${jost.className}`;
  const labelClass = `block text-xs font-medium text-white/70 mb-1.5 ${jost.className}`;

  return (
    <section className="bg-[#0B1A33] py-16 md:py-20" aria-labelledby="s2s-form-heading">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center mb-10">
          <span
            className={`inline-block text-sm sm:text-base uppercase tracking-[0.2em] font-medium bg-gradient-to-r from-[#bd9f41] via-[#e4c75f] to-[#bd9f41] bg-clip-text text-transparent mb-4 ${jost.className}`}
          >
            {content.tag}
          </span>
          <h2
            id="s2s-form-heading"
            className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-white tracking-tight ${marcellus.className}`}
          >
            {content.title}
          </h2>
          <p className={`text-white/60 text-base md:text-lg mt-4 max-w-2xl mx-auto ${jost.className}`}>
            {content.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="s2s-fullName" className={labelClass}>
                {content.labels.fullName}
              </label>
              <input
                id="s2s-fullName"
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
              <label htmlFor="s2s-companyName" className={labelClass}>
                {content.labels.companyName}
              </label>
              <input
                id="s2s-companyName"
                name="companyName"
                type="text"
                required
                value={form.companyName}
                onChange={handleChange}
                className={inputClass}
                autoComplete="organization"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="s2s-email" className={labelClass}>
                {content.labels.email}
              </label>
              <input
                id="s2s-email"
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
              <label htmlFor="s2s-phone" className={labelClass}>
                {content.labels.phone}
              </label>
              <input
                id="s2s-phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
                autoComplete="tel"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="s2s-country" className={labelClass}>
                {content.labels.country}
              </label>
              <input
                id="s2s-country"
                name="country"
                type="text"
                required
                value={form.country}
                onChange={handleChange}
                className={inputClass}
                autoComplete="country-name"
              />
            </div>
            <div>
              <label htmlFor="s2s-platform" className={labelClass}>
                {content.labels.platform}
              </label>
              <input
                id="s2s-platform"
                name="platform"
                type="text"
                required
                value={form.platform}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="s2s-listingUrl" className={labelClass}>
              {content.labels.listingUrl}
            </label>
            <input
              id="s2s-listingUrl"
              name="listingUrl"
              type="url"
              required
              value={form.listingUrl}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="s2s-stockNumber" className={labelClass}>
                {content.labels.stockNumber}
              </label>
              <input
                id="s2s-stockNumber"
                name="stockNumber"
                type="text"
                value={form.stockNumber}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="s2s-reportNumber" className={labelClass}>
                {content.labels.reportNumber}
              </label>
              <input
                id="s2s-reportNumber"
                name="reportNumber"
                type="text"
                required
                value={form.reportNumber}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="s2s-listedPrice" className={labelClass}>
                {content.labels.listedPrice}
              </label>
              <input
                id="s2s-listedPrice"
                name="listedPrice"
                type="text"
                value={form.listedPrice}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="s2s-deliveryDestination" className={labelClass}>
              {content.labels.deliveryDestination}
            </label>
            <input
              id="s2s-deliveryDestination"
              name="deliveryDestination"
              type="text"
              required
              value={form.deliveryDestination}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="s2s-message" className={labelClass}>
              {content.labels.message}
            </label>
            <textarea
              id="s2s-message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label htmlFor="s2s-fileUpload" className={labelClass}>
              {content.labels.fileUpload}
            </label>
            {file ? (
              <div className="flex items-center gap-4">
                {filePreview ? (
                  <img src={filePreview} alt="Upload preview" className="h-20 w-20 object-cover rounded-md border border-white/20" />
                ) : (
                  <span className={`text-white/80 text-sm ${jost.className}`}>{file.name}</span>
                )}
                <button
                  type="button"
                  onClick={removeFile}
                  className="inline-flex items-center gap-1 text-red-300 hover:text-red-200 text-sm"
                  aria-label="Remove uploaded file"
                >
                  <X className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-white/30 rounded-md text-white/60 hover:border-[#e4c75f] hover:text-[#e4c75f] transition-colors text-sm"
              >
                <Upload className="w-4 h-4" aria-hidden="true" />
                Upload file
              </button>
            )}
            <input
              ref={fileInputRef}
              id="s2s-fileUpload"
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className={`px-8 py-3 bg-gradient-to-r from-[#bd9f41] via-[#e4c75f] to-[#bd9f41] text-[#0B1A33] font-semibold text-sm uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50 ${jost.className}`}
            >
              {isSubmitting ? content.submittingText : content.submitText}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
