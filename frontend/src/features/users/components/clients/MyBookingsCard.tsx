import { Badge } from "@/components/ui/badge";
import DashboardCard from "@/features/admin/components/DashboardCard";
import { useBookings } from "@/features/bookings/bookingsQueries";
import type { BookingStatus } from "@/features/bookings/types/booking";
import { formatDate } from "@/features/guides/utils/formatDate";
import { Download } from "lucide-react";

const Status: Record<BookingStatus, string> = {
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-600 dark:text-red-100",
  confirmed:
    "bg-green-100 text-green-700 dark:bg-green-600 dark:text-green-100",
  completed: "bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-blue-100",
};

const MyBookingsCard = () => {
  const { data } = useBookings();
  const bookingSorted = data?.bookings.sort(
    (a, b) =>
      new Date(a.tourStartDate).getTime() - new Date(b.tourStartDate).getTime()
  );
  return (
    <DashboardCard
      title="My bookings"
      className="gap-1 relative overflow-hidden"
    >
      <ul className="divide-y border">
        {bookingSorted?.map((booking) => (
          <li
            className="flex flex-row justify-between items-center gap-1 p-2 even:bg-muted/60"
            key={booking.id}
          >
            <div className="flex flex-col gap-2">
              <span className="text-sm">
                {formatDate(booking.tourStartDate)}
              </span>
              <span className="capitalize text-lg font-semibold tracking-wide text-foreground">
                {booking.tour.name}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Badge className={Status[booking.status]}>{booking.status}</Badge>
              {booking.receiptUrl && (
                <a
                  className="flex gap-1 items-center text-sm cursor-pointer"
                  href={booking.receiptUrl}
                  target="_blank"
                >
                  <Download className="size-4" />
                  Receipt
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
};

export default MyBookingsCard;
