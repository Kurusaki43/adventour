import { z } from "zod";

export const locationSchema = z.object({
  name: z.string().min(1, "Location name is required"),
  address: z.string().min(1, "Location address is required"),
  description: z.string().optional(),
  coordinates: z.array(z.number()).length(2, "Invalid coordinates"),
});

export type LocationData = z.infer<typeof locationSchema>;
