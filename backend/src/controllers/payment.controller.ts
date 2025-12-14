import { HttpStatusCode } from '@constants/httpsStatusCode'
import { Payment } from '@models/payment.model'
import Stripe from 'stripe'
import { APIFeatures } from '@utils/apiFeatures'
import { catchAsync } from '@utils/catchAsync'
import QueryString from 'qs'
import { env } from '@config/env'
import { Booking } from '@models/booking.model'

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

const stripe = new Stripe(env.STRIPE_SECRET_KEY)

export const handleStripeWebhook = catchAsync(async (req, res) => {
  console.log('I am Called')
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, env.WEB_HOOK_SECRET)
  } catch (err: any) {
    console.error('Webhook error:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const payment = await Payment.findOne({ stripeSessionId: session.id })
    if (payment) {
      payment.status = 'paid'
      await payment.save()

      await Booking.findByIdAndUpdate(payment.booking, { status: 'confirmed' })
      console.log('✅ Booking confirmed for payment', payment._id)
    }
  }

  res.json({ received: true })
})
