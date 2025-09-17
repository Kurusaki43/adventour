import UpComingTourCard from "@/features/guides/components/UpComingTourCard";
import WelcomeCard from "@/features/guides/components/WelcomeCard";
import MyBookingsCard from "../../components/clients/MyBookingsCard";
import MyReviews from "../../components/clients/MyReviews";
import { useBookings } from "@/features/bookings/bookingsQueries";

const ClientDashboard = () => {
  const { data } = useBookings();
  const tours = data?.bookings
    .filter((b) => new Date(b.tourStartDate) > new Date())
    .sort(
      (a, b) =>
        new Date(a.tourStartDate).getTime() -
        new Date(b.tourStartDate).getTime()
    )
    .map((booking) => booking.tour);
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2 items-start py-2">
      <UpComingTourCard tours={tours || []} />
      <WelcomeCard />
      <MyBookingsCard />
      <MyReviews />
    </div>
  );
};

export default ClientDashboard;
