"use client";

import React, { useState } from "react";
import { Star, Mail } from "lucide-react";
import EBButton from "@/components/common/EBButton";

const CTASection = () => {
  const [email, setEmail] = useState("");

  const testimonials = [
    {
      name: "Kevin Andrew",
      rating: 5,
      comment:
        "Amazing experience! The service was exceptional and the destinations were breathtaking. Highly recommend for anyone looking for adventure.",
      avatar: "KA",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Customer Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-orange-500">😊</span>
                    </div>
                  </div>
                  <p className="text-white font-medium">Happy Customer</p>
                </div>
              </div>
            </div>

            {/* Right - Testimonials */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                  What Our
                  <br />
                  Happy Customers Says.
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Hear from our satisfied customers who have experienced amazing journeys with us.
                  Their stories inspire us to continue providing exceptional service.
                </p>
              </div>

              {/* Testimonial Card */}
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold">{testimonial.avatar}</span>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{testimonial.comment}</p>
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
                      className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center border-2 border-white"
                    >
                      <span className="text-white text-xs font-semibold">{initials}</span>
                    </div>
                  ))}
                </div>
                <span className="text-gray-600 text-sm">+1000 happy customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl lg:text-4xl font-bold text-white">
                Subscribe for Our Food Update
              </h3>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Get the latest updates on new destinations, special offers, and travel tips
                delivered straight to your inbox.
              </p>
            </div>

            {/* Email Subscription Form */}
            <div className="max-w-md mx-auto">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email here"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-white/50 focus:outline-none"
                  />
                </div>
                <EBButton
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-gray-50 font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Subscribe
                </EBButton>
              </div>
            </div>

            {/* Footer Preview */}
            <div className="pt-12 border-t border-white/20">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white/80 text-sm">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Travel</h4>
                    <p>Your trusted travel companion</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">About Us</h4>
                    <p>Learn more about our story</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Services</h4>
                    <p>Explore our offerings</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Company</h4>
                    <p>Join our mission</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20 text-center">
                  <p className="text-white/60 text-sm">
                    © 2024 Travel Company. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTASection;
