import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/auth/store/useAuth";
import type { User } from "@/features/users/types/user.types";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

type ProfilePanelProps = {
  user: Partial<User>;
  className?: string;
};

const ProfilePanel = ({ user, className }: ProfilePanelProps) => {
  const navigate = useNavigate();
  const logout = useLogout();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar
          className={cn(
            "flex size-10 items-center cursor-pointer justify-center",
            className
          )}
        >
          <AvatarImage
            src={`/uploads/users/${user.avatar}`}
            alt="user photo"
            className="size-9 rounded-full border-2 border-border"
          />
          <AvatarFallback>{user.role}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 relative z-[999999]" align="center">
        <DropdownMenuLabel>
          Welcome,
          <span className="font-bold text-primary ml-1 capitalize">
            {user.name}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className="capitalize"
          onClick={() => {
            switch (user.role) {
              case "admin":
                return navigate("/admin");
              case "guide":
                return navigate("/guide");
              case "lead-guide":
                return navigate("/guide");
              case "client":
                return navigate("/me");
            }
          }}
        >
          Dashboard
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="capitalize"
          onClick={() => logout()}
        >
          log out
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfilePanel;
