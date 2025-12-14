import { handleStripeWebhook } from '@controllers/payment.controller'
import { Router } from 'express'
import express from 'express'

export const webhookRouter = Router()

webhookRouter
  .route('/')
  .post(express.raw({ type: 'application/json' }), handleStripeWebhook)
