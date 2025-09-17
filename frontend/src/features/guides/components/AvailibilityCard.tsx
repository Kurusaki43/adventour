import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import animation from "@/assets/lottie/availibility.json";
import type { IAvailability, User } from "@/features/users/types/user.types";
import DashboardCard from "@/features/admin/components/DashboardCard";
import { Button } from "@/components/ui/button";
import AvailibilitySlot from "@/features/users/components/guides/AvailibilitySlot";
type AvailibilityCardProps = {
  availibilities: IAvailability[];
  user: User;
};

const AvailibilityCard = ({
  availibilities = [],
  user,
}: AvailibilityCardProps) => {
  const navigate = useNavigate();

  return (
    <DashboardCard
      title={`${user.role === "guide" ? "Guide" : "Lead Guide"} Availability`}
      className="gap-1 flex flex-col"
    >
      <div className="flex flex-col gap-2 my-4">
        {availibilities.length === 0 && (
          <div className="flex flex-col justify-center">
            <p className="text-center">Please set Your Availibility</p>
            <Lottie animationData={animation} className="size-40 mx-auto" />
          </div>
        )}
        {availibilities.map((a) => (
          <AvailibilitySlot
            availibility={a}
            readonly
            key={a.day + a.from + a.to}
          />
        ))}
      </div>
      <Button className="self-end mt-auto" onClick={() => navigate("profile")}>
        Manage
      </Button>
    </DashboardCard>
  );
};

export default AvailibilityCard;
