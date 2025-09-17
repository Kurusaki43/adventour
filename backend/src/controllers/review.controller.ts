import { HttpStatusCode } from '@constants/httpsStatusCode'
import { Review } from '@models/review.model'
import { catchAsync } from '@utils/catchAsync'
import { createOne, deleteOne, getOne, updateOne } from './factoryHandler'
import { APIFeatures } from '@utils/apiFeatures'
import { createReviewHandler } from '@middlewares/review.middleware'
import QueryString from 'qs'

export const getAllReviews = catchAsync(async (req, res) => {
  const filter: Record<string, string> = {}
  if (req.params.tourId) filter['tour'] = req.params.tourId

  const parsedQuery = QueryString.parse(req.originalUrl.split('?')[1] || '')

  const features = new APIFeatures(Review, parsedQuery, {
    searchFields: ['review']
  })
    .filter(filter)
    .sort()
    .limitFields()
    .paginate()

  // Execute the query
  const reviews = await features.query
    .populate({ path: 'tour', select: 'name' })
    .populate({ path: 'user', select: 'name avatar' })

  // Total number of matching documents BEFORE pagination

  const totalReviews = await Review.countDocuments(features.filterQuery)

  // const reviewsd = await Review.find(filter)

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    totalReviews: totalReviews,
    data: { reviews }
  })
})

export const createReview = createOne(Review, 'review', {
  onCreate: createReviewHandler
})
export const deleteReview = deleteOne(Review)
export const updateReview = updateOne(Review)
export const getReview = getOne(Review, 'review')
