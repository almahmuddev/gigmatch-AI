import { Router } from 'express'
import { getGigs, getGigById, createGig, getMyGigs, deleteGig } from '../controllers/gigController'
import { protect } from '../middleware/auth'

const router = Router()

// order matters: /mine has to come before /:id or express will treat "mine" as an id
router.get('/', getGigs)
router.get('/mine', protect, getMyGigs)
router.get('/:id', getGigById)
router.post('/', protect, createGig)
router.delete('/:id', protect, deleteGig)

export default router
