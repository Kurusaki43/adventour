import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import DashboardCard from "./DashboardCard";
import { useColorTheme } from "../hooks/useThemeColor";
import { useBookingsStats } from "@/features/bookings/bookingsQueries";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardMessage from "./DashboardMessage";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

const BookingsChart = () => {
  const primaryColor = useColorTheme();
  const { data: stats, isPending, isError, error } = useBookingsStats();

  if (isPending) return <Skeleton className="w-full sm:col-span-2 h-[350px]" />;

  return (
    <DashboardCard
      title="Bookings over time"
      className="overflow-auto scrollbar-hide md:col-span-2 lg:col-span-4"
    >
      {isError && (
        <DashboardMessage
          type="error"
          title="An Error happened while getting stats"
          message={getErrorMessage(error)}
        />
      )}
      {!isError && stats.data.length === 0 && (
        <p className="text-muted-foreground">You have no booking yet.</p>
      )}
      {!isError && stats.data.length > 0 && (
        <div className="min-w-[450px]">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stats.data} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis dataKey="totalBookings" />
              <Tooltip />
              <Area
                type="natural"
                dataKey="totalBookings"
                stroke={primaryColor}
                strokeWidth={2}
                fill={primaryColor}
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
};

export default BookingsChart;
