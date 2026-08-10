"use client";

import React, { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { formApi } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

const marcellusStyle = {
  fontFamily: "Marcellus, serif",
};

const jostStyle = {
  fontFamily: "Jost, sans-serif",
};

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  carat: string;
  condition: string;
  material: string;
  description: string;
  fullAddress: string;
  pickupDate: string;
  pickupTime: string;
  images: File[];
}

export default function SellDiamondsForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    carat: "",
    condition: "",
    material: "",
    description: "",
    fullAddress: "",
    pickupDate: "",
    pickupTime: "",
    images: [],
  });

  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { dictionary } = useLanguage();
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const imageFiles = files.filter((file) =>
        file.type.startsWith("image/"),
      );

      if (imageFiles.length === 0) {
        alert("Please upload image files only (PNG, JPG, GIF).");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...imageFiles],
      }));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset status
    setSubmitStatus({ type: null, message: "" });

    // Validate required fields
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.material ||
      !formData.description ||
      !formData.fullAddress ||
      !formData.pickupDate
    ) {
      setSubmitStatus({
        type: "error",
        message: dictionary?.sud?.errorMessage || "Failed to submit form. Please try again.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("fullName", formData.fullName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("carat", formData.carat);
      submitData.append("condition", formData.condition);
      submitData.append("material", formData.material);
      submitData.append("description", formData.description);
      submitData.append("fullAddress", formData.fullAddress);
      submitData.append("pickupDate", formData.pickupDate);
      submitData.append("pickupTime", formData.pickupTime);

      formData.images.forEach((image) => {
        submitData.append("images", image);
      });

      const response = await formApi.submitSellDiamond(submitData);

      if (response.success) {
        setSubmitStatus({
          type: "success",
          message: dictionary?.sud?.successMessage || "Form submitted successfully! We will contact you soon.",
        });
        // Clear form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          carat: "",
          condition: "",
          material: "",
          description: "",
          fullAddress: "",
          pickupDate: "",
          pickupTime: "",
          images: [],
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: response.message || response.error || (dictionary?.sud?.errorMessage || "Failed to submit form. Please try again."),
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : (dictionary?.sud?.errorMessage || "Failed to submit form. Please try again."),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-none shadow-md p-8">
        <div className="text-center mb-8">
          <h2
            className="text-3xl font-bold text-gray-900 mb-2"
            style={marcellusStyle}
          >
            {dictionary?.sud?.formTitle || "Get a Free Diamond Estimate"}
          </h2>
          <p className="text-gray-600" style={jostStyle}>
            {dictionary?.sud?.formSubtitle || "Complete the form below to get a free valuation for your diamonds. Our process is secure, confidential, and designed to get you the best possible price."}
          </p>
          <p className="text-sm text-gray-600 mt-2 font-medium" style={jostStyle}>
            {dictionary?.sud?.formNoAccount || "No account required - Anyone can submit"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" style={jostStyle}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {dictionary?.sud?.lblFullName || "Full Name"} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder={dictionary?.sud?.placeholderName || "Full Name"}
              required
              onInvalid={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity(dictionary?.sud?.inputValidationMsg || "Please fill out this field.");
              }}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity("");
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition placeholder:text-gray-500"
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {dictionary?.sud?.lblEmail || "Email Address"} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={dictionary?.sud?.placeholderEmail || "Email Address"}
              required
              onInvalid={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity(dictionary?.sud?.inputValidationMsg || "Please fill out this field.");
              }}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity("");
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition placeholder:text-gray-500"
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {dictionary?.sud?.lblPhone || "Phone Number"} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={dictionary?.sud?.placeholderPhone || "Phone Number"}
              required
              onInvalid={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity(dictionary?.sud?.inputValidationMsg || "Please fill out this field.");
              }}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity("");
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition placeholder:text-gray-500"
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* Carat (optional) */}
          <div>
            <label
              htmlFor="carat"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {dictionary?.sud?.lblCarat || "Carat (optional)"}
            </label>
            <input
              type="text"
              id="carat"
              name="carat"
              value={formData.carat}
              onChange={handleInputChange}
              placeholder={dictionary?.sud?.placeholderCarat || "e.g., 1.5"}
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition placeholder:text-gray-500"
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* Condition */}
          <div>
            <label
              htmlFor="condition"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {dictionary?.sud?.lblCondition || "Condition"}
            </label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition text-gray-900"
              style={{
                colorScheme: "light",
                color: formData.condition ? "#111827" : "#6b7280",
              }}
            >
              <option value="" style={{ color: "#6b7280" }}>
                {dictionary?.sud?.placeholderCondition || "Select Condition"}
              </option>
              <option value="excellent" style={{ color: "#111827" }}>
                {dictionary?.sud?.condExcellent || "Excellent"}
              </option>
              <option value="good" style={{ color: "#111827" }}>
                {dictionary?.sud?.condGood || "Good"}
              </option>
              <option value="fair" style={{ color: "#111827" }}>
                {dictionary?.sud?.condFair || "Fair"}
              </option>
            </select>
          </div>

          {/* Material */}
          <div>
            <label
              htmlFor="material"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {dictionary?.sud?.lblMaterial || "Material"} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="material"
              name="material"
              value={formData.material}
              onChange={handleInputChange}
              placeholder={dictionary?.sud?.placeholderMaterial || "e.g., Gold, Silver, Platinum"}
              required
              onInvalid={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity(dictionary?.sud?.inputValidationMsg || "Please fill out this field.");
              }}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity("");
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition placeholder:text-gray-500"
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {dictionary?.sud?.lblDescription || "Description"} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder={dictionary?.sud?.placeholderDesc || "Describe your diamond(s) in detail..."}
              rows={4}
              required
              onInvalid={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.setCustomValidity(dictionary?.sud?.inputValidationMsg || "Please fill out this field.");
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.setCustomValidity("");
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition placeholder:text-gray-500"
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* Upload Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {dictionary?.sud?.lblUpload || "Upload Images"}
            </label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-none p-8 text-center transition hover:border-[#F2DB7F] ${
                dragActive
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="file"
                id="fileInput"
                multiple
                accept="image/png,image/jpeg,image/gif"
                onChange={handleFileInput}
                className="hidden"
              />
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-none flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-yellow-600" />
                </div>
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-gray-700 hover:text-yellow-600 transition"
                >
                  <span className="font-medium border border-gray-300 px-4 py-2 inline-block hover:bg-yellow-50">
                    {dictionary?.sud?.btnChooseFiles || "Choose Files"}
                  </span>
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  {dictionary?.sud?.lblDragDrop || "Upload files or drag and drop"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {dictionary?.sud?.lblLimit || "PNG, JPG, GIF up to 10MB each"}
                </p>
              </div>
            </div>
            {formData.images.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  {formData.images.length} {dictionary?.sud?.lblSelected || "file(s) selected:"}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {formData.images.map((file, index) => (
                    <div
                      key={index}
                      className="relative border border-gray-300 p-2 flex items-center justify-between"
                    >
                      <span className="text-xs text-gray-600 truncate flex-1">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Full Address */}
          <div>
            <label
              htmlFor="fullAddress"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {dictionary?.sud?.lblAddress || "Full Address"} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="fullAddress"
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleInputChange}
              placeholder={dictionary?.sud?.placeholderAddress || "Street address, City, State, ZIP Code"}
              rows={3}
              required
              onInvalid={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.setCustomValidity(dictionary?.sud?.inputValidationMsg || "Please fill out this field.");
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.setCustomValidity("");
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition placeholder:text-gray-500"
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* Preferred Pickup Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="pickupDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {dictionary?.sud?.lblPickupDate || "Preferred Pickup Date"} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                  required
                  onInvalid={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity(dictionary?.sud?.inputValidationMsg || "Please fill out this field.");
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity("");
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition"
                  style={{
                    colorScheme: "light",
                    color: formData.pickupDate ? "#111827" : "#6b7280",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="pickupTime"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {dictionary?.sud?.lblPickupTime || "Preferred Time (Optional)"}
              </label>
              <div className="relative">
                <select
                  id="pickupTime"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition text-gray-900"
                  style={{
                    colorScheme: "light",
                    color: formData.pickupTime ? "#111827" : "#6b7280",
                  }}
                >
                  <option value="" style={{ color: "#6b7280" }}>
                    {dictionary?.sud?.placeholderTime || "Select Time"}
                  </option>
                  <option value="morning" style={{ color: "#111827" }}>
                    {dictionary?.sud?.timeMorning || "Morning (9AM - 12PM)"}
                  </option>
                  <option value="afternoon" style={{ color: "#111827" }}>
                    {dictionary?.sud?.timeAfternoon || "Afternoon (12PM - 5PM)"}
                  </option>
                  <option value="evening" style={{ color: "#111827" }}>
                    {dictionary?.sud?.timeEvening || "Evening (5PM - 8PM)"}
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Status Message */}
          {submitStatus.type && (
            <div
              className={`p-4 rounded-none border ${
                submitStatus.type === "success"
                  ? "bg-green-50 border-green-500 text-green-800"
                  : "bg-red-50 border-red-500 text-red-800"
              }`}
            >
              <p className="text-sm font-medium">{submitStatus.message}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#D4A017] hover:bg-[#B58900] text-white cursor-pointer font-semibold py-3 px-6 rounded-none transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {dictionary?.sud?.btnSubmitting || "Submitting..."}
              </>
            ) : (
              dictionary?.sud?.btnSubmit || "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}