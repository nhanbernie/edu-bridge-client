import { useMemo } from "react";
import { useTutorTransactions } from "@/features/tutor/transactions/hooks/useTutorTransactions";
import { FlowType } from "@/common/enums";

export const useTransactionChart = () => {
  const { transactions, isLoading, transactionsError } = useTutorTransactions();

  // Convert transactions to chart data
  const chartData = useMemo(() => {
    if (!transactions.length) return [];

    // Group transactions by month
    const monthlyData: { [key: string]: { earnings: number; spent: number } } = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthKey = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { earnings: 0, spent: 0 };
      }

      if (transaction.flowType.toUpperCase() === FlowType.INCOMING) {
        monthlyData[monthKey].earnings += transaction.amount;
      } else if (transaction.flowType.toUpperCase() === FlowType.OUTGOING) {
        monthlyData[monthKey].spent += transaction.amount;
      }
    });

    // Convert to chart format and sort by date
    const chartDataArray = Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        earnings: Math.round(data.earnings),
        spent: Math.round(data.spent),
        net: Math.round(data.earnings - data.spent),
      }))
      .sort((a, b) => {
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateA.getTime() - dateB.getTime();
      });

    // Return last 6 months
    return chartDataArray.slice(-6);
  }, [transactions]);

  // Calculate growth percentage
  const growthPercentage = useMemo(() => {
    if (chartData.length < 2) return 0;

    const currentMonth = chartData[chartData.length - 1];
    const previousMonth = chartData[chartData.length - 2];

    if (previousMonth.earnings === 0) return 0;

    return (
      Math.round(
        ((currentMonth.earnings - previousMonth.earnings) / previousMonth.earnings) * 100 * 10
      ) / 10
    );
  }, [chartData]);

  return {
    chartData,
    growthPercentage,
    isLoading,
    transactionsError,
  };
};
