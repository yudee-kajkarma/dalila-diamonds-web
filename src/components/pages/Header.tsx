"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useHeaderAuth } from "./headerHooks";
import MobileHeader from "./MobileHeader";
import { blogApi, type Blog } from "@/lib/api";
import { getBlogSlug } from "@/utils/helpers";

export default function Header() {
    const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] =
        useState(false);
    const [isArticlesDropdownOpen, setIsArticlesDropdownOpen] = useState(false);
    const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
    const router = useRouter();

    // Custom hooks
    const {
        userRole,
        isLoggedIn,
        isCheckingAuth,
        isAdmin,
        isInventoryAccessible,
        handleLogout,
    } = useHeaderAuth();

    // Fetch latest 3 blogs for Articles dropdown
    useEffect(() => {
        const fetchLatestBlogs = async () => {
            try {
                const response = await blogApi.getAll({
                    page: 1,
                    limit: 3,
                    sortBy: "createdAt",
                    sortOrder: "desc",
                });
                if (response && response.data) {
                    setLatestBlogs(response.data);
                }
            } catch (error) {
                console.error("Error fetching latest blogs:", error);
            }
        };
        fetchLatestBlogs();
    }, []);

    return (
        <>
            {/* Mobile Header - Show on screens smaller than lg (1024px) */}
            <div className="lg:hidden">
                <MobileHeader />
            </div>

            {/* Desktop Header - Show on screens lg and larger */}
            <header className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-[#050c3a] shadow-lg">
                <div>
                    <div
                        className="flex max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 items-center justify-between relative h-20"
                        style={{
                            minWidth: 900,
                            flexWrap: "nowrap",
                            overflow: "visible",
                        }}
                    >
                        <nav className="flex items-center gap-1 xl:gap-2 flex-1 justify-start">
                            {/* About us */}
                            <Link
                                href="/aboutUs"
                                className="py-3 px-1.5 xl:px-2.5 text-xs xl:text-base text-white hover:text-[#c89e3a] transition-colors whitespace-nowrap"
                            >
                                About us
                            </Link>

                            {/* Our Services Dropdown */}
                            <div className="relative group">
                                <button
                                    onMouseEnter={() =>
                                        setIsServicesDropdownOpen(true)
                                    }
                                    onMouseLeave={() =>
                                        setIsServicesDropdownOpen(false)
                                    }
                                    className="py-3 px-1.5 cursor-pointer xl:px-2.5 text-xs xl:text-base text-white hover:text-[#c89e3a] transition-colors whitespace-nowrap flex items-center gap-1"
                                >
                                    Our Services
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-200 ${isServicesDropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {isServicesDropdownOpen && (
                                    <div
                                        onMouseEnter={() =>
                                            setIsServicesDropdownOpen(true)
                                        }
                                        onMouseLeave={() =>
                                            setIsServicesDropdownOpen(false)
                                        }
                                        className="absolute left-0 top-full mt-0 w-64 bg-white shadow-lg border border-gray-200 rounded-sm z-50"
                                    >
                                        <Link
                                            href="/secure-to-source"
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors border-b border-gray-100"
                                        >
                                            S2S - Secure To Source
                                        </Link>
                                        <Link
                                            href="/diamond-source"
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors border-b border-gray-100"
                                        >
                                            DS4U - Diamond Source For You
                                        </Link>
                                        <Link
                                            href="/sud"
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors"
                                        >
                                            SYD - Sell Your Diamonds
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Diamond Knowledge */}
                            <Link
                                href="/diamondKnowledge"
                                className="py-3 px-1.5 xl:px-2.5 text-xs xl:text-base text-white hover:text-[#c89e3a] transition-colors whitespace-nowrap"
                            >
                                Diamond Knowledge
                            </Link>

                            {/* Resources Dropdown */}
                            <div className="relative group">
                                <button
                                    onMouseEnter={() =>
                                        setIsResourcesDropdownOpen(true)
                                    }
                                    onMouseLeave={() =>
                                        setIsResourcesDropdownOpen(false)
                                    }
                                    className="py-3 px-1.5 cursor-pointer xl:px-2.5 text-xs xl:text-base text-white hover:text-[#c89e3a] transition-colors whitespace-nowrap flex items-center gap-1"
                                >
                                    Resources
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-200 ${isResourcesDropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {isResourcesDropdownOpen && (
                                    <div
                                        onMouseEnter={() =>
                                            setIsResourcesDropdownOpen(true)
                                        }
                                        onMouseLeave={() => {
                                            setIsResourcesDropdownOpen(false);
                                        }}
                                        className="absolute left-0 top-full mt-0 w-80 bg-white shadow-lg border border-gray-200 rounded-sm z-50"
                                    >
                                        {/* Articles with nested dropdown */}
                                        <div className="relative group/articles">
                                            <button
                                                onClick={() =>
                                                    router.push("/blogs")
                                                }
                                                onMouseEnter={() =>
                                                    setIsArticlesDropdownOpen(
                                                        true,
                                                    )
                                                }
                                                onMouseLeave={() =>
                                                    setIsArticlesDropdownOpen(
                                                        false,
                                                    )
                                                }
                                                className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors border-b border-gray-100 flex items-center justify-between cursor-pointer"
                                            >
                                                <span>Articles</span>
                                                <ChevronDown
                                                    size={14}
                                                    className={`ml-2 transition-transform duration-200 ${isArticlesDropdownOpen ? "-rotate-90" : ""}`}
                                                />
                                            </button>

                                            {/* Articles nested dropdown */}
                                            {isArticlesDropdownOpen &&
                                                latestBlogs.length > 0 && (
                                                    <div
                                                        onMouseEnter={() =>
                                                            setIsArticlesDropdownOpen(
                                                                true,
                                                            )
                                                        }
                                                        onMouseLeave={() =>
                                                            setIsArticlesDropdownOpen(
                                                                false,
                                                            )
                                                        }
                                                        className="absolute left-full top-0 ml-0 w-80 bg-white shadow-lg border border-gray-200 rounded-sm z-50"
                                                    >
                                                        {latestBlogs.map(
                                                            (blog, index) => (
                                                                <button
                                                                    key={
                                                                        blog._id
                                                                    }
                                                                    onClick={() =>
                                                                        router.push(
                                                                            `/blogs/${getBlogSlug(blog)}`,
                                                                        )
                                                                    }
                                                                    className={`w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors cursor-pointer ${
                                                                        index <
                                                                        latestBlogs.length -
                                                                            1
                                                                            ? "border-b border-gray-100"
                                                                            : ""
                                                                    }`}
                                                                >
                                                                    <div className="line-clamp-2">
                                                                        {
                                                                            blog.title
                                                                        }
                                                                    </div>
                                                                </button>
                                                            ),
                                                        )}
                                                        <button
                                                            onClick={() =>
                                                                router.push(
                                                                    "/blogs",
                                                                )
                                                            }
                                                            className="w-full text-center px-4 py-3 text-sm font-semibold text-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors border-t border-gray-200 cursor-pointer"
                                                        >
                                                            View More
                                                        </button>
                                                    </div>
                                                )}
                                        </div>

                                        <Link
                                            href="/premium-b2b-diamond-supplier-belgium"
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors border-b border-gray-100"
                                        >
                                            Premium B2B Diamond Supplier in
                                            Belgium
                                        </Link>

                                        <Link
                                            href="/sell-your-diamond-safely"
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors border-b border-gray-100"
                                        >
                                            Sell Your Diamond Safely
                                        </Link>

                                        <Link
                                            href="/elongated-cushion-cut-diamond-guide"
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors"
                                        >
                                            Elongated Cushion Cut Diamond Guide
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </nav>

                        <div
                            className="flex-shrink-0 relative h-24 w-[280px] sm:h-28 sm:w-[320px] md:h-32 md:w-[360px]"
                            style={{ minWidth: 180, maxWidth: 400 }}
                        >
                            <button
                                onClick={() => router.push("/")}
                                className="block w-full h-full focus:outline-none"
                                aria-label="Go to home page"
                            >
                                <Image
                                    src="/dalila_img/Dalila_Logo.png"
                                    alt="Dalila Diamonds"
                                    fill
                                    style={{ objectFit: "contain" }}
                                    priority
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-end gap-2 xl:gap-3 flex-1">
                            {/* Contact Us Button - Always visible */}
                            <button
                                onClick={() => router.push("/contact")}
                                className="py-3 px-3 xl:px-4 xl:py-2.5 xl:h-10 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                            >
                                CONTACT US
                            </button>

                            {isCheckingAuth ? (
                                <div className="py-1 px-3 flex items-center justify-center">
                                    <Loader2 className="w-5 h-5 text-[#FAF6EB]] animate-spin" />
                                </div>
                            ) : !isLoggedIn ? (
                                <>
                                    <button
                                        onClick={() =>
                                            router.push("/inventory")
                                        }
                                        className="py-3 px-3 xl:px-4 xl:py-2.5 xl:h-10 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                                    >
                                        INVENTORY
                                    </button>
                                    <button
                                        onClick={() => router.push("/login")}
                                        className="py-3 px-3 xl:px-4 xl:py-2.5 xl:h-10 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                                    >
                                        LOGIN
                                    </button>
                                    <button
                                        onClick={() => router.push("/register")}
                                        className="py-3 px-3 xl:px-4 xl:py-2.5 xl:h-10 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                                    >
                                        REGISTER
                                    </button>
                                </>
                            ) : (
                                <div className="flex gap-3">
                                    {/* USER PANEL - Available only for regular users, NOT for admin */}
                                    {!isAdmin && (
                                        <div className="relative group">
                                            <button
                                                onMouseEnter={() =>
                                                    setIsUserDropdownOpen(true)
                                                }
                                                onMouseLeave={() =>
                                                    setIsUserDropdownOpen(false)
                                                }
                                                className="py-3 px-3 xl:px-4 xl:py-2.5 xl:h-10 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap flex items-center justify-center gap-1"
                                            >
                                                USER PANEL
                                                <ChevronDown
                                                    size={16}
                                                    className={`transition-transform duration-200 ${isUserDropdownOpen ? "rotate-180" : ""}`}
                                                />
                                            </button>

                                            {isUserDropdownOpen && (
                                                <div
                                                    onMouseEnter={() =>
                                                        setIsUserDropdownOpen(
                                                            true,
                                                        )
                                                    }
                                                    onMouseLeave={() =>
                                                        setIsUserDropdownOpen(
                                                            false,
                                                        )
                                                    }
                                                    className="absolute top-full left-0 mt-0 w-64 bg-white shadow-lg border border-gray-200 rounded-sm z-50"
                                                >
                                                    <Link
                                                        href="/dashboard"
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors border-b border-gray-100"
                                                    >
                                                        Dashboard
                                                    </Link>
                                                    <Link
                                                        href="/enquiry"
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors"
                                                    >
                                                        Enquiry
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* INVENTORY - Available for all logged-in users (including admins) */}
                                    <button
                                        onClick={(e) => {
                                            // Close any open diamond detail modal
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
                                                router.push("/inventory");
                                            } else {
                                                e.preventDefault();
                                                alert(
                                                    "Your account is pending approval. Please wait for admin verification to access the inventory.",
                                                );
                                            }
                                        }}
                                        disabled={!isInventoryAccessible}
                                        className={`py-3 px-3 xl:px-4 xl:py-2.5 xl:h-10 text-xs xl:text-sm border border-[#c89e3a] transition-colors whitespace-nowrap ${
                                            isInventoryAccessible
                                                ? "text-white hover:bg-[#c89e3a] hover:text-white cursor-pointer"
                                                : "text-gray-400 bg-gray-700 cursor-not-allowed opacity-60"
                                        }`}
                                        title={
                                            !isInventoryAccessible
                                                ? "Your account is pending approval"
                                                : ""
                                        }
                                    >
                                        INVENTORY
                                    </button>

                                    {/* ADMIN PANEL - Only for admins */}
                                    {isAdmin && (
                                        <div className="relative group">
                                            <button
                                                onMouseEnter={() =>
                                                    setIsAdminDropdownOpen(true)
                                                }
                                                onMouseLeave={() =>
                                                    setIsAdminDropdownOpen(
                                                        false,
                                                    )
                                                }
                                                className="py-3 px-3 xl:px-4 xl:py-2.5 xl:h-10 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap flex items-center justify-center gap-1"
                                            >
                                                ADMIN PANEL
                                                <ChevronDown
                                                    size={16}
                                                    className={`transition-transform duration-200 ${isAdminDropdownOpen ? "rotate-180" : ""}`}
                                                />
                                            </button>

                                            {isAdminDropdownOpen && (
                                                <div
                                                    onMouseEnter={() =>
                                                        setIsAdminDropdownOpen(
                                                            true,
                                                        )
                                                    }
                                                    onMouseLeave={() =>
                                                        setIsAdminDropdownOpen(
                                                            false,
                                                        )
                                                    }
                                                    className="absolute top-full left-0 mt-0 w-64 bg-white shadow-lg border border-gray-200 rounded-sm z-50"
                                                >
                                                    <Link
                                                        href="/inventory-management"
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors border-b border-gray-100"
                                                    >
                                                        Inventory & Suppliers
                                                    </Link>
                                                    <Link
                                                        href="/member"
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors border-b border-gray-100"
                                                    >
                                                        Members
                                                    </Link>
                                                    <Link
                                                        href="/customer-management"
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors border-b border-gray-100"
                                                    >
                                                        Customer Management
                                                    </Link>
                                                    <Link
                                                        href="/buy-form"
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors border-b border-gray-100"
                                                    >
                                                        Buy Form Submissions
                                                    </Link>
                                                    <Link
                                                        href="/spec-requests"
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors border-b border-gray-100"
                                                    >
                                                        DS4U Form Submisssions
                                                    </Link>
                                                    <Link
                                                        href="/limitedEdition"
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors border-b border-gray-100"
                                                    >
                                                        Limited Edition
                                                    </Link>
                                                    {userRole ===
                                                        "SUPER_ADMIN" && (
                                                        <Link
                                                            href="/create-admin"
                                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#c89e3a] hover:text-white transition-colors"
                                                        >
                                                            Create Admin
                                                        </Link>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <button
                                        onClick={handleLogout}
                                        className="py-3 px-3 xl:px-4 xl:py-2.5 xl:h-10 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                                    >
                                        LOGOUT
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tagline - Below main navigation */}
                    <div className="w-full h-[2px] bg-[#C89E3A]"></div>

                    <div className="flex justify-center py-2">
                        <p className="text-sm md:text-base tracking-wide text-white">
                            <span>Where Trust Shines,</span>
                            <span> And Quality Sparkles</span>
                        </p>
                    </div>
                </div>
            </header>
        </>
    );
}
