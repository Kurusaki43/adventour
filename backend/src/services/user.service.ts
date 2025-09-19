import { mailer } from '../app'
import { env } from '@config/env'
import { logger } from '@config/logger'
import { HttpStatusCode } from '@constants/httpsStatusCode'
import { VerificationCodeType } from '@constants/VerificationCode'
import { ISession } from '@interfaces/session.interface'
import { Session } from '@models/session.model'
import { User } from '@models/user.model'
import { VerificationCode } from '@models/verificationCode.model'
import { AppError } from '@utils/appError'
import {
  generateError,
  generateRefreshToken,
  generateSecureCode,
  hashCode,
  refreshTokenExpiry
} from '@utils/helper'
import { signToken } from '@utils/jwt'
import { LoginData, RegisterData } from '@validations/user.validation'
import { v4 as uuidv4 } from 'uuid'
import { afterFifteenMinutes } from '@utils/date'

export const createUser = async (userData: RegisterData) => {
  // 1- Check if user exists
  const existingUser = await User.exists({ email: userData.email })
  if (existingUser)
    generateError(
      'User with this email already exists',
      HttpStatusCode.CONFLICT
    )
  // 2- Create new user
  const newUser = await User.create(userData)
  // 3- Create verification code
  const rawCode = generateSecureCode()
  await VerificationCode.create({
    userId: newUser._id,
    code: hashCode(rawCode),
    type: VerificationCodeType.EMAIL_VERIFICATION,
    expiresAt: afterFifteenMinutes()
  })

  // 4- Send email verification code
  mailer
    .sendVerification(
      newUser.email,
      newUser.name,
      `${env.FRONT_END_HOST_URL}/verify-email/${rawCode}`
    )
    .then(() => logger.info('Email was sent successfully'))
    .catch((err) => logger.error(err, 'Failed to send verification email'))

  // 5- Return user
  return newUser
}

export const login = async (
  loginData: LoginData,
  deviceInfo: ISession['deviceInfo']
) => {
  // 1- Check if user exist
  const { email, password } = loginData
  const user = await User.findOne({ email }).populate('guideProfile')
  if (!user)
    throw new AppError('Invalid credentials', HttpStatusCode.UNAUTHORIZED)

  // 2- Check provider
  if (user.provider === 'google') {
    throw new AppError(
      'Please logged in using gmail',
      HttpStatusCode.UNAUTHORIZED
    )
  }

  // 3- Check if password is correct
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect)
    throw new AppError('Invalid credentials', HttpStatusCode.UNAUTHORIZED)
  // 4- Check if user is verified

  if (!user.isVerified)
    throw new AppError(
      'Check your email box to verify your account',
      HttpStatusCode.FORBIDDEN
    )
  // 5- Create session id & Sign JWT
  const sessionId = uuidv4()
  const accessToken = signToken({ userId: user._id, sessionId })
  const refreshToken = generateRefreshToken()
  // 6- Create session
  await Session.create({
    userId: user._id,
    sessionId,
    refreshToken,
    deviceInfo,
    expiresAt: refreshTokenExpiry(env.REFRESH_TOKEN_EXPIRES_IN)
  })
  // 6- Return user,accessToken & refreshToken
  return { accessToken, refreshToken, sessionId, user }
}

export const verifyEmail = async (rawCode: string) => {
  // 1- Verify if code is exist and not expired
  const hashedCode = hashCode(rawCode)
  const verificationCode = await VerificationCode.findOne({
    code: hashedCode,
    type: VerificationCodeType.EMAIL_VERIFICATION,
    expiresAt: { $gt: new Date() }
  })
  if (!verificationCode)
    throw new AppError(
      'Invalid or expired verification code.',
      HttpStatusCode.NOT_FOUND
    )
  // 2- Check if user is still exist then update
  const user = await User.findOneAndUpdate(
    { _id: verificationCode.userId },
    { isVerified: true },
    {
      new: true
    }
  )
  if (!user)
    throw new AppError(
      'User is not exist, maybe it deleted.',
      HttpStatusCode.NOT_FOUND
    )
  // 3- Delete verification code after finish
  await verificationCode.deleteOne()
}

export const forgotPassword = async (email: string) => {
  // 1- Check if user exist
  const user = await User.findOne({ email })
  if (!user) throw new AppError("User doesn't exist.", HttpStatusCode.NOT_FOUND)
  // 2- Generate password verification code
  const rawCode = generateSecureCode()
  await VerificationCode.create({
    userId: user._id,
    type: VerificationCodeType.PASSWORD_RESET,
    code: hashCode(rawCode),
    expiresAt: afterFifteenMinutes()
  })
  // 3- Send reset password email
  mailer
    .sendPasswordReset(
      user.email,
      user.name,
      `${env.FRONT_END_HOST_URL}/reset-password/${rawCode}`
    )
    .then(() => logger.info('Email was sent successfully'))
    .catch((err) => logger.error(err, 'Failed to send reset-password email'))

  // 4- Delete all session related with this user (log out all)
  // await Session.deleteMany({ userId: user._id })
}

export const resetPassword = async (rawCode: string, newPassword: string) => {
  // 1- Check if code is exist and not expired
  const hashedCode = hashCode(rawCode)
  const resetPasswordCode = await VerificationCode.findOne({
    code: hashedCode,
    type: VerificationCodeType.PASSWORD_RESET,
    expiresAt: { $gt: new Date() }
  })
  if (!resetPasswordCode)
    throw new AppError(
      'Invalid or expired reset password code.',
      HttpStatusCode.BAD_REQUEST
    )
  // 2-Check if user exist and update password
  const user = await User.findOne({ _id: resetPasswordCode.userId })
  if (!user)
    throw new AppError(
      'This user is not exist any more',
      HttpStatusCode.NOT_FOUND
    )
  user.password = newPassword
  await user.save()
  // 3- Delete reset password code after finish
  await resetPasswordCode.deleteOne()
  // 4-Optionally kill all sessions by making them inActive
  await Session.updateMany(
    { userId: user._id },
    { isActive: false, lastAccessedAt: new Date() }
  )
}

export const logout = async (sessionId: string) => {
  // 1- Get active session related to this id  then update it
  await Session.updateOne(
    { sessionId },
    { isActive: false, revokedAt: new Date() }
  )
  // 2- (alternative): Delete the session entirely
  // await session.deleteOne()
}

export const refresh = async (refreshToken: string, sessionId: string) => {
  // wait her 10 seconds for testing purposes
  //await new Promise((resolve) => setTimeout(resolve, 6000))
  // 1- Get related session
  const session = await Session.findOne({
    sessionId,
    refreshToken,
    isActive: true
  })
  if (
    !session ||
    !session.isActive ||
    session.expiresAt < new Date() ||
    session.revokedAt
  ) {
    await Session.deleteOne({ sessionId }) // clean up
    throw new AppError(
      'Session is invalid, expired, or revoked. Please log in again.',
      HttpStatusCode.UNAUTHORIZED
    )
  }
  // 2- Get user related to this session
  const user = await User.findById(session.userId).populate('guideProfile')
  if (!user)
    throw new AppError(
      'TUser associated with this session was not found.',
      HttpStatusCode.NOT_FOUND
    )
  // 3- Rotate tokens
  const newAccessToken = signToken({ userId: session.userId, sessionId })
  const newRefreshToken = generateRefreshToken()
  session.refreshToken = newRefreshToken
  session.lastAccessedAt = new Date()
  session.expiresAt = refreshTokenExpiry(env.REFRESH_TOKEN_EXPIRES_IN)
  await session.save()

  return { newAccessToken, newRefreshToken, user }
}
