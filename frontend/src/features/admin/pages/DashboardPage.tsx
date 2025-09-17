import BookingsChart from "../components/BookingsChart";
import LastBookingsCard from "../components/LastBookingsCard";
import { BookingsStat } from "../components/statistics/BookingsStat";
import { RevenueStat } from "../components/statistics/RevenueStat";
import { ToursStat } from "../components/statistics/ToursStat";
import { UsersStat } from "../components/statistics/UsersStat";
import TopFiveTours from "../components/TopFiveTours";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-4 xl:gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 xl:gap-8">
        <ToursStat />
        <UsersStat />
        <BookingsStat />
        <RevenueStat />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-8">
        <TopFiveTours />
        <LastBookingsCard />
        <BookingsChart />
      </div>
    </div>
  );
};

export default DashboardPage;
