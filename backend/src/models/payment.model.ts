import { IPayment } from '@interfaces/payment.interface'
import { model, Schema } from 'mongoose'

const paymentSchema = new Schema<IPayment>(
  {
    booking: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: [true, 'Payment should belong to a booking']
    },

    amount: {
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

    method: {
      type: String,
      enum: ['stripe', 'cash'],
      required: [true, 'Payment methods are: stripe,cash']
    },

    stripeSessionId: { type: String },

    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },

    createdAt: { type: Date, default: Date.now }
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

export const Payment = model<IPayment>('Payment', paymentSchema)
