import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "../src/data/resources/diamond-girdle-guide.json");
const data = JSON.parse(fs.readFileSync(out, "utf8"));

Object.assign(data, {
  bestThickness: {
    id: "best-girdle-thickness-for-a-diamond",
    title: "What Is the Best Girdle Thickness for a Diamond?",
    introParagraphs: [
      "There is no single best girdle description for every natural diamond.",
      "For many modern Round Brilliant diamonds, the following descriptions are commonly practical:",
    ],
    bullets: [
      "Thin",
      "Medium",
      "Slightly Thick",
      "Thin to Medium",
      "Medium to Slightly Thick",
      "Thin to Slightly Thick",
    ],
    closingParagraphs: [
      "These ranges often provide a reasonable balance between durability and weight efficiency.",
      "However, the correct decision still depends on:",
    ],
    dependBullets: [
      "Complete cut grade",
      "Face-up diameter",
      "Total depth",
      "Shape",
      "Minimum thickness",
      "Maximum thickness",
      "Location of variation",
      "Existing damage",
      "Setting",
      "Price",
    ],
    subsections: [
      {
        id: "is-medium-the-best-girdle-grade",
        title: "Is Medium the Best Girdle Grade?",
        paragraphsBefore: [
          "Medium is often considered a balanced result, but it is not automatically better than Thin or Slightly Thick.",
          "A diamond with a Thin to Medium girdle may outperform or offer better value than a diamond with a uniform Medium girdle.",
        ],
      },
      {
        id: "can-slightly-thick-be-excellent",
        title: "Can Slightly Thick Be Excellent?",
        paragraphsBefore: [
          "Yes.",
          "A Slightly Thick area can be compatible with an attractive, well-cut diamond. The overall assessment depends on the complete proportion set and visual performance.",
        ],
      },
      {
        id: "can-thick-be-acceptable",
        title: "Can Thick Be Acceptable?",
        paragraphsBefore: ["Yes.", "A Thick girdle may be acceptable when:"],
        bullets: [
          "Face-up dimensions remain appropriate",
          "Total depth is not excessive",
          "The diamond performs attractively",
          "The thickness is localised",
          "The shape benefits from additional material at vulnerable areas",
          "The price reflects the complete diamond",
        ],
      },
      {
        id: "should-buyers-reject-every-very-thin-or-very-thick-range",
        title: "Should Buyers Reject Every Very Thin or Very Thick Range?",
        paragraphsBefore: [
          "No.",
          "Both deserve closer examination, but neither should be rejected using the report label alone.",
        ],
      },
    ],
  },
  thinGirdles: {
    id: "thin-and-extremely-thin-girdles",
    title: "Thin, Very Thin and Extremely Thin Girdles",
    introParagraphs: ["A thin girdle contains less material between the crown and pavilion."],
    subsections: [
      {
        id: "is-a-thin-girdle-dangerous",
        title: "Is a Thin Girdle Dangerous?",
        paragraphsBefore: [
          "Not automatically.",
          "Thin is a recognised grading description and is common in marketable diamonds. The concern increases when the girdle becomes:",
        ],
        bullets: [
          "Extensively Very Thin",
          "Extremely Thin",
          "Knife-edged",
          "Very thin at a corner or point",
          "Very thin next to a large feather",
          "Already chipped or abraded",
          "Exposed by the setting",
          "Subjected to pressure during setting or repair",
        ],
      },
      {
        id: "why-can-a-thin-girdle-chip",
        title: "Why Can a Thin Girdle Chip?",
        paragraphsBefore: [
          "Diamond is highly resistant to scratching, but it is not impossible to chip.",
          "A thin edge contains less material to absorb or distribute an impact. GIA warns that very thin areas, particularly at the corners and points of fancy shapes, have a greater risk of damage.",
        ],
        paragraphsAfter: [],
      },
      {
        id: "does-very-thin-mean-the-diamond-is-already-damaged",
        title: "Does Very Thin Mean the Diamond Is Already Damaged?",
        paragraphsBefore: [
          "No.",
          "Very Thin describes thickness. It does not automatically mean a chip, cavity or fracture is present.",
          "The actual condition must be inspected.",
        ],
      },
      {
        id: "is-a-localised-very-thin-area-acceptable",
        title: "Is a Localised Very Thin Area Acceptable?",
        paragraphsBefore: ["It may be.", "Consider:"],
        bullets: [
          "Exact location",
          "Length of the thin section",
          "Nearby clarity characteristics",
          "Diamond shape",
          "Setting design",
          "Setting condition",
          "Intended wear",
          "Insurance requirements",
          "Price",
        ],
        paragraphsAfter: [
          "A small Very Thin area protected by a suitable setting may present a different risk from an exposed knife-edge running around a substantial part of the diamond.",
        ],
      },
      {
        id: "can-an-extremely-thin-girdle-receive-a-high-cut-grade",
        title: "Can an Extremely Thin Girdle Receive a High Cut Grade?",
        paragraphsBefore: [
          "Girdle thickness is one of several factors in cut assessment. An unusually thin girdle can limit a Round Brilliant’s grade because of durability risk, even when other proportions are attractive.",
          "Do not infer the final grade from thickness alone. Read the grade stated on the laboratory report.",
        ],
      },
    ],
    richClosingParagraphs: [
      [
        { type: "text", value: "GIA’s guidance on protecting diamonds from chipping explains the principal risk areas. See " },
        {
          type: "link",
          text: "GIA’s diamond care guidance",
          href: "https://4cs.gia.edu/en-us/diamond-care-and-cleaning/",
          external: true,
        },
        { type: "text", value: "." },
      ],
    ],
  },
  thickGirdles: {
    id: "thick-and-extremely-thick-girdles",
    title: "Thick, Very Thick and Extremely Thick Girdles",
    introParagraphs: ["A thick girdle retains more material around the diamond’s perimeter."],
    subsections: [
      {
        id: "why-can-a-thick-girdle-be-undesirable",
        title: "Why Can a Thick Girdle Be Undesirable?",
        paragraphsBefore: [
          "A thick girdle may add carat weight without producing an equivalent increase in face-up dimensions.",
          "Two diamonds can have the same carat weight but different visible size because one carries more weight in:",
        ],
        bullets: ["The girdle", "Pavilion bulge", "Total depth", "A high crown", "Other non-visible areas"],
      },
      {
        id: "does-a-thick-girdle-make-a-diamond-look-smaller",
        title: "Does a Thick Girdle Make a Diamond Look Smaller?",
        paragraphsBefore: [
          "It can.",
          "If a substantial amount of the diamond’s weight is concentrated in the girdle, the face-up diameter or length-and-width measurements may be smaller than those of a more efficiently proportioned diamond of the same weight.",
          "This is why buyers must compare actual millimetre measurements rather than relying on carat weight alone.",
        ],
      },
      {
        id: "does-a-thick-girdle-reduce-sparkle",
        title: "Does a Thick Girdle Reduce Sparkle?",
        paragraphsBefore: [
          "Not automatically.",
          "Girdle thickness primarily affects:",
        ],
        bullets: ["Weight ratio", "Total depth", "Face-up size", "Durability", "Setting"],
        paragraphsAfter: [
          "The diamond’s brightness, fire and scintillation depend on the complete relationship between its crown, pavilion, table, facet pattern and viewing environment.",
          "An excessively thick girdle may accompany poor weight distribution, but the girdle label alone does not determine sparkle.",
        ],
      },
      {
        id: "is-a-very-thick-girdle-more-durable",
        title: "Is a Very Thick Girdle More Durable?",
        paragraphsBefore: [
          "It may provide more material at the edge, but it does not make the diamond damage-proof.",
          "Damage can still occur through:",
        ],
        bullets: [
          "Severe impact",
          "Inclusions near the girdle",
          "Exposed corners",
          "Setting pressure",
          "Existing chips",
          "Poorly fitted jewellery",
          "Contact between diamonds",
          "Careless repair work",
        ],
      },
      {
        id: "can-thickness-be-useful-at-a-fancy-shape-point",
        title: "Can Thickness Be Useful at a Fancy-Shape Point?",
        paragraphsBefore: [
          "Yes.",
          "Additional material near the point of a Pear, Marquise or cornered diamond may help avoid an extremely vulnerable knife edge. However, excessive bulging or unnecessary thickness can still retain weight.",
          "The complete outline and setting should be examined.",
        ],
      },
    ],
  },
  uneven: {
    id: "uneven-and-varying-girdles",
    title: "Uneven and Varying Diamond Girdles",
    introParagraphs: [
      "A diamond’s girdle is rarely perfectly uniform.",
      "Normal variation occurs because brilliant-style girdles are scalloped and because fancy shapes require different facet arrangements around their outlines.",
    ],
    subsections: [
      {
        id: "when-does-variation-become-important",
        title: "When Does Variation Become Important?",
        paragraphsBefore: ["Variation deserves closer attention when it produces:"],
        bullets: [
          "Extremely Thin and Very Thick areas on the same diamond",
          "Abrupt changes rather than gradual transitions",
          "An uneven face-up outline",
          "Unequal corners or shoulders",
          "A sloping girdle plane",
          "A cone-shaped appearance",
          "Misaligned crown and pavilion facets",
          "Setting difficulties",
          "Significant hidden weight",
          "Durability concerns",
          "Visible symmetry problems",
        ],
      },
      {
        id: "does-uneven-thickness-affect-symmetry",
        title: "Does Uneven Thickness Affect Symmetry?",
        paragraphsBefore: [
          "It can.",
          "GIA considers girdle-thickness variation when evaluating symmetry and when assessing painting or digging out. HRD also lists deviation in maximum and minimum girdle thickness among visual symmetry considerations.",
          "A range alone does not establish the symmetry grade. Read the laboratory’s reported symmetry result.",
        ],
      },
      {
        id: "what-is-a-wavy-girdle",
        title: "What Is a Wavy Girdle?",
        paragraphsBefore: [
          "Wavy girdle is an informal expression that may describe visible changes in girdle level or thickness.",
          "Possible causes include:",
        ],
        bullets: [
          "Uneven facet placement",
          "Crown-and-pavilion misalignment",
          "Sloping girdle",
          "Cutting variation",
          "Shape-specific design",
          "Damage or repair",
        ],
        paragraphsAfter: ["The term is not a substitute for a laboratory description."],
      },
      {
        id: "what-is-a-sloping-girdle",
        title: "What Is a Sloping Girdle?",
        paragraphsBefore: [
          "A sloping girdle occurs when the girdle plane is not level relative to the table or the diamond’s intended axis.",
          "It may affect:",
        ],
        bullets: [
          "Side profile",
          "Crown height distribution",
          "Pavilion depth distribution",
          "Symmetry",
          "Setting position",
          "Face-up balance",
        ],
      },
    ],
  },
  finish: {
    id: "faceted-polished-and-bruted-girdles",
    title: "Faceted, Polished and Bruted Diamond Girdles",
    introParagraphs: ["Girdle thickness and girdle finish are separate characteristics."],
    table: {
      caption: "Girdle finish types",
      headers: ["Finish", "General appearance", "Buyer implication"],
      rows: [
        ["Faceted", "Series of small polished surfaces around the girdle", "Common in modern diamonds; examine facet consistency and inscription"],
        ["Polished", "Smooth polished band without separately visible girdle facets", "Can be completely acceptable"],
        ["Bruted", "Frosted or granular surface created during shaping", "Common in older and some modern diamonds; not automatically a defect"],
        ["Partly Faceted", "Only part of the girdle has been faceted", "May be intentional, repaired or considered during symmetry assessment"],
        ["Bearded", "Fine feather-like features extend from the girdle into the stone", "A clarity and condition consideration, not an ordinary finish category"],
      ],
    },
    closingParagraphs: [
      "GIA states that girdle thickness is assessed using the same thickness method whether the girdle is bruted, polished or faceted.",
    ],
    subsections: [
      {
        id: "is-a-faceted-girdle-better",
        title: "Is a Faceted Girdle Better?",
        paragraphsBefore: ["Not automatically.", "A faceted girdle may offer:"],
        bullets: [
          "A refined modern finish",
          "Clearer small surfaces for examination",
          "A suitable area for laser inscription",
          "More consistent visual appearance",
        ],
        paragraphsAfter: ["However, it does not guarantee:", "Better cut", "Better symmetry", "Better polish", "Greater durability", "Natural origin", "Higher value"],
      },
      {
        id: "is-a-bruted-girdle-bad",
        title: "Is a Bruted Girdle Bad?",
        paragraphsBefore: [
          "No.",
          "A bruted girdle may be completely legitimate. It can also be characteristic of certain older cutting periods.",
          "Inspect it for:",
        ],
        bullets: [
          "Excessive roughness",
          "Bearding",
          "Chips",
          "Abrasion",
          "Uneven thickness",
          "Later modification",
          "Compatibility with the claimed age of an antique diamond",
        ],
        paragraphsAfter: [
          "A faceted girdle on an old diamond may represent later repolishing rather than the diamond’s original condition. GIA has documented antique diamonds whose original bruted girdles were later faceted.",
        ],
      },
      {
        id: "what-does-partly-faceted-mean",
        title: "What Does Partly Faceted Mean?",
        paragraphsBefore: [
          "It means only part of the girdle has been divided into polished girdle facets.",
          "Possible explanations include:",
        ],
        bullets: [
          "Incomplete faceting",
          "Localised repolishing",
          "Weight preservation",
          "Removal of damage",
          "Later repair",
          "Original cutting style",
        ],
        paragraphsAfter: ["The buyer should compare the current diamond with its report and any historical documentation."],
      },
    ],
  },
  paintingDigging: {
    id: "painting-and-digging-out",
    title: "Painting and Digging Out",
    introParagraphs: [
      "Painting and digging out are cutting techniques that alter the relationship between the upper- and lower-half facets and the girdle.",
    ],
    subsections: [
      {
        id: "what-is-painting",
        title: "What Is Painting?",
        paragraphsBefore: [
          "During painting, the cutter tilts the upper- or lower-half facets towards the bezel facets or pavilion mains.",
          "This changes the relative thickness between:",
        ],
        bullets: ["Bezel-and-main hill positions", "Upper-and-lower-half junction positions"],
        paragraphsAfter: ["The girdle may appear more heavily scalloped in a particular direction."],
      },
      {
        id: "what-is-digging-out",
        title: "What Is Digging Out?",
        paragraphsBefore: [
          "Digging out is the opposite relationship.",
          "The upper- or lower-half facets are tilted away from the bezels or pavilion mains and towards each other. This makes the girdle thinner at the half-facet junctions relative to the bezel-and-main positions.",
        ],
      },
      {
        id: "why-are-these-techniques-used",
        title: "Why Are These Techniques Used?",
        paragraphsBefore: ["Possible reasons include:"],
        bullets: [
          "Retaining carat weight",
          "Reaching a commercial weight threshold",
          "Removing a clarity characteristic near the girdle",
          "Adjusting facet placement",
          "Preserving rough-diamond yield",
        ],
      },
      {
        id: "are-painting-and-digging-always-bad",
        title: "Are Painting and Digging Always Bad?",
        paragraphsBefore: [
          "No.",
          "Minimal variation can be present without creating a meaningful visual problem.",
          "As painting or digging becomes stronger, it can affect:",
        ],
        bullets: ["Face-up brightness", "Contrast pattern", "Facet definition", "Weight distribution", "Overall cut grade"],
        paragraphsAfter: [
          "GIA calculates the extent of these features using three-dimensional measurement and incorporates sufficiently strong effects into its cut assessment. GIA’s finish and girdle booklet provides diagrams of both techniques.",
        ],
      },
      {
        id: "can-buyers-identify-painting-from-a-photograph",
        title: "Can Buyers Identify Painting From a Photograph?",
        paragraphsBefore: ["Not reliably.", "Controlled imaging may suggest unusual girdle scalloping, but accurate assessment requires:"],
        bullets: [
          "Correct orientation",
          "Side and face-up views",
          "Magnification",
          "Facet analysis",
          "Appropriate lighting",
          "Three-dimensional measurement where necessary",
        ],
        paragraphsAfter: ["Do not diagnose painting or digging from one rotating-video frame."],
      },
    ],
  },
});

fs.writeFileSync(out, JSON.stringify(data, null, 2));
console.log("part2 written", Object.keys(data).length);
