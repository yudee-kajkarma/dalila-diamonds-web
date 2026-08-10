// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import HeaderFooterWrapper from "@/components/HeaderFooterWrapper";
import { Toaster } from "react-hot-toast";

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    preload: true,
});

const jost = Jost({
    variable: "--font-jost",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    preload: true,
});

export const metadata: Metadata = {
    title: "Dalila Diamonds | Premium B2B Diamond Supplier",
    description:
        "Global supplier of certified premium natural diamonds for B2B buyers. Trusted source for quality diamonds, competitive pricing, and reliable supply.",
    alternates: {
        canonical: "https://www.daliladiamonds.com/",
    },
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={`${playfair.variable} ${jost.variable} overflow-x-hidden`}
            suppressHydrationWarning
        >
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            name: "Daliladiamonds",
                            alternateName: "Dalila diamonds",
                            url: "https://www.daliladiamonds.com/",
                            logo: "https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png",
                            sameAs: "https://www.instagram.com/p/DO56RDlDKde/",
                        }),
                    }}
                />
            </head>
            <body
                className="antialiased bg-background text-foreground font-jost overflow-x-hidden"
                suppressHydrationWarning
            >
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-WFBTRFM0YC"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">{`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-WFBTRFM0YC');
`}
                </Script>
                <LanguageProvider>
                    <HeaderFooterWrapper>{children}</HeaderFooterWrapper>
                </LanguageProvider>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: "#FAF6EB",
                            color: "#363636",
                            fontFamily: "var(--font-jost)",
                            border: "1px solid #e5e5e5",
                        },
                        success: {
                            duration: 3000,
                            style: {
                                background: "#FAF6EB",
                            },
                            iconTheme: {
                                primary: "#10b981",
                                secondary: "#FAF6EB",
                            },
                        },
                        error: {
                            duration: 4000,
                            style: {
                                background: "#FAF6EB",
                            },
                            iconTheme: {
                                primary: "#ef4444",
                                secondary: "#FAF6EB",
                            },
                        },
                    }}
                />
            </body>
        </html>
    );
}
