import { Badge } from "@/components/ui/badge";
import DashboardCard from "@/features/admin/components/DashboardCard";
import { useBookings } from "@/features/bookings/bookingsQueries";
import type { BookingStatus } from "@/features/bookings/types/booking";
import { formatDate } from "@/features/guides/utils/formatDate";
import { Download } from "lucide-react";
import { useMemo } from "react";

const getStatusClass = (status: BookingStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100";
    case "cancelled":
      return "bg-red-100 text-red-700 dark:bg-red-600 dark:text-red-100";
    case "confirmed":
      return "bg-green-100 text-green-700 dark:bg-green-600 dark:text-green-100";
    case "completed":
      return "bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-blue-100";
    default:
      return "";
  }
};

const MyBookingsCard = () => {
  const { data } = useBookings();

  const bookingSorted = useMemo(() => {
    if (!data?.bookings) return [];
    return [...data.bookings].sort(
      (a, b) =>
        new Date(a.tourStartDate).getTime() -
        new Date(b.tourStartDate).getTime()
    );
  }, [data?.bookings]);

  return (
    <DashboardCard
      title="My bookings"
      className="gap-1 relative overflow-hidden"
    >
      {bookingSorted.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          You have no bookings yet.
        </p>
      ) : (
        <ul className="divide-y border">
          {bookingSorted.map((booking) => (
            <li
              key={booking.id}
              className="flex flex-row justify-between items-center gap-1 p-2 even:bg-muted/60"
            >
              {/* Left side: tour info */}
              <div className="flex flex-col gap-2">
                <span className="text-sm">
                  {formatDate(booking.tourStartDate)}
                </span>
                <span className="capitalize text-lg font-semibold tracking-wide text-foreground">
                  {booking.tour.name}
                </span>
              </div>

              {/* Right side: status + receipt */}
              <div className="flex flex-col gap-2 items-end">
                <Badge className={getStatusClass(booking.status)}>
                  {booking.status}
                </Badge>

                {booking.receiptUrl && (
                  <a
                    href={booking.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Download receipt for ${booking.tour.name}`}
                    className="flex gap-1 items-center text-sm cursor-pointer hover:text-primary"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Receipt
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </DashboardCard>
  );
};

export default MyBookingsCard;
