"use client";

import React, { useState } from "react";
import { Globe } from "lucide-react";
import { useLanguageToggle } from "@/hooks/useLanguageToggle";
import { LOCALE_FLAGS, LOCALE_NAMES, SUPPORTED_LOCALES } from "@/i18n/config";
import { EBButtonAction } from "../motion/EBButtonMotion";
import EBActionsMenu, { ActionItem } from "./EBActionsMenu";

const EBChangeLanguage = () => {
  const { currentLocale, toggleLanguage } = useLanguageToggle();
  const [showMenu, setShowMenu] = useState(false);

  const handleLanguageChange = (locale: string) => {
    if (locale !== currentLocale) {
      // Use the existing toggle logic but with specific locale
      const segments = window.location.pathname.split("/");
      segments[1] = locale;
      const newPathname = segments.join("/");
      window.location.href = newPathname;
    }
    setShowMenu(false);
  };

  // Create actions for the menu
  const languageActions: ActionItem[] = SUPPORTED_LOCALES.map((locale) => ({
    label: `${LOCALE_FLAGS[locale]} ${locale.toUpperCase()}`,
    onClick: () => handleLanguageChange(locale),
  }));

  return (
    <div className="relative">
      <EBButtonAction onClick={() => setShowMenu(!showMenu)}>
        <Globe className="w-5 h-5" />
      </EBButtonAction>

      {/* Show Language Menu directly when clicked */}
      {showMenu && (
        <div className="absolute top-full right-0 mt-2 z-50 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
          {languageActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EBChangeLanguage;
