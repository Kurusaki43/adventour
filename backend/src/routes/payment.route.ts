import { getAllPayments } from '@controllers/payment.controller'
import { protect } from '@middlewares/auth.middleware'
import Router from 'express'

export const paymentRouter = Router()

paymentRouter.route('/').get(protect, getAllPayments)
