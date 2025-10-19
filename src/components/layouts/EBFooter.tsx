"use client";

import React, { useState } from "react";

const EBFooter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-muted/30 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-6 sm:p-8 mb-8 sm:mb-12 lg:mb-16 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/5 rounded-full"></div>

          <div className="relative z-10 text-center space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              Nhận Thông Tin Gia Sư Mới Nhất
            </h3>
            <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto px-4">
              Đăng ký để nhận thông báo về gia sư chất lượng, khóa học mới và các ưu đãi đặc biệt từ
              EduBridge
            </p>

            {/* Email Subscription Form */}
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto px-4">
              <div className="flex flex-col sm:flex-row bg-white rounded-2xl sm:rounded-full p-2 shadow-lg gap-2 sm:gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  className="flex-1 px-4 py-2 sm:py-2 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none text-sm sm:text-base"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 sm:py-2 rounded-xl sm:rounded-full font-medium transition-colors text-sm sm:text-base"
                >
                  Đăng Ký
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* EBFooter Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-primary text-base sm:text-lg font-bold">EduBridge</h4>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Nền tảng kết nối gia sư và học viên hàng đầu Việt Nam. Chúng tôi cam kết mang đến trải
              nghiệm học tập chất lượng với đội ngũ gia sư được xác thực.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-2 sm:space-x-3">
              <a
                href="https://www.facebook.com/edubridge.sv/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@edubridge.tt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-all duration-300 hover:scale-110"
                aria-label="TikTok"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* For Students */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-foreground text-sm sm:text-base font-semibold">
              Dành Cho Học Viên
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-muted-foreground text-xs sm:text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Tìm gia sư
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Khóa học trực tuyến
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Đánh giá gia sư
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Thanh toán
                </a>
              </li>
            </ul>
          </div>

          {/* For Tutors */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-foreground text-sm sm:text-base font-semibold">Dành Cho Gia Sư</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-muted-foreground text-xs sm:text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Đăng ký dạy học
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Hướng dẫn sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Chính sách thu nhập
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Hỗ trợ gia sư
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-foreground text-sm sm:text-base font-semibold">Hỗ Trợ</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-muted-foreground text-xs sm:text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-6 sm:pt-8">
          <p className="text-center text-muted-foreground text-xs sm:text-sm">
            © 2024 EduBridge. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default EBFooter;
