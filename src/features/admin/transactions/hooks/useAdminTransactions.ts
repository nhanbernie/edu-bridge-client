import { useGetAdminTransactionsQuery, useGetServiceFeesQuery } from "@/services/transactions";

export const useAdminTransactions = () => {
  const {
    data: transactionsResponse,
    isLoading: isLoadingTransactions,
    error: transactionsError,
    refetch: refetchTransactions,
  } = useGetAdminTransactionsQuery();

  const {
    data: serviceFeesResponse,
    isLoading: isLoadingServiceFees,
    error: serviceFeesError,
    refetch: refetchServiceFees,
  } = useGetServiceFeesQuery();

  const transactions = transactionsResponse?.data || [];
  const serviceFees = serviceFeesResponse?.data || 0;
  const isLoading = isLoadingTransactions || isLoadingServiceFees;

  // Calculate summary stats
  const totalEarnings = transactions.reduce((sum, transaction) => {
    return sum + (transaction.amount - transaction.serviceFee);
  }, 0);

  const totalServiceFees = transactions.reduce((sum, transaction) => {
    return sum + transaction.serviceFee;
  }, 0);

  const completedTransactions = transactions.filter((t) => t.status === 1).length;
  const pendingTransactions = transactions.filter((t) => t.status === 0).length;
  const failedTransactions = transactions.filter((t) => t.status === 2).length;

  const refetchAll = () => {
    refetchTransactions();
    refetchServiceFees();
  };

  return {
    // Data
    transactions,
    serviceFees,

    // Loading states
    isLoading,
    isLoadingTransactions,
    isLoadingServiceFees,

    // Error states
    transactionsError,
    serviceFeesError,

    // Actions
    refetchTransactions,
    refetchServiceFees,
    refetchAll,

    // Stats
    totalEarnings,
    totalServiceFees,
    completedTransactions,
    pendingTransactions,
    failedTransactions,
  };
};
