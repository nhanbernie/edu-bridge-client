import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { TransactionStatus } from "@/common/enums";

interface TransactionStatusBadgeProps {
  status: TransactionStatus;
}

const TransactionStatusBadge: React.FC<TransactionStatusBadgeProps> = ({ status }) => {
  const t = useTranslations("student.transactions.status");

  switch (status) {
    case TransactionStatus.PENDING:
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
          <Clock className="w-3 h-3 mr-1" />
          {t("pending")}
        </Badge>
      );
    case TransactionStatus.SUCCESS:
      return (
        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          {t("completed")}
        </Badge>
      );
    case TransactionStatus.FAILED:
      return (
        <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          {t("failed")}
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
          {t("unknown")}
        </Badge>
      );
  }
};

export default TransactionStatusBadge;
