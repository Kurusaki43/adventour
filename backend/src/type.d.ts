import { IUser } from './interfaces/user.interface'
import { ISession } from './interfaces/session.interface'

declare global {
  namespace Express {
    interface Request {
      user?: IUser
      session?: ISession
      // For single file uploads
      file?: Multer.File

      // For multiple/named fields
      files?: {
        // Tours
        imageCover?: Multer.File[]
        images?: Multer.File[]

        // Users
        avatar?: Multer.File[]
      }
    }
  }
}
