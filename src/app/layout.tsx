import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "@/providers/AppProvider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://edubridge.edu.vn"),
  title: {
    default: "EduBridge - Kết nối học viên và gia sư chất lượng",
    template: "%s | EduBridge",
  },
  description:
    "Nền tảng kết nối học viên với gia sư chất lượng cao. Học tập hiệu quả với các khóa học được thiết kế riêng cho từng học viên. Hỗ trợ học trực tuyến và trực tiếp.",
  keywords: [
    "gia sư",
    "học viên",
    "giáo dục",
    "học tập",
    "khóa học",
    "trực tuyến",
    "online learning",
    "tutor",
    "student",
    "edubridge",
    "gia sư online",
    "học online",
    "dạy kèm",
    "kèm riêng",
    "giáo dục Việt Nam",
  ],
  authors: [{ name: "Nhan Bernie" }],
  creator: "EduBridge",
  publisher: "EduBridge",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: "/logo/edubridge-logo-only.png", sizes: "any" },
      { url: "/logo/edubridge-logo-only.png", type: "image/png" },
    ],
    shortcut: "/logo/edubridge-logo-only.png",
    apple: "/logo/edubridge-logo-only.png",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "EduBridge",
    title: "EduBridge - Kết nối học viên và gia sư chất lượng",
    description:
      "Nền tảng kết nối học viên với gia sư chất lượng cao. Học tập hiệu quả với các khóa học được thiết kế riêng cho từng học viên.",
    images: [
      {
        url: "/logo/edubridge-logo-text.png",
        width: 1200,
        height: 630,
        alt: "EduBridge - Nền tảng kết nối gia sư và học viên",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EduBridge - Kết nối học viên và gia sư chất lượng",
    description:
      "Nền tảng kết nối học viên với gia sư chất lượng cao. Học tập hiệu quả với các khóa học được thiết kế riêng.",
    images: ["/logo/edubridge-logo-text.png"],
    creator: "@edubridge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // other: "your-other-verification-code",
  },
  alternates: {
    canonical: "/",
    languages: {
      vi: "/vi",
      en: "/en",
    },
  },
  category: "education",
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
