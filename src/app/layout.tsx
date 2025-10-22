import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "@/providers/AppProvider";

export const metadata: Metadata = {
  title: "Edu Bridge",
  description: "Wellcome to education bride",
  icons: { icon: "/logo/edubridge-logo-only.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (theme === 'dark') document.documentElement.classList.add('dark');
              } catch {}
            `,
          }}
        />
      </head>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
