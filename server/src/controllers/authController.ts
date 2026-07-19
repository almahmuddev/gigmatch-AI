import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { OAuth2Client } from 'google-auth-library'
import User from '../models/User'
import { generateToken } from '../utils/generateToken'
import { AuthRequest } from '../middleware/auth'

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const publicUser = (user: any) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  skills: user.skills,
})

export const register = async (req: Request, res: Response) => {
  const { name, email, password, skills } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'name, email and password are all required' })
  }

  const existing = await User.findOne({ email })
  if (existing) {
    return res.status(400).json({ message: 'an account with this email already exists, try logging in' })
  }

  const hashed = await bcrypt.hash(password, 10)
  const user = await User.create({
    name,
    email,
    password: hashed,
    skills: Array.isArray(skills) ? skills : [],
  })
  const token = generateToken(user._id.toString())

  res.status(201).json({ token, user: publicUser(user) })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')
  if (!user || !user.password) {
    return res.status(401).json({ message: 'incorrect email or password' })
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.status(401).json({ message: 'incorrect email or password' })
  }

  const token = generateToken(user._id.toString())
  res.json({ token, user: publicUser(user) })
}

export const googleLogin = async (req: Request, res: Response) => {
  const { idToken } = req.body

  if (!idToken) {
    return res.status(400).json({ message: 'missing google idToken' })
  }

  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  })

  const payload = ticket.getPayload()
  if (!payload?.email) {
    return res.status(400).json({ message: 'could not verify that google account' })
  }

  let user = await User.findOne({ email: payload.email })

  if (!user) {
    user = await User.create({
      name: payload.name || payload.email.split('@')[0],
      email: payload.email,
      googleId: payload.sub,
      avatar: payload.picture,
    })
  } else if (!user.googleId) {
    user.googleId = payload.sub
    if (payload.picture) user.avatar = payload.picture
    await user.save()
  }

  const token = generateToken(user._id.toString())
  res.json({ token, user: publicUser(user) })
}

export const getMe = async (req: AuthRequest, res: Response) => {
  res.json({ user: publicUser(req.user) })
}
