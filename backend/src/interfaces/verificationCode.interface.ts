import { ObjectId } from 'mongoose'
import { VerificationCodeType } from '~/constants/VerificationCode'

export interface IVerificationCode extends Document {
  userId: ObjectId
  code: string // store hashed
  type: VerificationCodeType
  createdAt: Date
  expiresAt: Date
}
