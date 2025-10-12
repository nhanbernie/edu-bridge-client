"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Edit } from "lucide-react";

interface MediaCardProps {
  title: string;
  imageUrl: string;
  onView: () => void;
  onEdit?: () => void; // Optional: only for tutors to edit
  showEdit?: boolean; // Control whether to show edit button
}

const MediaCard: React.FC<MediaCardProps> = ({
  title,
  imageUrl,
  onView,
  onEdit,
  showEdit = false,
}) => {
  return (
    <div className="relative aspect-[3/2] rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-lg transition-shadow">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Edit Button - Top Right (Only for tutors) */}
      {showEdit && onEdit && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-all duration-200 hover:scale-110"
          title="Chỉnh sửa"
        >
          <Edit className="w-4 h-4 text-gray-700" />
        </button>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <h3 className="text-white text-base font-bold mb-2 line-clamp-2">{title}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView();
          }}
          className="flex items-center text-white text-sm font-medium hover:text-gray-200 transition-colors w-fit"
        >
          Xem chi tiết
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default MediaCard;
