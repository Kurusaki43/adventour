import axiosInstance from "@/shared/api/axios";
import type { BookingQueryOptions } from "./types/bookingQueryOptions";
import type {
  BookingsStatsResponse,
  ResponseSuccess,
} from "./types/responseSuccess";
import type { CreateBookingData, UpdateBookingData } from "./bookingSchema";

export const getBookings = async (options: BookingQueryOptions = {}) => {
  const { search, page, limit, status, sort } = options;

  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (status) params.set("status", status);

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
    `/bookings?${queryString}`
  );
  return {
    bookings: response.data.data.bookings,
    totalBookings: response.data.totalBookings,
  };
};

export const mutateBooking = async (
  data: CreateBookingData | UpdateBookingData
) => {
  const isUpdate = "id" in data;
  const url = isUpdate ? `/bookings/${data.id}` : `/bookings`;
  const method = isUpdate ? axiosInstance.patch : axiosInstance.post;
  const res = await method(url, data);
  return res.data;
};

export const getBookingStats = async (year?: number | string) => {
  const res = await axiosInstance.get<BookingsStatsResponse>(
    `/bookings/monthly-stats?${year}`
  );
  return res.data;
};
