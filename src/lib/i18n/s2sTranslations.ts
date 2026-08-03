export interface S2sFaqItem {
  question: string;
  answer: string;
}

export interface S2sBenefitCard {
  title: string;
  description: string;
}

export interface S2sAudienceCard {
  title: string;
  description: string;
}

export interface S2sComparisonColumn {
  title: string;
  intro: string;
  points: string[];
  buttonText: string;
  buttonHref: string;
}

export interface S2sStep {
  tag: string;
  title: string;
  text: string;
  bullets?: string[];
  note?: string;
  buttonText?: string;
  buttonHref?: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
}

export interface S2sContent {
  hero: {
    tagline: string;
    title: string;
    subheading: string;
    subheadingSecondary: string;
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText: string;
    secondaryButtonHref: string;
    trustIndicators: string[];
    imageAlt: string;
  };
  directAnswer: {
    title: string;
    paragraphs: string[];
    quickAnswer: string;
  };
  steps: S2sStep[];
  whoIsFor: {
    title: string;
    cards: S2sAudienceCard[];
  };
  benefits: {
    title: string;
    cards: S2sBenefitCard[];
  };
  comparison: {
    title: string;
    s2s: S2sComparisonColumn;
    ds4u: S2sComparisonColumn;
  };
  checklist: {
    title: string;
    intro: string;
    items: string[];
  };
  faqs: {
    title: string;
    items: S2sFaqItem[];
  };
  finalCta: {
    title: string;
    text: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    buttonHref: string;
  };
  form: {
    tag: string;
    title: string;
    subtitle: string;
    submitText: string;
    submittingText: string;
    successMessage: string;
    errorMessage: string;
    labels: {
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
      fileUpload: string;
    };
  };
  banner: {
    title: string;
    breadcrumbHome: string;
    breadcrumbCurrent: string;
  };
}

const enContent: S2sContent = {
  hero: {
    tagline: "S2S – SECURE TO SOURCE",
    title: "Secure Diamond Sourcing for Loose Natural Diamonds",
    subheading:
      "Found a loose natural diamond on a trusted online platform? Dalila Diamonds helps professional buyers coordinate quality control, euro payment and scheduled delivery to Belgium or other EU countries.",
    subheadingSecondary:
      "Choose the diamond online. Share its details with us. We help make the sourcing process clearer, safer and easier to manage.",
    primaryButtonText: "Start Your S2S Request",
    primaryButtonHref: "/contact",
    secondaryButtonText: "How S2S Works",
    secondaryButtonHref: "#how-s2s-works",
    trustIndicators: [
      "Antwerp diamond expertise",
      "Independent grading reports",
      "Euro payments",
      "EU delivery",
    ],
    imageAlt: "Loose natural diamonds prepared for secure sourcing",
  },
  directAnswer: {
    title: "What Is the S2S Diamond Sourcing Service?",
    paragraphs: [
      "S2S – Secure To Source is a diamond sourcing service for buyers who have already shortlisted a loose natural diamond on a trusted online trading platform and want professional support with the next steps.",
      "Instead of searching on your behalf, S2S helps you coordinate independent quality control, euro payment and scheduled delivery to Belgium or other EU destinations. You retain control over which stone you select online, while Dalila Diamonds adds Antwerp-based trade expertise to help the process run more smoothly.",
      "This service is designed for jewellers, retailers, wholesalers and trade buyers who regularly source certified loose diamonds online and want a clearer workflow for cross-border purchases. If you prefer to buy from our own stock, you can browse loose natural diamonds in our inventory. If you need a stone sourced to your exact specifications from our global network, explore custom diamond sourcing through DS4U.",
      "Before submitting a request, it helps to review the independent grading report and understand how laboratories such as GIA, IGI and HRD describe the diamond's quality. Our diamond knowledge resources can help you interpret certificate details with more confidence.",
    ],
    quickAnswer:
      "S2S helps you shortlist a loose natural diamond online, then coordinates independent quality control, euro payment and scheduled delivery to Belgium or the EU through Dalila Diamonds in Antwerp.",
  },
  steps: [
    {
      tag: "Step 1",
      title: "Browse and Shortlist a Diamond Online",
      text: "Start by choosing a loose natural diamond on a trusted online platform that lists clear specifications and an independent grading report.",
      bullets: [
        "Browse trusted online diamond platforms at your own pace",
        "Compare carat, colour, clarity, cut, fluorescence and listed price",
        "Confirm the stone has an independent grading report from GIA, IGI, HRD or another recognised laboratory",
        "Note the listing URL, stock number and report number before you contact us",
      ],
      buttonText: "Submit a Shortlisted Diamond",
      buttonHref: "/contact",
      imageSrc: "/secure_to_source/Browse_online_platforms.jpg",
      imageAlt: "Buyer browsing loose natural diamonds on an online platform",
      imagePosition: "left",
    },
    {
      tag: "Step 2",
      title: "We Coordinate Quality Control",
      text: "Once you share the shortlisted diamond details, our Antwerp team helps coordinate quality control so the stone can be reviewed against the listed specifications and independent grading report before payment is confirmed.",
      bullets: [
        "We review the listing details you provide, including shape, carat, colour, clarity and certificate information",
        "Quality control focuses on whether the diamond matches the description shown online and in the independent grading report",
        "We help you understand any practical considerations before you proceed",
      ],
      note:
        "Quality control is based on the independent grading report and listing information you provide. Dalila Diamonds does not replace laboratory certification — we help you assess whether the shortlisted stone aligns with the report and your requirements before you commit.",
      imageSrc: "/secure_to_source/close-up.jpg",
      imageAlt: "Diamond being examined during quality control",
      imagePosition: "right",
    },
    {
      tag: "Step 3",
      title: "Confirm Payment and Secure Delivery",
      text: "After you confirm the shortlisted diamond, we help coordinate euro payment and scheduled shipment to your chosen destination in Belgium or elsewhere in the EU.",
      bullets: [
        "Euro payment can be arranged for your convenience",
        "Weekly shipments from India, excluding Indian public holidays",
        "Orders placed by Wednesday evening are typically scheduled for expected delivery in Belgium the following Wednesday",
        "Delivery to Belgium and other EU countries can be arranged; EU destinations outside Belgium may involve an additional shipping fee",
        "Shipment timing depends on platform processing, quality control and logistics — we communicate scheduled delivery expectations clearly",
      ],
      buttonText: "Request S2S Assistance",
      buttonHref: "/contact",
      imageSrc: "/secure_to_source/flight.jpg",
      imageAlt: "Secure international diamond shipment",
      imagePosition: "left",
    },
  ],
  whoIsFor: {
    title: "Who Is S2S For?",
    cards: [
      {
        title: "Jewellers & Retailers",
        description:
          "Buyers who find a specific loose natural diamond online for a client order and want Antwerp-based support with quality control and scheduled EU delivery.",
      },
      {
        title: "Wholesale & Trade Buyers",
        description:
          "Professionals sourcing certified loose diamonds from online platforms who prefer euro payment and a clearer cross-border workflow.",
      },
      {
        title: "Designers & Manufacturers",
        description:
          "Teams that already selected a stone online and need help coordinating verification, payment and expected delivery to Belgium or the EU.",
      },
      {
        title: "Buyers with a Shortlist Ready",
        description:
          "Anyone who has already identified a listing with an independent grading report and wants to submit an S2S request for assistance.",
      },
    ],
  },
  benefits: {
    title: "Why Choose S2S?",
    cards: [
      {
        title: "Euro payment",
        description: "Pay in euros for a straightforward cross-border purchasing experience.",
      },
      {
        title: "Expert quality control",
        description:
          "Antwerp-based expertise helps you review a shortlisted stone against its independent grading report and listing details.",
      },
      {
        title: "Weekly shipments",
        description:
          "Regular weekly shipments from India, excluding Indian public holidays, support predictable sourcing cycles.",
      },
      {
        title: "Delivery to Belgium",
        description:
          "Scheduled delivery to Belgium is a core part of the S2S workflow for professional buyers in the local market.",
      },
      {
        title: "EU shipping",
        description:
          "Delivery to other EU countries can be arranged; additional shipping fees may apply outside Belgium.",
      },
      {
        title: "Antwerp support",
        description:
          "Work with a natural diamond supplier based in Antwerp, one of the world's recognised diamond trading centres.",
      },
    ],
  },
  comparison: {
    title: "S2S versus DS4U",
    s2s: {
      title: "S2S",
      intro: "Secure To Source is for buyers who have already found a diamond on an external online platform.",
      points: [
        "You choose the listing yourself",
        "Ideal when the stone is already shortlisted online",
        "We coordinate quality control, euro payment and scheduled delivery",
        "Best for platform-based loose natural diamond sourcing",
      ],
      buttonText: "Use Secure To Source",
      buttonHref: "/contact",
    },
    ds4u: {
      title: "DS4U",
      intro: "Diamond Source For You is for buyers who want Dalila to search for a diamond to your specifications.",
      points: [
        "You share your required specifications",
        "We search through our exclusive global network",
        "Useful for rare sizes, shapes or quality combinations",
        "Best for custom diamond sourcing rather than a fixed online listing",
      ],
      buttonText: "Explore Diamond Source For You",
      buttonHref: "/diamond-source",
    },
  },
  checklist: {
    title: "S2S Shortlist Checklist",
    intro:
      "Gather these details before you submit an S2S request. Complete information helps us review your shortlisted diamond more efficiently.",
    items: [
      "Independent grading report details (GIA, IGI, HRD or equivalent)",
      "Listing URL from the online platform",
      "Stock or listing number",
      "Report number on the certificate",
      "Listed price in the currency shown on the platform",
      "Intended delivery destination in Belgium or the EU",
      "Your company and contact details",
      "Listing screenshots or supporting files, if available",
    ],
  },
  faqs: {
    title: "Frequently Asked Questions About S2S",
    items: [
      {
        question: "What does diamond sourcing mean?",
        answer:
          "Diamond sourcing is the process of finding, reviewing and purchasing a diamond that meets defined requirements such as shape, carat weight, colour, clarity, cut, grading report and budget. It may also include documentation review, quality control, payment and delivery coordination.",
      },
      {
        question: "What is S2S – Secure To Source?",
        answer:
          "S2S is Dalila Diamonds' service for professional buyers who have already found a loose natural diamond online. The buyer shares the selected diamond details, and Dalila Diamonds coordinates the applicable quality-control, payment and delivery process.",
      },
      {
        question: "Does Dalila Diamonds choose the diamond through S2S?",
        answer:
          "No. With S2S, the buyer finds or shortlists the diamond. Buyers who want Dalila Diamonds to search for suitable options should use DS4U – Diamond Source For You.",
      },
      {
        question: "Where can I find a diamond for an S2S request?",
        answer:
          "You can browse a trusted online diamond platform and send Dalila Diamonds the relevant listing, stock number and grading-report information. The ability to proceed depends on the platform, supplier, diamond availability and transaction requirements.",
      },
      {
        question: "Does S2S cover natural or lab-grown diamonds?",
        answer:
          "The S2S service is positioned around sourcing loose natural diamonds. Buyers should confirm the diamond type and service availability with Dalila Diamonds before completing an order.",
      },
      {
        question: "What diamond details should I submit?",
        answer:
          "Send the listing link or stock number, shape, carat weight, colour, clarity, cut information, grading laboratory, report number, fluorescence, listed price and required delivery destination.",
      },
      {
        question: "Does Dalila Diamonds check the grading report?",
        answer:
          "Dalila Diamonds reviews the grading information available for the selected stone as part of the applicable quality-control process. The exact verification possible depends on the diamond, report, supplier and transaction.",
      },
      {
        question: "Can I pay for the diamond in euros?",
        answer:
          "Yes. Euro payment is available for confirmed S2S transactions. Payment instructions, the diamond price and applicable service charges are supplied before the order proceeds.",
      },
      {
        question: "How quickly can a diamond arrive in Belgium?",
        answer:
          "Orders completed by Wednesday evening are generally scheduled to arrive in Belgium by the following Wednesday. Timing remains subject to confirmation, supplier availability, public holidays, carrier schedules and other external circumstances.",
      },
      {
        question: "Can Dalila Diamonds deliver the diamond outside Belgium?",
        answer:
          "Delivery to other EU countries can be arranged for an additional fee. Availability, cost, documentation and the expected delivery schedule are confirmed for each destination.",
      },
      {
        question: "Is there an additional fee for S2S?",
        answer:
          "Yes. An S2S service fee applies, and delivery outside Belgium may require an additional shipping fee. The applicable charges are confirmed before payment.",
      },
      {
        question: "Can I submit several diamonds for comparison?",
        answer:
          "Yes. Buyers can submit several shortlisted diamonds with their listings and available grading information. Dalila Diamonds can review the submitted details before the next step is confirmed.",
      },
      {
        question: "Is S2S available for jewellers and diamond professionals?",
        answer:
          "Yes. S2S is designed for jewellers, manufacturers, diamond dealers, designers and other professional buyers who source loose natural diamonds online.",
      },
      {
        question: "What happens if the shortlisted diamond is unavailable?",
        answer:
          "Online diamond availability can change quickly. If the stone is no longer available, the buyer may submit another shortlisted diamond or use DS4U to request help finding a suitable alternative.",
      },
    ],
  },
  finalCta: {
    title: "Ready to Shortlist Your Diamond?",
    text:
      "Share your shortlisted loose natural diamond details and our Antwerp team will help you coordinate the next steps. You can also contact us directly if you prefer to discuss your request first.",
    primaryButtonText: "Submit Your Diamond",
    secondaryButtonText: "Contact Dalila Diamonds",
    buttonHref: "/contact",
  },
  form: {
    tag: "S2S Request",
    title: "Submit Your Shortlisted Diamond",
    subtitle:
      "Share the listing and contact details below so we can review your S2S request and respond with the next steps.",
    submitText: "Submit S2S Request",
    submittingText: "Submitting...",
    successMessage: "Your S2S request has been submitted. We will contact you shortly.",
    errorMessage: "Failed to submit your request. Please try again or contact us directly.",
    labels: {
      fullName: "Full name *",
      companyName: "Company name *",
      email: "Email address *",
      phone: "Phone number *",
      country: "Country *",
      platform: "Online platform *",
      listingUrl: "Listing URL *",
      stockNumber: "Stock number",
      reportNumber: "Report number *",
      listedPrice: "Listed price",
      deliveryDestination: "Delivery destination *",
      message: "Message",
      fileUpload: "File upload (optional)",
    },
  },
  banner: {
    title: "S2S – Secure To Source",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "S2S – Secure To Source",
  },
};

const contentByLocale: Record<string, S2sContent> = {
  en: enContent,
};

export function getS2sContent(locale: string): S2sContent {
  const normLocale = locale || "en";
  return contentByLocale[normLocale] || contentByLocale.en;
}

export const S2S_PAGE_TITLE =
  "Diamond Sourcing Service in Antwerp | Dalila Diamonds";

export const S2S_PAGE_DESCRIPTION =
  "Shortlist a loose natural diamond online and let Dalila Diamonds coordinate quality control, euro payment and secure delivery to Belgium or another EU country.";

export const S2S_CANONICAL_URL =
  "https://www.daliladiamonds.com/secure-to-source";
