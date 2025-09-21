"use client";

import React, { useState, useEffect } from "react";
import { Search, MessageSquare, Menu, Globe } from "lucide-react";
import UserMenu from "./components/UserMenu";
import LanguageSelector from "../common/LanguageSelector";
import MobileMenu from "./components/MobileMenu";
import Logo from "../common/EBLogo";
import { navigationItems, NavItem } from "@/constants/navigate.constant";
import Navigation from "./components/Navigation";
import { motion } from "motion/react";
import { EBThemeToggle, EBLogo } from "@/components/common/";
import { ButtonAction } from "../motion/ButtonMotion";

interface AcitonButtonProps {
  onMobileMenuToggle: () => void;
  showMessage?: boolean;
}

interface HeaderProps {
  showMessage?: boolean;
}

const actionButtonItems = {
  icon: <Search size={20} />,
  message: <MessageSquare size={20} />,
  globe: <Globe size={20} />,
  user: <UserMenu />,
  menu: <Menu size={20} />,
};

// Action buttons component
const ActionButtons = ({ onMobileMenuToggle, showMessage = true }: AcitonButtonProps) => (
  <div className="flex items-center gap-3">

    {/* Search button */}
    <ButtonAction>
      <Search size={20} />
    </ButtonAction>

    {/* Messages button */}
    {showMessage && (
      <ButtonAction>
        <MessageSquare size={20} />
      </ButtonAction>
    )}

    {/* Language selector */}
    <ButtonAction>
      <Globe className="w-5 h-5" />
    </ButtonAction>
    {/* User Menu */}

    <EBThemeToggle />

    <UserMenu />
    {/* Mobile menu button */}
    <button
      onClick={onMobileMenuToggle}
      className="md:hidden p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-slate-700"
    >
      <Menu size={20} />
    </button>
  </div>
);

// Main Header component
const Header = ({ showMessage }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-sm bg-white/80 shadow-lg border-b border-gray-200/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            <nav className="hidden md:flex items-center gap-8">
              <Navigation items={navigationItems} />
            </nav>

            {/* Right side - Actions */}
            <ActionButtons showMessage={showMessage} onMobileMenuToggle={handleMobileMenuToggle} />
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        navigationItems={navigationItems}
      />
    </>
  );
};

export default Header;
