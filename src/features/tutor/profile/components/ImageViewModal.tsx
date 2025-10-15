"use client";

import React from "react";
import { X } from "lucide-react";

interface ImageViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

const ImageViewModal: React.FC<ImageViewModalProps> = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black" style={{ margin: 0, padding: 0 }}>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[10000] w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 group border-0"
        aria-label="Đóng"
        style={{ border: "none", outline: "none" }}
      >
        <X className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Image Container - Click to close */}
      <div
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
        onClick={onClose}
        style={{ margin: 0, padding: 0 }}
      >
        <img
          src={imageUrl}
          alt="Certificate"
          className="w-full h-full object-contain"
          style={{ maxWidth: "100vw", maxHeight: "100vh", display: "block" }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default ImageViewModal;
