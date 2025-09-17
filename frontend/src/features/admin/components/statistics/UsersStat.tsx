import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/features/users/userQueries";
import StatisticCard from "../StatisticCard";
import { HiOutlineUsers } from "react-icons/hi2";

export const UsersStat = () => {
  const { data, isPending } = useUsers();
  if (isPending) return <Skeleton className="w-full h-24" />;
  return (
    <StatisticCard
      title="users"
      value={data?.totalUsers || 0}
      icon={HiOutlineUsers}
      color="chart-2"
    />
  );
};
