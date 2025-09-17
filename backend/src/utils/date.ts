import { toDate } from 'date-fns'

export const afterFifteenMinutes = () => new Date(Date.now() + 15 * 60 * 1000)
export const afterOneMonth = () =>
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
export const afterOneDay = () => new Date(Date.now() + 24 * 60 * 60 * 1000)
export const afterOneHour = () => new Date(Date.now() + 60 * 60 * 1000)
export const afterOneMinute = () => new Date(Date.now() + 60 * 1000)
export const afterOneWeek = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
export const afterOneYear = () =>
  new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)

export const isTimeGreater = (t1: string, t2: string): boolean => {
  return toDate(t1) > toDate(t2)
}

export const isTimeLower = (t1: string, t2: string): boolean => {
  return toDate(t1) < toDate(t2)
}

import { parse, isAfter, isBefore, isEqual } from 'date-fns'

const parseTime = (timeStr: string) => parse(timeStr, 'HH:mm:ss', new Date())

export const isTimeInRange = (target: string, from: string, to: string) => {
  const t = parseTime(target)
  const f = parseTime(from)
  const toTime = parseTime(to)
  return (
    (isAfter(t, f) || isEqual(t, f)) &&
    (isBefore(t, toTime) || isEqual(t, toTime))
  )
}
