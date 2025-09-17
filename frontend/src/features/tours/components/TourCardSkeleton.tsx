import { Skeleton } from "@/components/ui/skeleton";

const TourCardSkeleton = ({
  direction = "row",
}: {
  direction?: "row" | "column";
}) => {
  return (
    <div
      className={`flex space-y-3 gap-4   ${
        direction === "row"
          ? "flex-row items-center"
          : "flex-col min-h-[350px] min-w-[300px] w-full"
      }`}
    >
      <Skeleton
        className={`h-52 rounded-xl ${direction === "row" ? "w-64" : "w-full"}`}
      />
      <div className={`${direction === "row" ? "w-full" : "w-auto"}`}>
        <Skeleton className="h-6 w-[70%] mb-4" />
        <div className="space-y-3 flex justify-between items-center my-2">
          <Skeleton className="h-4 w-[74px]" />
          <Skeleton className="h-4 w-[74px]" />
        </div>
        <div className="space-y-2 flex justify-between items-center my-2">
          <Skeleton className="h-4 w-[110px]" />
          <Skeleton className="h-4 w-[74px]" />
        </div>

        <div className="space-y-2 flex justify-between items-center mt-4">
          <Skeleton className="h-8 w-[74px] rounded-full" />
          <Skeleton className="h-4 w-[74px]" />
        </div>
      </div>
    </div>
  );
};

export default TourCardSkeleton;
