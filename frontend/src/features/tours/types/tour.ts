import type { User } from "@/features/users/types/user.types";
import type { Location } from "./location";

export const Status = {
  Draft: "draft",
  Published: "published",
} as const;
export type TourStatus = (typeof Status)[keyof typeof Status];

export const DurationUnit = {
  Day: "day",
  Hour: "hour",
} as const;

export type TourDurationUnit = (typeof DurationUnit)[keyof typeof DurationUnit];

export interface Tour {
  id?: string;
  name: string;
  slug: string;
  price: number;
  priceDiscount?: number;
  duration: number;
  durationUnit?: TourDurationUnit;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  summary: string;
  status: TourStatus;
  leadGuide: string;
  guides: string[];
  description: string;
  imageCover: string;
  images?: string[];
  locations: Location[];
  createdAt?: Date;
  startDates: Date[];
}

export type PopulatedTour = {
  guides: User[];
  leadGuide: User;
} & Omit<Tour, "guides" | "leadGuide">;
