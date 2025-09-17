/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'
import { env } from '@config/env'
import { ISession } from '@interfaces/session.interface'
import { IUser } from '@interfaces/user.interface'
import { validateExpiresIn } from './helper'
import { HttpStatusCode } from '@constants/httpsStatusCode'
import { AppError } from './appError'

type SignOptionsAndSecret = SignOptions & {
  secret: string
}

type VerifyOptionsAndSecret = VerifyOptions & {
  secret: string
}

export type AccessTokenPayload = {
  userId: IUser['_id']
  sessionId: ISession['_id']
}

const AccessTokenOptions: SignOptionsAndSecret = {
  expiresIn: validateExpiresIn(env.ACCESS_TOKEN_EXPIRES_IN),
  secret: env.ACCESS_TOKEN_SECRET,
  audience: ['user']
}

export const signToken = (
  payload: AccessTokenPayload,
  options: SignOptionsAndSecret = AccessTokenOptions
) => {
  const { secret, ...signOptions } = options
  return jwt.sign(payload, secret, signOptions)
}

export const verifyToken = (
  token: string,
  options: VerifyOptionsAndSecret = AccessTokenOptions
): AccessTokenPayload | undefined => {
  const { secret, ...verifyOptions } = options
  try {
    return jwt.verify(token, secret, verifyOptions) as AccessTokenPayload
  } catch (error) {
    throw new AppError(
      'Invalid token, Please login again',
      HttpStatusCode.UNAUTHORIZED
    )
  }
}
