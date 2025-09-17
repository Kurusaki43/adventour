import type { Booking } from "./booking";

export type ResponseSuccess = {
  status: string;
  totalBookings: number;
  data: {
    bookings: Booking[];
  };
};

export type BookingsStatsResponse = {
  status: string;
  year: number;
  data: {
    totalBookings: number;
    totalRevenue: number;
    month: string;
  }[];
};
