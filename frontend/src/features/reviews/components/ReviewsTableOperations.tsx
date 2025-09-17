import SearchFilter from "@/features/admin/components/SearchFilter";
import SortBy from "@/components/common/SortBy";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useFilter } from "@/hooks/useFilter";

const ReviewsTableOperations = () => {
  const { handleResetAll } = useFilter();

  return (
    <div className="flex flex-wrap gap-4 items-end justify-center">
      <SearchFilter placeholder="by review content" />

      <SortBy
        defaultValue="createdAt-desc"
        options={[
          { value: "createdAt-desc", label: "Newest First" },
          { value: "createdAt-asc", label: "Oldest First" },
          { value: "review-asc", label: "Review: A -> Z" },
          { value: "review-desc", label: "Review: Z -> A" },
          { value: "rating-asc", label: "Rating: Low -> High" },
          { value: "rating-desc", label: "Rating: High -> Low" },
        ]}
      />

      <Button size="default" variant="ghost" onClick={handleResetAll}>
        <XIcon />
        Reset Filters
      </Button>
    </div>
  );
};

export default ReviewsTableOperations;
