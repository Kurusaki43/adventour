import DashboardCard from "@/features/admin/components/DashboardCard";
import { useAuthUser } from "@/features/auth/store/useAuth";
import { formatDate } from "@/features/guides/utils/formatDate";
import { useReviews } from "@/features/reviews/reviewsQueries";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const MyReviews = () => {
  const user = useAuthUser();
  const { data } = useReviews({ user: user?.id });
  return (
    <DashboardCard
      title="My Reviews"
      className="gap-1 relative overflow-hidden"
    >
      <div className="divide-y">
        {data?.reviews.map((review) => (
          <fieldset className="flex flex-col gap-1 p-2 border" key={review.id}>
            <legend>
              Tour:
              <strong className="ml-2">{review.tour.name}</strong>
            </legend>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className="text-sm">
                  &#x2022; Created At : {formatDate(review.createdAt!)}
                </span>
                <span className="capitalize text-lg tracking-wide text-foreground"></span>
                <span className="text-xs">{review.review}</span>
              </div>

              <Link to={`/tours/${review.tour.id}`}>
                <Eye className="size-4" />
              </Link>
            </div>
          </fieldset>
        ))}
      </div>
    </DashboardCard>
  );
};

export default MyReviews;
