export interface Ds4uFaqItem {
  question: string;
  answer: string;
}

export interface Ds4uComparisonColumn {
  title: string;
  points: string[];
  buttonText?: string;
  buttonHref?: string;
}

export interface Ds4uProcessStep {
  tag: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Ds4uTextBlock {
  title: string;
  paragraphs: string[];
}

export interface Ds4uContent {
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
    imageSrc: string;
    imageAlt: string;
  };
  whatIs: {
    id: string;
    title: string;
    paragraphs: string[];
  };
  whenToUse: {
    id: string;
    title: string;
    intro: string[];
    items: string[];
    closing: string[];
  };
  comparison: {
    id: string;
    title: string;
    intro: string;
    ds4u: Ds4uComparisonColumn;
    s2s: Ds4uComparisonColumn;
    closing: string[];
    s2sLinkHref: string;
    s2sLinkText: string;
  };
  process: {
    id: string;
    title: string;
    imageSrc: string;
    imageAlt: string;
    steps: Ds4uProcessStep[];
  };
  requestTypes: {
    id: string;
    title: string;
    imageSrc: string;
    imageAlt: string;
    cards: Ds4uTextBlock[];
  };
  beyond4cs: {
    id: string;
    title: string;
    imageSrc: string;
    imageAlt: string;
    items: Ds4uTextBlock[];
  };
  certification: {
    id: string;
    title: string;
    paragraphs: string[];
  };
  pricing: {
    id: string;
    title: string;
    paragraphs: string[];
  };
  antwerp: {
    id: string;
    title: string;
    paragraphs: string[];
  };
  whyDalila: {
    id: string;
    title: string;
    paragraphs: string[];
  };
  submitSection: {
    id: string;
    title: string;
    paragraphs: string[];
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText: string;
    secondaryButtonHref: string;
    notice: string;
  };
  faqs: {
    id: string;
    title: string;
    items: Ds4uFaqItem[];
  };
  form: {
    id: string;
    tag: string;
    title: string;
    subtitle: string;
    submitText: string;
    submittingText: string;
    successTitle: string;
    successMessage: string;
    errorMessage: string;
    privacyLabel: string;
    privacyLinkText: string;
    privacyHref: string;
    fileFormatsNote: string;
    buyerTypes: string[];
    currencies: string[];
    labels: {
      fullName: string;
      companyName: string;
      buyerType: string;
      email: string;
      phone: string;
      country: string;
      shape: string;
      carat: string;
      colour: string;
      clarity: string;
      budget: string;
      currency: string;
      deliveryDestination: string;
      requiredDate: string;
      privacyConsent: string;
      cut: string;
      polish: string;
      symmetry: string;
      fluorescence: string;
      length: string;
      width: string;
      depth: string;
      lengthToWidthRatio: string;
      lab: string;
      quantity: string;
      jewelleryUse: string;
      reportNumber: string;
      additionalRequirements: string;
      fileUpload: string;
    };
  };
}

const enContent: Ds4uContent = {
  banner: {
    title: "DS4U — Diamond Source For You",
    breadcrumbHome: "Home",
    breadcrumbServices: "Our Services",
    breadcrumbCurrent: "Diamond Source For You",
  },
  hero: {
    tagline: "DS4U — DIAMOND SOURCE FOR YOU",
    title: "Custom Natural Diamond Sourcing in Antwerp",
    paragraphs: [
      "Finding the right natural diamond is not always as simple as choosing a shape, carat weight, colour and clarity from an online inventory. Your requirement may involve precise dimensions, a particular length-to-width ratio, a preferred grading laboratory, limited fluorescence or a pair of diamonds that must look balanced together.",
      "DS4U—Diamond Source For You—is Dalila Diamonds’ custom diamond sourcing service for these more specific requirements. Tell us what you need, and Dalila will search its established diamond network for suitable natural diamonds that match your specifications, intended jewellery design, budget and deadline as closely as possible.",
      "Whether you are searching for a centre stone for a bespoke engagement ring, an uncommon fancy shape, a matched pair for earrings or a diamond that is not available in the current inventory, DS4U gives you a more focused way to continue the search.",
    ],
    primaryButtonText: "SUBMIT YOUR DIAMOND REQUEST",
    primaryButtonHref: "#diamond-request-form",
    secondaryButtonText: "BROWSE CURRENT INVENTORY",
    secondaryButtonHref: "/inventory",
    trustIndicators: [
      "Antwerp-based sourcing",
      "Natural-diamond focus",
      "Exact-specification requests",
      "Written quotations",
    ],
    // Temporary asset until final WebP is supplied:
    // custom-natural-diamond-sourcing-antwerp.webp
    imageSrc: "/diamonds_source/diamondsourceforyou.jpg",
    imageAlt: "Custom natural diamond sourcing consultation in Antwerp",
  },
  whatIs: {
    id: "what-is-ds4u",
    title: "What Is DS4U?",
    paragraphs: [
      "DS4U stands for Diamond Source For You. It is a personalised natural diamond sourcing service built around an individual buyer’s requirement rather than a fixed list of available stones.",
      "Instead of spending time comparing hundreds of loosely related listings, you can submit one detailed sourcing brief. Dalila will then look for available natural diamonds that meet the most important parts of that brief. The search can extend beyond the diamonds currently shown in Dalila’s certified diamond inventory.",
      "The service can be used when you already know exactly what you need or when you understand the final jewellery design but need help translating that design into suitable diamond specifications. If your budget is fixed, you can also explain which characteristics are essential and where some flexibility is possible.",
      "For example, you may require an oval natural diamond with a narrow carat range and a specific length-to-width ratio. Another project may require two pear-shaped diamonds with closely matched measurements, colour, outline and brilliance. DS4U allows the search to begin with these practical details instead of relying only on broad inventory filters.",
      "A sourcing request starts a professional search. It does not guarantee that an exact diamond will be available, and you are not required to accept a stone that falls outside your approved requirements.",
    ],
  },
  whenToUse: {
    id: "when-to-use-custom-diamond-sourcing",
    title: "When Should You Use a Custom Diamond Sourcing Service?",
    intro: [
      "Custom diamond sourcing is most useful when ordinary inventory filters do not describe the complete requirement.",
      "Two diamonds can carry the same shape, carat, colour and clarity grades while looking noticeably different. Their visible dimensions, outline, proportions, inclusion placement, fluorescence and faceting can all affect whether they suit a particular client or jewellery design.",
      "DS4U may be suitable when you need:",
    ],
    items: [
      "A natural diamond within a tightly defined carat range",
      "Exact minimum or maximum measurements",
      "A particular length-to-width ratio",
      "A rare or less commonly available diamond shape",
      "A matched pair for earrings or side stones",
      "A GIA, IGI or HRD grading-report preference",
      "A large natural diamond with specific characteristics",
      "A diamond for an approved bespoke jewellery design",
      "A replacement stone that must fit an existing setting",
      "A combination that is difficult to find in public inventory",
    ],
    closing: [
      "The service can also help when you have found several possible diamonds but are unsure which specifications should take priority. In that situation, provide the intended jewellery use, visual preference, budget and deadline. This gives Dalila a clearer commercial and practical brief for the search.",
    ],
  },
  comparison: {
    id: "ds4u-or-secure-to-source",
    title: "DS4U or Secure To Source: Which Service Do You Need?",
    intro:
      "Dalila offers DS4U and Secure To Source for different types of diamond purchasing.",
    ds4u: {
      title: "DS4U — Diamond Source For You",
      points: [
        "Custom search for a particular diamond or matched set",
        "Suitable for one-off or bespoke requirements",
        "Focuses on exact specifications and visual requirements",
        "Useful for rare shapes, matched pairs and precise dimensions",
        "Begins with an individual diamond brief",
      ],
    },
    s2s: {
      title: "S2S — Secure To Source",
      points: [
        "Structured B2B natural-diamond procurement",
        "Suitable for ongoing or repeat purchasing",
        "Focuses on supply, documentation and commercial terms",
        "Useful for retailers, manufacturers and wholesalers",
        "Begins with a broader procurement and business brief",
      ],
      buttonText: "Explore Secure To Source",
      buttonHref: "/premium-b2b-diamond-supplier-belgium",
    },
    closing: [
      "If you require one specific natural diamond, an uncommon shape, a matched pair or tightly controlled dimensions, DS4U is the more appropriate service.",
      "If your business requires ongoing natural-diamond supply, repeat orders, commercial parcels or a structured procurement relationship, use Dalila’s Secure To Source service.",
    ],
    s2sLinkHref: "/premium-b2b-diamond-supplier-belgium",
    s2sLinkText: "Secure To Source service",
  },
  process: {
    id: "how-custom-diamond-sourcing-works",
    title: "How Custom Diamond Sourcing Works",
    // Temporary asset until final WebP is supplied:
    // ds4u-diamond-sourcing-process.webp
    imageSrc: "/diamonds_source/We_Search_Our_Worldwide_Network.jpg",
    imageAlt: "DS4U custom diamond sourcing process from request to delivery",
    steps: [
      {
        tag: "1",
        title: "Tell Us About the Diamond You Need",
        paragraphs: [
          "The process begins with your sourcing brief. Provide the shape, carat weight, colour, clarity, preferred laboratory, measurements, fluorescence, budget, destination and required date.",
          "If the diamond will be used in an existing or approved jewellery design, include the design measurements or a clear reference. For a replacement diamond, provide the available setting dimensions rather than relying only on the original stone’s estimated carat weight.",
          "You should also explain which characteristics are essential and which can remain flexible. A buyer may insist on a specific shape and face-up size while accepting a slightly wider colour or clarity range. Identifying this flexibility can produce more relevant options without moving away from the purpose of the request.",
        ],
      },
      {
        tag: "2",
        title: "Dalila Searches Its Diamond Network",
        paragraphs: [
          "After reviewing the brief, Dalila searches its established diamond network for natural diamonds that match the requirement as closely as possible.",
          "This search can extend beyond the stones displayed in the public inventory. It may identify suitable diamonds held by different suppliers or available through professional diamond-trading channels.",
          "Availability can change quickly, particularly for rare shapes, large diamonds and tightly specified combinations. A potential match should therefore be treated as available only after it has been confirmed, reserved where applicable and included in a written quotation.",
        ],
      },
      {
        tag: "3",
        title: "Available Options Are Compared",
        paragraphs: [
          "A sourced diamond should not be assessed by headline grades alone. Depending on the requirement, Dalila may compare the available options using their dimensions, proportions, shape outline, faceting, fluorescence, report information and visible characteristics.",
          "For a matched pair, the comparison may also consider how the diamonds look beside one another. Similar carat weights do not necessarily create a successful pair if the stones have different outlines, visible sizes or faceting patterns.",
          "The comparison can include:",
          "The GIA 4Cs provide an important foundation for describing diamond quality. However, the final decision should also consider the appearance of the individual stone and whether it suits the intended jewellery.",
        ],
        bullets: [
          "Exact carat weight and measurements",
          "Length-to-width ratio",
          "Colour and clarity",
          "Cut grade where applicable",
          "Polish and symmetry",
          "Fluorescence",
          "Inclusion type and position",
          "Outline and faceting style",
          "Face-up size and visual balance",
          "Grading laboratory and report details",
          "Price, currency and availability",
          "Expected delivery requirements",
        ],
      },
      {
        tag: "4",
        title: "Review the Diamond and Its Grading Report",
        paragraphs: [
          "When a suitable diamond is identified, the buyer should receive enough information to make an informed decision. This can include the grading report, measurements, images, video and a written quotation, depending on availability and the agreed sourcing process.",
          "The report should clearly identify whether the stone is a natural diamond and record its carat weight, colour, clarity, measurements, polish, symmetry, fluorescence and other relevant observations.",
          "Report information can be checked through the issuing laboratory’s official verification service. GIA-graded diamonds can be checked using GIA Report Check, while IGI and HRD provide their own official verification systems.",
          "Online report verification confirms that the report information exists in the laboratory’s records. The physical diamond must still be matched to the report through its inscription, measurements and identifying characteristics. Buyers unfamiliar with the differences between laboratories can also read Dalila’s GIA vs IGI vs HRD guide.",
        ],
      },
      {
        tag: "5",
        title: "Confirm the Written Quotation and Delivery Terms",
        paragraphs: [
          "Once you approve a diamond, the final written quotation should identify the specific stone, grading report, total price, currency, quote-validity period and delivery terms.",
          "It should also explain any applicable shipping, insurance, taxes, customs requirements, payment charges, inspection rights and return restrictions. Specially sourced diamonds may be subject to different conditions from stones purchased from standard inventory, so these terms should be reviewed before payment.",
          "A diamond should not be considered reserved until Dalila confirms its availability and the applicable reservation or payment requirements in writing.",
        ],
      },
    ],
  },
  requestTypes: {
    id: "natural-diamonds-that-can-be-requested",
    title: "Natural Diamonds That Can Be Requested Through DS4U",
    // Temporary asset until final WebP is supplied:
    // matched-pairs-rare-diamond-shapes.webp
    imageSrc: "/diamonds_source/handshake.jpg",
    imageAlt: "Matched natural diamond pairs and rare fancy-shaped diamonds",
    cards: [
      {
        title: "Certified Loose Natural Diamonds",
        paragraphs: [
          "DS4U is centred on sourcing polished natural diamonds with grading documentation from recognised laboratories, subject to the buyer’s requirements and current availability.",
          "A request can specify GIA, IGI or HRD as the preferred laboratory. However, restricting the search to one laboratory may reduce the number of available options, particularly when the remaining specifications are already narrow.",
          "If you are unsure which report is most appropriate for the final customer or market, review the differences before submitting the request rather than selecting a laboratory only because one diamond appears less expensive.",
        ],
      },
      {
        title: "Rare Shapes and Exact Proportions",
        paragraphs: [
          "Fancy-shaped diamonds can vary significantly even when they share the same basic shape name. One cushion diamond may appear compact and square, while another looks elongated. Ovals, pears, marquises, radiants and emerald cuts can also differ considerably in outline and ratio.",
          "DS4U allows you to request not only the shape but also the proportions and visible character you want. This may include an elongated cushion, a narrow emerald cut, a fuller pear shape or an oval diamond within a defined length-to-width range.",
          "Providing reference images can help communicate the preferred outline, but the final request should still include measurable specifications wherever possible.",
        ],
      },
      {
        title: "Matched Diamond Pairs",
        paragraphs: [
          "Finding a convincing matched pair involves more than locating two diamonds with similar carat weights.",
          "The diamonds should normally be compared for their measurements, outline, colour, clarity, proportions, faceting style and overall visual performance. Even a small difference in visible size or shape can become apparent when the stones are placed together in earrings.",
          "Matched pairs can be requested for earrings, side stones, three-stone rings and other balanced jewellery designs. If the setting already exists, provide the measurements available for each stone.",
        ],
      },
      {
        title: "Diamonds for Bespoke Jewellery",
        paragraphs: [
          "A diamond selected for bespoke jewellery must work with the approved design. Its dimensions, depth, outline and visual proportions may affect the setting style, finished height and overall balance of the piece.",
          "Jewellers and designers can submit design details so the sourcing search considers the practical requirements of the jewellery—not only the diamond’s laboratory grades.",
          "Where possible, the diamond should be selected before the final setting is manufactured. This allows the design to be adjusted around the exact measurements of the chosen stone.",
        ],
      },
      {
        title: "Large and Tightly Specified Natural Diamonds",
        paragraphs: [
          "Large diamonds and stones combining several narrow specifications can have limited availability. A requirement involving a precise shape, carat range, colour, clarity, fluorescence level, laboratory and ratio may produce only a small number of possible matches.",
          "DS4U provides a way to search for these requirements individually instead of waiting for an appropriate diamond to appear in a standard online inventory.",
          "A wider search does not guarantee availability, but it can provide a clearer understanding of the options, compromises and budget required.",
        ],
      },
    ],
  },
  beyond4cs: {
    id: "what-matters-beyond-the-4cs",
    title: "What Matters Beyond the 4Cs?",
    // Temporary asset until final WebP is supplied:
    // natural-diamond-sourcing-requirements.webp
    imageSrc: "/b2b/close-up.jpg",
    imageAlt:
      "Natural diamond sourcing requirements including shape carat colour clarity and measurements",
    items: [
      {
        title: "Face-Up Size",
        paragraphs: [
          "Carat is a measurement of weight, not visible diameter. Two diamonds with the same carat weight can appear different in size when viewed from above.",
          "If visible size is important, include minimum length and width measurements in your request. This is particularly useful when the diamond must fit an existing design or achieve a specific visual presence.",
        ],
      },
      {
        title: "Length-to-Width Ratio",
        paragraphs: [
          "The length-to-width ratio describes the overall outline of a fancy-shaped diamond. It is especially important for oval, pear, marquise, cushion, radiant and emerald-cut diamonds.",
          "Some buyers prefer a compact appearance, while others want a noticeably elongated diamond. Including an acceptable ratio range makes that preference measurable and helps prevent unsuitable stones from entering the comparison.",
        ],
      },
      {
        title: "Proportions and Spread",
        paragraphs: [
          "A diamond’s depth, table, girdle and other proportions can influence its visible size, appearance and suitability for a setting.",
          "A diamond that carries more of its weight below the girdle may appear smaller from above than another diamond of the same weight. However, size alone should not be prioritised without considering the stone’s overall appearance and performance.",
        ],
      },
      {
        title: "Inclusion Type and Position",
        paragraphs: [
          "Diamonds receiving the same clarity grade can contain different types of inclusions in different positions.",
          "A centrally placed inclusion may be more noticeable than one near the edge, although visibility depends on its type, size, colour and the diamond’s faceting. Buyers with specific visual expectations should explain them in the sourcing request.",
        ],
      },
      {
        title: "Outline and Visual Character",
        paragraphs: [
          "Laboratory grades cannot fully describe the personality of an individual fancy-shaped diamond.",
          "Outline, facet pattern, contrast, brightness and bow-tie visibility can make one diamond more attractive or more suitable for a design than another. Images and video can help with the initial review, although final assessment procedures should be agreed with Dalila before purchase.",
        ],
      },
    ],
  },
  certification: {
    id: "diamond-certification-and-report-verification",
    title: "Diamond Certification and Report Verification",
    paragraphs: [
      "A recognised grading report provides an independent record of a diamond’s identification and quality characteristics. It helps buyers compare stones using a consistent set of documented information.",
      "However, a grading report is not the same as a valuation, and it should not be treated as a substitute for checking the physical diamond. The report details must correspond with the stone being supplied.",
      "Before approving a sourced diamond, review the report number, carat weight, measurements, colour, clarity, fluorescence, comments and inscription details where applicable. Dalila’s guide to reading a GIA diamond report explains the main sections buyers should examine.",
      "Never rely on a screenshot of a report alone. Check the number using the issuing laboratory’s official website and confirm the process used to match the diamond to that report.",
    ],
  },
  pricing: {
    id: "how-much-does-custom-diamond-sourcing-cost",
    title: "How Much Does Custom Diamond Sourcing Cost?",
    paragraphs: [
      "There is no single fixed price for a custom-sourced natural diamond because every request produces a different combination of quality, rarity and availability.",
      "Pricing can be affected by the diamond’s shape, weight, colour, clarity, cut quality, proportions, fluorescence, grading laboratory and visual appearance. Uncommon dimensions, rare shapes, matched pairs and short deadlines can further restrict availability.",
      "The final cost may also depend on the quotation currency, payment method, shipping, insurance, destination, tax treatment, customs requirements and any sourcing or handling charges confirmed by Dalila.",
      "If your budget is fixed, identify the characteristics you are willing to adjust. For example, you may retain the preferred shape, measurements and report laboratory while allowing a broader colour or clarity range.",
      "Dalila’s diamond price guide can help you understand the principal factors influencing natural-diamond pricing. The price of the actual sourced diamond must still be confirmed through a dated written quotation.",
    ],
  },
  antwerp: {
    id: "why-source-a-natural-diamond-through-antwerp",
    title: "Why Source a Natural Diamond Through Antwerp?",
    paragraphs: [
      "Dalila Diamonds operates from Hoveniersstraat in Antwerp’s established diamond district. Antwerp brings together diamond traders, grading laboratories, logistics specialists and international suppliers within one professional trading environment.",
      "For a buyer with a difficult or highly specific request, this environment can provide access to a wider sourcing network than a single public inventory.",
      "Antwerp sourcing can be particularly useful when a buyer requires multiple report preferences, specialist diamond knowledge, international supplier access or European payment and delivery coordination.",
      "However, “Antwerp sourced” describes the trading and sourcing route. It does not mean that the diamond was mined in Belgium. Belgium is not a diamond-producing country, and any claim about mining origin requires separate supporting documentation.",
      "You can learn more about the distinction in Dalila’s guide to Antwerp diamond sourcing.",
    ],
  },
  whyDalila: {
    id: "why-choose-dalila-diamonds",
    title: "Why Choose Dalila Diamonds for Custom Diamond Sourcing?",
    paragraphs: [
      "Dalila combines an Antwerp location with more than 50 years of family experience in the diamond trade. The DS4U service uses that experience to support searches that require more attention than a standard inventory filter can provide.",
      "The process begins with your requirement. This makes it possible to consider the intended jewellery, visible dimensions, client preferences and practical deadline alongside the traditional diamond grades.",
      "DS4U also keeps the search focused specifically on polished natural diamonds. This is important for jewellers and buyers whose customers require documented natural stones rather than laboratory-grown alternatives.",
      "Most importantly, the service gives difficult requests a defined process. Instead of repeatedly checking changing inventories, you can submit one brief, review suitable options and make a decision only after the diamond and written terms have been presented.",
    ],
  },
  submitSection: {
    id: "submit-your-natural-diamond-requirement",
    title: "Submit Your Natural Diamond Requirement",
    paragraphs: [
      "Tell Dalila what you are trying to find and how the diamond will be used. The more complete the brief, the easier it will be to identify relevant options.",
      "Your request should include the preferred shape, carat range, colour, clarity, measurements, grading laboratory, fluorescence, quantity, budget, destination and required date. You may also provide a reference image, diamond report or jewellery design where relevant.",
      "If you are uncertain about any specification, explain the desired appearance and identify the requirements that cannot change. Dalila can then review the brief and clarify what information is needed before beginning the search.",
    ],
    primaryButtonText: "SUBMIT YOUR DIAMOND REQUEST",
    primaryButtonHref: "#diamond-request-form",
    secondaryButtonText: "CONTACT AN ANTWERP DIAMOND EXPERT",
    secondaryButtonHref: "/contact",
    notice:
      "Submitting a request does not guarantee availability, reserve a diamond or create an obligation to purchase. Diamond details, grading reports, price, currency, delivery, insurance, taxes, customs requirements, inspection rights and payment conditions must be confirmed in the final written quotation.",
  },
  faqs: {
    id: "frequently-asked-questions",
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is DS4U?",
        answer:
          "DS4U stands for Diamond Source For You. It is Dalila Diamonds’ custom sourcing service for buyers seeking a specific natural diamond, matched pair or tightly defined group of stones.",
      },
      {
        question: "How is DS4U different from Secure To Source?",
        answer:
          "DS4U focuses on individual and exact-specification diamond requests, including rare shapes and matched pairs. Secure To Source is designed for ongoing B2B procurement, repeat purchasing and structured natural-diamond supply.",
      },
      {
        question: "What should I include in my diamond request?",
        answer:
          "Include the preferred shape, carat range, colour, clarity, measurements, cut requirements, fluorescence, grading laboratory, quantity, budget, destination and required date. You should also explain the intended jewellery use and identify which specifications can remain flexible.",
      },
      {
        question: "Can Dalila source GIA, IGI or HRD-graded diamonds?",
        answer:
          "A sourcing request can include GIA, IGI or HRD as the preferred grading laboratory. The available options will depend on the complete specification and current market supply.",
      },
      {
        question: "Can DS4U source matched diamonds?",
        answer:
          "Matched pairs or groups of diamonds can be requested for earrings, side stones and multi-stone jewellery. The matching process may consider measurements, outline, colour, clarity, faceting and overall visual balance.",
      },
      {
        question: "Can Dalila find an exact diamond shape or ratio?",
        answer:
          "You can provide a preferred shape, measurements and length-to-width ratio. These specifications are particularly useful when sourcing oval, pear, marquise, cushion, radiant and emerald-cut diamonds.",
      },
      {
        question: "Is submitting a request a commitment to buy?",
        answer:
          "No. Submitting a sourcing request begins the search and discussion. A purchase should take place only after you approve a specific diamond and accept the written quotation and conditions.",
      },
      {
        question: "How long does custom diamond sourcing take?",
        answer:
          "The timeframe depends on the rarity of the requirement, current availability, grading-report preference, destination and deadline. Dalila should provide an estimated sourcing and delivery timeframe after reviewing the complete request.",
      },
      {
        question: "How is the price of a sourced diamond determined?",
        answer:
          "Pricing depends on the diamond’s characteristics, grading report, rarity, visual appearance, availability, quotation currency and delivery requirements. Any additional sourcing, shipping, insurance or transaction costs should be stated in the written quotation.",
      },
      {
        question: "Does Antwerp-sourced mean the diamond was mined in Belgium?",
        answer:
          "No. Antwerp is an international diamond trading and distribution centre. It is not a diamond-mining origin. A diamond’s mining origin must be supported by separate documentation.",
      },
      {
        question: "Can I review Dalila’s inventory before using DS4U?",
        answer:
          "Yes. You can first browse Dalila’s current diamond inventory. Submit a DS4U request when the required diamond is unavailable or the specification is too detailed for a standard inventory search.",
      },
      {
        question: "Is delivery available outside Belgium?",
        answer:
          "Delivery options depend on the destination, shipment value, insurance requirements and applicable customs rules. Exact availability, carrier, cost, insurance and import responsibilities must be confirmed in the final quotation.",
      },
    ],
  },
  form: {
    id: "diamond-request-form",
    tag: "DS4U Request",
    title: "Submit Your Diamond Request",
    subtitle:
      "Share your diamond specifications and contact details so Dalila can begin the sourcing search.",
    submitText: "SUBMIT YOUR DIAMOND REQUEST",
    submittingText: "Submitting...",
    successTitle: "Request Received",
    successMessage:
      "Thank you for submitting your natural diamond requirement. The Dalila Diamonds team will review your specifications and contact you to clarify availability, pricing and delivery requirements. Submitting a request does not reserve a diamond or create a purchase obligation.",
    errorMessage:
      "We could not submit your request. Please check the required fields and try again. If the problem continues, contact Dalila Diamonds directly.",
    privacyLabel: "I agree to the processing of my details in line with Dalila’s",
    privacyLinkText: "privacy policy",
    privacyHref: "/contact",
    fileFormatsNote: "Accepted formats: JPG, PNG, PDF, WEBP. Max 5MB per file.",
    buyerTypes: [
      "Jeweller",
      "Jewellery designer",
      "Retailer",
      "Manufacturer",
      "Wholesaler",
      "Other professional buyer",
    ],
    currencies: ["EUR", "USD", "GBP"],
    labels: {
      fullName: "Full name *",
      companyName: "Company name",
      buyerType: "Buyer type *",
      email: "Email address *",
      phone: "Telephone or WhatsApp number *",
      country: "Country *",
      shape: "Diamond shape *",
      carat: "Carat weight or acceptable range *",
      colour: "Colour or acceptable range *",
      clarity: "Clarity or acceptable range *",
      budget: "Budget *",
      currency: "Currency *",
      deliveryDestination: "Delivery destination *",
      requiredDate: "Required date *",
      privacyConsent: "Privacy-policy consent *",
      cut: "Cut grade",
      polish: "Polish",
      symmetry: "Symmetry",
      fluorescence: "Fluorescence",
      length: "Length",
      width: "Width",
      depth: "Depth",
      lengthToWidthRatio: "Length-to-width ratio",
      lab: "Preferred grading laboratory",
      quantity: "Quantity",
      jewelleryUse: "Intended jewellery use",
      reportNumber: "Reference diamond report number",
      additionalRequirements: "Additional requirements",
      fileUpload: "Reference image, report or jewellery design",
    },
  },
};

export function getDs4uContent(_locale?: string): Ds4uContent {
  return enContent;
}

export const DS4U_PAGE_TITLE =
  "Custom Diamond Sourcing Antwerp | DS4U by Dalila";

export const DS4U_PAGE_DESCRIPTION =
  "Use Dalila’s custom diamond sourcing service to find certified natural diamonds, rare shapes, matched pairs and exact specifications through Antwerp.";

export const DS4U_CANONICAL_URL =
  "https://www.daliladiamonds.com/diamond-source";

export const DS4U_DATE_MODIFIED = "2026-08-06";

export const DS4U_HERO_IMAGE_URL =
  "https://www.daliladiamonds.com/diamonds_source/diamondsourceforyou.jpg";
