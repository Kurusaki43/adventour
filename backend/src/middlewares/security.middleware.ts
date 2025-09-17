import { Request, Response, NextFunction } from 'express'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import hpp from 'hpp'

interface FileUpload {
  mimetype: string
  size: number
}

interface RequestWithFiles extends Request {
  files?: FileUpload | FileUpload[]
}

// Rate limiting middleware
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
})

// Specific rate limit for auth routes
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    'Too many accounts created from this IP, please try again after an hour'
})

// Sanitize data against NoSQL query injection
export const sanitizeData = mongoSanitize()

// Set security HTTP headers
export const securityHeaders = helmet()

// Prevent parameter pollution
export const preventParamPollution = hpp({
  whitelist: [
    'duration',
    'ratingsQuantity',
    'ratingsAverage',
    'maxGroupSize',
    'difficulty',
    'price'
  ]
})

// Request size limit middleware
export const requestSizeLimit = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const MAX_SIZE = 10 * 1024 * 1024 // 10MB

  if (
    req.headers['content-length'] &&
    parseInt(req.headers['content-length']) > MAX_SIZE
  ) {
    return res.status(413).json({
      status: 'error',
      message: 'Request entity too large'
    })
  }
  next()
}

// File upload validation middleware
export const validateFileUpload = (
  req: RequestWithFiles,
  res: Response,
  next: NextFunction
) => {
  if (!req.files) return next()

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  const maxFileSize = 5 * 1024 * 1024 // 5MB

  // Assuming req.files is an array of files
  const files = Array.isArray(req.files) ? req.files : [req.files]

  for (const file of files) {
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(415).json({
        status: 'error',
        message: 'Unsupported file type. Only JPEG, PNG and GIF are allowed'
      })
    }

    if (file.size > maxFileSize) {
      return res.status(413).json({
        status: 'error',
        message: 'File too large. Maximum size is 5MB'
      })
    }
  }

  next()
}
