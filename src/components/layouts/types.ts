export interface HeaderItem {
  key: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface HeaderCTA {
  label: string;
  onClick: () => void;
}

export interface HeaderActionButton {
  key: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  onClick?: () => void;
  badge?: boolean; // For notification badge
  show?: boolean; // Control visibility
}

export interface HeaderConfig {
  items: HeaderItem[];
  cta?: HeaderCTA;
  actionButtons?: HeaderActionButton[]; // Add action buttons config
  showSearch?: boolean;
  showMessage?: boolean;
  showLanguage?: boolean;
  showLanguageToggle?: boolean;
  showTheme?: boolean;
  showUserMenu?: boolean;
}

export interface BuildHeaderHelpers {
  go: (path: string) => void;
}

export type BuildHeaderFunction = (helpers: BuildHeaderHelpers) => HeaderConfig;
