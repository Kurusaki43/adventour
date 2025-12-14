import express from 'express'
import path from 'path'
import { env } from '@config/env'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import mongooseFilterQuery from '@sliit-foss/mongoose-filter-query'
import hpp from 'hpp'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import useragent from 'express-useragent'
import { errorHandler, NotFound } from '@middlewares/errorHandler'
import { tourRouter } from '@routes/tour.route'
import { userRouter } from '@routes/user.route'
import { authRouter } from '@routes/auth.route'
import { reviewRouter } from '@routes/review.route'
import { Mailer } from '@config/mailer'
import { HttpStatusCode } from '@constants/httpsStatusCode'
import cors from 'cors'
import { bookingRouter } from '@routes/booking.route'
import { paymentRouter } from '@routes/payment.route'
import passport from '@config/passport'
import { webhookRouter } from '@routes/webhook.route'
// Start express app
export const app = express()
export const mailer = new Mailer(env.SENDGRID_FROM_EMAIL)
app.use('/api/v1/webhook', webhookRouter)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per windowMs
  message: {
    status: HttpStatusCode.TOO_MANY_REQUESTS,
    error: 'Too many requests, please try again later.'
  }
})
// Global Middleware
//  1- Set security HTTP headersnpm i express-rate-limit
app.use(helmet())
//  2- Parse JSON and urlencoded data
app.use(express.json({ limit: '10kb' }))
//  3- Parse cookies
app.use(cookieParser())
//  4- Parse urlencoded data
app.use(express.urlencoded({ extended: true }))
app.use(mongooseFilterQuery)
// 5- Parse user agent
app.use(useragent.express())
// 6- Log HTTP requests in development mode
if (env.isDev) {
  app.use(morgan('dev'))
}
// 7- Seerve static files from public directory
app.use(express.static(path.join(__dirname, '../public')))
// 8- Limit requests from the same IP
app.use('/api', limiter)
// 9- Sanatize mongoDB data
// app.use(
//   mongoSanitize({
//     replaceWith: '_'
//   })
// )

// 10- Secure again HTTP Parameter Pollution attacks
app.use(
  hpp({
    whitelist: ['duration', 'ratingsAverage', 'ratingsQuantity', 'maxGroupSize']
  })
)

// 11- Set security headers for CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
app.use(passport.initialize())

// Mount routers
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/bookings', bookingRouter)
app.use('/api/v1/payments', paymentRouter)
// Handle unhandled routes
app.use(NotFound)
app.use(errorHandler)
