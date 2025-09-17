import { Document, Types } from 'mongoose'

export interface IAvailability {
  day: string
  from: string
  to: string
}

export interface IGuideProfile extends Document {
  guide: Types.ObjectId
  languagesSpoken: string[]
  availability: IAvailability[]
  bio: string
  yearsOfExperience?: number
  imageCover: string
  images: string[]
  address: string
  profileCompleted: boolean
  leadToursCount?: number
  assistantToursCount?: number
  toursCount?: number
}
