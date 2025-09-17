import DashboardCard from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/primitives/button";

const ExploreTours = () => {
  return (
    <DashboardCard title="Explore tours">
      <div className="flex gap-4 justify-center">
        <Button className="capitalize bg-chart-2/80 hover:bg-chart-2/90 text-white font-semibold">
          cultural
        </Button>
        <Button className="capitalize bg-chart-3/80 hover:bg-chart-3/90 text-white font-semibold">
          adventure
        </Button>
        <Button className="capitalize bg-chart-4/80 hover:bg-chart-4/90 text-white font-semibold">
          Relaxation
        </Button>
      </div>
    </DashboardCard>
  );
};

export default ExploreTours;
