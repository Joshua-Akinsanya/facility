import { Router } from 'express'

import {
	getUsers,
	getUserWithID,
	createUser,
	deleteUser,
	updateUser,
	userLogin
} from '../controllers/userController.js'

import { 
	authenticateUser, 
	allowAdminOnly 
} from '../middleware/authenticate.js'


const router = Router()

router.get('/all', authenticateUser, allowAdminOnly, getUsers)

router.get('/:id', authenticateUser, getUserWithID)

router.post('/new', createUser)

router.delete('/:id', authenticateUser, deleteUser)

router.patch('/:id', authenticateUser, updateUser)

router.post('/login', userLogin)


export default router