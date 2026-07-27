"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/pages/Header";
import Footer from "@/components/Footer";

export default function HeaderFooterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noHeaderFooterRoutes = [
    "/login",
    "/register",
    "/customer-details",
    "/forgot-password",
     "/verify-otp",
  ];

  // Remove locale prefix (e.g. /de/login -> /login)
  const segments = pathname.split("/").filter(Boolean);
  const isLocale = ["en", "de", "fr", "it", "nl", "es"].includes(segments[0]);
  const cleanPath = "/" + (isLocale ? segments.slice(1).join("/") : segments.join("/"));

  const hideHeaderFooter = noHeaderFooterRoutes.includes(cleanPath);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main className="relative overflow-x-hidden w-full max-w-full">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
