import React, { useState } from "react";
import EBButton from "@/components/common/EBButton";
import FileUpload from "./FileUpload";

interface TutorStep2Props {
  onSubmit: (files: File[]) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const TutorStep2: React.FC<TutorStep2Props> = ({ onSubmit, onBack, isLoading = false }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleSubmit = () => {
    onSubmit(selectedFiles);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const canSubmit = selectedFiles.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tải lên hồ sơ</h2>
        <p className="text-gray-600">
          Vui lòng tải lên các tài liệu chứng minh trình độ và kinh nghiệm của bạn
        </p>
      </div>

      {/* File Upload Sections */}
      <div className="space-y-8">
        {/* Academic Credentials */}
        <FileUpload
          title="Bằng cấp và chứng chỉ"
          description="Tải lên bằng tốt nghiệp, chứng chỉ, hoặc các tài liệu chứng minh trình độ học vấn"
          onFileSelect={handleFileSelect}
          acceptedFileTypes=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          maxFileSize={5}
          multiple={true}
        />

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Lưu ý quan trọng</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Tất cả tài liệu sẽ được xem xét để xác minh tính xác thực</li>
                  <li>Chỉ tải lên các file có định dạng được hỗ trợ</li>
                  <li>Kích thước file tối đa là 5MB</li>
                  <li>Thông tin cá nhân trong tài liệu sẽ được bảo mật tuyệt đối</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t gap-5">
        <EBButton
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          className="flex-1 bg-white font-semibold py-4 border-1 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Quay lại
        </EBButton>

        <EBButton
          type="button"
          variant="default"
          size="lg"
          loading={isLoading}
          disabled={!canSubmit}
          onClick={handleSubmit}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Hoàn tất đăng ký
        </EBButton>
      </div>
    </div>
  );
};

export default TutorStep2;
