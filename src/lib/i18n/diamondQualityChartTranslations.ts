import { getQualityChartData } from "@/lib/i18n/getQualityChartData";

const enData = getQualityChartData("en");

export const QUALITY_CHART_CANONICAL_URL = enData.meta.canonical;
export const QUALITY_CHART_PAGE_TITLE = enData.meta.title;
export const QUALITY_CHART_PAGE_DESCRIPTION = enData.meta.description;

export { getQualityChartData };
