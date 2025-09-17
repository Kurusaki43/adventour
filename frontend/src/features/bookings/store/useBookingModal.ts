import { createEntityModal } from "@/shared/store/modal";
import type { Booking } from "../types/booking";

export const useBookingModal = createEntityModal<Booking>();
