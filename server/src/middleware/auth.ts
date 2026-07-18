import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

export interface AuthRequest extends Request {
  user?: any
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.cookies?.token

    if (!token) {
      return res.status(401).json({ message: 'you need to be logged in for that' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).json({ message: 'this account no longer exists' })
    }

    req.user = user
    next()
  } catch (err) {
    res.status(401).json({ message: 'your session expired, please log in again' })
  }
}
