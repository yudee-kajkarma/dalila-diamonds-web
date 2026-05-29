import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Marcellus, Jost } from "next/font/google";
import type { DiamondData } from "@/types/diamond.types";
import {
  SITE_BASE_URL,
  diamondUrl,
  getDiamondFromSlug,
  h1Title,
  metaDescription,
  metaTitle,
  parsedCarat,
  realImageUrl,
  shapeName,
  shortTitle,
  type PublicDiamond,
} from "@/lib/diamonds";
import DiamondDetailPageClient from "./DiamondDetailPageClient";

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

export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

type Props = {
  params: Promise<{ slug: string }>;
};

// Coerces the public API shape into the internal DiamondData the existing
// DiamondDetailView expects. Fields the public endpoint doesn't expose
// (price, location, stage) get safe defaults; the existing UI already
// shows a login-required notice for pricing, so 0s are harmless.
function toDiamondData(d: PublicDiamond): DiamondData {
  const num = (v: unknown): number => {
    const n = Number.parseFloat(String(v ?? ""));
    return Number.isFinite(n) ? n : 0;
  };
  const str = (v: unknown): string => (v == null ? "" : String(v));
  return {
    _id: str(d.STONE_NO),
    STONE_NO: str(d.STONE_NO),
    SHAPE: str(d.SHAPE),
    CARATS: num(d.CARATS),
    COLOR: str(d.COLOR),
    CLARITY: str(d.CLARITY),
    CUT: str(d.CUT),
    POL: str(d.POL),
    SYM: str(d.SYM),
    FLOUR: str(d.FLOUR),
    LAB: str(d.LAB),
    // Prod inventory leaves REPORT_NO blank; mirror that so the Stock ID line
    // doesn't show "Report #: {stoneNo}" duplicated next to Stock ID.
    REPORT_NO: "",
    REPORT_DATE: str(d.REPORT_DATE),
    TABLE_PER: num(d.TABLE_PER),
    DEPTH_PER: num(d.DEPTH_PER),
    CROWN_ANGLE: num(d.CROWN_ANGLE),
    CROWN_HEIGHT: num(d.CROWN_HEIGHT),
    PAVILLION_ANGLE: num(d.PAVILLION_ANGLE),
    PAVILLION_HEIGHT: num(d.PAVILLION_HEIGHT),
    RAP_PRICE: 0,
    DISC_PER: 0,
    NET_VALUE: 0,
    LOCATION: "",
    STAGE: "",
    LENGTH: str(d.LENGTH),
    WIDTH: str(d.WIDTH),
    DEPTH: str(d.DEPTH),
    RATIO: str(d.RATIO),
    REAL_IMAGE: str(d.REAL_IMAGE),
    MP4: str(d.MP4),
    COMMENTS_1: str(d.COMMENTS_1),
    sourceType: str((d as Record<string, unknown>).sourceType),
    diamondId: str((d as Record<string, unknown>).diamondId),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const diamond = await getDiamondFromSlug(slug);
  if (!diamond) {
    return {
      title: "Diamond Not Found | Dalila Diamonds",
      robots: { index: false, follow: false },
    };
  }
  const canonical = diamondUrl(diamond);
  const title = metaTitle(diamond);
  const description = metaDescription(diamond);
  const image = realImageUrl(diamond) ?? `${SITE_BASE_URL}/dalila_img/Dalila_Logo.png`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Dalila Diamonds",
      type: "website",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function DiamondDetailPage({ params }: Props) {
  const { slug } = await params;
  const diamond = await getDiamondFromSlug(slug);
  if (!diamond) notFound();

  const carat = parsedCarat(diamond);
  const shape = shapeName(diamond.SHAPE);
  const color = (diamond.COLOR ?? "").trim();
  const clarity = (diamond.CLARITY ?? "").trim();
  const polish = (diamond.POL ?? "").trim();
  const symmetry = (diamond.SYM ?? "").trim();
  const fluor = (diamond.FLOUR ?? "").trim();
  const ratio = (diamond.RATIO ?? "").trim();
  const lab = (diamond.LAB ?? "").trim();
  const stoneNo = (diamond.STONE_NO ?? "").trim();
  const certificateNo = stoneNo;
  const image = realImageUrl(diamond);
  const canonical = diamondUrl(diamond);

  const faqs: { q: string; a: string }[] = [
    {
      q: "Is this a natural diamond?",
      a: `Yes, this is a natural diamond. The product specifications show it as a certified natural diamond with grading details from ${lab}.`,
    },
    { q: "What is the carat weight of this diamond?", a: `This diamond weighs ${carat} carats.` },
    { q: "What shape is this diamond?", a: `This diamond is a ${shape} shaped natural diamond.` },
    { q: "What colour grade is this diamond?", a: `This diamond has a ${color} colour grade.` },
    { q: "What clarity grade is this diamond?", a: `This diamond has a ${clarity} clarity grade.` },
    {
      q: "Is this diamond certified?",
      a: `Yes, this diamond is certified by ${lab}. The certificate number is ${certificateNo}.`,
    },
    {
      q: `What does ${clarity} clarity mean?`,
      a: `${clarity} clarity describes the level of internal and external characteristics visible in the diamond under grading conditions. It helps buyers understand the diamond's purity and overall visual quality.`,
    },
    {
      q: "Is this diamond suitable for an engagement ring?",
      a: `Yes, this ${carat} carat ${shape} natural diamond can be suitable for an engagement ring, depending on the chosen setting, metal, design style, and personal preference.`,
    },
    {
      q: "What does fluorescence mean in this diamond?",
      a: `Fluorescence describes how a diamond may react under ultraviolet light. This diamond has ${fluor} fluorescence.`,
    },
    {
      q: "How can I enquire about this diamond?",
      a: `You can contact Dalila Diamonds with the Stock ID ${stoneNo} or Certificate Number ${certificateNo} to request pricing, availability, and further details.`,
    },
  ];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: shortTitle(diamond),
    description: metaDescription(diamond),
    url: canonical,
    sku: stoneNo,
    brand: { "@type": "Brand", name: "Dalila Diamonds" },
    ...(image ? { image: [image] } : {}),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Carat", value: carat },
      { "@type": "PropertyValue", name: "Shape", value: shape },
      { "@type": "PropertyValue", name: "Colour", value: color },
      { "@type": "PropertyValue", name: "Clarity", value: clarity },
      polish ? { "@type": "PropertyValue", name: "Polish", value: polish } : null,
      symmetry ? { "@type": "PropertyValue", name: "Symmetry", value: symmetry } : null,
      fluor ? { "@type": "PropertyValue", name: "Fluorescence", value: fluor } : null,
      ratio ? { "@type": "PropertyValue", name: "Ratio", value: ratio } : null,
      lab ? { "@type": "PropertyValue", name: "Certification Lab", value: lab } : null,
      { "@type": "PropertyValue", name: "Certificate Number", value: certificateNo },
      { "@type": "PropertyValue", name: "Stock ID", value: stoneNo },
    ].filter(Boolean),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Inventory", item: `${SITE_BASE_URL}/inventory` },
      { "@type": "ListItem", position: 3, name: shortTitle(diamond), item: canonical },
    ],
  };

  const seoBlock = (
    <section className="bg-white px-6 py-12 max-w-[1400px] mx-auto">
      <h1
        className={`text-2xl md:text-3xl text-[#1a1a1a] leading-tight mb-8 ${marcellus.className}`}
      >
        {h1Title(diamond)}
      </h1>

      <div className={`space-y-5 text-gray-800 leading-relaxed ${jost.className}`}>
        <p>
          This {carat} carat {shape} natural diamond is selected for buyers who want a genuine
          earth-formed diamond with verified specifications and reliable certification. With a{" "}
          {color} colour grade, {clarity} clarity grade, {polish} polish, and {symmetry} symmetry,
          this diamond offers a balanced combination of beauty, quality, and value for jewellery
          designers, retailers, and private buyers looking for a certified natural diamond.
        </p>
        <p>
          The {shape} shape gives this diamond its distinctive visual character, making it
          suitable for a wide range of fine jewellery designs, including engagement rings,
          solitaire rings, pendant settings, bespoke jewellery pieces, and luxury diamond
          collections. Its {carat} carat weight makes it a practical choice for buyers searching
          for a natural diamond that feels meaningful in size while still offering flexibility
          across different design styles.
        </p>
        <p>
          This diamond is certified by {lab}, giving buyers added confidence in its grading,
          origin, and quality details. The report confirms important specifications such as carat
          weight, colour, clarity, polish, symmetry, fluorescence, and measurements. For trade
          professionals and serious diamond buyers, certification is an important part of
          transparent sourcing because it helps compare diamonds accurately and make informed
          purchasing decisions.
        </p>
        <p>
          With {clarity} clarity, this diamond offers a refined appearance under normal viewing
          conditions. Its {color} colour grade gives it a natural tone that can work beautifully
          in the right metal setting and design style. The {polish} polish grade reflects the
          quality of the diamond&rsquo;s surface finish, while the {symmetry} symmetry grade
          indicates how well the facets align to support the diamond&rsquo;s overall visual
          performance.
        </p>
        <p>
          The diamond has {fluor} fluorescence and a ratio of {ratio}, helping buyers understand
          how it may appear in different lighting and setting styles. For buyers comparing similar
          natural diamonds, these details can help determine whether the stone is best suited for
          a classic engagement ring, an elegant pendant, a custom jewellery design, or a trade
          inventory requirement.
        </p>
        <p>
          At Dalila Diamonds, we focus on certified natural diamonds for buyers who value
          authenticity, transparency, and professional sourcing. This {carat} carat {shape}{" "}
          natural diamond is part of our curated inventory for customers looking for dependable
          quality and clear product information before making a purchase decision.
        </p>
      </div>

      <div className="mt-10 p-6 bg-[#FAF6EB] border border-gray-200">
        <h2 className={`text-xl text-[#1a1a1a] mb-3 ${marcellus.className}`}>Product Summary</h2>
        <p className={`text-gray-800 leading-relaxed ${jost.className}`}>
          This is a {carat} carat {shape} natural diamond with {color} colour and {clarity}{" "}
          clarity, certified by {lab}. It features {polish} polish, {symmetry} symmetry, {fluor}{" "}
          fluorescence, and a ratio of {ratio}. This diamond is suitable for buyers looking for a
          certified natural diamond for engagement rings, fine jewellery, bespoke designs, or
          professional diamond sourcing.
        </p>
      </div>

      <div className="mt-10">
        <h2 className={`text-2xl text-[#1a1a1a] mb-3 ${marcellus.className}`}>
          Why Choose This {shape} Natural Diamond?
        </h2>
        <p className={`text-gray-800 leading-relaxed mb-4 ${jost.className}`}>
          This {shape} natural diamond is a strong option for buyers who want a certified
          earth-formed diamond with clearly listed grading details. Its {carat} carat weight gives
          it presence, while the {color} colour and {clarity} clarity combination allows buyers to
          assess both appearance and value. The {lab} certification adds trust, making it easier
          to compare this diamond with other certified stones before purchase.
        </p>
        <p className={`text-gray-800 leading-relaxed ${jost.className}`}>
          For jewellers, retailers, and designers, this diamond can be used in custom jewellery,
          made-to-order engagement rings, premium stock collections, or client-specific sourcing.
          For private buyers, it offers a transparent way to review the diamond&rsquo;s core
          quality factors before speaking with a diamond expert.
        </p>
      </div>

      <div className="mt-10">
        <h2 className={`text-2xl text-[#1a1a1a] mb-3 ${marcellus.className}`}>
          Certified Natural Diamond With Transparent Details
        </h2>
        <p className={`text-gray-800 leading-relaxed mb-4 ${jost.className}`}>
          Every natural diamond has its own character, and this {carat} carat {shape} diamond is
          described with clear specifications so buyers can make a confident decision. The {lab}{" "}
          certificate supports the grading information and helps confirm the diamond&rsquo;s
          important quality characteristics.
        </p>
        <p className={`text-gray-800 leading-relaxed ${jost.className}`}>
          Unlike generic listings, this product page gives buyers the details they usually search
          for before enquiring: carat weight, diamond shape, colour grade, clarity grade, polish,
          symmetry, fluorescence, ratio, laboratory certification, and stock reference. This makes
          the buying process more transparent and helps both trade and private customers compare
          options more easily.
        </p>
      </div>

      <div className="mt-10">
        <h2 className={`text-2xl text-[#1a1a1a] mb-6 ${marcellus.className}`}>
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((f) => (
            <div key={f.q} className="border border-gray-200 p-5">
              <h3 className={`text-lg text-[#1a1a1a] mb-2 ${marcellus.className}`}>{f.q}</h3>
              <p className={`text-gray-700 leading-relaxed ${jost.className}`}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <DiamondDetailPageClient diamond={toDiamondData(diamond)} extraContent={seoBlock} />
    </>
  );
}
