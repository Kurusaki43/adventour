import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  updateReview
} from '@controllers/review.controller'
import { protect, restrictTo } from '@middlewares/auth.middleware'
import { checkReviewOwnership } from '@middlewares/checkReviewOwnership'
import { Router } from 'express'

export const reviewRouter = Router({ mergeParams: true })

reviewRouter
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('client'), createReview)

reviewRouter
  .route('/:id')
  .get(getReview)
  .delete(
    protect,
    restrictTo('admin', 'client'),
    checkReviewOwnership,
    deleteReview
  )
  .patch(protect, restrictTo('client'), checkReviewOwnership, updateReview)
