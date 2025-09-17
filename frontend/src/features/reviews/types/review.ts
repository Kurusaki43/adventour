import type { Tour } from "@/features/tours/types/tour";
import type { User } from "@/features/users/types/user.types";

export interface Review {
  id: string;
  user: Partial<User>;
  tour: Partial<Tour>;
  review: string;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
}
