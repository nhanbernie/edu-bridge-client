"use client";

import { useState } from "react";
import EBButton from "@/components/common/EBButton";

const TutorOnboardingPage = () => {
  const [formData, setFormData] = useState({
    educationLevel: "",
    yearsOfExperience: "",
    bio: "",
    subjects: "",
    languages: "",
    hourlyRate: "",
  });

  const handleSubmit = () => {
    console.log("Tutor onboarding:", {
      role: "TUTOR",
      tutor: {
        ...formData,
        yearsOfExperience: parseInt(formData.yearsOfExperience),
        hourlyRate: parseInt(formData.hourlyRate),
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-32">
      <div className="max-w-2xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Thiết lập hồ sơ gia sư</h1>
          <p className="text-muted-foreground">Tạo hồ sơ để học sinh có thể tìm thấy bạn</p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-lg">
          <div className="space-y-6">
            {/* Education Level */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Trình độ học vấn
              </label>
              <select
                value={formData.educationLevel}
                onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Chọn trình độ</option>
                <option value="High School">Tốt nghiệp THPT</option>
                <option value="Bachelor">Cử nhân</option>
                <option value="Master">Thạc sĩ</option>
                <option value="PhD">Tiến sĩ</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Số năm kinh nghiệm dạy học
              </label>
              <input
                type="number"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                placeholder="Ví dụ: 3"
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Giới thiệu bản thân
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Ví dụ: Gia sư toán lý với 3 năm kinh nghiệm dạy học..."
                rows={4}
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>

            {/* Subjects */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Môn học dạy</label>
              <input
                type="text"
                value={formData.subjects}
                onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                placeholder="Ví dụ: Toán, Vật lý, Hóa học"
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Ngôn ngữ giảng dạy
              </label>
              <input
                type="text"
                value={formData.languages}
                onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                placeholder="Ví dụ: Tiếng Việt, Tiếng Anh"
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Hourly Rate */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Học phí (VNĐ/giờ)
              </label>
              <input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                placeholder="Ví dụ: 200000"
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <EBButton
                onClick={handleSubmit}
                disabled={!formData.educationLevel || !formData.bio || !formData.subjects}
                className="w-full"
              >
                Hoàn thành thiết lập
              </EBButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorOnboardingPage;
