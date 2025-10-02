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

export interface HeaderConfig {
  items: HeaderItem[];
  cta?: HeaderCTA;
}

export interface BuildHeaderHelpers {
  go: (path: string) => void;
}

export type BuildHeaderFunction = (helpers: BuildHeaderHelpers) => HeaderConfig;
