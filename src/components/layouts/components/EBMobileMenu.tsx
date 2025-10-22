"use client";

import React from "react";
import { motion } from "motion/react";
import { X, GraduationCap } from "lucide-react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { EBThemeToggle, EBChangeLanguage } from "@/components/common";
import { useTranslations } from "next-intl";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavItem[];
  showTheme?: boolean;
  showLanguageToggle?: boolean;
}

const EBMobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navigationItems,
  showTheme = true,
  showLanguageToggle = true,
}) => {
  const { push } = useLocaleRouter();
  const t = useTranslations("common");

  return (
    <>
      {/* Mobile Menu Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{
          opacity: isOpen ? 1 : 0,
          x: isOpen ? "0%" : "100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 right-0 h-full w-80 bg-card border-l border-border shadow-2xl z-[110] md:hidden overflow-y-auto ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Mobile Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">EduBridge</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item, index) => (
              <motion.div
                key={`${item.href}-${index}`}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <button
                  onClick={() => {
                    onClose();
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

          {/* Mobile Settings */}
          <div className="pt-6 border-t border-border space-y-4">
            <span className="text-sm font-medium text-muted-foreground">
              {t("settings")}
            </span>
            <div className="flex items-center justify-between">
              {/* Theme Toggle */}
              {showTheme && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">{t("theme")}</span>
                  <EBThemeToggle />
                </div>
              )}

              {/* Language Toggle */}
              {showLanguageToggle && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">
                    {t("language")}
                  </span>
                  <EBChangeLanguage />
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] md:hidden"
        />
      )}
    </>
  );
};

export default EBMobileMenu;
