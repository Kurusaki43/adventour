import { Skeleton } from "@/components/ui/skeleton";
import { useTours } from "@/features/tours/toursQueries";
import StatisticCard from "../StatisticCard";
import { FiMapPin } from "react-icons/fi";

export const ToursStat = () => {
  const { data, isPending } = useTours();
  if (isPending) return <Skeleton className="w-full h-24" />;

  return (
    <StatisticCard
      title="tours"
      value={data?.totalTours || 0}
      icon={FiMapPin}
      color="chart-1"
    />
  );
};
