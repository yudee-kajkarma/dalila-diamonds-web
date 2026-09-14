"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import {
    Phone,
    Mail,
    MapPin,
    Home,
    Loader2,
    CheckCircle,
    Building2,
    User,
    Globe,
    FileText,
    ArrowLeft,
} from "lucide-react";
import { s3Asset } from "@/lib/s3Assets";
import { playfair as playFair } from "@/lib/fonts";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { userApi } from "@/lib/api";
import { videoUrl } from "@/lib/videoAssets";

// Dynamically import react-phone-input-2 to avoid SSR issues
import type { CountryData, PhoneInputProps } from "react-phone-input-2";
const PhoneInput = dynamic(() => import("react-phone-input-2"), {
    ssr: false,
}) as unknown as React.ComponentType<PhoneInputProps>;
import "@/app/phone-input-overrides.css";

/**
 * A field label, with a red asterisk when the field is required.
 *
 * The form used to mark required fields by putting " *" inside the
 * placeholder, which disappears the moment anyone types - so the one moment a
 * person might check what is still compulsory is the moment the marks are all
 * gone. It was also the same grey as the hint text, so it read as decoration.
 * A real label stays put, is announced by screen readers through htmlFor, and
 * carries the asterisk in red where it means something.
 */
function FieldLabel({
    htmlFor,
    children,
    required = false,
}: {
    htmlFor: string;
    children: React.ReactNode;
    required?: boolean;
}) {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-sm font-medium text-white mb-1"
        >
            {children}
            {required ? (
                <span className="text-red-500 ml-0.5" aria-hidden="true">
                    *
                </span>
            ) : null}
        </label>
    );
}

// Business types
const businessTypes = [
    "Wholesale",
    "Retail",
    "Manufacturer",
    "Trader",
    "Jeweler",
    "Other",
];

function CustomerDetailsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Personal Information
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [countryCode, setCountryCode] = useState<string>("91");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [landline, setLandline] = useState<string>("");
    const [landlineCountryCode, setLandlineCountryCode] =
        useState<string>("91");

    // Address Information
    const [street, setStreet] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [country, setCountry] = useState<string>("");

    // Business Information
    const [companyName, setCompanyName] = useState<string>("");
    const [businessType, setBusinessType] = useState<string>("");
    const [vatNumber, setVatNumber] = useState<string>("");
    const [websiteUrl, setWebsiteUrl] = useState<string>("");

    // UI States
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCheckingStatus, setIsCheckingStatus] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    // CHECK IF USER HAS ALREADY SUBMITTED CUSTOMER DATA
    useEffect(() => {
        const checkCustomerDataStatus = () => {
            if (typeof window === "undefined") {
                setIsCheckingStatus(false);
                return;
            }

            try {
                // Get user from localStorage
                const userString = localStorage.getItem("user");

                if (userString) {
                    const user = JSON.parse(userString);

                    // Check if customer data already exists and is complete
                    if (
                        user.customerData &&
                        user.customerData.firstName &&
                        user.customerData.businessInfo &&
                        user.customerData.address
                    ) {
                        // Check KYC status
                        if (user.kycStatus === "approved") {
                            console.log(
                                " Already approved - redirecting to home",
                            );
                            setSuccess(
                                "Your account is already approved! Redirecting...",
                            );
                            setTimeout(() => {
                                router.push("/");
                            }, 2000);
                        } else if (user.kycStatus === "pending") {
                            console.log(" Pending approval - showing message");
                            setError(
                                "Your customer details are pending approval. Please wait for admin verification.",
                            );
                            setTimeout(() => {
                                router.push("/");
                            }, 3000);
                        } else if (user.kycStatus === "rejected") {
                            console.log(" Rejected - showing message");
                            setError(
                                "Your application was rejected. Please contact support.",
                            );
                            setTimeout(() => {
                                router.push("/");
                            }, 3000);
                        } else {
                            // Has customer data but no KYC status (shouldn't happen, but handle it)
                            console.log(" Has customer data but no KYC status");
                            setSuccess(
                                "Customer details already submitted. Redirecting...",
                            );
                            setTimeout(() => {
                                router.push("/");
                            }, 2000);
                        }
                    } else {
                        console.log(
                            " No customer data yet - allowing access to form",
                        );
                        setIsCheckingStatus(false);
                    }
                } else {
                    console.log(
                        " No user in localStorage - checking for email param",
                    );

                    // If no user but has email param, allow access (coming from OTP verification)
                    const emailParam = searchParams.get("email");
                    if (!emailParam) {
                        console.log(
                            " No email param - redirecting to register",
                        );
                        setError("Session expired. Please register again.");
                        setTimeout(() => {
                            router.push("/register");
                        }, 2000);
                    } else {
                        setIsCheckingStatus(false);
                    }
                }
            } catch (error) {
                console.error("Error checking customer data status:", error);
                // Don't block the user on error, let them proceed
                setIsCheckingStatus(false);
            }
        };

        checkCustomerDataStatus();
    }, [router, searchParams]);

    const validateForm = (): boolean => {
        setError("");

        // Personal Information Validation
        if (!firstName.trim()) {
            setError("First name is required");
            return false;
        }

        if (!lastName.trim()) {
            setError("Last name is required");
            return false;
        }

        if (!phoneNumber.trim()) {
            setError("Phone number is required");
            return false;
        }
        /*
         * Length is counted in E.164 terms: the dial code plus the national
         * number, which is exactly what this field holds.
         *
         * The old comment said "ignoring country code" but the value from
         * react-phone-input-2 has always included it, so the check was really
         * 8-15 including the dial code - and the floor of 8 turned away real
         * numbers. Niue (+683 4002), Saint Helena and Tokelau all reach 7 digits
         * in total and were rejected outright. This is a wholesaler selling into
         * any market, so the rule should not decide which countries may register.
         *
         * 15 is the E.164 maximum and stays. The floor drops to 7, which is the
         * shortest a real international number gets, and still catches somebody
         * who typed three digits and stopped.
         */
        const digits = phoneNumber.replace(/\D/g, "");
        if (digits.length < 7 || digits.length > 15) {
            setError(
                "Please enter a valid phone number, including the country code (7-15 digits)",
            );
            return false;
        }

        // Address Validation
        if (!street.trim()) {
            setError("Street address is required");
            return false;
        }

        if (!city.trim()) {
            setError("City is required");
            return false;
        }

        if (!state.trim()) {
            setError("State/Province is required");
            return false;
        }

        if (!postalCode.trim()) {
            setError("Postal code is required");
            return false;
        }

        if (!country.trim()) {
            setError("Country is required");
            return false;
        }

        // Business Information Validation
        if (!companyName.trim()) {
            setError("Company name is required");
            return false;
        }

        if (!businessType) {
            setError("Business type is required");
            return false;
        }

        if (!vatNumber.trim()) {
            setError("VAT/Tax number is required");
            return false;
        }

        // Website URL validation (optional, but if provided must be valid)
        if (websiteUrl.trim()) {
            const urlRegex =
                /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
            if (!urlRegex.test(websiteUrl)) {
                setError("Please enter a valid website URL");
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            console.log(" Submitting customer details...");

            // Get email from URL params or sessionStorage
            const urlEmail = searchParams.get("email");
            const storedEmail =
                typeof window !== "undefined"
                    ? sessionStorage.getItem("pendingEmail")
                    : null;
            const userEmail = urlEmail || storedEmail;

            if (!userEmail) {
                setError("Session expired. Please register again.");
                setTimeout(() => router.push("/register"), 2000);
                return;
            }

            // Split the dial code off the number.
            //
            // react-phone-input-2 hands back the whole thing with no "+", so
            // "+32 475 96 87 38" arrives as "32475968738". The previous version only
            // stripped the code when the value began with "+", which it never does,
            // so the dial code was stored twice - countryCode "+32" alongside a
            // number that still began 32. Every one of the six customer records on
            // file reads "+32 32475968738". The landline field a few lines below
            // always did this correctly; only the mobile path was wrong.
            const cc = String(countryCode).replace(/^\+/, "");
            const digits = phoneNumber.replace(/\D/g, "");
            const pn = digits.startsWith(cc) ? digits.slice(cc.length) : digits;
            const customerData = {
                email: userEmail, // Include email to identify the user
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                phoneNumber: pn.trim(), // Just the number without country code
                countryCode: `+${cc}`,
                landlineCountryCode: landline
                    ? `+${landlineCountryCode}`
                    : undefined,
                landlineNumber: landline
                    ? landline
                          .replace(/[^0-9]/g, "")
                          .replace(new RegExp(`^${landlineCountryCode}`), "")
                    : undefined,
                address: {
                    street: street.trim(),
                    city: city.trim(),
                    state: state.trim(),
                    postalCode: postalCode.trim(),
                    country: country.trim(),
                },
                businessInfo: {
                    companyName: companyName.trim(),
                    businessType: businessType,
                    vatNumber: vatNumber.trim(),
                    websiteUrl: websiteUrl.trim() || undefined,
                },
            };

            const response = await userApi.submitCustomerData(customerData);

            if (response && response.success) {
                console.log(
                    " Customer details submitted successfully!",
                    response,
                );

                // Clear sessionStorage
                if (typeof window !== "undefined") {
                    sessionStorage.removeItem("pendingEmail");
                }

                setSuccess(
                    "Customer details submitted successfully! Your account is pending approval. You can now login, but full access will be granted after admin approval.",
                );

                // Clear form
                setFirstName("");
                setLastName("");
                setPhoneNumber("");
                setLandline("");
                setStreet("");
                setCity("");
                setState("");
                setPostalCode("");
                setCountry("");
                setCompanyName("");
                setBusinessType("");
                setVatNumber("");
                setWebsiteUrl("");

                // Redirect to login after 3 seconds
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
            } else {
                setError(
                    response?.message ||
                        "Failed to submit customer details. Please try again.",
                );
            }
        } catch (err: unknown) {
            console.error(" Submit customer details error:", err);

            if (err instanceof Error) {
                const errorMessage = err.message;

                if (errorMessage.includes("already submitted")) {
                    setError(
                        "Customer details already submitted. Redirecting to login...",
                    );
                    setTimeout(() => router.push("/login"), 2000);
                } else if (
                    errorMessage.includes("unauthorized") ||
                    errorMessage.includes("Unauthorized")
                ) {
                    setError(
                        "Session expired. Please verify your email again.",
                    );
                    setTimeout(() => {
                        const emailParam = searchParams.get("email");
                        if (emailParam) {
                            router.push(
                                `/verify-otp?email=${encodeURIComponent(emailParam)}`,
                            );
                        } else {
                            router.push("/register");
                        }
                    }, 2000);
                } else if (
                    errorMessage.includes("network") ||
                    errorMessage.includes("fetch")
                ) {
                    setError(
                        "Unable to connect to server. Please check your internet connection.",
                    );
                } else {
                    setError(
                        errorMessage || "Failed to submit. Please try again.",
                    );
                }
            } else {
                setError(
                    "Unable to connect to server. Please check your internet connection and try again.",
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Show loading while checking status
    if (isCheckingStatus) {
        return (
            <div className="relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={videoUrl("authBg")}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 animate-spin text-[#d4a018]" />
                    <p className="text-white text-lg">
                        Checking your account status...
                    </p>
                </div>
            </div>
        );
    }

    /*
     * overflow-x-clip below, not overflow-x-hidden.
     *
     * Setting overflow-x to anything but visible makes the browser compute
     * overflow-y to auto, which turns that div into a scroll container. A
     * position: sticky descendant then anchors to it instead of the viewport -
     * and because that box never scrolls itself, the page does, sticky
     * silently does nothing. It is why pinning the left panel had no effect.
     *
     * clip stops sideways overflow just the same without establishing a
     * scroll container, so sticky inside still measures against the viewport.
     */
    return (
        <div className="relative w-full min-h-screen overflow-x-clip bg-black">
            {/*
        Background video, fixed rather than absolute.

        This form is long enough to scroll, and an absolutely positioned video
        sized h-full stretches to the full document height - so it zoomed and
        drifted as the page moved. Fixed pins it to the viewport, which is what
        a backdrop should do, and it costs nothing because the element never
        moves.
      */}
            <video
                className="fixed inset-0 w-full h-full object-cover z-0"
                src={videoUrl("diamondCountdown")}
                autoPlay
                muted
                loop
                playsInline
            />

            {/* Dimming overlay, pinned to match */}
            <div className="fixed inset-0 bg-black/50 pointer-events-none z-0" />

            {/*
              items-start with my-auto on the card, rather than items-center.

              Centring a flex child that is taller than its container pushes
              the overflow off the top, where it cannot be scrolled back to -
              and this card is now taller than the viewport. Auto margins
              centre it while there is room and collapse to zero when there is
              not, so the top of the card stays reachable either way. Sticky
              inside it then measures from a predictable place.
            */}
            <div className="relative z-10 flex items-start justify-center w-full min-h-screen p-4 py-8">
                <div className="my-auto flex w-full max-w-[1200px] min-h-[700px] rounded-xl shadow-2xl border border-gray-800 flex-col md:flex-row">
                    {/* Left Welcome Panel - Hidden on Mobile */}
                    {/*
                      Two elements on purpose: the column and its contents.

                      The column keeps stretching to the card's full height, so
                      the gradient still fills the left side. The contents sit
                      in a sticky box inside it, because the form beside them
                      is now taller than the viewport - it used to have its own
                      scrollbar, and once that was removed the page grew and
                      carried the logo and contact details off the top of the
                      screen. Sticky pins them while the form scrolls past.

                      justify-between is gone with it: it spread these two
                      blocks across a very tall column, which is the spacing
                      that made the panel look empty in the middle. A gap does
                      the job now that the box is only as tall as its content.
                    */}
                    <div
                        className="hidden md:flex flex-col text-white w-full md:w-[40%] md:min-w-[350px] rounded-l-xl"
                        style={{
                            background:
                                "linear-gradient(to right, rgba(4, 8, 37, 0.9) 0%, rgba(4, 8, 37, 0.9) 100%)",
                        }}
                    >
                      <div className="md:sticky md:top-0 flex flex-col gap-8 px-10 py-10">
                        <div>
                            <div className="flex flex-col items-center text-center">
                                <div className="flex items-center justify-center gap-3 mb-2 mt-5">
                                    <div className="relative w-[250px] md:w-[300px] h-[80px] md:h-[100px]">
                                        <Image
                                            src={s3Asset(
                                                "/dalila_img/Dalila_Logo.png",
                                            )}
                                            alt="Dalila Diamonds"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </div>

                            <h2
                                className={`text-4xl md:text-5xl mb-4 md:mb-6 font-light text-[#d4a018] text-center ${playFair.className}`}
                            >
                                Complete Your Profile
                            </h2>

                            <p className="text-sm md:text-md mt-2 mb-6 font-normal opacity-90 text-center">
                                We need some additional information to set up
                                your account. Please provide your business and
                                contact details below.
                            </p>

                            <div className="bg-white/10 rounded-lg p-4 mb-4">
                                <h3 className="text-lg font-semibold text-[#FFD166] mb-2">
                                    What happens next?
                                </h3>
                                <ul className="text-sm space-y-2 opacity-90">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-[#FFD166] mt-0.5 flex-shrink-0" />
                                        <span>
                                            Your details will be reviewed by our
                                            team
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-[#FFD166] mt-0.5 flex-shrink-0" />
                                        <span>
                                            You&apos;ll receive approval
                                            notification via email
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-[#FFD166] mt-0.5 flex-shrink-0" />
                                        <span>
                                            Once approved, you can start
                                            browsing diamonds
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="mt-1 space-y-2 text-sm opacity-90">
                            <div className="flex items-center justify-center gap-2">
                                <Phone className="text-[#FFD166] w-4 h-4 flex-shrink-0" />

                                <span>+32487939351</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Mail className="text-[#FFD166] w-4 h-4 flex-shrink-0" />
                                <span>business@daliladiamonds.com</span>
                            </div>
                            <div className="flex items-baseline justify-center gap-2 text-center">
                                <MapPin className="text-[#FFD166] w-4 h-4 flex-shrink-0" />
                                <span>
                                    Shreyas D. Gandhi, Hoveniersstraat 30, Box -
                                    105,Suite 326, 2018 Antwerpen, BTW BE:
                                    0736.671.250
                                </span>
                            </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Panel - Form - Full Width on Mobile */}
                    {/*
            One scrollbar, the page's.

            This column used to carry md:overflow-y-auto md:max-h-screen, which
            gave the form its own scroll area inside a page that already
            scrolled - two bars side by side, the inner one cutting the card
            off mid-field. The card now grows to its content and the page
            scrolls it, which is also what happens on mobile, so both sizes
            behave the same way.
          */}
                    <div className="relative w-full md:flex-1 flex flex-col justify-center items-center bg-black/20 px-4 py-8">
                        {/* Navigation Buttons */}
                        <div className="absolute top-4 md:top-6 right-4 md:right-6 flex gap-2 z-10">
                            <button
                                className="bg-[#101638]/80 rounded-full p-2 shadow-md hover:bg-[#d4a018] transition-all duration-200 hover:scale-110"
                                title="Back to Login"
                                onClick={() => router.push("/login")}
                                type="button"
                            >
                                <ArrowLeft className="w-5 h-5 text-white" />
                            </button>
                            <button
                                className="bg-[#101638]/80 rounded-full p-2 shadow-md cursor-pointer hover:bg-[#d4a018] transition-all duration-200 hover:scale-110"
                                title="Home"
                                onClick={() => router.push("/")}
                                type="button"
                            >
                                <Home className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="relative z-10 w-full max-w-[500px] mt-10 overflow-visible"
                        >
                            <h2
                                className={`text-2xl md:text-3xl font-semibold text-white mb-6 text-center ${playFair.className}`}
                            >
                                Customer Details
                            </h2>

                            {/* Success Message */}
                            {success && (
                                <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500 text-green-200 text-sm text-center flex items-center justify-center gap-2">
                                    <CheckCircle className="w-5 h-5" />
                                    {success}
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500 text-red-200 text-sm text-center animate-shake">
                                    {error}
                                </div>
                            )}

                            {/* Personal Information Section */}
                            <div className="mb-2">
                                <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
                                    <User className="w-5 h-5 text-[#FFD166]" />
                                    Personal Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div>
                                        <FieldLabel
                                            htmlFor="cd-first-name"
                                            required
                                        >
                                            First Name
                                        </FieldLabel>
                                        <input
                                            id="cd-first-name"
                                            type="text"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            required
                                            disabled={isLoading}
                                            placeholder="First Name"
                                            className="w-full px-3 py-1.5 rounded-lg bg-white border border-gray-300 focus:border-[#FFD166] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                        />
                                    </div>

                                    <div>
                                        <FieldLabel
                                            htmlFor="cd-last-name"
                                            required
                                        >
                                            Last Name
                                        </FieldLabel>
                                        <input
                                            id="cd-last-name"
                                            type="text"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            required
                                            disabled={isLoading}
                                            placeholder="Last Name"
                                            className="w-full px-3 py-1.5 rounded-lg bg-white border border-gray-300 focus:border-[#FFD166] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <div className="mt-2 phone-input-field">
                                    <FieldLabel htmlFor="cd-phone" required>
                                        Phone Number
                                    </FieldLabel>
                                    <PhoneInput
                                        country={"in"}
                                        value={phoneNumber}
                                        onChange={(
                                            value: string,
                                            data: CountryData,
                                        ) => {
                                            setPhoneNumber(value);
                                            if (
                                                data &&
                                                typeof data === "object" &&
                                                "dialCode" in data &&
                                                data.dialCode
                                            ) {
                                                setCountryCode(data.dialCode);
                                            }
                                        }}
                                        placeholder="Phone Number"
                                        inputProps={{
                                            id: "cd-phone",
                                            name: "phone",
                                            required: true,
                                            disabled: isLoading,
                                            autoFocus: false,
                                        }}
                                        inputClass="!w-full !pl-16 !pr-4 !py-2 !rounded-lg !bg-white !border !border-gray-300 !focus:border-[#FFD166] !text-black !placeholder-gray-500 !focus:outline-none !focus:ring-2 !focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed !transition-all !duration-200"
                                        buttonClass="!bg-white !border-none !rounded-l-lg !shadow-none !pl-2 !pr-2"
                                        dropdownClass="phone-input-dropdown"
                                        containerClass="!w-full"
                                        enableSearch
                                        disableSearchIcon={false}
                                        specialLabel=""
                                        countryCodeEditable={false}
                                        /*
                                         * Keep enableAreaCodes off. It registers a pseudo-country per
                                         * area code whose dialCode is country code + area code
                                         * ("54343" for Argentina, "614" for an Australian mobile).
                                         * guessSelectedCountry picks the longest matching dialCode, so
                                         * that entry wins as soon as the typed digits reach an area
                                         * code - but it carries no hasAreaCodes flag, so the
                                         * countryCodeEditable={false} guard in handleInput then demands
                                         * the raw input start with "+54343" while the field actually
                                         * reads "+54 (34) 3". Those never match, so every further
                                         * keystroke was silently dropped and the field went dead:
                                         * Argentina died after three digits, Australian mobiles after
                                         * one. It also leaked the area code into onChange's dialCode,
                                         * which countryCode is saved from, so the number was heading
                                         * for the database as countryCode "+54343" with the area code
                                         * missing from phoneNumber.
                                         *
                                         * The old masks={{ in: "+.. ........." }} is gone with it: a
                                         * mask must not repeat the "+.." dial-code prefix, which the
                                         * library adds itself, so it rendered Indian numbers as
                                         * "+91 +98 76543210".
                                         */
                                        enableAreaCodes={false}
                                        /*
                                         * One neutral grouping for every country instead of the
                                         * library's per-country formats. Those wrap the leading digits
                                         * in parentheses for the countries that use an area code, so
                                         * an Australian number read "+61 (12) 3121 23" as though the
                                         * first two digits had been split off into a bracket. The
                                         * parentheses were only ever presentation - onChange always
                                         * emitted digits alone - but they read as data loss.
                                         */
                                        alwaysDefaultMask
                                    />
                                </div>

                                <div className="mt-2 phone-input-field">
                                    <FieldLabel htmlFor="cd-landline">
                                        Landline Number (optional)
                                    </FieldLabel>
                                    <PhoneInput
                                        country={"in"}
                                        value={landline}
                                        onChange={(
                                            value: string,
                                            data: CountryData,
                                        ) => {
                                            setLandline(value);
                                            if (
                                                data &&
                                                typeof data === "object" &&
                                                "dialCode" in data &&
                                                data.dialCode
                                            ) {
                                                setLandlineCountryCode(
                                                    data.dialCode,
                                                );
                                            }
                                        }}
                                        placeholder="Landline Number"
                                        inputProps={{
                                            id: "cd-landline",
                                            name: "landline",
                                            required: false,
                                            disabled: isLoading,
                                            autoFocus: false,
                                        }}
                                        inputClass="!w-full !pl-16 !pr-4 !py-2 !rounded-lg !bg-white !border !border-gray-300 !focus:border-[#FFD166] !text-black !placeholder-gray-500 !focus:outline-none !focus:ring-2 !focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed !transition-all !duration-200"
                                        buttonClass="!bg-white !border-none !rounded-l-lg !shadow-none !pl-2 !pr-2"
                                        dropdownClass="phone-input-dropdown"
                                        containerClass="!w-full"
                                        enableSearch
                                        disableSearchIcon={false}
                                        specialLabel=""
                                        countryCodeEditable={false}
                                        /*
                                         * Keep enableAreaCodes off. It registers a pseudo-country per
                                         * area code whose dialCode is country code + area code
                                         * ("54343" for Argentina, "614" for an Australian mobile).
                                         * guessSelectedCountry picks the longest matching dialCode, so
                                         * that entry wins as soon as the typed digits reach an area
                                         * code - but it carries no hasAreaCodes flag, so the
                                         * countryCodeEditable={false} guard in handleInput then demands
                                         * the raw input start with "+54343" while the field actually
                                         * reads "+54 (34) 3". Those never match, so every further
                                         * keystroke was silently dropped and the field went dead:
                                         * Argentina died after three digits, Australian mobiles after
                                         * one. It also leaked the area code into onChange's dialCode,
                                         * which countryCode is saved from, so the number was heading
                                         * for the database as countryCode "+54343" with the area code
                                         * missing from phoneNumber.
                                         *
                                         * The old masks={{ in: "+.. ........." }} is gone with it: a
                                         * mask must not repeat the "+.." dial-code prefix, which the
                                         * library adds itself, so it rendered Indian numbers as
                                         * "+91 +98 76543210".
                                         */
                                        enableAreaCodes={false}
                                        /*
                                         * One neutral grouping for every country instead of the
                                         * library's per-country formats. Those wrap the leading digits
                                         * in parentheses for the countries that use an area code, so
                                         * an Australian number read "+61 (12) 3121 23" as though the
                                         * first two digits had been split off into a bracket. The
                                         * parentheses were only ever presentation - onChange always
                                         * emitted digits alone - but they read as data loss.
                                         */
                                        alwaysDefaultMask
                                    />
                                </div>
                            </div>

                            {/* Address Information Section */}
                            <div className="mb-2 relative z-0">
                                <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-[#FFD166]" />
                                    Address Information
                                </h3>

                                <div className="space-y-2">
                                    <div>
                                        <FieldLabel
                                            htmlFor="cd-street"
                                            required
                                        >
                                            Street Address
                                        </FieldLabel>
                                        <input
                                            id="cd-street"
                                            type="text"
                                            value={street}
                                            onChange={(e) =>
                                                setStreet(e.target.value)
                                            }
                                            required
                                            disabled={isLoading}
                                            placeholder="Street Address"
                                            className="w-full px-3 py-1.5 rounded-lg bg-white border border-gray-300 focus:border-[#FFD166] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <FieldLabel
                                                htmlFor="cd-city"
                                                required
                                            >
                                                City
                                            </FieldLabel>
                                            <input
                                                id="cd-city"
                                                type="text"
                                                value={city}
                                                onChange={(e) =>
                                                    setCity(e.target.value)
                                                }
                                                required
                                                disabled={isLoading}
                                                placeholder="City"
                                                className="w-full px-3 py-1.5 rounded-lg bg-white border border-gray-300 focus:border-[#FFD166] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                            />
                                        </div>

                                        <div>
                                            <FieldLabel
                                                htmlFor="cd-state"
                                                required
                                            >
                                                State / Province
                                            </FieldLabel>
                                            <input
                                                id="cd-state"
                                                type="text"
                                                value={state}
                                                onChange={(e) =>
                                                    setState(e.target.value)
                                                }
                                                required
                                                disabled={isLoading}
                                                placeholder="State/Province"
                                                className="w-full px-3 py-1.5 rounded-lg bg-white border border-gray-300 focus:border-[#FFD166] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <FieldLabel
                                                htmlFor="cd-postal-code"
                                                required
                                            >
                                                Postal Code
                                            </FieldLabel>
                                            <input
                                                id="cd-postal-code"
                                                type="text"
                                                value={postalCode}
                                                onChange={(e) =>
                                                    setPostalCode(
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                disabled={isLoading}
                                                placeholder="Postal Code"
                                                className="w-full px-3 py-1.5 rounded-lg bg-white border border-gray-300 focus:border-[#FFD166] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                            />
                                        </div>

                                        <div>
                                            <FieldLabel
                                                htmlFor="cd-country"
                                                required
                                            >
                                                Country
                                            </FieldLabel>
                                            <input
                                                id="cd-country"
                                                type="text"
                                                value={country}
                                                onChange={(e) =>
                                                    setCountry(e.target.value)
                                                }
                                                required
                                                disabled={isLoading}
                                                placeholder="Country"
                                                className="w-full px-3 py-1.5 rounded-lg bg-white border border-gray-300 focus:border-[#FFD166] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Business Information Section */}
                            <div className="mb-2 relative z-0">
                                <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
                                    <Building2 className="w-5 h-5 text-[#FFD166]" />
                                    Business Information
                                </h3>

                                <div className="space-y-1.5">
                                    <div>
                                        <FieldLabel
                                            htmlFor="cd-company-name"
                                            required
                                        >
                                            Company Name
                                        </FieldLabel>
                                        <input
                                            id="cd-company-name"
                                            type="text"
                                            value={companyName}
                                            onChange={(e) =>
                                                setCompanyName(e.target.value)
                                            }
                                            required
                                            disabled={isLoading}
                                            placeholder="Company Name"
                                            className="w-full px-3 py-1.5 rounded-lg bg-white border border-gray-300 focus:border-[#FFD166] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                        />
                                    </div>

                                    <FieldLabel
                                        htmlFor="cd-business-type"
                                        required
                                    >
                                        Business Type
                                    </FieldLabel>
                                    <select
                                        id="cd-business-type"
                                        value={businessType}
                                        onChange={(e) =>
                                            setBusinessType(e.target.value)
                                        }
                                        required
                                        disabled={isLoading}
                                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-gray-300 focus:border-[#FFD166] text-black focus:outline-none focus:ring-2 focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        <option value="">
                                            Select Business Type
                                        </option>
                                        {businessTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>

                                    <div>
                                        <FieldLabel
                                            htmlFor="cd-vat-number"
                                            required
                                        >
                                            VAT / Tax Number
                                        </FieldLabel>
                                        <input
                                            id="cd-vat-number"
                                            type="text"
                                            value={vatNumber}
                                            onChange={(e) =>
                                                setVatNumber(e.target.value)
                                            }
                                            required
                                            disabled={isLoading}
                                            placeholder="VAT/Tax Number (e.g., GSTIN1234567)"
                                            className="w-full px-3 py-1.5 rounded-lg bg-white border border-gray-300 focus:border-[#FFD166] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                        />
                                    </div>

                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2  w-5 h-5 text-gray-400" />
                                        <div>
                                            <FieldLabel htmlFor="cd-website-url">
                                                Website URL (optional)
                                            </FieldLabel>
                                            <input
                                                id="cd-website-url"
                                                type="url"
                                                value={websiteUrl}
                                                onChange={(e) =>
                                                    setWebsiteUrl(
                                                        e.target.value,
                                                    )
                                                }
                                                disabled={isLoading}
                                                placeholder="Website URL (optional)"
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-gray-300 focus:border-[#FFD166] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info Text */}
                            <div className="mb-3 p-3 bg-blue-500/20 border border-blue-500 rounded-lg">
                                <p className="text-xs text-blue-200 flex items-start gap-2">
                                    <FileText className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    <span>
                                        All information will be reviewed by our
                                        team. You&apos;ll receive an email
                                        notification once your account is
                                        approved.
                                    </span>
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#d4a018] hover:bg-[#c4a639] text-white cursor-pointer font-semibold py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>SUBMITTING...</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        <span>SUBMIT FOR APPROVAL</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Main component with Suspense wrapper
export default function CustomerDetailsPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center w-full h-screen bg-black">
                    <Loader2 className="w-8 h-8 animate-spin text-[#d4a018]" />
                </div>
            }
        >
            <CustomerDetailsContent />
        </Suspense>
    );
}
