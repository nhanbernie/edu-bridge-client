"use client";

import React, { useState } from "react";
import { MapPin, Calendar, Users, Search, Star } from "lucide-react";
import EBButton from "@/components/common/EBButton";

const HeroSection = () => {
  const [searchForm, setSearchForm] = useState({
    location: "",
    duration: "",
    people: "",
    price: "",
  });

  const destinations = [
    { name: "Eiffel Tower", location: "Paris", rating: 4.8, image: "/api/placeholder/300/200" },
    { name: "Taj Mahal", location: "India", rating: 4.9, image: "/api/placeholder/300/200" },
    { name: "Ha Long Bay", location: "Vietnam", rating: 4.7, image: "/api/placeholder/300/200" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 relative overflow-hidden pt-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Enjoy The <span className="text-emerald-600">Trip</span>
                  <br />
                  With <span className="text-emerald-600">Good</span>
                  <br />
                  Moments.
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  Khám phá những điểm đến tuyệt vời và tạo ra những kỷ niệm đáng nhớ cùng với dịch
                  vụ du lịch chất lượng cao của chúng tôi.
                </p>
              </div>

              {/* Search Form */}
              <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      Location
                    </label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={searchForm.location}
                      onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })}
                    >
                      <option value="">Chọn địa điểm</option>
                      <option value="paris">Paris</option>
                      <option value="india">India</option>
                      <option value="vietnam">Vietnam</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      Duration
                    </label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={searchForm.duration}
                      onChange={(e) => setSearchForm({ ...searchForm, duration: e.target.value })}
                    >
                      <option value="">Thời gian</option>
                      <option value="3-days">3 ngày</option>
                      <option value="7-days">7 ngày</option>
                      <option value="14-days">14 ngày</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-600" />
                      People
                    </label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={searchForm.people}
                      onChange={(e) => setSearchForm({ ...searchForm, people: e.target.value })}
                    >
                      <option value="">Số người</option>
                      <option value="1">1 người</option>
                      <option value="2">2 người</option>
                      <option value="4">4 người</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Price</label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={searchForm.price}
                      onChange={(e) => setSearchForm({ ...searchForm, price: e.target.value })}
                    >
                      <option value="">Giá tiền</option>
                      <option value="budget">Tiết kiệm</option>
                      <option value="mid">Trung bình</option>
                      <option value="luxury">Cao cấp</option>
                    </select>
                  </div>
                </div>

                <EBButton
                  size="lg"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  icon={Search}
                  iconPosition="left"
                >
                  Search Now
                </EBButton>
              </div>
            </div>

            {/* Right Content - Destinations */}
            <div className="space-y-6">
              <div className="grid gap-4">
                {destinations.map((dest, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center p-4 gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{dest.name}</h3>
                        <p className="text-gray-600 text-sm">{dest.location}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{dest.rating}</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Traveler Image */}
              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl p-8 text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                      <Users className="w-10 h-10 text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    A New Way To Discover The World.
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    Khám phá thế giới với cách thức hoàn toàn mới
                  </p>
                  <EBButton
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-emerald-600"
                  >
                    Explore Now
                  </EBButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
