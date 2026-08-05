import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "../src/data/resources/diamond-girdle-guide.json");

const data = {
  meta: {
    title: "Diamond Girdle Guide: Thickness & Grades | Dalila Diamonds",
    description:
      "Learn what a diamond girdle is, how GIA and HRD grade its thickness, and how thin or thick girdles affect durability, size, setting and value.",
    canonical: "https://www.daliladiamonds.com/resources/diamond-girdle-guide",
    dateModified: "2026-07-30",
  },
  urls: {
    giaAnatomy: "https://4cs.gia.edu/en-us/diamond-anatomy/",
    giaFinishGirdle: "https://4cs.gia.edu/en-us/diamond-cut/",
    giaChipping: "https://4cs.gia.edu/en-us/diamond-care-and-cleaning/",
    giaOval: "https://4cs.gia.edu/en-us/oval-cut-diamond/",
    giaInclusions: "https://4cs.gia.edu/en-us/diamond-clarity/",
    giaInscription: "https://4cs.gia.edu/en-us/diamond-quality-factor/",
    giaLabGrown: "https://www.gia.edu/gia-lab-grown-diamond-reports",
    hrdCutGrade: "https://www.hrdantwerp.com/",
  },
  banner: {
    title: "Diamond Girdle Guide",
    breadcrumbHome: "Home",
    breadcrumbResources: "Resources",
    breadcrumbCurrent: "Diamond Girdle Guide",
    imageAlt: "Diamond Girdle Guide resource banner for natural diamond buyers",
  },
  hero: {
    title: "Diamond Girdle Guide for Natural Diamond Buyers",
    subheading:
      "Understand diamond girdle thickness, GIA and HRD grading, durability, setting considerations, hidden weight, girdle damage and the difference between thin, medium and thick girdles.",
    reviewDateLabel: "Last reviewed:",
    reviewDate: "30 July 2026",
  },
  introduction: {
    paragraphs: [],
    bullets: [],
  },
  quickAnswer: {
    title: "Quick Answer",
    introParagraphs: [
      "The girdle is the narrow outer edge of a polished diamond where the crown meets the pavilion. It defines the diamond’s outline and normally provides the area gripped by prongs, a bezel or another jewellery setting.",
      "For many modern natural diamonds, a Thin, Medium or Slightly Thick girdle—or a reasonable range across these categories—is generally practical. An Extremely Thin or extensively Very Thin girdle can increase vulnerability to chipping, particularly near corners and points. A Very Thick or Extremely Thick girdle can retain weight without increasing the diamond’s visible face-up size.",
      "The girdle description must not be assessed alone. Buyers should consider where the thin and thick sections occur, the diamond’s shape, setting, measurements, symmetry, condition, complete cut performance and price.",
    ],
    attributes: [],
    closingParagraphs: [],
  },
  keyTakeaways: {
    title: "Key Takeaways",
    items: [
      "The girdle is the outer perimeter separating the diamond’s crown from its pavilion.",
      "Girdle thickness is normally reported as a range from the thinnest to the thickest relevant areas.",
      "GIA uses eight verbal descriptions from Extremely Thin to Extremely Thick.",
      "A range such as Thin to Slightly Thick does not mean the entire girdle has one uniform thickness.",
      "Thin, Medium and Slightly Thick girdles are commonly acceptable, but there is no universal best description for every diamond.",
      "Extremely Thin areas may increase chipping risk, especially at corners, points and exposed positions.",
      "Thick girdles may contain weight that does not contribute meaningfully to face-up size.",
      "A thick girdle does not automatically mean the diamond is poorly cut or unattractive.",
      "Faceted, polished and bruted describe the girdle’s finish, not its thickness.",
      "A faceted girdle is not automatically better than a polished or bruted girdle.",
      "Painting and digging out describe variations created by the relationship between the upper- and lower-half facets around the girdle.",
      "Chips, cavities, naturals, indented naturals and bearding must not be confused with ordinary girdle thickness.",
      "A laser inscription on the girdle can help match a diamond to its report, but it is not sufficient identification on its own.",
      "Fancy shapes require special attention at vulnerable corners and points.",
      "Girdle thickness cannot prove that a diamond is natural rather than laboratory-grown.",
      "Price must be based on the complete diamond, not a fixed girdle discount or premium.",
    ],
  },
  importantBuyerNote: {
    id: "important-buyer-note",
    title: "Important Buyer Note",
    paragraphs: [
      "This guide explains how girdles are described and assessed. It does not replace examination of the actual diamond by a qualified gemmologist or experienced diamond professional.",
      "A grading report describes the diamond when it was examined. It does not guarantee that the girdle has remained undamaged since the report was issued.",
    ],
  },
  overviewNav: {
    title: "Guide Overview",
    items: [
      { id: "what-is-a-diamond-girdle", label: "What is a diamond girdle?" },
      { id: "where-the-girdle-is-located", label: "Where the girdle is located" },
      { id: "what-the-girdle-does", label: "What the girdle does" },
      { id: "gia-diamond-girdle-scale", label: "GIA diamond girdle scale" },
      { id: "how-girdle-ranges-are-reported", label: "How girdle ranges are reported" },
      { id: "diamond-girdle-percentages", label: "Diamond girdle percentages" },
      { id: "hrd-antwerp-girdle-measurements", label: "HRD Antwerp girdle measurements" },
      { id: "gia-versus-hrd-girdle-reporting", label: "GIA versus HRD girdle reporting" },
      { id: "best-girdle-thickness-for-a-diamond", label: "Best girdle thickness for a diamond" },
      { id: "thin-and-extremely-thin-girdles", label: "Thin and extremely thin girdles" },
      { id: "thick-and-extremely-thick-girdles", label: "Thick and extremely thick girdles" },
      { id: "uneven-and-varying-girdles", label: "Uneven and varying girdles" },
      { id: "faceted-polished-and-bruted-girdles", label: "Faceted, polished and bruted girdles" },
      { id: "painting-and-digging-out", label: "Painting and digging out" },
      { id: "girdle-damage-and-clarity-characteristics", label: "Girdle damage and clarity characteristics" },
      { id: "laser-inscriptions-on-the-girdle", label: "Laser inscriptions on the girdle" },
      { id: "girdles-in-different-diamond-shapes", label: "Girdles in different diamond shapes" },
      { id: "girdle-thickness-and-jewellery-settings", label: "Girdle thickness and jewellery settings" },
      { id: "girdle-thickness-face-up-size-and-price", label: "Girdle thickness, face-up size and price" },
      { id: "natural-versus-laboratory-grown-diamond-girdles", label: "Natural versus laboratory-grown diamond girdles" },
      { id: "how-to-inspect-a-diamond-girdle", label: "How to inspect a diamond girdle" },
      { id: "worked-diamond-comparison", label: "Worked diamond comparison" },
      { id: "common-girdle-myths", label: "Common girdle myths" },
      { id: "natural-diamond-buying-checklist", label: "Natural-diamond buying checklist" },
      { id: "girdle-guide-faq-heading", label: "Frequently asked questions" },
    ],
  },
};

Object.assign(data, {
  whatIs: {
    id: "what-is-a-diamond-girdle",
    title: "What Is a Diamond Girdle?",
    introParagraphs: [
      "The girdle is the narrow perimeter around a polished diamond where the upper crown and lower pavilion meet.",
      "Viewed from above, the girdle defines the diamond’s outline. It determines whether the polished stone appears:",
    ],
    bullets: [
      "Round",
      "Oval",
      "Square",
      "Rectangular",
      "Pear-shaped",
      "Marquise-shaped",
      "Heart-shaped",
      "Cushion-shaped",
      "Another recognised outline",
    ],
    closingParagraphs: [
      "Viewed from the side, the girdle appears as the dividing edge between the crown and pavilion.",
    ],
    richClosingParagraphs: [
      [
        {
          type: "text",
          value:
            "GIA describes the girdle as the middle portion of the diamond and the part normally used as the setting edge. Its thickness contributes to durability and weight distribution. ",
        },
        { type: "link", text: "GIA’s diamond-anatomy reference", href: "https://4cs.gia.edu/en-us/diamond-anatomy/", external: true },
        { type: "text", value: " explains its position within the complete polished diamond." },
      ],
      [
        { type: "text", value: "For the pavilion point opposite the table, see the " },
        { type: "link", text: "Diamond Culet Guide", href: "/resources/diamond-culet-guide" },
        { type: "text", value: ". For broader quality scales, see the " },
        { type: "link", text: "Diamond Quality Chart", href: "/resources/diamond-quality-chart" },
        { type: "text", value: "." },
      ],
    ],
    subsections: [
      {
        id: "is-the-girdle-a-facet",
        title: "Is the Girdle a Facet?",
        paragraphsBefore: ["Not necessarily.", "The girdle may be:"],
        bullets: ["Faceted", "Polished but not individually faceted", "Bruted or frosted", "Partly faceted", "Irregular in finish"],
        paragraphsAfter: [
          "A faceted girdle contains a sequence of small polished surfaces. A polished girdle may be smooth rather than divided into individual facets. A bruted girdle generally has a frosted or granular appearance created during the shaping process.",
        ],
      },
      {
        id: "is-the-girdle-the-same-as-the-crown",
        title: "Is the Girdle the Same as the Crown?",
        paragraphsBefore: [
          "No.",
          "The crown is the complete upper portion of the diamond above the girdle. The girdle forms the boundary beneath it.",
        ],
      },
      {
        id: "is-the-girdle-the-same-as-the-pavilion",
        title: "Is the Girdle the Same as the Pavilion?",
        paragraphsBefore: [
          "No.",
          "The pavilion is the lower portion below the girdle, extending towards the culet or other pavilion termination.",
        ],
      },
      {
        id: "is-the-girdle-the-same-as-a-lower-girdle-facet",
        title: "Is the Girdle the Same as a Lower-Girdle Facet?",
        paragraphsBefore: [
          "No.",
          "Lower-girdle facets, also called lower-half facets, are pavilion facets extending upwards towards the girdle. They are not the girdle itself.",
        ],
      },
    ],
  },
  whereLocated: {
    id: "where-the-girdle-is-located",
    title: "Where Is the Girdle Located?",
    introParagraphs: ["The principal parts of a polished Round Brilliant are:"],
    bullets: ["Table", "Crown", "Girdle", "Pavilion", "Culet or pavilion point"],
    closingParagraphs: [
      "The table sits at the top. The crown descends from the table to the girdle. The pavilion continues beneath the girdle towards the culet.",
      "The girdle surrounds the entire diamond horizontally.",
      "In a mounted diamond, parts of the girdle may be:",
    ],
    positionBullets: [
      "Covered by prongs",
      "Enclosed by a bezel",
      "Hidden by a halo or surrounding metal",
      "Visible between setting points",
      "Positioned above or below the surrounding jewellery",
      "Difficult to inspect without removing or adjusting the setting",
    ],
    finalParagraphs: ["A complete inspection must account for the areas hidden by metal."],
    displacedBullets: [],
    closingNote: [],
  },
  whatDoes: {
    id: "what-the-girdle-does",
    title: "What Does the Diamond Girdle Do?",
    introParagraphs: ["The girdle has several related functions."],
    subsections: [
      {
        id: "defines-the-diamonds-outline",
        title: "Defines the Diamond’s Outline",
        paragraphsBefore: [
          "The girdle establishes the shape visible when the diamond is viewed face-up.",
          "Variations in the outline may affect:",
        ],
        bullets: [
          "Roundness",
          "Length-to-width ratio",
          "Corner shape",
          "Point alignment",
          "Shoulder balance",
          "Wing shape",
          "Overall symmetry",
        ],
      },
      {
        id: "separates-the-crown-and-pavilion",
        title: "Separates the Crown and Pavilion",
        paragraphsBefore: [
          "The girdle forms the transition between the diamond’s upper and lower sections.",
          "Its thickness contributes to:",
        ],
        bullets: ["Total depth", "Weight distribution", "Durability", "Setting suitability", "Face-up dimensions"],
      },
      {
        id: "provides-the-setting-edge",
        title: "Provides the Setting Edge",
        paragraphsBefore: [
          "Prongs, bezels and other mounting components normally secure the diamond around its girdle.",
          "For that reason, setters must consider:",
        ],
        bullets: [
          "Minimum girdle thickness",
          "Thickness variation",
          "Corners and points",
          "Existing chips",
          "Naturals and cavities",
          "Feather locations",
          "Girdle finish",
          "Whether an inscription needs to remain visible",
          "The pressure required to secure the stone",
        ],
      },
      {
        id: "protects-the-diamonds-edge",
        title: "Protects the Diamond’s Edge",
        paragraphsBefore: [
          "A properly proportioned girdle provides material between the crown and pavilion.",
          "If the girdle becomes extremely thin or knife-edged, the edge may be more vulnerable to chipping. If it is unnecessarily thick, it may retain weight that contributes little to the diamond’s visible spread.",
        ],
      },
    ],
  },
});

Object.assign(data, {
  giaScale: {
    id: "gia-diamond-girdle-scale",
    title: "GIA Diamond Girdle Scale",
    introParagraphs: ["GIA uses the following girdle-thickness descriptions:"],
    table: {
      caption: "GIA girdle thickness descriptions",
      headers: ["GIA description", "General interpretation", "Practical buyer approach"],
      rows: [
        ["Extremely Thin", "Little or no measurable girdle in one or more relevant areas", "Investigate location, extent, durability and setting risk"],
        ["Very Thin", "Narrow girdle areas are present", "Determine whether they are localised or extensive and whether points or corners are affected"],
        ["Thin", "A relatively narrow but established girdle", "Frequently acceptable when undamaged and appropriate for the shape"],
        ["Medium", "Balanced middle-range thickness", "Commonly practical for durability and weight distribution"],
        ["Slightly Thick", "Moderately increased thickness", "Often acceptable if face-up dimensions and proportions remain attractive"],
        ["Thick", "Noticeably increased girdle thickness", "Compare weight, diameter, depth and face-up appearance"],
        ["Very Thick", "Substantial thickness in one or more areas", "Check for hidden weight, reduced spread and setting implications"],
        ["Extremely Thick", "Very substantial girdle thickness", "Requires careful comparison of weight efficiency, proportions and appearance"],
      ],
    },
    richClosingParagraphs: [
      [
        {
          type: "text",
          value:
            "GIA assesses girdle thickness visually under 10× magnification and reports either a single description or a range. Its complete scale and measurement methodology are provided in the ",
        },
        { type: "link", text: "GIA finish, culet and girdle reference", href: "https://4cs.gia.edu/en-us/diamond-cut/", external: true },
        { type: "text", value: "." },
      ],
    ],
    subsections: [
      {
        id: "is-the-gia-scale-a-quality-scale",
        title: "Is the GIA Scale a Quality Scale?",
        paragraphsBefore: ["Not by itself.", "The terms describe thickness. Their buying significance depends on:"],
        bullets: [
          "Minimum thickness",
          "Maximum thickness",
          "Location of each extreme",
          "Diamond shape",
          "Corner and point vulnerability",
          "Girdle condition",
          "Overall proportions",
          "Weight ratio",
          "Symmetry",
          "Setting",
          "Face-up appearance",
        ],
        paragraphsAfter: [
          "Medium is not automatically superior to every Thin or Slightly Thick girdle. Similarly, a Very Thick area does not automatically make a diamond unsuitable.",
        ],
      },
      {
        id: "can-gia-report-a-single-description",
        title: "Can GIA Report a Single Description?",
        paragraphsBefore: [
          "Yes.",
          "If the thinnest and thickest relevant girdle areas fall within the same category, the report may show one description, such as:",
        ],
        bullets: ["Medium", "Thin", "Slightly Thick"],
        paragraphsAfter: ["More commonly, the report provides a range such as:", "Thin to Medium", "Medium to Slightly Thick", "Very Thin to Thick"],
      },
    ],
  },
  rangesReported: {
    id: "how-girdle-ranges-are-reported",
    title: "How Are Diamond Girdle Ranges Reported?",
    introParagraphs: [
      "A description such as Thin to Slightly Thick represents the observed minimum and maximum relevant girdle thicknesses.",
      "It does not mean:",
    ],
    bullets: [
      "Half the girdle is Thin and half is Slightly Thick",
      "The average thickness is Medium",
      "Every area between the two descriptions is equally represented",
      "The girdle is damaged",
      "The diamond is asymmetrical",
      "The diamond cannot receive a high cut grade",
    ],
    subsections: [
      {
        id: "how-should-a-girdle-range-be-read",
        title: "How Should a Girdle Range Be Read?",
        paragraphsBefore: ["The first term is the minimum thickness. The second is the maximum."],
        table: {
          caption: "Reading girdle range descriptions",
          headers: ["Report description", "Minimum", "Maximum"],
          rows: [
            ["Thin to Medium", "Thin", "Medium"],
            ["Medium to Slightly Thick", "Medium", "Slightly Thick"],
            ["Very Thin to Thick", "Very Thin", "Thick"],
            ["Thin to Very Thick", "Thin", "Very Thick"],
            ["Medium", "Medium", "Medium"],
          ],
        },
      },
      {
        id: "does-a-wide-range-mean-the-girdle-is-bad",
        title: "Does a Wide Range Mean the Girdle Is Bad?",
        paragraphsBefore: ["Not automatically.", "A wider range requires examination because it may result from:"],
        bullets: [
          "Normal variation around a scalloped girdle",
          "The design of a fancy shape",
          "Extra material near a corner or point",
          "Painting",
          "Digging out",
          "Facet-placement variation",
          "A natural or indented natural",
          "An extra facet",
          "Cutting decisions used to retain weight",
          "An irregular outline",
          "Damage",
        ],
        paragraphsAfter: [
          "The location and extent of the variation matter more than the width of the verbal range alone.",
        ],
      },
      {
        id: "can-one-small-area-determine-the-minimum-description",
        title: "Can One Small Area Determine the Minimum Description?",
        paragraphsBefore: [
          "A limited area can influence the reported minimum, although laboratory methodology also considers characteristics interrupting the girdle.",
          "GIA explains that features such as a natural, cavity, chip or extra facet may narrow the girdle locally. The remaining girdle and any true knife-edge area must be assessed according to the laboratory’s methodology.",
          "Therefore, do not assume that a report stating Very Thin means the entire girdle is Very Thin.",
        ],
      },
    ],
  },
  percentages: {
    id: "diamond-girdle-percentages",
    title: "Diamond Girdle Percentage",
    introParagraphs: [
      "For a Round Brilliant, girdle thickness can be expressed relative to the diamond’s average girdle diameter.",
      "The supporting formula is:",
      "Girdle thickness percentage = girdle thickness ÷ average girdle diameter × 100",
      "GIA distinguishes between two related assessments:",
    ],
    bullets: [
      "Average thickness measured at the eight bezel-and-pavilion-main hill positions",
      "Minimum and maximum thickness visually assessed at the thinner valley positions",
    ],
    richClosingParagraphs: [
      [
        {
          type: "text",
          value:
            "GIA reports the average hill-position percentage to the nearest 0.5%. The verbal range is based on the relevant minimum and maximum valley areas. ",
        },
        { type: "link", text: "GIA’s Round Brilliant anatomy guide", href: "https://4cs.gia.edu/en-us/diamond-anatomy/", external: true },
        { type: "text", value: " explains the difference." },
      ],
    ],
    subsections: [
      {
        id: "what-are-hill-and-valley-positions",
        title: "What Are Hill and Valley Positions?",
        paragraphsBefore: [
          "A brilliant-cut diamond has a scalloped girdle.",
          "Hill positions are thicker areas where bezel facets and pavilion-main facets meet.",
          "Valley positions are thinner areas associated with the upper- and lower-half facet junctions.",
          "Because these positions measure different parts of the girdle, an average percentage must not be treated as a direct translation of the verbal minimum-to-maximum range.",
        ],
      },
      {
        id: "can-buyers-convert-gia-percentages-into-exact-verbal-grades",
        title: "Can Buyers Convert GIA Percentages Into Exact Verbal Grades?",
        paragraphsBefore: ["Not reliably.", "GIA states that:"],
        bullets: [
          "Its published percentage examples are approximate",
          "Extremely fine measurements are affected by instrument tolerance",
          "Clarity characteristics may interfere with measurement",
          "The girdle may be irregular",
          "The girdle may not be perpendicular to the table",
          "Visual verification remains necessary",
        ],
        paragraphsAfter: [
          "For this reason, use the laboratory’s stated description rather than applying a self-created conversion table.",
        ],
      },
      {
        id: "does-a-higher-percentage-always-mean-a-worse-diamond",
        title: "Does a Higher Percentage Always Mean a Worse Diamond?",
        paragraphsBefore: [
          "No.",
          "A higher girdle percentage indicates more thickness, not complete diamond quality.",
          "Its effect must be assessed alongside:",
        ],
        bullets: [
          "Crown height",
          "Pavilion depth",
          "Total depth",
          "Table size",
          "Face-up dimensions",
          "Cut grade",
          "Symmetry",
          "Shape",
          "Weight distribution",
          "Price",
        ],
      },
    ],
  },
  hrdMeasurements: {
    id: "hrd-antwerp-girdle-measurements",
    title: "HRD Antwerp Girdle Measurements",
    introParagraphs: [
      "HRD Antwerp commonly reports the girdle using a verbal description, percentage and finish.",
      "Under its January 2025 guidance, HRD uses the following descriptive ranges:",
    ],
    table: {
      caption: "HRD Antwerp girdle descriptive ranges",
      headers: ["HRD description", "Measured girdle value"],
      rows: [
        ["Extremely Thin", "0.0%–0.5%"],
        ["Very Thin", "1.0%–1.5%"],
        ["Thin", "2.0%–2.5%"],
        ["Medium", "3.0%–5.0%"],
        ["Thick", "5.5%–6.0%"],
        ["Very Thick", "6.5%–7.5%"],
        ["Extremely Thick", "8.0% and above"],
      ],
    },
    closingParagraphs: [
      "HRD separately evaluates how the percentage contributes to the Round Brilliant proportions grade:",
    ],
    proportionsTable: {
      caption: "HRD girdle percentage and proportions categories",
      headers: ["HRD girdle percentage", "Girdle-related proportions category"],
      rows: [
        ["2.5%–4.5%", "Excellent"],
        ["2.0% or 5.0%–6.5%", "Very Good"],
        ["1.0%–1.5% or 7.0%–8.5%", "Good"],
        ["Up to 0.5% or 9.0% and above", "Fair"],
      ],
    },
    finalParagraphs: [
      "These classifications describe the girdle’s contribution to HRD’s proportions assessment. They do not determine the complete grade by themselves.",
      "HRD also considers crown angle, pavilion angle, table width, crown height, pavilion depth, total depth, culet, polish, symmetry and other observable effects. The complete methodology appears in the HRD Antwerp 2025 cut-grade chart.",
    ],
    subsections: [
      {
        id: "why-is-hrd-relevant-to-european-buyers",
        title: "Why Is HRD Relevant to European Buyers?",
        paragraphsBefore: [
          "HRD Antwerp reports are frequently encountered in Belgium and the wider European diamond market.",
          "Buyers must recognise that:",
        ],
        bullets: [
          "GIA and HRD report formats differ",
          "Their descriptive boundaries differ",
          "Their cut-grade structures differ",
          "GIA’s verbal range is not a direct mathematical equivalent of HRD’s percentage",
          "The complete report must be interpreted according to the issuing laboratory",
        ],
      },
    ],
  },
  giaVsHrd: {
    id: "gia-versus-hrd-girdle-reporting",
    title: "GIA Versus HRD Girdle Reporting",
    introParagraphs: [],
    table: {
      caption: "GIA versus HRD Antwerp girdle reporting",
      headers: ["Feature", "GIA", "HRD Antwerp"],
      rows: [
        ["Primary reporting approach", "Verbal minimum-to-maximum range supported by proportion measurements", "Percentage and verbal description"],
        ["Thickness scale", "Extremely Thin through Extremely Thick, including Slightly Thick", "Extremely Thin through Extremely Thick"],
        ["Slightly Thick category", "Yes", "Not shown as a separate category in the January 2025 chart"],
        ["Percentage methodology", "Average hill-position percentage plus visual valley assessment", "Percentage-based proportion parameter"],
        ["Cut-grade structure", "Overall cut grade for qualifying standard Round Brilliants", "Proportions, polish and symmetry categories"],
        ["Girdle finish", "May state faceted, polished or bruted", "May state faceted, polished or another applicable finish"],
        ["Buyer approach", "Read the complete range, average percentage, finish and overall report", "Read the percentage, description, proportions grade and complete report"],
      ],
    },
    closingParagraphs: [],
    subsections: [
      {
        id: "can-gia-and-hrd-grades-be-converted-directly",
        title: "Can GIA and HRD Grades Be Converted Directly?",
        paragraphsBefore: ["No.", "Do not assume:"],
        bullets: [
          "GIA Medium always equals one HRD percentage",
          "GIA Slightly Thick always equals HRD Medium or Thick",
          "GIA Very Thin always has the same cut implication as an HRD percentage",
          "Identical percentages guarantee identical overall cut grades",
          "A verbal description has the same boundaries across laboratories",
        ],
        paragraphsAfter: ["Treat each report according to the issuing laboratory’s published methodology."],
      },
    ],
  },
});

fs.writeFileSync(out, JSON.stringify(data, null, 2));
console.log("part1 written", Object.keys(data).length);
