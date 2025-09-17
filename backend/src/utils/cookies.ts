import { CookieOptions, Response } from 'express'
import { env } from '@config/env'
import ms from 'ms'

export const REFRESH_PATH = '/'

export const defaultOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: env.isDev ? false : true,
  path: '/'
}

const refreshTokenOptions: CookieOptions = {
  ...defaultOptions,
  maxAge: ms(env.REFRESH_TOKEN_EXPIRES_IN), //ms('7d'), // 7 days,//
  path: REFRESH_PATH
}

export const setAuthCookies = (
  res: Response,
  refreshToken: string,
  sessionId?: string
) => {
  const response = sessionId
    ? res.cookie('sessionId', sessionId, refreshTokenOptions)
    : res
  return response.cookie('refreshToken', refreshToken, refreshTokenOptions)
}

export const clearAuthCookies = (res: Response) =>
  res
    .clearCookie('refreshToken', refreshTokenOptions)
    .clearCookie('sessionId', refreshTokenOptions)
