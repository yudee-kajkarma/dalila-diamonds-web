"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Upload, X } from "lucide-react";
import { Marcellus, Jost } from "next/font/google";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import { formApi } from "@/lib/api";
import { getHowToSellDiamondRingData, type HowToSellDiamondRingPageData } from "@/lib/i18n/getHowToSellDiamondRingData";
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

type EvalFormState = {
  ringType: string;
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

type ChecklistFormState = {
  firstName: string;
  email: string;
  country: string;
  consent: boolean;
};

const initialEvalForm: EvalFormState = {
  ringType: "",
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

const initialChecklistForm: ChecklistFormState = {
  firstName: "",
  email: "",
  country: "",
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
              <th key={header} scope="col" className="border border-gray-200 px-4 py-3 font-semibold text-gray-900">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="even:bg-gray-50/60">
              {row.map((cell, j) => (
                <td key={j} className="border border-gray-200 px-4 py-3 text-gray-700 align-top">{cell}</td>
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
      <h2 id={`${id}-heading`} className={`text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight ${marcellus.className}`}>{title}</h2>
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
        <p key={p.slice(0, 48)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{p}</p>
      ))}
    </>
  );
}

function fieldClass() {
  return `w-full border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c89e3a]/40 focus:border-[#c89e3a] ${jost.className}`;
}

function buildStructuredData(data: HowToSellDiamondRingPageData) {
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
        hasPart: { "@id": `${data.meta.canonical}#howto` },
        about: [
          { "@type": "Thing", name: "Selling a diamond ring" },
          { "@type": "Thing", name: "Diamond seller safety" },
          { "@type": "Thing", name: "Natural diamond valuation" },
        ],
      },
      {
        "@type": "HowTo",
        "@id": `${data.meta.canonical}#howto`,
        name: "How to Sell a Diamond Ring Safely",
        description: "Steps for preparing, valuing and safely selling a diamond ring.",
        step: data.howToSteps.map((s) => ({
          "@type": "HowToStep",
          position: s.position,
          name: s.name,
          text: s.text,
        })),
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

function SecureEvaluationForm({
  compact = false,
  pageData,
  locale,
}: {
  compact?: boolean;
  pageData: HowToSellDiamondRingPageData;
  locale: Locale;
}) {
  const data = pageData;
  const MAX_FILE_BYTES = data.form.maxFileSizeMb * 1024 * 1024;
  const [form, setForm] = useState<EvalFormState>(initialEvalForm);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [reportFiles, setReportFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const reportInputRef = useRef<HTMLInputElement>(null);

  const update = (name: keyof EvalFormState, value: string | boolean) => {
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
    if (!form.ringType) return setStatus({ type: "error", message: data.form.validation.ringTypeRequired });
    if (!form.reportStatus) return setStatus({ type: "error", message: data.form.validation.reportRequired });
    if (!form.fullName.trim()) return setStatus({ type: "error", message: data.form.validation.nameRequired });
    if (!form.email.trim() && !form.phone.trim()) return setStatus({ type: "error", message: data.form.validation.contactRequired });
    if (!form.country.trim()) return setStatus({ type: "error", message: data.form.validation.countryRequired });
    if (!form.consent) return setStatus({ type: "error", message: data.form.validation.consentRequired });

    setIsSubmitting(true);
    setStatus(null);
    try {
      const description = [
        "How to Sell Diamond Ring Safely — Evaluation Request",
        `Lead source: ${data.form.leadSource}`,
        `Ring type: ${form.ringType}`,
        `Report status: ${form.reportStatus}`,
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
      submitData.append("material", form.ringType);
      submitData.append("description", description);
      submitData.append("fullAddress", form.country);
      submitData.append("condition", form.reportStatus);
      [...photoFiles, ...reportFiles].forEach((file) => submitData.append("images", file));

      const response = await formApi.submitSellDiamond(submitData);
      if (response.success) {
        setStatus({ type: "success", message: data.form.successMessage });
        setForm(initialEvalForm);
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

  if (compact) {
    return (
      <div className="text-center">
        <Link href={`#${data.form.id}`} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>
          {data.form.submitButton}
        </Link>
      </div>
    );
  }

  return (
    <section id={data.form.id} className="scroll-mt-28 mb-12 border border-gray-200 bg-slate-50 p-5 md:p-8">
      <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-2 ${marcellus.className}`}>{data.form.title}</h3>
      <p className={`text-gray-600 mb-6 ${jost.className}`}>{data.form.subtitle}</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <p className="block text-sm font-medium text-gray-700 mb-2">{data.form.labels.ringType} *</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.form.ringTypes.map((option) => (
              <label key={option} className={`flex items-start gap-3 p-3 border cursor-pointer hover:bg-white text-sm ${form.ringType === option ? "border-[#c89e3a] bg-white" : "border-gray-200"}`}>
                <input type="radio" name="ringType" value={option} checked={form.ringType === option} onChange={(e) => update("ringType", e.target.value)} className="mt-0.5" />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="block text-sm font-medium text-gray-700 mb-2">{data.form.labels.reportStatus} *</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {data.form.reportOptions.map((option) => (
              <label key={option} className={`flex items-start gap-2 p-3 border cursor-pointer hover:bg-white text-sm ${form.reportStatus === option ? "border-[#c89e3a] bg-white" : "border-gray-200"}`}>
                <input type="radio" name="reportStatus" value={option} checked={form.reportStatus === option} onChange={(e) => update("reportStatus", e.target.value)} className="mt-0.5" />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.reportNumber} ({data.form.labels.optional})</label>
            <input type="text" value={form.reportNumber} onChange={(e) => update("reportNumber", e.target.value)} className={fieldClass()} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.caratWeight} ({data.form.labels.optional})</label>
            <input type="text" value={form.caratWeight} onChange={(e) => update("caratWeight", e.target.value)} className={fieldClass()} placeholder="e.g. 1.02" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.shape}</label>
            <select value={form.shape} onChange={(e) => update("shape", e.target.value)} className={fieldClass()}>
              <option value="">Select</option>
              {data.form.shapes.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FileUpload label={data.form.labels.uploadPhotos} files={photoFiles} setFiles={setPhotoFiles} inputRef={photoInputRef} />
          <FileUpload label={`${data.form.labels.uploadReport} (${data.form.labels.optional})`} files={reportFiles} setFiles={setReportFiles} inputRef={reportInputRef} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.fullName} *</label>
            <input type="text" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className={fieldClass()} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.email}</label>
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={fieldClass()} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.phone}</label>
            <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={fieldClass()} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.country} *</label>
            <input type="text" required value={form.country} onChange={(e) => update("country", e.target.value)} className={fieldClass()} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.contactMethod}</label>
            <select value={form.contactMethod} onChange={(e) => update("contactMethod", e.target.value)} className={fieldClass()}>
              <option value="">Select</option>
              {data.form.contactMethods.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.evaluationPreference}</label>
            <select value={form.evaluationPreference} onChange={(e) => update("evaluationPreference", e.target.value)} className={fieldClass()}>
              <option value="">Select</option>
              {data.form.evaluationPreferences.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.additionalInfo}</label>
          <textarea value={form.additionalInfo} onChange={(e) => update("additionalInfo", e.target.value)} rows={4} className={fieldClass()} />
        </div>

        <label className="flex items-start gap-3 text-sm text-gray-700">
          <input type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1" />
          <span>{data.form.consentText} <Link href={localizedPath(data.form.privacyHref, locale)} className="text-[#c89e3a] underline">{data.form.privacyLinkText}</Link>.</span>
        </label>

        {status && (
          <div className={`p-4 text-sm ${status.type === "success" ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}>{status.message}</div>
        )}

        <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium disabled:opacity-60 flex items-center gap-2">
          {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />{data.form.submittingButton}</> : data.form.submitButton}
        </button>
      </form>
    </section>
  );
}

function ChecklistEmailForm({ pageData }: { pageData: HowToSellDiamondRingPageData }) {
  const data = pageData;
  const [form, setForm] = useState<ChecklistFormState>(initialChecklistForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim()) return setStatus({ type: "error", message: data.checklistForm.validation.firstNameRequired });
    if (!form.email.trim()) return setStatus({ type: "error", message: data.checklistForm.validation.emailRequired });
    if (!form.country.trim()) return setStatus({ type: "error", message: data.checklistForm.validation.countryRequired });
    if (!form.consent) return setStatus({ type: "error", message: data.checklistForm.validation.consentRequired });

    setIsSubmitting(true);
    setStatus(null);
    try {
      const submitData = new FormData();
      submitData.append("fullName", form.firstName);
      submitData.append("email", form.email);
      submitData.append("phone", "Not provided");
      submitData.append("material", "Checklist download");
      submitData.append("description", [`Diamond Seller Safety Checklist Request`, `Lead source: ${data.checklistForm.leadSource}`, `Country: ${form.country}`].join("\n"));
      submitData.append("fullAddress", form.country);

      const response = await formApi.submitSellDiamond(submitData);
      if (response.success) {
        setStatus({ type: "success", message: data.checklistForm.successMessage });
        setForm(initialChecklistForm);
      } else {
        setStatus({ type: "error", message: response.message || data.checklistForm.errorMessage });
      }
    } catch {
      setStatus({ type: "error", message: data.checklistForm.errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-gray-200 p-5 md:p-6">
      <h4 className={`text-xl text-[#1a1a1a] mb-1 ${marcellus.className}`}>{data.checklistForm.title}</h4>
      <p className={`text-sm text-gray-600 mb-4 ${jost.className}`}>{data.checklistForm.subtitle}</p>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{data.checklistForm.labels.firstName} *</label>
        <input type="text" required value={form.firstName} onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))} className={fieldClass()} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{data.checklistForm.labels.email} *</label>
        <input type="email" required value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className={fieldClass()} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{data.checklistForm.labels.country} *</label>
        <input type="text" required value={form.country} onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))} className={fieldClass()} />
      </div>
      <label className="flex items-start gap-3 text-sm text-gray-700">
        <input type="checkbox" checked={form.consent} onChange={(e) => setForm((p) => ({ ...p, consent: e.target.checked }))} className="mt-1" />
        <span>{data.checklistForm.consentText}</span>
      </label>
      {status && <div className={`p-3 text-sm ${status.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>{status.message}</div>}
      <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium disabled:opacity-60 flex items-center justify-center gap-2">
        {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />{data.checklistForm.submittingButton}</> : data.checklistForm.submitButton}
      </button>
    </form>
  );
}

function renderStep(step: HowToSellDiamondRingPageData["steps"][number], data: HowToSellDiamondRingPageData, locale: Locale) {
  return (
    <section key={step.id} id={step.id} className="scroll-mt-28 mb-12">
      <h2 className={`text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4 ${marcellus.className}`}>
        Step {step.number}: {step.title.replace(/^Step \d+: /, "")}
      </h2>
      {"paragraphs" in step && step.paragraphs ? <Paragraphs items={step.paragraphs} /> : null}
      {"documentsIntro" in step && step.documentsIntro ? <p className={`text-gray-700 mb-3 ${jost.className}`}>{step.documentsIntro}</p> : null}
      {"gatherIntro" in step && step.gatherIntro ? <p className={`text-gray-700 mb-3 ${jost.className}`}>{step.gatherIntro}</p> : null}
      {"photoIntro" in step && step.photoIntro ? <p className={`text-gray-700 mb-3 ${jost.className}`}>{step.photoIntro}</p> : null}
      {"compareIntro" in step && step.compareIntro ? <p className={`text-gray-700 mb-3 ${jost.className}`}>{step.compareIntro}</p> : null}
      {"submissionIntro" in step && step.submissionIntro ? <p className={`text-gray-700 mb-3 ${jost.className}`}>{step.submissionIntro}</p> : null}
      {"appointmentIntro" in step && step.appointmentIntro ? <p className={`text-gray-700 mb-3 ${jost.className}`}>{step.appointmentIntro}</p> : null}
      {"termsIntro" in step && step.termsIntro ? <p className={`text-gray-700 mb-3 ${jost.className}`}>{step.termsIntro}</p> : null}
      {"offerIntro" in step && step.offerIntro ? <p className={`text-gray-700 mb-3 ${jost.className}`}>{step.offerIntro}</p> : null}
      {"confirmIntro" in step && step.confirmIntro ? <p className={`text-gray-700 mb-3 ${jost.className}`}>{step.confirmIntro}</p> : null}
      {"questionsIntro" in step && step.questionsIntro ? <p className={`text-gray-700 mb-3 ${jost.className}`}>{step.questionsIntro}</p> : null}
      {"bullets" in step && step.bullets ? <BulletList items={step.bullets} /> : null}
      {"questions" in step && step.questions ? <BulletList items={step.questions} /> : null}
      {"table" in step && step.table ? <DataTable table={step.table} /> : null}
      {"afterTable" in step && step.afterTable ? (
        <>
          <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{step.afterTable[0]}</p>
          <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
            {step.afterTable[1]}{" "}
            <a href={data.urls.giaSellingJewellery} target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] hover:underline font-medium">{step.giaLinkText}</a>.
          </p>
          <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{step.afterTable[2]}</p>
          {"ctaHref" in step && step.ctaHref ? (
            <Link href={localizedPath(step.ctaHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase mb-4 ${jost.className}`}>{step.ctaText}</Link>
          ) : null}
        </>
      ) : null}
      {"linkText" in step && step.linkText && step.number === 6 ? (
        <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
          For a complete channel comparison, read{" "}
          <Link href={localizedPath(step.linkHref!, locale)} className="text-[#c89e3a] hover:underline font-medium">{step.linkText}</Link>.
        </p>
      ) : null}
      {"giaLinkText" in step && step.number === 4 ? (
        <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
          <a href={data.urls.giaReportCheck} target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] hover:underline font-medium">{step.giaLinkText}</a>.
        </p>
      ) : null}
      {"closing" in step && step.closing ? <Paragraphs items={Array.isArray(step.closing) ? step.closing : [step.closing]} /> : null}
      {"cautionTitle" in step && step.cautionTitle ? (
        <>
          <h3 className={`text-xl md:text-2xl text-[#1a1a1a] mb-4 mt-6 ${marcellus.className}`}>{step.cautionTitle}</h3>
          <Paragraphs items={step.cautionParagraphs!} />
        </>
      ) : null}
      {"ctaText" in step && step.number === 8 ? (
        <Link href={localizedPath(step.ctaHref!, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{step.ctaText}</Link>
      ) : null}
    </section>
  );
}

export default function HowToSellDiamondRing({ locale = "en" }: { locale?: Locale }) {
  const data = getHowToSellDiamondRingData(locale);

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

      <section className="bg-white py-10 md:py-14" aria-labelledby="htsr-hero-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 id="htsr-hero-heading" className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] mb-6 tracking-tight ${marcellus.className}`}>{data.hero.title}</h1>
          <div className="relative w-full aspect-video mb-8 overflow-hidden bg-black shadow-xl">
            <Image src={data.images.featured.src} alt={data.images.featured.alt} width={data.images.featured.width} height={data.images.featured.height} className="object-cover w-full h-full" priority />
          </div>
          <Paragraphs items={data.hero.paragraphs} />
          <Link href={localizedPath(data.hero.primaryButtonHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{data.hero.primaryButtonText}</Link>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          <ResourceSidebar currentPage="how-to-sell-diamond-ring" />

          <article className="lg:col-span-3">
            <nav aria-label="Guide overview" className={`mb-10 p-5 md:p-6 bg-[#FAF6EB] border border-[#e4c75f]/30 ${jost.className}`}>
              <p className="font-semibold text-[#1a1a1a] mb-3">{data.overviewNav.title}</p>
              <ul className="space-y-2 text-sm md:text-base columns-1 md:columns-2">
                {data.overviewNav.items.map((item) => (
                  <li key={item.id}><a href={`#${item.id}`} className="text-[#8a7028] hover:text-[#c89e3a] underline-offset-2 hover:underline">{item.label}</a></li>
                ))}
              </ul>
            </nav>

            <section id={data.quickAnswer.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.quickAnswer.id} title={data.quickAnswer.title} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{data.quickAnswer.intro}</p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 font-medium ${jost.className}`}>{data.quickAnswer.beforeAcceptingIntro}</p>
              <BulletList items={data.quickAnswer.bullets} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.quickAnswer.closing}</p>
            </section>

            <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mb-12">
              <Image src={data.images.safetySteps.src} alt={data.images.safetySteps.alt} width={data.images.safetySteps.width} height={data.images.safetySteps.height} className="object-cover w-full h-full" loading="lazy" />
            </div>

            {data.steps.slice(0, 8).map((step) => renderStep(step, data, locale))}

            <SecureEvaluationForm pageData={data} locale={locale} />

            {data.steps.slice(8, 9).map((step) => (
              <div key={step.id}>
                {renderStep(step, data, locale)}
              </div>
            ))}

            <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mb-12">
              <Image src={data.images.transport.src} alt={data.images.transport.alt} width={data.images.transport.width} height={data.images.transport.height} className="object-cover w-full h-full" loading="lazy" />
            </div>

            {data.steps.slice(9, 11).map((step) => renderStep(step, data, locale))}

            <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mb-12">
              <Image src={data.images.payment.src} alt={data.images.payment.alt} width={data.images.payment.width} height={data.images.payment.height} className="object-cover w-full h-full" loading="lazy" />
            </div>

            {data.steps.slice(11).map((step) => renderStep(step, data, locale))}

            <section id={data.safetyChecklist.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.safetyChecklist.id} title={data.safetyChecklist.title} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.safetyChecklist.intro}</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  {data.safetyChecklist.sections.map((section) => (
                    <div key={section.title} className="mb-6">
                      <h3 className={`text-lg font-semibold text-[#1a1a1a] mb-3 ${marcellus.className}`}>{section.title}</h3>
                      <ul className={`space-y-2 ${jost.className}`}>
                        {section.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-gray-700 text-sm md:text-base">
                            <span className="text-[#c89e3a] shrink-0">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="relative w-full aspect-square max-w-sm mx-auto mb-6 overflow-hidden bg-black shadow-lg">
                    <Image src={data.images.checklistCover.src} alt={data.images.checklistCover.alt} width={data.images.checklistCover.width} height={data.images.checklistCover.height} className="object-cover w-full h-full" loading="lazy" />
                  </div>
                  <ChecklistEmailForm pageData={data} />
                </div>
              </div>
            </section>

            <section id={data.commonScams.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.commonScams.id} title={data.commonScams.title} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.commonScams.intro}</p>
              {data.commonScams.items.map((item) => (
                <div key={item.title} className="mb-6">
                  <h3 className={`text-lg font-semibold text-[#1a1a1a] mb-2 ${marcellus.className}`}>{item.title}</h3>
                  <p className={`text-gray-700 text-base leading-relaxed ${jost.className}`}>{item.text}</p>
                </div>
              ))}
            </section>

            <section id={data.cleanOrRepair.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.cleanOrRepair.id} title={data.cleanOrRepair.title} />
              <Paragraphs items={data.cleanOrRepair.paragraphs} />
            </section>

            <section id={data.withoutCertificate.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.withoutCertificate.id} title={data.withoutCertificate.title} />
              <Paragraphs items={data.withoutCertificate.paragraphs} />
              <p className={`text-gray-700 mb-3 ${jost.className}`}>{data.withoutCertificate.confirmIntro}</p>
              <BulletList items={data.withoutCertificate.bullets} />
              <Paragraphs items={[data.withoutCertificate.closing]} />
              <Link href={localizedPath(data.withoutCertificate.ctaHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{data.withoutCertificate.ctaText}</Link>
            </section>

            <section id={data.inheritedRing.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.inheritedRing.id} title={data.inheritedRing.title} />
              <Paragraphs items={data.inheritedRing.paragraphs} />
            </section>

            <section id={data.dalilaProcess.id} className="scroll-mt-28 mb-12 bg-[#0B1A33] p-8 md:p-10 text-white">
              <h2 className={`text-3xl md:text-4xl mb-6 ${marcellus.className}`}>{data.dalilaProcess.title}</h2>
              <Paragraphs items={data.dalilaProcess.paragraphs} />
              <h3 className={`text-xl mb-4 ${marcellus.className}`}>{data.dalilaProcess.stepsTitle}</h3>
              <ol className={`space-y-2 mb-6 list-decimal list-inside ${jost.className}`}>
                {data.dalilaProcess.steps.map((s) => <li key={s} className="text-white/85">{s}</li>)}
              </ol>
              <p className={`text-white/85 mb-6 ${jost.className}`}>{data.dalilaProcess.closing}</p>
              <Link href={localizedPath(data.dalilaProcess.ctaHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{data.dalilaProcess.ctaText}</Link>
            </section>

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
              <p className={`text-sm text-gray-600 mb-6 ${jost.className}`}>
                Related:{" "}
                <Link href={localizedPath(data.internalLinks.sellPage.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.sellPage.text}</Link>
                {" · "}
                <Link href={localizedPath(data.internalLinks.valuationCalculator.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.valuationCalculator.text}</Link>
                {" · "}
                <Link href={localizedPath(data.internalLinks.whereToSell.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.whereToSell.text}</Link>
              </p>
              <SecureEvaluationForm compact pageData={data} locale={locale} />
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
