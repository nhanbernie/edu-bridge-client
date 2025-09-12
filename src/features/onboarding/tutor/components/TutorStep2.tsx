import React, { useState } from "react";
import EBButton from "@/components/common/EBButton";
import { useDocumentUpload, DocumentUpload } from "../hooks/useDocumentUpload";
import { toast } from "sonner";

interface TutorStep2Props {
  onSubmit: (uploadResults: any[]) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const documentTypes = [
  { value: "CCCD", label: "Căn cước công dân" },
  { value: "CERTIFICATE", label: "Chứng chỉ/Bằng cấp" },
  { value: "SELFIE", label: "Ảnh selfie với CCCD" },
  { value: "STUDENT_CARD", label: "Thẻ sinh viên" },
  { value: "TRANSCRIPT", label: "Bảng điểm" },
  { value: "ENROLLMENT_CONFIRMATION", label: "Giấy xác nhận đang theo học" },
];

const getDocumentDescription = (docType: string): string => {
  switch (docType) {
    case "CCCD":
      return "Ảnh chụp mặt trước và mặt sau của căn cước công dân, rõ nét, đầy đủ thông tin";
    case "CERTIFICATE":
      return "Bằng tốt nghiệp, chứng chỉ hoặc văn bằng chứng minh trình độ học vấn";
    case "SELFIE":
      return "Ảnh selfie của bạn cầm căn cước công dân, khuôn mặt và thông tin trên CCCD phải rõ ràng";
    case "STUDENT_CARD":
      return "Thẻ sinh viên còn hiệu lực (nếu bạn đang là sinh viên)";
    case "TRANSCRIPT":
      return "Bảng điểm chứng minh kết quả học tập";
    case "ENROLLMENT_CONFIRMATION":
      return "Giấy xác nhận đang theo học từ trường đại học/cao đẳng";
    default:
      return "";
  }
};

const TutorStep2: React.FC<TutorStep2Props> = ({ onSubmit, onBack, isLoading = false }) => {
  const [documents, setDocuments] = useState<DocumentUpload[]>([
    { docType: "CCCD" as const, file: null as any },
  ]);

  const { uploadDocuments, isLoading: isUploading } = useDocumentUpload();

  const addDocument = () => {
    setDocuments([...documents, { docType: "CCCD" as const, file: null as any }]);
  };

  const removeDocument = (index: number) => {
    const newDocuments = documents.filter((_, i) => i !== index);
    setDocuments(newDocuments);
  };

  const updateDocument = (index: number, field: keyof DocumentUpload, value: any) => {
    const newDocuments = [...documents];
    newDocuments[index] = { ...newDocuments[index], [field]: value };
    setDocuments(newDocuments);
  };

  const handleSubmit = async () => {
    const validDocuments = documents.filter((doc) => doc.docType && doc.file);

    if (validDocuments.length === 0) {
      toast.error("Vui lòng thêm ít nhất một tài liệu");
      return;
    }

    // Upload documents
    const uploadResult = await uploadDocuments(validDocuments);

    if (uploadResult.success) {
      // Call parent onSubmit with upload results
      onSubmit(uploadResult.results || []);
    }
  };

  const canSubmit = documents.some((doc) => doc.docType && doc.file) && !isUploading;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tải lên hồ sơ</h2>
        <p className="text-gray-600">
          Vui lòng tải lên các tài liệu xác minh danh tính và trình độ
        </p>
      </div>

      {/* Document Upload Form */}
      <div className="space-y-6">
        {/* Add first document if none exist */}
        {documents.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">Chưa có tài liệu nào được thêm</p>
            <EBButton type="button" variant="outline" onClick={addDocument} className="bg-white">
              + Thêm tài liệu đầu tiên
            </EBButton>
          </div>
        )}

        {/* Document Upload Items */}
        {documents.map((document, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 bg-white">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">Tài liệu {index + 1}</h3>
              {documents.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Xóa
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Document Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại tài liệu *
                </label>
                <select
                  value={document.docType}
                  onChange={(e) => updateDocument(index, "docType", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">Chọn loại tài liệu</option>
                  {documentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  File tài liệu *
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateDocument(index, "file", file);
                    }
                  }}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Định dạng: PDF, JPG, PNG, DOC, DOCX (tối đa 5MB)
                </p>
              </div>
            </div>

            {/* Document Description */}
            {document.docType && (
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Mô tả:</strong> {getDocumentDescription(document.docType)}
                </p>
              </div>
            )}

            {/* File Preview */}
            {document.file && (
              <div className="mt-4 p-3 bg-green-50 rounded-md">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-green-800 font-medium">{document.file.name}</span>
                  <span className="text-xs text-green-600 ml-2">
                    ({(document.file.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add More Documents */}
        {documents.length > 0 && documents.length < 6 && (
          <div className="text-center">
            <EBButton
              type="button"
              variant="outline"
              onClick={addDocument}
              className="bg-white border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              + Thêm tài liệu khác
            </EBButton>
          </div>
        )}
      </div>

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
          loading={isUploading}
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
