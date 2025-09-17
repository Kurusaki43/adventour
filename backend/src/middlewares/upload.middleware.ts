// middleware/upload.ts
import { AppError } from '@utils/appError'
import { randomUUID } from 'crypto'
import { RequestHandler } from 'express'
import multer, { FileFilterCallback } from 'multer'
import sharp from 'sharp'

// Extend Express Request to include typed Multer files
interface TourFiles {
  imageCover?: Express.Multer.File[]
  images?: Express.Multer.File[]
}

interface TourRequest extends Express.Request {
  files?: TourFiles
  body: {
    imageCover?: string
    images?: string[]
    [key: string]: unknown
  }
}

const storage = multer.memoryStorage()

// File filter
const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!file.mimetype.startsWith('image/')) {
    cb(new AppError('Only image files are allowed', 400))
  } else {
    cb(null, true)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
})

// Middleware to handle uploading
export const uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 5 }
])

// Middleware to resize images
export const resizeTourImages: RequestHandler = async (req, res, next) => {
  const { files } = req as TourRequest
  if (!files) return next()

  const imageCover = files.imageCover?.[0]
  const images = files.images

  if (imageCover) {
    const code = randomUUID()
    const uniqueName = `tour-${code}-cover.jpeg`

    await sharp(imageCover.buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`./public/uploads/tours/${uniqueName}`)

    req.body.imageCover = uniqueName
  }

  if (images && images.length > 0) {
    req.body.images = []

    await Promise.all(
      images.map(async (file, i) => {
        const code = randomUUID()
        const uniqueName = `tour-${code}-image-${i + 1}.jpeg`

        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`./public/uploads/tours/${uniqueName}`)

        req.body.images!.push(uniqueName)
      })
    )
  }

  next()
}
