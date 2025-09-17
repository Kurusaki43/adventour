import { useTours } from "../toursQueries";
import TourCardSkeleton from "@/features/tours/components/TourCardSkeleton";
import TourCard from "@/features/tours/components/TourCard";
import { Pagination } from "@/components/common/Pagination";
import TourListTopBar from "./TourListTopBar";
import { useFilter } from "@/hooks/useFilter";
import DashboardMessage from "@/features/admin/components/DashboardMessage";
import { useState } from "react";

const ToursList = () => {
  const { filter } = useFilter(6);
  const { data, isLoading } = useTours(filter);
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <div className="sm:flex-1 space-y-4">
      <p className="text-xl font-bold mx-auto max-w-[340px] sm:max-w-full ">
        {data?.totalTours || 0} Results Found
      </p>
      <TourListTopBar onSetView={setView} />
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 lg:grid-cols-2 gap-8 place-self-center"
            : "flex flex-col gap-8"
        }
      >
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <TourCardSkeleton key={index} direction="column" />
          ))}

        {!isLoading && data?.data.tours && data?.data.tours.length > 0 && (
          <>
            {data.data.tours.map((tour) => (
              <TourCard
                tour={tour}
                key={tour.id}
                direction={view === "grid" ? "column" : "row"}
              />
            ))}
            <Pagination
              className="mt-14 lg:col-span-2 xl:col-span-2"
              totalDocuments={data?.totalTours || 10}
              documentsPerPage={6}
            />
          </>
        )}
        {!isLoading && data?.data.tours.length === 0 && (
          <DashboardMessage
            type="empty"
            title="No Tourd Found"
            className="col-span-4"
          />
        )}
      </div>
    </div>
  );
};

export default ToursList;
