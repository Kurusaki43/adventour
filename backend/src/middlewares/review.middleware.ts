import { HttpStatusCode } from '@constants/httpsStatusCode'
import { IReview } from '@interfaces/review.interface'
import { AppError } from '@utils/appError'
import { NextFunction, Request } from 'express'

export const createReviewHandler = async (
  req: Request,
  next?: NextFunction
) => {
  let finalBody: Partial<IReview> = { ...req.body }

  const userId = req.user?.id
  const tourId = req.body.tour ?? req.params.tourId

  if (!userId)
    return next?.(
      new AppError(
        'You are not authenticated,Logged in first.',
        HttpStatusCode.UNAUTHORIZED
      )
    )
  if (!tourId)
    return next?.(
      new AppError(
        'You must provide a tour id for a review',
        HttpStatusCode.BAD_REQUEST
      )
    )
  finalBody = {
    ...req.body,
    user: userId,
    tour: tourId
  }
  return finalBody
}
