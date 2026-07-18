import { Router } from 'express'
import { getGigs, getGigById, createGig, getMyGigs, deleteGig, getStats, getCategories } from '../controllers/gigController'
import { protect } from '../middleware/auth'

const router = Router()

// order matters: these named routes have to come before /:id or express will treat them as an id
router.get('/', getGigs)
router.get('/mine', protect, getMyGigs)
router.get('/stats/summary', getStats)
router.get('/categories/summary', getCategories)
router.get('/:id', getGigById)
router.post('/', protect, createGig)
router.delete('/:id', protect, deleteGig)

export default router
