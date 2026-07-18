import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { connectDB } from '../config/db'
import User from '../models/User'
import Gig from '../models/Gig'

const demoGigs = [
  {
    title: 'Build a responsive landing page for a SaaS product',
    shortDescription: 'Need a modern, conversion-focused landing page built with Next.js and Tailwind.',
    fullDescription:
      'We are launching a new SaaS product and need a landing page that converts visitors into signups. Should include a hero section, feature highlights, pricing, and testimonials. Fully responsive and fast loading, ideally a Lighthouse score above 90.',
    category: 'Web Development',
    budget: 15000,
    skills: ['Next.js', 'Tailwind CSS', 'React'],
    location: 'remote',
    imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
  },
  {
    title: 'Design a logo and brand identity for a coffee shop',
    shortDescription: 'Looking for a warm, minimal logo plus a small brand guide.',
    fullDescription:
      'A new coffee shop opening in Sylhet needs a logo, color palette, and simple brand guide covering signage, cups, and social media. Should feel cozy and local, not corporate.',
    category: 'Design',
    budget: 8000,
    skills: ['Branding', 'Illustrator', 'Logo Design'],
    location: 'remote',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
  },
  {
    title: 'Develop a REST API for a booking system',
    shortDescription: 'Need a Node.js and Express backend with MongoDB for a small booking app.',
    fullDescription:
      'The API should handle authentication, availability calendars, and booking creation with conflict checks. Documentation with Postman collection is required at handover.',
    category: 'Backend Development',
    budget: 22000,
    skills: ['Node.js', 'Express', 'MongoDB'],
    location: 'remote',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
  },
  {
    title: 'Write 10 SEO-optimized blog articles',
    shortDescription: 'Blog content for a personal finance website, 800-1000 words each.',
    fullDescription:
      'Topics will be provided in a content calendar. Each article needs keyword research, a compelling intro, and a clear call to action at the end. Native-level English required.',
    category: 'Content Writing',
    budget: 12000,
    skills: ['SEO', 'Copywriting', 'Research'],
    location: 'remote',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800',
  },
  {
    title: 'Build a mobile app UI in Figma',
    shortDescription: 'Need full UI design for a fitness tracking app, 15-20 screens.',
    fullDescription:
      'Looking for a clean, motivating UI for a fitness app covering onboarding, workout tracking, and progress charts. Deliverables should include a full design system and prototype.',
    category: 'UI/UX Design',
    budget: 18000,
    skills: ['Figma', 'Mobile Design', 'Prototyping'],
    location: 'remote',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
  },
  {
    title: 'WordPress site migration and speed optimization',
    shortDescription: 'Existing WordPress site needs migrating to new hosting and speed fixes.',
    fullDescription:
      'The current site is slow (5+ second load time) and needs migration to a new host, caching setup, and image optimization. Elementor is used for page building.',
    category: 'WordPress',
    budget: 9000,
    skills: ['WordPress', 'Elementor', 'Performance'],
    location: 'onsite',
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
  },
  {
    title: 'Edit a 10-minute YouTube video',
    shortDescription: 'Raw footage needs editing, color grading, and simple motion titles.',
    fullDescription:
      'Weekly video for a tech review channel. Need jump cut editing, background music, and lower-third titles. Turnaround within 48 hours preferred.',
    category: 'Video Editing',
    budget: 5000,
    skills: ['Premiere Pro', 'Color Grading', 'Motion Graphics'],
    location: 'remote',
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
  },
  {
    title: 'Data entry and cleanup for a product catalog',
    shortDescription: 'Clean and standardize 2,000 product rows in a spreadsheet.',
    fullDescription:
      'Product names, categories, and prices need cleanup and de-duplication in a large spreadsheet before import into Shopify. Attention to detail is critical.',
    category: 'Data Entry',
    budget: 4000,
    skills: ['Excel', 'Google Sheets', 'Data Cleaning'],
    location: 'remote',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  },
]

const run = async () => {
  await connectDB()

  let demoUser = await User.findOne({ email: 'demo@gigmatch.ai' })

  if (!demoUser) {
    const hashed = await bcrypt.hash('Demo@123', 10)
    demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@gigmatch.ai',
      password: hashed,
      skills: ['React', 'Node.js', 'MongoDB'],
      bio: 'This is a demo account for exploring GigMatch AI.',
    })
    console.log('demo user created: demo@gigmatch.ai / Demo@123')
  } else {
    console.log('demo user already exists, skipping')
  }

  const gigCount = await Gig.countDocuments()
  if (gigCount === 0) {
    const withDeadlines = demoGigs.map((g, i) => ({
      ...g,
      postedBy: demoUser!._id,
      deadline: new Date(Date.now() + (7 + i * 3) * 24 * 60 * 60 * 1000),
    }))
    await Gig.insertMany(withDeadlines)
    console.log(`seeded ${withDeadlines.length} gigs`)
  } else {
    console.log('gigs already exist, skipping seed')
  }

  await mongoose.disconnect()
  console.log('done')
}

run().catch((err) => {
  console.error('seed failed:', err)
  process.exit(1)
})
