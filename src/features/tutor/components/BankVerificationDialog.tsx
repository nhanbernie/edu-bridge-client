"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, X } from "lucide-react";
import { useVerifyQRCodeQuery } from "@/services/payment";
import { useTranslations } from "next-intl";

interface BankVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void | Promise<void>;
}

const BankVerificationDialog: React.FC<BankVerificationDialogProps> = ({ isOpen, onClose }) => {
  const t = useTranslations("tutor.components.bankVerification");
  const { data, isLoading } = useVerifyQRCodeQuery(undefined, {
    skip: !isOpen,
  });

  const handleClose = async () => {
    await onClose();
  };

  const generateErrorHTML = () => `
    <div class="w-48 h-48 flex items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-lg">
      <div class="text-center px-4">
        <svg class="w-12 h-12 mx-auto text-red-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <p class="text-sm text-red-600 dark:text-red-400 font-medium">${t("qrCode.error.title")}</p>
        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">${t("qrCode.error.message")}</p>
      </div>
    </div>
  `;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Friendly Description */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t("description.main")}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {t("description.fee")}
            </p>
          </div>

          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {data?.success && data?.data ? (
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 inline-block">
                <img
                  src={data.data}
                  alt={t("qrCode.alt")}
                  className="w-48 h-48 mx-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = generateErrorHTML();
                    }
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">{t("qrCode.instruction")}</p>
            </div>
          ) : (
            !isLoading && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                      {t("error.title")}
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                      {t("error.message")}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose} className="flex-1 rounded-3xl">
              {t("actions.later")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BankVerificationDialog;
