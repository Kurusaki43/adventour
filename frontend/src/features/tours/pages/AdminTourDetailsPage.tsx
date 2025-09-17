import { useLocation, type Location } from "react-router-dom";
import TourBanner from "../components/TourBanner";
import TourDescription from "../components/TourDescription";
import TourGuides from "../components/TourGuides";
import TourInformations from "../components/TourInformations";
import TourLocationsPreview from "../components/TourLocationsPreview";
import TourSummary from "../components/TourSummary";
import type { Tour } from "../types/tour";

type TourLocationState = {
  tour: Tour;
};
const AdminTourDetailsPage = () => {
  const location = useLocation() as Location & {
    state: TourLocationState;
  };
  const tour = location?.state.tour as Tour;
  return (
    <div className="grid gap-4 max-w-4xl w-full mx-auto">
      <TourBanner
        name={tour.name}
        price={tour.price}
        image={tour.imageCover}
        priceDiscount={tour.priceDiscount}
      />
      <TourSummary summary={tour.summary} />
      <div className="flex flex-col sm:flex-row gap-6 sm:[&>*]:flex-1">
        <TourInformations tour={tour} />
        <TourGuides guidesIds={[tour.leadGuide, ...tour.guides]} />
      </div>
      <TourDescription description={tour.description} />
      <TourLocationsPreview locations={tour.locations} />
    </div>
  );
};

export default AdminTourDetailsPage;
