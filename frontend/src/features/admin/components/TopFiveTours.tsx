import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardCard from "./DashboardCard";
import { formatCurrency } from "../utils/formatCurrency";
import { useTop5ToursStats } from "@/features/tours/toursQueries";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardMessage from "./DashboardMessage";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

const TopFiveTours = () => {
  const { data, isPending, isError, error } = useTop5ToursStats();
  if (isPending) return <Skeleton className="h-64" />;
  return (
    <DashboardCard
      title="Top 5 tours"
      className="md:col-span-1 lg:col-span-2 max-h-82 min-h-h-64"
    >
      {isError && (
        <DashboardMessage type="error" message={getErrorMessage(error)} />
      )}
      {!isError && data.stats.length === 0 && (
        <p className="text-muted-foreground">
          You have no booking yet. Top 5 tours are based on bookings.
        </p>
      )}
      {!isError && data.stats.length > 0 && (
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="font-semibold">Tour Name</TableHead>
              <TableHead className="font-semibold text-center">
                Bookings
              </TableHead>
              <TableHead className="font-semibold text-center">
                Total Revenue
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.stats.map((tour) => (
              <TableRow key={tour.tourId}>
                <TableCell className="font-medium">{tour.tourName}</TableCell>
                <TableCell className="text-center font-semibold">
                  {tour.nbBookings}
                </TableCell>
                <TableCell className="text-center font-semibold">
                  {formatCurrency(tour.totalRevenue)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DashboardCard>
  );
};
export default TopFiveTours;
