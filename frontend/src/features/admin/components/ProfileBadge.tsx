import { MdVerifiedUser } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ProfileBadgeProps = {
  avatar: string;
  fullName: string;
  role: string;
};

const ProfileBadge = ({ avatar, fullName, role }: ProfileBadgeProps) => {
  return (
    <div className="flex gap-2 items-center w-full justify-between bg-primary/20 px-2 py-1 rounded-sm">
      <Avatar>
        <AvatarImage src={avatar} alt="admin avatar" />
        <AvatarFallback>Admin</AvatarFallback>
      </Avatar>
      <div className="flex-col flex text-xs gap-1 font-medium capitalize">
        <span className="tracking-wide text-foreground dark:text-white">
          {fullName}
        </span>
        <span className="text-primary font-semibold capitalize tracking-wide">
          {role}
        </span>
      </div>
      <MdVerifiedUser className="text-primary/90" />
    </div>
  );
};

export default ProfileBadge;
