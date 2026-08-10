import { getGradingReportData } from "@/lib/i18n/getGradingReportData";

const enData = getGradingReportData("en");

export const GRADING_REPORT_CANONICAL_URL = enData.meta.canonical;
export const GRADING_REPORT_PAGE_TITLE = enData.meta.title;
export const GRADING_REPORT_PAGE_DESCRIPTION = enData.meta.description;
export const GIA_REPORT_CHECK_URL = enData.urls.giaReportCheck;
export const IGI_VERIFY_URL = enData.urls.igiVerify;
export const HRD_VERIFY_URL = enData.urls.hrdVerify;

export { getGradingReportData };
