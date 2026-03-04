import { Router } from 'express'
import {
	getFacilities,
	getFacilityWithID,
	saveFacility,
	deleteFacility,
	updateFacility
} from '../controllers/facilityController.js'

const router = Router()

router.get('/', getFacilities)

router.get('/:id', getFacilityWithID)

router.post('/', saveFacility)

router.delete('/:id', deleteFacility)

router.patch('/:id', updateFacility)


export default router