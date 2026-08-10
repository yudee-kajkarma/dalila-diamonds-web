/**
 * Re-encode marketing videos for web delivery (H.264 + faststart).
 * Requires ffmpeg-static (devDependency).
 *
 * The .mp4 sources are not committed (see .gitignore). Stage them in
 * .video-staging/ first — they can be recovered from git history:
 *   git show ef81b2a~1:public/images/FALLING_diam.mp4 > .video-staging/FALLING_diam.mp4
 *
 * Usage:
 *   npm run optimize:videos     # .video-staging/*.mp4 -> .video-staging/optimized/
 *   npm run upload:videos       # publish optimized/ to S3
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const ffmpegPath = require("ffmpeg-static");

const SOURCE_DIR = path.join(root, ".video-staging");
const OUTPUT_DIR = path.join(SOURCE_DIR, "optimized");

if (!ffmpegPath || !fs.existsSync(ffmpegPath)) {
  console.error("ffmpeg-static binary not found. Run: npm install");
  process.exit(1);
}

if (!fs.existsSync(SOURCE_DIR)) {
  console.error(`No source directory: ${SOURCE_DIR}`);
  console.error("Stage the .mp4 files there first (see header comment).");
  process.exit(1);
}

// maxHeight is a ceiling, never an upscale — a 480p source stays 480p.
const targets = [
  { name: "FALLING_diam.mp4", maxHeight: 540, crf: 32 },
  { name: "world_net.mp4", maxHeight: 720, crf: 28 },
  { name: "video1.mp4", maxHeight: 720, crf: 28 },
  { name: "auth-bg.mp4", maxHeight: 720, crf: 28 },
  { name: "diamond_countdown.mp4", maxHeight: 720, crf: 28 },
  { name: "LEGACY_video.mp4", maxHeight: 720, crf: 30 },
];

function formatMb(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

let failed = 0;
let totalBefore = 0;
let totalAfter = 0;

for (const target of targets) {
  const input = path.join(SOURCE_DIR, target.name);
  if (!fs.existsSync(input)) {
    console.warn(`skip (missing): ${target.name}`);
    continue;
  }

  const output = path.join(OUTPUT_DIR, target.name);
  const before = fs.statSync(input).size;

  // Clamp to maxHeight without upscaling, and keep both dimensions even
  // (required by yuv420p).
  const scale = `scale=-2:trunc(min(ih\\,${target.maxHeight})/2)*2`;

  const result = spawnSync(
    ffmpegPath,
    [
      "-y",
      "-i", input,
      "-vf", scale,
      "-c:v", "libx264",
      "-crf", String(target.crf),
      "-preset", "medium",
      "-an",
      "-movflags", "+faststart",
      "-pix_fmt", "yuv420p",
      output,
    ],
    { stdio: "inherit" },
  );

  if (result.status !== 0 || !fs.existsSync(output)) {
    console.error(`failed: ${target.name}`);
    failed += 1;
    if (fs.existsSync(output)) fs.unlinkSync(output);
    continue;
  }

  const after = fs.statSync(output).size;
  totalBefore += before;
  totalAfter += after;

  console.log(
    `optimized ${target.name}: ${formatMb(before)} → ${formatMb(after)} (${Math.round((1 - after / before) * 100)}% smaller)`,
  );
}

if (totalBefore > 0) {
  console.log(
    `\nTotal: ${formatMb(totalBefore)} → ${formatMb(totalAfter)} (${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller)`,
  );
  console.log(`Output: ${path.relative(root, OUTPUT_DIR)}`);
  console.log("Publish with: npm run upload:videos");
}

if (failed > 0) process.exit(1);
console.log("Done.");
