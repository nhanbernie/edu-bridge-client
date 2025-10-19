import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpRight, ArrowDownLeft, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { UserTransactionHistoryDto } from "@/services/transactions/type";
import { FlowType } from "@/common/enums";
import { useTranslations } from "next-intl";

interface UserTransactionListProps {
  transactions: UserTransactionHistoryDto[];
  formatCurrency: (amount: number) => string;
}

const UserTransactionList: React.FC<UserTransactionListProps> = ({
  transactions,
  formatCurrency,
}) => {
  const t = useTranslations("student.transactions.list");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "thành công":
      case "completed":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800";
      case "đang chờ":
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";
      case "thất bại":
      case "failed":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getFlowTypeIcon = (flowType: string) => {
    switch (flowType.toUpperCase()) {
      case FlowType.OUTGOING:
        return <ArrowUpRight className="w-4 h-4 text-red-600 dark:text-red-400" />;
      case FlowType.INCOMING:
        return <ArrowDownLeft className="w-4 h-4 text-green-600 dark:text-green-400" />;
      default:
        return <DollarSign className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getFlowTypeText = (flowType: string) => {
    switch (flowType.toUpperCase()) {
      case FlowType.OUTGOING:
        return t("flowType.outgoing");
      case FlowType.INCOMING:
        return t("flowType.incoming");
      default:
        return t("flowType.default");
    }
  };

  const getAmountColor = (flowType: string) => {
    switch (flowType.toUpperCase()) {
      case FlowType.OUTGOING:
        return "text-red-600 dark:text-red-400";
      case FlowType.INCOMING:
        return "text-green-600 dark:text-green-400";
      default:
        return "text-foreground";
    }
  };

  return (
    <Card className="bg-card rounded-4xl shadow-2xl border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-3 text-lg text-foreground">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          {t("title")}
          <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
            {transactions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {transactions.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">{t("empty.title")}</h3>
            <p className="text-muted-foreground">{t("empty.description")}</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {transactions.map((transaction) => (
              <div
                key={transaction.transactionId}
                className="p-6 hover:bg-muted/50 transition-colors duration-200"
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

                    <p className="text-foreground mb-4 text-sm leading-relaxed">
                      {transaction.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(transaction.date), "dd/MM/yyyy HH:mm", {
                          locale: vi,
                        })}
                      </div>
                      <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
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
