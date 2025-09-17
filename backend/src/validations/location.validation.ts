import { z } from 'zod'

export const locationSchema = z.array(
  z.object({
    name: z.string().min(1, 'Location name is required').trim(),
    address: z.string().min(1, 'Location address is required').trim(),
    description: z.string().optional(),
    coordinates: z.array(z.number()).length(2, 'Invalid coordinates')
  })
)
