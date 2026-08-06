export interface SydFaqItem {
  question: string;
  answer: string;
}

export interface SydProcessStep {
  tag: string;
  title: string;
  paragraphs: string[];
}

export interface SydTextBlock {
  title: string;
  paragraphs: string[];
}

export interface SydContent {
  banner: {
    title: string;
    breadcrumbHome: string;
    breadcrumbServices: string;
    breadcrumbCurrent: string;
  };
  hero: {
    tagline: string;
    title: string;
    paragraphs: string[];
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText: string;
    secondaryButtonHref: string;
    trustIndicators: string[];
    notice: string;
    imageSrc: string;
    imageAlt: string;
    imageOverlay: string;
  };
  quickAnswer: {
    id: string;
    title: string;
    paragraphs: string[];
  };
  whatCanSubmit: {
    id: string;
    title: string;
    intro: string[];
    items: string[];
    closing: string[];
  };
  process: {
    id: string;
    title: string;
    imageSrc: string;
    imageAlt: string;
    imageOverlay: string;
    steps: SydProcessStep[];
  };
  valuation: {
    id: string;
    title: string;
    intro: string[];
    imageSrc: string;
    imageAlt: string;
    imageOverlay: string;
    items: SydTextBlock[];
  };
  whyAntwerp: {
    id: string;
    title: string;
    intro: string[];
    items: string[];
    closing: string[];
    imageSrc: string;
    imageAlt: string;
    imageOverlay: string;
  };
  prepare: {
    id: string;
    title: string;
    intro: string[];
    items: string[];
    closing: string[];
  };
  withoutCertificate: {
    id: string;
    title: string;
    paragraphs: string[];
  };
  appointments: {
    id: string;
    title: string;
    paragraphs: string[];
    imageSrc: string;
    imageAlt: string;
    imageOverlay: string;
  };
  submitSection: {
    id: string;
    title: string;
    paragraphs: string[];
    primaryButtonText: string;
    primaryButtonHref: string;
    notice: string;
  };
  faqs: {
    id: string;
    title: string;
    items: SydFaqItem[];
  };
}

const enContent: SydContent = {
  banner: {
    title: "SYD — Sell Your Diamond",
    breadcrumbHome: "Home",
    breadcrumbServices: "Our Services",
    breadcrumbCurrent: "Sell Your Diamond",
  },
  hero: {
    tagline: "SELL YOUR DIAMOND IN ANTWERP",
    title: "Sell Your Diamond in Antwerp, Belgium",
    paragraphs: [
      "Receive a confidential preliminary estimate for a loose natural diamond, diamond ring or eligible diamond jewellery. Submit the details you know, upload clear photographs and add the grading-report number if one is available. Our Antwerp team will review the information and explain the next step before any physical handover is arranged.",
    ],
    primaryButtonText: "Get a Free Estimate",
    primaryButtonHref: "#diamond-estimate-form",
    secondaryButtonText: "Book a Private Antwerp Appointment",
    secondaryButtonHref: "#private-antwerp-appointments",
    trustIndicators: [
      "Antwerp Diamond District",
      "Confidential Review",
      "GIA, IGI and HRD Reports Welcome",
      "No Account Required",
    ],
    notice:
      "A preliminary estimate is based on the information supplied online. A final offer can only be made after the diamond or jewellery has been physically examined and its details verified.",
    // Temporary asset until final WebP is supplied:
    // images/services/sell-your-diamond-antwerp.webp
    imageSrc: "/diamondcuts/sell-diamonds.jpg",
    imageAlt: "Natural diamond and ring prepared for a private Antwerp evaluation",
    imageOverlay: "SELL YOUR DIAMOND IN ANTWERP",
  },
  quickAnswer: {
    id: "where-can-i-sell-my-diamond",
    title: "Quick answer: where can I sell my diamond?",
    paragraphs: [
      "You can submit your natural diamond or diamond jewellery directly to an experienced diamond buyer in Antwerp. Begin by sharing the carat weight, shape, colour, clarity, grading report and photographs you have. After an initial review, eligible items can proceed to a private in-person assessment or, where available, an approved secure collection.",
      "The final selling price depends on the diamond itself—not simply the original receipt, an insurance replacement figure or a generic online calculator. The diamond’s identity, 4Cs, proportions, fluorescence, condition, documentation and current secondary-market demand all affect the offer.",
    ],
  },
  whatCanSubmit: {
    id: "what-can-you-submit",
    title: "What can you submit for evaluation?",
    intro: [
      "The service is designed for private sellers, families, collectors and trade contacts who want an informed review of:",
    ],
    items: [
      "Loose natural diamonds",
      "Certified natural diamonds with GIA, IGI or HRD reports",
      "Natural-diamond engagement and wedding rings",
      "Diamond earrings, pendants, necklaces and bracelets",
      "Inherited or estate diamond jewellery",
      "Multiple diamonds or eligible private collections",
    ],
    closing: [
      "If the item has no grading report, is mounted, contains coloured gemstones, has been treated or may be laboratory-grown, provide that information in the form. The team can confirm whether it is suitable for further assessment before you arrange a visit or shipment.",
    ],
  },
  process: {
    id: "how-selling-your-diamond-works",
    title: "How selling your diamond works",
    // Temporary asset until final WebP is supplied:
    // sell-your-diamond-five-steps.webp
    imageSrc: "/sell/diamondwork.png",
    imageAlt: "Five clear steps to sell your diamond through Dalila Diamonds",
    imageOverlay: "FIVE CLEAR STEPS",
    steps: [
      {
        tag: "1",
        title: "Tell us about the diamond",
        paragraphs: [
          "Complete the short estimate form with the information you know. Useful details include the item type, diamond shape, carat weight, colour, clarity, measurements, fluorescence and whether the stone is loose or mounted.",
          "You do not need to guess missing grades. If you are unsure, select “unknown” and upload clear photographs instead.",
        ],
      },
      {
        tag: "2",
        title: "Add photographs and the grading report",
        paragraphs: [
          "Upload a face-up photograph, a side view and a clear image or PDF of any GIA, IGI or HRD report. You can also enter the report number so the document can be checked against the information supplied.",
          "Photographs help with the first review, but they cannot establish a final grade, confirm every treatment or replace physical examination.",
        ],
      },
      {
        tag: "3",
        title: "Receive a preliminary review",
        paragraphs: [
          "The submitted details are reviewed to establish whether the diamond fits the service and what information is still needed. You will then receive guidance on the next step and, where possible, a preliminary estimate range.",
          "This stage should be described as an estimate rather than a binding offer because photography, mounting and incomplete documentation can conceal characteristics that affect value.",
        ],
      },
      {
        tag: "4",
        title: "Arrange physical evaluation",
        paragraphs: [
          "Eligible diamonds can be examined during a private appointment in Antwerp. Depending on the item, location and insurance eligibility, a secure collection may also be arranged after the preliminary review.",
          "Do not send a diamond or jewellery until the collection method, insurance limits, packaging requirements, identity checks and return terms have been confirmed in writing.",
        ],
      },
      {
        tag: "5",
        title: "Review the final offer and payment terms",
        paragraphs: [
          "After physical verification, you receive a clear final offer based on the assessed diamond, its documentation, condition and current market demand. The offer should also explain whether the metal or additional stones have been included.",
          "If you accept, payment is made by secure bank transfer after the required ownership, identity and banking checks are completed. The precise payment timing should be stated in the final offer.",
        ],
      },
    ],
  },
  valuation: {
    id: "how-is-a-diamond-valued",
    title: "How is a diamond valued when you sell it?",
    intro: ["A professional diamond evaluation considers more than carat weight."],
    // Temporary asset until final WebP is supplied:
    // sell-your-diamond-valuation-factors.webp
    imageSrc: "/selllSafe/tray.jpg",
    imageAlt: "Factors that affect a diamond selling offer during professional evaluation",
    imageOverlay: "WHAT AFFECTS YOUR OFFER?",
    items: [
      {
        title: "Natural origin and treatments",
        paragraphs: [
          "The evaluator must establish whether the stone is natural or laboratory-grown and identify any known colour or clarity treatments. These characteristics can materially change market value.",
        ],
      },
      {
        title: "Carat weight and measurements",
        paragraphs: [
          "Carat is the diamond’s weight. Measurements show its actual length, width and depth and help identify whether weight is distributed attractively or hidden below the setting.",
        ],
      },
      {
        title: "Colour and clarity",
        paragraphs: [
          "Colour and clarity are checked against recognised grading standards. Inclusion type, position, visibility and possible durability concerns can matter beyond the headline grade.",
        ],
      },
      {
        title: "Shape, cut and proportions",
        paragraphs: [
          "Shape affects market demand, while cut quality, proportions, polish and symmetry influence appearance. Fancy shapes also require visual checks for outline, bow tie, dark areas and face-up spread.",
        ],
      },
      {
        title: "Fluorescence and transparency",
        paragraphs: [
          "Fluorescence may influence marketability depending on its strength, colour and effect on appearance. Transparency, haziness and light performance are also assessed directly.",
        ],
      },
      {
        title: "Grading report and laser inscription",
        paragraphs: [
          "A GIA, IGI or HRD report can support identification and provide an established description of the stone. The report number, measurements and any laser inscription should correspond with the submitted diamond.",
        ],
      },
      {
        title: "Condition and setting",
        paragraphs: [
          "Chips, abrasions, damage, previous repolishing, loose settings and wear may affect the assessment. For mounted jewellery, the metal, craftsmanship and additional stones may be considered separately.",
        ],
      },
      {
        title: "Current secondary-market demand",
        paragraphs: [
          "An insurance replacement value, original retail price and current selling value answer different questions. GIA’s consumer guidance explains that fair-market assessment considers quality, availability and local desirability. The final offer therefore reflects the current market for the specific item, not simply what it originally cost.",
        ],
      },
    ],
  },
  whyAntwerp: {
    id: "why-choose-antwerp-evaluation",
    title: "Why choose a direct Antwerp diamond evaluation?",
    intro: [
      "Antwerp is a major centre for natural-diamond expertise and trade. A direct assessment gives the evaluator access to current market information and allows the diamond to be examined as an individual stone rather than valued from a photograph or generic price chart alone.",
      "With Dalila Diamonds, the process is designed around:",
    ],
    items: [
      "A confidential initial review",
      "A private Antwerp assessment where appropriate",
      "Clear separation between an online estimate and the final offer",
      "Review of recognised grading reports",
      "Explanation of the characteristics affecting the offer",
      "Secure bank-transfer payment after acceptance and required checks",
    ],
    closing: [
      "No responsible buyer can determine a final diamond value from one photograph. The purpose of the online form is to establish a useful starting point and avoid unnecessary travel or shipping before the item has been reviewed.",
    ],
    // Temporary asset until final WebP is supplied:
    // sell-your-diamond-physical-examination.webp
    imageSrc: "/sell/step_3.png",
    imageAlt: "Expert physical review of a natural diamond in Antwerp",
    imageOverlay: "EXPERT PHYSICAL REVIEW",
  },
  prepare: {
    id: "what-should-you-prepare",
    title: "What should you prepare?",
    intro: ["Providing complete information can make the initial review faster. Prepare:"],
    items: [
      "The GIA, IGI or HRD report, if available",
      "The report number and any laser-inscription details",
      "A face-up photograph in neutral daylight",
      "A clear side photograph showing the setting or diamond depth",
      "Photographs of any chips, damage or visible wear",
      "The approximate carat weight and diamond shape",
      "The original invoice, previous appraisal or service records, if available",
      "Information about treatments, repairs or repolishing",
    ],
    closing: [
      "Clean only with a safe, gentle method before taking photographs. Do not remove a stone from its setting or attempt to test it at home.",
    ],
  },
  withoutCertificate: {
    id: "selling-without-a-certificate",
    title: "Selling a diamond without a certificate",
    paragraphs: [
      "You can still submit an enquiry when a grading report is missing. Choose “No report” or “Unknown”, upload the best photographs available and explain what you know about the item.",
      "The team can then decide whether the diamond is suitable for physical evaluation and whether an independent laboratory report or other verification may be useful. Not every uncertified item will necessarily be eligible for purchase.",
    ],
  },
  appointments: {
    id: "private-antwerp-appointments",
    title: "Private Antwerp appointments and European collection",
    paragraphs: [
      "Sellers who can visit Antwerp may arrange a private assessment at Dalila Diamonds, Hoveniersstraat 30, 2018 Antwerp, Belgium. Appointment confirmation should be required before arrival so the appropriate specialist and equipment are available.",
      "For sellers elsewhere in Europe, collection availability should be confirmed after the initial review. Insurance limits, courier identity, packaging, ownership documents, delivery tracking and return conditions must be provided in writing before the item leaves the seller’s control.",
    ],
    // Temporary asset until final WebP is supplied:
    // sell-your-diamond-appointment-collection.webp
    imageSrc: "/selllSafe/loose.jpg",
    imageAlt: "Private Antwerp appointment or secure European diamond collection",
    imageOverlay: "VISIT OR REQUEST COLLECTION",
  },
  submitSection: {
    id: "ready-to-request-an-estimate",
    title: "Ready to request an estimate?",
    paragraphs: [
      "Submit the information you know and upload clear photographs of the diamond, jewellery and grading report. The first review will determine whether the item is suitable and explain the safest next step.",
    ],
    primaryButtonText: "Get a Free Diamond Estimate",
    primaryButtonHref: "#diamond-estimate-form",
    notice:
      "Do not ship or hand over a diamond until the evaluation method, insurance, identification requirements and written terms have been confirmed.",
  },
  faqs: {
    id: "frequently-asked-questions",
    title: "Frequently asked questions",
    items: [
      {
        question: "Where can I sell my diamond in Belgium?",
        answer:
          "You can submit the diamond to an experienced Antwerp buyer for a preliminary review followed by physical evaluation. Compare the process, documentation, insurance terms and final written offer before accepting a sale.",
      },
      {
        question: "Can I sell a diamond ring in Antwerp?",
        answer:
          "Yes, eligible natural-diamond rings can be submitted for review. The diamond and the setting may be assessed separately so you understand what has been included in the final offer.",
      },
      {
        question: "Do you buy loose natural diamonds?",
        answer:
          "Loose natural diamonds can be submitted with their carat weight, shape, grades, measurements, photographs and grading-report details. Acceptance depends on physical verification and current buying requirements.",
      },
      {
        question: "Can I sell my diamond without a certificate?",
        answer:
          "You may submit an enquiry without a certificate. Upload clear photographs and select “No report” or “Unknown”. The team will confirm whether physical evaluation or additional documentation is needed.",
      },
      {
        question: "Do you accept GIA, IGI and HRD reports?",
        answer:
          "Yes, GIA, IGI and HRD report details can be included with the submission. The report number and diamond characteristics are checked during evaluation.",
      },
      {
        question: "How is my diamond’s selling value calculated?",
        answer:
          "The assessment considers natural origin, treatments, carat, colour, clarity, shape, cut quality, fluorescence, transparency, condition, documentation and current secondary-market demand.",
      },
      {
        question: "Is the preliminary estimate free?",
        answer:
          "The current service offers a free initial estimate based on submitted information. The estimate is not a binding final offer and remains subject to physical examination.",
      },
      {
        question: "Do I need to visit Antwerp?",
        answer:
          "An in-person private evaluation is available in Antwerp. Depending on the item, seller location and insurance eligibility, an approved secure collection may be available after preliminary review.",
      },
      {
        question: "Is collection insured?",
        answer:
          "When a collection is approved, the courier, insurance limit, packaging process, tracking and return terms should be confirmed in writing before the item is released.",
      },
      {
        question: "How quickly will I be paid?",
        answer:
          "Payment timing is confirmed with the final offer. After acceptance and completion of required identity, ownership and banking checks, payment is made by secure bank transfer.",
      },
      {
        question: "Why is the offer different from my insurance valuation?",
        answer:
          "An insurance valuation estimates replacement cost, while a buyer’s offer reflects the item’s current secondary-market demand, condition and resale route. They are different valuation purposes and should not be expected to match.",
      },
      {
        question: "What photographs should I upload?",
        answer:
          "Upload a sharp face-up image, a side view, the complete jewellery item and close-ups of any damage or markings. Use neutral daylight and a plain background without applying filters.",
      },
    ],
  },
};

export function getSydContent(_locale?: string): SydContent {
  return enContent;
}

export const SYD_PAGE_TITLE = "Sell Your Diamond in Antwerp | Dalila Diamonds";

export const SYD_PAGE_DESCRIPTION =
  "Sell your diamond or diamond ring through a confidential Antwerp evaluation. Submit details for a free estimate, expert review and secure payment.";

export const SYD_CANONICAL_URL = "https://www.daliladiamonds.com/sell-your-diamond";

export const SYD_DATE_MODIFIED = "2026-08-06";

export const SYD_HERO_IMAGE_URL =
  "https://www.daliladiamonds.com/diamondcuts/sell-diamonds.jpg";

export const SYD_H1 = "Sell Your Diamond in Antwerp, Belgium";
