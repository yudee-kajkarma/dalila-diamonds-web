"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Marcellus, Jost } from "next/font/google";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import DiamondDetailView from "@/components/DiamondDetailView";
import type { DiamondData } from "@/types/diamond.types";

interface InventoryDiamond {
  _id: string;
  STONE_NO: string;
  SHAPE: string;
  CARATS: string;
  COLOR: string;
  CLARITY: string;
  CUT: string;
  POL: string;
  SYM: string;
  LAB: string;
  REAL_IMAGE: string;
  MP4?: string;
  NET_RATE?: string;
  DISC_PER?: string;
  NET_VALUE?: string;
  RAP_PRICE?: string;
  DEPTH_PER?: string;
  TABLE_PER?: string;
  MEASUREMENTS?: string;
  REPORT_NO?: string;
  FLOUR?: string;
  LOCATION?: string;
}

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

export default function FeaturedDiamondsCarousel() {
  const router = useRouter();
  const [inventoryDiamonds, setInventoryDiamonds] = useState<InventoryDiamond[]>([]);
  const [diamondsFetched, setDiamondsFetched] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedDiamond, setSelectedDiamond] = useState<InventoryDiamond | null>(null);

  useEffect(() => {
    const fetchInventoryDiamonds = async () => {
      try {
        const response = await fetch(
          "https://dalila-inventory-service-dev.caratlogic.com/api/diamonds/safe?page=1&limit=10",
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.success && Array.isArray(data.data)) {
          const diamondsWithImages = data.data.filter(
            (d: InventoryDiamond) => d.REAL_IMAGE && d.REAL_IMAGE.trim(),
          );
          setInventoryDiamonds(diamondsWithImages);
        } else {
          setInventoryDiamonds([]);
        }
      } catch (err) {
        console.error("Featured diamonds fetch error:", err);
        setInventoryDiamonds([]);
      } finally {
        setDiamondsFetched(true);
      }
    };

    fetchInventoryDiamonds();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || inventoryDiamonds.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(1, inventoryDiamonds.length - 2));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, inventoryDiamonds]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, inventoryDiamonds.length - 2));
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.max(1, inventoryDiamonds.length - 2)) %
        Math.max(1, inventoryDiamonds.length - 2),
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="mb-10">
        <h2
          className={`text-3xl md:text-4xl text-[#1a1a1a] font-bold text-center ${marcellus.className}`}
        >
          Featured Diamonds
        </h2>
        <div className="w-20 h-1 bg-[#c89e3a] mx-auto mt-4"></div>
      </div>

      {!diamondsFetched ? (
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="w-12 h-12 text-[#c89e3a] animate-spin mx-auto" />
          <p className={`mt-4 text-gray-600 ${jost.className}`}>Loading diamonds...</p>
        </div>
      ) : inventoryDiamonds.length === 0 ? (
        <div className="container mx-auto px-4 text-center">
          <p className={`text-gray-600 text-lg ${jost.className}`}>
            No featured diamonds available at the moment. Please check back later or{" "}
            <button
              onClick={() => router.push("/inventory")}
              className="text-[#c89e3a] hover:text-[#b8922e] underline font-semibold"
            >
              browse our full inventory
            </button>
            .
          </p>
        </div>
      ) : (
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="bg-white p-6 md:p-10 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={prevSlide}
                className="p-2 md:p-3 bg-[#c89e3a] hover:bg-[#b8922e] transition-all duration-300 shrink-0 z-10 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={inventoryDiamonds.length <= 3}
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>

              <div className="flex gap-4 md:gap-6 flex-1 justify-center items-center overflow-hidden relative px-2 md:px-6">
                <div
                  className="flex gap-4 md:gap-6 transition-all duration-700 ease-out"
                  style={{
                    transform: `translateX(-${currentSlide * (256 + 24)}px)`,
                  }}
                >
                  {inventoryDiamonds.map((diamond, index) => (
                    <button
                      key={diamond.STONE_NO || index}
                      onClick={() => setSelectedDiamond(diamond)}
                      className="bg-white p-4 md:p-6 w-56 md:w-64 shrink-0 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer text-left border-2 border-gray-200 hover:border-[#c89e3a]"
                    >
                      <div className="bg-gray-50 p-4 md:p-6 mb-4 flex items-center justify-center min-h-36 md:min-h-40 relative">
                        <div className="relative w-32 h-32 md:w-36 md:h-36">
                          <Image
                            src={diamond.REAL_IMAGE}
                            alt={diamond.STONE_NO || "Diamond"}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      </div>

                      <div className="text-center space-y-2">
                        <div
                          className={`flex justify-center gap-2 text-sm font-semibold text-gray-900 ${jost.className}`}
                        >
                          <span>{diamond.SHAPE}</span>
                          <span>{diamond.CARATS}</span>
                          <span>{diamond.COLOR}</span>
                          <span>{diamond.CLARITY}</span>
                        </div>
                        <div
                          className={`flex justify-center gap-2 text-xs text-gray-600 ${jost.className}`}
                        >
                          <span>{diamond.CUT || "N/A"}</span>
                          <span>{diamond.POL}</span>
                          <span>{diamond.SYM}</span>
                          <span>{diamond.LAB}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={nextSlide}
                className="p-2 md:p-3 bg-[#c89e3a] hover:bg-[#b8922e] transition-all duration-300 shrink-0 z-10 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={inventoryDiamonds.length <= 3}
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
            </div>

            {inventoryDiamonds.length > 3 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: Math.ceil(inventoryDiamonds.length - 2) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentSlide(index);
                      setTimeout(() => setIsAutoPlaying(true), 5000);
                    }}
                    className={`h-2 transition-all duration-500 ease-out ${
                      currentSlide === index
                        ? "w-8 bg-[#c89e3a]"
                        : "w-2 bg-gray-300 hover:bg-gray-400 hover:w-4"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {selectedDiamond && (
        <DiamondDetailView
          diamond={selectedDiamond as unknown as DiamondData}
          onClose={() => setSelectedDiamond(null)}
        />
      )}
    </div>
  );
}
