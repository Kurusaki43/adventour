import { model, Schema } from 'mongoose'
import { ISession } from '@interfaces/session.interface'

const sessionSchema = new Schema<ISession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Session should linked to a user'],
      index: true // fast lookup by user
    },
    sessionId: {
      type: String,
      required: true,
      unique: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    expiresAt: {
      type: Date, // match refresh token expiry
      required: [true, 'Session should have a period of expiration'],
      index: { expireAfterSeconds: 0 }
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now
    },
    revokedAt: {
      type: Date // when the session was killed (if applicable)
    },
    isActive: {
      type: Boolean,
      default: true
    },
    refreshToken: {
      type: String,
      required: [true, 'A session should have a refresh token.']
    },
    deviceInfo: {
      addressIP: String,
      browser: String,
      version: String,
      os: String,
      device: String
    }
  },
  { timestamps: true }
)

export const Session = model<ISession>('Session', sessionSchema)
