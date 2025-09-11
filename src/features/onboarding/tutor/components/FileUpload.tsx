import React, { useCallback, useState } from "react";
import { cn } from "@/utils/cn";

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  acceptedFileTypes?: string;
  maxFileSize?: number; // in MB
  multiple?: boolean;
  title: string;
  description: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedFileTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  maxFileSize = 5,
  multiple = true,
  title,
  description,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (file.size > maxFileSize * 1024 * 1024) {
        return `${file.name}: Kích thước file vượt quá ${maxFileSize}MB`;
      }
      return null;
    },
    [maxFileSize]
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const fileArray = Array.from(files);
      const newErrors: string[] = [];
      const validFiles: File[] = [];

      fileArray.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          newErrors.push(error);
        } else {
          validFiles.push(file);
        }
      });

      setErrors(newErrors);

      if (validFiles.length > 0) {
        const updatedFiles = multiple ? [...selectedFiles, ...validFiles] : validFiles;
        setSelectedFiles(updatedFiles);
        onFileSelect(updatedFiles);
      }
    },
    [selectedFiles, multiple, onFileSelect, validateFile]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onFileSelect(updatedFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      </div>

      {/* Upload Area */}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-colors",
          dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple={multiple}
          accept={acceptedFileTypes}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500">
                Nhấp để chọn file
              </span>{" "}
              hoặc kéo thả file vào đây
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Hỗ trợ: {acceptedFileTypes} (tối đa {maxFileSize}MB)
            </p>
          </div>
        </div>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">
            File đã chọn ({selectedFiles.length})
          </h4>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
