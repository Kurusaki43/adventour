import DashboardCard from "@/features/admin/components/DashboardCard";
import { useAuthUser } from "@/features/auth/store/useAuth";
import { formatDate } from "@/features/guides/utils/formatDate";
import { useReviews } from "@/features/reviews/reviewsQueries";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const MyReviews = () => {
  const user = useAuthUser();
  const { data, isLoading, isError } = useReviews({ user: user?.id });

  const reviews = data?.reviews ?? [];

  let content;
  if (isLoading) {
    content = <p className="text-sm text-muted-foreground">Loading...</p>;
  } else if (isError) {
    content = <p className="text-sm text-red-500">Failed to load reviews.</p>;
  } else if (reviews.length === 0) {
    content = <p className="text-sm text-muted-foreground">No reviews yet.</p>;
  } else {
    content = reviews.map((review) => (
      <fieldset
        className="flex flex-col gap-1 p-2 border rounded-md"
        key={review.id}
      >
        <legend className="text-sm font-medium">
          Tour: <strong className="ml-1">{review.tour.name}</strong>
        </legend>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">
              • Created At: {formatDate(review.createdAt!)}
            </span>
            <span className="text-xs">{review.review}</span>
          </div>
          <Link
            to={`/tours/${review.tour.id}`}
            className="text-blue-500 hover:text-blue-700"
          >
            <Eye className="size-4" />
          </Link>
        </div>
      </fieldset>
    ));
  }

  return (
    <DashboardCard
      title="My Reviews"
      className="gap-1 relative overflow-hidden"
    >
      <div className="divide-y">{content}</div>
    </DashboardCard>
  );
};

export default MyReviews;
