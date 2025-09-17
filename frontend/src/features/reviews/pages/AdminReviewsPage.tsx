import ReviewsTableOperations from "../components/ReviewsTableOperations";
import { useReviews } from "../reviewsQueries";
import DashboardMessage from "@/features/admin/components/DashboardMessage";
import { CustomTable } from "@/components/common/CustomTable";
import ReviewRow from "../components/ReviewRow";
import { Pagination } from "@/components/common/Pagination";
import { useFilter } from "@/hooks/useFilter";

const AdminReviewsPage = () => {
  const { filter } = useFilter();
  const { data, isLoading, isError } = useReviews(filter);

  return (
    <div className="grid gap-6 w-full border py-8 px-4 sm:px-8 rounded-xl">
      <ReviewsTableOperations />
      {isLoading && (
        <DashboardMessage
          type="loading"
          title="Fetching Reviews"
          message="Hold on while we load the reviews for you."
        />
      )}
      {!isLoading && isError && (
        <DashboardMessage
          type="error"
          title="Something Went Wrong"
          message={
            "We couldn't load the reviews right now. Please try again later or check your connection."
          }
        />
      )}
      {!isLoading && !isError && data?.reviews.length === 0 && (
        <DashboardMessage
          type="empty"
          title="No Reviews Found"
          message="No reviews found. Once clients start adding them, they’ll appear here.
        
        "
        />
      )}

      {!isLoading && data && data.reviews.length > 0 && (
        <>
          <CustomTable
            data={data?.reviews || []}
            cols={["N°", "tour", "user", "review", "rating", "createdAt", ""]}
            renderRow={(item, index) => (
              <ReviewRow review={item} index={index} key={item.id} />
            )}
          />
          <Pagination
            className="mt-4"
            totalDocuments={data?.totalReviews || 1}
          />
        </>
      )}
    </div>
  );
};

export default AdminReviewsPage;
