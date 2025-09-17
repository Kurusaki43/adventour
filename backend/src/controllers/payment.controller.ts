import { HttpStatusCode } from '@constants/httpsStatusCode'
import { Payment } from '@models/payment.model'

import { APIFeatures } from '@utils/apiFeatures'
import { catchAsync } from '@utils/catchAsync'
import QueryString from 'qs'

export const getAllPayments = catchAsync(async (req, res) => {
  const parsedQuery = QueryString.parse(req.originalUrl.split('?')[1] || '')
  const features = new APIFeatures(Payment, parsedQuery)
    .filter()
    .sort()
    .limitFields()
    .paginate()

  const payments = await features.query

  const totalBookingsNumber = await Payment.countDocuments(features.filterQuery)

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    totalPayments: totalBookingsNumber,
    data: {
      payments
    }
  })
})
