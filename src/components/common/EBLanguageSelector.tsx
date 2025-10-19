"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";
import { SUPPORTED_LOCALES, LOCALE_NAMES, LOCALE_FLAGS, type Locale } from "@/i18n/config";

interface EBLanguageSelectorProps {
  className?: string;
  variant?: "default" | "compact" | "icon-only";
}

const EBLanguageSelector: React.FC<EBLanguageSelectorProps> = ({
  className,
  variant = "compact",
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Extract current locale from pathname (e.g., /en/tutor -> "en")
  const currentLocale = (pathname.split("/")[1] || "en") as Locale;

  const handleLanguageChange = (newLocale: Locale) => {
    // Replace locale in pathname (e.g., /en/tutor -> /vi/tutor)
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");

    // Navigate to new locale URL
    router.push(newPathname);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-slate-700"
      >
        <Globe size={16} />
        <span className="text-sm">{LOCALE_FLAGS[currentLocale]}</span>
        <span className="text-sm">{currentLocale.toUpperCase()}</span>
        <ChevronDown size={12} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {SUPPORTED_LOCALES.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLanguageChange(locale)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                currentLocale === locale
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{LOCALE_FLAGS[locale]}</span>
              <span className="text-sm font-medium">{LOCALE_NAMES[locale]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EBLanguageSelector;
