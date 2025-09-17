import { RequestHandler } from 'express'
import { ZodSchema } from 'zod'

interface Schemas {
  body?: ZodSchema
  query?: ZodSchema
  params?: ZodSchema
  files?: ZodSchema
}
export const validate = <T extends Schemas>(schemas: T) => {
  const middleware: RequestHandler = async (req, res, next) => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body)
      }
      if (schemas.query) {
        req.query = await schemas.query.parseAsync(req.query)
      }
      if (schemas.files) {
        req.files = await schemas.files.parseAsync(req.files)
      }
      next()
    } catch (err) {
      next(err)
    }
  }
  return middleware
}
