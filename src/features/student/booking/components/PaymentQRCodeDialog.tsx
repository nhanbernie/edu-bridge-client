"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface PaymentQRCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  paymentData: {
    payment: {
      paymentId: string;
      bookingId: string;
      amount: number;
      serviceFee: number;
      paymentMethod: string;
      paymentStatus: string;
      createdAt: string;
    };
    paymentUrl: string;
    qrCodeBase64: string;
  };
}

const PaymentQRCodeDialog: React.FC<PaymentQRCodeDialogProps> = ({
  isOpen,
  onClose,
  paymentData,
}) => {
  const t = useTranslations("student.booking.paymentQR");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = paymentData.qrCodeBase64;
    link.download = `payment-qr-${paymentData.payment.paymentId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(t("downloaded"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden rounded-3xl border-0 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-foreground">
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Payment Info */}
            <div className="bg-muted rounded-xl p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("amount")}:</span>
                  <span className="font-semibold text-lg text-primary">
                    {formatCurrency(paymentData.payment.amount)}
                  </span>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="text-center">
              <div className="bg-background p-4 rounded-xl border-2 border-dashed border-border inline-block">
                <img
                  src={paymentData.qrCodeBase64}
                  alt="QR Code for payment"
                  className="w-40 h-40 sm:w-48 sm:h-48 mx-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{t("scanQR")}</p>
            </div>

            {/* Action Buttons */}
            <div className="text-center">
              <Button variant="outline" onClick={handleDownloadQR} className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                {t("downloadQR")}
              </Button>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800 mb-5">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                {t("instructions.title")}
              </h4>
              <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>{t("instructions.step1")}</li>
                <li>{t("instructions.step2")}</li>
                <li>{t("instructions.step3")}</li>
                <li>{t("instructions.step4")}</li>
              </ol>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            {t("note.close")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentQRCodeDialog;
