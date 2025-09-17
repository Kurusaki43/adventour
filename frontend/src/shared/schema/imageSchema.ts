import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

export const imageSchema = z
  .custom<File>((file) => file instanceof File, {
    message: "You must upload an image file.",
  })
  .superRefine((file, ctx) => {
    if (!(file instanceof File)) return;
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Only JPG, PNG, GIF, or WEBP are allowed.",
      });
    }
    if (file.size > MAX_IMAGE_SIZE) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Image must be less than ${MAX_IMAGE_SIZE / 1024 / 1024}MB.`,
      });
    }
  });
