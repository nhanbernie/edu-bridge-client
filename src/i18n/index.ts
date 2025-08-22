import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import vi from "./locales/vi.json";
import en from "./locales/en.json";

// Get browser language
const getBrowserLanguage = (): string => {
  if (typeof window === "undefined") return "en";

  const language = navigator.language || "en";
  return language.split("-")[0]; // Extract language code (e.g., 'en' from 'en-US')
};

// Custom language detector for Next.js
const LANGUAGE_DETECTOR = {
  type: "languageDetector" as const,
  async: false,
  detect: (): string => {
    // Check localStorage first
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("user-language");
      if (savedLanguage && ["en", "vi"].includes(savedLanguage)) {
        return savedLanguage;
      }

      // Fallback to browser language
      return getBrowserLanguage();
    }

    return "en"; // Server-side fallback
  },
  init: () => {},
  cacheUserLanguage: (language: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user-language", language);
    }
  },
};

const resources = {
  vi: {
    translation: vi,
  },
  en: {
    translation: en,
  },
};

i18n
  .use(LANGUAGE_DETECTOR as any)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",

    // Have a common namespace used around the full app
    ns: ["translation"],
    defaultNS: "translation",

    interpolation: {
      escapeValue: false, // Not needed for React
    },

    // React i18next options
    react: {
      useSuspense: false,
      bindI18n: "languageChanged",
      bindI18nStore: "added",
      transEmptyNodeValue: "",
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br", "strong", "i", "em"],
    },

    // Custom options
    supportedLngs: ["en", "vi"],
    nonExplicitSupportedLngs: false,

    // Disable some features that might cause issues
    saveMissing: false,
    cleanCode: true,
  });

export default i18n;
