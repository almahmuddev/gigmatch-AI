import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  googleId?: string
  avatar?: string
  skills: string[]
  bio?: string
  createdAt: Date
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // select: false so password never accidentally leaks in normal queries
    password: { type: String, select: false },
    googleId: { type: String },
    avatar: { type: String },
    skills: { type: [String], default: [] },
    bio: { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model<IUser>('User', userSchema)
