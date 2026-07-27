import ContactBanner from "@/components/pages/contactus/Bannersection";
import ContactForm from "@/components/pages/contactus/ContactForm";
import ContactHeroSection from "@/components/pages/contactus/Herosection";
import { generateLocalizedMetadata } from "@/lib/i18n/generateLocalizedMetadata";
import { Locale } from "@/lib/i18n/config";

export async function generateMetadata({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  return generateLocalizedMetadata(locale, { pageKey: "contact", path: "/contact" });
}

export default function Page() {
  return (
    <main className="relative overflow-x-hidden w-full max-w-full">
      <ContactBanner />
      <ContactHeroSection />
      <ContactForm />
    </main>
  );
}
