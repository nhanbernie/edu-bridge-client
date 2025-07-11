# EduBridge

EduBridge is a web project built with Next.js, TypeScript, and Redux Toolkit, providing a modern learning platform with authentication, multilingual support, and efficient state management.

## Main Features

- Login, registration, forgot password
- State management with Redux Toolkit
- Multilingual support (i18n)
- Modular code organization (features, components, hooks, services, ...)
- Performance optimization with Next.js

## Folder Structure

```
edubridge/
├── public/                # Static assets (images, icons, ...)
├── src/
│   ├── app/               # Next.js configuration (layout, page, css)
│   ├── common/            # Shared constants, enums, types
│   ├── components/        # UI components, layout, modal, form, ...
│   ├── contexts/          # React Contexts (AuthContext, ...)
│   ├── features/          # Main features (auth, home, ...)
│   ├── hooks/             # Custom hooks
│   ├── i18n/              # Internationalization
│   ├── providers/         # AppProvider, other providers
│   ├── redux/             # Store, slice, selector, ...
│   ├── services/          # API communication
│   └── utils/             # Shared utilities
├── .env                   # Environment variables
├── package.json           # Package info and scripts
├── tsconfig.json          # TypeScript configuration
└── ...
```

## Installation

1. **Clone the project:**
   ```bash
   git clone <repo-url>
   cd edubridge
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a `.env` file and configure environment variables**

4. **Run the project:**
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Run production build
- `npm run lint`: Lint code with ESLint

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [ESLint](https://eslint.org/)
- [PostCSS](https://postcss.org/)

## Contribution

Pull requests and issues are always welcome!
CODE WITH NHANBERNIE ❤️

## License

MIT
