import { IUser } from '@interfaces/user.interface'
import { pickFields } from '@utils/helper'
import { deleteImage } from '@utils/image'
import { Request } from 'express'

// Delete User Avatar Handler
export const deleteUserAvatarOnDelete = async (user: IUser) => {
  const avatar = user?.avatar

  // Delete related avatar
  if (avatar && avatar !== 'avatar.png') deleteImage('users', avatar)
}

// Update User Avatar Handler
export const handleUserAvatarOnUpdate = async (user: IUser, req: Request) => {
  const allowedFields = [
    'name',
    'email',
    'phone',
    'role',
    'isVerified',
    'isActive'
  ]
  // 2- Test if user update its avatar so delete old and update filename in db
  const newUserAvatar = req.file?.filename
  let avatar = user.avatar
  if (newUserAvatar) {
    // Delete old user avatar
    if (avatar && avatar !== 'avatar.png') deleteImage('users', avatar)
    avatar = newUserAvatar
  }
  // 3- update & return
  const updatedFieldsData = pickFields(req.body, allowedFields)

  const updatedUserData: Partial<IUser> = {
    ...updatedFieldsData,
    avatar
  }

  return updatedUserData
}
