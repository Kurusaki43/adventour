import { Router } from 'express'
import {
  loginHandler,
  registerHandler,
  verifyEmailHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  logoutHandler,
  refreshTokenHandler,
  meHandler,
  oauthHandler
} from '@controllers/auth.controller'
import { protect } from '@middlewares/auth.middleware'
import passport from 'passport'

export const authRouter = Router()

// Public routes
authRouter.post('/register', registerHandler)
authRouter.post('/login', loginHandler)
authRouter.get('/verify-email/:code', verifyEmailHandler)
authRouter.post('/forgot-password', forgotPasswordHandler)
authRouter.patch('/reset-password/:code', resetPasswordHandler)
authRouter.get('/refresh', refreshTokenHandler)
authRouter.get('/logout', logoutHandler)

// Oauth
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  oauthHandler
)
// Protected routes
authRouter.get('/me', protect, meHandler)
