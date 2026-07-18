import { Router } from 'express'
import authRoutes from './authRoutes'
import gigRoutes from './gigRoutes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/gigs', gigRoutes)

export default router
