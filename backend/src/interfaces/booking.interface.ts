import { Types, Document } from 'mongoose'
import { IUser } from './user.interface'
import { ITour } from './tour.interface'

export type PaymentMethod = 'online' | 'cash'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

interface Booking {
  tour: Types.ObjectId
  user: Types.ObjectId
  peopleCount: number
  tourStartDate: Date
  price: number
  status: BookingStatus
  receiptUrl?: string
  createdAt: Date
  updatedAt?: Date
}

export interface IBooking extends Booking, Document {}

export interface IBookingPopulated extends Omit<IBooking, 'user' | 'tour'> {
  user: Pick<IUser, 'id' | 'name' | 'email'>
  tour: Pick<ITour, 'id' | 'name'>
}
