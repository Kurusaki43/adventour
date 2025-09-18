import { Document, Types } from 'mongoose'
import { IGuideProfile } from './guideProfile.interface'

export const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client',
  GUIDE: 'guide',
  LEADGUIDE: 'lead-guide'
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: Role
  isVerified: boolean
  isActive: boolean
  avatar?: string
  phone?: string
  guideProfile?: Types.ObjectId | IGuideProfile
  provider?: string
  createdAt?: Date
  updatedAt?: string
  comparePassword: (condidatePass: string) => Promise<boolean>
}
