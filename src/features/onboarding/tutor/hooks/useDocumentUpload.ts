import { useUploadDocumentMutation } from "@/services/user";
import { DocumentType } from "@/services/api/type";
import { StorageService } from "@/services/storage/secureStorage.service";
import { toast } from "sonner";

export interface DocumentUpload {
  docType: DocumentType;
  file: File;
}

export const useDocumentUpload = () => {
  const [uploadDocument, { isLoading, error }] = useUploadDocumentMutation();

  const uploadDocuments = async (documents: DocumentUpload[]) => {
    try {
      const userData = await StorageService.getUserData();

      if (!userData?.userId) {
        toast.error("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
        return { success: false };
      }

      // Upload each document sequentially
      const uploadResults = [];

      for (const doc of documents) {
        try {
          const result = await uploadDocument({
            tutorId: userData.userId,
            docType: doc.docType,
            file: doc.file,
          }).unwrap();

          if (result.success) {
            uploadResults.push(result);
            toast.success(`Upload ${doc.docType} thành công!`);
          } else {
            toast.error(`Lỗi upload ${doc.docType}: ${result.message}`);
            return { success: false };
          }
        } catch (err: any) {
          console.error(`Upload error for ${doc.docType}:`, err);
          toast.error(`Lỗi upload ${doc.docType}: ${err?.data?.message || "Có lỗi xảy ra"}`);
          return { success: false };
        }
      }

      toast.success("Upload tất cả tài liệu thành công!");
      return { success: true, results: uploadResults };
    } catch (err: any) {
      console.error("Document upload error:", err);
      toast.error("Có lỗi xảy ra khi upload tài liệu");
      return { success: false };
    }
  };

  const uploadSingleDocument = async (document: DocumentUpload) => {
    try {
      const userData = await StorageService.getUserData();

      if (!userData?.userId) {
        toast.error("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
        return { success: false };
      }

      const result = await uploadDocument({
        tutorId: userData.userId,
        docType: document.docType,
        file: document.file,
      }).unwrap();

      if (result.success) {
        toast.success(`Upload ${document.docType} thành công!`);
        return { success: true, result };
      } else {
        toast.error(`Lỗi upload: ${result.message}`);
        return { success: false };
      }
    } catch (err: any) {
      console.error("Single document upload error:", err);
      toast.error(err?.data?.message || "Có lỗi xảy ra khi upload tài liệu");
      return { success: false };
    }
  };

  return {
    uploadDocuments,
    uploadSingleDocument,
    isLoading,
    error,
  };
};
