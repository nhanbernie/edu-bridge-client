export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export const navigationItems: NavItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "Find Tutors", href: "/tutors" },
  { label: "Dashboard", href: "/dashboard" },
];

export const navigateMarketItems: NavItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "Packages", href: "/packages" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];
