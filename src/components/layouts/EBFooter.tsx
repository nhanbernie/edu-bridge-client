"use client";

import React, { useState } from "react";
import { Facebook } from "lucide-react";

const EBFooter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-muted/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 mb-16 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/5 rounded-full"></div>

          <div className="relative z-10 text-center space-y-6">
            <h3 className="text-3xl font-bold text-white">Nhận Thông Tin Gia Sư Mới Nhất</h3>
            <p className="text-white/90 max-w-2xl mx-auto">
              Đăng ký để nhận thông báo về gia sư chất lượng, khóa học mới và các ưu đãi đặc biệt từ
              EduBridge
            </p>

            {/* Email Subscription Form */}
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex bg-white rounded-full p-2 shadow-lg">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  className="flex-1 px-4 py-2 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full font-medium transition-colors"
                >
                  Đăng Ký
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* EBFooter Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="text-primary text-lg font-bold">EduBridge</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nền tảng kết nối gia sư và học viên hàng đầu Việt Nam. Chúng tôi cam kết mang đến trải
              nghiệm học tập chất lượng với đội ngũ gia sư được xác thực.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/edubridge.sv/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@edubridge.tt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-all duration-300 hover:scale-110"
                aria-label="TikTok"
              >
                <svg
                  className="w-5 h-5"
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
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Dành Cho Học Viên</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
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
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Dành Cho Gia Sư</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
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
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Hỗ Trợ</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
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
        <div className="border-t border-border pt-8">
          <p className="text-center text-muted-foreground text-sm">
            © 2024 EduBridge. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default EBFooter;
