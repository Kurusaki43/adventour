import { NextFunction, Request, Response } from 'express'
import { Tour } from '@models/tour.model'
import { catchAsync } from '@utils/catchAsync'
import { AppError } from '@utils/appError'
import { findAllTours } from '@services/tour.service'
import { createOne, deleteOne, getOne, updateOne } from './factoryHandler'
import {
  deleteTourImagesOnDelete,
  handleTourImagesOnUpdate
} from '@middlewares/tourImageHandler'
import { HttpStatusCode } from '@constants/httpsStatusCode'
import QueryString from 'qs'

// ############## CRUD Operations ###############
export const createTour = createOne(Tour, 'tour')

export const getTour = getOne(Tour, 'tour', [
  { path: 'leadGuide' },
  { path: 'guides' }
  // { path: 'reviews' }
])
export const deleteTour = deleteOne(Tour, {
  onDelete: deleteTourImagesOnDelete
})

export const updateTour = updateOne(Tour, {
  onUpdate: handleTourImagesOnUpdate
})
// ##############################################

export const aliasTopTours = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const limit = `limit=5`
  const sort = `sort=-ratingsAverage,price`
  let url = req.originalUrl.split('/').slice(0, -1).join('/')
  url = [url, '?', limit, '&', sort].join('')
  console.log(url)
  req.originalUrl = url
  next()
}

export const getAllTours = catchAsync(async (req, res) => {
  const parsedQuery = QueryString.parse(req.originalUrl.split('?')[1] || '')

  // Merge params into query (if guideId is passed)
  if (req.params.guideId) {
    parsedQuery.guide = req.params.guideId
  }

  const { tours, totalToursNumber } = await findAllTours(
    parsedQuery,
    req.user?.role
  )
  res.status(HttpStatusCode.OK).json({
    status: 'success',
    totalTours: totalToursNumber,
    data: {
      tours
    }
  })
})

// Statistics and Monthly Plan
export const getTourStats = catchAsync(async (req, res) => {
  const stats = await Tour.aggregate([
    { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: {
        _id: 1
      }
    }
  ])
  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  })
})

export const getReverseGeocode = catchAsync(async (req, res, next) => {
  const { lat, lon } = req.query

  if (!lat || !lon)
    return next(
      new AppError(
        'Latitude and Longitude are required',
        HttpStatusCode.BAD_REQUEST
      )
    )

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
  )
  const data = await response.json()
  res.status(HttpStatusCode.OK).json({
    status: 'success',
    data: {
      address: data
    }
  })
})

export const getMonthlyPlan = catchAsync(
  async (req: Request, res: Response) => {
    const year = +req.params.year
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
          startDates: { $push: '$startDates' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numTourStarts: -1 }
      },
      {
        $limit: 12
      }
    ])
    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    })
  }
)

export const getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params
  const [lat, lng] = latlng.split(',')
  const latitude = parseFloat(lat)
  const longitude = parseFloat(lng)
  let radius: number

  if (isNaN(latitude) || isNaN(longitude))
    return next(
      new AppError(
        'Please provide latitude and longitude in the lat,lng format',
        HttpStatusCode.BAD_REQUEST
      )
    )

  if (unit === 'mi') {
    radius = parseFloat(distance) / 3963.2
  } else if (unit === 'km') {
    radius = parseFloat(distance) / 6378.1
  } else {
    return next(
      new AppError(
        'Unit must be either "mi" (miles) or "km" (kilometers)',
        HttpStatusCode.BAD_REQUEST
      )
    )
  }

  const tours = await Tour.find({
    locations: {
      $geoWithin: { $centerSphere: [[longitude, latitude], radius] }
    }
  })

  res.status(200).json({
    status: 'success',

    data: {
      tours
    }
  })
})
// tourRouter.get('/distances/:latlng/unit/:unit', getToursByDistances)
export const getToursByDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params
  const [lat, lng] = latlng.split(',')
  const latitude = parseFloat(lat)
  const longitude = parseFloat(lng)
  let multiplier: number

  if (isNaN(latitude) || isNaN(longitude)) {
    return next(
      new AppError(
        'Please provide latitude and longitude in the lat,lng format',
        HttpStatusCode.BAD_REQUEST
      )
    )
  }

  if (unit === 'mi') {
    multiplier = 0.000621371 // meters → miles
  } else if (unit === 'km') {
    multiplier = 0.001 // meters → km
  } else {
    return next(
      new AppError(
        'Unit must be either "mi" (miles) or "km" (kilometers)',
        HttpStatusCode.BAD_REQUEST
      )
    )
  }

  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [longitude, latitude] },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
        spherical: true
      }
    },
    {
      $project: {
        name: 1,
        distance: 1
      }
    }
  ])

  res.status(200).json({
    status: 'success',
    data: {
      distances
    }
  })
})

export const getGuideTours = catchAsync(async (req, res) => {
  const guideId = req.params.id

  const tours = await Tour.find({
    $or: [{ leadGuide: guideId }, { guides: guideId }]
  }).populate('leadGuide guides')

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: tours
  })
})
