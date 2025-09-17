import axiosInstance from "@/shared/api/axios";
import type { ReviewQueryOptions } from "./types/reviewQueryOptions";
import type { ResponseSuccess } from "./types/responseSuccess";

export const getReviews = async (options: ReviewQueryOptions = {}) => {
  const {
    search,
    page = 1,
    limit = Number(import.meta.env.VITE_LIMIT_PER_PAGE || 10),
    rating,
    sort,
    user,
  } = options;

  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (rating) params.set("rating", rating);
  if (user) params.set("user", user);

  if (sort) {
    const [field, direction] = sort.split("-");
    const finalSort = direction === "asc" ? field : `-${field}`;
    params.set("sort", finalSort);
  }

  params.set("page", `${page}`);
  params.set("limit", `${limit}`);

  const queryString = params.toString();

  const response = await axiosInstance.get<ResponseSuccess>(
    `/reviews?${queryString}`
  );
  return {
    reviews: response.data.data.reviews,
    totalReviews: response.data.totalReviews,
  };
};

export const deleteReview = async (id: string) => {
  await new Promise((res) => setTimeout(res, 5000));
  await axiosInstance.delete(`/reviews/${id}`);
};
