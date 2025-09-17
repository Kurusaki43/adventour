import SortBy from "@/components/common/SortBy";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
const TourListTopBar = ({
  onSetView,
}: {
  onSetView: (val: "list" | "grid") => void;
}) => {
  return (
    <div className="border text-muted-foreground gap-4 font-semibold p-4 rounded-2xl mx-auto max-w-[320px] sm:max-w-full flex flex-col items-center justify-between sm:flex-row">
      <div className="flex flex-col md:flex-row items-center gap-4">
        Sort By
        <SortBy
          showLabel={false}
          defaultValue="createdAt-desc"
          options={[
            { value: "createdAt-desc", label: "Newest First" },
            { value: "createdAt-asc", label: "Oldest First" },
            { value: "price-asc", label: "Price: Low → High" },
            { value: "price-desc", label: "Price: High → Low" },
            { value: "maxGroupSize-asc", label: "Group Size: Small → Large" },
            { value: "maxGroupSize-desc", label: "Group Size: Large → Small" },
            { value: "ratingsAverage-asc", label: "Rating: Low → High" },
            { value: "ratingsAverage-desc", label: "Rating: High → Low  " },
            { value: "ratingsQuantity-asc", label: "Reviews: Low → High" },
            { value: "ratingsQuantity-desc", label: "Reviews: High → Low" },
          ]}
        />
      </div>
      <div className="items-center gap-1 hidden lg:flex">
        <Button variant="ghost" onClick={() => onSetView("grid")}>
          <Grid className="size-6" />
        </Button>
        <Button variant="ghost" onClick={() => onSetView("list")}>
          <List className="size-6" />
        </Button>
      </div>
    </div>
  );
};

export default TourListTopBar;
