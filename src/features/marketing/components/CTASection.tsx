"use client";

import React from "react";
import { Star } from "lucide-react";

const CTASection = () => {
  const testimonials = [
    {
      name: "Nguyễn Minh Anh",
      rating: 5,
      comment:
        "Tôi đã tìm được gia sư Toán rất giỏi qua nền tảng này. Con tôi đã cải thiện điểm số đáng kể chỉ sau 2 tháng học.",
      avatar: "MA",
    },
  ];

  return (
    <div className="bg-muted/30">
      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Customer Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-accent to-primary rounded-3xl p-8 h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-accent">😊</span>
                    </div>
                  </div>
                  <p className="text-white font-medium">Happy Customer</p>
                </div>
              </div>
            </div>

            {/* Right - Testimonials */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-4xl font-bold text-foreground leading-tight">
                  Phản Hồi Từ
                  <br />
                  Học Viên Của Chúng Tôi.
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nghe những chia sẻ từ học viên và phụ huynh đã có trải nghiệm tuyệt vời với các
                  giảng viên và gia sư chất lượng cao của chúng tôi.
                </p>
              </div>

              {/* Testimonial Card */}
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-semibold">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-accent fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{testimonial.comment}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Customer Avatars */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {["JD", "SM", "AL", "MK"].map((initials, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center border-2 border-background"
                    >
                      <span className="text-white text-xs font-semibold">{initials}</span>
                    </div>
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">+1000 học viên hài lòng</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTASection;
