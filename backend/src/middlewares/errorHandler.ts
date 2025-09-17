import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import mongoose, { CastError } from 'mongoose'
import { z } from 'zod'
import { env } from '@config/env'
import { logger } from '@config/logger'
import { HttpStatusCode } from '@constants/httpsStatusCode'
import { AppError } from '@utils/appError'
import {
  isCastError,
  isDuplicateKeyError,
  isMulterError,
  isValidationError,
  isZodError
} from '@utils/helper'
import { MulterError } from 'multer'

export const NotFound = (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(
      `This route ${req.originalUrl} doesn't exist`,
      HttpStatusCode.NOT_FOUND
    )
  )
}

export const errorHandler: ErrorRequestHandler = (
  err: AppError,
  req,
  res,
  next
) => {
  // Handle operational errors
  const error = { ...err }
  error.message = err.message
  error.status = err.status || 'error'
  error.statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR

  if (env.isDev) {
    sendErrorDev(res, error)
    logger.error(error, 'An error occurred')
  } else {
    sendErrorProd(res, error)
  }
}

const sendErrorDev = (res: Response, error: AppError) =>
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    error: error,
    name: error.name
  })

export const sendErrorProd = (res: Response, error: AppError) => {
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message
    })
  }
  if (isZodError(error)) {
    return handleZodError(error, res)
  }
  if (isCastError(error)) {
    return handleCastError(error, res)
  }

  if (isValidationError(error)) {
    return handleValidationError(error, res)
  }

  if (isDuplicateKeyError(error)) {
    return handleDuplicateKeyError(error, res)
  }
  if (isMulterError(error)) {
    return handleMulterError(error, res)
  }

  // Fallback for unknown/unhandled errors
  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Something went very wrong!'
  })
}

const handleCastError = (err: unknown, res: Response) => {
  const error = err as CastError
  const msg = `Invalid Id format: ${error.value}`
  res.status(HttpStatusCode.BAD_REQUEST).json({
    status: 'fail',
    message: msg
  })
}

const handleValidationError = (err: unknown, res: Response) => {
  const error = err as mongoose.Error.ValidationError
  const formattedErrors: Record<string, string> = {}

  for (const key in error.errors) {
    if (error.errors[key]) {
      formattedErrors[key] = error.errors[key].message
    }
  }
  res.status(HttpStatusCode.BAD_REQUEST).json({
    status: 'fail',
    message: formattedErrors
  })
}

const handleDuplicateKeyError = (err: AppError, res: Response) => {
  let msg: string = ''
  if ('keyValue' in err) {
    const field = err.keyValue as { [key: string]: unknown }
    msg = `The field ${Object.keys(field)[0]} should be unique. a value of ${
      Object.values(field)[0]
    } already exists.`
  }
  res.status(HttpStatusCode.BAD_REQUEST).json({
    status: 'fail',
    message: msg
  })
}

function handleZodError(err: unknown, res: Response) {
  const errors: object[] = []
  const error = err as z.ZodError
  error.issues.forEach((issue) => {
    errors.push({ path: issue.path[0], message: issue.message })
  })
  res.status(HttpStatusCode.BAD_REQUEST).json({
    status: 'fail',
    message: 'validation error',
    issues: errors
  })
}

function handleMulterError(err: unknown, res: Response) {
  const error = err as MulterError
  res.status(HttpStatusCode.BAD_REQUEST).json({
    status: 'fail',
    message:
      error.code === 'LIMIT_UNEXPECTED_FILE'
        ? 'File too large'
        : "Can't upload files"
  })
}
