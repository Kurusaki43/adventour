import { DurationUnit, Status } from '@interfaces/tour.interface'
import { z } from 'zod'

// Enums
const TourDurationUnitEnum = z.enum([DurationUnit.Day, DurationUnit.Hour])
const TourStatusEnum = z.enum([Status.Draft, Status.Published])

// Location schema
const locationSchema = z.object({
  type: z.enum(['Point']).default('Point'),
  name: z.string().min(1, 'Location name is required'),
  description: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  coordinates: z
    .tuple([
      z.coerce.number().min(-90).max(90), // latitude
      z.coerce.number().min(-180).max(180) // longitude
    ])
    .refine(
      ([long, lat]) => !isNaN(long) && !isNaN(lat),
      'Coordinates must be valid numbers'
    )
})

export const baseTourSchema = z.object({
  name: z.string().min(5, 'Tour name must be at least 5 characters'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  priceDiscount: z.coerce
    .number()
    .optional()
    .refine((val) => val === undefined || val >= 0, {
      message: 'Price discount cannot be negative'
    }),
  duration: z.coerce.number().positive('Duration must be greater than 0'),
  durationUnit: TourDurationUnitEnum,
  maxGroupSize: z.coerce
    .number()
    .int()
    .positive('Max group size must be greater than 0'),
  difficulty: z.enum(['easy', 'medium', 'difficult']),
  ratingsAverage: z.coerce.number().min(1).max(5).optional(),
  ratingsQuantity: z.coerce.number().int().min(0).optional(),
  summary: z.string().min(1, 'Summary is required'),
  description: z.string().min(1, 'Description is required'),
  imageCover: z.string().optional(),
  images: z.array(z.string()).optional(),
  startDates: z
    .array(z.coerce.date())
    .min(1, 'At least one start date is required'),

  locations: z.preprocess((val) => {
    if (Array.isArray(val)) {
      return val.map((item) => {
        if (typeof item === 'string') item = JSON.parse(item)

        // sanitize coordinates if nested
        if (
          Array.isArray(item?.coordinates) &&
          Array.isArray(item.coordinates[0])
        ) {
          item.coordinates = item.coordinates[0]
        }

        // coerce numbers explicitly
        if (Array.isArray(item?.coordinates)) {
          item.coordinates = item.coordinates.map(<T>(c: T) => Number(c))
        }

        return item
      })
    }

    if (typeof val === 'string') {
      return JSON.parse(val)
    }

    return val
  }, z.array(locationSchema)),

  leadGuide: z.string().optional(),
  guides: z
    .array(z.string({ invalid_type_error: 'Guides must be an array of IDs' }))
    .optional(),
  status: TourStatusEnum
})

export const createTourSchema = baseTourSchema
export const updateTourSchema = baseTourSchema.partial()

export type CreateTourSchema = z.infer<typeof createTourSchema>
export type UpdateTourSchema = z.infer<typeof updateTourSchema>
