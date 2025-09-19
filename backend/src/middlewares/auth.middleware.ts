import { RequestHandler } from 'express'
import { HttpStatusCode } from '@constants/httpsStatusCode'
import { Session } from '@models/session.model'
import { User } from '@models/user.model'
import { AppError } from '@utils/appError'
import { AccessTokenPayload, verifyToken } from '@utils/jwt'
import { Role } from '@interfaces/user.interface'

export const protect: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new AppError('Not authenticated', HttpStatusCode.UNAUTHORIZED)

  const token = authHeader.split(' ')[1]
  const payload = verifyToken(token) as AccessTokenPayload

  const user = await User.findById(payload.userId)
  if (!user || !user.isVerified)
    throw new AppError(
      'User not found or not verified',
      HttpStatusCode.UNAUTHORIZED
    )
  const session = await Session.findOne({
    sessionId: payload.sessionId,
    userId: user.id,
    isActive: true
  })
  if (!session)
    throw new AppError(
      'Session is invalid or expired',
      HttpStatusCode.UNAUTHORIZED
    )

  req.user = user
  req.session = session
  next()
}

export const restrictTo = (...roles: Role[]): RequestHandler => {
  return async (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError(
        'You do not have permission to perform this action',
        HttpStatusCode.FORBIDDEN
      )
    }
    next()
  }
}
