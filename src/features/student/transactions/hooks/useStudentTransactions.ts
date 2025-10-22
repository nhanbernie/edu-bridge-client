import { useGetStudentTransactionsQuery } from "@/services/transactions";
import { FlowType } from "@/common/enums";

export const useStudentTransactions = () => {
  const {
    data: transactionsResponse,
    isLoading: isLoadingTransactions,
    error: transactionsError,
    refetch: refetchTransactions,
  } = useGetStudentTransactionsQuery();

  const transactions = transactionsResponse?.data || [];
  const isLoading = isLoadingTransactions;

  // Calculate summary stats based on new DTO
  const totalSpent = transactions
    .filter((t) => t.flowType.toUpperCase() === FlowType.OUTGOING)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalReceived = transactions
    .filter((t) => t.flowType.toUpperCase() === FlowType.INCOMING)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const completedTransactions = transactions.filter(
    (t) => t.status.toLowerCase() === "thành công" || t.status.toLowerCase() === "completed"
  ).length;

  const pendingTransactions = transactions.filter(
    (t) => t.status.toLowerCase() === "đang chờ" || t.status.toLowerCase() === "pending"
  ).length;

  const failedTransactions = transactions.filter(
    (t) => t.status.toLowerCase() === "thất bại" || t.status.toLowerCase() === "failed"
  ).length;

  return {
    // Data
    transactions,

    // Loading states
    isLoading,
    isLoadingTransactions,

    // Error states
    transactionsError,

    // Actions
    refetchTransactions,

    // Stats
    totalSpent,
    totalReceived,
    completedTransactions,
    pendingTransactions,
    failedTransactions,
  };
};
