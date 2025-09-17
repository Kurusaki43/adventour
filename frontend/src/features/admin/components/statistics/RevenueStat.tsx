import { Skeleton } from "@/components/ui/skeleton";
import { usePayments } from "@/features/payments/paymentsQueries";
import StatisticCard from "../StatisticCard";
import { formatCurrency } from "../../utils/formatCurrency";
import { IoMdCash } from "react-icons/io";

export const RevenueStat = () => {
  const { data, isPending } = usePayments();
  const revenue =
    data?.payments
      .filter((p) => p.status === "paid")
      .reduce((acc, p) => (acc += p.amount), 0) || 0;
  if (isPending) return <Skeleton className="w-full h-24" />;
  return (
    <StatisticCard
      title="revenue"
      value={formatCurrency(revenue)}
      icon={IoMdCash}
      color="chart-4"
    />
  );
};
