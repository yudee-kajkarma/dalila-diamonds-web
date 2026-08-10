import WebuyBanner from "@/components/pages/sud/Bannersection";
import Webuyhero from "@/components/pages/sud/Herosection";
import SellDiamondsProcess from "@/components/pages/sud/SellDiamond";
import SellDiamondsForm from "@/components/pages/sud/SellDiamondform";
import FreeEstimateSteps from "@/components/pages/sud/FreeEstimateSteps";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Sell Your Diamonds in Belgium | Dalila Diamonds",
    description: "Looking to sell your diamonds? Dalila Diamonds in Belgium offers secure transactions, fair market prices, and trusted B2B diamond buying services.",
    alternates: {
        canonical: "https://www.daliladiamonds.com/sell-your-diamond",
    },
};
export default function Webuy() {
    return (
        <>
            <main className="relative">
                <WebuyBanner />
                <Webuyhero />
                <SellDiamondsProcess />
                <FreeEstimateSteps />
                <SellDiamondsForm />
            </main>
        </>
    );
}
