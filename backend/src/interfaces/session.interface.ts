import { Document, ObjectId } from 'mongoose'

export interface DeviceInfo {
  addressIP?: string
  browser?: string
  version?: string
  os?: string
  device?: string
}

export interface ISession extends Document {
  userId: ObjectId
  sessionId: string
  refreshToken: string
  createdAt: Date
  updatedAt: Date
  expiresAt: Date
  revokedAt?: Date
  isActive: boolean
  lastAccessedAt: Date
  deviceInfo?: DeviceInfo
}
