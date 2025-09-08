import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "@/providers/AppProvider";

export const metadata: Metadata = {
  title: "Edu Bridge",
  description: "Wellcome to education bride",
  icons: { icon: "/edubridge.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
