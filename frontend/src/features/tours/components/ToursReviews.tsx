import { Rating } from "@smastrom/react-rating";
import type { PopulatedTour, Tour } from "../types/tour";
import { getPluralOfWord } from "../utils/getPluralOfWord";
import SortBy from "@/components/common/SortBy";
import { Label } from "@/components/ui/label";
import { useTourReviews } from "../toursQueries";
import { useAuthUser } from "@/features/auth/store/useAuth";
import ReviewForm from "@/features/reviews/components/ReviewForm";
import { Link, useLocation } from "react-router-dom";
import Review from "@/features/reviews/components/Review";

const ToursReviews = ({ tour }: { tour: Tour | PopulatedTour }) => {
  const location = useLocation();
  const user = useAuthUser();
  const { data } = useTourReviews(tour.id!);
  const isFirstReview = data?.data.reviews.find((r) => r.user.id === user?.id);
  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex items-center flex-row gap-2">
          <span className="font-bold capitalize">
            {tour.ratingsQuantity}{" "}
            {getPluralOfWord("review", tour.ratingsQuantity!)}
          </span>
          <Rating value={tour.ratingsAverage!} className="max-w-20" readOnly />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="font-semibold tracking-wide text-base">
            Sort By
          </Label>
          <SortBy
            defaultValue="createdAt-desc"
            showLabel={false}
            options={[
              { value: "createdAt-desc", label: "Newest First" },
              { value: "createdAt-asc", label: "Oldest First" },
              { value: "review-asc", label: "Review: A -> Z" },
              { value: "review-desc", label: "Review: Z -> A" },
              { value: "rating-asc", label: "Rating: Low -> High" },
              { value: "rating-desc", label: "Rating: High -> Low" },
            ]}
          />
        </div>
      </div>
      <hr className="my-6" />
      <div className="flex flex-col gap-6">
        {data?.data.reviews.map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>
      {!user && (
        <p className="mb-2 text-sm font-medium mt-2 text-muted-foreground">
          You need to be logged in to leave a review.
          <Link
            to="/login"
            className="ml-2 font-semibold text-black"
            state={{ from: location.pathname, tourId: tour.id }}
          >
            Login
          </Link>
        </p>
      )}
      {user && user.role === "client" && !isFirstReview && <ReviewForm />}
    </div>
  );
};

export default ToursReviews;
