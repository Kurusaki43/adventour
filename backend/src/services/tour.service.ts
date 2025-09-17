import { Tour } from '@models/tour.model'
import { APIFeatures } from '@utils/apiFeatures'

export const findAllTours = async (
  parsedQuery: Record<string, unknown>,
  userRole?: string
) => {
  // Handle duration filter
  let newParsedQuery = parsedQuery
  if (parsedQuery.duration) {
    let durationFilter = {}
    durationFilter =
      parsedQuery.duration === '1'
        ? {
            $or: [
              { durationUnit: 'hour' },
              { $and: [{ duration: 1, durationUnit: 'day' }] }
            ]
          }
        : {
            $and: [
              {
                duration: { gte: Number(parsedQuery.duration) },
                durationUnit: 'day'
              }
            ]
          }
    newParsedQuery = {
      ...parsedQuery,
      ...durationFilter
    }
    delete newParsedQuery.duration
  }
  //  Handle startDate filter
  if (parsedQuery.startDates) {
    const [year, month, day] = (parsedQuery.startDates as string)
      .split('-')
      .map(Number)

    // Start and end of the day in UTC
    const start = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
    const end = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999))

    // newParsedQuery.startDates = { gte: start, lte: end }
    newParsedQuery.startDates = {
      $elemMatch: { gte: start, lte: end }
    }
  }

  // --- Handle guide filter ---
  if (parsedQuery.guide) {
    const guideId = parsedQuery.guide as string
    newParsedQuery.$or = [{ leadGuide: guideId }, { guides: guideId }]
    delete newParsedQuery.guide
  }
  // // ✅ Enforce published filter unless admin
  // if (userRole !== 'admin') {
  //   console.log('Set Status published')
  //   newParsedQuery.status = 'published'
  // }
  // --- Apply filters, sorting, pagination ---
  const features = new APIFeatures(Tour, newParsedQuery, {
    searchFields: ['name', 'description', 'summary']
  })
    .filter()
    .sort()
    .limitFields()
    .paginate()

  const tours = await features.query

  const totalToursNumber = await Tour.countDocuments(features.filterQuery)

  return {
    tours,
    totalToursNumber
  }
}
