"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useHeaderAuth } from "./headerHooks";
import LanguageSwitcher from "../LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

export default function MobileHeader() {
    const { locale, dictionary } = useLanguage();
    const localizedPath = (path: string) => {
        if (!locale || locale === "en") return path;
        return `/${locale}${path}`;
    };
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
    const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
    const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
    const router = useRouter();

    const {
        userRole,
        isLoggedIn,
        isCheckingAuth,
        isAdmin,
        isInventoryAccessible,
        handleLogout,
    } = useHeaderAuth();

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
        setIsResourcesOpen(false);
        setIsUserPanelOpen(false);
        setIsAdminPanelOpen(false);
    };

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 bg-[#050c3a] shadow-lg"
            style={{ maxWidth: "100vw", width: "100%" }}
        >
            <div
                className="flex items-center w-full px-2 py-2 box-border"
                style={{ maxWidth: "100vw" }}
            >
                {/* Logo - left aligned */}
                <button
                    onClick={() => {
                        router.push(localizedPath("/"));
                        closeMobileMenu();
                    }}
                    className="flex-shrink-0 focus:outline-none mr-2"
                    aria-label="Go to home page"
                >
                    <div className="relative h-8 w-16">
                        <Image
                            src="/dalila_img/mobile-logo.png"
                            alt="Dalila Diamonds"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </div>
                </button>

                {/* Inline menu buttons - centered */}
                <div className="flex items-center gap-1 flex-1 min-w-0 justify-center overflow-x-auto hide-scrollbar">
                    {!isLoggedIn && !isCheckingAuth ? (
                        <>
                            <button
                                onClick={() => router.push(localizedPath("/login"))}
                                className="px-2 py-1 text-xs text-white border border-[#c89e3a] rounded hover:bg-[#c89e3a] hover:text-white font-normal whitespace-nowrap"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => router.push(localizedPath("/register"))}
                                className="px-2 py-1 text-xs text-white border border-[#c89e3a] rounded hover:bg-[#c89e3a] hover:text-white font-normal whitespace-nowrap"
                            >
                                Register
                            </button>
                            <button
                                onClick={() => router.push(localizedPath("/inventory"))}
                                className="px-2 py-1 text-xs text-white border border-[#c89e3a] rounded hover:bg-[#c89e3a] hover:text-white font-normal whitespace-nowrap"
                            >
                                Inventory
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={(e) => {
                                    if (typeof window !== "undefined") {
                                        const closeModalEvent = new CustomEvent(
                                            "close-diamond-modal",
                                        );
                                        window.dispatchEvent(closeModalEvent);
                                    }
                                    if (isInventoryAccessible) {
                                        router.push(localizedPath("/inventory"));
                                        closeMobileMenu();
                                    } else {
                                        e.preventDefault();
                                        alert(
                                            "Your account is pending approval. Please wait for admin verification to access the inventory.",
                                        );
                                    }
                                }}
                                disabled={!isInventoryAccessible}
                                className={`px-2 py-1 text-xs border border-[#c89e3a] rounded font-normal whitespace-nowrap ${isInventoryAccessible ? "text-white hover:bg-[#c89e3a] hover:text-white cursor-pointer" : "text-gray-400 bg-gray-700 cursor-not-allowed opacity-60"}`}
                                title={
                                    !isInventoryAccessible
                                        ? "Your account is pending approval"
                                        : ""
                                }
                            >
                                Inventory
                            </button>
                            <button
                                onClick={() => router.push(localizedPath("/contact"))}
                                className="px-2 py-1 text-xs text-white border border-[#c89e3a] rounded hover:bg-[#c89e3a] hover:text-white font-normal whitespace-nowrap"
                            >
                                Contact Us
                            </button>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    closeMobileMenu();
                                }}
                                className="px-2 py-1 text-xs text-white border border-[#c89e3a] rounded hover:bg-[#c89e3a] hover:text-white font-normal whitespace-nowrap"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

                {/* Hamburger Menu Button - always right, always visible, NEVER shrink */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-[#c89e3a] flex-shrink-0 flex-grow-0 w-12 h-12 flex items-center justify-center ml-2"
                    aria-label="Toggle menu"
                    style={{ minWidth: "48px" }}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown (all other menus) */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-[#050c3a] border-t border-[#c89e3a] shadow-lg max-h-[calc(100vh-60px)] overflow-y-auto">
                    <nav className="py-2">
                        {/* Main Navigation - Same order as desktop (LEFT SIDE) */}
                        <Link
                            href={localizedPath("/aboutUs")}
                            onClick={closeMobileMenu}
                            className="block px-4 py-3 text-white hover:bg-[#c89e3a]/10 transition-colors border-b border-gray-700"
                        >
                            About Us
                        </Link>

                        <div className="border-b border-gray-700">
                            <button
                                onClick={() =>
                                    setIsServicesOpen(!isServicesOpen)
                                }
                                className="w-full px-4 py-3 text-white hover:bg-[#c89e3a]/10 transition-colors flex items-center justify-between"
                            >
                                <span>Our Services</span>
                                <ChevronDown
                                    size={18}
                                    className={`transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            {isServicesOpen && (
                                <div className="bg-[#0a1454]">
                                    <Link
                                        href={localizedPath("/secure-to-source")}
                                        onClick={closeMobileMenu}
                                        className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10"
                                    >
                                        S2S - Secure To Source
                                    </Link>
                                    <Link
                                        href={localizedPath("/diamond-source")}
                                        onClick={closeMobileMenu}
                                        className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10"
                                    >
                                        DS4U - Diamond Source For You
                                    </Link>
                                    <Link
                                        href={localizedPath("/sud")}
                                        onClick={closeMobileMenu}
                                        className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10"
                                    >
                                        SYD - Sell Your Diamonds
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href={localizedPath("/diamondKnowledge")}
                            onClick={closeMobileMenu}
                            className="block px-4 py-3 text-white hover:bg-[#c89e3a]/10 transition-colors border-b border-gray-700"
                        >
                            Diamond Knowledge
                        </Link>

                        {/* Resources Dropdown */}
                        <div className="border-b border-gray-700">
                            <button
                                onClick={() =>
                                    setIsResourcesOpen(!isResourcesOpen)
                                }
                                className="w-full px-4 py-3 text-white hover:bg-[#c89e3a]/10 transition-colors flex items-center justify-between"
                            >
                                <span>{dictionary?.nav?.resources || "Resources"}</span>
                                <ChevronDown
                                    size={18}
                                    className={`transition-transform ${isResourcesOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            {isResourcesOpen && (
                                <div className="bg-[#0a1454]">
                                    <Link
                                        href={localizedPath("/blogs")}
                                        onClick={closeMobileMenu}
                                        className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10"
                                    >
                                        {dictionary?.nav?.articles || "Articles"}
                                    </Link>

                                    <Link
                                        href={localizedPath("/premium-b2b-diamond-supplier-belgium")}
                                        onClick={closeMobileMenu}
                                        className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10"
                                    >
                                        {dictionary?.nav?.articleB2b || "Premium B2B Diamond Supplier in Belgium"}
                                    </Link>

                                    <Link
                                        href={localizedPath("/sell-your-diamond-safely")}
                                        onClick={closeMobileMenu}
                                        className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10"
                                    >
                                        {dictionary?.nav?.articleSell || "Sell Your Diamond Safely"}
                                    </Link>

                                    <Link
                                        href={localizedPath("/elongated-cushion-cut-diamond-guide")}
                                        onClick={closeMobileMenu}
                                        className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10"
                                    >
                                        {dictionary?.nav?.articleCushion || "Elongated Cushion Cut Diamond Guide"}
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="h-2 bg-[#0a1454] border-b border-gray-700"></div>

                        {/* Right Side Buttons - Same as desktop (RIGHT SIDE) */}
                        <Link
                            href={localizedPath("/contact")}
                            onClick={closeMobileMenu}
                            className="block px-4 py-3 text-white hover:bg-[#c89e3a]/10 transition-colors border-b border-gray-700"
                        >
                            Contact Us
                        </Link>

                        {isCheckingAuth ? (
                            <div className="px-4 py-4 flex items-center justify-center border-b border-gray-700">
                                <Loader2 className="w-5 h-5 text-[#c89e3a] animate-spin" />
                            </div>
                        ) : !isLoggedIn ? (
                            <>
                                <Link
                                    href={localizedPath("/login")}
                                    onClick={closeMobileMenu}
                                    className="block px-4 py-3 text-white hover:bg-[#c89e3a]/10 transition-colors border-b border-gray-700"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={localizedPath("/register")}
                                    onClick={closeMobileMenu}
                                    className="block px-4 py-3 text-white hover:bg-[#c89e3a]/10 transition-colors border-b border-gray-700"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* User Panel - For regular users */}
                                {!isAdmin && (
                                    <div className="border-b border-gray-700">
                                        <button
                                            onClick={() =>
                                                setIsUserPanelOpen(
                                                    !isUserPanelOpen,
                                                )
                                            }
                                            className="w-full px-4 py-3 text-white hover:bg-[#c89e3a]/10 transition-colors flex items-center justify-between"
                                        >
                                            <span className="text-sm font-medium">
                                                USER PANEL
                                            </span>
                                            <ChevronDown
                                                size={18}
                                                className={`transition-transform ${isUserPanelOpen ? "rotate-180" : ""}`}
                                            />
                                        </button>
                                        {isUserPanelOpen && (
                                            <div className="bg-[#0a1454]">
                                                <Link
                                                    href={localizedPath("/dashboard")}
                                                    onClick={closeMobileMenu}
                                                    className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10"
                                                >
                                                    Dashboard
                                                </Link>
                                                <Link
                                                    href={localizedPath("/enquiry")}
                                                    onClick={closeMobileMenu}
                                                    className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10"
                                                >
                                                    Enquiry
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Inventory - For all logged in users */}
                                <button
                                    onClick={(e) => {
                                        if (typeof window !== "undefined") {
                                            const closeModalEvent =
                                                new CustomEvent(
                                                    "close-diamond-modal",
                                                );
                                            window.dispatchEvent(
                                                closeModalEvent,
                                            );
                                        }
                                        if (isInventoryAccessible) {
                                            router.push(localizedPath("/inventory"));
                                            closeMobileMenu();
                                        } else {
                                            e.preventDefault();
                                            alert(
                                                "Your account is pending approval. Please wait for admin verification to access the inventory.",
                                            );
                                        }
                                    }}
                                    disabled={!isInventoryAccessible}
                                    className={`w-full text-left px-4 py-3 border-b border-gray-700 transition-colors ${
                                        isInventoryAccessible
                                            ? "text-white hover:bg-[#c89e3a]/10 cursor-pointer"
                                            : "text-gray-400 bg-gray-700/30 cursor-not-allowed opacity-60"
                                    }`}
                                >
                                    Inventory{" "}
                                    {!isInventoryAccessible &&
                                        "(Pending Approval)"}
                                </button>

                                {/* Admin Panel - For admins */}
                                {isAdmin && (
                                    <div className="border-b border-gray-700">
                                        <button
                                            onClick={() =>
                                                setIsAdminPanelOpen(
                                                    !isAdminPanelOpen,
                                                )
                                            }
                                            className="w-full px-4 py-3 text-white hover:bg-[#c89e3a]/10 transition-colors flex items-center justify-between"
                                        >
                                            <span className="text-sm font-medium">
                                                ADMIN PANEL
                                            </span>
                                            <ChevronDown
                                                size={18}
                                                className={`transition-transform ${isAdminPanelOpen ? "rotate-180" : ""}`}
                                            />
                                        </button>
                                        {isAdminPanelOpen && (
                                            <div className="bg-[#0a1454]">
                                                <Link
                                                    href={localizedPath("/inventory-management")}
                                                    onClick={closeMobileMenu}
                                                    className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10"
                                                >
                                                    Inventory & Suppliers
                                                </Link>
                                                <Link
                                                    href={localizedPath("/member")}
                                                    onClick={closeMobileMenu}
                                                    className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10"
                                                >
                                                    Members
                                                </Link>
                                                <Link
                                                    href={localizedPath("/customer-management")}
                                                    onClick={closeMobileMenu}
                                                    className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10"
                                                >
                                                    Customer Management
                                                </Link>
                                                <Link
                                                    href={localizedPath("/buy-form")}
                                                    onClick={closeMobileMenu}
                                                    className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10"
                                                >
                                                    Buy Form Submissions
                                                </Link>
                                                <Link
                                                    href={localizedPath("/spec-requests")}
                                                    onClick={closeMobileMenu}
                                                    className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10"
                                                >
                                                    DS4U Form Submisssions
                                                </Link>
                                                <Link
                                                    href={localizedPath("/limitedEdition")}
                                                    onClick={closeMobileMenu}
                                                    className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10"
                                                >
                                                    Limited Edition
                                                </Link>
                                                {userRole === "SUPER_ADMIN" && (
                                                    <Link
                                                        href={localizedPath("/create-admin")}
                                                        onClick={
                                                            closeMobileMenu
                                                        }
                                                        className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10"
                                                    >
                                                        Create Admin
                                                    </Link>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <button
                                    onClick={() => {
                                        handleLogout();
                                        closeMobileMenu();
                                    }}
                                    className="w-full text-left px-4 py-3 text-white hover:bg-[#c89e3a]/10 transition-colors border-b border-gray-700"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </nav>
                </div>
            )}

            {/* Tagline */}
            {/* <div className="w-full h-[2px] bg-[#C89E3A]"></div>
            <div className="flex justify-center py-2 px-4">
                <p className="text-xs text-center text-white">
                    <span>Where Trust Shines,</span>
                    <span> And Quality Sparkles</span>
                </p>
            </div> */}
        </header>
    );
}
