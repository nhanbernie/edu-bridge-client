"use client";

import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EBButton from "@/components/common/EBButton";
import { Upload, X } from "lucide-react";
import { MediaType } from "@/services/user/types/media.type";

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaType: MediaType;
  onUpload: (file: File, title: string, type: MediaType) => Promise<void>;
  isUploading?: boolean;
}

const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  isOpen,
  onClose,
  mediaType,
  onUpload,
  isUploading = false,
}) => {
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isVideo = mediaType === "VideoIntro";
  const acceptTypes = isVideo
    ? "video/mp4,video/mpeg,video/quicktime,video/x-msvideo"
    : "image/jpeg,image/jpg,image/png,image/gif,image/webp";
  const maxSize = isVideo ? 50 : 5;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`Kích thước file không được vượt quá ${maxSize}MB`);
      return;
    }

    setSelectedFile(file);

    // Create preview for images
    if (!isVideo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !title.trim()) {
      alert("Vui lòng chọn file và nhập tiêu đề");
      return;
    }

    await onUpload(selectedFile, title.trim(), mediaType);
    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isVideo ? "Tải lên Video giới thiệu" : "Thêm Chứng chỉ"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={isVideo ? "VD: Video giới thiệu" : "VD: Chứng chỉ TESOL"}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              disabled={isUploading}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File <span className="text-red-500">*</span>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptTypes}
              onChange={handleFileSelect}
              className="hidden"
            />

            {!selectedFile ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors disabled:opacity-50"
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Click để chọn {isVideo ? "video" : "hình ảnh"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isVideo ? "MP4, MOV, AVI" : "JPG, PNG, GIF"} (tối đa {maxSize}MB)
                </p>
              </button>
            ) : (
              <div className="relative">
                {/* Preview */}
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {isVideo ? (
                    <video src={preview || ""} className="w-full h-full object-cover" />
                  ) : (
                    <img src={preview || ""} alt="Preview" className="w-full h-full object-cover" />
                  )}
                </div>

                {/* File Info */}
                <div className="mt-2 flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700 truncate">{selectedFile.name}</span>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="ml-2 p-1 hover:bg-gray-200 rounded"
                    disabled={isUploading}
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <EBButton
            variant="outline"
            onClick={handleClose}
            disabled={isUploading}
            className="flex-1"
          >
            Hủy
          </EBButton>
          <EBButton
            onClick={handleSubmit}
            disabled={!selectedFile || !title.trim() || isUploading}
            loading={isUploading}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
          >
            Tải lên
          </EBButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaUploadModal;
