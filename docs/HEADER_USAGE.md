# EBHeader Customization Guide

## Overview

`EBHeader` và `EBMainLayout` đã được customize để cho phép truyền action buttons tùy chỉnh từ constants, giúp dễ dàng tái sử dụng và maintain.

## Basic Usage

### 1. Sử dụng Default Action Buttons

Mặc định, header sẽ hiển thị: Search, Message, Language, Theme Toggle, và User Menu.

```tsx
import { EBMainLayout } from "@/components/layouts";

export default function MyPage() {
  return (
    <EBMainLayout>
      <div>Your content here</div>
    </EBMainLayout>
  );
}
```

### 2. Tùy chỉnh Action Buttons

Truyền custom action buttons từ constants hoặc tạo mới:

```tsx
import { EBMainLayout } from "@/components/layouts";
import { Bell, Settings } from "lucide-react";
import type { HeaderActionButton } from "@/components/layouts";

// Tạo custom action buttons
const customActionButtons: HeaderActionButton[] = [
  {
    key: "notifications",
    icon: Bell,
    badge: true, // Hiển thị red dot badge
    onClick: () => console.log("Open notifications"),
    show: true,
  },
  {
    key: "settings",
    icon: Settings,
    onClick: () => console.log("Open settings"),
    show: true,
  },
];

export default function MyPage() {
  return (
    <EBMainLayout actionButtons={customActionButtons}>
      <div>Your content here</div>
    </EBMainLayout>
  );
}
```

### 3. Sử dụng Pre-defined Constants

Sử dụng action buttons đã định nghĩa trong `navigate.constant.tsx`:

```tsx
import { EBMainLayout } from "@/components/layouts";
import { defaultHeaderActionButtons } from "@/constants/navigate.constant";

export default function MyPage() {
  return (
    <EBMainLayout actionButtons={defaultHeaderActionButtons}>
      <div>Your content here</div>
    </EBMainLayout>
  );
}
```

### 4. Ẩn Theme Toggle hoặc User Menu

```tsx
import { EBMainLayout } from "@/components/layouts";

export default function MyPage() {
  return (
    <EBMainLayout
      showTheme={false} // Ẩn theme toggle
      showUserMenu={false} // Ẩn user menu
    >
      <div>Your content here</div>
    </EBMainLayout>
  );
}
```

### 5. Kết hợp với BuildHeader Function

```tsx
import { EBMainLayout } from "@/components/layouts";
import type { BuildHeaderFunction, HeaderActionButton } from "@/components/layouts";
import { Bell } from "lucide-react";

const customActions: HeaderActionButton[] = [
  {
    key: "bell",
    icon: Bell,
    badge: true,
    show: true,
  },
];

const buildHeader: BuildHeaderFunction = ({ go }) => ({
  items: [
    { key: "home", label: "Home", href: "/" },
    { key: "about", label: "About", onClick: () => go("/about") },
  ],
  cta: {
    label: "Get Started",
    onClick: () => go("/register"),
  },
});

export default function MyPage() {
  return (
    <EBMainLayout buildHeader={buildHeader} actionButtons={customActions}>
      <div>Your content here</div>
    </EBMainLayout>
  );
}
```

## Creating Custom Action Buttons in Constants

Trong `src/common/constants/navigate.constant.tsx`:

```tsx
import { Bell, Search, MessageSquare } from "lucide-react";
import type { HeaderActionButton } from "@/components/layouts/types";

// For Student Layout
export const studentHeaderActionButtons: HeaderActionButton[] = [
  {
    key: "search",
    icon: Search,
    show: true,
  },
  {
    key: "notifications",
    icon: Bell,
    badge: true,
    onClick: () => {
      // Handle notification click
    },
    show: true,
  },
];

// For Tutor Layout
export const tutorHeaderActionButtons: HeaderActionButton[] = [
  {
    key: "messages",
    icon: MessageSquare,
    badge: true,
    show: true,
  },
  {
    key: "notifications",
    icon: Bell,
    badge: true,
    show: true,
  },
];
```

## HeaderActionButton Interface

```typescript
interface HeaderActionButton {
  key: string; // Unique identifier
  icon: React.ComponentType<{
    // Lucide icon component
    size?: number;
    className?: string;
  }>;
  onClick?: () => void; // Optional click handler
  badge?: boolean; // Show red dot badge (for notifications)
  show?: boolean; // Control visibility (default: true)
}
```

## Props Reference

### EBMainLayout Props

```typescript
interface MainLayoutProps {
  children: React.ReactNode;
  footer?: boolean;
  buildHeader?: BuildHeaderFunction;
  actionButtons?: HeaderActionButton[]; // Custom action buttons
  showTheme?: boolean; // Show theme toggle (default: true)
  showUserMenu?: boolean; // Show user menu (default: true)
}
```

### EBHeader Props

```typescript
interface HeaderProps {
  actionButtons?: HeaderActionButton[];
  showTheme?: boolean;
  showUserMenu?: boolean;
  headerConfig?: HeaderConfig;
}
```

## Best Practices

1. **Define constants for reusability**: Tạo action buttons trong `navigate.constant.tsx` cho các layout khác nhau (student, tutor, admin).

2. **Use descriptive keys**: Sử dụng keys có ý nghĩa như `"notifications"`, `"messages"`, `"search"`.

3. **Handle onClick properly**: Nếu action button cần xử lý logic, define onClick handler trong constants hoặc pass từ parent.

4. **Badge for notifications**: Sử dụng `badge: true` cho các buttons liên quan đến notifications để hiển thị red dot.

5. **Control visibility**: Sử dụng `show: false` để ẩn action buttons không cần thiết thay vì tạo mảng mới.

## Examples in Real Projects

### Student Layout with Notifications

```tsx
// src/app/(authenticated)/student/layout.tsx
import { EBMainLayout } from "@/components/layouts";
import { studentHeaderActionButtons } from "@/constants/navigate.constant";

export default function StudentLayout({ children }) {
  return <EBMainLayout actionButtons={studentHeaderActionButtons}>{children}</EBMainLayout>;
}
```

### Marketing Page without User Menu

```tsx
// src/app/marketing/page.tsx
import { EBMainLayout } from "@/components/layouts";
import { Search, Globe } from "lucide-react";

const marketingActions = [
  { key: "search", icon: Search, show: true },
  { key: "language", icon: Globe, show: true },
];

export default function MarketingPage() {
  return (
    <EBMainLayout
      actionButtons={marketingActions}
      showUserMenu={false} // Hide user menu for public page
    >
      <div>Marketing content</div>
    </EBMainLayout>
  );
}
```
