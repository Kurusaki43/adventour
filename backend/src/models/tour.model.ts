import { model, Schema } from 'mongoose'
import { DurationUnit, ITour, Status } from '@interfaces/tour.interface'
import slugify from 'slugify'
import { Booking } from './booking.model'
import { Review } from './review.model'
import { logger } from '@config/logger'
import { Payment } from './payment.model'

const locationSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point'
  },
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String, required: true },
  coordinates: {
    type: [Number],
    index: '2dsphere',
    required: true
  }
})

const tourSchema = new Schema<ITour>(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      unique: true
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (this: ITour, val: number) {
          return val < this.price
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    durationUnit: {
      type: String,
      enum: Object.values(DurationUnit),
      required: [true, 'A tour must have a duration unit (hour/day)']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult'
      }
    },

    ratingsAverage: {
      type: Number,
      default: 4.0,
      set: (val: number) => Math.round(val * 10) / 10 // round to 1 decimal
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    summary: {
      type: String,
      required: [true, 'A tour must have a summary'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'A tour must have a description'],
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    startDates: [Date],
    status: {
      type: String,
      enum: Object.values(Status)
    },
    locations: {
      type: [locationSchema],
      default: []
    },
    leadGuide: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    guides: {
      type: [Schema.Types.ObjectId],
      ref: 'User'
    }
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
      }
    },
    toObject: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
      }
    }
  }
)

// tourSchema.pre<Query<unknown, ITour>>(/^find/, function (next) {
//   this.populate({ path: 'leadGuide' })
//     .populate({ path: 'guides' })
//     .populate({ path: 'reviews' })
//   next()
// })
// 🔑 Pre-save hook to generate slug
tourSchema.pre('save', function (next) {
  if (!this.isModified('name')) return next()

  this.slug = slugify(this.name, { lower: true, strict: true })
  next()
})
tourSchema.index({ price: 1, duration: 1 })

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
})

// Delete All Reviews, Bookings and Payments related to a deleted tour
tourSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    const bookingIds = (await Booking.find({ tour: doc._id }, '_id')).map(
      (b) => b._id
    )
    await Review.deleteMany({ tour: doc._id })
    await Booking.deleteMany({ tour: doc._id })
    await Payment.deleteMany({ booking: { $in: bookingIds } })
  }
})

export const Tour = model<ITour>('Tour', tourSchema)
