import { HttpStatusCode } from '@constants/httpsStatusCode'
import {
  createUser,
  forgotPassword,
  login,
  logout,
  refresh,
  resetPassword,
  verifyEmail
} from '@services/user.service'
import { AppError } from '@utils/appError'
import { catchAsync } from '@utils/catchAsync'
import { clearAuthCookies, setAuthCookies } from '@utils/cookies'
import { extractDeviceInfo, pickFields } from '@utils/helper'
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema
} from '@validations/user.validation'

export const registerHandler = catchAsync(async (req, res) => {
  // 1- Handle Validation
  const parsedBody = registerSchema.parse(req.body)
  // 2- Call register service
  await createUser(parsedBody)
  // 3- Send response
  res.status(HttpStatusCode.CREATED).json({
    message: 'User created successfully'
  })
})

export const loginHandler = catchAsync(async (req, res) => {
  // 1- Handle validation
  const parsedBody = loginSchema.parse(req.body)
  // 2- Get  device info
  const deviceInfo = extractDeviceInfo(req)
  // 3- Call login service
  const { accessToken, refreshToken, sessionId, user } = await login(
    parsedBody,
    deviceInfo
  )
  // 4- Send the response with cookies
  setAuthCookies(res, refreshToken, sessionId)
    .status(HttpStatusCode.OK)
    .json({
      message: 'Login successful',
      accessToken,
      user: pickFields(user, [
        'id',
        'name',
        'email',
        'role',
        'avatar',
        'phone',
        'isVerified',
        'isActive',
        'createdAt',
        'guideProfile'
      ])
    })
})

export const verifyEmailHandler = catchAsync(async (req, res) => {
  // 1- Call Service
  await verifyEmail(req.params.code)
  // 2- Send the response
  res.status(HttpStatusCode.OK).json({
    message: 'Your account is verified'
  })
})

export const forgotPasswordHandler = catchAsync(async (req, res) => {
  // 1- Handle Validation
  const { email } = forgotPasswordSchema.parse(req.body)
  // 2- Call Service of forgotPass
  await forgotPassword(email)
  // 3- Send the response
  res.status(HttpStatusCode.OK).json({
    message: 'Check your email box to reset password'
  })
})

export const resetPasswordHandler = catchAsync(async (req, res) => {
  // 1- Handle validation
  if (!req.params.code)
    throw new AppError('The code is required', HttpStatusCode.BAD_REQUEST)
  const { password } = resetPasswordSchema.parse(req.body)
  // 2- Call reset password service
  await resetPassword(req.params.code, password)
  // 3- Send the response
  res.status(HttpStatusCode.OK).json({
    message: 'Password has been changed successfully'
  })
})

export const logoutHandler = catchAsync(async (req, res) => {
  // 1- Handle validation
  const { sessionId } = req.cookies
  if (sessionId) {
    // 2- Call the logout service to invalidate session in DB
    await logout(sessionId)
  }
  // 3- In both cases, clear cookies and respond
  clearAuthCookies(res).status(HttpStatusCode.OK).json({
    message: 'Logged out successfully'
  })
})

export const refreshTokenHandler = catchAsync(async (req, res) => {
  // 1- Handle validation
  const { refreshToken, sessionId } = req.cookies
  if (!refreshToken || !sessionId) {
    throw new AppError('Missing cookies', HttpStatusCode.UNAUTHORIZED)
  }
  // 2-Call the refresh token service
  const { newAccessToken, newRefreshToken, user } = await refresh(
    refreshToken,
    sessionId
  )
  // 3- Send the response
  setAuthCookies(res, newRefreshToken, sessionId)
    .status(HttpStatusCode.OK)
    .json({
      accessToken: newAccessToken,
      user: pickFields(user, [
        'id',
        'name',
        'email',
        'role',
        'avatar',
        'phone',
        'isVerified',
        'isActive',
        'createdAt',
        'guideProfile'
      ])
    })
})

export const meHandler = catchAsync(async (req, res) => {
  // The user is already authenticated by the auth middleware
  // Just return the user information
  res.status(HttpStatusCode.OK).json({
    user: req.user
  })
})
