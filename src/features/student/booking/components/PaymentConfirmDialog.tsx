"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, AlertCircle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface PaymentConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  bookingId?: string | null;
}

const PaymentConfirmDialog: React.FC<PaymentConfirmDialogProps> = ({
  open,
  onConfirm,
  onCancel,
  isLoading = false,
  bookingId,
}) => {
  const t = useTranslations("student.booking.paymentConfirm");

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="sm:max-w-md rounded-3xl border-0 shadow-lg">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">{t("title")}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {bookingId && `${t("bookingId")}: ${bookingId}`}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                {t("importantInfo")}
              </p>
              <ul className="text-blue-800 dark:text-blue-200 space-y-1">
                <li>{t("info.created")}</li>
                <li>{t("info.timeout")}</li>
                <li>{t("info.confirmation")}</li>
                <li>{t("info.notification")}</li>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t("processing")}
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                {t("confirm")}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentConfirmDialog;
