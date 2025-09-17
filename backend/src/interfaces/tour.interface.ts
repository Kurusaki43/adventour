import { Document, Types } from 'mongoose'

export interface Location {
  name: string
  description?: string
  address: string
  coordinates: [long: number, lat: number]
}

export const Status = {
  Draft: 'draft',
  Published: 'published'
} as const

export const DurationUnit = {
  Day: 'day',
  Hour: 'hour'
} as const

export type TourDurationUnit = (typeof DurationUnit)[keyof typeof DurationUnit]
export type TourStatus = (typeof Status)[keyof typeof Status]
export interface Tour {
  name: string
  slug: string
  price: number
  priceDiscount?: number
  duration: number
  durationUnit: TourDurationUnit
  maxGroupSize: number
  difficulty: string
  ratingsAverage?: number
  ratingsQuantity?: number
  summary: string
  description: string
  imageCover: string
  images?: string[]
  startDates: Date[]
  locations: Location[]
  leadGuide: string | Types.ObjectId // Union
  guides: (string | Types.ObjectId)[] // Union array
  status: TourStatus
  createdAt?: Date
  updatedAt?: Date
}

export interface ITour extends Tour, Document {}
