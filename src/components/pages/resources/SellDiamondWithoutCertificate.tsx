"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Upload, X } from "lucide-react";
import { Marcellus, Jost } from "next/font/google";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import { formApi } from "@/lib/api";
import {
  getSellDiamondWithoutCertificateData,
  type SellDiamondWithoutCertificatePageData,
} from "@/lib/i18n/getSellDiamondWithoutCertificateData";
import { getLocalizedPath, type Locale } from "@/lib/i18n/config";

const marcellus = Marcellus({ subsets: ["latin"], weight: "400" });
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

function localizedPath(path: string, locale: Locale) {
  if (path.startsWith("http") || path.startsWith("#")) return path;
  return getLocalizedPath(path, locale);
}

type TableData = { caption?: string; headers: string[]; rows: string[][] };

type FormState = {
  itemType: string;
  certificateStatus: string;
  origin: string;
  caratWeight: string;
  shape: string;
  gradingLaboratory: string;
  reportNumber: string;
  purchaseDate: string;
  brand: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  postcode: string;
  contactMethod: string;
  evaluationPreference: string;
  additionalInfo: string;
  consent: boolean;
};

const initialForm: FormState = {
  itemType: "",
  certificateStatus: "",
  origin: "",
  caratWeight: "",
  shape: "",
  gradingLaboratory: "",
  reportNumber: "",
  purchaseDate: "",
  brand: "",
  fullName: "",
  email: "",
  phone: "",
  country: "",
  postcode: "",
  contactMethod: "",
  evaluationPreference: "",
  additionalInfo: "",
  consent: false,
};

function DataTable({ table }: { table: TableData }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className={`min-w-full border border-gray-200 text-left text-sm md:text-base ${jost.className}`}>
        {table.caption ? <caption className="sr-only">{table.caption}</caption> : null}
        <thead className="bg-slate-50">
          <tr>
            {table.headers.map((header) => (
              <th key={header} scope="col" className="border border-gray-200 px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-gray-50/60">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-200 px-4 py-3 text-gray-700 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <>
      <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
      <h2 id={`${id}-heading`} className={`text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight ${marcellus.className}`}>
        {title}
      </h2>
    </>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className={`space-y-2 mb-6 ${jost.className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-gray-700 text-base md:text-lg leading-relaxed">
          <span className="text-[#c89e3a] font-bold shrink-0" aria-hidden="true">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((p) => (
        <p key={p.slice(0, 48)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
          {p}
        </p>
      ))}
    </>
  );
}

function fieldClass() {
  return `w-full border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c89e3a]/40 focus:border-[#c89e3a] ${jost.className}`;
}

function buildStructuredData(data: SellDiamondWithoutCertificatePageData) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.daliladiamonds.com/#website",
        url: "https://www.daliladiamonds.com/",
        name: "Dalila Diamonds",
        publisher: { "@id": "https://www.daliladiamonds.com/#organization" },
      },
      {
        "@type": "Organization",
        "@id": "https://www.daliladiamonds.com/#organization",
        name: "Dalila Diamonds",
        url: "https://www.daliladiamonds.com/",
      },
      {
        "@type": "WebPage",
        "@id": `${data.meta.canonical}#webpage`,
        url: data.meta.canonical,
        name: data.meta.title,
        description: data.meta.description,
        inLanguage: data.meta.inLanguage,
        datePublished: data.meta.datePublished,
        dateModified: data.meta.dateModified,
        isPartOf: { "@id": "https://www.daliladiamonds.com/#website" },
        breadcrumb: { "@id": `${data.meta.canonical}#breadcrumb` },
        mainEntity: { "@id": `${data.meta.canonical}#article` },
      },
      {
        "@type": "Article",
        "@id": `${data.meta.canonical}#article`,
        headline: data.hero.title,
        description: data.meta.description,
        url: data.meta.canonical,
        mainEntityOfPage: { "@id": `${data.meta.canonical}#webpage` },
        image: `https://www.daliladiamonds.com${data.images.featured.src}`,
        author: { "@id": "https://www.daliladiamonds.com/#organization" },
        publisher: { "@id": "https://www.daliladiamonds.com/#organization" },
        datePublished: data.meta.datePublished,
        dateModified: data.meta.dateModified,
        about: [
          { "@type": "Thing", name: "Uncertified diamonds" },
          { "@type": "Thing", name: "Diamond grading reports" },
          { "@type": "Thing", name: "Selling diamonds" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${data.meta.canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: data.banner.breadcrumbHome, item: "https://www.daliladiamonds.com/" },
          { "@type": "ListItem", position: 2, name: data.banner.breadcrumbResources, item: "https://www.daliladiamonds.com/resources" },
          { "@type": "ListItem", position: 3, name: data.banner.breadcrumbCurrent, item: data.meta.canonical },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${data.meta.canonical}#faq`,
        mainEntity: data.faqs.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

function UncertifiedDiamondForm({
  formId,
  pageData,
}: {
  formId: string;
  pageData: SellDiamondWithoutCertificatePageData;
}) {
  const data = pageData;
  const MAX_FILE_BYTES = data.form.maxFileSizeMb * 1024 * 1024;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = useCallback((name: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const addFiles = (incoming: File[]) => {
    const valid = incoming.filter((f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_FILE_BYTES);
    if (valid.length !== incoming.length) {
      alert(`Please upload ${data.form.acceptedFormats} files up to ${data.form.maxFileSizeMb}MB each.`);
    }
    if (valid.length) setFiles((prev) => [...prev, ...valid]);
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 1 && !form.itemType) return data.form.validation.itemTypeRequired;
    if (currentStep === 2 && !form.certificateStatus) return data.form.validation.certificateRequired;
    if (currentStep === 5) {
      if (!form.fullName.trim()) return data.form.validation.nameRequired;
      if (!form.email.trim() && !form.phone.trim()) return data.form.validation.contactRequired;
      if (!form.country.trim()) return data.form.validation.countryRequired;
      if (!form.consent) return data.form.validation.consentRequired;
    }
    return null;
  };

  const goNext = () => {
    const error = validateStep(step);
    if (error) return setStatus({ type: "error", message: error });
    setStatus(null);
    setStep((s) => Math.min(s + 1, data.form.totalSteps));
  };

  const goBack = () => {
    setStatus(null);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateStep(5);
    if (error) return setStatus({ type: "error", message: error });

    setIsSubmitting(true);
    setStatus(null);
    try {
      const description = [
        "Sell Diamond Without Certificate — Evaluation Request",
        `Lead source: ${data.form.leadSource}`,
        `Item type: ${form.itemType}`,
        `Certificate status: ${form.certificateStatus}`,
        `Origin: ${form.origin || "Unknown"}`,
        `Carat weight: ${form.caratWeight || "Unknown"}`,
        `Shape: ${form.shape || "Unknown"}`,
        `Grading laboratory: ${form.gradingLaboratory || "Unknown"}`,
        `Report number: ${form.reportNumber || "N/A"}`,
        `Purchase date: ${form.purchaseDate || "N/A"}`,
        `Brand/jeweller: ${form.brand || "N/A"}`,
        `Contact method: ${form.contactMethod || "N/A"}`,
        `Evaluation preference: ${form.evaluationPreference || "N/A"}`,
        `Additional info: ${form.additionalInfo || "N/A"}`,
      ].join("\n");

      const submitData = new FormData();
      submitData.append("fullName", form.fullName);
      submitData.append("email", form.email || "not-provided@dalila.local");
      submitData.append("phone", form.phone || "Not provided");
      submitData.append("carat", form.caratWeight);
      submitData.append("material", form.itemType);
      submitData.append("description", description);
      submitData.append("fullAddress", `${form.country}${form.postcode ? `, ${form.postcode}` : ""}`);
      submitData.append("condition", form.certificateStatus);
      files.forEach((file) => submitData.append("images", file));

      const response = await formApi.submitSellDiamond(submitData);
      if (response.success) {
        setStatus({ type: "success", message: data.form.successMessage });
        setForm(initialForm);
        setFiles([]);
        setStep(1);
      } else {
        setStatus({ type: "error", message: response.message || data.form.errorMessage });
      }
    } catch {
      setStatus({ type: "error", message: data.form.errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepMeta = data.form.steps[step - 1];

  return (
    <section id={formId} className="scroll-mt-28 mb-12 border border-gray-200 bg-slate-50 p-5 md:p-8">
      <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-2 ${marcellus.className}`}>{data.form.title}</h3>
      <p className={`text-gray-600 mb-2 ${jost.className}`}>{data.form.subtitle}</p>
      <p className={`text-sm text-gray-500 mb-6 ${jost.className}`}>{data.form.optionalNote}</p>

      <div className={`flex flex-wrap gap-2 mb-6 ${jost.className}`} aria-label="Form progress">
        {data.form.steps.map((s) => (
          <span
            key={s.number}
            className={`text-xs px-3 py-1 border ${step === s.number ? "border-[#c89e3a] bg-white text-[#8a7028]" : step > s.number ? "border-gray-300 bg-gray-100 text-gray-600" : "border-gray-200 text-gray-400"}`}
          >
            {s.number}. {s.title}
          </span>
        ))}
      </div>

      <form onSubmit={step === data.form.totalSteps ? handleSubmit : (e) => { e.preventDefault(); goNext(); }} className="space-y-5">
        <h4 className={`text-lg font-semibold text-[#1a1a1a] ${marcellus.className}`}>
          Step {stepMeta.number}: {stepMeta.title}
        </h4>

        {step === 1 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.form.itemTypes.map((option) => (
              <label key={option} className={`flex items-start gap-3 p-3 border cursor-pointer hover:bg-white text-sm ${form.itemType === option ? "border-[#c89e3a] bg-white" : "border-gray-200"}`}>
                <input type="radio" name="itemType" value={option} checked={form.itemType === option} onChange={(e) => update("itemType", e.target.value)} className="mt-0.5" />
                <span>{option}</span>
              </label>
            ))}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid grid-cols-1 gap-2">
            {data.form.certificateStatuses.map((option) => (
              <label key={option} className={`flex items-start gap-3 p-3 border cursor-pointer hover:bg-white text-sm ${form.certificateStatus === option ? "border-[#c89e3a] bg-white" : "border-gray-200"}`}>
                <input type="radio" name="certificateStatus" value={option} checked={form.certificateStatus === option} onChange={(e) => update("certificateStatus", e.target.value)} className="mt-0.5" />
                <span>{option}</span>
              </label>
            ))}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.origin}</label>
                <select value={form.origin} onChange={(e) => update("origin", e.target.value)} className={fieldClass()}>
                  <option value="">Select…</option>
                  {data.form.originOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.caratWeight} ({data.form.labels.optional})</label>
                <input type="text" value={form.caratWeight} onChange={(e) => update("caratWeight", e.target.value)} className={fieldClass()} placeholder="e.g. 1.02 or unknown" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.shape} ({data.form.labels.optional})</label>
                <select value={form.shape} onChange={(e) => update("shape", e.target.value)} className={fieldClass()}>
                  <option value="">Select…</option>
                  {data.form.shapeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.gradingLaboratory} ({data.form.labels.optional})</label>
                <select value={form.gradingLaboratory} onChange={(e) => update("gradingLaboratory", e.target.value)} className={fieldClass()}>
                  <option value="">Select…</option>
                  {data.form.labOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.reportNumber} ({data.form.labels.optional})</label>
                <input type="text" value={form.reportNumber} onChange={(e) => update("reportNumber", e.target.value)} className={fieldClass()} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.purchaseDate} ({data.form.labels.optional})</label>
                <input type="text" value={form.purchaseDate} onChange={(e) => update("purchaseDate", e.target.value)} className={fieldClass()} placeholder="e.g. 2015 or unknown" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.brand} ({data.form.labels.optional})</label>
              <input type="text" value={form.brand} onChange={(e) => update("brand", e.target.value)} className={fieldClass()} />
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div>
            <p className={`text-sm text-gray-600 mb-3 ${jost.className}`}>Helpful uploads include:</p>
            <BulletList items={data.form.uploadHints} />
            <label className="block text-sm font-medium text-gray-700 mb-2">{data.form.labels.upload} ({data.form.labels.optional})</label>
            <div className="border-2 border-dashed border-gray-300 p-5 text-center bg-white">
              <Upload className="w-6 h-6 mx-auto mb-2 text-[#c89e3a]" />
              <p className="text-sm text-gray-600 mb-2">{data.form.labels.dragDrop}</p>
              <button type="button" onClick={() => fileInputRef.current?.click()} className="border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">Choose files</button>
              <input ref={fileInputRef} type="file" multiple accept=".jpg,.jpeg,.png,.webp,.pdf" className="hidden" onChange={(e) => addFiles(Array.from(e.target.files ?? []))} />
            </div>
            {files.length > 0 ? (
              <ul className="mt-2 space-y-1">
                {files.map((file, i) => (
                  <li key={`${file.name}-${i}`} className="flex items-center justify-between border border-gray-200 px-3 py-1.5 bg-white text-sm">
                    <span className="truncate">{file.name}</span>
                    <button type="button" onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))} aria-label="Remove"><X className="w-4 h-4 text-red-500" /></button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        {step === 5 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.fullName} *</label>
                <input type="text" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className={fieldClass()} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.email}</label>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={fieldClass()} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.phone}</label>
                <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={fieldClass()} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.country} *</label>
                <input type="text" required value={form.country} onChange={(e) => update("country", e.target.value)} className={fieldClass()} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.postcode} ({data.form.labels.optional})</label>
                <input type="text" value={form.postcode} onChange={(e) => update("postcode", e.target.value)} className={fieldClass()} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.contactMethod}</label>
                <select value={form.contactMethod} onChange={(e) => update("contactMethod", e.target.value)} className={fieldClass()}>
                  <option value="">Select…</option>
                  {data.form.contactMethods.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.evaluationPreference}</label>
              <select value={form.evaluationPreference} onChange={(e) => update("evaluationPreference", e.target.value)} className={fieldClass()}>
                <option value="">Select…</option>
                {data.form.evaluationPreferences.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.additionalInfo} ({data.form.labels.optional})</label>
              <textarea rows={4} value={form.additionalInfo} onChange={(e) => update("additionalInfo", e.target.value)} className={fieldClass()} />
            </div>
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1" />
              <span>{data.form.consentText}</span>
            </label>
          </div>
        ) : null}

        {status ? (
          <div className={`p-3 text-sm ${status.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>{status.message}</div>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-2">
          {step > 1 ? (
            <button type="button" onClick={goBack} className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-white text-sm font-medium">
              {data.form.backButton}
            </button>
          ) : null}
          {step < data.form.totalSteps ? (
            <button type="submit" className="px-8 py-3 bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium text-[13px] tracking-[0.08em] uppercase">
              {data.form.nextButton}
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium disabled:opacity-60 flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase">
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />{data.form.submittingButton}</> : data.form.submitButton}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default function SellDiamondWithoutCertificate({ locale = "en" }: { locale?: Locale }) {
  const data = getSellDiamondWithoutCertificateData(locale);

  return (
    <main className={`${marcellus.className} ${jost.className} bg-white min-h-screen pb-20 md:pb-0`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData(data)) }} />

      <div className="relative bg-slate-900">
        <section className="relative h-[36vh] sm:h-[55vh] lg:h-[50vh] flex items-center justify-center overflow-hidden" aria-label="Page banner">
          <div className="absolute inset-0">
            <Image src="/images/banner-dalila-contact.png" alt={data.banner.imageAlt} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-linear-to-b from-slate-900/70 via-slate-900/80 to-slate-900" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center py-8">
            <p className={`text-3xl sm:text-5xl lg:text-6xl text-white mb-3 mt-8 ${marcellus.className}`}>{data.banner.title}</p>
            <div className="w-2/3 sm:w-[35%] h-px bg-amber-400 mx-auto mb-6" aria-hidden="true" />
            <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center justify-center gap-2 text-gray-300 text-sm md:text-base ${jost.className}`}>
              <Link href={localizedPath("/", locale)} className="hover:text-amber-400 transition-colors">{data.banner.breadcrumbHome}</Link>
              <span aria-hidden="true">›</span>
              <Link href={localizedPath("/blogs", locale)} className="hover:text-amber-400 transition-colors">{data.banner.breadcrumbResources}</Link>
              <span aria-hidden="true">›</span>
              <span>{data.banner.breadcrumbCurrent}</span>
            </nav>
          </div>
        </section>
      </div>

      <section className="bg-white py-10 md:py-14" aria-labelledby="sdwc-hero-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 id="sdwc-hero-heading" className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] mb-6 tracking-tight ${marcellus.className}`}>{data.hero.title}</h1>
          <div className="relative w-full aspect-video mb-8 overflow-hidden bg-black shadow-xl">
            <Image src={data.images.featured.src} alt={data.images.featured.alt} width={data.images.featured.width} height={data.images.featured.height} className="object-cover w-full h-full" priority />
          </div>
          <Paragraphs items={data.hero.paragraphs} />
          <Link href={localizedPath(data.hero.primaryButtonHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>
            {data.hero.primaryButtonText}
          </Link>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          <ResourceSidebar currentPage="sell-diamond-without-certificate" />

          <article className="lg:col-span-3">
            <nav aria-label="Guide overview" className={`mb-10 p-5 md:p-6 bg-[#FAF6EB] border border-[#e4c75f]/30 ${jost.className}`}>
              <p className="font-semibold text-[#1a1a1a] mb-3">{data.overviewNav.title}</p>
              <ul className="space-y-2 text-sm md:text-base">
                {data.overviewNav.items.map((item) => (
                  <li key={item.id}><a href={`#${item.id}`} className="text-[#8a7028] hover:text-[#c89e3a] underline-offset-2 hover:underline">{item.label}</a></li>
                ))}
              </ul>
            </nav>

            <section id={data.quickAnswer.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.quickAnswer.id} title={data.quickAnswer.title} />
              <Paragraphs items={data.quickAnswer.paragraphs} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.quickAnswer.checksIntro}</p>
              <BulletList items={data.quickAnswer.checks} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.quickAnswer.closing}</p>
              <Link href={localizedPath(data.quickAnswer.ctaHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{data.quickAnswer.ctaText}</Link>
            </section>

            <UncertifiedDiamondForm formId={data.form.idTop} pageData={data} />

            <section id={data.whatIsCertificate.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.whatIsCertificate.id} title={data.whatIsCertificate.title} />
              <Paragraphs items={data.whatIsCertificate.paragraphs} />
              <p className={`text-gray-700 mb-3 ${jost.className}`}>{data.whatIsCertificate.containsIntro}</p>
              <BulletList items={data.whatIsCertificate.contains} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{data.whatIsCertificate.labsParagraph}</p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                A grading report describes the diamond, but it does not state what a buyer must pay. GIA expressly explains that its reports are not guarantees, valuations or appraisals. Read{" "}
                <a href={data.urls.giaReportLimitations} target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] hover:underline font-medium">{data.whatIsCertificate.giaLinkText}</a>.
              </p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.whatIsCertificate.closing}</p>
            </section>

            <section id={data.certificateRequired.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.certificateRequired.id} title={data.certificateRequired.title} />
              <Paragraphs items={data.certificateRequired.paragraphs} />
              <p className={`text-gray-700 mb-3 ${jost.className}`}>{data.certificateRequired.resultsIntro}</p>
              <BulletList items={data.certificateRequired.results} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.certificateRequired.closing}</p>
            </section>

            <section id={data.lostOrNeverCertified.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.lostOrNeverCertified.id} title={data.lostOrNeverCertified.title} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.lostOrNeverCertified.intro}</p>
              {data.lostOrNeverCertified.scenarios.map((scenario) => (
                <div key={scenario.title} className="mb-8">
                  <h3 className={`text-xl md:text-2xl text-[#1a1a1a] mb-3 ${marcellus.className}`}>{scenario.title}</h3>
                  <Paragraphs items={scenario.paragraphs} />
                  {"lookForIntro" in scenario && scenario.lookForIntro ? (
                    <>
                      <p className={`text-gray-700 mb-3 ${jost.className}`}>{scenario.lookForIntro}</p>
                      <BulletList items={scenario.lookFor!} />
                      <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{scenario.closing}</p>
                    </>
                  ) : null}
                </div>
              ))}
            </section>

            <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mb-12">
              <Image src={data.images.lostReportRecovery.src} alt={data.images.lostReportRecovery.alt} width={data.images.lostReportRecovery.width} height={data.images.lostReportRecovery.height} className="object-cover w-full h-full" loading="lazy" />
            </div>

            <section id={data.lostGia.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.lostGia.id} title={data.lostGia.title} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{data.lostGia.paragraphs[0]}</p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                {data.lostGia.paragraphs[1]}{" "}
                <a href={data.urls.giaLostReports} target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] hover:underline font-medium">{data.lostGia.giaLostLinkText}</a>.
              </p>
              <h3 className={`text-xl md:text-2xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>{data.lostGia.tryIntro}</h3>
              <ol className={`space-y-2 mb-6 list-decimal list-inside text-gray-700 ${jost.className}`}>
                {data.lostGia.steps.map((step) => (
                  <li key={step} className="leading-relaxed">
                    {step.includes("GIA Report Check") ? (
                      <>Enter the report number in <a href={data.urls.giaReportCheck} target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] hover:underline font-medium">{data.lostGia.giaReportCheckText}</a>.</>
                    ) : step}
                  </li>
                ))}
              </ol>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.lostGia.closing}</p>
              <p className={`text-sm text-gray-600 mt-4 ${jost.className}`}>
                Related: <Link href={localizedPath(data.internalLinks.gradingReport.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.gradingReport.text}</Link>
              </p>
            </section>

            <section id={data.lostHrd.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.lostHrd.id} title={data.lostHrd.title} />
              <Paragraphs items={data.lostHrd.paragraphs.slice(0, 2)} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                Use the official{" "}
                <a href={data.urls.hrdMyReports} target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] hover:underline font-medium">{data.lostHrd.hrdLinkText}</a>{" "}
                rather than relying on an unofficial database.
              </p>
              <Paragraphs items={data.lostHrd.paragraphs.slice(2)} />
            </section>

            <section id={data.lostIgi.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.lostIgi.id} title={data.lostIgi.title} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                IGI provides an official online report-verification tool. If the report number is available, enter it through{" "}
                <a href={data.urls.igiVerify} target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] hover:underline font-medium">{data.lostIgi.igiLinkText}</a>{" "}
                to check the grading information.
              </p>
              <Paragraphs items={data.lostIgi.paragraphs.slice(1)} />
            </section>

            <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mb-12">
              <Image src={data.images.evaluation.src} alt={data.images.evaluation.alt} width={data.images.evaluation.width} height={data.images.evaluation.height} className="object-cover w-full h-full" loading="lazy" />
            </div>

            <section id={data.buyerEvaluation.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.buyerEvaluation.id} title={data.buyerEvaluation.title} />
              <Paragraphs items={data.buyerEvaluation.intro} />
              {data.buyerEvaluation.sections.map((section) => (
                <div key={section.title} className="mb-6">
                  <h3 className={`text-xl md:text-2xl text-[#1a1a1a] mb-3 ${marcellus.className}`}>{section.title}</h3>
                  <Paragraphs items={section.paragraphs} />
                  {"bullets" in section && section.bullets ? <BulletList items={section.bullets} /> : null}
                  {"closing" in section && section.closing ? <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{section.closing}</p> : null}
                </div>
              ))}
            </section>

            <section id={data.naturalAtHome.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.naturalAtHome.id} title={data.naturalAtHome.title} />
              <Paragraphs items={data.naturalAtHome.paragraphs} />
            </section>

            <section id={data.loseValue.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.loseValue.id} title={data.loseValue.title} />
              <Paragraphs items={data.loseValue.paragraphs.slice(0, 2)} />
              <BulletList items={data.loseValue.uncertainties} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.loseValue.closing}</p>
            </section>

            <section id={data.newCertificate.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.newCertificate.id} title={data.newCertificate.title} />
              <Paragraphs items={data.newCertificate.intro} />
              <p className={`text-gray-700 mb-3 ${jost.className}`}>{data.newCertificate.worthwhileIntro}</p>
              <BulletList items={data.newCertificate.worthwhile} />
              <p className={`text-gray-700 mb-3 ${jost.className}`}>{data.newCertificate.notWorthwhileIntro}</p>
              <BulletList items={data.newCertificate.notWorthwhile} />
              <Paragraphs items={[data.newCertificate.closing]} />
              <Link href={localizedPath(data.newCertificate.ctaHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{data.newCertificate.ctaText}</Link>
            </section>

            <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mb-8">
              <Image src={data.images.certificationDecision.src} alt={data.images.certificationDecision.alt} width={data.images.certificationDecision.width} height={data.images.certificationDecision.height} className="object-cover w-full h-full" loading="lazy" />
            </div>

            <section id={data.certificationDecision.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.certificationDecision.id} title={data.certificationDecision.title} />
              <DataTable table={data.certificationDecision.table} />
            </section>

            <section id={data.mountedCertification.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.mountedCertification.id} title={data.mountedCertification.title} />
              <Paragraphs items={data.mountedCertification.paragraphs} />
              <p className={`text-gray-700 mb-3 ${jost.className}`}>{data.mountedCertification.limitsIntro}</p>
              <BulletList items={data.mountedCertification.limits} />
              <Paragraphs items={[data.mountedCertification.labsParagraph, data.mountedCertification.closing]} />
              <BulletList items={data.mountedCertification.questions} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.mountedCertification.finalNote}</p>
            </section>

            <section id={data.helpfulDocuments.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.helpfulDocuments.id} title={data.helpfulDocuments.title} />
              <Paragraphs items={data.helpfulDocuments.paragraphs} />
              <p className={`text-gray-700 mb-3 ${jost.className}`}>{data.helpfulDocuments.itemsIntro}</p>
              <BulletList items={data.helpfulDocuments.items} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.helpfulDocuments.closing}</p>
            </section>

            <section id={data.inheritedDiamond.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.inheritedDiamond.id} title={data.inheritedDiamond.title} />
              <Paragraphs items={data.inheritedDiamond.paragraphs} />
              <Link href={localizedPath(data.inheritedDiamond.ctaHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{data.inheritedDiamond.ctaText}</Link>
            </section>

            <section id={data.withoutReceipt.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.withoutReceipt.id} title={data.withoutReceipt.title} />
              <Paragraphs items={data.withoutReceipt.paragraphs.slice(0, 2)} />
              <BulletList items={data.withoutReceipt.alternatives} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.withoutReceipt.closing}</p>
            </section>

            <section id={data.whatNotToDo.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.whatNotToDo.id} title={data.whatNotToDo.title} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.whatNotToDo.intro}</p>
              {data.whatNotToDo.warnings.map((warning) => (
                <div key={warning.title} className="mb-5">
                  <h3 className={`text-lg md:text-xl text-[#1a1a1a] mb-2 ${marcellus.className}`}>{warning.title}</h3>
                  <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{warning.text}</p>
                </div>
              ))}
              <p className={`text-sm text-gray-600 mt-4 ${jost.className}`}>
                Related: <Link href={localizedPath(data.internalLinks.howToSell.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.howToSell.text}</Link>
                {" · "}
                <Link href={localizedPath(data.internalLinks.appraisalAntwerp.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.appraisalAntwerp.text}</Link>
              </p>
            </section>

            <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mb-12">
              <Image src={data.images.dalilaProcess.src} alt={data.images.dalilaProcess.alt} width={data.images.dalilaProcess.width} height={data.images.dalilaProcess.height} className="object-cover w-full h-full" loading="lazy" />
            </div>

            <section id={data.dalilaProcess.id} className="scroll-mt-28 mb-12 bg-[#0B1A33] p-8 md:p-10 text-white">
              <h2 className={`text-3xl md:text-4xl mb-6 ${marcellus.className}`}>{data.dalilaProcess.title}</h2>
              {data.dalilaProcess.steps.map((step) => (
                <div key={step.number} className="mb-6">
                  <h3 className={`text-xl md:text-2xl mb-2 ${marcellus.className}`}>{step.number}. {step.title}</h3>
                  <p className={`text-gray-200 leading-relaxed ${jost.className}`}>{step.text}</p>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link href={localizedPath(data.dalilaProcess.primaryCtaHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{data.dalilaProcess.primaryCtaText}</Link>
                <Link href={localizedPath(data.dalilaProcess.secondaryCtaHref, locale)} className={`inline-flex items-center justify-center border border-[#c89e3a] text-amber-200 hover:bg-white/10 font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{data.dalilaProcess.secondaryCtaText}</Link>
              </div>
            </section>

            <UncertifiedDiamondForm formId={data.form.idBottom} pageData={data} />

            <section id={data.faqs.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.faqs.id} title={data.faqs.title} />
              <div className="space-y-4">
                {data.faqs.items.map((faq) => (
                  <details key={faq.question} className="border border-gray-200 p-4 bg-white group">
                    <summary className={`cursor-pointer font-semibold text-[#1a1a1a] list-none flex justify-between items-start gap-4 ${marcellus.className}`}>
                      {faq.question}
                      <span className="text-[#c89e3a] group-open:rotate-45 transition-transform text-xl leading-none" aria-hidden="true">+</span>
                    </summary>
                    <p className={`mt-3 text-gray-700 text-base leading-relaxed ${jost.className}`}>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section id={data.finalCta.id} className="scroll-mt-28 mb-8 bg-[#FAF6EB] border border-[#e4c75f]/40 p-8 md:p-10">
              <h2 className={`text-3xl md:text-4xl text-[#1a1a1a] mb-6 ${marcellus.className}`}>{data.finalCta.title}</h2>
              <Paragraphs items={data.finalCta.paragraphs} />
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link href={localizedPath(data.finalCta.primaryButtonHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{data.finalCta.primaryButtonText}</Link>
                <Link href={localizedPath(data.finalCta.secondaryButtonHref, locale)} className={`inline-flex items-center justify-center border border-[#c89e3a] text-[#8a7028] hover:bg-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{data.finalCta.secondaryButtonText}</Link>
              </div>
              <p className={`text-sm text-gray-600 ${jost.className}`}>
                Related:{" "}
                <Link href={localizedPath(data.internalLinks.sellPage.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.sellPage.text}</Link>
                {" · "}
                <Link href={localizedPath(data.internalLinks.valuationCalculator.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.valuationCalculator.text}</Link>
                {" · "}
                <Link href={localizedPath(data.internalLinks.whereToSell.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.whereToSell.text}</Link>
              </p>
            </section>
          </article>
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-[#c89e3a]/30 bg-[#0B1A33] p-3">
        <Link href={localizedPath(`#${data.form.idTop}`, locale)} className={`block w-full text-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium py-3 text-sm tracking-[0.08em] uppercase ${jost.className}`}>
          {data.form.submitButton}
        </Link>
      </div>
    </main>
  );
}
