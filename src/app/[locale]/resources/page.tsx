import ResourcesLanding from "@/components/pages/resources/ResourcesLanding";
import { Locale } from "@/lib/i18n/config";

export default async function ResourcesLocalePage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const _locale = (resolvedParams?.locale || "en") as Locale;
  return <ResourcesLanding />;
}
