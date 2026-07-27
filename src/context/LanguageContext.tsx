"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Locale, DEFAULT_LOCALE, getLocaleFromPath, getLocalizedPath } from "@/lib/i18n/config";
import { getDictionary, Dictionary } from "@/lib/i18n/getDictionary";

interface LanguageContextType {
  locale: Locale;
  dictionary: Dictionary;
  switchLanguage: (newLocale: Locale) => void;
  isPending: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [locale, setLocale] = useState<Locale>(() => getLocaleFromPath(pathname));
  const [dictionary, setDictionary] = useState<Dictionary>(() => getDictionary(locale));

  useEffect(() => {
    const currentLocale = getLocaleFromPath(pathname);
    setLocale(currentLocale);
    setDictionary(getDictionary(currentLocale));
  }, [pathname]);

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === locale) return;
    const newPath = getLocalizedPath(pathname, newLocale);
    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <LanguageContext.Provider value={{ locale, dictionary, switchLanguage, isPending }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
