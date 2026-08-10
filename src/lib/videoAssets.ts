/**
 * Resolves marketing video URLs.
 * Set NEXT_PUBLIC_VIDEO_CDN_URL (no trailing slash) to serve from CDN/object storage.
 * Falls back to same-origin /public paths for local development.
 */
const CDN_BASE = (process.env.NEXT_PUBLIC_VIDEO_CDN_URL || "").replace(
  /\/$/,
  "",
);

export const VIDEO_PATHS = {
  fallingDiam: "/images/FALLING_diam.mp4",
  worldNet: "/images/world_net.mp4",
  video1: "/images/video1.mp4",
  authBg: "/New-Videos/auth-bg.mp4",
  diamondCountdown: "/New-Videos/diamond_countdown.mp4",
  legacy: "/New-Videos/LEGACY_video.mp4",
} as const;

export type VideoKey = keyof typeof VIDEO_PATHS;

export function videoUrl(pathOrKey: VideoKey | (typeof VIDEO_PATHS)[VideoKey]): string {
  const path =
    pathOrKey in VIDEO_PATHS
      ? VIDEO_PATHS[pathOrKey as VideoKey]
      : (pathOrKey as string);

  if (!CDN_BASE) return path;
  return `${CDN_BASE}${path}`;
}
