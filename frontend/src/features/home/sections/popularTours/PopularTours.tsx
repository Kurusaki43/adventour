import TourCard from "../../../tours/components/TourCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePopularTours } from "@/features/tours/toursQueries";
import Carousel from "@/components/common/Carousel";
import TourCardSkeleton from "../../../tours/components/TourCardSkeleton";

const PopularTours = () => {
  const { data, isLoading, isError } = usePopularTours();
  const tours = data?.data.tours || [];

  return (
    <section>
      <div className="main-container flex flex-col items-center">
        <h2 className="section-title self-start">Find our Popular Tours</h2>

        {/* Loading */}
        {isLoading && (
          <Carousel
            items={Array.from({ length: 3 })}
            render={() => <TourCardSkeleton />}
            showButtons={false}
          />
        )}

        {/* Error */}
        {isError && (
          <p className="font-light text-muted-foreground mt-6 capitalize">
            ⚠️ Failed to load popular tours. ⚠️
          </p>
        )}

        {/* Tours */}
        {!isLoading && !isError && tours.length > 0 && (
          <Carousel items={tours} render={(item) => <TourCard tour={item} />} />
        )}

        {/* Empty */}
        {!isLoading && !isError && tours.length === 0 && (
          <p className="text-muted-foreground mt-6 font-light capitalize">
            No popular tours available right now.
          </p>
        )}

        {/* Explore all tours button */}
        <Link to="/tours">
          <Button
            className="mt-14 font-bold uppercase rounded-full tracking-wider py-6 flex items-center"
            size="lg"
          >
            Explore All Tours
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default PopularTours;
