import { Request, Response } from 'express'
import Gig from '../models/Gig'
import User from '../models/User'
import { AuthRequest } from '../middleware/auth'

export const getGigs = async (req: Request, res: Response) => {
  const {
    search,
    category,
    minBudget,
    maxBudget,
    location,
    sort,
    page = '1',
    limit = '8',
  } = req.query as Record<string, string>

  const query: any = { status: 'open' }

  if (search) query.$text = { $search: search }
  if (category) query.category = category
  if (location) query.location = location
  if (minBudget || maxBudget) {
    query.budget = {}
    if (minBudget) query.budget.$gte = Number(minBudget)
    if (maxBudget) query.budget.$lte = Number(maxBudget)
  }

  let sortOption: any = { createdAt: -1 }
  if (sort === 'budget_high') sortOption = { budget: -1 }
  if (sort === 'budget_low') sortOption = { budget: 1 }
  if (sort === 'deadline') sortOption = { deadline: 1 }

  const pageNum = Number(page)
  const limitNum = Number(limit)
  const skip = (pageNum - 1) * limitNum

  const [gigs, total] = await Promise.all([
    Gig.find(query).sort(sortOption).skip(skip).limit(limitNum).populate('postedBy', 'name avatar'),
    Gig.countDocuments(query),
  ])

  res.json({
    gigs,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum) || 1,
  })
}

export const getGigById = async (req: Request, res: Response) => {
  const gig = await Gig.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true }).populate(
    'postedBy',
    'name avatar email'
  )

  if (!gig) {
    return res.status(404).json({ message: 'that gig does not exist, or may have been removed' })
  }

  const related = await Gig.find({ category: gig.category, _id: { $ne: gig._id } }).limit(4)

  res.json({ gig, related })
}

export const createGig = async (req: AuthRequest, res: Response) => {
  const { title, shortDescription, fullDescription, category, budget, skills, deadline, location, imageUrl } =
    req.body

  if (!title || !shortDescription || !fullDescription || !budget || !deadline) {
    return res.status(400).json({ message: 'please fill in all the required fields' })
  }

  const gig = await Gig.create({
    title,
    shortDescription,
    fullDescription,
    category,
    budget,
    skills: skills || [],
    deadline,
    location,
    imageUrl,
    postedBy: req.user._id,
  })

  res.status(201).json({ gig })
}

export const getMyGigs = async (req: AuthRequest, res: Response) => {
  const gigs = await Gig.find({ postedBy: req.user._id }).sort({ createdAt: -1 })
  res.json({ gigs })
}

export const getStats = async (req: Request, res: Response) => {
  const [totalGigs, totalFreelancers, categories, budgetAgg] = await Promise.all([
    Gig.countDocuments({ status: 'open' }),
    User.countDocuments(),
    Gig.distinct('category'),
    Gig.aggregate([{ $match: { status: 'open' } }, { $group: { _id: null, total: { $sum: '$budget' } } }]),
  ])

  res.json({
    totalGigs,
    totalFreelancers,
    totalCategories: categories.length,
    totalBudgetPosted: budgetAgg[0]?.total || 0,
  })
}

export const getCategories = async (req: Request, res: Response) => {
  // group by category so the landing page can show a real count per category, not a guess
  const categories = await Gig.aggregate([
    { $match: { status: 'open' } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ])

  res.json({ categories: categories.map((c) => ({ name: c._id, count: c.count })) })
}

export const deleteGig = async (req: AuthRequest, res: Response) => {
  const gig = await Gig.findById(req.params.id)

  if (!gig) {
    return res.status(404).json({ message: 'gig not found' })
  }

  if (gig.postedBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "you can't delete a gig you didn't post" })
  }

  await gig.deleteOne()
  res.json({ message: 'gig deleted' })
}
