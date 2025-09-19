import { useParams } from "react-router-dom";
import { useGuideTours } from "../guidesQueries";
import TourCardSkeleton from "@/features/tours/components/TourCardSkeleton";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import TourCard from "@/features/tours/components/TourCard";
import { useWindowWidth } from "@/hooks/useWindowWidth";

const GuideAssignedToursList = () => {
  const { id } = useParams();
  const { data, isPending, isError, error } = useGuideTours(id!);
  const width = useWindowWidth();

  return (
    <div className="flex flex-col gap-2">
      {isPending && <TourCardSkeleton />}
      {!isPending && isError && (
        <p className="text-xs font-light">{getErrorMessage(error)}</p>
      )}
      {!isPending && data?.totalTours === 0 && (
        <p className="text-xs font-light">No Tours found</p>
      )}
      {!isPending &&
        data?.data.tours.map((t) => (
          <TourCard
            tour={t}
            key={t.id}
            direction={width < 600 ? "column" : "row"}
          />
        ))}
    </div>
  );
};

export default GuideAssignedToursList;
