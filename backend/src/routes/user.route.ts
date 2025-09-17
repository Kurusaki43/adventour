import express from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateMe,
  getUser,
  updateUser,
  getAvailableGuides,
  getUsersByIdsParam,
  getGuides,
  getGuide
} from '@controllers/user.controller'
import { protect, restrictTo } from '@middlewares/auth.middleware'
import {
  resizeAvatar,
  uploadUserAvatar
} from '@middlewares/uploadAvatar.middleware'
import { addCurrentUserIdToQueryParams } from '@middlewares/user.middleware'
import { bookingRouter } from './booking.route'
import { ROLES } from '@interfaces/user.interface'
import { tourRouter } from './tour.route'
import {
  resizeGuideImages,
  uploadGuideImages
} from '@middlewares/uploadGuideImages'

export const userRouter = express.Router()
userRouter.use('/bookings', bookingRouter)
userRouter.use('/:guideId/tours', tourRouter)
// All above routes need authentication
userRouter.route('/by-ids').get(getUsersByIdsParam)
userRouter.route('/guides').get(getGuides)
userRouter.route('/guides/:id').get(getGuide)
userRouter.use(protect)
userRouter
  .route('/me/profile')
  .patch(uploadGuideImages, resizeGuideImages, updateMe)
  .get(addCurrentUserIdToQueryParams, getUser)

// Apply restrictTo(Role.ADMIN) to all routes below
userRouter.use(restrictTo(ROLES.ADMIN))
userRouter.route('/guides/available-for-tour').post(getAvailableGuides)
userRouter.route('/').get(getAllUsers).post(uploadUserAvatar, createUser)
userRouter
  .route('/:id')
  .delete(deleteUser)
  .patch(uploadUserAvatar, resizeAvatar, updateUser)
  .get(getUser)
