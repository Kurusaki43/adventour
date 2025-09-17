import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createTourReview,
  deleteTour,
  deleteTourReview,
  getTopFive,
  getTopFiveToursStats,
  getTour,
  getTourReviews,
  getTours,
  mutateTour,
} from "./toursApi";
import type { TourQueryOptions } from "./types/tourQueryOptions";
import toast from "react-hot-toast";
import { queryClient } from "@/shared/api/queryClient";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import type { Tour } from "./types/tour";
import type { CreateReviewData } from "../reviews/reviewSchema";

export const useTours = (options?: TourQueryOptions) => {
  return useQuery({
    queryKey: ["tours", options],
    queryFn: () => getTours(options),
    staleTime: 5 * 60 * 1000,
  });
};

export const useMutateTour = (
  mode: "CREATE" | "UPDATE",
  onSuccess?: () => void
) => {
  const { mutate: createUpdateTour, isPending } = useMutation({
    mutationFn: mutateTour,
    onSuccess: () => {
      toast.success(
        `tour ${mode === "CREATE" ? "added" : "updated"} successfully`
      );
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error), {
        duration: 10000,
      });
    },
  });
  return { createUpdateTour, isPending };
};

export const useDeleteTour = (tour: Tour) => {
  return useMutation({
    mutationFn: (id: string) => deleteTour(id),
    onSuccess: () => {
      toast.success(`${tour.name} tour deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const usePopularTours = () => {
  return useQuery({
    queryKey: ["popular-tours"],
    queryFn: () => getTopFive(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTour = (id?: string) => {
  return useQuery({
    queryKey: ["tour", id],
    queryFn: () => getTour(id!),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};

export const useTourReviews = (id: string) => {
  return useQuery({
    queryKey: ["tour-reviews", id],
    queryFn: () => getTourReviews(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};

export const useMutateTourReview = (onSuccessFn?: () => void) => {
  return useMutation({
    mutationFn: ({
      tourId,
      data,
      reviewId,
    }: {
      tourId: string;
      data: CreateReviewData;
      reviewId?: string;
    }) => createTourReview(tourId, data, reviewId),

    onSuccess: () => {
      onSuccessFn?.();
      queryClient.invalidateQueries({ queryKey: ["tour"] });
      queryClient.invalidateQueries({ queryKey: ["tour-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },

    onError: (error: unknown) => {
      toast.error(getErrorMessage(error), { position: "bottom-center" });
    },
  });
};

export const useDeleteTourReview = () => {
  return useMutation({
    mutationFn: ({ tourId, reviewId }: { tourId: string; reviewId: string }) =>
      deleteTourReview(tourId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tour"] });
      queryClient.invalidateQueries({ queryKey: ["tour-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },

    onError: (error: unknown) => {
      toast.error(getErrorMessage(error), { position: "bottom-center" });
    },
  });
};

export const useTop5ToursStats = () => {
  return useQuery({
    queryKey: ["top-5-tours-stats"],
    queryFn: getTopFiveToursStats,
    staleTime: 5 * 60 * 1000,
  });
};
