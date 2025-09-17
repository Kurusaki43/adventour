import {
  createBooking,
  getAllBookings,
  getMonthlyBookingStats,
  updateBooking
} from '@controllers/booking.controller'
import { ROLES } from '@interfaces/user.interface'
import { protect, restrictTo } from '@middlewares/auth.middleware'
import express from 'express'

export const bookingRouter = express.Router({ mergeParams: true })

bookingRouter
  .route('/monthly-stats')
  .get(protect, restrictTo('admin'), getMonthlyBookingStats)

bookingRouter
  .route('/')
  .post(protect, restrictTo(ROLES.CLIENT, ROLES.ADMIN), createBooking)
  .get(protect, restrictTo('admin', 'client'), getAllBookings)

bookingRouter
  .route('/:id')
  .patch(protect, restrictTo(ROLES.ADMIN, ROLES.CLIENT), updateBooking)
