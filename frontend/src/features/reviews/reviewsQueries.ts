import { useMutation, useQuery } from "@tanstack/react-query";
import type { ReviewQueryOptions } from "./types/reviewQueryOptions";
import { deleteReview, getReviews } from "./reviewsApi";
import toast from "react-hot-toast";
import { queryClient } from "@/shared/api/queryClient";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export const useReviews = (options?: ReviewQueryOptions) => {
  return useQuery({
    queryKey: ["reviews", options],
    queryFn: () => getReviews(options),
    staleTime: 5 * 60 * 1000,
  });
};

export const useDeleteReview = () => {
  return useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: () => {
      toast.success(`Review deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
