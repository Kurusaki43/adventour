import { useTours } from "../toursQueries";
import DashboardMessage from "@/features/admin/components/DashboardMessage";
import TourRow from "../components/TourRow";
import { CustomTable } from "@/components/common/CustomTable";
import { Pagination } from "@/components/common/Pagination";
import ToursTableOperations from "../components/ToursTableOperations";
import TourModal from "../components/TourModal";
import ToursCalendar from "../components/ToursCalendar";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useCalendarModal } from "../store/useCalendarModal";
import { useFilter } from "@/hooks/useFilter";

const AdminToursPage = () => {
  const { filter } = useFilter();
  const { openCreate: openCalendar } = useCalendarModal();
  const { data, isLoading, isError } = useTours(filter);

  return (
    <>
      <div className="grid gap-6 w-full border py-8 px-4 sm:px-8 rounded-xl">
        <ToursTableOperations dataList={data?.data.tours || []} />
        {isLoading && (
          <DashboardMessage
            type="loading"
            title="Fetching Tours"
            message="Hold on while we load the latest adventures for you."
          />
        )}
        {!isLoading && isError && (
          <DashboardMessage
            type="error"
            title="Something Went Wrong"
            message={
              "We couldn't load the tours right now. Please try again later or check your connection."
            }
          />
        )}
        {!isLoading && !isError && data?.totalTours === 0 && (
          <DashboardMessage
            type="empty"
            title="No Tours Found"
            message="Looks like you haven’t added any tours yet. Maybe tweak your filters or start creating one!
        
        "
          />
        )}

        {!isLoading && data && data.totalTours > 0 && (
          <>
            <CustomTable
              data={data?.data.tours || []}
              cols={[
                "N°",
                "name",
                "duration",
                "difficulty",
                "price",
                "maxGroupSize",
                "ratingsAverage",
                "status",
                "actions",
              ]}
              renderRow={(item, index) => (
                <TourRow tour={item} index={index} key={item.id} />
              )}
            />
            <Pagination className="mt-4" totalDocuments={data.totalTours} />
            <ToursCalendar tours={data.data.tours} />
          </>
        )}
        <TourModal />
      </div>
      <Button
        onClick={openCalendar}
        className="ml-auto font-semibold absolute top-11 right-0"
      >
        <Calendar />
        Tours Calendar
      </Button>
    </>
  );
};

export default AdminToursPage;
