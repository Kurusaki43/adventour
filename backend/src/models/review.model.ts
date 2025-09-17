import { IReview, ReviewModel } from '@interfaces/review.interface'
import { model, Query, Schema, Types } from 'mongoose'
import { Tour } from './tour.model'

const reviewSchema = new Schema<IReview, ReviewModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour']
    },
    review: {
      type: String,
      required: [true, 'Review should have a text'],
      trim: true
    },
    rating: {
      type: Number,
      required: [true, 'Review must have a rating'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be at most 5']
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.__v
      }
    },
    toObject: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.__v
      }
    }
  }
)

// One review per user per tour
reviewSchema.index({ tour: 1, user: 1 }, { unique: true })

// Pre query hook
reviewSchema.pre<Query<unknown, IReview>>(/^find/, function (next) {
  this.populate([
    {
      path: 'tour',
      select: 'name imageCover'
    },
    {
      path: 'user',
      select: 'name avatar'
    }
  ])
  next()
})

// --- STATIC: declare on schema.statics with a function (for proper `this`) ---
reviewSchema.statics.calcAverageRatings = async function (
  this: ReviewModel,
  tourId: Types.ObjectId
) {
  const stats: { _id: string; nRatings: number; avgRating: number }[] =
    await this.aggregate([
      { $match: { tour: tourId } },
      {
        $group: {
          _id: '$tour',
          nRatings: { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      }
    ])
  const [res] = stats
  const updates = res
    ? {
        ratingsQuantity: res.nRatings,
        ratingsAverage: res.avgRating
      }
    : {
        ratingsQuantity: 0,
        ratingsAverage: 4.5
      }
  await Tour.findByIdAndUpdate(tourId, updates)
}

// --- Hooks to recompute after create/update/delete ---
reviewSchema.post('save', async function (doc) {
  // `this` is document; call static via the model constructor
  await (this.constructor as ReviewModel).calcAverageRatings(doc.tour)
})

reviewSchema.post('findOneAndDelete', async function (doc: IReview | null) {
  if (!doc) return
  const tourId = new Types.ObjectId(doc.tour.id)
  await (this.model as ReviewModel).calcAverageRatings(tourId)
})
reviewSchema.post('findOneAndUpdate', async function (doc: IReview | null) {
  if (!doc) return
  const tourId = new Types.ObjectId(doc.tour.id)
  await (this.model as ReviewModel).calcAverageRatings(tourId)
})
export const Review = model<IReview, ReviewModel>('Review', reviewSchema)
