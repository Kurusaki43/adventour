import { useBookings } from "@/features/bookings/bookingsQueries";
import DashboardCard from "./DashboardCard";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardMessage from "./DashboardMessage";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import { Badge } from "@/components/ui/badge";
import type { BookingStatus } from "@/features/bookings/types/booking";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Status: Record<BookingStatus, string> = {
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100 transition-colors duration-300 ease-in-out",
  cancelled:
    "bg-red-100 text-red-700 dark:bg-red-600 dark:text-red-100 transition-colors duration-300 ease-in-out",
  confirmed:
    "bg-green-100 text-green-700 dark:bg-green-600 dark:text-green-100 transition-colors duration-300 ease-in-out",
  completed:
    "bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-blue-100 transition-colors duration-300 ease-in-out",
};

const LastBookingsCard = () => {
  const { data, isPending, isError, error } = useBookings({
    limit: 5,
  });
  if (isPending) return <Skeleton className=" h-64" />;
  return (
    <DashboardCard
      title="Last Bookings"
      className="md:col-span-1 lg:col-span-2 max-h-82"
    >
      {isError && (
        <DashboardMessage type="error" message={getErrorMessage(error)} />
      )}
      {!isError && data.bookings.length === 0 && (
        <DashboardMessage type="empty" />
      )}

      {!isError && data.bookings.length > 0 && (
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="font-semibold">Traveler</TableHead>
              <TableHead className="font-semibold text-left">Tour</TableHead>
              <TableHead className="font-semibold text-center">Seats</TableHead>
              <TableHead className="font-semibold text-center">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.bookings.map(({ id, user, tour, peopleCount, status }) => (
              <TableRow key={id}>
                <TableCell className="capitalize tracking-wide">
                  {user.name}
                </TableCell>
                <TableCell className="text-left truncate max-w-xs">
                  {tour.name}
                </TableCell>
                <TableCell className="text-center font-light">
                  {peopleCount}
                </TableCell>
                <TableCell className="text-center font-light">
                  <Badge className={Status[status]}>{status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DashboardCard>
  );
};

export default LastBookingsCard;
