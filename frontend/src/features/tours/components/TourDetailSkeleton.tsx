import { Skeleton } from "@/components/ui/skeleton";

const TourDetailSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 main-container py-14 lg:items-start items-center w-full">
      <div className="lg:w-[70%] w-full flex flex-col gap-24">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-[420px]" />
          <Skeleton className="w-64 h-6" />
          <Skeleton className="w-32 h-6" />
          <Skeleton className="h-32 w-full" />
        </div>

        {/*Photos */}
        <div className="flex flex-col gap-2">
          <Skeleton className="w-32 h-6 mb-4" />
          <Skeleton className="w-full h-[450px]" />
        </div>

        {/*Map & Locations */}
        <div className="space-y-4">
          <Skeleton className="w-32 h-6 mb-4" />
          <Skeleton className="w-full h-[450px]" />
        </div>

        {/*Guides */}
        <div className="space-y-4">
          <Skeleton className="w-32 h-6 mb-4" />
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:justify-center">
            <Skeleton className="h-64 w-64" />
            <Skeleton className="h-64 w-64" />
            <Skeleton className="h-64 w-64" />
          </div>
        </div>

        {/*Reviews */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-10">
            <Skeleton className="size-24 shrink-0 rounded-full" />
            <Skeleton className="w-full h-32" />
          </div>
          <div className="flex flex-row items-center gap-10">
            <Skeleton className="size-24 shrink-0 rounded-full" />
            <Skeleton className="w-full h-32" />
          </div>
        </div>
      </div>
      {/*Booking side bar */}
      <div className="flex flex-col w-full max-w-[350px] lg:max-w-full lg:w-[30%] mt-14 lg:mt-0">
        <Skeleton className="w-32 h-6 mb-4" />
        <Skeleton className="w-full h-96" />
      </div>
    </div>
  );
};

export default TourDetailSkeleton;
