"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Upload, X } from "lucide-react";
import { Marcellus, Jost } from "next/font/google";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import { formApi } from "@/lib/api";
import { getDiamondAppraisalAntwerpData, type DiamondAppraisalAntwerpPageData } from "@/lib/i18n/getDiamondAppraisalAntwerpData";
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
  purpose: string;
  itemType: string;
  origin: string;
  reportStatus: string;
  reportNumber: string;
  caratWeight: string;
  shape: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  contactMethod: string;
  evaluationPreference: string;
  additionalInfo: string;
  consent: boolean;
};

const initialForm: FormState = {
  purpose: "",
  itemType: "",
  origin: "",
  reportStatus: "",
  reportNumber: "",
  caratWeight: "",
  shape: "",
  fullName: "",
  email: "",
  phone: "",
  country: "",
  contactMethod: "",
  evaluationPreference: "",
  additionalInfo: "",
  consent: false,
};

function getPurposeMode(purpose: string, pageData: DiamondAppraisalAntwerpPageData): "sell" | "inquiry" | null {
  const option = pageData.form.purposeOptions.find((o) => o.value === purpose);
  return option ? (option.mode as "sell" | "inquiry") : null;
}

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

function buildStructuredData(data: DiamondAppraisalAntwerpPageData) {
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
          { "@type": "Thing", name: "Diamond appraisal" },
          { "@type": "Thing", name: "Diamond valuation" },
          { "@type": "Place", name: "Antwerp" },
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

function DiamondEvaluationForm({
  presetPurpose = "",
  pageData,
  locale,
}: {
  presetPurpose?: string;
  pageData: DiamondAppraisalAntwerpPageData;
  locale: Locale;
}) {
  const data = pageData;
  const MAX_FILE_BYTES = data.form.maxFileSizeMb * 1024 * 1024;
  const [form, setForm] = useState<FormState>(initialForm);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [reportFiles, setReportFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const reportInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (presetPurpose) {
      setForm((prev) => ({ ...prev, purpose: presetPurpose }));
    }
  }, [presetPurpose]);

  const purposeMode = getPurposeMode(form.purpose, pageData);
  const isSell = purposeMode === "sell";
  const isInquiry = purposeMode === "inquiry";

  const update = (name: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addFiles = (incoming: File[], setter: React.Dispatch<React.SetStateAction<File[]>>) => {
    const valid = incoming.filter((f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_FILE_BYTES);
    if (valid.length !== incoming.length) {
      alert(`Please upload ${data.form.acceptedFormats} files up to ${data.form.maxFileSizeMb}MB each.`);
    }
    if (valid.length) setter((prev) => [...prev, ...valid]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.purpose) return setStatus({ type: "error", message: data.form.validation.purposeRequired });
    if (isSell && !form.itemType) return setStatus({ type: "error", message: data.form.validation.itemTypeRequired });
    if (!form.fullName.trim()) return setStatus({ type: "error", message: data.form.validation.nameRequired });
    if (!form.email.trim() && !form.phone.trim()) return setStatus({ type: "error", message: data.form.validation.contactRequired });
    if (!form.country.trim()) return setStatus({ type: "error", message: data.form.validation.countryRequired });
    if (!form.consent) return setStatus({ type: "error", message: data.form.validation.consentRequired });

    setIsSubmitting(true);
    setStatus(null);
    try {
      const description = [
        "Diamond Appraisal Antwerp — Evaluation Request",
        `Lead source: ${data.form.leadSource}`,
        `Purpose: ${form.purpose}`,
        `Item type: ${form.itemType || "N/A"}`,
        `Origin: ${form.origin || "N/A"}`,
        `Grading laboratory: ${form.reportStatus || "N/A"}`,
        `Report number: ${form.reportNumber || "N/A"}`,
        `Carat weight: ${form.caratWeight || "N/A"}`,
        `Shape: ${form.shape || "N/A"}`,
        `Contact method: ${form.contactMethod || "N/A"}`,
        `Evaluation preference: ${form.evaluationPreference || "N/A"}`,
        `Additional info: ${form.additionalInfo || "N/A"}`,
      ].join("\n");

      const submitData = new FormData();
      submitData.append("fullName", form.fullName);
      submitData.append("email", form.email || "not-provided@dalila.local");
      submitData.append("phone", form.phone || "Not provided");
      submitData.append("carat", form.caratWeight);
      submitData.append("material", form.itemType || form.purpose);
      submitData.append("description", description);
      submitData.append("fullAddress", form.country);
      submitData.append("condition", form.reportStatus || form.purpose);
      [...photoFiles, ...reportFiles].forEach((file) => submitData.append("images", file));

      const response = await formApi.submitSellDiamond(submitData);
      if (response.success) {
        setStatus({ type: "success", message: data.form.successMessage });
        setForm({ ...initialForm, purpose: form.purpose });
        setPhotoFiles([]);
        setReportFiles([]);
      } else {
        setStatus({ type: "error", message: response.message || data.form.errorMessage });
      }
    } catch {
      setStatus({ type: "error", message: data.form.errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileUpload = ({
    label,
    files,
    setFiles,
    inputRef,
  }: {
    label: string;
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    inputRef: React.RefObject<HTMLInputElement | null>;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="border-2 border-dashed border-gray-300 p-5 text-center bg-white">
        <Upload className="w-6 h-6 mx-auto mb-2 text-[#c89e3a]" />
        <p className="text-sm text-gray-600 mb-2">{data.form.labels.dragDrop}</p>
        <button type="button" onClick={() => inputRef.current?.click()} className="border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">Choose files</button>
        <input ref={inputRef} type="file" multiple accept=".jpg,.jpeg,.png,.webp,.pdf" className="hidden" onChange={(e) => addFiles(Array.from(e.target.files ?? []), setFiles)} />
      </div>
      {files.length > 0 && (
        <ul className="mt-2 space-y-1">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="flex items-center justify-between border border-gray-200 px-3 py-1.5 bg-white text-sm">
              <span className="truncate">{file.name}</span>
              <button type="button" onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))} aria-label="Remove"><X className="w-4 h-4 text-red-500" /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <section id={data.form.id} className="scroll-mt-28 mb-12 border border-gray-200 bg-slate-50 p-5 md:p-8">
      <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-2 ${marcellus.className}`}>{data.form.title}</h3>
      <p className={`text-gray-600 mb-6 ${jost.className}`}>{data.form.subtitle}</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <p className="block text-sm font-medium text-gray-700 mb-2">{data.form.step1Title} *</p>
          <div className="grid grid-cols-1 gap-2">
            {data.form.purposeOptions.map((option) => (
              <label key={option.value} className={`flex items-start gap-3 p-3 border cursor-pointer hover:bg-white text-sm ${form.purpose === option.value ? "border-[#c89e3a] bg-white" : "border-gray-200"}`}>
                <input type="radio" name="purpose" value={option.value} checked={form.purpose === option.value} onChange={(e) => update("purpose", e.target.value)} className="mt-0.5" />
                <span>{option.value}</span>
              </label>
            ))}
          </div>
        </div>

        {isInquiry ? (
          <div className="bg-amber-50 border border-amber-200 p-4 text-sm text-gray-800 space-y-2">
            <p>{data.form.inquiryNotice}</p>
            <p>
              {data.form.sellRedirectCalculator}{" "}
              <Link href={localizedPath(data.internalLinks.valuationCalculator.href, locale)} className="text-[#c89e3a] hover:underline font-medium">{data.internalLinks.valuationCalculator.text}</Link>.
            </p>
            <p>
              {data.form.sellRedirectGrading}{" "}
              <Link href={localizedPath(data.internalLinks.gradingReport.href, locale)} className="text-[#c89e3a] hover:underline font-medium">{data.internalLinks.gradingReport.text}</Link>.
            </p>
          </div>
        ) : null}

        {isSell ? (
          <>
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-2">{data.form.labels.itemType} *</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.form.itemTypes.map((option) => (
                  <label key={option} className={`flex items-start gap-3 p-3 border cursor-pointer hover:bg-white text-sm ${form.itemType === option ? "border-[#c89e3a] bg-white" : "border-gray-200"}`}>
                    <input type="radio" name="itemType" value={option} checked={form.itemType === option} onChange={(e) => update("itemType", e.target.value)} className="mt-0.5" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.origin}</label>
              <select value={form.origin} onChange={(e) => update("origin", e.target.value)} className={fieldClass()}>
                <option value="">Select…</option>
                {data.form.originOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.reportStatus}</label>
                <select value={form.reportStatus} onChange={(e) => update("reportStatus", e.target.value)} className={fieldClass()}>
                  <option value="">Select…</option>
                  {data.form.reportOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.reportNumber}</label>
                <input type="text" value={form.reportNumber} onChange={(e) => update("reportNumber", e.target.value)} className={fieldClass()} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.caratWeight}</label>
                <input type="text" value={form.caratWeight} onChange={(e) => update("caratWeight", e.target.value)} className={fieldClass()} placeholder="e.g. 1.02" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.shape}</label>
                <select value={form.shape} onChange={(e) => update("shape", e.target.value)} className={fieldClass()}>
                  <option value="">Select…</option>
                  {data.form.shapeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUpload label={data.form.labels.uploadReport} files={reportFiles} setFiles={setReportFiles} inputRef={reportInputRef} />
              <FileUpload label={data.form.labels.uploadPhotos} files={photoFiles} setFiles={setPhotoFiles} inputRef={photoInputRef} />
            </div>
          </>
        ) : null}

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

        {isSell ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.contactMethod}</label>
              <select value={form.contactMethod} onChange={(e) => update("contactMethod", e.target.value)} className={fieldClass()}>
                <option value="">Select…</option>
                {data.form.contactMethods.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.evaluationPreference}</label>
              <select value={form.evaluationPreference} onChange={(e) => update("evaluationPreference", e.target.value)} className={fieldClass()}>
                <option value="">Select…</option>
                {data.form.evaluationPreferences.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
        ) : null}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.additionalInfo} ({data.form.labels.optional})</label>
          <textarea rows={4} value={form.additionalInfo} onChange={(e) => update("additionalInfo", e.target.value)} className={fieldClass()} />
        </div>

        <label className="flex items-start gap-3 text-sm text-gray-700">
          <input type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1" />
          <span>{data.form.consentText}</span>
        </label>

        {status ? (
          <div className={`p-3 text-sm ${status.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>{status.message}</div>
        ) : null}

        <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto px-8 py-3.5 bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium disabled:opacity-60 flex items-center justify-center gap-2 text-[13px] tracking-[0.08em] uppercase">
          {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />{data.form.submittingButton}</> : data.form.submitButton}
        </button>
      </form>
    </section>
  );
}

function PurposeSelector({
  onSelectPurpose,
  pageData,
  locale,
}: {
  onSelectPurpose: (purpose: string) => void;
  pageData: DiamondAppraisalAntwerpPageData;
  locale: Locale;
}) {
  const data = pageData;
  const scrollToForm = (formPurpose?: string) => {
    if (formPurpose) onSelectPurpose(formPurpose);
    document.getElementById(data.form.id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id={data.purposeSelector.id} className="scroll-mt-28 mb-12">
      <SectionHeading id={data.purposeSelector.id} title={data.purposeSelector.title} />
      <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.purposeSelector.intro}</p>

      <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mb-8">
        <Image src={data.images.purposeTypes.src} alt={data.images.purposeTypes.alt} width={data.images.purposeTypes.width} height={data.images.purposeTypes.height} className="object-cover w-full h-full" loading="lazy" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.purposeSelector.options.map((option) => (
          <div key={option.id} className="border border-gray-200 p-5 md:p-6 bg-white hover:border-[#c89e3a]/50 transition-colors">
            <h3 className={`text-xl text-[#1a1a1a] mb-3 ${marcellus.className}`}>{option.title}</h3>
            <p className={`text-gray-700 text-sm md:text-base leading-relaxed mb-4 ${jost.className}`}>{option.description}</p>
            {option.ctaHref.startsWith("#") || option.formPurpose ? (
              <button
                type="button"
                onClick={() => {
                  if (option.formPurpose) scrollToForm(option.formPurpose);
                  else document.querySelector(option.ctaHref)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-6 py-2.5 text-[12px] tracking-[0.08em] uppercase ${jost.className}`}
              >
                {option.ctaText}
              </button>
            ) : (
              <Link href={localizedPath(option.ctaHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-6 py-2.5 text-[12px] tracking-[0.08em] uppercase ${jost.className}`}>
                {option.ctaText}
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function DiamondAppraisalAntwerp({ locale = "en" }: { locale?: Locale }) {
  const data = getDiamondAppraisalAntwerpData(locale);
  const [formPurpose, setFormPurpose] = useState("");

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

      <section className="bg-white py-10 md:py-14" aria-labelledby="daa-hero-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 id="daa-hero-heading" className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] mb-6 tracking-tight ${marcellus.className}`}>{data.hero.title}</h1>
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
          <ResourceSidebar currentPage="diamond-appraisal-antwerp-belgium" />

          <article className="lg:col-span-3">
            <nav aria-label="Guide overview" className={`mb-10 p-5 md:p-6 bg-[#FAF6EB] border border-[#e4c75f]/30 ${jost.className}`}>
              <p className="font-semibold text-[#1a1a1a] mb-3">{data.overviewNav.title}</p>
              <ul className="space-y-2 text-sm md:text-base">
                {data.overviewNav.items.map((item) => (
                  <li key={item.id}><a href={`#${item.id}`} className="text-[#8a7028] hover:text-[#c89e3a] underline-offset-2 hover:underline">{item.label}</a></li>
                ))}
              </ul>
            </nav>

            <PurposeSelector onSelectPurpose={setFormPurpose} pageData={data} locale={locale} />

            <section id={data.quickAnswer.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.quickAnswer.id} title={data.quickAnswer.title} />
              <Paragraphs items={data.quickAnswer.paragraphs} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.quickAnswer.considerationsIntro}</p>
              <BulletList items={data.quickAnswer.considerations} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.quickAnswer.closing}</p>
            </section>

            <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mb-8">
              <Image src={data.images.comparison.src} alt={data.images.comparison.alt} width={data.images.comparison.width} height={data.images.comparison.height} className="object-cover w-full h-full" loading="lazy" />
            </div>

            <section id={data.appraisalVsGrading.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.appraisalVsGrading.id} title={data.appraisalVsGrading.title} />
              <Paragraphs items={data.appraisalVsGrading.intro} />
              <DataTable table={data.appraisalVsGrading.table} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                GIA explains that a grading report provides an objective assessment of diamond quality, while an appraisal estimates monetary worth using the quality information and current market conditions. Read{" "}
                <a href={data.urls.giaReportsAppraisals} target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] hover:underline font-medium">{data.appraisalVsGrading.giaLinkText}</a>.
              </p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.appraisalVsGrading.closing}</p>
            </section>

            <section id={data.giaAppraisals.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.giaAppraisals.id} title={data.giaAppraisals.title} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{data.giaAppraisals.paragraphs[0]}</p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                {data.giaAppraisals.paragraphs[1]}{" "}
                <a href={data.urls.giaAppraisalAssociations} target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] hover:underline font-medium">{data.giaAppraisals.giaAssociationsLinkText}</a>.
              </p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{data.giaAppraisals.educationParagraph}</p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.giaAppraisals.giaAppraisalIntro}</p>
              <BulletList items={data.giaAppraisals.giaAppraisalBullets} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.giaAppraisals.closing}</p>
            </section>

            <section id={data.hrdAntwerp.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.hrdAntwerp.id} title={data.hrdAntwerp.title} />
              <Paragraphs items={data.hrdAntwerp.paragraphs} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                <a href={data.urls.hrdAntwerp} target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] hover:underline font-medium">{data.hrdAntwerp.hrdLinkText}</a>.
              </p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.hrdAntwerp.closing}</p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-start">
              <section id={data.appraisalCost.id} className="scroll-mt-28">
                <SectionHeading id={data.appraisalCost.id} title={data.appraisalCost.title} />
                <Paragraphs items={data.appraisalCost.paragraphs} />
                <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.appraisalCost.feeIntro}</p>
                <BulletList items={data.appraisalCost.feeQuestions} />
                <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.appraisalCost.feeClosing}</p>
                <h3 className={`text-xl md:text-2xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>{data.appraisalCost.separateCostsTitle}</h3>
                <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.appraisalCost.separateCostsIntro}</p>
                <BulletList items={data.appraisalCost.separateCosts} />
                <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.appraisalCost.closing}</p>
              </section>
              <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg lg:sticky lg:top-28">
                <Image src={data.images.costFactors.src} alt={data.images.costFactors.alt} width={data.images.costFactors.width} height={data.images.costFactors.height} className="object-cover w-full h-full" loading="lazy" />
              </div>
            </div>

            <section id={data.freeAppraisal.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.freeAppraisal.id} title={data.freeAppraisal.title} />
              <Paragraphs items={data.freeAppraisal.paragraphs} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.freeAppraisal.questionsIntro}</p>
              <BulletList items={data.freeAppraisal.questions} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.freeAppraisal.closing}</p>
            </section>

            <section id={data.appraisalTypes.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.appraisalTypes.id} title={data.appraisalTypes.title} />
              {data.appraisalTypes.types.map((type) => (
                <div key={type.title} className="mb-8 pb-8 border-b border-gray-100 last:border-0">
                  <h3 className={`text-xl md:text-2xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>{type.title}</h3>
                  <Paragraphs items={type.paragraphs} />
                  {"includesIntro" in type && type.includesIntro ? (
                    <>
                      <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{type.includesIntro}</p>
                      <BulletList items={type.includes!} />
                    </>
                  ) : null}
                  {"ctaText" in type && type.ctaText ? (
                    <Link href={localizedPath(type.ctaHref!, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{type.ctaText}</Link>
                  ) : null}
                </div>
              ))}
            </section>

            <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mb-8">
              <Image src={data.images.process.src} alt={data.images.process.alt} width={data.images.process.width} height={data.images.process.height} className="object-cover w-full h-full" loading="lazy" />
            </div>

            <section id={data.appraisalProcess.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.appraisalProcess.id} title={data.appraisalProcess.title} />
              <Paragraphs items={data.appraisalProcess.intro} />
              {data.appraisalProcess.steps.map((step) => (
                <div key={step.number} className="mb-8">
                  <h3 className={`text-xl md:text-2xl text-[#1a1a1a] mb-3 ${marcellus.className}`}>{step.number}. {step.title}</h3>
                  <Paragraphs items={step.paragraphs} />
                  {"bulletsIntro" in step && step.bulletsIntro ? (
                    <>
                      <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{step.bulletsIntro}</p>
                      <BulletList items={step.bullets!} />
                    </>
                  ) : null}
                  {"closing" in step && step.closing ? (
                    <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{step.closing}</p>
                  ) : null}
                </div>
              ))}
            </section>

            <section id={data.mountedDiamond.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.mountedDiamond.id} title={data.mountedDiamond.title} />
              <Paragraphs items={data.mountedDiamond.paragraphs} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.mountedDiamond.questionsIntro}</p>
              <BulletList items={data.mountedDiamond.questions} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                {data.mountedDiamond.closing}{" "}
                <a href={data.urls.giaJewelleryAnalysis} target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] hover:underline font-medium">{data.mountedDiamond.giaLinkText}</a>.
              </p>
            </section>

            <section id={data.writtenAppraisal.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.writtenAppraisal.id} title={data.writtenAppraisal.title} />
              <Paragraphs items={data.writtenAppraisal.intro} />
              <BulletList items={data.writtenAppraisal.includes} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.writtenAppraisal.closing}</p>
            </section>

            <section id={data.chooseAppraiser.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.chooseAppraiser.id} title={data.chooseAppraiser.title} />
              <Paragraphs items={data.chooseAppraiser.paragraphs.slice(0, 1)} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                {data.chooseAppraiser.paragraphs[1]}{" "}
                <a href={data.urls.giaAppraisalSelection} target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] hover:underline font-medium">{data.chooseAppraiser.giaLinkText}</a>.
              </p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.chooseAppraiser.questionsIntro}</p>
              <BulletList items={data.chooseAppraiser.questions} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.chooseAppraiser.closing}</p>
            </section>

            <section id={data.whatToBring.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.whatToBring.id} title={data.whatToBring.title} />
              <Paragraphs items={data.whatToBring.paragraphs} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.whatToBring.itemsIntro}</p>
              <BulletList items={data.whatToBring.items} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.whatToBring.closing}</p>
            </section>

            <section id={data.howLong.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.howLong.id} title={data.howLong.title} />
              <Paragraphs items={data.howLong.paragraphs} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.howLong.additionalIntro}</p>
              <BulletList items={data.howLong.additional} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.howLong.closing}</p>
            </section>

            <section id={data.onlineAppraisal.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.onlineAppraisal.id} title={data.onlineAppraisal.title} />
              <Paragraphs items={data.onlineAppraisal.paragraphs.slice(0, 1)} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.onlineAppraisal.paragraphs[1]}</p>
              <BulletList items={data.onlineAppraisal.limitations} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{data.onlineAppraisal.closing}</p>
              <Link href={localizedPath(data.onlineAppraisal.ctaHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{data.onlineAppraisal.ctaText}</Link>
            </section>

            <section id={data.beforeSelling.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.beforeSelling.id} title={data.beforeSelling.title} />
              <Paragraphs items={data.beforeSelling.paragraphs} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.beforeSelling.usefulIntro}</p>
              <BulletList items={data.beforeSelling.usefulWhen} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.beforeSelling.closing}</p>
              <p className={`text-sm text-gray-600 mt-4 ${jost.className}`}>
                Related:{" "}
                <Link href={localizedPath(data.internalLinks.howToSell.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.howToSell.text}</Link>
                {" · "}
                <Link href={localizedPath(data.internalLinks.whereToSell.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.whereToSell.text}</Link>
              </p>
            </section>

            <section id={data.dalilaEvaluation.id} className="scroll-mt-28 mb-12 bg-[#0B1A33] p-8 md:p-10 text-white">
              <h2 className={`text-3xl md:text-4xl mb-6 ${marcellus.className}`}>{data.dalilaEvaluation.title}</h2>
              <Paragraphs items={data.dalilaEvaluation.paragraphs} />
              <h3 className={`text-xl md:text-2xl mb-4 mt-6 ${marcellus.className}`}>{data.dalilaEvaluation.processTitle}</h3>
              <ol className={`space-y-2 mb-6 list-decimal list-inside text-gray-200 ${jost.className}`}>
                {data.dalilaEvaluation.processSteps.map((step) => (
                  <li key={step} className="leading-relaxed">{step}</li>
                ))}
              </ol>
              <p className={`text-gray-200 mb-6 ${jost.className}`}>{data.dalilaEvaluation.closing}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={localizedPath(data.dalilaEvaluation.primaryCtaHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{data.dalilaEvaluation.primaryCtaText}</Link>
                <Link href={localizedPath(data.dalilaEvaluation.secondaryCtaHref, locale)} className={`inline-flex items-center justify-center border border-[#c89e3a] text-amber-200 hover:bg-white/10 font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{data.dalilaEvaluation.secondaryCtaText}</Link>
              </div>
            </section>

            <DiamondEvaluationForm presetPurpose={formPurpose} pageData={data} locale={locale} />

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
                <Link href={localizedPath(data.internalLinks.gradingReport.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.gradingReport.text}</Link>
              </p>
            </section>
          </article>
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-[#c89e3a]/30 bg-[#0B1A33] p-3">
        <Link href={`#${data.form.id}`} className={`block w-full text-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium py-3 text-sm tracking-[0.08em] uppercase ${jost.className}`}>
          {data.form.submitButton}
        </Link>
      </div>
    </main>
  );
}
