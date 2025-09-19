import { Badge } from "@/components/ui/badge";
import DashboardCard from "@/features/admin/components/DashboardCard";
import { useAuthUser } from "@/features/auth/store/useAuth";

const WelcomeCard = ({
  content = "Here is your dashboard",
}: {
  content?: string;
}) => {
  const user = useAuthUser();

  return (
    <DashboardCard title={`Hello, ${user?.name}`} className="gap-0 self-start">
      <div className="flex items-center justify-between mb-4">
        <p className="w-64 tracking-wide overflow-hidden truncate">
          {user?.guideProfile?.bio || content}
        </p>
        <img
          src={
            user?.avatar?.startsWith("http")
              ? user?.avatar
              : `/uploads/users/${user?.avatar}`
          }
          className="size-16 rounded-full bg-gray-200"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-sm">
          <span className="w-fit inline-block"> Email:</span>
          <Badge className="font-semibold ml-2">{user?.email}</Badge>
        </div>
        {user?.phone && (
          <div className="text-sm">
            <span className="w-fit inline-block"> Phone:</span>
            <Badge className="font-semibold ml-2">{user.phone}</Badge>
          </div>
        )}
        {user?.role !== "client" && (
          <>
            <div className="text-sm">
              <span className="w-fit inline-block">Languages:</span>
              <Badge className="font-semibold ml-2">
                {user?.guideProfile?.languagesSpoken.join(", ")}
              </Badge>
            </div>
            <div className="text-sm">
              <span className="w-fit inline-block"> Experience:</span>
              <Badge className="font-semibold ml-2">
                {user?.guideProfile?.yearsOfExperience}
              </Badge>
            </div>
          </>
        )}
      </div>
    </DashboardCard>
  );
};

export default WelcomeCard;
