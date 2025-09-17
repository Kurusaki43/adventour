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
import { Check, MoreVertical, Pencil, Trash2, X } from "lucide-react";
import type { User } from "../types/user.types";
import { useDeleteUser } from "../userQueries";
import { useUserModal } from "../store/useUserModal";

type UserRowProps = {
  user: User;
  index?: number;
};

const Verified: Record<string, string> = {
  verified: "bg-green-100 text-green-700 dark:bg-green-600 dark:text-green-100",
  "not-verified": "bg-red-100 text-red-700 dark:bg-red-600 dark:text-red-100",
};

const UserRow = ({ user, index }: UserRowProps) => {
  const { openUpdate } = useUserModal();
  const { deleteUserById } = useDeleteUser(user);
  return (
    <TableRow key={user.id} className="[&>*]:py-2 whitespace-nowrap">
      {index !== undefined && (
        <TableCell className="font-medium text-center text-accent-foreground/70 w-[45px]">
          {index < 9 ? `0${index + 1}` : index + 1}
        </TableCell>
      )}

      <TableCell className="font-medium text-accent-foreground">
        <div className="flex items-center gap-4">
          <img
            src={`/uploads/users/${user.avatar}`}
            className="size-10 rounded-full shrink-0 object-cover shadow-lg"
            alt={user.name}
          />
          <p className="truncate">{user.name}</p>
        </div>
      </TableCell>

      <TableCell className="text-center text-accent-foreground/70">
        {`${user.email}`}
      </TableCell>
      <TableCell className="text-center text-accent-foreground">
        <Badge
          className={`font-semibold tracking-wide uppercase ${
            user.isVerified ? Verified["verified"] : Verified["not-verified"]
          } py-1 px-2`}
        >
          {user.isVerified ? "confirmed" : "unconfirmed"}
        </Badge>
      </TableCell>
      <TableCell className="font-medium text-center text-accent-foreground capitalize">
        {user.role}
      </TableCell>
      <TableCell className="text-center text-accent-foreground">
        {user.isActive ? (
          <Check className="size-4 mx-auto text-green-600" />
        ) : (
          <X className="size-4 mx-auto text-red-600" />
        )}
      </TableCell>
      <TableCell className="text-center text-accent-foreground">
        {user?.createdAt ? new Date(user?.createdAt).toDateString() : "Unknown"}
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
                onClick={() => deleteUserById(user.id!)}
              >
                <Trash2 />
                Delete
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => openUpdate(user)}
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

export default UserRow;
