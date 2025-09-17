import { useQuery } from "@tanstack/react-query";
import type { PaymentQueryOptions } from "./types/paymentQueryOptions";
import { getPayments } from "./paymentsApi";

export const usePayments = (options?: PaymentQueryOptions) => {
  return useQuery({
    queryKey: ["payments", options],
    queryFn: () => getPayments(options),
    staleTime: 1000 * 30, // 30 seconds (payments are more dynamic)
    refetchInterval: 1000 * 30, // optional auto polling
  });
};
