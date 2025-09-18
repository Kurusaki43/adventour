import { imageSchema } from "@/shared/schema/imageSchema";
import { z } from "zod";

const baseUserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is Required")
    .email("Please enter valid email"),
  password: z.string().min(8, "At least 8 characters"),
  confirmPassword: z.string().min(8, "At least 8 characters"),
  role: z.string().min(1, "Role is required"),
  avatar: z.union([z.string(), imageSchema]).optional(),
  isVerified: z.boolean().optional(),
  isActive: z.boolean().optional(),
  phone: z.string().optional(),
});

export const createUserSchema = baseUserSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

export const updateUserSchema = baseUserSchema.partial();

export type CreateUserData = z.infer<typeof createUserSchema>;
export type UpdateUserData = z.infer<typeof updateUserSchema>;
