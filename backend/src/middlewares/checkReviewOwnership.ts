import { HttpStatusCode } from '@constants/httpsStatusCode'
import { ROLES } from '@interfaces/user.interface'
import { Review } from '@models/review.model'
import { AppError } from '@utils/appError'
import { NextFunction, Request, Response } from 'express'

export const checkReviewOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    return next(
      new AppError('No review found with that ID', HttpStatusCode.NOT_FOUND)
    )
  }

  // If the user is admin, allow directly
  if (req?.user?.role === ROLES.ADMIN) return next()

  // Check if the review belongs to the current user
  if (String(review.user.id) != String(req?.user?.id)) {
    return next(
      new AppError(
        'You do not have permission to perform this action',
        HttpStatusCode.FORBIDDEN
      )
    )
  }

  next()
}
