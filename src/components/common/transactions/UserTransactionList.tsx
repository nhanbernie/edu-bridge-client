import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpRight, ArrowDownLeft, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { UserTransactionHistoryDto } from "@/services/transactions/type";
import { FlowType } from "@/common/enums";

interface UserTransactionListProps {
  transactions: UserTransactionHistoryDto[];
  formatCurrency: (amount: number) => string;
}

const UserTransactionList: React.FC<UserTransactionListProps> = ({
  transactions,
  formatCurrency,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "thành công":
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "đang chờ":
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "thất bại":
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getFlowTypeIcon = (flowType: string) => {
    switch (flowType.toUpperCase()) {
      case FlowType.OUTGOING:
        return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      case FlowType.INCOMING:
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-500" />;
    }
  };

  const getFlowTypeText = (flowType: string) => {
    switch (flowType.toUpperCase()) {
      case FlowType.OUTGOING:
        return "Tiền chuyển";
      case FlowType.INCOMING:
        return "Tiền nhận";
      default:
        return "Giao dịch";
    }
  };

  const getAmountColor = (flowType: string) => {
    switch (flowType.toUpperCase()) {
      case FlowType.OUTGOING:
        return "text-red-600";
      case FlowType.INCOMING:
        return "text-green-600";
      default:
        return "text-gray-900";
    }
  };

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="flex items-center gap-3 text-lg text-gray-800">
          <Calendar className="w-5 h-5 text-gray-600" />
          Lịch sử giao dịch
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            {transactions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {transactions.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có giao dịch</h3>
            <p className="text-gray-500">Bạn chưa có giao dịch nào trong hệ thống</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {transactions.map((transaction) => (
              <div
                key={transaction.transactionId}
                className="p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className={`text-xl font-semibold ${getAmountColor(transaction.flowType)}`}
                      >
                        {transaction.flowType.toUpperCase() === FlowType.OUTGOING ? "-" : "+"}
                        {formatCurrency(transaction.amount)}
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(transaction.status)} border`}
                      >
                        {transaction.status}
                      </Badge>
                    </div>

                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      {transaction.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(transaction.date), "dd/MM/yyyy HH:mm", {
                          locale: vi,
                        })}
                      </div>
                      <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                        {getFlowTypeIcon(transaction.flowType)}
                        {getFlowTypeText(transaction.flowType)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserTransactionList;
