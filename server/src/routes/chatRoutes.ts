import { Router } from 'express'
import { chat } from '../controllers/chatController'
import { optionalAuth } from '../middleware/optionalAuth'

const router = Router()

router.post('/', optionalAuth, chat)

export default router
