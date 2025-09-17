import type { Tour } from "@/features/tours/types/tour";
import type { User } from "@/features/users/types/user.types";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Booking {
  id?: string;
  tour: Partial<Tour>;
  user: Partial<User>;
  peopleCount: number;
  tourStartDate: string;
  price: number;
  status: BookingStatus;
  createdAt: Date;
  receiptUrl?: string;
}
