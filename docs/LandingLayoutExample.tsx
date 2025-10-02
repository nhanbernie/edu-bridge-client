import React from "react";
import EBLandingLayout from "../src/components/layouts/EBLandingLayout";

interface LandingLayoutExampleProps {
  children: React.ReactNode;
}

const LandingLayoutExample: React.FC<LandingLayoutExampleProps> = ({ children }) => {
  return (
    <EBLandingLayout
      buildHeader={({ go }) => ({
        items: [
          { key: 'home', label: 'Trang chủ', onClick: () => go('/') },
          { key: 'about', label: 'Giới thiệu', onClick: () => go('/about') },
          { key: 'courses', label: 'Khóa học', onClick: () => go('/courses') },
          { key: 'tutors', label: 'Gia sư', onClick: () => go('/tutors') },
          { key: 'contact', label: 'Liên hệ', onClick: () => go('/contact') },
        ],
        cta: { label: 'Bắt đầu ngay', onClick: () => go('/register') },
      })}
    >
      {children}
    </EBLandingLayout>
  );
};

export default LandingLayoutExample;
