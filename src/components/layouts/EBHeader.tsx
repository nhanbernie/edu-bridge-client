"use client";

import React, { useState, useEffect } from "react";
import { Search, MessageSquare, Menu } from "lucide-react";
import EBMobileMenu from "./components/EBMobileMenu";
import Logo from "../common/EBLogo";
import {
  getNavigationItems,
  NavItem,
  defaultHeaderActionButtons,
} from "@/common/constants/navigate.constant";
import EBNavigation from "./components/EBNavigation";
import { motion } from "motion/react";
import { EBThemeToggle, EBUserMenu, EBChangeLanguage } from "@/components/common/";
import { EBButtonAction } from "../motion/EBButtonMotion";
import { HeaderItem, HeaderCTA, HeaderConfig, HeaderActionButton } from "./types";
import { useTranslations } from "next-intl";

interface ActionButtonsProps {
  onMobileMenuToggle: () => void;
  actionButtons?: HeaderActionButton[];
  showTheme?: boolean;
  showUserMenu?: boolean;
  showLanguageToggle?: boolean;
}

interface HeaderProps {
  actionButtons?: HeaderActionButton[];
  showTheme?: boolean;
  showUserMenu?: boolean;
  showLanguageToggle?: boolean;
  headerConfig?: HeaderConfig;
}

// Action buttons component
const ActionButtons = ({
  onMobileMenuToggle,
  actionButtons = defaultHeaderActionButtons,
  showTheme = true,
  showUserMenu = true,
  showLanguageToggle = true,
}: ActionButtonsProps) => (
  <div className="flex items-center gap-3">
    {/* Action buttons */}
    {actionButtons.map((button) => {
      if (button.show === false) return null;
      const IconComponent = button.icon;
      return (
        <EBButtonAction key={button.key} onClick={button.onClick}>
          <div className="relative">
            <IconComponent size={20} />
            {button.badge && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </div>
        </EBButtonAction>
      );
    })}

    {/* Language Toggle - show unless disabled */}
    {showLanguageToggle && <EBChangeLanguage />}

    {/* Theme Toggle - always show unless disabled */}
    {showTheme && <EBThemeToggle />}

    {/* User Menu - always show unless disabled */}
    {showUserMenu && <EBUserMenu />}

    {/* Mobile menu button - always show */}
    <button
      onClick={onMobileMenuToggle}
      className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
    >
      <Menu size={20} />
    </button>
  </div>
);

// Convert HeaderItem[] to NavItem[] for EBNavigation
const convertToNavItems = (items: HeaderItem[]): NavItem[] => {
  return items.map((item) => ({
    label: item.label,
    href: item.href || "#",
    active: false,
  }));
};

// CTA Button component
const CTAButton = ({ cta }: { cta: HeaderCTA }) => (
  <button
    onClick={cta.onClick}
    className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors duration-200"
  >
    {cta.label}
  </button>
);

// Main EBHeader component
const EBHeader = ({
  actionButtons = defaultHeaderActionButtons,
  showTheme = true,
  showUserMenu = true,
  showLanguageToggle = true,
  headerConfig,
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

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
            <Logo />

            {/* EBNavigation - Use headerConfig if provided, otherwise use default */}
            <nav className="hidden md:flex items-center gap-8">
              <EBNavigation
                items={headerConfig ? convertToNavItems(headerConfig.items) : getNavigationItems(t)}
              />
            </nav>

            {/* Right side - Actions */}
            <div className="flex items-center gap-3">
              {headerConfig?.cta && <CTAButton cta={headerConfig.cta} />}

              {/* Action buttons */}
              <ActionButtons
                actionButtons={headerConfig?.actionButtons ?? actionButtons}
                showTheme={headerConfig?.showTheme ?? showTheme}
                showUserMenu={headerConfig?.showUserMenu ?? showUserMenu}
                showLanguageToggle={headerConfig?.showLanguageToggle ?? showLanguageToggle}
                onMobileMenuToggle={handleMobileMenuToggle}
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <EBMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        navigationItems={getNavigationItems(t)}
      />
    </>
  );
};

export default EBHeader;
