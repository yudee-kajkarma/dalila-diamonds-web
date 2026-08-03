/**
 * Diamond Grading Report Guide — page content.
 *
 * Future resource links (wire when pages exist):
 *   /resources/diamond-quality-chart
 *   /resources/diamond-fluorescence-guide
 *   /resources/diamond-shapes-and-cuts
 *   /resources/how-to-buy-loose-diamonds
 */

import type { GradingReportRichSegment } from "@/components/pages/resources/diamond-grading-report-guide/gradingReportRichText";

export const GRADING_REPORT_CANONICAL_URL =
  "https://www.daliladiamonds.com/resources/diamond-grading-report-guide";

export const GRADING_REPORT_PAGE_TITLE = "Diamond Grading Report Guide | Dalila Diamonds";

export const GRADING_REPORT_PAGE_DESCRIPTION =
  "Understand diamond grading reports, verify report numbers, compare the 4Cs, proportions and fluorescence, and check a natural diamond before buying.";

export const GIA_REPORT_CHECK_URL = "https://www.gia.edu/report-check-landing";
export const IGI_VERIFY_URL = "https://www.igi.org/Verify-Your-Report/";
export const HRD_VERIFY_URL = "https://my.hrdantwerp.com/";

export interface GradingReportTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface GradingReportSubsection {
  id: string;
  title: string;
  paragraphs?: string[];
  paragraphsBefore?: string[];
  paragraphsAfter?: string[];
  bullets?: string[];
  numberedSteps?: string[];
  table?: GradingReportTable;
}

export interface GradingReportNamedSubsection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GradingReportFaqItem {
  question: string;
  answer: string;
}

export interface GradingReportContent {
  banner: {
    title: string;
    breadcrumbHome: string;
    breadcrumbResources: string;
    breadcrumbCurrent: string;
  };
  hero: {
    title: string;
    subheading: string;
    reviewDateLabel: string;
    reviewDate: string;
  };
  introduction: {
    paragraphs: string[];
  };
  quickAnswer: {
    title: string;
    introParagraphs: string[];
    attributes: string[];
    closingParagraphs: string[];
  };
  keyTakeaways: {
    title: string;
    items: string[];
  };
  overviewNav: {
    title: string;
    items: { id: string; label: string }[];
  };
  whatIs: {
    id: string;
    title: string;
    introParagraphs: string[];
    establishItems: string[];
    closingParagraphs: string[];
  };
  whyMatter: {
    id: string;
    title: string;
    introParagraphs: string[];
    helpItems: string[];
    closingParagraphs: string[];
  };
  howToRead: {
    id: string;
    title: string;
    introParagraphs: string[];
    subsections: GradingReportSubsection[];
  };
  verification: {
    id: string;
    title: string;
    introParagraphs: string[];
    processHeading: string;
    processSteps: string[];
    matchHeading: string;
    matchItems: string[];
    closingParagraph: string;
    giaLinkLabel: string;
    igiLinkLabel: string;
    hrdLinkLabel: string;
  };
  onlineVerificationLimits: {
    id: string;
    title: string;
    introParagraphs: string[];
    checkItems: string[];
    closingParagraph?: string;
  };
  matchingSteps: {
    id: string;
    title: string;
    introParagraphs: string[];
    steps: string[];
    closingParagraph?: string;
  };
  comparisonTable: {
    id: string;
    title: string;
    introParagraphs: string[];
    table: GradingReportTable;
  };
  workedExample: {
    id: string;
    title: string;
    introParagraphs: string[];
    introBullets?: string[];
    steps: string[];
    closingParagraph?: string;
  };
  labComparison: {
    id: string;
    title: string;
    introParagraphs: string[];
    closingParagraphs: string[];
    table: GradingReportTable;
    processSteps: string[];
  };
  limitations: {
    id: string;
    title: string;
    introParagraphs: string[];
    subsections: GradingReportNamedSubsection[];
  };
  warningSigns: {
    id: string;
    title: string;
    introLead: string;
    items: string[];
    closingParagraph: string;
  };
  vsAppraisal: {
    id: string;
    title: string;
    introParagraphs: string[];
    establishItems: string[];
    table: GradingReportTable;
  };
  checklist: {
    id: string;
    title: string;
    introLead: string;
    items: string[];
  };
  cta: {
    id: string;
    title: string;
    richParagraphs: GradingReportRichSegment[][];
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText: string;
    secondaryButtonHref: string;
  };
  faqs: {
    title: string;
    items: GradingReportFaqItem[];
  };
  finalTakeaway: {
    id: string;
    title: string;
    introParagraphs: string[];
    doNotAskLead: string;
    doNotAskItems: string[];
    askLead: string;
    askItems: string[];
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText: string;
    secondaryButtonHref: string;
  };
}

const howToReadSubsections: GradingReportSubsection[] = [
  {
    id: "check-the-laboratory-report-type-and-date",
    title: "1. Check the Laboratory, Report Type and Date",
    paragraphsBefore: ["Start at the top of the report and confirm:"],
    bullets: [
      "Name of the issuing laboratory",
      "Exact report type",
      "Report number",
      "Examination date",
      "Whether the report covers a loose diamond or finished jewellery",
    ],
    paragraphsAfter: [
      "The report type matters because different documents contain different levels of information.",
      "A full report may contain a clarity-characteristic plot and detailed proportion diagram. A smaller dossier or digital report may provide fewer visual details.",
      "The absence of a clarity plot does not automatically make a report unreliable. It may simply be a different report product.",
      "Buyer check",
      "Do not rely on a screenshot with the laboratory name, diamond description or comments removed. Request the complete document and verify it through the issuing laboratory.",
    ],
  },
  {
    id: "confirm-the-diamond-description",
    title: "2. Confirm the Diamond's Description",
    paragraphsBefore: [
      "Look for wording that clearly identifies what the laboratory examined.",
      "For a natural-diamond purchase, the report should identify the stone as a natural diamond or use equivalent clear terminology.",
      "Do not assume a diamond is natural simply because the report displays carat, colour and clarity grades. Laboratory-grown diamonds can also receive laboratory documents, but their manufactured origin should be disclosed.",
      "Check for:",
    ],
    bullets: [
      "Natural-diamond identification",
      "Laboratory-grown identification",
      "Fancy-colour description, where relevant",
      "Detected treatment disclosures",
      "Loose-diamond or mounted-jewellery wording",
    ],
    paragraphsAfter: [
      "If the description is unclear, stop the transaction until the laboratory or a qualified diamond professional explains it.",
    ],
  },
  {
    id: "find-and-verify-the-report-number",
    title: "3. Find and Verify the Report Number",
    paragraphsBefore: [
      "Every grading report receives an identification number.",
      "The report number is used to retrieve the laboratory's archived information. It may also be microscopically laser-inscribed on the diamond's girdle.",
      "Checking the number can help you determine whether:",
    ],
    bullets: [
      "The report exists in the laboratory's database",
      "The online specifications match the supplied document",
      "Information on the document may have been altered",
      "A laser inscription corresponds with the report",
    ],
    paragraphsAfter: [
      "A valid report number is important, but it is not sufficient on its own. A genuine report could still be presented alongside a different diamond.",
    ],
  },
  {
    id: "check-the-shape-and-cutting-style",
    title: "4. Check the Shape and Cutting Style",
    paragraphsBefore: [
      "Shape describes the diamond's face-up outline. Cutting style describes the arrangement and type of facets.",
      "Common descriptions include:",
    ],
    bullets: [
      "Round Brilliant",
      "Oval Brilliant",
      "Pear Brilliant",
      "Cushion Modified Brilliant",
      "Emerald Cut",
      "Radiant Cut",
      "Princess Cut",
      "Marquise Brilliant",
      "Square Emerald Cut",
      "Heart Brilliant",
    ],
    paragraphsAfter: [
      "Do not confuse shape with cut quality.",
      "\"Round Brilliant\" identifies a shape and facet arrangement. A grade such as \"Excellent\" may describe its overall cut quality.",
      "For fancy-shaped diamonds such as Oval, Pear, Cushion and Emerald, the exact cutting-style description can help explain why two diamonds of the same general shape appear different.",
    ],
  },
  {
    id: "review-the-measurements",
    title: "5. Review the Measurements",
    paragraphsBefore: [
      "Diamond measurements are normally recorded in millimetres.",
      "For a round diamond, the report generally shows:",
    ],
    bullets: ["Minimum diameter × maximum diameter × depth"],
    paragraphsAfter: [
      "For a fancy-shaped diamond, it generally shows:",
      "Length × width × depth",
      "Measurements help indicate how large the diamond may appear when viewed from above.",
      "Two one-carat diamonds can have different visible spreads because their depth, outline and proportions differ.",
      "Length-to-width ratio",
      "For a fancy-shaped diamond, divide its length by its width:",
      "Length ÷ Width = Length-to-width ratio",
      "For example:",
      "9.00 mm ÷ 6.00 mm = 1.50 ratio",
      "The ratio helps describe whether the diamond appears broad, balanced or elongated.",
      "It is not automatically a quality grade. The preferred ratio depends on the shape, jewellery design and buyer's personal preference.",
      "What buyers should watch for",
      "A diamond can retain additional weight in its depth and still appear smaller from above. Always compare carat weight with the diamond's actual dimensions.",
    ],
  },
  {
    id: "understand-carat-weight",
    title: "6. Understand Carat Weight",
    paragraphsBefore: [
      "Carat measures a diamond's weight, not its visible size.",
      "One metric carat equals 0.20 grams.",
      "A 1.00-carat diamond is not guaranteed to look larger than a 0.95-carat diamond. Face-up appearance also depends on:",
    ],
    bullets: [
      "Shape",
      "Diameter",
      "Length and width",
      "Total depth",
      "Girdle thickness",
      "Proportion choices",
      "Weight retained below the girdle",
    ],
    paragraphsAfter: [
      "Popular thresholds such as 1.00, 1.50 and 2.00 carats can affect market pricing. This makes it important to assess the complete diamond rather than buying according to a weight threshold alone.",
    ],
  },
  {
    id: "understand-the-colour-grade",
    title: "7. Understand the Colour Grade",
    paragraphsBefore: [
      "For many natural diamonds within the normal colour range, colour is graded from D to Z.",
      "The scale begins with D, representing colourless, and progresses towards an increasing yellow or brown appearance.",
      "The GIA diamond colour scale is assessed under controlled viewing conditions using comparison stones.",
      "Differences between neighbouring colour grades can be subtle. Their visibility may depend on:",
    ],
    bullets: [
      "Diamond size",
      "Shape",
      "Cut quality",
      "Viewing angle",
      "Lighting",
      "Jewellery metal colour",
      "Whether the diamond is loose or mounted",
    ],
    paragraphsAfter: [
      "A higher colour grade is rarer, but it is not necessarily the best use of every buyer's budget.",
      "Fancy-colour diamonds use a different grading system. Do not interpret a fancy yellow, pink, blue or other coloured-diamond report using the D-to-Z scale.",
    ],
    table: {
      caption: "D-to-Z colour grade scale",
      headers: ["Colour range", "General description"],
      rows: [
        ["D–F", "Colourless"],
        ["G–J", "Near-colourless"],
        ["K–M", "Faint colour"],
        ["N–R", "Very light colour"],
        ["S–Z", "Light colour"],
      ],
    },
  },
  {
    id: "understand-the-clarity-grade",
    title: "8. Understand the Clarity Grade",
    paragraphsBefore: [
      "Clarity describes the relative absence of internal characteristics called inclusions and surface characteristics called blemishes.",
      "The GIA clarity scale includes 11 grades:",
      "Clarity grading considers the size, nature, number, position and visibility of characteristics under magnification. GIA's clarity guidance explains that clarity is graded using 10× magnification.",
      "Does VS2 automatically mean eye-clean?",
      "No.",
      "Two VS2 diamonds can contain different inclusion types in different locations. One may appear clean without magnification, while another may have a visible dark inclusion or a characteristic positioned beneath the table.",
      "The report provides the clarity grade. High-resolution imagery or physical inspection helps establish how those characteristics affect appearance.",
      "Clarity characteristics to examine",
      "Pay closer attention to:",
    ],
    bullets: [
      "Dark inclusions beneath the table",
      "Large centrally positioned crystals",
      "Feathers reaching the girdle",
      "Cavities",
      "Chips",
      "Extensive clouds",
      "Comments stating that the clarity grade is based on clouds",
      "Characteristics that may affect transparency",
      "Inclusions hidden by reflections or poor photography",
    ],
    paragraphsAfter: [
      "The presence of an inclusion does not automatically make a diamond unsuitable. Its type, size, visibility, relief and position all matter.",
    ],
    table: {
      caption: "FL to I3 clarity grade scale",
      headers: ["Clarity grade", "Meaning"],
      rows: [
        ["FL", "Flawless"],
        ["IF", "Internally Flawless"],
        ["VVS1", "Very, Very Slightly Included 1"],
        ["VVS2", "Very, Very Slightly Included 2"],
        ["VS1", "Very Slightly Included 1"],
        ["VS2", "Very Slightly Included 2"],
        ["SI1", "Slightly Included 1"],
        ["SI2", "Slightly Included 2"],
        ["I1", "Included 1"],
        ["I2", "Included 2"],
        ["I3", "Included 3"],
      ],
    },
  },
  {
    id: "review-the-cut-grade",
    title: "9. Review the Cut Grade",
    paragraphsBefore: [
      "Cut quality affects how effectively a diamond returns and displays light.",
      "For standard round brilliant diamonds in the D-to-Z colour range, the GIA cut-grade scale is:",
    ],
    bullets: [
      "Excellent",
      "Very Good",
      "Good",
      "Fair",
      "Poor",
    ],
    paragraphsAfter: [
      "GIA's official diamond cut guidance explains that its overall cut-grading system applies to standard round brilliant diamonds in the D-to-Z colour range.",
      "Therefore, the absence of a GIA overall cut grade on an Oval, Pear, Emerald, Cushion or another fancy-shaped diamond is not automatically a problem.",
      "Cut is not the same as shape",
      "Shape: Round, Oval, Pear, Cushion or Emerald",
      "Cut quality: How effectively the diamond's design, proportions and craftsmanship manage light",
      "Fancy-shaped diamonds should be evaluated using their measurements, proportions, outline, facet pattern, polish, symmetry, video and physical appearance.",
      "A grade issued under one laboratory's system should not automatically be interpreted as identical to a grade issued under another laboratory's methodology.",
    ],
  },
  {
    id: "check-polish-and-symmetry",
    title: "10. Check Polish and Symmetry",
    paragraphsBefore: [
      "Polish evaluates the quality of the diamond's finished facet surfaces.",
      "Symmetry evaluates the precision and alignment of the diamond's facets, outline and related features.",
      "Depending on the laboratory, grades may include:",
    ],
    bullets: [
      "Excellent",
      "Very Good",
      "Good",
      "Fair",
      "Poor",
    ],
    paragraphsAfter: [
      "Polish and symmetry are not interchangeable with the overall cut grade.",
      "A diamond can have Excellent polish and Excellent symmetry while still having proportions or visual characteristics that make it less attractive than another stone.",
      "Excellent or Very Good finish grades may provide a strong starting point, but the final decision should consider the complete diamond and its price.",
    ],
  },
  {
    id: "read-the-fluorescence-description",
    title: "11. Read the Fluorescence Description",
    paragraphsBefore: [
      "Fluorescence is the visible light that some diamonds emit when exposed to ultraviolet radiation.",
      "On GIA reports, fluorescence intensity may be described as:",
    ],
    bullets: [
      "None",
      "Faint",
      "Medium",
      "Strong",
      "Very Strong",
    ],
    paragraphsAfter: [
      "When fluorescence is Medium, Strong or Very Strong, its colour may also be recorded. Blue is common, although other colours can occur.",
      "Fluorescence is not one of the 4Cs and should not automatically be treated as either positive or negative. GIA describes it as an identifying characteristic in its diamond fluorescence guidance.",
      "What buyers should check",
      "For diamonds with Medium, Strong or Very Strong fluorescence:",
      "Examine the diamond in normal indoor lighting",
      "Examine it in daylight",
      "Check for any hazy, oily or milky appearance",
      "Compare it with a similar diamond showing no fluorescence",
      "Determine whether fluorescence has affected the asking price",
      "Do not reject or purchase a diamond according to the fluorescence label alone.",
    ],
  },
  {
    id: "examine-the-proportion-diagram",
    title: "12. Examine the Proportion Diagram",
    paragraphsBefore: [
      "The proportion diagram records important parts of the diamond's construction.",
      "Depending on the shape, laboratory and report type, it may include:",
    ],
    bullets: [
      "Table percentage",
      "Total depth percentage",
      "Crown angle or height",
      "Pavilion angle or depth",
      "Girdle thickness",
      "Culet size",
      "Star-facet length",
      "Lower-half length",
    ],
    paragraphsAfter: [
      "These measurements work together. One supposedly \"ideal\" table or depth number cannot guarantee excellent light performance.",
      "Table",
      "The table is the large top facet of the diamond. Table percentage compares its width with the diamond's average diameter or width.",
      "Total depth",
      "Total depth measures the diamond from the table to the culet.",
      "A diamond that is excessively deep may retain weight below the girdle and appear smaller from above.",
      "Crown and pavilion",
      "The crown is located above the girdle. The pavilion is below it.",
      "Their angles and depths influence brightness, fire, contrast and light return.",
      "Girdle",
      "The girdle forms the diamond's outer edge.",
      "An extremely thin area may require additional durability consideration. An excessively thick girdle may retain weight without producing additional face-up size.",
      "Culet",
      "The culet is the point or small facet at the bottom of the diamond. A large culet may be visible through the table.",
      "Use the proportion diagram as a screening and comparison tool, not as a substitute for seeing or inspecting the diamond.",
    ],
  },
  {
    id: "understand-the-clarity-plot",
    title: "13. Understand the Clarity Plot",
    paragraphsBefore: ["A clarity plot maps characteristics observed within or on the surface of a diamond.", "On many GIA reports:"],
    bullets: [
      "Red symbols indicate inclusions",
      "Green symbols indicate external characteristics",
      "Black may indicate extra facets",
      "Combined colours may represent certain characteristics",
    ],
    paragraphsAfter: [
      "The report includes a key explaining the symbols used.",
      "A clarity plot can help you:",
      "Understand why the diamond received its clarity grade",
      "Locate significant characteristics",
      "Compare visible features with the physical diamond",
      "Support identification of the stone",
      "However, a clarity plot is not always an exact illustration of every microscopic feature. Not every report type includes one, and not every observed characteristic must necessarily appear on the plot.",
      "What matters most",
      "Examine the type, position and significance of the grade-setting characteristics. Then compare them with high-quality imagery or professional inspection findings.",
    ],
  },
  {
    id: "read-the-comments-section",
    title: "14. Read the Comments Section Carefully",
    paragraphsBefore: [
      "The comments section can contain important information that does not appear elsewhere in the report.",
      "Examples can include:",
    ],
    bullets: [
      "Additional clouds or pinpoints not shown",
      "Surface graining",
      "Internal graining",
      "Laser inscription details",
      "Treatment disclosure",
      "Clarity-related information",
      "Colour-related observations",
      "Identification limitations",
      "Extra facets",
      "Naturals",
      "Other relevant laboratory notes",
    ],
    paragraphsAfter: [
      "Do not skip this section because the wording appears technical.",
      "A comment does not automatically identify a serious problem, but it may explain something important that is not apparent from the headline grades.",
      "Request a clear written explanation if you do not understand a comment.",
    ],
  },
  {
    id: "check-the-laser-inscription",
    title: "15. Check the Laser Inscription",
    paragraphsBefore: [
      "A laser inscription is microscopic text placed on the diamond's girdle. It may contain the laboratory name, report number or another identifying message.",
      "According to GIA's laser-inscription guidance, the inscription generally requires magnification to read.",
      "Important limitations",
    ],
    bullets: [
      "Not every natural diamond has a laser inscription.",
      "Availability can depend on the laboratory and report type.",
      "An inscription helps identify a diamond but is not a complete quality assessment.",
      "The inscription should match the report exactly.",
      "A matching inscription should still be considered alongside measurements and other identifying characteristics.",
      "The absence of an inscription does not automatically mean that the diamond or report is false.",
    ],
  },
];

const enContent: GradingReportContent = {
  banner: {
    title: "Diamond Grading Report Guide",
    breadcrumbHome: "Home",
    breadcrumbResources: "Resources",
    breadcrumbCurrent: "Diamond Grading Report Guide",
  },
  hero: {
    title: "Diamond Grading Report Guide for Natural Diamond Buyers",
    subheading:
      "Understand every part of a diamond grading report, verify the report number and compare a natural diamond's quality before purchasing.",
    reviewDateLabel: "Last reviewed:",
    reviewDate: "30 July 2026",
  },
  introduction: {
    paragraphs: [
      "A diamond grading report contains far more information than carat weight, colour and clarity. When read correctly, it can help you confirm a diamond's identity, evaluate its quality and compare it with other natural diamonds.",
      "However, a grading report cannot tell you everything.",
      "It does not automatically prove that the physical stone offered to you is the diamond described in the report. It does not determine a fair purchase price, guarantee visual beauty or replace professional inspection.",
      "This resource explains the essential information found on a natural diamond grading report, how to verify it and which details require closer examination.",
    ],
  },
  quickAnswer: {
    title: "Quick Answer",
    introParagraphs: [
      "A diamond grading report is an independent gemmological laboratory's technical assessment of a diamond's identity and quality.",
      "Depending on the laboratory and report type, it can record the diamond's:",
    ],
    attributes: [
      "Natural or laboratory-grown identity",
      "Shape and cutting style",
      "Measurements",
      "Carat weight",
      "Colour",
      "Clarity",
      "Cut grade",
      "Proportions",
      "Polish",
      "Symmetry",
      "Fluorescence",
      "Clarity characteristics",
      "Treatments",
      "Laser inscription",
      "Additional laboratory comments",
    ],
    closingParagraphs: [
      "Buyers often call this document a \"diamond certificate\", but \"diamond grading report\" is generally the more accurate term. A grading report describes the diamond; it does not assign a market value or guarantee what the diamond should cost.",
    ],
  },
  keyTakeaways: {
    title: "Key Takeaways",
    items: [
      "Verify the report number through the issuing laboratory's official website.",
      "Confirm that the report identifies the stone as a natural diamond.",
      "Match the report with the physical stone using measurements, characteristics and any laser inscription.",
      "Do not evaluate a diamond using carat, colour and clarity alone.",
      "Examine cut, proportions, polish, symmetry, fluorescence and clarity-characteristic locations.",
      "Read the comments section before making a decision.",
      "A verified report does not automatically mean the diamond is attractive or fairly priced.",
      "A grading report is different from an appraisal, sales invoice or origin document.",
      "Compare diamonds graded by the same laboratory and report type where possible.",
      "Consider professional inspection when purchasing a valuable loose natural diamond remotely.",
    ],
  },
  overviewNav: {
    title: "Guide Overview",
    items: [
      { id: "what-is-a-diamond-grading-report", label: "What a diamond grading report is" },
      { id: "why-does-a-diamond-grading-report-matter", label: "Why grading reports matter" },
      { id: "how-to-read-a-diamond-grading-report", label: "How to read a diamond grading report" },
      { id: "how-to-verify-a-diamond-grading-report-online", label: "How to verify a report online" },
      { id: "how-to-match-the-report-with-the-physical-diamond", label: "How to match a report with the physical diamond" },
      { id: "how-to-compare-two-diamond-grading-reports", label: "How to compare two grading reports" },
      { id: "worked-example", label: "Worked diamond-report example" },
      { id: "gia-igi-and-hrd-antwerp-diamond-reports", label: "GIA, IGI and HRD Antwerp reports" },
      { id: "what-a-diamond-grading-report-cannot-tell-you", label: "What a grading report cannot tell you" },
      { id: "diamond-grading-report-warning-signs", label: "Diamond-report warning signs" },
      {
        id: "grading-report-versus-appraisal-and-other-documents",
        label: "Grading report versus appraisal and other documents",
      },
      { id: "natural-diamond-report-checklist", label: "Natural diamond buyer checklist" },
      { id: "grading-report-faq-heading", label: "Frequently asked questions" },
    ],
  },
  whatIs: {
    id: "what-is-a-diamond-grading-report",
    title: "What Is a Diamond Grading Report?",
    introParagraphs: [
      "A diamond grading report is a technical document produced after a gemmological laboratory examines a diamond under controlled conditions.",
      "Depending on the laboratory and report type, the examination may establish:",
    ],
    establishItems: [
      "Whether the stone is a diamond",
      "Whether the diamond is natural or laboratory-grown",
      "Whether detectable treatments are present",
      "Its shape and cutting style",
      "Its measurements and carat weight",
      "Its colour and clarity grades",
      "Its cut grade or proportions",
      "Its polish and symmetry",
      "Its fluorescence",
      "Its identifying inclusions and blemishes",
      "Whether a laser inscription is present",
    ],
    closingParagraphs: [
      "The Gemological Institute of America uses the term \"grading report\" rather than \"certificate\". Its reports provide technical information about a diamond but are not appraisals or guarantees of monetary value.",
      "\"Diamond certificate\" remains a widely used search term, so both expressions are used within this guide.",
      "The simplest way to understand it",
      "A grading report is the diamond's technical description. It is not its price tag, its resale valuation or a complete buying recommendation.",
    ],
  },
  whyMatter: {
    id: "why-does-a-diamond-grading-report-matter",
    title: "Why Does a Diamond Grading Report Matter?",
    introParagraphs: [
      "Natural diamonds that appear similar in photographs can differ significantly in rarity, quality, price and visible appearance.",
      "A grading report creates a recognised set of information that buyers, suppliers and diamond professionals can use when comparing stones.",
      "It can help you:",
    ],
    helpItems: [
      "Confirm that the named laboratory examined a diamond",
      "Establish whether the report describes a natural diamond",
      "Compare quality characteristics across shortlisted stones",
      "Understand why apparently similar diamonds have different prices",
      "Identify details that require closer inspection",
      "Record identifying characteristics for future reference",
      "Provide technical information for an independent appraisal",
      "Reduce reliance on the seller's description alone",
    ],
    closingParagraphs: [
      "A grading report is still only one part of the buying process. The physical diamond, seller, price, payment method, delivery process and inspection conditions must also be considered.",
    ],
  },
  howToRead: {
    id: "how-to-read-a-diamond-grading-report",
    title: "How to Read a Diamond Grading Report",
    introParagraphs: [
      "Laboratories use different layouts, terminology and report types. Nevertheless, most natural diamond grading reports include several common sections.",
    ],
    subsections: howToReadSubsections,
  },
  verification: {
    id: "how-to-verify-a-diamond-grading-report-online",
    title: "How to Verify a Diamond Grading Report Online",
    introParagraphs: [
      "Do not rely exclusively on a PDF, image or screenshot supplied by a seller.",
      "Use the issuing laboratory's official verification system:",
    ],
    processHeading: "Report-verification process",
    giaLinkLabel: "Verify a GIA report",
    igiLinkLabel: "Verify an IGI report",
    hrdLinkLabel: "Search the HRD Antwerp grading-report archive",
    processSteps: [
      "Identify the issuing laboratory.",
      "Visit the laboratory's official verification page.",
      "Enter the report number.",
      "Enter the carat weight or other requested information.",
      "Compare the online record with the supplied document.",
      "Confirm the report type and examination date.",
      "Download the official digital version where available.",
      "Check the laser inscription if the diamond is accessible.",
      "Compare the report information with the physical stone.",
      "Stop and request clarification if a material detail differs.",
    ],
    matchHeading: "Information that should match",
    matchItems: [
      "Report number",
      "Report date",
      "Diamond description",
      "Shape and cutting style",
      "Measurements",
      "Carat weight",
      "Colour",
      "Clarity",
      "Cut grade, where applicable",
      "Polish",
      "Symmetry",
      "Fluorescence",
      "Comments",
      "Inscription information",
    ],
    closingParagraph:
      "Use the issuing laboratory's official domain. Avoid unofficial certificate-lookup websites that request unnecessary payment or personal information.",
  },
  onlineVerificationLimits: {
    id: "does-online-verification-prove-you-have-the-correct-diamond",
    title: "Does Online Verification Prove You Have the Correct Diamond?",
    introParagraphs: [
      "No.",
      "Online verification confirms that a report number and its archived information exist. It does not independently prove that the physical diamond offered by a seller is the same stone examined for that report.",
      "To connect the report with the physical diamond, check:",
    ],
    checkItems: [
      "Laser inscription, when present",
      "Shape",
      "Exact measurements",
      "Carat weight",
      "Clarity-characteristic pattern",
      "Laboratory comments",
      "Current condition",
      "Professional inspection results",
    ],
    closingParagraph: "This distinction is particularly important when purchasing a loose natural diamond remotely.",
  },
  matchingSteps: {
    id: "how-to-match-the-report-with-the-physical-diamond",
    title: "How to Match the Report With the Physical Diamond",
    introParagraphs: [
      "Use several identifying characteristics rather than relying on one detail.",
    ],
    steps: [
      "Step 1: Check the inscription — If the report records a laser inscription, verify it under appropriate magnification.",
      "Step 2: Confirm the measurements — Compare the diamond's dimensions with those recorded on the report.",
      "Step 3: Confirm the weight — The physical diamond's weight should correspond with the report, subject to the laboratory's recorded precision.",
      "Step 4: Compare clarity characteristics — Use the clarity plot and comments to locate significant characteristics within the stone.",
      "Step 5: Check the current condition — Inspect for chips, abrasions or changes that may have occurred after the report was issued.",
      "Step 6: Investigate inconsistencies — Do not proceed until significant differences between the report and the physical diamond have been explained.",
    ],
    closingParagraph:
      "A matching inscription provides useful evidence, but the full combination of identifying information is stronger.",
  },
  comparisonTable: {
    id: "how-to-compare-two-diamond-grading-reports",
    title: "How to Compare Two Diamond Grading Reports",
    introParagraphs: [
      "Do not compare diamonds using only their headline 4Cs.",
      "Use the following order:",
      "Where possible, compare diamonds graded by the same laboratory under comparable report types.",
      "Laboratories may use similar terminology, but their methodologies, report formats and assessment systems are not necessarily identical.",
    ],
    table: {
      caption: "Compare two diamond grading reports",
      headers: ["Comparison point", "What to check"],
      rows: [
        ["Laboratory", "Were both diamonds graded by the same laboratory?"],
        ["Report type", "Do both reports contain a comparable level of assessment?"],
        ["Diamond identity", "Are both stones clearly identified as natural diamonds?"],
        ["Shape and measurements", "Which stone has the preferred outline and face-up spread?"],
        ["Carat weight", "Is the weight producing visible size or being retained in depth?"],
        ["Cut and proportions", "How may their light performance and visible spread differ?"],
        ["Colour", "Is the difference visible enough to justify the price premium?"],
        ["Clarity", "Where are the inclusions, and are they visible without magnification?"],
        ["Polish and symmetry", "Are the finish differences commercially or visually meaningful?"],
        ["Fluorescence", "How does each stone appear under normal lighting and daylight?"],
        ["Comments", "Are clouds, graining, treatments or other details disclosed?"],
        ["Imagery", "Do photographs and videos reveal darkness, bow-tie or haziness?"],
        ["Price", "Is the premium supported by a meaningful quality difference?"],
        ["Inspection", "Has the actual diamond been checked rather than only its report?"],
      ],
    },
  },
  workedExample: {
    id: "worked-example",
    title: "Worked Example: Reading a Diamond Report",
    introParagraphs: [
      "Consider this hypothetical natural diamond:",
    ],
    introBullets: [
      "Round Brilliant",
      "1.02 carats",
      "H colour",
      "VS2 clarity",
      "Excellent cut",
      "Excellent polish",
      "Excellent symmetry",
      "Faint fluorescence",
      "No treatment comment",
      "Laser-inscribed report number",
    ],
    steps: [
      "Step 1: Verify the report — Confirm that the laboratory's official database shows the same report number, shape, weight and grades.",
      "Step 2: Confirm natural-diamond identity — Make sure the report explicitly identifies the stone as a natural diamond.",
      "Step 3: Review the measurements — Compare the diameter with other round diamonds of approximately the same weight. Check whether the diamond has a reasonable face-up spread or carries unnecessary weight in its depth.",
      "Step 4: Evaluate colour — H falls within the near-colourless range. Whether colour is noticeable can depend on the individual diamond, its size, cut, setting metal and viewing conditions.",
      "Step 5: Investigate clarity — VS2 is a useful starting point, but it does not guarantee that the diamond will appear eye-clean. Review the clarity plot and video to determine the type, position and visibility of the grade-setting characteristics.",
      "Step 6: Review cut and proportions — Excellent cut is encouraging, but the proportion diagram should still be checked. Review the table, depth, crown, pavilion and girdle information rather than relying on the overall grade alone.",
      "Step 7: Check the finish — Excellent polish and symmetry indicate a high standard of finishing. However, these grades do not replace the overall cut assessment.",
      "Step 8: Consider fluorescence — Faint fluorescence should be treated as an identifying characteristic rather than automatically as a positive or negative.",
      "Step 9: Inspect the physical diamond — Confirm the laser inscription and examine the diamond's brilliance, transparency, inclusions and current condition.",
      "Step 10: Compare the price — Compare the asking price with genuinely similar natural diamonds graded by the same laboratory. Include measurements, proportions and visible appearance in the comparison—not only carat, colour and clarity.",
    ],
    closingParagraph: "The grading report helps organise the buying decision. It does not make the decision for you.",
  },
  labComparison: {
    id: "gia-igi-and-hrd-antwerp-diamond-reports",
    title: "GIA, IGI and HRD Antwerp Diamond Reports",
    introParagraphs: [
      "GIA, IGI and HRD Antwerp all issue diamond-related reports. However, their document types, terminology and assessment methods can differ.",
      "This resource does not declare one laboratory automatically better for every transaction.",
      "The correct process is to:",
    ],
    processSteps: [
      "Identify the issuing laboratory.",
      "Confirm the exact report type.",
      "Verify the report through the official system.",
      "Understand the information included and omitted.",
      "Compare diamonds assessed under comparable systems.",
      "Match the report with the physical stone.",
      "Evaluate the diamond's appearance and price.",
    ],
    closingParagraphs: [
      "A separate GIA versus IGI versus HRD Antwerp comparison should address deeper differences between the laboratories. This resource should remain focused on reading and verifying diamond grading reports.",
    ],
    table: {
      caption: "GIA, IGI and HRD Antwerp report comparison",
      headers: ["Laboratory", "What buyers should know"],
      rows: [
        [
          "GIA",
          "Issues several natural-diamond report types and provides online Report Check. GIA normally uses the term \"grading report\" rather than \"certificate\".",
        ],
        [
          "IGI",
          "Issues natural-diamond, laboratory-grown diamond and jewellery reports. Its reports can be checked through the official IGI verification system.",
        ],
        [
          "HRD Antwerp",
          "Issues diamond and jewellery reports and provides access to its grading-report archive through My HRD Antwerp.",
        ],
      ],
    },
  },
  limitations: {
    id: "what-a-diamond-grading-report-cannot-tell-you",
    title: "What a Diamond Grading Report Cannot Tell You",
    introParagraphs: [
      "Even a detailed and genuine grading report has limitations.",
    ],
    subsections: [
      {
        title: "It does not establish a fair purchase price",
        paragraphs: [
          "A grading report records quality characteristics. It does not determine what the seller should charge or what the diamond may later be worth in another market.",
        ],
      },
      {
        title: "It does not guarantee beauty",
        paragraphs: ["The report may not fully communicate:"],
        bullets: [
          "Bow-tie effect in elongated shapes",
          "Uneven light distribution",
          "Dark or watery areas",
          "Inclusion colour",
          "Transparency",
          "Milky or hazy appearance",
          "Facet-pattern preference",
          "How the diamond moves and sparkles",
          "Personal shape preference",
        ],
      },
      {
        title: "It does not normally prove geographic origin",
        paragraphs: [
          "A standard grading report should not automatically be treated as proof of the country where a diamond was mined.",
          "Geographic-origin or traceability claims require appropriate documentation and a relevant chain-of-custody process.",
        ],
      },
      {
        title: "It does not prove that the seller is trustworthy",
        paragraphs: [
          "A genuine report can still be used within a misleading transaction.",
          "Verify the seller, payment terms, delivery arrangements, inspection conditions and return policy separately.",
        ],
      },
      {
        title: "It does not permanently confirm current condition",
        paragraphs: [
          "A diamond can be chipped, damaged, treated, polished or recut after its original examination.",
          "An older report may therefore require additional verification or updated inspection.",
        ],
      },
      {
        title: "It does not replace an appraisal",
        paragraphs: [
          "A grading report describes the diamond's identity and quality. An appraisal provides an estimated monetary value for a stated purpose, such as insurance.",
        ],
      },
    ],
  },
  warningSigns: {
    id: "diamond-grading-report-warning-signs",
    title: "Diamond Grading Report Warning Signs",
    introLead: "Pause the purchase if:",
    items: [
      "The seller refuses to provide the complete report.",
      "The report number cannot be found on the laboratory's official website.",
      "The online information does not match the supplied document.",
      "The diamond's natural or laboratory-grown identity is unclear.",
      "Important identification wording has been cropped or hidden.",
      "The laser inscription differs from the report number.",
      "The measurements or carat weight do not correspond.",
      "The document appears altered.",
      "A seller-issued appraisal is presented as independent grading.",
      "A valuable diamond has no credible independent documentation.",
      "Important comments or treatment disclosures are ignored.",
      "The seller guarantees value based only on the grading report.",
      "The price is unusually low without a reasonable explanation.",
      "The seller discourages inspection or comparison.",
      "Payment is requested before availability and documentation are confirmed.",
    ],
    closingParagraph: "One material inconsistency is enough to request clarification before proceeding.",
  },
  vsAppraisal: {
    id: "grading-report-versus-appraisal-and-other-documents",
    title: "Grading Report Versus Appraisal and Other Documents",
    introParagraphs: [
      "GIA explains that a grading report is different from a jewellery appraisal.",
      "Before relying on any document, establish:",
    ],
    establishItems: [
      "Who issued it",
      "What was examined",
      "When it was issued",
      "Whether it can be independently verified",
      "What the document actually claims",
      "What the document does not establish",
    ],
    table: {
      caption: "Grading report versus appraisal and other documents",
      headers: ["Document", "Primary purpose", "Describes quality?", "States value?"],
      rows: [
        ["Diamond grading report", "Records identity and quality characteristics", "Yes", "No"],
        ["Jewellery appraisal", "Provides an estimated value for a specified purpose", "Usually", "Yes"],
        ["Sales invoice", "Records the commercial transaction", "Sometimes", "Shows purchase price"],
        ["Origin or traceability document", "Records origin information under a specified process", "Varies", "No"],
        ["Jewellery report", "Describes a mounted item and its components", "Yes, within limitations", "Usually no"],
        ["Certificate of authenticity", "Varies according to the issuer", "Varies", "Usually no"],
      ],
    },
  },
  checklist: {
    id: "natural-diamond-report-checklist",
    title: "Natural Diamond Report Checklist",
    introLead: "Before purchasing a loose natural diamond, confirm:",
    items: [
      "The complete grading report has been provided.",
      "The issuing laboratory is clearly named.",
      "The exact report type has been identified.",
      "The report number has been checked through the official website.",
      "The online record matches the supplied report.",
      "The stone is explicitly identified as a natural diamond.",
      "Shape and cutting style match the listing.",
      "Measurements and carat weight correspond.",
      "Colour and clarity grades are understood.",
      "The clarity plot has been reviewed, where available.",
      "The comments section has been read.",
      "Cut and proportions have been considered.",
      "Polish and symmetry have been checked.",
      "Fluorescence has been reviewed.",
      "Treatment disclosures have been checked.",
      "The laser inscription matches, where present.",
      "Photographs or video show the actual diamond.",
      "Current condition has been considered.",
      "The physical diamond has been inspected where appropriate.",
      "The price has been compared with genuinely similar stones.",
      "Payment and delivery terms are clear.",
    ],
  },
  cta: {
    id: "already-found-a-natural-diamond-online",
    title: "Already Found a Natural Diamond Online?",
    richParagraphs: [
      [
        {
          type: "text",
          value:
            "A grading report is an essential starting point, but it should be considered alongside the physical diamond, supplier, price and transaction process.",
        },
      ],
      [
        { type: "text", value: "With " },
        { type: "link", text: "S2S – Secure To Source", href: "/secure-to-source" },
        {
          type: "text",
          value:
            ", buyers can submit a shortlisted loose natural diamond to Dalila Diamonds for applicable quality-control coordination, euro payment and scheduled delivery to Belgium or another confirmed European Union destination.",
        },
      ],
      [
        { type: "text", value: "If you have not yet selected a stone, use " },
        { type: "link", text: "DS4U – Diamond Source For You", href: "/diamond-source" },
        { type: "text", value: " to request customised natural-diamond sourcing assistance." },
      ],
    ],
    primaryButtonText: "Submit a Shortlisted Diamond",
    primaryButtonHref: "/contact",
    secondaryButtonText: "Browse Natural Diamonds",
    secondaryButtonHref: "/inventory",
  },
  faqs: {
    title: "Frequently Asked Questions About Diamond Grading Reports",
    items: [
      {
        question: "What is a diamond grading report?",
        answer:
          "A diamond grading report is an independent laboratory's technical assessment of a diamond's identity and quality characteristics. It may include the 4Cs, measurements, proportions, polish, symmetry, fluorescence, clarity characteristics, treatments and inscription information.",
      },
      {
        question: "Is a diamond grading report the same as a diamond certificate?",
        answer:
          "The terms are commonly used interchangeably by buyers, but \"grading report\" is generally more accurate. A laboratory report provides a technical assessment. It is not necessarily a guarantee, appraisal or legal certification of market value.",
      },
      {
        question: "What are the most important details on a diamond report?",
        answer:
          "Start with the diamond description, report number, shape, measurements, carat, colour, clarity and cut information. Then examine the proportions, polish, symmetry, fluorescence, clarity characteristics, comments and laser inscription.",
      },
      {
        question: "How do I check a diamond certificate online?",
        answer:
          "Enter the report number on the issuing laboratory's official verification website. Compare the online record with the supplied document and physical diamond. GIA, IGI and HRD Antwerp provide official verification systems.",
      },
      {
        question: "Where can I find the diamond report number?",
        answer:
          "The report number is normally displayed near the top of the document. It may also appear in a QR code, digital-report link or microscopic laser inscription on the diamond's girdle.",
      },
      {
        question: "How can I identify a fake diamond grading report?",
        answer:
          "Verify the number on the laboratory's official website and compare every detail. Warning signs include a missing online record, altered formatting, mismatched measurements, cropped identification wording or an inscription that differs from the report.",
      },
      {
        question: "Does a verified report prove that the physical diamond is genuine?",
        answer:
          "It confirms that the archived report exists. It does not independently prove that the seller has shown you the same diamond. Connect the report with the stone using the inscription, measurements, clarity characteristics and professional inspection.",
      },
      {
        question: "Does every diamond have a laser-inscribed report number?",
        answer:
          "No. Inscription availability depends on the laboratory, report type and services selected. Its absence does not automatically indicate a problem, but an inscription that is present should correspond with the report.",
      },
      {
        question: "Why does my grading report not include a clarity plot?",
        answer:
          "Some report types do not include a full clarity-characteristic diagram. Confirm the exact report product with the issuing laboratory before assuming information is missing.",
      },
      {
        question: "Does a diamond grading report confirm that a diamond is natural?",
        answer:
          "A reputable report should clearly describe whether the examined diamond is natural or laboratory-grown. Never rely only on the 4Cs to determine the diamond's origin.",
      },
      {
        question: "Does a diamond certificate show what the diamond is worth?",
        answer:
          "No. A grading report describes quality but does not normally state market or insurance value. Pricing requires comparison with relevant diamonds and market conditions. Insurance value requires an appropriate appraisal.",
      },
      {
        question: "What is the difference between a grading report and an appraisal?",
        answer:
          "A grading report records technical identity and quality characteristics. An appraisal provides an estimated monetary value for a stated purpose, such as insurance, estate planning or resale consideration.",
      },
      {
        question: "Do diamond grading reports expire?",
        answer:
          "A grading report does not necessarily become invalid after a fixed period. However, the diamond may be chipped, treated, polished or recut after examination. Older reports should be verified, and the current condition may require inspection.",
      },
      {
        question: "Can a damaged or recut diamond still have its old report?",
        answer:
          "Yes. An old report may continue to exist even if the diamond has changed. This is why its measurements, weight, inscription, condition and identifying characteristics should be checked.",
      },
      {
        question: "Why does a fancy-shaped diamond have no GIA cut grade?",
        answer:
          "GIA's standard overall cut-grading system applies to standard round brilliant diamonds in the D-to-Z colour range. Fancy shapes should be evaluated using their measurements, proportions, outline, polish, symmetry, facet pattern, video and physical appearance.",
      },
      {
        question: "Which diamond report is better: GIA, IGI or HRD Antwerp?",
        answer:
          "Each laboratory provides different report types, services and verification systems. Rather than choosing according to the name alone, confirm the report type, understand its methodology, verify the document and compare diamonds assessed under comparable systems.",
      },
      {
        question: "Can I buy a natural diamond without a grading report?",
        answer:
          "It is possible, but buying without credible independent documentation creates additional uncertainty concerning identity, quality and price comparison. The level of acceptable risk depends on the diamond's value, seller and available inspection process.",
      },
      {
        question: "What should I do if the grading report has been lost?",
        answer:
          "Contact the issuing laboratory and check whether a digital record or replacement is available. The diamond may need to be resubmitted if its identity cannot be confirmed or its present condition needs reassessment.",
      },
      {
        question: "Is a seller-issued diamond certificate independent?",
        answer:
          "Not necessarily. A document produced by the seller is not equivalent to a grading report from an independent gemmological laboratory. Check who examined the diamond and whether the issuing organisation provides official verification.",
      },
      {
        question: "Can two diamonds with identical grades look different?",
        answer:
          "Yes. Two diamonds with the same carat, colour and clarity grades can differ in proportions, inclusion location, transparency, fluorescence, facet pattern, visible spread and overall appearance.",
      },
      {
        question: "Does an Excellent cut grade guarantee a beautiful diamond?",
        answer:
          "No single grade guarantees that every buyer will prefer the diamond. An Excellent cut grade is a valuable quality indicator, but proportions, transparency, visual pattern and personal preference should also be considered.",
      },
      {
        question: "Should the laser inscription be the only method used to identify a diamond?",
        answer:
          "No. An inscription is useful, but identification should also consider measurements, carat weight, clarity characteristics, comments and professional inspection.",
      },
    ],
  },
  finalTakeaway: {
    id: "final-takeaway",
    title: "Final Takeaway",
    introParagraphs: [
      "A diamond grading report provides a structured way to understand and compare a natural diamond, but the headline grades are only the beginning.",
      "Verify the report number. Read the measurements, proportions, clarity information, fluorescence and comments. Match the documentation with the physical stone. Then consider appearance, price, seller reliability, payment terms and delivery conditions before purchasing.",
    ],
    doNotAskLead: "Do not simply ask:",
    doNotAskItems: ["Does this diamond have a certificate?"],
    askLead: "Ask:",
    askItems: [
      "What does the report say, does it match the physical diamond, and does the complete stone justify the price?",
    ],
    primaryButtonText: "Use Secure To Source",
    primaryButtonHref: "/secure-to-source",
    secondaryButtonText: "Contact Dalila Diamonds",
    secondaryButtonHref: "/contact",
  },
};

export function getGradingReportContent(locale: string = "en"): GradingReportContent {
  void locale;
  return enContent;
}
