"use client";

import React from "react";
import { Play, Upload } from "lucide-react";

interface EBVideoUploadPlaceholderProps {
  onClick: () => void;
}

const EBVideoUploadPlaceholder: React.FC<EBVideoUploadPlaceholderProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative w-full aspect-video bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-emerald-500 hover:from-emerald-50 hover:via-teal-50 hover:to-emerald-50 transition-all duration-300 group overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative text-center z-10">
        {/* Play Button Circle */}
        <div className="relative mx-auto mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
            <Play className="w-10 h-10 text-white fill-white ml-1" />
          </div>
          {/* Pulse Effect */}
          <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-30 group-hover:scale-125 transition-all duration-700" />
        </div>

        {/* Text */}
        <h3 className="text-gray-700 text-base font-semibold mb-2 group-hover:text-emerald-700 transition-colors">
          Chưa có video giới thiệu
        </h3>
        <p className="text-gray-500 text-xs mb-4">
          <Upload className="w-3 h-3 inline mr-1" />
          MP4, MOV, AVI (tối đa 50MB)
        </p>

        {/* Upload Hint */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-sm text-gray-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-300">
          <Upload className="w-4 h-4" />
          <span className="font-medium">Click để tải lên</span>
        </div>
      </div>
    </div>
  );
};

export default EBVideoUploadPlaceholder;
