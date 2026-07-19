import { Router } from 'express'
import { getRecommendations } from '../controllers/recommendationController'
import { protect } from '../middleware/auth'

const router = Router()

router.get('/', protect, getRecommendations)

export default router
