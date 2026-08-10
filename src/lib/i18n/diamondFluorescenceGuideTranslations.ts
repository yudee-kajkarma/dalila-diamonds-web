import { getFluorescenceGuideData } from "@/lib/i18n/getFluorescenceGuideData";

const enData = getFluorescenceGuideData("en");

export const FLUORESCENCE_GUIDE_CANONICAL_URL = enData.meta.canonical;
export const FLUORESCENCE_GUIDE_PAGE_TITLE = enData.meta.title;
export const FLUORESCENCE_GUIDE_PAGE_DESCRIPTION = enData.meta.description;
export const GIA_FLUORESCENCE_URL = enData.urls.giaFluorescence;
export const GIA_FLUORESCENCE_RESEARCH_URL = enData.urls.giaFluorescenceResearch;

export { getFluorescenceGuideData };
