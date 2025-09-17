import { IBooking } from '@interfaces/booking.interface'
import { model, Schema } from 'mongoose'
import { Payment } from './payment.model'
import { logger } from '@config/logger'

const bookingSchema = new Schema<IBooking>(
  {
    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Booking must belong to a tour']
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to a user']
    },

    tourStartDate: { type: Date, required: true },

    peopleCount: { type: Number, required: true, min: 1 },

    price: {
      type: Number,
      required: true,
      min: [0, 'Amount must be greater than 0'],
      validate: {
        validator: function (value: number) {
          return value > 0
        },
        message: 'Amount must be greater than 0'
      }
    },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending'
    },
    receiptUrl: {
      type: String
    },
    createdAt: { type: Date, default: Date.now }
  },
  {
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

bookingSchema.post('findOneAndDelete', async function (doc: IBooking) {
  if (doc) {
    await Payment.deleteMany({ booking: doc._id })
    logger.info('Delete all Payments related to the deleted Bookings.')
  }
})
export const Booking = model<IBooking>('Booking', bookingSchema)
