import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";

interface TransactionStatusBadgeProps {
  status: number;
}

const TransactionStatusBadge: React.FC<TransactionStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 0:
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
          <Clock className="w-3 h-3 mr-1" />
          Đang chờ
        </Badge>
      );
    case 1:
      return (
        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Hoàn thành
        </Badge>
      );
    case 2:
      return (
        <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Thất bại
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
          Không xác định
        </Badge>
      );
  }
};

export default TransactionStatusBadge;
