/**
 * Upload marketing videos to S3.
 *
 * The .mp4 files are intentionally not committed (see .gitignore) — they are
 * served from S3 under the `/videos` prefix and resolved by src/lib/videoAssets.ts.
 *
 * Requires the AWS CLI and credentials in the environment:
 *   AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET
 * (or an AWS profile). Never commit these — keep them in an ignored .env.
 *
 * Usage:
 *   node scripts/upload-videos-s3.mjs <source-dir>
 *
 * Source dir defaults to ./.video-staging/optimized. Originals can be recovered
 * from git history if lost:
 *   git show ef81b2a~1:public/images/FALLING_diam.mp4 > FALLING_diam.mp4
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const BUCKET = process.env.AWS_S3_BUCKET;
const REGION = process.env.AWS_REGION || "eu-north-1";
const PREFIX = process.env.S3_VIDEO_PREFIX || "dalila/videos";
const CACHE_CONTROL = "public, max-age=2592000";

// On Windows the AWS CLI is a .cmd shim, so spawnSync needs a shell — which
// re-splits arguments on spaces. Quote each argument to survive that.
const useShell = process.platform === "win32";
const quote = (arg) => (useShell ? `"${String(arg).replace(/"/g, '\\"')}"` : arg);

// Must match the filenames in VIDEO_PATHS (src/lib/videoAssets.ts).
const EXPECTED = [
  "FALLING_diam.mp4",
  "world_net.mp4",
  "video1.mp4",
  "auth-bg.mp4",
  "diamond_countdown.mp4",
  "LEGACY_video.mp4",
];

if (!BUCKET) {
  console.error("AWS_S3_BUCKET is not set.");
  process.exit(1);
}

const sourceDir = path.resolve(process.argv[2] || ".video-staging/optimized");
if (!fs.existsSync(sourceDir)) {
  console.error(`Source directory not found: ${sourceDir}`);
  process.exit(1);
}

const missing = EXPECTED.filter((f) => !fs.existsSync(path.join(sourceDir, f)));
if (missing.length) {
  console.error(`Missing videos in ${sourceDir}:\n  ${missing.join("\n  ")}`);
  process.exit(1);
}

let failed = 0;

for (const name of EXPECTED) {
  const file = path.join(sourceDir, name);
  const key = `${PREFIX}/${name}`;
  const sizeMb = (fs.statSync(file).size / (1024 * 1024)).toFixed(1);

  process.stdout.write(`uploading ${name} (${sizeMb} MB) -> s3://${BUCKET}/${key} ... `);

  // No --acl: the bucket serves /dalila/* publicly via bucket policy, and
  // modern buckets have ACLs disabled (bucket-owner-enforced).
  const result = spawnSync(
    "aws",
    [
      "s3api",
      "put-object",
      "--bucket", quote(BUCKET),
      "--key", quote(key),
      "--body", quote(file),
      "--content-type", quote("video/mp4"),
      "--cache-control", quote(CACHE_CONTROL),
      "--region", quote(REGION),
    ],
    { stdio: ["ignore", "ignore", "pipe"], shell: useShell },
  );

  if (result.status !== 0) {
    console.log("FAILED");
    console.error(String(result.stderr || "").trim());
    failed += 1;
    continue;
  }
  console.log("ok");
}

if (failed > 0) {
  console.error(`\n${failed} upload(s) failed.`);
  process.exit(1);
}

console.log(`\nDone. Verify one object is publicly readable, e.g.:`);
console.log(
  `  curl -I https://${BUCKET}.s3.${REGION}.amazonaws.com/${PREFIX}/auth-bg.mp4`,
);
