import { type Request, type RequestHandler, type Response } from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel, { type User } from '../models/userModel.js'
import { 
	type UserRequestPayload, 
	type UserLoginPayload,
	type UserTokenPayload
} from '../types/userTypes.js'
import { type IParamUserID } from '../types/params.js'


const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await userModel.find({}).sort({createdAt: -1})
		res.status(200).json(users)
	} catch(error) {
		res.status(400).json({ error: error })
	}
}

const getUserWithID = async (req: Request, res: Response) => {
	// Type casting due to conflicting request types between 
	// controllers and middlewares
	const { id } = req.params as any & IParamUserID

	if(!id){
		return res.status(400).json({error: 'ID not sent'})
	}

	if(!mongoose.Types.ObjectId.isValid(id)){
		return res.status(404).json({error: 'User not found'})
	}

	const user = await userModel.findById(id)

	if(!user){
		return res.status(404).json({error: 'User not found'})
	}
	res.status(200).json(user)
}


const createUser = async (req: Request<any, any, UserRequestPayload>, res: Response) => {
	const newUser = req.body
	const { password, ...userNoPassword} = newUser

	const user: User = { 
		...userNoPassword,
		passwordHash: await bcrypt.hash(password, 10)
	}

	try {
		const savedUser = await userModel.create(user)
		const { passwordHash, ...userNoPasswordHash } = savedUser.toObject()
		res.status(201).json(userNoPasswordHash)
	} catch (error) {
		res.status(400).json({ error: error })
	}
}


const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params as any & IParamUserID
	
	if(!id){
		return res.status(400).json({error: 'ID not sent'})
	}

	if(!mongoose.Types.ObjectId.isValid(id)){
		return res.status(404).json({error: 'User not found'})
	}

	const user = await userModel.findOneAndDelete({_id: id})

	if(!user) {
		return res.status(404).json({error: 'User not found'})
	}

	res.sendStatus(204)
}


const updateUser = async (req: Request<any, any, UserRequestPayload>,
							res: Response) => {

	const { id } = req.params as any & IParamUserID
	const userPayload = req.body

	if(!id){
		return res.status(400).json({error: 'ID not sent'})
	}

	if(!mongoose.Types.ObjectId.isValid(id)){
		return res.status(404).json({error: 'User not found'})
	}

	const { password, ...userNoPassword } = userPayload

	const user: User = {
		...userNoPassword,
		passwordHash: await bcrypt.hash(password, 10)
	}

	const formerUserInfo = await userModel.findOneAndUpdate({_id: id}, {...user})

	if(!formerUserInfo){
		return res.status(404).json({error: 'User not found'})
	}

	const { passwordHash, ...formerUserInfoNoHash } = formerUserInfo.toObject()

	res.status(200).json(formerUserInfoNoHash)
}


const userLogin = async (req: Request<any, any, UserLoginPayload>, res: Response) => {
	const loginPayload = req.body
	
	if(loginPayload == null) {
		return res.status(400).json({ error: 'Empty payload' })
	}

	if(loginPayload.username == null && loginPayload.email == null) {
		return res.status(400).json({ error: 'No username or email provided' })
	}

	let userDocument: mongoose.Document

	if(loginPayload.username != null) {
		userDocument = await
			userModel.findOne({ 'username': loginPayload.username })
					.select('+passwordHash')

		if(!userDocument) {
			return res.status(404).json({ error: 'User not found' })
		}
	} else if(loginPayload.email != null) {
		
		userDocument = await
			userModel.findOne({ 'email': loginPayload.email })
					.select('+passwordHash')

		if(!userDocument) {
			return res.status(404).json({ error: 'User not found' })
		}
	} else { 
		// This else block was added due to Typescript giving me crap about
		// userDocument potentially being 'undefined'

		return res.status(404).json({ error: 'User not found' })
	}
		
	const user = userDocument.toObject()
	
	try {

		if(await bcrypt.compare(loginPayload.password, user.passwordHash)){
			const tokenPayload: UserTokenPayload = {
				id: user._id,
				username: user.username,
				email: user.email,
				role: user.role
			}

			const accessToken = jwt.sign(
				tokenPayload,
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '120s' }
			)

			return res.status(200).json({ accessToken: accessToken })
			
		} else {
			return res.status(401).json({ error: 'Invalid username or password' })
		}
	} catch (error) {
		console.error(error)
		return res.sendStatus(500)
	}
}

export {
	getUsers,
	getUserWithID,
	createUser,
	deleteUser,
	updateUser,
	userLogin
}