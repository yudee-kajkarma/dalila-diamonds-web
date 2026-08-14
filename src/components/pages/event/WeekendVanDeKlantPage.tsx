"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Upload, X, CheckCircle2 } from "lucide-react";
import { marcellus, jost } from "@/lib/fonts";
import { useLanguage } from "@/context/LanguageContext";
import { getWeekendVanDeKlantData } from "@/lib/i18n/getWeekendVanDeKlantData";
import { getLocalizedPath, type Locale } from "@/lib/i18n/config";
import { formApi } from "@/lib/api";
import ProductsSection from "./ProductsSection";

// ── Event date / status badge ────────────────────────────────────────────────
function EventDateBadge({
  data,
}: {
  data: ReturnType<typeof getWeekendVanDeKlantData>;
}) {
  const now = new Date();
  const cutoff = new Date(
    data.dateComponent.cutoffYear,
    data.dateComponent.cutoffMonth - 1,
    data.dateComponent.cutoffDay + 1
  );
  const isActive = now <= cutoff;

  if (isActive) {
    return (
      <div className={`space-y-1 mb-6 ${jost.className}`}>
        <div className="inline-flex items-center gap-2 bg-[#FAF6EB] border border-[#c89e3a]/40 px-4 py-2 text-sm text-gray-800">
          <span
            className="w-2 h-2 rounded-full bg-[#c89e3a] shrink-0"
            aria-hidden="true"
          />
          {data.dateComponent.active}
        </div>
        <p className={`text-xs text-gray-500 pl-1 ${jost.className}`}>
          {data.dateComponent.activeNote}
        </p>
      </div>
    );
  }

  return (
    <div className={`mb-6 p-4 bg-gray-50 border border-gray-200 text-sm text-gray-700 ${jost.className}`}>
      <span className="font-semibold">{data.dateComponent.ended}</span>{" "}
      {data.dateComponent.endedNote}
    </div>
  );
}

// ── Appointment request form ─────────────────────────────────────────────────
type BookingState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  appointmentType: string;
  preferredDay: string;
  preferredTime: string;
  tradeSpecs: string;
  intendedUse: string;
  budget: string;
  receiptDate: string;
  attendees: string;
  consent: boolean;
};

const initialBooking: BookingState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  appointmentType: "",
  preferredDay: "",
  preferredTime: "",
  tradeSpecs: "",
  intendedUse: "",
  budget: "",
  receiptDate: "",
  attendees: "",
  consent: false,
};

function BookingForm({
  data,
}: {
  data: ReturnType<typeof getWeekendVanDeKlantData>;
}) {
  const [form, setForm] = useState<BookingState>(initialBooking);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fieldCls = `w-full border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c89e3a]/40 focus:border-[#c89e3a] ${jost.className}`;

  const update = (k: keyof BookingState, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim())
      return setStatus({ type: "error", message: "Please enter your name." });
    if (!form.email.trim())
      return setStatus({ type: "error", message: "Please enter your email." });
    if (!form.appointmentType.trim())
      return setStatus({
        type: "error",
        message: "Please specify the appointment type.",
      });
    if (!form.consent)
      return setStatus({
        type: "error",
        message: "Please accept the privacy policy to continue.",
      });

    setIsSubmitting(true);
    setStatus(null);

    try {
      const description = [
        "Weekend van de Klant — Appointment Request",
        `Company / role: ${form.company || "N/A"}`,
        `Appointment type: ${form.appointmentType || "N/A"}`,
        `Preferred day: ${form.preferredDay || "N/A"}`,
        `Preferred time: ${form.preferredTime || "N/A"}`,
        `Trade specs / report: ${form.tradeSpecs || "N/A"}`,
        `Intended use: ${form.intendedUse || "N/A"}`,
        `Budget: ${form.budget || "N/A"}`,
        `Required receipt date: ${form.receiptDate || "N/A"}`,
        `Attendees: ${form.attendees || "N/A"}`,
      ].join("\n");

      const fd = new FormData();
      fd.append("fullName", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone || "Not provided");
      fd.append("material", form.appointmentType || "Weekend van de Klant Appointment");
      fd.append("description", description);
      fd.append("fullAddress", "Not provided");
      if (file) fd.append("images", file);

      const res = await formApi.submitSellDiamond(fd);
      if (res.success) {
        setStatus({
          type: "success",
          message: data.sections.booking.confirmationMessage,
        });
        setForm(initialBooking);
        setFile(null);
      } else {
        setStatus({
          type: "error",
          message: res.message || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { booking } = data.sections;

  // Check if event is still active
  const now = new Date();
  const cutoff = new Date(
    data.dateComponent.cutoffYear,
    data.dateComponent.cutoffMonth - 1,
    data.dateComponent.cutoffDay + 1
  );
  const isActive = now <= cutoff;

  if (!isActive) {
    return (
      <div className="border border-gray-200 bg-slate-50 p-6 md:p-8">
        <h3
          className={`text-2xl text-[#1a1a1a] mb-3 ${marcellus.className}`}
        >
          {data.dateComponent.ended}
        </h3>
        <p className={`text-gray-600 mb-6 text-sm ${jost.className}`}>
          {data.dateComponent.endedNote}
        </p>
        <a
          href="mailto:business@daliladiamonds.com"
          className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-sm transition-colors ${jost.className}`}
        >
          Contact Dalila for a Trade Enquiry
        </a>
      </div>
    );
  }

  return (
    <section
      id="booking-form"
      className="scroll-mt-28 mb-12 border border-gray-200 bg-slate-50 p-6 md:p-8"
    >
      <h3
        className={`text-2xl md:text-3xl text-[#1a1a1a] mb-2 ${marcellus.className}`}
      >
        {data.primaryCta}
      </h3>
      <p className={`text-gray-600 mb-1 text-sm ${jost.className}`}>
        {data.trustMicrocopy}
      </p>
      <p
        className={`text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 mb-6 ${jost.className}`}
      >
        {data.statusLine}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name + Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {booking.formFields[0]} *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={fieldCls}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {booking.formFields[1]}
            </label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              className={fieldCls}
              placeholder="e.g. Jeweller, Manufacturer"
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {booking.formFields[2]} *
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={fieldCls}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {booking.formFields[3]}
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={fieldCls}
              placeholder="+32 …"
            />
          </div>
        </div>

        {/* Appointment type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {booking.formFields[4]} *
          </label>
          <select
            required
            value={form.appointmentType}
            onChange={(e) => update("appointmentType", e.target.value)}
            className={fieldCls}
          >
            <option value="">Select…</option>
            <option>Trade Diamond Brief Clinic</option>
            <option>Grading-Report Check and Explanation</option>
            <option>Current Natural-Diamond Stock Review</option>
            <option>Confirmed Trade Collection or Office Visit</option>
          </select>
        </div>

        {/* Preferred day + time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {booking.formFields[5]}
            </label>
            <select
              value={form.preferredDay}
              onChange={(e) => update("preferredDay", e.target.value)}
              className={fieldCls}
            >
              <option value="">Select…</option>
              <option>Saturday 3 October</option>
              <option>Sunday 4 October</option>
              <option>Another weekday</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {booking.formFields[6]}
            </label>
            <input
              type="text"
              value={form.preferredTime}
              onChange={(e) => update("preferredTime", e.target.value)}
              className={fieldCls}
              placeholder="e.g. morning, 10:00–12:00"
            />
          </div>
        </div>

        {/* Trade specs / report */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {booking.formFields[7]}
          </label>
          <textarea
            rows={3}
            value={form.tradeSpecs}
            onChange={(e) => update("tradeSpecs", e.target.value)}
            className={fieldCls}
            placeholder="Shape, carat, colour, clarity, report lab/number…"
          />
        </div>

        {/* Use + Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {booking.formFields[8]}
            </label>
            <input
              type="text"
              value={form.intendedUse}
              onChange={(e) => update("intendedUse", e.target.value)}
              className={fieldCls}
              placeholder="e.g. ring, pendant, earring pair"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {booking.formFields[9]}
            </label>
            <input
              type="text"
              value={form.budget}
              onChange={(e) => update("budget", e.target.value)}
              className={fieldCls}
              placeholder="e.g. €5,000–€10,000"
            />
          </div>
        </div>

        {/* Receipt date + Attendees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {booking.formFields[10]}
            </label>
            <input
              type="text"
              value={form.receiptDate}
              onChange={(e) => update("receiptDate", e.target.value)}
              className={fieldCls}
              placeholder="e.g. 15 October 2026"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {booking.formFields[11]}
            </label>
            <input
              type="text"
              value={form.attendees}
              onChange={(e) => update("attendees", e.target.value)}
              className={fieldCls}
              placeholder="e.g. 2 — Jan De Smet, Anna Peeters"
            />
          </div>
        </div>

        {/* File upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specification sheet or reference image (optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 p-4 text-center bg-white">
            <Upload className="w-5 h-5 mx-auto mb-2 text-[#c89e3a]" />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              Choose file
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setFile(f);
              }}
            />
          </div>
          {file && (
            <div className="mt-2 flex items-center justify-between border border-gray-200 px-3 py-1.5 bg-white text-sm">
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => setFile(null)}
                aria-label="Remove"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          )}
        </div>

        {/* Consent */}
        <label className="flex items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
            className="mt-1"
          />
          <span>
            I agree to Dalila Diamonds processing my enquiry in line with the{" "}
            <Link href="/privacy" className="text-[#c89e3a] underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {status && (
          <div
            className={`p-4 text-sm ${
              status.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
            role="alert"
          >
            {status.message}
          </div>
        )}

        {/* Status warning above submit */}
        <p
          className={`text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 ${jost.className}`}
        >
          {data.statusLine}
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-3 bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium disabled:opacity-60 flex items-center gap-2 transition-colors ${jost.className}`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending…
            </>
          ) : (
            data.primaryCta
          )}
        </button>

        <p className={`text-xs text-gray-500 mt-2 ${jost.className}`}>
          {booking.contact.email} · {booking.contact.phone} ·{" "}
          {booking.contact.address}
        </p>
      </form>
    </section>
  );
}

// ── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ title }: { title: string }) {
  return (
    <>
      <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
      <h2
        className={`text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight ${marcellus.className}`}
      >
        {title}
      </h2>
    </>
  );
}

// ── Two-column layout helper ─────────────────────────────────────────────────
function TwoCol({
  imageSlot,
  textSlot,
  imageRight = false,
}: {
  imageSlot: React.ReactNode;
  textSlot: React.ReactNode;
  imageRight?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
      <div className={imageRight ? "order-1 lg:order-2" : "order-1"}>
        {imageSlot}
      </div>
      <div className={imageRight ? "order-2 lg:order-1" : "order-2"}>
        {textSlot}
      </div>
    </div>
  );
}

function Img({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden shadow-xl bg-gray-100">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width:1024px) 100vw, 50vw"
      />
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function WeekendVanDeKlantPage({
  locale: localeProp,
}: {
  locale?: Locale;
}) {
  const { locale: ctxLocale } = useLanguage();
  const locale = localeProp ?? ctxLocale;
  const data = getWeekendVanDeKlantData(locale);
  const lp = (path: string) => getLocalizedPath(path, locale);
  const { sections } = data;

  return (
    <main className={`bg-white min-h-screen ${jost.className}`}>

      {/* ── Banner ── */}
      <div className="relative bg-slate-900">
        <section
          className="relative min-h-[280px] sm:min-h-[340px] flex items-center justify-center overflow-hidden"
          aria-label="Page banner"
        >
          <div className="absolute inset-0">
            <Image
              src="/event_pages/page_2/1.png"
              alt={data.banner.imageAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/80 to-slate-900" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center pt-32 pb-12">
            <p
              className={`text-2xl sm:text-4xl lg:text-5xl text-white mb-3 ${marcellus.className}`}
            >
              {sections.hero.heading}
            </p>
            <div
              className="w-2/3 sm:w-[35%] h-px bg-amber-400 mx-auto mb-6"
              aria-hidden="true"
            />
            <nav
              aria-label="Breadcrumb"
              className={`flex flex-wrap items-center justify-center gap-2 text-gray-300 text-sm md:text-base ${jost.className}`}
            >
              <Link
                href={lp("/")}
                className="hover:text-amber-400 transition-colors"
              >
                {data.banner.breadcrumbHome}
              </Link>
              <span aria-hidden="true">›</span>
              <span>{data.banner.breadcrumbCurrent}</span>
            </nav>
          </div>
        </section>
      </div>

      {/* ── Main content ── */}
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">

        {/* ── Section 1 — Hero ── */}
        <TwoCol
          imageRight
          imageSlot={
            <Img src="/event_pages/page_2/1.png" alt={sections.hero.imageAlt} />
          }
          textSlot={
            <div>
              {/* Eyebrow */}
              <p
                className={`text-sm font-semibold text-[#c89e3a] uppercase tracking-widest mb-3 ${jost.className}`}
              >
                {/* {sections.hero.eyebrow} */}
              </p>
              {/* <EventDateBadge data={data} /> */}
              <SectionHeading title={sections.hero.heading} />
              {sections.hero.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}
                >
                  {p}
                </p>
              ))}
              {/* Status warning */}
              <div
                className={`mt-2 mb-6 p-4 border-l-4 border-amber-500 bg-amber-50 text-sm text-amber-800 ${jost.className}`}
              >
                {data.statusLine}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <a
                  href="#booking-form"
                  className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-sm transition-colors ${jost.className}`}
                >
                  {data.primaryCta}
                </a>
                <Link
                  href={lp("/inventory")}
                  className={`inline-flex items-center justify-center border border-[#c89e3a] text-[#8a7028] hover:bg-[#FAF6EB] font-medium px-8 py-3.5 text-sm transition-colors ${jost.className}`}
                >
                  {data.secondaryCta}
                </Link>
              </div>
              <a
                href="#booking-form"
                className={`block text-sm text-[#c89e3a] hover:underline mt-3 ${jost.className}`}
              >
                {sections.hero.tradeLink} →
              </a>
              <p className={`text-xs text-gray-500 mt-3 ${jost.className}`}>
                {data.trustMicrocopy}
              </p>
            </div>
          }
        />

        {/* ── Section 2 — The official customer weekend ── */}
        <TwoCol
          imageSlot={
            <Img src="/event_pages/page_2/2.png" alt={sections.event.imageAlt} />
          }
          textSlot={
            <div>
              <SectionHeading title={sections.event.heading} />
              {sections.event.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}
                >
                  {p}
                </p>
              ))}
              <a
                href={sections.event.inlineLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-[#c89e3a] hover:underline font-medium text-sm ${jost.className}`}
              >
                {sections.event.inlineLink.text} →
              </a>
            </div>
          }
        />

        {/* ── Section 3 — Appointment types (4 cards) ── */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full mx-auto" />
            <h2
              className={`text-3xl md:text-4xl font-bold text-[#1a1a1a] ${marcellus.className}`}
            >
              {sections.appointments.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {sections.appointments.items.map((item, i) => (
              <div
                key={i}
                className="relative bg-white border border-gray-200 hover:border-[#c89e3a]/60 hover:shadow-md transition-all duration-200 p-6 flex flex-col"
              >
                {/* Number badge */}
                <span
                  className={`absolute -top-4 left-6 w-8 h-8 rounded-full bg-[#c89e3a] text-white text-sm font-bold flex items-center justify-center shadow ${jost.className}`}
                >
                  {i + 1}
                </span>
                <div className="w-10 h-0.5 bg-[#c89e3a] mt-2 mb-4" />
                <h3
                  className={`text-base font-bold text-[#1a1a1a] mb-3 leading-snug ${marcellus.className}`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-gray-500 text-sm leading-relaxed mb-4 flex-1 ${jost.className}`}
                >
                  {item.body}
                </p>
                <a
                  href="#booking-form"
                  className={`inline-flex items-center gap-1 text-xs font-semibold text-white bg-[#c89e3a] hover:bg-[#b38d2f] px-4 py-2 transition-colors self-start ${jost.className}`}
                >
                  {item.cta} →
                </a>
              </div>
            ))}
          </div>
          {/* Offer note */}
          <p
            className={`text-xs text-gray-500 border-l-2 border-gray-300 pl-3 max-w-3xl ${jost.className}`}
          >
            {sections.appointments.offerNote}
          </p>
        </section>

        {/* ── Products Section ── */}
        <ProductsSection locale={locale} />

        {/* ── Section 4 — Prepare for the appointment ── */}
        <TwoCol
          imageRight
          imageSlot={
            <Img
              src="/event_pages/page_2/3.png"
              alt={sections.prepare.imageAlt}
            />
          }
          textSlot={
            <div>
              <SectionHeading title={sections.prepare.heading} />
              {sections.prepare.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}
                >
                  {p}
                </p>
              ))}
              {/* Checklist card */}
              <div className="bg-[#FAF6EB] border border-[#e4c75f]/40 p-5 mb-6">
                <p
                  className={`text-xs font-semibold text-[#1a1a1a] uppercase tracking-wider mb-3 ${jost.className}`}
                >
                  Quick preparation list
                </p>
                <ul className="space-y-2">
                  {sections.prepare.checklist.map((item, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2 text-sm text-gray-700 ${jost.className}`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#c89e3a] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#booking-form"
                className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-sm transition-colors ${jost.className}`}
              >
                {sections.prepare.checklistCta}
              </a>
            </div>
          }
        />

        {/* ── Section 5 — Why Dalila ── */}
        <TwoCol
          imageSlot={
            <Img
              src="/event_pages/page_2/5.png"
              alt={sections.whyDalila.imageAlt}
            />
          }
          textSlot={
            <div>
              <SectionHeading title={sections.whyDalila.heading} />
              {sections.whyDalila.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}
                >
                  {p}
                </p>
              ))}
              <div
                className={`border-l-4 border-[#c89e3a] pl-4 py-2 text-sm text-gray-600 mb-6 italic ${jost.className}`}
              >
                {sections.whyDalila.tradeNote}
              </div>
              {/* Internal links */}
              <div className={`flex flex-col gap-2 mb-6 text-sm ${jost.className}`}>
                {/* <Link
                  href={lp("/aboutUs")}
                  className="text-[#c89e3a] hover:underline font-medium"
                >
                  Learn about Dalila Diamonds →
                </Link>
                <Link
                  href={lp("/premium-b2b-diamond-supplier-belgium")}
                  className="text-[#c89e3a] hover:underline font-medium"
                >
                  B2B natural diamond sourcing in Antwerp →
                </Link>
                <Link
                  href={lp("/diamondKnowledge")}
                  className="text-[#c89e3a] hover:underline font-medium"
                >
                  Understand diamond quality and the 4Cs →
                </Link> */}
              </div>
              <a
                href="#booking-form"
                className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-sm transition-colors ${jost.className}`}
              >
                {sections.whyDalila.cta}
              </a>
            </div>
          }
        />

        {/* ── Section 6 — Booking section + form ── */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <SectionHeading title={sections.booking.heading} />
              {sections.booking.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}
                >
                  {p}
                </p>
              ))}
              <div className="relative w-full aspect-[16/10] overflow-hidden shadow-xl bg-gray-100 mt-6">
                <Image
                  src="/event_pages/page_2/6.png"
                  alt={sections.booking.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div>
              <BookingForm data={data} />
            </div>
          </div>
        </section>

        {/* ── Section 7 — FAQ ── */}
        <section className="mb-16">
          <SectionHeading title={sections.faqs.heading} />
          <div className="w-full space-y-3">
            {sections.faqs.items.map((faq, i) => (
              <details
                key={i}
                className="border border-gray-200 p-4 bg-white group"
              >
                <summary
                  className={`cursor-pointer font-semibold text-[#1a1a1a] list-none flex justify-between items-start gap-4 ${marcellus.className}`}
                >
                  {faq.q}
                  <span
                    className="text-[#c89e3a] group-open:rotate-45 transition-transform text-xl leading-none shrink-0"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p
                  className={`mt-3 text-gray-700 text-base leading-relaxed ${jost.className}`}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="bg-[#FAF6EB] border border-[#e4c75f]/40 p-8 md:p-10 mb-12">
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
          <h2
            className={`text-3xl md:text-4xl text-[#1a1a1a] mb-4 ${marcellus.className}`}
          >
            {data.primaryCta}
          </h2>
          <p className={`text-gray-600 mb-6 text-base ${jost.className}`}>
            {data.trustMicrocopy}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#booking-form"
              className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-sm transition-colors ${jost.className}`}
            >
              {data.primaryCta}
            </a>
            <a
              href="#booking-form"
              className={`inline-flex items-center justify-center border border-[#c89e3a] text-[#8a7028] hover:bg-white font-medium px-8 py-3.5 text-sm transition-colors ${jost.className}`}
            >
              {data.tradeCta}
            </a>
            <Link
              href={lp("/inventory")}
              className={`inline-flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-8 py-3.5 text-sm transition-colors ${jost.className}`}
            >
              {data.secondaryCta}
            </Link>
          </div>
          {/* Internal links */}
          <div className={`flex flex-wrap gap-x-6 gap-y-1 mt-6 text-sm ${jost.className}`}>
            <Link href={lp("/inventory")} className="text-[#c89e3a] hover:underline">
              View natural diamond inventory
            </Link>
            <Link href={lp("/contact")} className="text-[#c89e3a] hover:underline">
              Contact Dalila Diamonds
            </Link>
            <a
              href="https://weekendvandeklant.be/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c89e3a] hover:underline"
            >
              Official Weekend van de Klant information
            </a>
            <a
              href="https://weekendvandeklant.be/ontdek-deelnemende-winkels-in-je-buurt/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c89e3a] hover:underline"
            >
              Find participating businesses
            </a>
          </div>
        </section>

        {/* Byline */}
        <p
          className={`text-xs text-gray-400 text-center mb-8 ${jost.className}`}
        >
          Prepared by Dalila Diamonds&apos; Antwerp sourcing team. Last reviewed:
          August 2026.
        </p>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-[#c89e3a]/30 bg-[#0B1A33] p-3">
        <a
          href="#booking-form"
          className={`block w-full text-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium py-3 text-sm tracking-[0.08em] uppercase ${jost.className}`}
        >
          {data.primaryCta}
        </a>
      </div>
    </main>
  );
}
