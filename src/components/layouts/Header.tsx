import React, { useState } from "react";
import { Search, MessageSquare, Menu } from "lucide-react";
import UserMenu from "./components/UserMenu";
import LanguageSelector from "../common/LanguageSelector";
import MobileMenu from "./components/MobileMenu";
import Logo from "../common/Logo";
import { navigationItems, NavItem } from "@/constants/navigate.constant";

const Navigation = ({ items }: { items: NavItem[] }) => (
  <nav className="hidden md:flex items-center gap-8">
    {items.map((item) => (
      <a
        key={item.href}
        href={item.href}
        className={`text-sm font-medium transition-colors hover:text-blue-300 ${
          item.active ? "text-white" : "text-gray-300"
        }`}
      >
        {item.label}
      </a>
    ))}
  </nav>
);

// Action buttons component
const ActionButtons = ({ onMobileMenuToggle }: { onMobileMenuToggle: () => void }) => (
  <div className="flex items-center gap-3">
    {/* Search button */}
    <button className="p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-slate-700">
      <Search size={20} />
    </button>

    {/* Messages button */}
    <button className="p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-slate-700">
      <MessageSquare size={20} />
    </button>

    {/* Language selector */}
    <div className="hidden sm:block">
      <LanguageSelector />
    </div>

    {/* User Menu */}
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
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo */}
            <Logo />

            {/* Center - Navigation */}
            <Navigation items={navigationItems} />

            {/* Right side - Actions */}
            <ActionButtons onMobileMenuToggle={handleMobileMenuToggle} />
          </div>
        </div>
      </header>

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
