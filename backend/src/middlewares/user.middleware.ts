import { HttpStatusCode } from '@constants/httpsStatusCode'
import { IUser } from '@interfaces/user.interface'
import { User } from '@models/user.model'
import { AppError } from '@utils/appError'
import { createUserSchema } from '@validations/user.validation'
import { NextFunction, Request, RequestHandler } from 'express'

export const createUserHandler = async (req: Request, next?: NextFunction) => {
  const validBody = createUserSchema.parse(req.body)
  let finalBody: Partial<IUser> = {}
  // 2- Test if user created before
  const isExist = await User.exists({ email: validBody.email })
  if (isExist)
    return next?.(
      new AppError(
        'A user with this email already exists',
        HttpStatusCode.CONFLICT
      )
    )

  // 3- If avatar loaded than save its name in DB
  const userAvatar = req.file?.filename

  finalBody = { ...validBody, avatar: userAvatar }
  return finalBody
}

export const addCurrentUserIdToQueryParams: RequestHandler = (
  req,
  res,
  next
) => {
  req.params.id = req.user?.id
  next()
}
