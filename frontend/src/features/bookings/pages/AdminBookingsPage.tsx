import DashboardMessage from "@/features/admin/components/DashboardMessage";
import { useBookings } from "../bookingsQueries";
import BookingsTableOperations from "../components/BookingsTableOperations";
import { CustomTable } from "@/components/common/CustomTable";
import BookingRow from "../components/BookingRow";
import { Pagination } from "@/components/common/Pagination";
import BookingModal from "../components/BookingModal";
import { useFilter } from "@/hooks/useFilter";

const AdminBookingsPage = () => {
  const { filter } = useFilter();
  const { data, isLoading, isError } = useBookings(filter);

  return (
    <div className="grid gap-6 w-full border py-8 px-4 sm:px-8 rounded-xl">
      <BookingsTableOperations />
      {isLoading && (
        <DashboardMessage
          type="loading"
          title="Fetching Bookings"
          message="Hold on while we load the bookings."
        />
      )}
      {!isLoading && isError && (
        <DashboardMessage
          type="error"
          title="Something Went Wrong"
          message={
            "We couldn't load the bookings right now. Please try again later or check your connection."
          }
        />
      )}
      {!isLoading && !isError && data?.totalBookings === 0 && (
        <DashboardMessage
          type="empty"
          title="No Bookings Found"
          message="Looks like you haven’t added any bookings yet. Maybe tweak your filters or start creating one!
        
        "
        />
      )}

      {!isLoading && data && data.totalBookings > 0 && (
        <>
          <CustomTable
            data={data?.bookings || []}
            cols={[
              "N°",
              "tour",
              "user",
              "peopleCount",
              "price",
              "bookingStatus",
              "tourStartDate",
              "",
            ]}
            renderRow={(item, index) => (
              <BookingRow booking={item} index={index} key={item.id} />
            )}
          />
          <Pagination
            className="mt-4"
            totalDocuments={data?.totalBookings || 1}
          />
        </>
      )}
      <BookingModal />
    </div>
  );
};

export default AdminBookingsPage;
