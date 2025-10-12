import React from "react";
import { Star } from "lucide-react";

const EmptyFeedback: React.FC = () => {
  return (
    <div className="text-center py-12">
      <Star className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có đánh giá nào</h3>
      <p className="text-gray-500">Gia sư này chưa nhận được đánh giá nào từ học viên.</p>
    </div>
  );
};

export default EmptyFeedback;
