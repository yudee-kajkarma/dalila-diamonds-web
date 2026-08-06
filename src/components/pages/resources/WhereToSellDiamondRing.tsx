"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Upload, X } from "lucide-react";
import { Marcellus, Jost } from "next/font/google";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import { formApi } from "@/lib/api";
import { getWhereToSellDiamondRingData, type WhereToSellDiamondRingPageData } from "@/lib/i18n/getWhereToSellDiamondRingData";
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

type RingFormState = {
  sellingType: string;
  reportStatus: string;
  reportNumber: string;
  caratWeight: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  contactMethod: string;
  evaluationPreference: string;
  additionalInfo: string;
  consent: boolean;
};

const initialForm: RingFormState = {
  sellingType: "",
  reportStatus: "",
  reportNumber: "",
  caratWeight: "",
  fullName: "",
  email: "",
  phone: "",
  country: "",
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

function buildStructuredData(data: WhereToSellDiamondRingPageData) {
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
          { "@type": "Thing", name: "Selling diamond rings" },
          { "@type": "Thing", name: "Natural diamond buyers" },
          { "@type": "Thing", name: "Diamond valuation" },
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

function RingValuationForm({ formId, pageData, locale }: { formId: string; pageData: WhereToSellDiamondRingPageData; locale: Locale }) {
  const data = pageData;
  const MAX_FILE_BYTES = data.form.maxFileSizeMb * 1024 * 1024;
  const [form, setForm] = useState<RingFormState>(initialForm);
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (name: keyof RingFormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addFiles = (incoming: File[]) => {
    const valid = incoming.filter((f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_FILE_BYTES);
    if (valid.length !== incoming.length) {
      alert(`Please upload ${data.form.acceptedFormats} files up to ${data.form.maxFileSizeMb}MB each.`);
    }
    if (valid.length) setFiles((prev) => [...prev, ...valid]);
  };

  const buildDescription = () =>
    [
      "Where to Sell Diamond Ring Request",
      `Lead source: ${data.form.leadSource}`,
      `Selling type: ${form.sellingType}`,
      `Report status: ${form.reportStatus}`,
      `Report number: ${form.reportNumber || "N/A"}`,
      `Carat weight: ${form.caratWeight || "N/A"}`,
      `Contact method: ${form.contactMethod || "N/A"}`,
      `Evaluation preference: ${form.evaluationPreference || "N/A"}`,
      `Additional info: ${form.additionalInfo || "N/A"}`,
    ].join("\n");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.sellingType) return setStatus({ type: "error", message: data.form.validation.sellingTypeRequired });
    if (!form.reportStatus) return setStatus({ type: "error", message: data.form.validation.reportRequired });
    if (!form.fullName.trim()) return setStatus({ type: "error", message: data.form.validation.nameRequired });
    if (!form.email.trim() && !form.phone.trim()) return setStatus({ type: "error", message: data.form.validation.contactRequired });
    if (!form.country.trim()) return setStatus({ type: "error", message: data.form.validation.countryRequired });
    if (!form.consent) return setStatus({ type: "error", message: data.form.validation.consentRequired });

    setIsSubmitting(true);
    setStatus(null);
    try {
      const submitData = new FormData();
      submitData.append("fullName", form.fullName);
      submitData.append("email", form.email || "not-provided@dalila.local");
      submitData.append("phone", form.phone || "Not provided");
      submitData.append("carat", form.caratWeight);
      submitData.append("material", form.sellingType);
      submitData.append("description", buildDescription());
      submitData.append("fullAddress", form.country);
      submitData.append("condition", form.reportStatus);
      files.forEach((file) => submitData.append("images", file));

      const response = await formApi.submitSellDiamond(submitData);
      if (response.success) {
        setStatus({ type: "success", message: data.form.successMessage });
        setForm(initialForm);
        setFiles([]);
      } else {
        setStatus({ type: "error", message: response.message || data.form.errorMessage });
      }
    } catch {
      setStatus({ type: "error", message: data.form.errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={formId} className="scroll-mt-28 mb-12 border border-gray-200 bg-slate-50 p-5 md:p-8">
      <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-2 ${marcellus.className}`}>{data.form.title}</h3>
      <p className={`text-gray-600 mb-6 ${jost.className}`}>{data.form.subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <p className="block text-sm font-medium text-gray-700 mb-2">{data.form.labels.sellingType} *</p>
          <div className="space-y-2">
            {data.form.sellingOptions.map((option) => (
              <label key={option} className={`flex items-start gap-3 p-3 border cursor-pointer hover:bg-white ${form.sellingType === option ? "border-[#c89e3a] bg-white" : "border-gray-200"}`}>
                <input type="radio" name={`${formId}-sellingType`} value={option} checked={form.sellingType === option} onChange={(e) => update("sellingType", e.target.value)} className="mt-1" />
                <span className="text-gray-800">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="block text-sm font-medium text-gray-700 mb-2">{data.form.labels.reportStatus} *</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.form.reportOptions.map((option) => (
              <label key={option} className={`flex items-start gap-3 p-3 border cursor-pointer hover:bg-white ${form.reportStatus === option ? "border-[#c89e3a] bg-white" : "border-gray-200"}`}>
                <input type="radio" name={`${formId}-reportStatus`} value={option} checked={form.reportStatus === option} onChange={(e) => update("reportStatus", e.target.value)} className="mt-1" />
                <span className="text-gray-800 text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.reportNumber} ({data.form.labels.optional})</label>
            <input type="text" value={form.reportNumber} onChange={(e) => update("reportNumber", e.target.value)} className={fieldClass()} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{data.form.labels.caratWeight} ({data.form.labels.optional})</label>
            <input type="text" value={form.caratWeight} onChange={(e) => update("caratWeight", e.target.value)} className={fieldClass()} placeholder="e.g. 1.02" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{data.form.labels.upload}</label>
          <div
            onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); addFiles(Array.from(e.dataTransfer.files)); }}
            className={`border-2 border-dashed p-6 text-center transition ${dragActive ? "border-[#c89e3a] bg-[#FAF6EB]" : "border-gray-300 bg-white"}`}
          >
            <Upload className="w-7 h-7 mx-auto mb-2 text-[#c89e3a]" />
            <p className="text-gray-700 text-sm mb-2">{data.form.labels.dragDrop}</p>
            <p className="text-xs text-gray-500 mb-3">{data.form.acceptedFormats} up to {data.form.maxFileSizeMb}MB each</p>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">Choose files</button>
            <input ref={fileInputRef} type="file" multiple accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf" className="hidden" onChange={(e) => addFiles(Array.from(e.target.files ?? []))} />
          </div>
          {files.length > 0 && (
            <ul className="mt-3 space-y-2">
              {files.map((file, i) => (
                <li key={`${file.name}-${i}`} className="flex items-center justify-between border border-gray-200 px-3 py-2 bg-white text-sm">
                  <span className="truncate">{file.name}</span>
                  <button type="button" onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))} aria-label="Remove file"><X className="w-4 h-4 text-red-500" /></button>
                </li>
              ))}
            </ul>
          )}
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
          <span>
            {data.form.consentText}{" "}
            <Link href={localizedPath(data.form.privacyHref, locale)} className="text-[#c89e3a] underline">{data.form.privacyLinkText}</Link>.
          </span>
        </label>

        {status && (
          <div className={`p-4 text-sm ${status.type === "success" ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}>
            {status.message}
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto px-8 py-3 bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium disabled:opacity-60 flex items-center justify-center gap-2">
          {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />{data.form.submittingButton}</> : data.form.submitButton}
        </button>
      </form>
    </section>
  );
}

export default function WhereToSellDiamondRing({ locale = "en" }: { locale?: Locale }) {
  const data = getWhereToSellDiamondRingData(locale);

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

      <section className="bg-white py-10 md:py-14" aria-labelledby="wtsdr-hero-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 id="wtsdr-hero-heading" className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] mb-6 tracking-tight ${marcellus.className}`}>
            {data.hero.title}
          </h1>
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
          <ResourceSidebar currentPage="where-to-sell-diamond-ring" />

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
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.quickAnswer.scenariosIntro}</p>
              <BulletList items={data.quickAnswer.scenarios} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.quickAnswer.closing}</p>
            </section>

            <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mb-8">
              <Image src={data.images.sellingOptions.src} alt={data.images.sellingOptions.alt} width={data.images.sellingOptions.width} height={data.images.sellingOptions.height} className="object-cover w-full h-full" loading="lazy" />
            </div>

            <section id={data.compareMethods.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.compareMethods.id} title={data.compareMethods.title} />
              <Paragraphs items={data.compareMethods.intro} />
              <DataTable table={data.compareMethods.table} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.compareMethods.closing}</p>
            </section>

            <RingValuationForm formId="ring-valuation-form-top" pageData={data} locale={locale} />

            <section id={data.specialistBuyer.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.specialistBuyer.id} title={data.specialistBuyer.title} />
              <Paragraphs items={data.specialistBuyer.paragraphs} />
              <h3 className={`text-xl md:text-2xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>{data.specialistBuyer.whenRightTitle}</h3>
              <BulletList items={data.specialistBuyer.whenRightBullets} />
              <Link href={localizedPath(data.specialistBuyer.ctaHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>
                {data.specialistBuyer.ctaText}
              </Link>
            </section>

            <section id={data.jewelleryRetailer.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.jewelleryRetailer.id} title={data.jewelleryRetailer.title} />
              <Paragraphs items={data.jewelleryRetailer.paragraphs} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.jewelleryRetailer.questionsIntro}</p>
              <BulletList items={data.jewelleryRetailer.questions} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.jewelleryRetailer.closing}</p>
            </section>

            <section id={data.auction.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.auction.id} title={data.auction.title} />
              <Paragraphs items={data.auction.paragraphs} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.auction.questionsIntro}</p>
              <BulletList items={data.auction.questions} />
              <Paragraphs items={data.auction.closing} />
            </section>

            <section id={data.consignment.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.consignment.id} title={data.consignment.title} />
              <Paragraphs items={data.consignment.paragraphs} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.consignment.agreementIntro}</p>
              <BulletList items={data.consignment.agreementItems} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.consignment.closing}</p>
            </section>

            <section id={data.privateMarketplace.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.privateMarketplace.id} title={data.privateMarketplace.title} />
              <Paragraphs items={data.privateMarketplace.paragraphs} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.privateMarketplace.risksIntro}</p>
              <BulletList items={data.privateMarketplace.risks} />
              <Paragraphs items={data.privateMarketplace.closing} />
            </section>

            <section id={data.pawnGoldBuyer.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.pawnGoldBuyer.id} title={data.pawnGoldBuyer.title} />
              <Paragraphs items={data.pawnGoldBuyer.paragraphs} />
            </section>

            <section id={data.bestMethod.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.bestMethod.id} title={data.bestMethod.title} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.bestMethod.intro}</p>
              {data.bestMethod.scenarios.map((s) => (
                <div key={s.title} className="mb-6">
                  <h3 className={`text-xl md:text-2xl text-[#1a1a1a] mb-2 ${marcellus.className}`}>{s.title}</h3>
                  <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{s.text}</p>
                </div>
              ))}
            </section>

            <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mb-12">
              <Image src={data.images.trustChecklist.src} alt={data.images.trustChecklist.alt} width={data.images.trustChecklist.width} height={data.images.trustChecklist.height} className="object-cover w-full h-full" loading="lazy" />
            </div>

            <section id={data.trustworthyBuyer.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.trustworthyBuyer.id} title={data.trustworthyBuyer.title} />
              <Paragraphs items={data.trustworthyBuyer.paragraphs} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.trustworthyBuyer.questionsIntro}</p>
              <BulletList items={data.trustworthyBuyer.questions} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.trustworthyBuyer.closing}</p>
            </section>

            <section id={data.warningSigns.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.warningSigns.id} title={data.warningSigns.title} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{data.warningSigns.intro}</p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-3 ${jost.className}`}>{data.warningSigns.signsIntro}</p>
              <BulletList items={data.warningSigns.signs} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.warningSigns.closing}</p>
            </section>

            <section id={data.beforeSelling.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.beforeSelling.id} title={data.beforeSelling.title} />
              <Paragraphs items={data.beforeSelling.paragraphs.slice(0, 2)} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                {data.beforeSelling.paragraphs[2]}{" "}
                <a href={data.urls.giaReportsAppraisals} target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] hover:underline font-medium">{data.beforeSelling.giaLinkText}</a>.
              </p>
              <Paragraphs items={data.beforeSelling.paragraphs.slice(3)} />
              <h3 className={`text-xl md:text-2xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>{data.beforeSelling.prepareTitle}</h3>
              <BulletList items={data.beforeSelling.prepareItems} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.beforeSelling.closing}</p>
            </section>

            <section id={data.compareOffers.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.compareOffers.id} title={data.compareOffers.title} />
              <Paragraphs items={data.compareOffers.intro} />
              <DataTable table={data.compareOffers.table} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{data.compareOffers.closing}</p>
            </section>

            <section id={data.whyAntwerp.id} className="scroll-mt-28 mb-12 bg-[#0B1A33] p-8 md:p-10 text-white">
              <h2 className={`text-3xl md:text-4xl mb-6 ${marcellus.className}`}>{data.whyAntwerp.title}</h2>
              <Paragraphs items={data.whyAntwerp.paragraphs} />
              <Link href={localizedPath(data.whyAntwerp.ctaHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>
                {data.whyAntwerp.ctaText}
              </Link>
            </section>

            <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mb-12">
              <Image src={data.images.antwerpProcess.src} alt={data.images.antwerpProcess.alt} width={data.images.antwerpProcess.width} height={data.images.antwerpProcess.height} className="object-cover w-full h-full" loading="lazy" />
            </div>

            <section id={data.dalilaProcess.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.dalilaProcess.id} title={data.dalilaProcess.title} />
              {data.dalilaProcess.steps.map((s) => (
                <div key={s.number} className="mb-6">
                  <h3 className={`text-xl md:text-2xl text-[#1a1a1a] mb-2 ${marcellus.className}`}>{s.number}. {s.title}</h3>
                  <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>{s.text}</p>
                </div>
              ))}
              <Link href={localizedPath(data.dalilaProcess.ctaHref, locale)} className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}>
                {data.dalilaProcess.ctaText}
              </Link>
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
              <p className={`text-sm text-gray-600 ${jost.className}`}>
                Related:{" "}
                <Link href={localizedPath(data.internalLinks.sellPage.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.sellPage.text}</Link>
                {" · "}
                <Link href={localizedPath(data.internalLinks.valuationCalculator.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.valuationCalculator.text}</Link>
                {" · "}
                <Link href={localizedPath(data.internalLinks.gradingReport.href, locale)} className="text-[#c89e3a] hover:underline">{data.internalLinks.gradingReport.text}</Link>
              </p>
            </section>

            <RingValuationForm formId="ring-valuation-form-bottom" pageData={data} locale={locale} />
          </article>
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-[#c89e3a]/30 bg-[#0B1A33] p-3">
        <Link href="#ring-valuation-form-top" className={`block w-full text-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium py-3 text-sm tracking-[0.08em] uppercase ${jost.className}`}>
          {data.form.submitButton}
        </Link>
      </div>
    </main>
  );
}
