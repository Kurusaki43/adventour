import { useAuthUser } from "@/features/auth/store/useAuth";
import WelcomeCard from "../components/WelcomeCard";
import AvailibilityCard from "../components/AvailibilityCard";
import UpComingTourCard from "../components/UpComingTourCard";
import MessagesCard from "../components/MessagesCard";
import type { Tour } from "@/features/tours/types/tour";

const Dashboard = () => {
  const user = useAuthUser();
  const tours: Tour[] = [];
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2">
      <WelcomeCard
        content={
          user?.guideProfile?.profileCompleted
            ? "You can update and tweak your profile"
            : "Make sure you complete your profile."
        }
      />
      <AvailibilityCard
        availibilities={user?.guideProfile?.availability || []}
        user={user!}
      />
      <UpComingTourCard tours={tours} />
      <MessagesCard />
    </div>
  );
};

export default Dashboard;
