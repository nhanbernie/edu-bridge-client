"use client";

import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-emerald-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl p-8 mb-16 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/5 rounded-full"></div>

          <div className="relative z-10 text-center space-y-6">
            <h3 className="text-3xl font-bold text-white">Đăng Ký Nhận Thông Tin Cập Nhật</h3>
            <p className="text-emerald-100 max-w-2xl mx-auto">
              Có nhiều biến thể của các đoạn văn Lorem Ipsum có sẵn, nhưng phần lớn đã bị thay đổi
            </p>

            {/* Email Subscription Form */}
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex bg-white rounded-full p-2 shadow-lg">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  className="flex-1 px-4 py-2 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
                >
                  Đăng Ký
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="text-emerald-600 text-lg font-bold">EduBridge</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem Ipsum chỉ đơn giản là văn bản giả của ngành in ấn và sắp chữ. Lorem Ipsum đã trở
              thành tiêu chuẩn của ngành
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"
              >
                <span className="text-sm font-bold">in</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"
              >
                <span className="text-sm font-bold">f</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"
              >
                <span className="text-sm font-bold">t</span>
              </a>
            </div>
          </div>

          {/* About Us */}
          <div className="space-y-4">
            <h4 className="text-gray-800 font-semibold">Về Chúng Tôi</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Chúng tôi là ai?
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Tính năng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Tin tức mới nhất
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Service */}
          <div className="space-y-4">
            <h4 className="text-gray-800 font-semibold">Dịch Vụ</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Hỗ trợ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Thanh toán
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-gray-800 font-semibold">Công Ty</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <a href="#" className="hover:text-emerald-600 transition-colors">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition-colors">
                  Nghề nghiệp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition-colors">
                  Liên hệ chúng tôi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-emerald-200 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 EduBridge. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
