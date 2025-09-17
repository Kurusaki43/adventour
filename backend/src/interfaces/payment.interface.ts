import { Document, Types } from 'mongoose'
import { PaymentMethod, PaymentStatus } from './booking.interface'

interface Payment {
  booking: Types.ObjectId
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  createdAt: Date
  stripeSessionId?: string
  updatedAt?: Date
}
export interface IPayment extends Payment, Document {}
