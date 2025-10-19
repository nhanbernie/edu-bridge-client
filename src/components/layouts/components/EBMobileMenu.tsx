import React from "react";
import { X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavItem[];
}

const EBMobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navigationItems }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />

      {/* Mobile Menu */}
      <div className="fixed top-0 right-0 h-full w-64 bg-card border-l border-border z-50 md:hidden transform transition-transform">
        {/* EBHeader */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="text-foreground font-semibold">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
          >
            <X size={20} />
          </button>
        </div>

        {/* EBNavigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => (
              <li key={`${item.href}-${index}`}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Language Selector */}
        <div className="p-4 border-t border-border">{/* <EBLanguageSelector /> */}</div>
      </div>
    </>
  );
};

export default EBMobileMenu;
