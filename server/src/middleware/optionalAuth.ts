import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { AuthRequest } from './auth'

export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.cookies?.token

    if (!token) return next()

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }
    const user = await User.findById(decoded.id)
    if (user) req.user = user
  } catch {
  }
  next()
}
