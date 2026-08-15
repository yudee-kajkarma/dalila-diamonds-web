import { NextResponse } from "next/server";
import rawData from "@/data/resources/diamond-quality-chart.json";
import { withS3Assets } from "@/lib/s3Assets";

// Static JSON holds absolute S3 URLs; rebase onto NEXT_PUBLIC_S3_BASE_URL.
const data = withS3Assets(rawData);

// Pure in-memory HTML from imported JSON — prerender at build instead of
// invoking compute per download.
export const dynamic = "force-static";

export async function GET() {
  const table = data.atAGlance.table;
  const rowsHtml = table.rows
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td style="border:1px solid #ccc;padding:8px;vertical-align:top">${cell}</td>`).join("")}</tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Dalila Diamond Quality Chart</title>
  <style>
    body { font-family: Georgia, serif; max-width: 960px; margin: 40px auto; padding: 0 20px; color: #1a1a1a; }
    h1 { font-size: 28px; margin-bottom: 8px; }
    p { line-height: 1.5; }
    table { width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 13px; }
    th { background: #f8f8f8; border: 1px solid #ccc; padding: 8px; text-align: left; }
    .note { color: #555; font-size: 13px; margin-top: 24px; }
    @media print { a { display: none; } }
  </style>
</head>
<body>
  <h1>Dalila Diamond Quality Chart</h1>
  <p>Compare cut, colour, clarity, carat and related quality factors for natural diamonds.</p>
  <table>
    <thead><tr>${table.headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
    <tbody>${rowsHtml}</tbody>
  </table>
  <p class="note">${data.atAGlance.closing?.[0] || "Diamond quality assessment requires examination of multiple factors."}</p>
  <p class="note">Source: ${data.meta.canonical}</p>
  <script>window.print()</script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
