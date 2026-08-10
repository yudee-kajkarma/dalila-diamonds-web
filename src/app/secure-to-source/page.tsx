import SecureSourceBanner from "@/components/pages/securesource/Bannersection";
import SecureSourceHero from "@/components/pages/securesource/Herosection";
import SecureSourceshowcase from "@/components/pages/securesource/Showcase";
import S2SAdvantages from "@/components/pages/securesource/Advantage";
import SecureContact from "@/components/pages/securesource/SecureContact";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Secure to Source Diamonds | Dalila Diamonds Belgium",
    description: "Securely source certified diamonds with Dalila Diamonds in Belgium — trusted B2B supplier, quality assurance, and dependable service for global businesses.",
    alternates: {
        canonical: "https://www.daliladiamonds.com/secure-to-source",
    },
};
export default function Contact() {
    return (
        <>
            <main className="relative">
                <SecureSourceBanner />
                <SecureSourceHero />
                <SecureSourceshowcase />
                <S2SAdvantages />
                <SecureContact />
            </main>
        </>
    );
}
