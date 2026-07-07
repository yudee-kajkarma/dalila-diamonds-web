import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import type { DiamondData } from "@/types/diamond.types";

function mediaUrl(value?: string | null): string {
    const v = (value ?? "").trim();
    return !v || v.toLowerCase() === "false" ? "" : v;
}

interface DiamondMediaViewerProps {
    selectedMediaTab: "image" | "video" | "hand" | "tweezer" | "certificate";
    diamond: DiamondData;
}

const MEDIA_HEIGHT = "500px";
const EMBEDDED_VIEWER_HEIGHT = "560px";

/**
 * DiamondMediaViewer Component
 * Renders different media types (image, video, hand, tweezer, certificate) for a diamond
 */
export const DiamondMediaViewer: React.FC<DiamondMediaViewerProps> = ({
    selectedMediaTab,
    diamond,
}) => {
    const selectedImage = mediaUrl(diamond.REAL_IMAGE);
    const primaryVideo =
        mediaUrl((diamond as DiamondData & { MP4?: string }).MP4) ||
        mediaUrl((diamond as DiamondData & { HandVideo?: string }).HandVideo);
    const handVideoUrl = mediaUrl(
        (diamond as DiamondData & { HandVideo?: string }).HandVideo,
    );
    const tweezerVideoUrl = mediaUrl(
        (diamond as DiamondData & { TweezerVideo?: string }).TweezerVideo,
    );
    const certPdfUrl = mediaUrl(diamond.CERTI_PDF);

    // Helper component for empty media states
    const EmptyMediaPlaceholder = ({ message }: { message: string }) => (
        <div
            className="w-full h-full bg-gray-50 flex items-center justify-center"
            style={{ overflow: "hidden" }}
        >
            <span className="text-sm text-gray-400">{message}</span>
        </div>
    );

    // Helper to check if a URL is a direct video file
    const isDirectVideoUrl = (url: string) => {
        return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url);
    };

    // Helper to check if a URL is a viewer link (e.g., diamondview.aspx)
    const isViewerLink = (url: string) => {
        return /diamondview\.aspx|loupe360\.com/i.test(url);
    };

    switch (selectedMediaTab) {
        case "image":
            if (!selectedImage) {
                return (
                    <div
                        style={{
                            width: "100%",
                            height: MEDIA_HEIGHT,
                            maxWidth: "100%",
                            overflow: "hidden",
                        }}
                    >
                        <EmptyMediaPlaceholder message="No Image Available" />
                    </div>
                );
            }
            return (
                <div
                    className="bg-gray-50"
                    style={{ overflow: "hidden", padding: "1px" }}
                >
                    <div
                        className="relative"
                        style={{
                            width: "100%",
                            height: MEDIA_HEIGHT,
                            maxWidth: "100%",
                            overflow: "hidden",
                        }}
                    >
                        <Image
                            src={selectedImage}
                            alt={diamond.STONE_NO}
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                            loading="eager"
                            onError={(e) => {
                                e.currentTarget.src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";
                            }}
                        />
                    </div>
                </div>
            );

        case "video": {
            if (!primaryVideo) {
                return (
                    <div
                        style={{
                            width: "100%",
                            height: MEDIA_HEIGHT,
                            maxWidth: "100%",
                            overflow: "hidden",
                        }}
                    >
                        <EmptyMediaPlaceholder message="No Video Available" />
                    </div>
                );
            }
            if (isDirectVideoUrl(primaryVideo)) {
                return (
                    <div
                        className="bg-gray-50"
                        style={{ overflow: "hidden", padding: "8px" }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: MEDIA_HEIGHT,
                                maxWidth: "100%",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(primaryVideo, "_blank");
                                }}
                                className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-2 hover:bg-white shadow cursor-pointer"
                                title="Download Video"
                            >
                                <Download className="w-5 h-5 text-[#050C3A]" />
                            </button>
                            <video
                                src={primaryVideo}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    display: "block",
                                }}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                );
            } else if (isViewerLink(primaryVideo)) {
                return (
                    <div
                        className="bg-gray-50"
                        style={{ overflow: "hidden", padding: "8px" }}
                    >
                        <div
                            style={{
                                width: "600px",
                                height: EMBEDDED_VIEWER_HEIGHT,
                                maxWidth: "100%",
                                overflow: "hidden",
                            }}
                        >
                            <iframe
                                src={primaryVideo}
                                title="Diamond Video Viewer"
                                allow="autoplay; encrypted-media"
                                loading="lazy"
                                scrolling="no"
                                style={{
                                    border: "none",
                                    width: "100%",
                                    height: "100%",
                                    display: "block",
                                }}
                            />
                        </div>
                    </div>
                );
            } else {
                // fallback: try iframe for any other non-direct video link
                return (
                    <div
                        className="bg-gray-50"
                        style={{ overflow: "hidden", padding: "8px" }}
                    >
                        <div
                            style={{
                                width: "600px",
                                height: EMBEDDED_VIEWER_HEIGHT,
                                maxWidth: "100%",
                                overflow: "hidden",
                            }}
                        >
                            <iframe
                                src={primaryVideo}
                                title="Diamond Video"
                                allow="autoplay; encrypted-media"
                                loading="lazy"
                                scrolling="no"
                                style={{
                                    border: "none",
                                    width: "100%",
                                    height: "100%",
                                    display: "block",
                                }}
                            />
                        </div>
                    </div>
                );
            }
        }

        case "hand": {
            if (!handVideoUrl) {
                return (
                    <div
                        style={{
                            width: "600px",
                            height: MEDIA_HEIGHT,
                            maxWidth: "100%",
                            overflow: "hidden",
                        }}
                    >
                        <EmptyMediaPlaceholder message="No Hand Video Available" />
                    </div>
                );
            }
            if (isDirectVideoUrl(handVideoUrl)) {
                return (
                    <div
                        className="bg-gray-50"
                        style={{ overflow: "hidden", padding: "8px" }}
                    >
                        <div
                            style={{
                                width: "600px",
                                height: MEDIA_HEIGHT,
                                maxWidth: "100%",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(handVideoUrl, "_blank");
                                }}
                                className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-2 hover:bg-white shadow cursor-pointer"
                                title="Download Hand Video"
                            >
                                <Download className="w-5 h-5 text-[#050C3A]" />
                            </button>
                            <video
                                src={handVideoUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    display: "block",
                                }}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                );
            } else if (isViewerLink(handVideoUrl)) {
                return (
                    <div
                        className="bg-gray-50"
                        style={{ overflow: "hidden", padding: "8px" }}
                    >
                        <div
                            style={{
                                width: "600px",
                                height: EMBEDDED_VIEWER_HEIGHT,
                                maxWidth: "100%",
                                overflow: "hidden",
                            }}
                        >
                            <iframe
                                src={handVideoUrl}
                                title="Hand Video Viewer"
                                allow="autoplay; encrypted-media"
                                loading="lazy"
                                scrolling="no"
                                style={{
                                    border: "none",
                                    width: "100%",
                                    height: "100%",
                                    display: "block",
                                }}
                            />
                        </div>
                    </div>
                );
            } else {
                // fallback: try iframe for any other non-direct video link
                return (
                    <div
                        className="bg-gray-50"
                        style={{ overflow: "hidden", padding: "8px" }}
                    >
                        <div
                            style={{
                                width: "600px",
                                height: EMBEDDED_VIEWER_HEIGHT,
                                maxWidth: "100%",
                                overflow: "hidden",
                            }}
                        >
                            <iframe
                                src={handVideoUrl}
                                title="Hand Video"
                                allow="autoplay; encrypted-media"
                                loading="lazy"
                                scrolling="no"
                                style={{
                                    border: "none",
                                    width: "600px",
                                    height: "100%",
                                    display: "block",
                                }}
                            />
                        </div>
                    </div>
                );
            }
        }

        case "tweezer": {
            if (!tweezerVideoUrl) {
                return (
                    <div
                        style={{
                            width: "100%",
                            height: MEDIA_HEIGHT,
                            maxWidth: "100%",
                            overflow: "hidden",
                        }}
                    >
                        <EmptyMediaPlaceholder message="No Tweezer Video Available" />
                    </div>
                );
            }
            if (isDirectVideoUrl(tweezerVideoUrl)) {
                return (
                    <div
                        className="bg-gray-50"
                        style={{ overflow: "hidden", padding: "8px" }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: MEDIA_HEIGHT,
                                maxWidth: "100%",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(tweezerVideoUrl, "_blank");
                                }}
                                className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-2 hover:bg-white shadow cursor-pointer"
                                title="Download Tweezer Video"
                            >
                                <Download className="w-5 h-5 text-[#050C3A]" />
                            </button>
                            <video
                                src={tweezerVideoUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    display: "block",
                                }}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                );
            } else if (isViewerLink(tweezerVideoUrl)) {
                return (
                    <div
                        className="bg-gray-50"
                        style={{ overflow: "hidden", padding: "8px" }}
                    >
                        <div
                            style={{
                                width: "600px",
                                height: EMBEDDED_VIEWER_HEIGHT,
                                maxWidth: "100%",
                                overflow: "hidden",
                            }}
                        >
                            <iframe
                                src={tweezerVideoUrl}
                                title="Tweezer Video Viewer"
                                allow="autoplay; encrypted-media"
                                loading="lazy"
                                scrolling="no"
                                style={{
                                    border: "none",
                                    width: "100%",
                                    height: "100%",
                                    display: "block",
                                }}
                            />
                        </div>
                    </div>
                );
            } else {
                // fallback: try iframe for any other non-direct video link
                return (
                    <div
                        className="bg-gray-50"
                        style={{ overflow: "hidden", padding: "8px" }}
                    >
                        <div
                            style={{
                                width: "600px",
                                height: EMBEDDED_VIEWER_HEIGHT,
                                maxWidth: "100%",
                                overflow: "hidden",
                            }}
                        >
                            <iframe
                                src={tweezerVideoUrl}
                                title="Tweezer Video"
                                allow="autoplay; encrypted-media"
                                loading="lazy"
                                scrolling="no"
                                style={{
                                    border: "none",
                                    width: "100%",
                                    height: "100%",
                                    display: "block",
                                }}
                            />
                        </div>
                    </div>
                );
            }
        }

        case "certificate":
            if (!certPdfUrl) {
                return (
                    <div
                        style={{
                            width: "100%",
                            height: MEDIA_HEIGHT,
                            maxWidth: "100%",
                            overflow: "hidden",
                        }}
                    >
                        <EmptyMediaPlaceholder message="No Certificate Available" />
                    </div>
                );
            }
            return (
                <div
                    className="bg-gray-50"
                    style={{ overflow: "hidden", padding: "8px" }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: MEDIA_HEIGHT,
                            maxWidth: "100%",
                            overflow: "hidden",
                        }}
                    >
                        <iframe
                            src={certPdfUrl}
                            className="w-full h-full"
                            title="Certificate PDF"
                            loading="lazy"
                            scrolling="no"
                            style={{ border: "none" }}
                        />
                    </div>
                </div>
            );

        default:
            return <EmptyMediaPlaceholder message="Select a media type" />;
    }
};
