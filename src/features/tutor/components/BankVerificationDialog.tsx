"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, X } from "lucide-react";
import { useVerifyQRCodeQuery } from "@/services/payment";

interface BankVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const BankVerificationDialog: React.FC<BankVerificationDialogProps> = ({ isOpen, onClose }) => {
  const { data, isLoading } = useVerifyQRCodeQuery(undefined, {
    skip: !isOpen,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Xác thực tài khoản ngân hàng
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Vui lòng xác thực tài khoản ngân hàng để nhận thanh toán từ học viên.
          </p>

          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {data?.success && data.data?.qrCode && (
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 inline-block">
                <img
                  src={`data:image/png;base64,${data.data.qrCode}`}
                  alt="Bank Verification QR Code"
                  className="w-48 h-48 mx-auto"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Quét mã QR để xác thực</p>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Để sau
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BankVerificationDialog;
