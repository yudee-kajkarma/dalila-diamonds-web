/**
 * Resolves marketing video URLs.
 *
 * Videos are not committed to the repo (see .gitignore) — they live in the same
 * S3 bucket as the images, under the `/videos` prefix. Upload them with:
 *   node scripts/upload-videos-s3.mjs
 *
 * Base URL comes from NEXT_PUBLIC_S3_BASE_URL (shared with s3Asset). Set
 * NEXT_PUBLIC_VIDEO_CDN_URL only if videos need a separate CDN from images.
 */
import { s3Asset } from "./s3Assets";

const VIDEO_CDN_BASE = (process.env.NEXT_PUBLIC_VIDEO_CDN_URL || "").replace(
  /\/$/,
  "",
);

export const VIDEO_PATHS = {
  fallingDiam: "/videos/FALLING_diam.mp4",
  worldNet: "/videos/world_net.mp4",
  video1: "/videos/video1.mp4",
  authBg: "/videos/auth-bg.mp4",
  diamondCountdown: "/videos/diamond_countdown.mp4",
  legacy: "/videos/LEGACY_video.mp4",
} as const;

export type VideoKey = keyof typeof VIDEO_PATHS;

export function videoUrl(pathOrKey: VideoKey | (typeof VIDEO_PATHS)[VideoKey]): string {
  const path =
    pathOrKey in VIDEO_PATHS
      ? VIDEO_PATHS[pathOrKey as VideoKey]
      : (pathOrKey as string);

  if (VIDEO_CDN_BASE) return `${VIDEO_CDN_BASE}${path}`;
  return s3Asset(path);
}
