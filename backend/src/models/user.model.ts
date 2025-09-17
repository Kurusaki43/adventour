import mongoose, { model, Schema } from 'mongoose'
import { ROLES, type IUser } from '@interfaces/user.interface'
import validator from 'validator'
import bcrypt from 'bcrypt'
import { GuideProfile } from './guideProfile.model'

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'User should have a name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name must not exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'User should have an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'User should have a password'],
      maxlength: [25, 'Password should be at most 25 characters'],
      minlength: [8, 'Password should be at least 8 characters']
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.CLIENT
    },
    avatar: {
      type: String,
      default: 'avatar.png'
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    phone: String,
    isActive: {
      type: Boolean,
      default: false
    },
    guideProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GuideProfile'
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
      }
    },
    toObject: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
      }
    }
  }
)
// Hash password at creation
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Pre-save hook to auto-create guide profile
userSchema.pre('save', async function (next) {
  if (!this.isNew) return next()

  if (this.role === ROLES.GUIDE || this.role === ROLES.LEADGUIDE) {
    const profile = await GuideProfile.create({ guide: this.id })
    this.guideProfile = profile.id
  }
  next()
})

userSchema.methods.comparePassword = async function (condidatePass: string) {
  return await bcrypt.compare(condidatePass, this.password)
}
export const User = model<IUser>('User', userSchema)
