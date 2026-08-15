type NavDictionary = {
  nav?: Record<string, string | undefined>;
};

export type ResourceNavItem = {
  key: string;
  href: string;
  labelKey: string;
  fallback: string;
};

export const RESOURCE_NAV_ITEMS: ResourceNavItem[] = [
  { key: "premium-b2b", href: "/premium-b2b-diamond-supplier-belgium", labelKey: "articleB2b", fallback: "Premium B2B Diamond Supplier in Belgium" },
  { key: "sell-diamond", href: "/sell-your-diamond-safely", labelKey: "articleSell", fallback: "Sell Your Diamond Safely" },
  { key: "elongated-cushion", href: "/elongated-cushion-cut-diamond-guide", labelKey: "articleCushion", fallback: "Elongated Cushion Cut Diamond Guide" },
  { key: "diamond-grading-report-guide", href: "/resources/diamond-grading-report-guide", labelKey: "articleGradingReport", fallback: "Diamond Grading Report Guide" },
  { key: "diamond-quality-chart", href: "/resources/diamond-quality-chart", labelKey: "articleQualityChart", fallback: "Diamond Quality Chart" },
  { key: "diamond-fluorescence-guide", href: "/resources/diamond-fluorescence-guide", labelKey: "articleFluorescenceGuide", fallback: "Diamond Fluorescence Guide" },
  { key: "diamond-culet-guide", href: "/resources/diamond-culet-guide", labelKey: "articleCuletGuide", fallback: "Diamond Culet Guide" },
  { key: "diamond-girdle-guide", href: "/resources/diamond-girdle-guide", labelKey: "articleGirdleGuide", fallback: "Diamond Girdle Guide" },
  { key: "diamond-size-chart", href: "/resources/diamond-size-chart", labelKey: "articleSizeChart", fallback: "Diamond Size Chart" },
  { key: "natural-vs-lab-grown-diamonds", href: "/resources/natural-vs-lab-grown-diamonds", labelKey: "articleNaturalVsLab", fallback: "Natural vs Lab-Grown Diamonds" },
  { key: "diamond-valuation-calculator", href: "/resources/diamond-valuation-calculator", labelKey: "articleValuationCalculator", fallback: "Diamond Valuation Calculator" },
  { key: "where-to-sell-diamond-ring", href: "/resources/where-to-sell-diamond-ring", labelKey: "articleWhereToSellRing", fallback: "Where to Sell a Diamond Ring" },
  { key: "how-to-sell-diamond-ring", href: "/resources/how-to-sell-diamond-ring", labelKey: "articleHowToSellRing", fallback: "How to Sell a Diamond Ring Safely" },
  { key: "diamond-appraisal-antwerp-belgium", href: "/resources/diamond-appraisal-antwerp-belgium", labelKey: "articleAppraisalAntwerp", fallback: "Diamond Appraisal in Antwerp" },
  { key: "sell-diamond-without-certificate", href: "/resources/sell-diamond-without-certificate", labelKey: "articleSellWithoutCert", fallback: "Sell a Diamond Without a Certificate" },
];

export function getResourceNavLabel(dictionary: NavDictionary | undefined, item: ResourceNavItem) {
  return dictionary?.nav?.[item.labelKey] || item.fallback;
}
