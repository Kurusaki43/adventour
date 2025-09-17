import z from 'zod'

export const paginationSchema = z.object({
  page: z
    .string()
    .regex(/^\d+$/, 'Page must be a number')
    .transform(Number)
    .refine((val) => val > 0, 'Page must be greater than 0')
    .optional(),
  limit: z
    .string()
    .regex(/^\d+$/, 'Limit must be a number')
    .transform(Number)
    .refine((val) => val > 0 && val <= 100, 'Limit must be between 1 and 100')
    .optional(),
  sort: z
    .string()
    .regex(
      /^[a-zA-Z,\-_]+$/,
      'Sort must contain only letters, commas, and hyphens'
    )
    .optional(),
  fields: z
    .string()
    .regex(
      /^[a-zA-Z,\-_]+$/,
      'Fields must contain only letters, commas, and hyphens'
    )
    .optional()
})

// Specific schema for tour queries
export const tourQuerySchema = paginationSchema.extend({
  difficulty: z.enum(['easy', 'medium', 'difficult']).optional(),
  duration: z
    .string()
    .regex(/^\d+$/, 'Duration must be a number')
    .transform(Number)
    .refine((val) => val > 0, 'Duration must be greater than 0')
    .optional(),
  maxGroupSize: z
    .string()
    .regex(/^\d+$/, 'Group size must be a number')
    .transform(Number)
    .refine((val) => val > 0, 'Group size must be greater than 0')
    .optional(),
  price: z
    .string()
    .regex(/^\d+$/, 'Price must be a number')
    .transform(Number)
    .refine((val) => val >= 0, 'Price must be non-negative')
    .optional(),
  ratingsAverage: z
    .string()
    .regex(/^\d+(\.\d+)?$/, 'Rating must be a number')
    .transform(Number)
    .refine((val) => val >= 1 && val <= 5, 'Rating must be between 1 and 5')
    .optional()
})

export type PaginationQuery = z.infer<typeof paginationSchema>
export type TourQuery = z.infer<typeof tourQuerySchema>
