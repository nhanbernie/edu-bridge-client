import { useGetStudentTransactionsQuery } from "@/services/transactions";

export const useStudentTransactions = () => {
  const {
    data: transactionsResponse,
    isLoading: isLoadingTransactions,
    error: transactionsError,
    refetch: refetchTransactions,
  } = useGetStudentTransactionsQuery();

  const transactions = transactionsResponse?.data || [];
  const isLoading = isLoadingTransactions;

  // Calculate summary stats
  const totalSpent = transactions.reduce((sum, transaction) => {
    return sum + transaction.amount;
  }, 0);

  const totalServiceFees = transactions.reduce((sum, transaction) => {
    return sum + transaction.serviceFee;
  }, 0);

  const completedTransactions = transactions.filter((t) => t.status === 1).length;
  const pendingTransactions = transactions.filter((t) => t.status === 0).length;
  const failedTransactions = transactions.filter((t) => t.status === 2).length;

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
    totalServiceFees,
    completedTransactions,
    pendingTransactions,
    failedTransactions,
  };
};
