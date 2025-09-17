import express from 'express'
import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  getReverseGeocode,
  getToursWithin,
  getToursByDistances
} from '@controllers/tour.controller'
import { protect, restrictTo } from '@middlewares/auth.middleware'
import { validate } from '@middlewares/validate.middleware'
import { mongoIdSchema } from '@validations/params.validation'
import {
  resizeTourImages,
  uploadTourImages
} from '@middlewares/upload.middleware'
import { reviewRouter } from './review.route'
import { createTourSchema } from '@validations/tour.validation'
import { bookingRouter } from './booking.route'
import { ROLES } from '@interfaces/user.interface'
import { getTopFiveToursStats } from '@controllers/booking.controller'

export const tourRouter = express.Router({ mergeParams: true })

tourRouter
  .route('/top-5-stats')
  .get(protect, restrictTo('admin'), getTopFiveToursStats)
tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours)
tourRouter.route('/tour-stats').get(getTourStats)
tourRouter
  .route('/monthly-plan/:year')
  .get(
    protect,
    restrictTo(ROLES.ADMIN, ROLES.LEADGUIDE, ROLES.GUIDE),
    getMonthlyPlan
  )
tourRouter.get('/reverse-geocode', getReverseGeocode)

tourRouter.get(
  '/tours-within/:distance/center/:latlng/unit/:unit',
  getToursWithin
)

tourRouter.get('/distances/:latlng/unit/:unit', getToursByDistances)

// Implement Nested routes
tourRouter.use('/:tourId/reviews', reviewRouter)
tourRouter.use('/:tourId/bookings', bookingRouter)

tourRouter
  .route('/')
  .get(getAllTours)
  .post(
    protect,
    restrictTo(ROLES.ADMIN, ROLES.LEADGUIDE),
    uploadTourImages,
    resizeTourImages,
    validate({ body: createTourSchema }),
    createTour
  )

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(
    protect,
    restrictTo(ROLES.ADMIN, ROLES.LEADGUIDE),
    uploadTourImages,
    resizeTourImages,
    updateTour
  )
  .delete(
    protect,
    restrictTo(ROLES.ADMIN, ROLES.LEADGUIDE),
    validate({ params: mongoIdSchema }),
    deleteTour
  )
