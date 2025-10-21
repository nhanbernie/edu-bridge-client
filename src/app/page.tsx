"use client";

import React from "react";
import MarketingFeature from "@/features/marketing/MarketingFeature";
import { SEOPage, generateOrganizationSchema, generateFAQSchema } from "@/components/seo";
import { NextIntlClientProvider } from "next-intl";
import { DEFAULT_LOCALE } from "@/i18n/config";

export default function MainPage() {
  // Load messages for default locale
  const [messages, setMessages] = React.useState({});
  const [messagesLoaded, setMessagesLoaded] = React.useState(false);

  React.useEffect(() => {
    const loadMessages = async () => {
      try {
        const common = await import(`@/i18n/locales/${DEFAULT_LOCALE}/common.json`);
        const tutor = await import(`@/i18n/locales/${DEFAULT_LOCALE}/tutor.json`);
        const auth = await import(`@/i18n/locales/${DEFAULT_LOCALE}/auth.json`);
        const marketing = await import(`@/i18n/locales/${DEFAULT_LOCALE}/marketing.json`);

        setMessages({
          common: common.default,
          tutor: tutor.default,
          auth: auth.default,
          marketing: marketing.default,
        });
        setMessagesLoaded(true);
      } catch (error) {
        setMessagesLoaded(true);
      }
    };

    loadMessages();
  }, []);

  if (!messagesLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // SEO Data
  const organizationData = {
    name: "EduBridge",
    url: "https://edubridge.com",
    logo: "https://edubridge.com/logo/edubridge-logo-text.png",
    description:
      "Nền tảng kết nối học viên với gia sư chất lượng cao. Học tập hiệu quả với các khóa học được thiết kế riêng cho từng học viên.",
    address: {
      streetAddress: "150 Nguyễn Thị Minh Khai",
      addressLocality: "Thành phố Quy Nhơn",
      addressRegion: "Tỉnh Bình Định",
      postalCode: "590000",
      addressCountry: "VN",
    },
    contactPoint: {
      telephone: "+84-375-613-793",
      contactType: "customer service",
      email: "support@edubridge.com",
    },
    sameAs: ["https://www.facebook.com/edubridge.sv/", "https://www.tiktok.com/@edubridge.tt"],
  };

  const faqData = [
    {
      question: "EduBridge là gì?",
      answer:
        "EduBridge là nền tảng kết nối học viên với gia sư chất lượng cao, cung cấp các khóa học được thiết kế riêng cho từng học viên.",
    },
    {
      question: "Làm thế nào để tìm gia sư phù hợp?",
      answer:
        "Bạn có thể tìm kiếm gia sư theo môn học, trình độ, thời gian rảnh và đọc đánh giá từ các học viên khác.",
    },
    {
      question: "Chi phí học tập như thế nào?",
      answer:
        "Chi phí học tập được thiết lập bởi từng gia sư, thường dao động từ 100,000đ - 500,000đ/giờ tùy theo môn học và trình độ.",
    },
    {
      question: "Có thể học trực tuyến không?",
      answer:
        "Có, EduBridge hỗ trợ cả học trực tiếp và học trực tuyến thông qua video call chất lượng cao.",
    },
  ];

  const structuredData = [generateOrganizationSchema(organizationData), generateFAQSchema(faqData)];

  return (
    <NextIntlClientProvider locale={DEFAULT_LOCALE} messages={messages}>
      <SEOPage
        title="EduBridge - Kết nối học viên và gia sư chất lượng"
        description="Nền tảng kết nối học viên với gia sư chất lượng cao. Học tập hiệu quả với các khóa học được thiết kế riêng cho từng học viên."
        keywords="gia sư, học viên, giáo dục, học tập, khóa học, trực tuyến, online learning, tutor, student, edubridge"
        image="/logo/edubridge-logo-text.png"
        url="/"
        type="website"
        locale="vi_VN"
        alternateLocales={[
          { locale: "en", url: "https://edubridge.com/en" },
          { locale: "vi", url: "https://edubridge.com/vi" },
        ]}
        structuredData={structuredData}
      >
        <MarketingFeature />
      </SEOPage>
    </NextIntlClientProvider>
  );
}
