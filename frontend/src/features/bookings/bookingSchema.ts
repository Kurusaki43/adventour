import { z } from "zod";

export const bookingSchema = z.object({
  user: z.string({ required_error: "Must select a user" }),
  tour: z.string({ required_error: "Must select a tour" }),
  peopleCount: z.coerce
    .number({
      required_error: "Number of people is required",
      invalid_type_error: "People count must be a number",
    })
    .int("Must be an integer")
    .min(1, "At least one person required")
    .max(50, "Too many people, Please contact us."),

  tourStartDate: z.string({
    required_error: "Tour start date is required",
  }),

  method: z.enum(["stripe", "cash"], {
    required_error: "payment method is required",
  }),
});

export type CreateBookingData = z.infer<typeof bookingSchema>;

export const updateBookingSchema = bookingSchema.extend({
  id: z.string(),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
});

export type UpdateBookingData = z.infer<typeof updateBookingSchema>;
