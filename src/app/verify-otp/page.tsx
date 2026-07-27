"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { Mail, Home, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { userApi } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import { getAuthText } from "@/lib/i18n/authTranslations";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Separate component that uses useSearchParams
function OTPVerificationContent() {
  const { locale, dictionary } = useLanguage();
  const localizedPath = (path: string) => {
    if (!locale || locale === "en") return path;
    return `/${locale}${path}`;
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);

  // Refs for OTP inputs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Get email from URL params
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      // If no email in params, redirect to register
      router.push(localizedPath("/register"));
    }
  }, [searchParams, router, locale]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Only allow 4-digit numbers
    if (!/^\d{4}$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    setOtp(newOtp);

    // Focus last input
    inputRefs.current[3]?.focus();
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate OTP
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      setError(
        locale === "de"
          ? "Bitte geben Sie den vollständigen 4-stelligen OTP-Code ein"
          : "Please enter the complete 4-digit OTP"
      );
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log("Verifying OTP...");

      const response = await userApi.verifyOtp({
        email: email,
        otp: otpString,
      });

      if (response && response.success) {
        console.log("OTP verified successfully!", response);

        setSuccess(
          locale === "de"
            ? "E-Mail erfolgreich verifiziert! Weiterleitung..."
            : "Email verified successfully! Redirecting..."
        );

        // After OTP verification, redirect to customer details page
        // The customer will need to fill this form before being able to login
        setTimeout(() => {
          router.push(localizedPath(`/customer-details?email=${encodeURIComponent(email)}`));
        }, 2000);
      } else {
        setError(
          response?.message || 
            (locale === "de"
              ? "Ungültiger OTP-Code. Bitte versuchen Sie es erneut."
              : "Invalid OTP. Please try again.")
        );
      }
    } catch (err: unknown) {
      console.error("OTP verification error:", err);

      if (err instanceof Error) {
        const errorMessage = err.message;

        if (errorMessage.includes("expired")) {
          setError(
            locale === "de"
              ? "Der OTP-Code ist abgelaufen. Bitte fordern Sie einen neuen an."
              : "OTP has expired. Please request a new one."
          );
        } else if (
          errorMessage.includes("invalid") ||
          errorMessage.includes("incorrect")
        ) {
          setError(
            locale === "de"
              ? "Ungültiger OTP-Code. Bitte überprüfen Sie ihn und versuchen Sie es erneut."
              : "Invalid OTP. Please check and try again."
          );
        } else if (
          errorMessage.includes("network") ||
          errorMessage.includes("fetch")
        ) {
          setError(
            locale === "de"
              ? "Verbindung zum Server fehlgeschlagen. Bitte überprüfen Sie Ihre Internetverbindung."
              : "Unable to connect to server. Please check your internet connection."
          );
        } else {
          setError(
            errorMessage || 
              (locale === "de"
                ? "Verifizierung fehlgeschlagen. Bitte versuchen Sie es erneut."
                : "Verification failed. Please try again.")
          );
        }
      } else {
        setError(
          locale === "de"
            ? "Verbindung zum Server fehlgeschlagen. Bitte versuchen Sie es erneut."
            : "Unable to connect to server. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/New-Videos/diamond_countdown.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dimming overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        <div className="flex w-full max-w-[900px] h-auto md:h-[550px] rounded-xl shadow-2xl border border-gray-800 overflow-hidden flex-col md:flex-row">
          {/* Left Welcome Panel - Hidden on Mobile */}
          <div
            className="hidden md:flex flex-col justify-between text-white px-10 py-10 w-full md:w-[50%] md:min-w-[350px]"
            style={{
              background:
                "linear-gradient(to right, rgba(4, 8, 37, 0.9) 0%, rgba(4, 8, 37, 0.9) 100%)",
            }}
          >
            <div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-3 mb-2 mt-5">
                  <div className="relative w-[250px] md:w-[300px] h-20 md:h-[100px]">
                    <Image
                      src="/dalila_img/Dalila_Logo.png"
                      alt="Dalila Diamonds"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <h2
                className={`text-4xl md:text-6xl mb-4 md:mb-7 font-light text-[#d4a018] text-center ${playFair.className}`}
              >
                {getAuthText("verifyEmailTitle", locale)}
              </h2>

              <p className="text-sm md:text-md mt-2 mb-8 font-normal opacity-90 text-center">
                {getAuthText("verifyEmailDesc", locale)}
              </p>
            </div>

            {/* Email Display */}
            <div className="mt-2 mb-10 md:mb-20 space-y-2 text-sm opacity-90">
              <div className="flex items-center justify-center gap-2">
                <Mail className="text-[#FFD166] w-4 h-4 shrink-0" />
                <span className="text-[#FFD166] font-semibold">{email}</span>
              </div>
              <p className="text-xs text-center opacity-75">
                {getAuthText("checkSpam", locale)}
              </p>
            </div>
          </div>

          {/* Right Panel - OTP Form - Full Width on Mobile */}
          <div className="relative w-full md:flex-1 flex flex-col justify-center items-center bg-black/20 px-4 py-8 md:py-0">
            {/* Navigation Buttons */}
            <div className="absolute top-4 md:top-6 right-4 md:right-6 flex gap-2 z-10">
              <button
                className="bg-[#040825] rounded-full p-2 shadow-md hover:bg-[#d4a018] transition-all duration-200 hover:scale-110"
                title={locale === "de" ? "Zurück zur Registrierung" : "Back to Register"}
                onClick={() => router.push(localizedPath("/register"))}
                type="button"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <button
                className="bg-[#040825] rounded-full cursor-pointer p-2 shadow-md hover:bg-[#d4a018] transition-all duration-200 hover:scale-110"
                title="Home"
                onClick={() => router.push(localizedPath("/"))}
                type="button"
              >
                <Home className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* OTP Form */}
            <form
              onSubmit={handleVerifyOtp}
              className="relative z-10 w-full max-w-[400px] px-4 md:px-0"
            >
              <h2
                className={`text-2xl md:text-3xl font-semibold text-white mb-6 text-center ${playFair.className}`}
              >
                {locale === "de" ? "Verifizierungscode eingeben" : "Enter Verification Code"}
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

              {/* OTP Input */}
              <div className="mb-8">
                <div className="flex justify-center gap-3 md:gap-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      disabled={isLoading}
                      className="w-14 h-16 md:w-16 md:h-18 text-center text-2xl font-bold rounded-lg bg-white border-2 border-gray-300 focus:border-[#FFD166] text-black focus:outline-none focus:ring-2 focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      autoComplete="off"
                    />
                  ))}
                </div>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isLoading || otp.join("").length !== 4}
                className="w-full bg-[#d4a018] hover:bg-[#c4a639] text-white cursor-pointer font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] mb-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{locale === "de" ? "WIRD VERIFIZIERT..." : "VERIFYING..."}</span>
                  </>
                ) : (
                  <span>{locale === "de" ? "E-MAIL VERIFIZIEREN" : "VERIFY EMAIL"}</span>
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
function OTPVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full h-screen bg-black">
          <Loader2 className="w-8 h-8 animate-spin text-[#d4a018]" />
        </div>
      }
    >
      <OTPVerificationContent />
    </Suspense>
  );
}

// Export the component
export default OTPVerificationPage;
