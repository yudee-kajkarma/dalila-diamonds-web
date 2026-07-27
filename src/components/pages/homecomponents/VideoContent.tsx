"use client";
import { useRef, useEffect, useState } from "react";

import { Marcellus, Jost } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";
const marcellus = Marcellus({
    variable: "--font-marcellus",
    subsets: ["latin"],
    weight: "400",
});
const jost = Jost({
    variable: "--font-jost",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    preload: true,
});
export default function VideoContent() {
    const { dictionary } = useLanguage();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.load();

        const playVideo = async () => {
            try {
                await video.play();
                console.log("Video playing successfully");
            } catch (error) {
                console.error("Video autoplay prevented:", error);
                setVideoError(true);
            }
        };

        const timer = setTimeout(() => {
            playVideo();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-[40vh] sm:h-[60vh] md:h-[80vh] overflow-hidden">
            {/* Background Video */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                onError={(e) => {
                    console.error("Video failed to load:", e);
                    setVideoError(true);
                }}
            >
                <source src="/New-Videos/LEGACY_video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Fallback background image if video fails */}
            {videoError && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
            )}

            {/* Dark Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Centered Text Content */}
            <div className="relative z-10 h-full flex items-center justify-center px-3 sm:px-6">
                <div className="text-center max-w-4xl">
                    <h5
                        className={`text-white/90 text-xs sm:text-sm md:text-base tracking-widest mb-4 sm:mb-6 font-light ${jost.className}`}
                    >
                        {dictionary?.home?.legacyTagline || "A LEGACY OF REFINEMENT, SHAPED TO PERFECTION"}
                    </h5>
                    <h2
                        className={`text-xl sm:text-3xl md:text-4xl lg:text-6xl text-white leading-tight tracking-wide font-light ${marcellus.className}`}
                    >
                        {dictionary?.home?.legacyTitle || "Every diamond, delicately refined through skill & crafted by the hands of true perfectionists."}
                    </h2>
                </div>
            </div>

            {/* Elegant border decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-t-2 border-l-2 border-white/30"></div>
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-t-2 border-r-2 border-white/30"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-b-2 border-l-2 border-white/30"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-b-2 border-r-2 border-white/30"></div>
            </div>
        </div>
    );
}
