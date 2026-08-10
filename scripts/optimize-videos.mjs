/**
 * Re-encode public marketing videos for web delivery (H.264 + faststart).
 * Requires ffmpeg-static (devDependency).
 *
 * Usage: node scripts/optimize-videos.mjs
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

if (!ffmpegPath || !fs.existsSync(ffmpegPath)) {
  console.error("ffmpeg-static binary not found. Run: npm install");
  process.exit(1);
}

const targets = [
  // Hero/mask clip — aggressive: 540p, no audio, CRF 32
  {
    rel: "public/images/FALLING_diam.mp4",
    args: ["-vf", "scale=-2:540", "-c:v", "libx264", "-crf", "32", "-preset", "medium", "-an"],
  },
  {
    rel: "public/images/world_net.mp4",
    args: ["-vf", "scale=-2:720", "-c:v", "libx264", "-crf", "28", "-preset", "medium", "-an"],
  },
  {
    rel: "public/images/video1.mp4",
    args: ["-vf", "scale=-2:720", "-c:v", "libx264", "-crf", "28", "-preset", "medium", "-an"],
  },
  {
    rel: "public/New-Videos/auth-bg.mp4",
    args: ["-vf", "scale=-2:720", "-c:v", "libx264", "-crf", "28", "-preset", "medium", "-an"],
  },
  {
    rel: "public/New-Videos/diamond_countdown.mp4",
    args: ["-vf", "scale=-2:720", "-c:v", "libx264", "-crf", "28", "-preset", "medium", "-an"],
  },
  {
    rel: "public/New-Videos/LEGACY_video.mp4",
    args: ["-vf", "scale=-2:720", "-c:v", "libx264", "-crf", "30", "-preset", "medium", "-an"],
  },
];

function formatMb(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

let failed = 0;

for (const target of targets) {
  const input = path.join(root, target.rel);
  if (!fs.existsSync(input)) {
    console.warn(`skip (missing): ${target.rel}`);
    continue;
  }

  const tmp = `${input}.optimized.mp4`;
  const before = fs.statSync(input).size;

  const result = spawnSync(
    ffmpegPath,
    [
      "-y",
      "-i",
      input,
      ...target.args,
      "-movflags",
      "+faststart",
      "-pix_fmt",
      "yuv420p",
      tmp,
    ],
    { stdio: "inherit" },
  );

  if (result.status !== 0 || !fs.existsSync(tmp)) {
    console.error(`failed: ${target.rel}`);
    failed += 1;
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    continue;
  }

  const after = fs.statSync(tmp).size;
  if (after >= before * 0.95) {
    // Keep original if optimization barely helps
    fs.unlinkSync(tmp);
    console.log(`kept original (no meaningful gain): ${target.rel} (${formatMb(before)})`);
    continue;
  }

  fs.renameSync(tmp, input);
  console.log(
    `optimized ${target.rel}: ${formatMb(before)} → ${formatMb(after)} (${Math.round((1 - after / before) * 100)}% smaller)`,
  );
}

if (failed > 0) process.exit(1);
console.log("Done.");
