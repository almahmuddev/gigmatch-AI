import { Router } from 'express'
import authRoutes from './authRoutes'
import gigRoutes from './gigRoutes'
import recommendationRoutes from './recommendationRoutes'
import chatRoutes from './chatRoutes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/gigs', gigRoutes)
router.use('/recommendations', recommendationRoutes)
router.use('/chat', chatRoutes)

export default router
