import mongoose from 'mongoose'
import { AppError } from './appError'
import { z } from 'zod'
import { HttpStatusCode } from '@constants/httpsStatusCode'
import { DeviceInfo } from '@interfaces/session.interface'
import { Request } from 'express'
import { SignOptions } from 'jsonwebtoken'
import crypto from 'crypto'
import ms from 'ms'
import { MulterError } from 'multer'
import { IAvailability } from '@interfaces/guideProfile.interface'
import { addDays, addHours, format } from 'date-fns'
import { ITour, TourDurationUnit } from '@interfaces/tour.interface'

export const isCastError = (error: AppError) =>
  error instanceof mongoose.Error.CastError ||
  error.name === 'CastError' ||
  (error.message && error.message.includes('Cast to ObjectId'))

export const isValidationError = (error: AppError) =>
  error instanceof mongoose.Error.ValidationError ||
  error.message.includes('validation')

export const isDuplicateKeyError = (error: AppError) =>
  'code' in error && error.code === 11000

export const isZodError = (error: AppError) =>
  error.name === 'ZodError' || error instanceof z.ZodError

export const isMulterError = (error: AppError) =>
  ('code' in error && error.code === 'LIMIT_UNEXPECTED_FILE') ||
  error instanceof MulterError

export const generateError = (message: string, code: HttpStatusCode) => {
  throw new AppError(message, code)
}

export const extractDeviceInfo = (req: Request): DeviceInfo => {
  const addressIP = req.headers['x-forwarded-for']?.length
    ? req.headers['x-forwarded-for'][0]
    : req.ip || (req.socket.remoteAddress as string)
  const {
    browser = 'Unknown',
    version = 'Unknown',
    platform = 'Unknown',
    os = 'Unknown'
  } = req.useragent || {}

  return {
    addressIP,
    browser: browser.trim(),
    version: version.trim(),
    device: platform.trim(),
    os: os.trim()
  }
}

export const generateSecureCode = (length = 32) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length)
}

export const validateExpiresIn = (value: string) => {
  const validPattern = /^\d+(ms|s|m|h|d|w|y)$/ // e.g., 15m, 7d, 1h
  if (!validPattern.test(value)) {
    throw new Error(
      `Invalid expiresIn format, verify in your .env token expiresIn: "${value}"`
    )
  }
  return value as SignOptions['expiresIn']
}

export function refreshTokenExpiry(expireIn: ms.StringValue): Date {
  const msValue = ms(expireIn)
  return new Date(Date.now() + msValue)
}

export const hashCode = (rawCode: string) => {
  return crypto.createHash('sha256').update(rawCode).digest('hex')
}

export const generateRefreshToken = () => crypto.randomBytes(64).toString('hex')

export const pickFields = <T extends object, K extends keyof T>(
  doc: T,
  fields: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>

  fields.forEach((key) => {
    if (key in doc) {
      result[key] = doc[key]
    }
  })

  return result
}

export const isGuideAssignableToTour = (
  availability: IAvailability[],
  startDates: Date[],
  tourDuration: number,
  tourDurationUnit: TourDurationUnit
) =>
  startDates.every((startDate) => {
    if (tourDurationUnit === 'hour') {
      return checkHourlyAvailability(availability, startDate, tourDuration)
    } else {
      return checkDailyAvailability(availability, startDate, tourDuration)
    }
  })
// -------------------- HOURLY TOURS --------------------
function checkHourlyAvailability(
  availability: IAvailability[],
  startDate: Date,
  tourDurationHours: number
) {
  const endDate = addHours(startDate, tourDurationHours)
  const weekday = format(startDate, 'EEE')
  const slot = availability.find((slot) => slot.day === weekday)
  if (!slot) return false

  const startTime = format(startDate, 'HH:mm:ss')
  const endTime = format(endDate, 'HH:mm:ss')

  return slot.from <= startTime && slot.to >= endTime
}

// -------------------- DAILY TOURS --------------------
function checkDailyAvailability(
  availability: IAvailability[],
  startDate: Date,
  tourDurationDays: number
) {
  const endDate = addDays(startDate, tourDurationDays - 1)
  const daysCovered: Date[] = []
  let current = startDate

  while (current <= endDate) {
    daysCovered.push(new Date(current))
    current = addDays(current, 1)
  }
  return daysCovered.every((dayDate, index) => {
    const weekday = format(dayDate, 'EEE')
    const slot = availability.find((slot) => slot.day === weekday)
    if (!slot) return false

    // First day → must start at correct time
    if (index === 0) {
      const startTime = format(startDate, 'HH:mm:ss')
      return slot.from <= startTime
    }
    // Middle days → any availability is fine
    return true
  })
}

export const hasTourConflict = (
  startDates: Date[],
  guideTours: ITour[],
  tourDuration: number,
  durationUnit: TourDurationUnit
): boolean => {
  // Expand the dates for the new tour
  const expandedNewTourDates = expandDates(
    startDates,
    tourDuration,
    durationUnit
  )

  // Compare against each existing tour
  for (const tour of guideTours) {
    const expandedExistingTourDates = expandDates(
      tour.startDates,
      tour.duration,
      tour.durationUnit
    )

    // Check if any date matches
    if (
      expandedNewTourDates.some((date) =>
        expandedExistingTourDates.includes(date)
      )
    ) {
      return true // Conflict found
    }
  }

  return false
}

// Helper to expand tour dates
function expandDates(
  dates: Date[],
  duration: number,
  unit: TourDurationUnit
): string[] {
  const result: string[] = []

  for (const date of dates) {
    // If unit is hour, just take the same date
    if (unit === 'hour') {
      result.push(format(date, 'yyyy-MM-dd'))
    }
    // If unit is day, expand for each day in range
    else if (unit === 'day') {
      for (let i = 0; i < duration; i++) {
        result.push(format(addDays(date, i), 'yyyy-MM-dd'))
      }
    }
  }
  return result
}

// Works well with duration unit = hour
/* 
export const isGuideAssignableToTour = (
  availability: IAvailability[],
  startDates: Date[],
  tourDuration: number,
  TourDurationUnit: TourDurationUnit
) =>
  startDates.every((date) => {
    const tourEndDate = addHours(date, tourDuration)
    // Compared fields
    const weekday = format(date, 'EEE')
    const tourStartAt = format(date, 'HH:mm:ss')
    const tourEndAt = format(tourEndDate, 'HH:mm:ss')

    return availability.some((slot) => {
      const { day, from, to } = slot
      return day === weekday && from <= tourStartAt && to >= tourEndAt
    })
  })

export const hasTourConflict = (
  startDates: Date[],
  guideTours: ITour[]
): boolean => {
  const formattedStartDates = startDates.map((date) =>
    format(date, 'yyyy-MM-dd')
  )

  for (const tour of guideTours) {
    for (const date of tour.startDates) {
      const formattedDate = format(date, 'yyyy-MM-dd')
      if (formattedStartDates.includes(formattedDate)) {
        return true // Conflict found
      }
    }
  }

  return false // No conflicts
}

*/
