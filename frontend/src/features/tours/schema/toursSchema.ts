import { z } from "zod";
import { DurationUnit, Status, type TourStatus } from "../types/tour";
import { imageSchema } from "@/shared/schema/imageSchema";
import { locationSchema } from "./locationSchema";

// Define Number schema with custom error messages
const numberSchema = (
  invalid_type_error: string,
  { min, minError }: { min: number; minError: string },
  refineError: string
) =>
  z.coerce
    .number({ invalid_type_error })
    .min(min, minError)
    .refine((val) => !isNaN(val), { message: refineError });

export const TourSchema = z.object({
  id: z.string().optional(),
  name: z.string({ required_error: "Name is required" }).trim(),

  price: numberSchema(
    "Price must be a number",
    { min: 1, minError: "Price must be greater than 0" },
    "Price must be a valid number"
  ),

  priceDiscount: z.coerce
    .number({ message: "Price Discount must be a number" })
    .min(0, "Price Discount should be Positive")
    .optional(),

  duration: numberSchema(
    "Duration must be a number",
    { min: 1, minError: "At least 1 day" },
    "Duration must be a valid number"
  ),

  durationUnit: z.enum([DurationUnit.Day, DurationUnit.Hour], {
    message: "Please select a duration unit",
  }),
  // .default("hour") as z.ZodType<TourDurationUnit>,

  status: z
    .enum([Status.Draft, Status.Published])
    .default("draft") as z.ZodType<TourStatus>,

  maxGroupSize: z.coerce
    .number({ message: "Group size must be a number" })
    .min(1, "At least 1 person")
    .max(20, "At most 20 person")
    .refine((val) => !isNaN(val), {
      message: "Group size must be a valid number",
    }),

  difficulty: z.string({ message: "Please Select an option" }),

  ratingsAverage: z.coerce
    .number()
    .min(0, "Average rating must be 0 or greater")
    .max(5, "Average rating must be 5 or less")
    .optional(),

  ratingsQuantity: z.coerce
    .number()
    .min(0, "Ratings quantity must be 0 or greater")
    .optional(),
  summary: z.string().min(1, "Summary is required").trim(),

  description: z.string().min(1, "Description is required").trim(),

  imageCover: z.union([imageSchema, z.string()]).optional(),

  images: z
    .array(z.union([imageSchema, z.string()]))
    .max(10, "You can upload at most 10 images.")
    .optional(),

  startDates: z
    .array(
      z.object({
        date: z.coerce
          .date({
            invalid_type_error: "Invalid date",
          })
          .refine((date) => date >= new Date(), {
            message: "Date must be in the future",
          }),
      })
    )
    .min(1, "At least one start date is required"),

  leadGuide: z
    .string({
      invalid_type_error: "A tour must have a lead guide",
    })
    .optional(),

  guides: z.array(z.string()).optional(),

  locations: z
    .array(locationSchema)
    .min(1, "At least one location is required"),
});

export const tourSchema = TourSchema;

export type TourData = z.infer<typeof tourSchema>;
