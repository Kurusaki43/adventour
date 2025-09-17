import { model, Schema } from 'mongoose'
import { VerificationCodeType } from '@constants/VerificationCode'
import { IVerificationCode } from '@interfaces/verificationCode.interface'

const verificationCodeSchema = new Schema<IVerificationCode>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    code: {
      type: String,
      required: [true, 'Verification code of 6 digits is required']
    },
    type: {
      type: String,
      enum: Object.values(VerificationCodeType),
      required: [true, 'Verification type is required']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // auto-remove after expiry (MongoDB TTL)
    }
  },

  { timestamps: { createdAt: true, updatedAt: false } }
)

//verificationCodeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 }) // Expires after 1 hour

export const VerificationCode = model<IVerificationCode>(
  'VerificationCode',
  verificationCodeSchema
)
