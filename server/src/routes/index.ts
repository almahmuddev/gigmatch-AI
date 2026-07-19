import { Router } from 'express'
import authRoutes from './authRoutes'
import gigRoutes from './gigRoutes'
import recommendationRoutes from './recommendationRoutes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/gigs', gigRoutes)
router.use('/recommendations', recommendationRoutes)

export default router
