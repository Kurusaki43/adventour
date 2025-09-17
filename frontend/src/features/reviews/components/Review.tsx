import { Button } from "@/components/ui/button";
import { Edit, Loader, Trash } from "lucide-react";
import type { Review as ReviewT } from "../types/review";
import { Rating } from "@smastrom/react-rating";
import { formatDate } from "@/features/guides/utils/formatDate";
import { useState } from "react";
import ReviewForm from "./ReviewForm";
import { useParams } from "react-router-dom";
import { useAuthUser } from "@/features/auth/store/useAuth";
import { useDeleteTourReview } from "@/features/tours/toursQueries";

type ReviewProps = {
  review: ReviewT;
};
const Review = ({ review }: ReviewProps) => {
  const [edited, setEdited] = useState(false);
  const { id } = useParams();
  const user = useAuthUser();
  const isReviewForCurrentUser = user?.id === review.user.id;
  const { mutate: deleteReview, isPending } = useDeleteTourReview();
  const handleFinishEdited = () => {
    setEdited(false);
  };
  return !edited ? (
    <div
      key={review.id}
      className="flex flex-row gap-2 items-start border-b pb-4"
    >
      <div className="flex flex-col gap-2 items-center flex-1 border-gray-100 min-w-24">
        <img
          src={`/uploads/users/${review.user.avatar}`}
          className="size-10 rounded-full border border-gray-300"
        />
        <span className="font-semibold capitalize tracking-wide text-sm text-center ">
          {review.user.name}
        </span>
      </div>
      <div className="flex flex-col gap-2 items-start flex-6">
        <p className="text-muted-foreground font-light">{review.review}</p>
        <div className="flex items-center justify-between w-full">
          <div>
            <Rating value={review.rating} className="max-w-24 mt-2" readOnly />
            <span className="text-gray-500 text-xs">
              {formatDate(review.createdAt!)}
            </span>
          </div>
          {isReviewForCurrentUser && (
            <div>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setEdited(true)}
              >
                <Edit />
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() =>
                  deleteReview({ tourId: id!, reviewId: review.id })
                }
              >
                {!isPending ? <Trash /> : <Loader className="animate-spin" />}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <ReviewForm editedReview={review} onSuccess={handleFinishEdited} />
  );
};

export default Review;
