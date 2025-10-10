import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TransactionStatusBadge from "./TransactionStatusBadge";
import { Calendar, User, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface Transaction {
  transactionId: string;
  amount: number;
  serviceFee: number;
  status: number;
  description: string;
  createdAt: string;
  updatedAt: string | null;
}

interface TransactionListProps {
  transactions: Transaction[];
  formatCurrency: (amount: number) => string;
  userRole?: "student" | "tutor" | "admin";
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  formatCurrency,
  userRole = "tutor",
}) => {
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
                      <div className="text-xl font-semibold text-gray-900">
                        {formatCurrency(transaction.amount)}
                      </div>
                      <TransactionStatusBadge status={transaction.status} />
                    </div>

                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      {transaction.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(transaction.createdAt), "dd/MM/yyyy HH:mm", {
                          locale: vi,
                        })}
                      </div>
                      {userRole !== "student" && (
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                          <User className="w-3 h-3" />
                          Phí: {formatCurrency(transaction.serviceFee)}
                        </div>
                      )}
                    </div>
                  </div>

                  {userRole !== "student" && (
                    <div className="text-right ml-6">
                      <div className="bg-gray-100 text-gray-900 px-3 py-2 rounded-lg font-medium text-sm mb-2">
                        Thu nhập: {formatCurrency(transaction.amount - transaction.serviceFee)}
                      </div>
                      {transaction.updatedAt && (
                        <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                          Cập nhật:{" "}
                          {format(new Date(transaction.updatedAt), "dd/MM/yyyy HH:mm", {
                            locale: vi,
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionList;
