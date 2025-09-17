// middleware/upload.ts
import { AppError } from '@utils/appError'
import { randomUUID } from 'crypto'
import { RequestHandler } from 'express'
import multer, { FileFilterCallback } from 'multer'
import sharp from 'sharp'

// Extend Express Request to include typed Multer files
interface GuideFiles {
  imageCover?: Express.Multer.File[]
  avatar?: Express.Multer.File[]
  images?: Express.Multer.File[]
}

interface GuideRequest extends Express.Request {
  files?: GuideFiles
  body: {
    imageCover?: string
    images?: string[]
    avatar?: string
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
    fileSize: 5 * 1024 * 1024 // 5MB max
  }
})

// Middleware to handle uploading
export const uploadGuideImages = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 5 }
])

// Middleware to resize & save
export const resizeGuideImages: RequestHandler = async (req, res, next) => {
  const { files } = req as GuideRequest
  if (!files) return next()

  // ---- Avatar ----
  const avatar = files.avatar?.[0]
  if (avatar) {
    const code = randomUUID()
    const uniqueName = `user-${req.user?.id}-avatar-${code}.jpeg`

    await sharp(avatar.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`./public/uploads/users/${uniqueName}`)

    req.body.avatar = uniqueName
  }

  // ---- Image Cover ----
  const imageCover = files.imageCover?.[0]
  if (imageCover) {
    const code = randomUUID()
    const uniqueName = `guide-${req.user?.id}-cover-${code}.jpeg`

    await sharp(imageCover.buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`./public/uploads/guides/${uniqueName}`)

    req.body.imageCover = uniqueName
  }

  // ---- Images (gallery) ----
  const images = files.images
  if (images && images.length > 0) {
    req.body.images = []

    await Promise.all(
      images.map(async (file, i) => {
        const code = randomUUID()
        const uniqueName = `guide-${req.user?.id}-image-${code}-${i + 1}.jpeg`

        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`./public/uploads/guides/${uniqueName}`)

        req.body.images!.push(uniqueName)
      })
    )
  }

  next()
}
