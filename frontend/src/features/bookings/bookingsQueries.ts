import { useMutation, useQuery } from "@tanstack/react-query";
import { getBookings, getBookingStats, mutateBooking } from "./bookingApi";
import type { BookingQueryOptions } from "./types/bookingQueryOptions";
import toast from "react-hot-toast";
import { queryClient } from "@/shared/api/queryClient";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import { useBookingModal } from "./store/useBookingModal";

export const useBookings = (options?: BookingQueryOptions) => {
  return useQuery({
    queryKey: ["bookings", options],
    queryFn: () => getBookings(options),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useMutateBookings = (onSuccessFn?: () => void) => {
  const { closeModal } = useBookingModal();
  const { mutate: createUpdateBooking, isPending } = useMutation({
    mutationFn: mutateBooking,
    onSuccess: () => {
      onSuccessFn?.();
      toast.success(`Booking mutated successfully`, {
        position: "bottom-right",
      });
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error), {
        duration: 10000,
      });
    },
  });

  return { createUpdateBooking, isPending };
};

export const useBookingsStats = (year?: number | string) => {
  return useQuery({
    queryKey: ["bookings-stats", year],
    queryFn: () => getBookingStats(year),
    staleTime: 5 * 60 * 1000,
  });
};
