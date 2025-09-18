import { useTour } from "../toursQueries";
import TourBanner from "../components/TourBanner";
import { Images, Map, Users } from "lucide-react";
import { TourImagesCarousel } from "../components/ToursImagesCarousel";
import TourLocationsPreview from "../components/TourLocationsPreview";
import TourBasicInformations from "../components/TourBasicInformations";
import TourGuides from "../components/TourGuides";
import ToursReviews from "../components/ToursReviews";
import { useParams } from "react-router-dom";
import ClientBookingForm from "@/features/bookings/components/ClientBookingForm";
import TourDetailSkeleton from "../components/TourDetailSkeleton";

const PublicTourDetailPage = () => {
  const { id } = useParams();
  const { data: tour, isPending } = useTour(id);

  return (
    <>
      <section className="-mt-[149px] bg-[url(/images/hero-0-bg.jpg)] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black  to-[#334155] opacity-40" />
        <div className="container mx-auto relative z-10 grid place-content-center gap-8 px-2 min-h-[350px]">
          <div className="flex flex-col gap-4 items-center justify-center text-center ">
            <h1 className="text-white font-bold text-[clamp(30px,4vw,54px)] max-w-2xl leading-snug">
              Show Tour Details
            </h1>
          </div>
        </div>
      </section>
      <div className="min-h-24 w-full flex items-center justify-center">
        {isPending && <TourDetailSkeleton />}
        {!isPending && tour && (
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 main-container py-14 lg:items-start items-center w-full">
            <div className="lg:w-[70%] w-full">
              <TourBanner
                name={tour.name}
                image={tour.imageCover}
                price={tour.price}
                priceDiscount={tour.priceDiscount}
              />
              <TourBasicInformations tour={tour} />
              <hr className="my-8" />
              {/*Photos */}
              <div className="space-y-4">
                <h2 className="flex items-center gap-2 font-semibold capitalize tracking-wide text-xl">
                  <Images />
                  Photos
                </h2>

                <TourImagesCarousel
                  images={[...tour.images!, tour.imageCover]}
                />
                {/*summary */}
                <div className="text-sm tracking-wide space-y-2 mt-10">
                  {tour.summary.split("\n").map((para, i) => (
                    <p key={i} className="text-gray-700 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
              <hr className="my-8" />
              {/*Map & Locations */}
              <div className="space-y-4">
                <h2 className="flex items-center gap-2 font-semibold capitalize tracking-wide text-xl">
                  <Map />
                  Map & Locations
                </h2>

                <TourLocationsPreview locations={tour.locations} />
              </div>
              <hr className="my-8" />
              {/*Guides */}
              <div className="space-y-4">
                <h2 className="flex items-center gap-2 font-semibold capitalize tracking-wide text-xl">
                  <Users />
                  Guides
                </h2>

                <TourGuides
                  guidesIds={[
                    ...tour.guides.map((g) => g.id!),
                    tour.leadGuide.id!,
                  ]}
                />
              </div>
              <hr className="mt-8 mb-6" />
              {/*Reviews */}
              <ToursReviews tour={tour} />
            </div>
            {/*Booking side bar */}
            <div className="flex flex-col w-full max-w-[350px] lg:max-w-full lg:w-[30%] p-4 lg:p-8 shadow-xs border mt-12 lg:mt-0">
              <h2 className="font-bold text-2xl text-center mb-3">Book Now</h2>
              {<ClientBookingForm tour={tour} />}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PublicTourDetailPage;
