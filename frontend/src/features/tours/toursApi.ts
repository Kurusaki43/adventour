import axiosInstance from "@/shared/api/axios";
import type { TourQueryOptions } from "./types/tourQueryOptions";
import type {
  GetTop5ToursStats,
  GetTourReviewsResponse,
  ResponseGetTour,
  ResponseSuccess,
} from "./types/tourResponseSuccess";
import type { TourData } from "./schema/toursSchema";
import type { CreateReviewData } from "../reviews/reviewSchema";

export const getTours = async (options: TourQueryOptions = {}) => {
  const {
    search,
    page,
    limit,
    status,
    difficulty,
    sort,
    duration,
    maxPrice,
    minPrice,
    rating,
    date,
  } = options;
  // await new Promise((res) => setTimeout(res, 35000));
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (status) params.set("status", status);
  if (rating) params.set("ratingsAverage", rating.toString());
  if (difficulty) params.set("difficulty", difficulty);
  if (duration) params.set("duration", duration);
  if (date) params.set("startDates", date);
  // Price (Mongo-style operators)
  if (minPrice) params.set("price[gte]", `${minPrice}`);
  if (maxPrice) params.set("price[lte]", `${maxPrice}`);

  if (sort) {
    const [field, direction] = sort.split("-");
    const finalSort = direction === "asc" ? field : `-${field}`;
    params.set("sort", finalSort);
  }
  if (page) {
    params.set("page", `${page}`);
  }
  if (limit) {
    params.set("limit", `${limit}`);
  }

  const queryString = params.toString();

  const response = await axiosInstance.get<ResponseSuccess>(
    `/tours?${queryString}`
  );

  return response.data;
};

type TourWithId = TourData & { id?: string };

export const mutateTour = async (data: TourWithId) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("price", String(data.price));
  if (data.priceDiscount !== undefined) {
    formData.append("priceDiscount", String(data.priceDiscount));
  }
  formData.append("duration", String(data.duration));
  formData.append("durationUnit", data.durationUnit);
  formData.append("status", data.status);
  formData.append("difficulty", data.difficulty);
  formData.append("summary", data.summary);
  formData.append("description", data.description);
  formData.append("maxGroupSize", String(data.maxGroupSize));

  if (data.ratingsAverage !== undefined)
    formData.append("ratingsAverage", String(data.ratingsAverage));
  if (data.ratingsQuantity !== undefined)
    formData.append("ratingsQuantity", String(data.ratingsQuantity));
  if (data.leadGuide) formData.append("leadGuide", data.leadGuide);

  if (Array.isArray(data.guides)) {
    data.guides.forEach((guideId) => {
      formData.append("guides[]", guideId);
    });
  }
  if (Array.isArray(data.locations)) {
    data.locations.forEach((location) => {
      formData.append("locations[]", JSON.stringify(location));
    });
  }
  if (data.startDates?.length) {
    const dates = data.startDates.map((d) =>
      typeof d.date === "string" ? d.date : d.date.toISOString()
    );
    dates.forEach((date) => {
      formData.append("startDates[]", date);
    });
  }

  if (data.imageCover instanceof File) {
    formData.append("imageCover", data.imageCover);
  } else if (typeof data.imageCover === "string") {
    formData.append("imageCover", data.imageCover); // send old filename
  }

  if (Array.isArray(data.images)) {
    data.images.forEach((img) => {
      if (img instanceof File) {
        formData.append("images", img);
      } else if (typeof img === "string") {
        formData.append("images", img); // old filename
      }
    });
  }

  const isUpdate = "id" in data;
  const url = isUpdate ? `/tours/${data.id}` : "/tours";
  const method = isUpdate ? axiosInstance.patch : axiosInstance.post;

  const res = await method(url, formData);
  return res.data;
};

export const deleteTour = async (id: string) => {
  await axiosInstance.delete(`/tours/${id}`);
};

export const getTour = async (id: string) => {
  const res = await axiosInstance.get<ResponseGetTour>(`/tours/${id}`);
  return res.data.data.tour;
};

export const getTopFive = async () => {
  const response = await axiosInstance.get<Omit<ResponseSuccess, "totalTours">>(
    `/tours/top-5-cheap`
  );
  return response.data;
};

export const getTourReviews = async (id: string) => {
  const res = await axiosInstance.get<GetTourReviewsResponse>(
    `/tours/${id}/reviews`
  );
  return res.data;
};

export const createTourReview = async (
  tourId: string,
  data: CreateReviewData,
  reviewId?: string
) => {
  const isUpdate = !!reviewId;
  const url = isUpdate
    ? `/tours/${tourId}/reviews/${reviewId}`
    : `/tours/${tourId}/reviews`;
  const method = isUpdate ? axiosInstance.patch : axiosInstance.post;
  await method(url, data);
};

export const deleteTourReview = async (tourId: string, reviewId: string) => {
  await axiosInstance.delete(`/tours/${tourId}/reviews/${reviewId}`);
};

export const getTopFiveToursStats = async () => {
  const res = await axiosInstance.get<GetTop5ToursStats>("/tours/top-5-stats");
  return res.data.data;
};
