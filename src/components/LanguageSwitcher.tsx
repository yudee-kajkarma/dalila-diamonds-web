"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGE_OPTIONS, LanguageOption } from "@/lib/i18n/config";
import { ChevronDown, Globe } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile";
}

export default function LanguageSwitcher({ variant = "desktop" }: LanguageSwitcherProps) {
  const { locale, switchLanguage, isPending } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGE_OPTIONS.find((opt) => opt.code === locale) || LANGUAGE_OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: LanguageOption) => {
    setIsOpen(false);
    switchLanguage(option.code);
  };

  if (variant === "mobile") {
    return (
      <div className="w-full border-t border-amber-900/10 pt-4 mt-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-900/60 mb-2 px-2">
          Language / Sprache / Langue
        </p>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGE_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              onClick={() => handleSelect(opt)}
              disabled={isPending}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                opt.code === locale
                  ? "bg-amber-800 text-white shadow-sm"
                  : "bg-amber-50/50 text-neutral-800 hover:bg-amber-100/80"
              }`}
            >
              <span className="text-base">{opt.flag}</span>
              <span>{opt.nativeName}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-white hover:text-[#c89e3a] transition-colors whitespace-nowrap cursor-pointer"
        aria-label="Select Language"
      >
        <Globe className="w-4 h-4 text-[#c89e3a]" />
        <span className="uppercase tracking-wider font-semibold text-xs">{currentOption.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-white/60 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-[#050c3a] border border-[#c89e3a] shadow-xl py-1 z-50 animate-in fade-in-80 zoom-in-95">
          <div className="px-3 py-1.5 border-b border-white/10 text-[11px] font-semibold text-[#c89e3a] uppercase tracking-wider">
            Select Language
          </div>
          {LANGUAGE_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              onClick={() => handleSelect(opt)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors ${
                opt.code === locale
                  ? "bg-[#c89e3a] text-white font-semibold"
                  : "text-white/90 hover:bg-[#c89e3a]/20 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{opt.flag}</span>
                <span>{opt.nativeName}</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-white/50">{opt.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
