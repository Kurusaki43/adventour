import DashboardCard from "@/features/admin/components/DashboardCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Tour } from "@/features/tours/types/tour";

const UpComingTourCard = ({ tours }: { tours: Partial<Tour>[] | Tour[] }) => {
  return (
    <DashboardCard title={`Upcoming Tours`} className="gap-1 relative">
      <ul className="divide-y overflow-auto">
        {tours.length === 0 && <p>No tours assigned to you yet</p>}
        {tours.length > 0 &&
          tours.map((tour) => (
            <li className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 py-2">
                <img
                  src={`/uploads/tours/${tour.imageCover}`}
                  className="size-14"
                />

                <span className="capitalize font-semibold text-foreground text-sm tracking-wide">
                  {tour?.name}
                </span>
              </div>
              <Link to={`/tours/${tour.id}`}>
                <Button size={"sm"} variant={"ghost"}>
                  view
                </Button>
              </Link>
            </li>
          ))}
      </ul>
    </DashboardCard>
  );
};

export default UpComingTourCard;
