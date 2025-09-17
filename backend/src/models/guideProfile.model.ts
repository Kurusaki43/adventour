import { IGuideProfile } from '@interfaces/guideProfile.interface'
import mongoose, { model, Schema } from 'mongoose'

const guideProfileSchema = new Schema<IGuideProfile>(
  {
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    languagesSpoken: [String],
    yearsOfExperience: Number,
    availability: [
      {
        day: { type: String, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true }
      }
    ],
    profileCompleted: {
      type: Boolean,
      default: false
    },
    bio: { type: String, maxlength: 1000 },
    address: String,
    imageCover: {
      type: String,
      default: 'default-cover.jpg'
    },
    images: {
      type: [String],
      default: []
    }
  },

  { timestamps: true }
)

guideProfileSchema.virtual('leadToursCount', {
  ref: 'Tour',
  localField: 'user', // 👈 user field inside GuideProfile
  foreignField: 'leadGuide', // 👈 field in Tour that stores user
  count: true
})

guideProfileSchema.virtual('assistantToursCount', {
  ref: 'Tour',
  localField: 'user', // 👈 same
  foreignField: 'guides', // 👈 array of users in Tour
  count: true
})

guideProfileSchema.virtual('toursCount').get(function () {
  return (this.leadToursCount || 0) + (this.assistantToursCount || 0)
})

guideProfileSchema.set('toObject', { virtuals: true })
guideProfileSchema.set('toJSON', { virtuals: true })
export const GuideProfile = model('GuideProfile', guideProfileSchema)
