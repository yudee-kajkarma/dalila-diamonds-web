/**
 * Public marketing media on S3 (images and videos).
 * Base: https://uniglo-jewels-dev.s3.eu-north-1.amazonaws.com/dalila
 * Override with NEXT_PUBLIC_S3_BASE_URL (no trailing slash) to point at a
 * different bucket or a CloudFront distribution.
 */
export const S3_BASE_URL = (
  process.env.NEXT_PUBLIC_S3_BASE_URL ||
  "https://uniglo-jewels-dev.s3.eu-north-1.amazonaws.com/dalila"
).replace(/\/$/, "");

/**
 * The bucket URL that was hardcoded across the codebase before assets were
 * centralised here. Absolute URLs still using it are rebased onto S3_BASE_URL
 * so a single env var retargets them — see withS3Assets for static JSON data.
 */
export const LEGACY_S3_BASE_URL =
  "https://uniglo-jewels-dev.s3.eu-north-1.amazonaws.com/dalila";

/** Resolve a public asset path (e.g. /dalila_img/Dalila_Logo.png) to its S3 URL. */
export function s3Asset(path: string): string {
  if (!path) return path;

  // Rebase legacy absolute URLs onto the configured base.
  if (path.startsWith(LEGACY_S3_BASE_URL)) {
    return `${S3_BASE_URL}${path.slice(LEGACY_S3_BASE_URL.length)}`;
  }

  if (/^https?:\/\//i.test(path) || path.startsWith("data:")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${S3_BASE_URL}${normalized}`;
}

/**
 * Deep-rebase every legacy S3 URL inside a static data object (the JSON under
 * src/data holds absolute URLs). Returns the input unchanged when the base is
 * the default, so there is no cost in the common case.
 */
export function withS3Assets<T>(data: T): T {
  if (S3_BASE_URL === LEGACY_S3_BASE_URL) return data;
  return rebase(data) as T;
}

function rebase(value: unknown): unknown {
  if (typeof value === "string") {
    return value.startsWith(LEGACY_S3_BASE_URL) ? s3Asset(value) : value;
  }
  if (Array.isArray(value)) return value.map(rebase);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, rebase(v)]),
    );
  }
  return value;
}
