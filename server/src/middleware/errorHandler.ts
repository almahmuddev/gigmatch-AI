import { Request, Response, NextFunction } from 'express'

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  const status = err.statusCode || 500
  res.status(status).json({ message: err.message || 'something went wrong on our end, try again' })
}
