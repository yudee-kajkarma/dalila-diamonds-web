/**
 * Public marketing images on S3.
 * Base: https://uniglo-jewels-dev.s3.eu-north-1.amazonaws.com/dalila
 * Override with NEXT_PUBLIC_S3_BASE_URL (no trailing slash).
 */
export const S3_BASE_URL = (
  process.env.NEXT_PUBLIC_S3_BASE_URL ||
  "https://uniglo-jewels-dev.s3.eu-north-1.amazonaws.com/dalila"
).replace(/\/$/, "");

/** Resolve a public asset path (e.g. /dalila_img/Dalila_Logo.png) to its S3 URL. */
export function s3Asset(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path) || path.startsWith("data:")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${S3_BASE_URL}${normalized}`;
}
