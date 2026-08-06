"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GoldButton from "@/components/ui/Button";
import { Marcellus, Jost } from "next/font/google";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import { useLanguage } from "@/context/LanguageContext";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default function Aboutshowcase() {
  const router = useRouter();
  const { locale, dictionary } = useLanguage();
  const localizedPath = (path: string) => {
    if (!locale || locale === "en") return path;
    return `/${locale}${path}`;
  };

  const handleExploreMore = () => {
    router.push(localizedPath("/inventory"));
  };

  const handleSellNow = () => {
    router.push(localizedPath("/sell-your-diamond"));
  };

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Sell Diamonds Section */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-16 items-center mb-32">
          {/* Image first on mobile, left on desktop */}
          <div className="order-1 md:order-none w-full">
            <AnimatedContainer direction="scale-out">
              <div>
                <div className="relative h-[290px] md:h-[340px] w-full max-w-[480px] mx-auto rounded-none overflow-hidden shadow-2xl">
                  <Image
                    src="/images/Heritage.jpg"
                    alt="Professional diamond dealer"
                    width={480}
                    height={340}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover"
                  />
                </div>
              </div>
            </AnimatedContainer>
          </div>
          <div className="order-2 md:order-none w-full">
            <div className="max-w-xl mx-auto">
              <AnimatedContainer direction="up">
                <h2
                  className={`text-[2.75rem] md:text-5xl lg:text-[3.25rem] font-light mb-7 text-gray-900 leading-[1.15] tracking-tight ${marcellus.className} `}
                >
                  {dictionary?.about?.heritageTitle || "Our Heritage"}
                </h2>
              </AnimatedContainer>
              <p
                className={`text-gray-600 leading-relaxed mb-8 text-[15px] md:text-base font-normal ${jost.className}`}
              >
                {dictionary?.about?.heritageText || "The roots of our company stretch back..."}
              </p>
              <div onClick={handleExploreMore}>
                <GoldButton text={dictionary?.about?.exploreMore || "Explore More"} />
              </div>
            </div>
          </div>
        </div>

        {/* Language of Diamonds Section */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-16 items-center">
          {/* Image first on mobile, right on desktop */}
          <div className="order-1 md:order-2 w-full">
            <AnimatedContainer direction="scale-out">
              <div className="relative h-[290px] md:h-[340px] w-full max-w-[480px] mx-auto rounded-none overflow-hidden shadow-2xl">
                <Image
                  src="/images/diamondwork.png"
                  alt="Diamond examination with tweezers"
                  width={480}
                  height={340}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
            </AnimatedContainer>
          </div>
          <div className="order-2 md:order-1 w-full">
            <div className="max-w-xl mx-auto">
              <AnimatedContainer direction="up">
                <h2
                  className={`text-[2.75rem] md:text-5xl lg:text-[3.25rem] font-light mb-7 text-gray-900 leading-[1.15] tracking-tight ${marcellus.className}`}
                >
                  {dictionary?.about?.knowledgeTitle || "Diamond Knowledge Guide"}
                </h2>
              </AnimatedContainer>
              <p
                className={`text-gray-600 leading-relaxed mb-8 text-[15px] md:text-base font-normal ${jost.className}`}
              >
                {dictionary?.about?.knowledgeText || "Diamonds are more than just gemstones..."}
              </p>
              <div onClick={handleExploreMore}>
                <GoldButton text={dictionary?.about?.exploreMore || "Explore More"} />
              </div>
            </div>
          </div>
        </div>

        {/* Sell Diamonds Section 2 */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-16 items-center mb-25 mt-25">
          {/* Image first on mobile, left on desktop */}
          <div className="order-1 md:order-none w-full">
            <AnimatedContainer direction="scale-out" delay={0.5}>
              <div className="relative h-[290px] md:h-[340px] w-full max-w-[480px] mx-auto overflow-hidden">
                <Image
                  src="/diamondcuts/sell-diamonds.jpg"
                  alt="Professional diamond dealer"
                  width={480}
                  height={340}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
            </AnimatedContainer>
          </div>
          <div className="order-2 md:order-none w-full">
            <div className="max-w-xl mx-auto">
              <AnimatedContainer direction="up">
                <h2
                  className={`text-[2.75rem] md:text-5xl lg:text-[3.25rem] font-light mb-7 text-gray-900 leading-[1.15] tracking-tight ${marcellus.className} `}
                >
                  {dictionary?.about?.sellTitle || "Sell Your Diamonds Safely and Seamlessly at Dalila Diamonds"}
                </h2>
              </AnimatedContainer>
              <p
                className={`text-gray-600 leading-relaxed mb-8 text-[15px] md:text-base font-normal ${jost.className}`}
              >
                {dictionary?.about?.sellText || "Selling your diamond or fine jewelry should be a seamless..."}
              </p>
              <div onClick={handleSellNow}>
                <GoldButton text={dictionary?.about?.sellNow || "Sell Now"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}