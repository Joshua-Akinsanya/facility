import { Router } from 'express'
import {
	getFacilities,
	getFacilityWithID,
	saveFacility,
	deleteFacility,
	updateFacility
} from '../controllers/facilityController.js'
import { 
	authenticateUser,
	allowAdminOnly
} from '../middleware/authenticate.js'

const router = Router()

router.get('/', authenticateUser, getFacilities)

router.get('/:id', authenticateUser, allowAdminOnly, getFacilityWithID)

router.post('/', authenticateUser, saveFacility)

router.delete('/:id', authenticateUser, deleteFacility)

router.patch('/:id', authenticateUser, updateFacility)


export default router