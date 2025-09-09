"use client";

import { useState } from "react";
import EBButton from "@/components/common/EBButton";

const StudentOnboardingPage = () => {
  const [formData, setFormData] = useState({
    grade: "",
    learningGoal: "",
  });

  const handleSubmit = () => {
    console.log("Student onboarding:", {
      role: "STUDENT",
      student: formData,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-32">
      <div className="max-w-2xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Thiết lập hồ sơ học sinh</h1>
          <p className="text-muted-foreground">Giúp chúng tôi hiểu về mục tiêu học tập của bạn</p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-lg">
          <div className="space-y-6">
            {/* Grade Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Lớp học hiện tại
              </label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Chọn lớp</option>
                <option value="6">Lớp 6</option>
                <option value="7">Lớp 7</option>
                <option value="8">Lớp 8</option>
                <option value="9">Lớp 9</option>
                <option value="10">Lớp 10</option>
                <option value="11">Lớp 11</option>
                <option value="12">Lớp 12</option>
              </select>
            </div>

            {/* Learning Goal */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mục tiêu học tập
              </label>
              <textarea
                value={formData.learningGoal}
                onChange={(e) => setFormData({ ...formData, learningGoal: e.target.value })}
                placeholder="Ví dụ: Cải thiện điểm toán và lý, chuẩn bị thi đại học..."
                rows={4}
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <EBButton
                onClick={handleSubmit}
                disabled={!formData.grade || !formData.learningGoal}
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

export default StudentOnboardingPage;
