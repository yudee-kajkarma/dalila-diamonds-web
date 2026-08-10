import { redirect } from "next/navigation";
import { Locale } from "@/lib/i18n/config";

export default async function SudLocaleRedirectPage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  redirect(`/${locale}/sell-your-diamond`);
}
