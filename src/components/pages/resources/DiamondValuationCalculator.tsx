"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Upload, X } from "lucide-react";
import { Marcellus, Jost } from "next/font/google";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import { formApi } from "@/lib/api";
import {
  getDiamondValuationCalculatorData,
  type DiamondValuationCalculatorPageData,
} from "@/lib/i18n/getDiamondValuationCalculatorData";
import { getLocalizedPath, type Locale } from "@/lib/i18n/config";

const marcellus = Marcellus({ subsets: ["latin"], weight: "400" });
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const DRAFT_KEY = "dalila_diamond_valuation_draft";
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

function localizedPath(path: string, locale: Locale) {
  if (path.startsWith("http") || path.startsWith("#")) return path;
  return getLocalizedPath(path, locale);
}

type TableData = { caption?: string; headers: string[]; rows: string[][] };

type FormState = {
  itemType: string;
  certificateStatus: string;
  gradingLaboratory: string;
  reportNumber: string;
  reportDate: string;
  origin: string;
  shape: string;
  caratWeight: string;
  colourGrade: string;
  clarityGrade: string;
  cutGrade: string;
  polish: string;
  symmetry: string;
  fluorescence: string;
  jewelleryType: string;
  metal: string;
  diamondCount: string;
  approximateAge: string;
  brand: string;
  boxReceipt: string;
  altered: string;
  jewelleryNotes: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  postcode: string;
  contactMethod: string;
  evaluationPreference: string;
  sellingTimeline: string;
  consent: boolean;
};

const initialForm: FormState = {
  itemType: "",
  certificateStatus: "",
  gradingLaboratory: "",
  reportNumber: "",
  reportDate: "",
  origin: "",
  shape: "",
  caratWeight: "",
  colourGrade: "",
  clarityGrade: "",
  cutGrade: "",
  polish: "",
  symmetry: "",
  fluorescence: "",
  jewelleryType: "",
  metal: "",
  diamondCount: "",
  approximateAge: "",
  brand: "",
  boxReceipt: "",
  altered: "",
  jewelleryNotes: "",
  fullName: "",
  email: "",
  phone: "",
  country: "",
  postcode: "",
  contactMethod: "",
  evaluationPreference: "",
  sellingTimeline: "",
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

function hasReportDetails(status: string) {
  return !["I do not have a grading report", "I am not sure", ""].includes(status);
}

function buildStructuredData(data: DiamondValuationCalculatorPageData) {
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
        mainEntity: { "@id": `${data.meta.canonical}#calculator` },
        about: [
          { "@type": "Thing", name: "Diamond valuation" },
          { "@type": "Thing", name: "Natural diamonds" },
          { "@type": "Thing", name: "Diamond resale value" },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${data.meta.canonical}#calculator`,
        name: "Dalila Diamond Valuation Calculator",
        url: data.meta.canonical,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires a modern web browser",
        description:
          "An online tool for submitting natural-diamond characteristics, grading reports and photographs for a preliminary specialist valuation.",
        provider: { "@id": "https://www.daliladiamonds.com/#organization" },
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

function getResultVariant(form: FormState) {
  if (form.certificateStatus === "I do not have a grading report") return "noCertificate";
  const hasCore =
    form.itemType &&
    form.certificateStatus &&
    (form.reportNumber || form.caratWeight || form.colourGrade || form.clarityGrade);
  if (hasCore && hasReportDetails(form.certificateStatus)) return "ready";
  return "missing";
}

export default function DiamondValuationCalculator({ locale = "en" }: { locale?: Locale }) {
  const data = getDiamondValuationCalculatorData(locale);
  const maxFileBytes = data.form.maxFileSizeMb * 1024 * 1024;

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [draftSaved, setDraftSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const resultVariant = useMemo(() => getResultVariant(form), [form]);
  const resultMessage = data.form.resultMessages[resultVariant as keyof typeof data.form.resultMessages];

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<FormState & { step?: number }>;
        setForm((prev) => ({ ...prev, ...parsed }));
        if (parsed.step && parsed.step >= 1 && parsed.step <= data.form.totalSteps) setStep(parsed.step);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...form, step }));
        setDraftSaved(true);
        const hide = setTimeout(() => setDraftSaved(false), 2000);
        return () => clearTimeout(hide);
      } catch {
        /* ignore */
      }
    }, 600);
    return () => clearTimeout(timeout);
  }, [form, step]);

  const updateField = useCallback(
    (name: keyof FormState, value: string | boolean) => {
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const addFiles = (incoming: File[]) => {
    const valid = incoming.filter((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) return false;
      if (file.size > maxFileBytes) return false;
      return true;
    });
    if (valid.length !== incoming.length) {
      alert(`Please upload ${data.form.acceptedFormats} files up to ${data.form.maxFileSizeMb}MB each.`);
    }
    if (valid.length) setFiles((prev) => [...prev, ...valid]);
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 1 && !form.itemType) return data.form.validation.itemTypeRequired;
    if (currentStep === 2 && !form.certificateStatus) return data.form.validation.certificateRequired;
    if (currentStep === 4 && files.length === 0) return data.form.validation.imageRequired;
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
    if (error) {
      setSubmitStatus({ type: "error", message: error });
      return;
    }
    setSubmitStatus(null);
    setStep((s) => Math.min(s + 1, data.form.totalSteps));
  };

  const goBack = () => {
    setSubmitStatus(null);
    setStep((s) => Math.max(s - 1, 1));
  };

  const buildDescription = () => {
    const lines = [
      "Diamond Valuation Calculator Request",
      `Lead source: ${data.form.leadSource}`,
      `Item type: ${form.itemType}`,
      `Certificate status: ${form.certificateStatus}`,
      `Grading laboratory: ${form.gradingLaboratory || "N/A"}`,
      `Report number: ${form.reportNumber || "N/A"}`,
      `Report date: ${form.reportDate || "N/A"}`,
      `Origin: ${form.origin || "N/A"}`,
      `Shape: ${form.shape || "N/A"}`,
      `Carat weight: ${form.caratWeight || "N/A"}`,
      `Colour: ${form.colourGrade || "N/A"}`,
      `Clarity: ${form.clarityGrade || "N/A"}`,
      `Cut: ${form.cutGrade || "N/A"}`,
      `Polish: ${form.polish || "N/A"}`,
      `Symmetry: ${form.symmetry || "N/A"}`,
      `Fluorescence: ${form.fluorescence || "N/A"}`,
      `Jewellery type: ${form.jewelleryType || "N/A"}`,
      `Metal: ${form.metal || "N/A"}`,
      `Number of diamonds: ${form.diamondCount || "N/A"}`,
      `Approximate age: ${form.approximateAge || "N/A"}`,
      `Brand/designer: ${form.brand || "N/A"}`,
      `Box/receipt available: ${form.boxReceipt || "N/A"}`,
      `Repaired/resized/altered: ${form.altered || "N/A"}`,
      `Additional jewellery notes: ${form.jewelleryNotes || "N/A"}`,
      `Preferred contact: ${form.contactMethod || "N/A"}`,
      `Evaluation preference: ${form.evaluationPreference || "N/A"}`,
      `Selling timeline: ${form.sellingTimeline || "N/A"}`,
      `Result variant: ${resultVariant}`,
    ];
    return lines.join("\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateStep(5);
    if (error) {
      setSubmitStatus({ type: "error", message: error });
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const submitData = new FormData();
      submitData.append("fullName", form.fullName);
      submitData.append("email", form.email || "not-provided@dalila.local");
      submitData.append("phone", form.phone || "Not provided");
      submitData.append("carat", form.caratWeight);
      submitData.append("material", form.metal || form.itemType);
      submitData.append("description", buildDescription());
      submitData.append("fullAddress", `${form.country}, ${form.postcode}`.trim());
      submitData.append("condition", form.sellingTimeline || form.evaluationPreference);
      files.forEach((file) => submitData.append("images", file));

      const response = await formApi.submitSellDiamond(submitData);
      if (response.success) {
        setSubmitStatus({ type: "success", message: data.form.successMessage });
        setForm(initialForm);
        setFiles([]);
        setStep(1);
        localStorage.removeItem(DRAFT_KEY);
      } else {
        setSubmitStatus({ type: "error", message: response.message || data.form.errorMessage });
      }
    } catch {
      setSubmitStatus({ type: "error", message: data.form.errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressLabel = data.form.progressLabel
    .replace("{step}", String(step))
    .replace("{total}", String(data.form.totalSteps));

  const currentStepMeta = data.form.steps[step - 1];

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

      <section className="bg-white py-10 md:py-14" aria-labelledby="dvc-hero-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 id="dvc-hero-heading" className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] mb-6 tracking-tight ${marcellus.className}`}>
            {data.hero.title}
          </h1>
          <div className="relative w-full aspect-video mb-8 overflow-hidden bg-black shadow-xl">
            <Image src={data.hero.image.src} alt={data.hero.image.alt} width={data.hero.image.width} height={data.hero.image.height} className="object-cover w-full h-full" priority />
          </div>
          <Paragraphs items={data.hero.paragraphs} />
          <Link href={localizedPath(data.hero.primaryButtonHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>
            {data.hero.primaryButtonText}
          </Link>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          <ResourceSidebar currentPage="diamond-valuation-calculator" />

          <article className="lg:col-span-3">
            <nav aria-label="Guide overview" className={`mb-10 p-5 md:p-6 bg-[#FAF6EB] border border-[#e4c75f]/30 ${jost.className}`}>
              <p className="font-semibold text-[#1a1a1a] mb-3">{data.overviewNav.title}</p>
              <ul className="space-y-2 text-sm md:text-base">
                {data.overviewNav.items.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-[#8a7028] hover:text-[#c89e3a] underline-offset-2 hover:underline">{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <section id={data.formIntro.id} className="scroll-mt-28 mb-10">
              <SectionHeading id={data.formIntro.id} title={data.formIntro.title} />
              <Paragraphs items={data.formIntro.paragraphs} />
            </section>

            <section id={data.form.id} ref={formRef} className="scroll-mt-28 mb-14 border border-gray-200 bg-slate-50 p-5 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <p className={`text-sm font-medium text-[#8a7028] uppercase tracking-wide ${jost.className}`}>{progressLabel}</p>
                {draftSaved ? <p className="text-xs text-gray-500">{data.form.savedDraftNotice}</p> : null}
              </div>

              <div className="mb-6">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#c89e3a] transition-all duration-300" style={{ width: `${(step / data.form.totalSteps) * 100}%` }} />
                </div>
              </div>

              <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-2 ${marcellus.className}`}>{currentStepMeta.title}</h3>
              <p className={`text-gray-600 mb-6 ${jost.className}`}>{currentStepMeta.subtitle}</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {step === 1 && (
                  <fieldset>
                    <legend className="sr-only">{currentStepMeta.title}</legend>
                    <div className="space-y-2">
                      {data.form.itemTypes.map((option) => (
                        <label key={option} className={`flex items-start gap-3 p-3 border cursor-pointer hover:bg-white ${form.itemType === option ? "border-[#c89e3a] bg-white" : "border-gray-200"}`}>
                          <input type="radio" name="itemType" value={option} checked={form.itemType === option} onChange={(e) => updateField("itemType", e.target.value)} className="mt-1" />
                          <span className="text-gray-800">{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <fieldset>
                      <legend className="sr-only">{currentStepMeta.title}</legend>
                      <div className="space-y-2 mb-6">
                        {data.form.certificateStatuses.map((option) => (
                          <label key={option} className={`flex items-start gap-3 p-3 border cursor-pointer hover:bg-white ${form.certificateStatus === option ? "border-[#c89e3a] bg-white" : "border-gray-200"}`}>
                            <input type="radio" name="certificateStatus" value={option} checked={form.certificateStatus === option} onChange={(e) => updateField("certificateStatus", e.target.value)} className="mt-1" />
                            <span className="text-gray-800">{option}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    {hasReportDetails(form.certificateStatus) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 border border-gray-200">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.gradingLaboratory}</label>
                          <input type="text" value={form.gradingLaboratory} onChange={(e) => updateField("gradingLaboratory", e.target.value)} className={fieldClass()} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.reportNumber} <span className="text-gray-400">({data.form.labels.optional})</span></label>
                          <input type="text" value={form.reportNumber} onChange={(e) => updateField("reportNumber", e.target.value)} className={fieldClass()} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.reportDate}</label>
                          <input type="date" value={form.reportDate} onChange={(e) => updateField("reportDate", e.target.value)} className={fieldClass()} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.origin}</label>
                          <select value={form.origin} onChange={(e) => updateField("origin", e.target.value)} className={fieldClass()}>
                            <option value="">Select</option>
                            {data.form.origins.map((o) => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.shape}</label>
                          <select value={form.shape} onChange={(e) => updateField("shape", e.target.value)} className={fieldClass()}>
                            <option value="">Select</option>
                            {data.form.shapes.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.caratWeight} <span className="text-gray-400">({data.form.labels.optional})</span></label>
                          <input type="text" value={form.caratWeight} onChange={(e) => updateField("caratWeight", e.target.value)} className={fieldClass()} placeholder="e.g. 1.02" />
                        </div>
                        {(["colourGrade", "clarityGrade", "cutGrade", "polish", "symmetry"] as const).map((key) => (
                          <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels[key]} <span className="text-gray-400">({data.form.labels.optional})</span></label>
                            <input type="text" value={form[key]} onChange={(e) => updateField(key, e.target.value)} className={fieldClass()} />
                          </div>
                        ))}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.fluorescence}</label>
                          <select value={form.fluorescence} onChange={(e) => updateField("fluorescence", e.target.value)} className={fieldClass()}>
                            <option value="">Select</option>
                            {data.form.fluorescenceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                        <p className="md:col-span-2 text-sm text-gray-600">{data.form.reportFieldsHelp}</p>
                      </div>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(["jewelleryType", "metal", "diamondCount", "approximateAge", "brand", "boxReceipt", "altered"] as const).map((key) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels[key]}</label>
                        <input type="text" value={form[key]} onChange={(e) => updateField(key, e.target.value)} className={fieldClass()} />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.jewelleryNotes}</label>
                      <textarea value={form.jewelleryNotes} onChange={(e) => updateField("jewelleryNotes", e.target.value)} rows={4} className={fieldClass()} />
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <p className={`text-sm text-gray-600 mb-3 ${jost.className}`}>You can also upload:</p>
                    <BulletList items={data.form.uploadHints} />
                    <div
                      onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
                      onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => { e.preventDefault(); setDragActive(false); addFiles(Array.from(e.dataTransfer.files)); }}
                      className={`border-2 border-dashed p-8 text-center transition ${dragActive ? "border-[#c89e3a] bg-[#FAF6EB]" : "border-gray-300 bg-white"}`}
                    >
                      <Upload className="w-8 h-8 mx-auto mb-3 text-[#c89e3a]" />
                      <p className="text-gray-700 mb-2">{data.form.labels.dragDrop}</p>
                      <p className="text-xs text-gray-500 mb-4">{data.form.acceptedFormats} up to {data.form.maxFileSizeMb}MB each</p>
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">Choose files</button>
                      <input ref={fileInputRef} type="file" multiple accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf" className="hidden" onChange={(e) => addFiles(Array.from(e.target.files ?? []))} />
                    </div>
                    {files.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {files.map((file, index) => (
                          <li key={`${file.name}-${index}`} className="flex items-center justify-between border border-gray-200 px-3 py-2 bg-white text-sm">
                            <span className="truncate">{file.name}</span>
                            <button type="button" onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))} aria-label="Remove file"><X className="w-4 h-4 text-red-500" /></button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-4">
                    <div className="rounded-md border border-[#c89e3a]/30 bg-[#FAF6EB] p-4 mb-4">
                      <h4 className={`text-lg font-semibold text-[#1a1a1a] mb-2 ${marcellus.className}`}>{resultMessage.heading}</h4>
                      <p className="text-sm text-gray-700">{resultMessage.message}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.fullName} *</label>
                        <input type="text" required value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} className={fieldClass()} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.email}</label>
                        <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className={fieldClass()} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.phone}</label>
                        <input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className={fieldClass()} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.country} *</label>
                        <input type="text" required value={form.country} onChange={(e) => updateField("country", e.target.value)} className={fieldClass()} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.postcode}</label>
                        <input type="text" value={form.postcode} onChange={(e) => updateField("postcode", e.target.value)} className={fieldClass()} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.contactMethod}</label>
                        <select value={form.contactMethod} onChange={(e) => updateField("contactMethod", e.target.value)} className={fieldClass()}>
                          <option value="">Select</option>
                          {data.form.contactMethods.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.evaluationPreference}</label>
                        <select value={form.evaluationPreference} onChange={(e) => updateField("evaluationPreference", e.target.value)} className={fieldClass()}>
                          <option value="">Select</option>
                          {data.form.evaluationPreferences.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.sellingTimeline}</label>
                        <select value={form.sellingTimeline} onChange={(e) => updateField("sellingTimeline", e.target.value)} className={fieldClass()}>
                          <option value="">Select</option>
                          {data.form.sellingTimelines.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                    <label className="flex items-start gap-3 text-sm text-gray-700">
                      <input type="checkbox" checked={form.consent} onChange={(e) => updateField("consent", e.target.checked)} className="mt-1" />
                      <span>
                        {data.form.consentText}{" "}
                        <Link href={localizedPath(data.form.privacyHref, locale)} className="text-[#c89e3a] underline">{data.form.privacyLinkText}</Link>.
                      </span>
                    </label>
                  </div>
                )}

                {submitStatus && (
                  <div className={`p-4 text-sm ${submitStatus.type === "success" ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}>
                    {submitStatus.message}
                  </div>
                )}

                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                  {step > 1 && (
                    <button type="button" onClick={goBack} className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-white">{data.form.backButton}</button>
                  )}
                  {step < data.form.totalSteps ? (
                    <button type="button" onClick={goNext} className="px-6 py-3 bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium">{data.form.nextButton}</button>
                  ) : (
                    <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium disabled:opacity-60 flex items-center justify-center gap-2">
                      {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />{data.form.submittingButton}</> : resultMessage.button}
                    </button>
                  )}
                </div>
              </form>
            </section>

            <section id={data.howMuchWorth.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.howMuchWorth.id} title={data.howMuchWorth.title} />
              <Paragraphs items={data.howMuchWorth.paragraphs} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.howMuchWorth.factorsIntro}</p>
              <BulletList items={data.howMuchWorth.factors} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.howMuchWorth.closing}</p>
              <Link href={localizedPath(data.howMuchWorth.ctaHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>
                {data.howMuchWorth.ctaText}
              </Link>
            </section>

            <section id={data.retailVsResale.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.retailVsResale.id} title={data.retailVsResale.title} />
              <Paragraphs items={data.retailVsResale.paragraphs} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <DataTable table={data.retailVsResale.table} />
                <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg">
                  <Image src={data.images.retailVsResale.src} alt={data.images.retailVsResale.alt} width={data.images.retailVsResale.width} height={data.images.retailVsResale.height} className="object-cover w-full h-full" loading="lazy" />
                </div>
              </div>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                {data.retailVsResale.giaNote}{" "}
                <a href={data.urls.giaFairMarket} target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] hover:underline font-medium">{data.retailVsResale.giaLinkText}</a>.
              </p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mt-4 ${jost.className}`}>{data.retailVsResale.closing}</p>
            </section>

            <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mb-12">
              <Image src={data.images.valueFactors.src} alt={data.images.valueFactors.alt} width={data.images.valueFactors.width} height={data.images.valueFactors.height} className="object-cover w-full h-full" loading="lazy" />
            </div>

            <section id={data.valueFactors.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.valueFactors.id} title={data.valueFactors.title} />
              {data.valueFactors.subsections.map((sub) => (
                <div key={sub.id} id={sub.id} className="scroll-mt-28 mb-10">
                  <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>{sub.title}</h3>
                  <Paragraphs items={sub.paragraphs} />
                  {"shapes" in sub && sub.shapes ? <BulletList items={sub.shapes} /> : null}
                  {"closing" in sub && sub.closing ? <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{sub.closing}</p> : null}
                  {"linkText" in sub && sub.linkText && sub.linkHref ? (
                    <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                      {"linkHref" in sub && sub.linkHref.startsWith("http") ? (
                        <a href={sub.linkHref} target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] hover:underline font-medium">{sub.linkText}</a>
                      ) : (
                        <Link href={localizedPath(sub.linkHref!, locale)} className="text-[#c89e3a] hover:underline font-medium">{sub.linkText}</Link>
                      )}
                    </p>
                  ) : null}
                </div>
              ))}
            </section>

            <section id={data.onlineValuation.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.onlineValuation.id} title={data.onlineValuation.title} />
              <Paragraphs items={data.onlineValuation.paragraphs} />
              <BulletList items={data.onlineValuation.bullets} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.onlineValuation.closing}</p>
            </section>

            <section id={data.withoutCertificate.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.withoutCertificate.id} title={data.withoutCertificate.title} />
              <Paragraphs items={data.withoutCertificate.paragraphs} />
              <Link href={localizedPath(data.withoutCertificate.ctaHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>
                {data.withoutCertificate.ctaText}
              </Link>
            </section>

            <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mb-12">
              <Image src={data.images.process.src} alt={data.images.process.alt} width={data.images.process.width} height={data.images.process.height} className="object-cover w-full h-full" loading="lazy" />
            </div>

            <section id={data.valuationProcess.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.valuationProcess.id} title={data.valuationProcess.title} />
              {data.valuationProcess.steps.map((s) => (
                <div key={s.number} className="mb-8">
                  <h3 className={`text-xl md:text-2xl text-[#1a1a1a] mb-3 ${marcellus.className}`}>{s.number}. {s.title}</h3>
                  <Paragraphs items={s.paragraphs} />
                </div>
              ))}
              <Link href={localizedPath(data.valuationProcess.ctaHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>
                {data.valuationProcess.ctaText}
              </Link>
            </section>

            <section id={data.whyAntwerp.id} className="scroll-mt-28 mb-12 bg-[#0B1A33] p-8 md:p-10 text-white">
              <h2 className={`text-3xl md:text-4xl mb-6 ${marcellus.className}`}>{data.whyAntwerp.title}</h2>
              <Paragraphs items={data.whyAntwerp.paragraphs} />
              <ul className={`space-y-2 mb-8 ${jost.className}`}>
                {data.whyAntwerp.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/85"><span className="text-[#e4c75f]">•</span><span>{item}</span></li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={localizedPath(data.whyAntwerp.primaryButtonHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{data.whyAntwerp.primaryButtonText}</Link>
                <Link href={localizedPath(data.whyAntwerp.secondaryButtonHref, locale)} className={`inline-flex items-center justify-center border border-[#c89e3a] text-[#e4c75f] hover:bg-white/5 font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>{data.whyAntwerp.secondaryButtonText}</Link>
              </div>
            </section>

            <section id={data.prepare.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.prepare.id} title={data.prepare.title} />
              <Paragraphs items={data.prepare.paragraphs} />
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

            <section id={data.finalCta.id} className="scroll-mt-28 bg-[#FAF6EB] border border-[#e4c75f]/40 p-8 md:p-10">
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
                <Link href={localizedPath(data.internalLinks.gradingReport.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.gradingReport.text}</Link>
                {" · "}
                <Link href={localizedPath(data.internalLinks.sellGuide.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.sellGuide.text}</Link>
              </p>
            </section>
          </article>
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-[#c89e3a]/30 bg-[#0B1A33] p-3">
        <button
          type="button"
          onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
          className={`w-full bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium py-3 text-sm tracking-[0.08em] uppercase ${jost.className}`}
        >
          {data.form.stickyButtonText}
        </button>
      </div>
    </main>
  );
}
