# Internationalization (i18n) Usage Guide

## Overview

This project uses `react-i18next` for internationalization with support for Vietnamese (vi) and English (en).

## Setup

The i18n configuration is already set up in `src/i18n/index.ts` and automatically detects the user's language preference from:
1. localStorage (saved preference)
2. Browser language
3. Fallback to English

## Basic Usage

### 1. Using the useTranslation Hook

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('auth.login.subtitle')}</p>
      
      {/* Change language programmatically */}
      <button onClick={() => i18n.changeLanguage('vi')}>
        Tiếng Việt
      </button>
      <button onClick={() => i18n.changeLanguage('en')}>
        English
      </button>
    </div>
  );
}
```

### 2. Using the LanguageSelector Component

```tsx
import LanguageSelector from '@/components/common/LanguageSelector';

function Header() {
  return (
    <header>
      <nav>
        {/* Compact variant (default) */}
        <LanguageSelector />
        
        {/* Icon only variant */}
        <LanguageSelector variant="icon-only" />
        
        {/* With custom styling */}
        <LanguageSelector 
          variant="compact" 
          className="border-2 border-blue-500" 
        />
      </nav>
    </header>
  );
}
```

### 3. Translation Keys Structure

Translation keys are organized in nested objects:

```json
{
  "common": {
    "loading": "Loading...",
    "error": "An error occurred",
    "success": "Success"
  },
  "auth": {
    "login": {
      "title": "Login",
      "email": "Email",
      "password": "Password"
    }
  }
}
```

Access them using dot notation: `t('auth.login.title')`

### 4. Interpolation

```tsx
// Translation file
{
  "welcome": "Welcome, {{name}}!",
  "itemCount": "You have {{count}} items"
}

// Component
function Welcome({ userName, itemCount }) {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome', { name: userName })}</h1>
      <p>{t('itemCount', { count: itemCount })}</p>
    </div>
  );
}
```

### 5. Pluralization

```tsx
// Translation file
{
  "item_one": "{{count}} item",
  "item_other": "{{count}} items"
}

// Component
function ItemList({ count }) {
  const { t } = useTranslation();
  
  return <p>{t('item', { count })}</p>;
}
```

## Adding New Languages

1. Create a new translation file in `src/i18n/locales/[language-code].json`
2. Add the language to the `languages` array in `src/components/common/LanguageSelector.tsx`
3. Import and add to resources in `src/i18n/index.ts`

## Best Practices

1. **Organize keys logically**: Group related translations under common namespaces
2. **Use descriptive keys**: `auth.login.emailPlaceholder` instead of `emailPh`
3. **Keep translations consistent**: Use the same tone and style across languages
4. **Test with longer text**: Some languages require more space than others
5. **Use interpolation for dynamic content**: Don't concatenate strings

## Common Translation Keys

- `common.loading` - Loading states
- `common.error` - Error messages
- `common.success` - Success messages
- `common.cancel` - Cancel buttons
- `common.save` - Save buttons
- `auth.login.*` - Login form
- `auth.register.*` - Registration form

## Language Detection Priority

1. **Saved preference** (localStorage: 'user-language')
2. **Browser language** (navigator.language)
3. **Fallback** (English)

The language preference is automatically saved when changed via the LanguageSelector component.
