import { getQualityChartData } from "@/lib/i18n/getQualityChartData";

const enData = getQualityChartData("en");

export const QUALITY_CHART_CANONICAL_URL = enData.meta.canonical;
export const QUALITY_CHART_PAGE_TITLE = enData.meta.title;
export const QUALITY_CHART_PAGE_DESCRIPTION = enData.meta.description;
export const GIA_4CS_URL = enData.urls.gia4Cs;
export const GIA_CUT_URL = enData.urls.giaCut;
export const GIA_COLOUR_URL = enData.urls.giaColour;
export const GIA_CLARITY_URL = enData.urls.giaClarity;
export const GIA_CARAT_URL = enData.urls.giaCarat;

export { getQualityChartData };
