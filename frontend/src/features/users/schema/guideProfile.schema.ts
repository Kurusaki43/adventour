import { imageSchema } from "@/shared/schema/imageSchema";
import z from "zod";

const phoneRegex = /^(\+?\d{1,4}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?[\d\s-]{5,15}$/;

const availabilitySchema = z.object({
  day: z.string(),
  from: z.string(),
  to: z.string(),
});

export const guideProfileSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Should insert valid email"),
  phone: z.string().regex(phoneRegex, "Invalid phone number format"),
  bio: z
    .string()
    .min(1, "Bio is required")
    .max(512, "You have only 215 characters"),
  languagesSpoken: z.array(z.string()),
  yearsOfExperience: z.coerce.number().positive("Number should be positive"),
  availability: z
    .array(availabilitySchema)
    .min(3, "You should fill up 3 days availability"),
  avatar: z.union([imageSchema, z.string()]).optional(),
  imageCover: z.union([imageSchema, z.string()]).optional(),
  images: z
    .array(z.union([imageSchema, z.string()]))
    .max(10, "You can upload at most 10 images.")
    .optional(),
  address: z.string(),
});

export type GuideProfileData = z.infer<typeof guideProfileSchema>;
