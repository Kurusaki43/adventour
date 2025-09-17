import { z } from "zod";

export const reviewSchema = z.object({
  review: z.string().min(1, "Review text is required"),
  rating: z.number().min(0),
});

export type CreateReviewData = z.infer<typeof reviewSchema> & { id?: string };
