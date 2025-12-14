import { env } from '@config/env'
import { HttpStatusCode } from '@constants/httpsStatusCode'
import { IPayment } from '@interfaces/payment.interface'
import { Booking } from '@models/booking.model'
import { Payment } from '@models/payment.model'
import { Tour } from '@models/tour.model'
import { generateBookingReceipt } from '@services/pdfKit.service'
import { APIFeatures } from '@utils/apiFeatures'
import { AppError } from '@utils/appError'
import { catchAsync } from '@utils/catchAsync'
import { Types } from 'mongoose'
import path from 'path'
import QueryString from 'qs'
import Stripe from 'stripe'

export const getAllBookings = catchAsync(async (req, res) => {
  const parsedQuery = QueryString.parse(req.originalUrl.split('?')[1] || '')

  // if Client So Filter only its booking
  const isClient = req.user?.role === 'client'
  if (req.user && isClient) parsedQuery.user = req.user.id

  const features = new APIFeatures(Booking, parsedQuery)
    .filter()
    .sort()
    .limitFields()
    .paginate()

  const bookings = await features.query
    .populate({
      path: 'tour',
      select: 'name imageCover'
    })
    .populate({
      path: 'user',
      select: 'name avatar'
    })

  const totalBookingsNumber = await Booking.countDocuments(features.filterQuery)

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    totalBookings: totalBookingsNumber,
    data: {
      bookings
    }
  })
})

const stripe = new Stripe(env.STRIPE_SECRET_KEY)
export const createBooking = catchAsync(async (req, res, next) => {
  const {
    tour: tourId,
    user: customerId,
    peopleCount,
    tourStartDate,
    method: paymentMethod
  } = req.body
  const tour = await Tour.findById(tourId)
  // 1- Test if tour exist
  if (!tour)
    return next(
      new AppError('No tour found with that ID', HttpStatusCode.NOT_FOUND)
    )

  // 2- check who created the booking (admin vs client)
  const isAdmin = req?.user?.role === 'admin'
  const travelerId = isAdmin ? customerId : req?.user?.id

  if (isAdmin && !customerId) {
    return next(
      new AppError(
        `Customer Id is required when admin books`,
        HttpStatusCode.BAD_REQUEST
      )
    )
  }
  if (isAdmin && paymentMethod !== 'cash') {
    return next(
      new AppError(
        `Payment method should be cash when admin books`,
        HttpStatusCode.BAD_REQUEST
      )
    )
  }

  // 3- Check tour seats availibility
  const bookings = await Booking.aggregate([
    {
      $match: {
        tour: new Types.ObjectId(tourId),
        tourStartDate: new Date(tourStartDate),
        bookingStatus: { $ne: 'cancelled' }
      }
    },
    {
      $group: {
        _id: null,
        totalPeople: { $sum: '$peopleCount' }
      }
    }
  ])
  const alreadyBooked = bookings.length ? bookings[0].totalPeople : 0

  // 4. Check if not eligible to book
  const seatsLeft = tour.maxGroupSize - alreadyBooked

  if (peopleCount > seatsLeft) {
    return next(
      new AppError(
        `Not enough seats available. Only ${seatsLeft} seats left.`,
        HttpStatusCode.BAD_REQUEST
      )
    )
  }

  // 5. Check if tour start date is at least 2 days in the future
  const startDate = new Date(tourStartDate)
  const now = new Date()
  const diffInMs = startDate.getTime() - now.getTime()
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

  if (diffInDays < 2) {
    return next(
      new AppError(
        'You cannot book this tour less than 2 days before it starts',
        HttpStatusCode.BAD_REQUEST
      )
    )
  }

  // 6. Calculate price
  const price = tour.price * peopleCount

  // 7. Check if already booked
  const existingBooking = await Booking.findOne({
    tour,
    user: travelerId,
    tourStartDate
  })

  if (existingBooking) {
    return next(
      new AppError(
        'You already have a booking for this tour date.',
        HttpStatusCode.BAD_REQUEST
      )
    )
  }

  // 8. Create booking
  const booking = await Booking.create({
    user: travelerId,
    tour: tourId,
    tourStartDate,
    peopleCount,
    price,
    status: 'pending'
  })

  // 9. Create payment record
  const payment = await Payment.create({
    booking: booking._id,
    method: paymentMethod,
    amount: price,
    status: 'pending'
  })
  // 10. Stripe flow → create checkout session
  if (paymentMethod === 'stripe') {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'dzd',
            product_data: { name: `Tour Booking - ${tour.name}` },
            unit_amount: price * 100
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${env.FRONT_END_HOST_URL}/payment-success?paymentId=${payment._id}`,
      cancel_url: `${env.FRONT_END_HOST_URL}/payment-cancel?paymentId=${payment._id}`
    })
    // Update payment with Stripe sessionId
    payment.stripeSessionId = session.id
    await payment.save()
    return res.status(HttpStatusCode.CREATED).json({ url: session.url })
  }
  res.status(HttpStatusCode.CREATED).json({
    status: 'success',
    data: {
      booking,
      payment
    }
  })
})

export const updateBooking = catchAsync(async (req, res, next) => {
  const bookingId = req.params.id
  const { peopleCount, tourStartDate, status } = req.body
  console.log('body: ', req.body)
  //1. Check if booki!ng exist
  const booking = await Booking.findById(bookingId)
  if (!booking) {
    return next(
      new AppError('No Booking found with that ID', HttpStatusCode.NOT_FOUND)
    )
  }
  // 2- check who updated the booking (admin vs client)
  const isAdmin = req?.user?.role === 'admin'
  const isTraveler = req.user?.role === 'client'
  // Traveler must own the booking
  if (isTraveler && booking.user.toString() !== req?.user?.id) {
    return next(
      new AppError(
        'You are not allowed to update this booking',
        HttpStatusCode.FORBIDDEN
      )
    )
  }
  // 3. Disallowed fields for traveler
  if (
    isTraveler &&
    req.body.tour &&
    req.body.tour !== booking.tour.toString()
  ) {
    return next(
      new AppError(
        'Travelers cannot change tour. Please cancel and rebook.',
        HttpStatusCode.BAD_REQUEST
      )
    )
  }

  // 4.  Check if tour start date is at least 2 days in the future
  if (tourStartDate) {
    const startDate = new Date(tourStartDate)
    const now = new Date()
    const diffInMs = startDate.getTime() - now.getTime()
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

    if (diffInDays < 2) {
      return next(
        new AppError(
          'You cannot book this tour less than 2 days before it starts',
          HttpStatusCode.BAD_REQUEST
        )
      )
    }
  }

  // 5. Check seats availability
  if (tourStartDate || peopleCount) {
    const targetDate = tourStartDate || booking.tourStartDate
    const targetPeople = peopleCount || booking.peopleCount
    const bookings = await Booking.aggregate([
      {
        $match: {
          tour: new Types.ObjectId(booking.tour),
          tourStartDate: new Date(targetDate),
          status: { $ne: 'cancelled' }
        }
      },
      {
        $group: {
          _id: null,
          totalPeople: { $sum: '$peopleCount' }
        }
      }
    ])

    const alreadyBooked = bookings.length ? bookings[0].totalPeople : 0
    const tour = await Tour.findById(booking.tour)

    // allow current seats back into calculation
    const seatsLeft = tour!.maxGroupSize - alreadyBooked + booking.peopleCount

    if (targetPeople > seatsLeft) {
      return next(
        new AppError(
          `Not enough seats available. Only ${seatsLeft} seats left.`,
          HttpStatusCode.BAD_REQUEST
        )
      )
    }
  }

  // 6. Apply updates
  if (tourStartDate) booking.tourStartDate = tourStartDate
  if (peopleCount) booking.peopleCount = peopleCount
  if (isAdmin && status) booking.status = status

  // 7. Recalculate price if peopleCount changed
  if (peopleCount) {
    const tour = await Tour.findById(booking.tour)
    booking.price = tour!.price * peopleCount
  }

  await booking.save()

  if (isAdmin && status === 'confirmed') {
    const receiptPath = await generateBookingReceipt(
      await booking.populate([
        { path: 'user', select: 'id name email' },
        { path: 'tour', select: 'id name' }
      ])
    )
    const receiptFileName = path.basename(receiptPath)
    const receiptUrl = `/receipts/${receiptFileName}`
    booking.receiptUrl = receiptUrl
    await booking.save()
  }
  // 8. Update payment if needed
  const payment = (await Payment.findOne({ booking: booking._id })) as IPayment

  if (isAdmin) {
    if (peopleCount) {
      payment.amount = booking.price
    }

    if (payment.method === 'cash' && status === 'cancelled') {
      payment.status = 'refunded'
    }
    if (
      payment.method === 'cash' &&
      (status === 'completed' || status === 'confirmed')
    ) {
      payment.status = 'paid'
    }
    if (payment.method === 'cash' && status === 'pending') {
      payment.status = 'pending'
    }

    await payment.save()
  }

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    data: {
      booking,
      payment
    }
  })
})

export const getMonthlyBookingStats = catchAsync(async (req, res) => {
  const year: number =
    parseInt(req?.query?.year as string) || new Date().getFullYear()

  const stats = await Booking.aggregate([
    {
      // Only booking of selected/current year & should be confirmed
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        },
        status: 'confirmed'
      }
    },
    {
      // Group by month
      $group: {
        _id: { $month: '$createdAt' },
        totalBookings: { $sum: 1 },
        totalRevenue: { $sum: '$price' }
      }
    },
    {
      // sort by month ascending
      $sort: { _id: 1 }
    },
    {
      $addFields: {
        month: {
          $arrayElemAt: [
            [
              '',
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ],
            '$_id'
          ]
        }
      }
    },
    {
      // Rename & Projecting
      $project: {
        _id: 0,
        month: 1,
        totalBookings: 1,
        totalRevenue: 1
      }
    }
  ])

  res.status(HttpStatusCode.OK).json({
    tatus: 'success',
    year,
    data: stats
  })
})

export const getTopFiveToursStats = catchAsync(async (req, res) => {
  const stats = await Booking.aggregate([
    {
      // 1. Get confirmed booking only
      $match: {
        status: 'confirmed'
      }
    },
    {
      // 2. Group By tour
      $group: {
        _id: '$tour',
        nbBookings: { $sum: 1 },
        totalRevenue: { $sum: '$price' }
      }
    },
    {
      // 3. Look up in tour collection
      $lookup: {
        from: 'tours',
        localField: '_id',
        foreignField: '_id',
        as: 'tour'
      }
    },
    { $unwind: '$tour' },
    {
      // 4. select usefull fields only
      $project: {
        _id: 0,
        tourId: '$tour._id',
        tourName: '$tour.name',
        nbBookings: 1,
        totalRevenue: 1
      }
    },
    {
      // 5. sort by nbBookings in descending order
      $sort: {
        nbBookings: -1
      }
    },
    {
      // 6. select only top 5
      $limit: 5
    }
  ])

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    data: {
      stats
    }
  })
})
