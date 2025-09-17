import { HttpStatusCode } from '@constants/httpsStatusCode'
import { User } from '@models/user.model'
import { APIFeatures } from '@utils/apiFeatures'
import { AppError } from '@utils/appError'
import { catchAsync } from '@utils/catchAsync'
import { GuideProfile } from '@models/guideProfile.model'
import { hasTourConflict, isGuideAssignableToTour } from '@utils/helper'
import { parseISO } from 'date-fns'
import { IUser, ROLES } from '@interfaces/user.interface'
import { IGuideProfile } from '@interfaces/guideProfile.interface'
import { Tour } from '@models/tour.model'
import mongoose from 'mongoose'
import { createOne, deleteOne, getOne, updateOne } from './factoryHandler'
import {
  deleteUserAvatarOnDelete,
  handleUserAvatarOnUpdate
} from '@middlewares/userAvatarHandler'
import { deleteImage } from '@utils/image'
import { createUserHandler } from '@middlewares/user.middleware'
import QueryString from 'qs'

// ############## CRUD Operations ##############
export const createUser = createOne(User, 'user', {
  onCreate: createUserHandler
})
export const deleteUser = deleteOne(User, {
  onDelete: deleteUserAvatarOnDelete
})
export const updateUser = updateOne(User, {
  onUpdate: handleUserAvatarOnUpdate
})
export const getUser = getOne(User, 'user')
// ##########################################

export const getAllUsers = catchAsync(async (req, res) => {
  // Apply filters, sorting, pagination, etc.
  const parsedQuery = QueryString.parse(req.originalUrl.split('?')[1] || '')
  const features = new APIFeatures(User, parsedQuery, {
    searchFields: ['name']
  })
    .filter()
    .sort()
    .limitFields()
    .paginate()

  // Execute the query
  const users = await features.query

  // Total number of matching documents BEFORE pagination

  const totalUsersNumber = await User.countDocuments(features.filterQuery)
  res.status(HttpStatusCode.OK).json({
    status: 'success',
    totalUsers: totalUsersNumber,
    data: {
      users
    }
  })
})

export const getUsersByIdsParam = catchAsync(async (req, res) => {
  const idsParam = req.query.ids as string

  if (!idsParam) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      status: 'fail',
      message: "Missing 'ids' query parameter"
    })
  }

  const rawIds = idsParam.split(',').map((s) => s.trim())

  const validObjectIds = rawIds
    .filter((id) => mongoose.Types.ObjectId.isValid(id))
    .map((id) => new mongoose.Types.ObjectId(id))

  if (validObjectIds.length === 0) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      status: 'fail',
      message: "No valid ObjectId values provided in 'ids'"
    })
  }

  const users = await User.find({ _id: { $in: validObjectIds } }).populate(
    'guideProfile'
  )

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    totalUsers: users.length,
    data: { users }
  })
})

export const updateMe = catchAsync(async (req, res, next) => {
  // 1- Test if user is authenticated
  const id = req?.user?.id
  const user = await User.findById(id)
  if (!user)
    return next(
      new AppError('You are not authenticated', HttpStatusCode.UNAUTHORIZED)
    )
  // 2- Determine which fields are allowed to update based on role
  const baseFields = ['name', 'phone']

  // 3- Prepare new updated Fields For both user and profile models
  const updatedUserData: Record<string, unknown> = {}

  baseFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updatedUserData[field] = req.body[field]
    }
  })

  // 4- Test if user update its avatar so delete old and update filename in db
  const newUserAvatar = req.body.avatar
  let avatar = user.avatar

  if (newUserAvatar) {
    if (avatar && avatar !== newUserAvatar && avatar !== 'avatar.png')
      deleteImage('users', avatar)
    avatar = newUserAvatar
  }
  const newUserData = {
    ...updatedUserData,
    avatar
  }
  await User.findByIdAndUpdate(id, newUserData)

  // 5- Update profile if user is guide or lead guide
  const role = user.role
  const guideProfileFields = [
    'yearsOfExperience',
    'languagesSpoken',
    'bio',
    'availability',
    'address',
    'imageCover',
    'images'
  ]
  const updatedProfileData: Record<string, unknown> = {}
  if (role === ROLES.GUIDE || role === ROLES.LEADGUIDE) {
    guideProfileFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updatedProfileData[field] = req.body[field]
      }
    })
  }
  const profileCompleted =
    avatar !== 'avatar.png' &&
    updatedProfileData.bio &&
    Array.isArray(updatedProfileData.languagesSpoken) &&
    updatedProfileData.languagesSpoken.length > 0 &&
    Array.isArray(updatedProfileData.availability) &&
    updatedProfileData.availability.length >= 3 &&
    !!updatedProfileData.address

  // Handle replacing old imageCover
  if (req.body.imageCover) {
    const oldCover = await GuideProfile.findOne({ guide: id }).select(
      'imageCover'
    )
    if (oldCover?.imageCover && oldCover.imageCover !== 'default-cover.jpg') {
      deleteImage('guides', oldCover.imageCover) // your helper to delete old files
    }
  }

  // Handle replacing old images if new ones uploaded
  if (req.body.images && Array.isArray(req.body.images)) {
    const oldImages = await GuideProfile.findOne({ guide: id }).select('images')
    if (oldImages?.images?.length) {
      oldImages.images.forEach((img: string) => deleteImage('guides', img))
    }
  }

  if (role === ROLES.GUIDE || role === ROLES.LEADGUIDE) {
    await GuideProfile.findOneAndUpdate(
      { guide: id },
      { ...updatedProfileData, profileCompleted },
      { new: true, upsert: true }
    )
  }
  // Get the final user with populated guideProfile
  const finalUser = await User.findById(id).populate({
    path: 'guideProfile',
    match: { guide: id }
  })

  res.status(200).json({
    status: 'success',
    data: {
      user: finalUser
    }
  })
})

// GET Available Guides

export const getAvailableGuides = catchAsync(async (req, res, next) => {
  const { startDates, tourDuration, tourDurationUnit } = req.body

  // ✅ Validate startDates
  if (!Array.isArray(startDates) || startDates.length === 0) {
    return next(
      new AppError('Start dates are required', HttpStatusCode.BAD_REQUEST)
    )
  }

  // ✅ Validate tourDuration
  const parsedDuration = Number(tourDuration)
  if (isNaN(parsedDuration) || parsedDuration <= 0) {
    return next(
      new AppError('Invalid tour duration', HttpStatusCode.BAD_REQUEST)
    )
  }

  // ✅ Parse dates
  const parsedDates = startDates.map((d) => parseISO(d))

  // ✅ Get all guides with profiles
  const users = (await User.find({
    role: { $in: ['guide', 'lead-guide'] },
    isActive: { $eq: true }
  }).populate('guideProfile')) as (IUser & { guideProfile?: IGuideProfile })[]

  const availableGuides: typeof users = []

  for (const user of users) {
    const profile = user.guideProfile

    // Skip incomplete profiles
    if (!profile || !profile.profileCompleted) continue

    // Step 1: Check availability
    const isAssignable = isGuideAssignableToTour(
      profile.availability,
      parsedDates,
      parsedDuration,
      tourDurationUnit
    )

    if (!isAssignable) continue

    // Step 2: Check for conflicts with existing tours
    const existingTours = await Tour.find({
      $or: [{ guides: user._id }, { leadGuide: user._id }],
      startDates: { $exists: true, $not: { $size: 0 } }
    })

    const hasConflict = hasTourConflict(
      parsedDates,
      existingTours,
      tourDuration,
      tourDurationUnit
    )
    if (hasConflict) continue

    // ✅ Passed both checks
    availableGuides.push(user)
  }

  // ✅ Final response
  res.status(200).json({
    status: 'success',
    results: availableGuides.length,
    data: { guides: availableGuides }
  })
})

export const getGuide = catchAsync(async (req, res) => {
  const { id } = req.params

  const guide = await User.findById(id).populate({
    path: 'guideProfile',
    populate: [{ path: 'leadToursCount' }, { path: 'assistantToursCount' }]
  })

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    data: {
      guide
    }
  })
})

export const getGuides = catchAsync(async (req, res) => {
  const parsedQuery = QueryString.parse(req.originalUrl.split('?')[1] || '')

  // 1. Get only users with role === guide or role === lead-guide
  const guidesCompletedProfileId = (
    await GuideProfile.find({ profileCompleted: true })
  ).map((p) => p._id)
  const features = new APIFeatures(User, parsedQuery)
    .filter({
      $or: [{ role: 'guide' }, { role: 'lead-guide' }],
      guideProfile: { $in: guidesCompletedProfileId }
    })
    .paginate()

  // Execute the query
  const users = await features.query.populate('guideProfile')

  // Total number of matching documents BEFORE pagination
  const totalUsersNumber = await User.countDocuments(features.filterQuery)
  res.status(HttpStatusCode.OK).json({
    status: 'success',
    totalUsers: totalUsersNumber,
    data: {
      users
    }
  })
})
