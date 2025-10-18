"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { GraduationCap, Menu, X, Sun, Moon, Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import { getNavigateMarketItems } from "@/common/constants/navigate.constant";
import EBButton from "@/components/common/EBButton";
import { EBThemeToggle, EBLogo } from "@/components/common/";
import EBNavigation from "./components/EBNavigation";
import { HeaderConfig } from "./types";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { useTranslations } from "next-intl";
import { SUPPORTED_LOCALES } from "@/i18n/config";

interface MaketingHeaderProps {
  headerConfig?: HeaderConfig;
}

const EBMaketingHeader = ({ headerConfig }: MaketingHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { push } = useLocaleRouter();
  const pathname = usePathname();
  const t = useTranslations("marketing.header");
  const tRouter = useTranslations();

  // Get current path without locale prefix (e.g., /en/student -> /student)
  const currentPath = useMemo(() => {
    const segments = pathname.split("/");
    const locale = segments[1];

    // Check if first segment is a locale
    if (locale && SUPPORTED_LOCALES.includes(locale as any)) {
      // Remove locale from pathname
      return "/" + segments.slice(2).join("/");
    }

    return pathname;
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-card/80 backdrop-blur-xl shadow-lg border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <EBLogo />

            {/* Desktop EBNavigation */}
            {headerConfig ? (
              <nav className="hidden md:flex items-center space-x-6">
                {headerConfig.items.map((item) => (
                  <button
                    key={item.key}
                    onClick={
                      item.onClick || (() => item.href && (window.location.href = item.href))
                    }
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            ) : (
              <nav className="hidden md:flex items-center space-x-8">
                <EBNavigation items={getNavigateMarketItems(tRouter, currentPath)} />
              </nav>
            )}

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <EBThemeToggle />

              {/* Language Selector */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Globe className="w-5 h-5" />
              </motion.button>

              {/* Auth Buttons / CTA */}
              {headerConfig?.cta ? (
                <div className="hidden sm:flex items-center">
                  <EBButton
                    onClick={headerConfig.cta.onClick}
                    size="sm"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {headerConfig.cta.label}
                  </EBButton>
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-3">
                  <EBButton
                    onClick={() => push("/login")}
                    variant="ghost"
                    size="sm"
                    className="transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    {t("login")}
                  </EBButton>
                  <EBButton
                    onClick={() => push("/register")}
                    size="sm"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {t("register")}
                  </EBButton>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? "0%" : "100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 right-0 h-full w-80 bg-card border-l border-border shadow-2xl z-40 md:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Mobile EBHeader */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">EduBridge</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile EBNavigation */}
          <nav className="space-y-2">
            {getNavigateMarketItems(tRouter, currentPath).map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    push(item.href);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="space-y-3 pt-6 border-t border-border">
            <EBButton
              onClick={() => {
                setIsMobileMenuOpen(false);
                push("/login");
              }}
              variant="outline"
              size="lg"
              className="w-full border-primary/20 text-primary hover:bg-primary/10"
            >
              {t("mobileLogin")}
            </EBButton>
            <EBButton
              onClick={() => {
                setIsMobileMenuOpen(false);
                push("/register");
              }}
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground"
            >
              {t("mobileRegister")}
            </EBButton>
          </div>

          {/* Mobile Settings */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <span className="text-sm text-muted-foreground">{t("settings")}</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">
                <Globe className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
};

export default EBMaketingHeader;
