import { Document, Model, Types } from 'mongoose'

interface Review {
  user: Types.ObjectId
  tour: Types.ObjectId
  review: string
  rating: number
  createdAt?: string
  updatedAt?: string
}

export interface IReview extends Review, Document {
  calcAverageRatings(tourId: Types.ObjectId): Promise<void>
}

export interface ReviewModel extends Model<IReview> {
  calcAverageRatings(tourId: Types.ObjectId): Promise<void>
}
