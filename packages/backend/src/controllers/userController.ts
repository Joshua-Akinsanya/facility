import { type Request, type Response } from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import {
	type UserLoginPayload,
	type UserTokenPayload,
	type NewUserInfo,
	type UpdateUserInfo
} from '@facility-management/shared'
import { type IParamUserID } from '../types/params.js'

type NewUserHashPassword = Omit<NewUserInfo, 'password'> & { passwordHash: string }
type UpdateUserInfoHashPassword = Omit<UpdateUserInfo, 'password'> & { passwordHash?: string }

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
	const { id } = req.params as unknown as IParamUserID

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


const createUser = async (req: Request<any, any, NewUserInfo>, res: Response) => {
	const newUser = req.body
	const { password, ...userNoPassword} = newUser

	if (password.length < 4) {
		return res.status(400).json({ error: "Password must contain at least 4 characters" })
	}
	const user: NewUserHashPassword = { 
		...userNoPassword,
		passwordHash: await bcrypt.hash(password, 10)
	}

	try {
		const savedUser = await userModel.create(user)
		
		res.status(201).json({
			id: savedUser._id,
			username: savedUser.username,
			email: savedUser.email,
			role: savedUser.role
		})
	} catch (error) {
		res.status(400).json({ error: error })
	}
}


const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params as unknown as IParamUserID
	
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


const updateUser = async (req: Request<any, any, UpdateUserInfo>,
							res: Response) => {

	const { id } = req.params as unknown as IParamUserID
	const userPayload = req.body

	if(!id){
		return res.status(400).json({error: 'ID not sent'})
	}

	if(!mongoose.Types.ObjectId.isValid(id)){
		return res.status(404).json({error: 'User not found'})
	}

	const { password, ...userNoPassword } = userPayload

	const user: UpdateUserInfoHashPassword = {
		...userNoPassword
	}

	if(password != null) {
		user.passwordHash = await bcrypt.hash(password, 10)
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

	if(loginPayload.usernameOrEmail == null) {
		return res.status(400).json({ error: 'No username or email provided' })
	}

	let userDocument: mongoose.Document

	if(loginPayload.usernameOrEmail != null) {
		// Check pattern to know whther it it looks like an email
		userDocument = await
			userModel.findOne({ 'username': loginPayload.usernameOrEmail })
					.select('+passwordHash')

		if(!userDocument) {
			userDocument = await 
				userModel.findOne({ 'email': loginPayload.usernameOrEmail})
						.select('+passwordHash')
			
			if(!userDocument){
				return res.status(404).json({ error: 'User not found' })
			}
		}

	} else { 
		// This else block was added due to Typescript giving me crap about
		// userDocument potentially being 'undefined'

		return res.status(404).json({ error: 'User not found' })
	}
	
	// User has type any here. Must be adjusted
	const { passwordHash, ...user } = userDocument.toObject()
	
	try {

		if(await bcrypt.compare(loginPayload.password, passwordHash)){
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

			return res.status(200).json({ 
				accessToken: accessToken, 
				user: user 
			})
			
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