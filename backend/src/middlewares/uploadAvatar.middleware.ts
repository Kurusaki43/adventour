// middleware/upload.ts
import { AppError } from '@utils/appError'
import { RequestHandler } from 'express'
import multer from 'multer'
import sharp from 'sharp'

// Storage engine with custom filename
const storage = multer.memoryStorage()

// File filter (optional)
const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    cb(new AppError('Only image files are allowed', 400))
  } else {
    cb(null, true)
  }
}

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 2MB max file size
  }
})

// Expose middleware to upload both cover and gallery images
export const uploadUserAvatar = upload.single('avatar')

export const resizeAvatar: RequestHandler = async (req, res, next) => {
  if (!req.file) return next()
  const originalName = req.file.originalname.split('.')[0]
  const uniqueName = `user-${req?.user?.id}-${originalName}.jpeg`
  req.file.filename = uniqueName
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`./public/uploads/users/${uniqueName}`)

  next()
}
