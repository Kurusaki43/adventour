import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import "@smastrom/react-rating/style.css";
import type { Payment, PaymentStatus } from "../types/payment";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/features/admin/utils/formatCurrency";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { GiPayMoney } from "react-icons/gi";
import { FaStripe } from "react-icons/fa";

const Status: Record<PaymentStatus, string> = {
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100",
  failed: "bg-red-100 text-red-700 dark:bg-red-600 dark:text-red-100",
  paid: "bg-green-100 text-green-700 dark:bg-green-600 dark:text-green-100",
  refunded: "bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-100",
};

type PaymentRowProps = {
  payment: Payment;
  index?: number;
};

const PaymentRow = ({ payment, index }: PaymentRowProps) => {
  return (
    <TableRow key={payment.id} className="[&>*]:py-2 whitespace-nowrap">
      {index !== undefined && (
        <TableCell className="font-medium text-center text-accent-foreground/70 w-[45px]">
          {index < 9 ? `0${index + 1}` : index + 1}
        </TableCell>
      )}

      <TableCell className="font-semibold flex items-center justify-center text-center capitalize tracking-wider text-xs text-accent-foreground mt-2">
        {payment.method === "cash" ? (
          <GiPayMoney className="mr-2" size={25} />
        ) : (
          <FaStripe />
        )}
        {payment.method}
      </TableCell>

      <TableCell className="font-medium text-center text-accent-foreground">
        {formatCurrency(payment.amount)}
      </TableCell>

      <TableCell className="font-medium text-center text-accent-foreground">
        <Badge
          variant="secondary"
          className={`${
            Status[payment.status]
          } font-semibold tracking-wider uppercase`}
        >
          {payment.status}
        </Badge>
      </TableCell>

      <TableCell className="font-medium text-accent-foreground text-center">
        {new Date(payment.createdAt).toDateString()}
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
                // onClick={() => openUpdate(tour)}
              >
                <Pencil />
                Update
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default PaymentRow;
