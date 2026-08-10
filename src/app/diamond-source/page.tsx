import DiamondSourceBanner from "@/components/pages/diamond-source/Bannersection";
import DiamondSourceHero from "@/components/pages/diamond-source/Herosection";
import DiamondSourceshowcase from "@/components/pages/diamond-source/Showcase";
import DiamondSourceAdvantages from "@/components/pages/diamond-source/Advantage";
import DiamondContact from "@/components/pages/diamond-source/DiamondContact";
import SpecRequestForm from "@/components/pages/diamond-source/SpecRequestForm";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Diamond Source Services | Dalila Diamonds Belgium",
    description: "Discover diamond sourcing expertise with Dalila Diamonds — trusted B2B supplier in Belgium offering premium certified stones and reliable services worldwide.",
    alternates: {
        canonical: "https://www.daliladiamonds.com/diamond-source",
    },
};
export default function Contact() {
    return (
        <>
            <main className="relative">
                <DiamondSourceBanner />
                <DiamondSourceHero />
                <DiamondSourceshowcase />
                <DiamondSourceAdvantages />
                <SpecRequestForm />
                <DiamondContact />
            </main>
        </>
    );
}
