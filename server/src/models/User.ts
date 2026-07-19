import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  googleId?: string
  avatar?: string
  skills: string[]
  bio?: string
  recentViews: Types.ObjectId[]
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
    // last ~15 gigs viewed while logged in - lets recommendations pick up on interest
    // even before someone's declared skills catch up to what they're actually browsing
    recentViews: { type: [Schema.Types.ObjectId], ref: 'Gig', default: [] },
  },
  { timestamps: true }
)

export default mongoose.model<IUser>('User', userSchema)
