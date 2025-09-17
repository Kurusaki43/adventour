import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Download, MoreVertical, Pencil, Trash2 } from "lucide-react";
import "@smastrom/react-rating/style.css";
import type { Booking, BookingStatus } from "../types/booking";
import { formatCurrency } from "@/features/admin/utils/formatCurrency";
import { useBookingModal } from "../store/useBookingModal";

const Status: Record<BookingStatus, string> = {
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-600 dark:text-red-100",
  confirmed:
    "bg-green-100 text-green-700 dark:bg-green-600 dark:text-green-100",
  completed: "bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-blue-100",
};

type BookingRowProps = {
  booking: Booking;
  index?: number;
};

const BookingRow = ({ booking, index }: BookingRowProps) => {
  const { openUpdate } = useBookingModal();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = booking.receiptUrl!;
    link.download = `receipt-${booking.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <TableRow className="[&>*]:py-2 whitespace-nowrap">
      {index !== undefined && (
        <TableCell className="font-medium text-center text-accent-foreground/70 w-[45px]">
          {index < 9 ? `0${index + 1}` : index + 1}
        </TableCell>
      )}

      <TableCell className="font-medium text-accent-foreground">
        <div className="flex items-center gap-3">
          <img
            src={`/uploads/tours/${booking.tour.imageCover}`}
            className="size-12 rounded-md shrink-0 object-cover shadow-lg"
            alt={booking.tour.name}
          />
          <p className="truncate">{booking.tour.name}</p>
        </div>
      </TableCell>

      <TableCell className="text-center text-accent-foreground/70">
        <div className="flex items-center gap-4">
          <img
            src={`/uploads/users/${booking.user.avatar}`}
            className="size-10 rounded-full shrink-0 object-cover shadow-lg"
            alt={booking.user.name}
          />
          <p className="truncate">{booking.user.name}</p>
        </div>
      </TableCell>

      <TableCell className="font-medium text-center text-accent-foreground">
        {booking.peopleCount}
      </TableCell>

      <TableCell className="font-medium text-center text-accent-foreground">
        {formatCurrency(booking.price)}
      </TableCell>

      <TableCell className="text-center text-accent-foreground">
        <Badge
          variant="secondary"
          className={`${Status[booking.status]} font-medium uppercase`}
        >
          {booking.status}
        </Badge>
      </TableCell>

      <TableCell className="font-medium text-accent-foreground text-center">
        {new Date(booking.tourStartDate).toDateString()}
      </TableCell>

      <TableCell className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                // onClick={() => deleteTourMutate(tour.id!)}
              >
                <Trash2 />
                Delete
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => openUpdate(booking)}
              >
                <Pencil />
                Update
              </DropdownMenuItem>
              {booking.receiptUrl && (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleDownload}
                >
                  <Download />
                  Receipt
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default BookingRow;
