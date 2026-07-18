import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IGig extends Document {
  title: string
  shortDescription: string
  fullDescription: string
  category: string
  budget: number
  skills: string[]
  deadline: Date
  location: 'remote' | 'onsite'
  imageUrl?: string
  status: 'open' | 'closed'
  views: number
  postedBy: Types.ObjectId
  createdAt: Date
}

const gigSchema = new Schema<IGig>(
  {
    title: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    category: { type: String, required: true },
    budget: { type: Number, required: true },
    skills: { type: [String], default: [] },
    deadline: { type: Date, required: true },
    location: { type: String, enum: ['remote', 'onsite'], default: 'remote' },
    imageUrl: { type: String },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    views: { type: Number, default: 0 },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

// lets the search bar actually search across title/desc/skills instead of just title
gigSchema.index({ title: 'text', shortDescription: 'text', skills: 'text' })

export default mongoose.model<IGig>('Gig', gigSchema)
