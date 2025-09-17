import { Skeleton } from "@/components/ui/skeleton";
import { useBookings } from "@/features/bookings/bookingsQueries";
import StatisticCard from "../StatisticCard";
import { RxCalendar } from "react-icons/rx";

export const BookingsStat = () => {
  const { data, isPending } = useBookings();
  if (isPending) return <Skeleton className="w-full h-24" />;
  return (
    <StatisticCard
      title="bookings"
      value={data?.totalBookings || 0}
      icon={RxCalendar}
      color="chart-3"
    />
  );
};
