import { Request, Response, NextFunction } from 'express'

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>

export const catchAsync =
  (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
