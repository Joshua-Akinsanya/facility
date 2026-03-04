import mongoose, { type InferSchemaType } from 'mongoose'
import { UserRole } from '../types/userTypes.js'

const Schema = mongoose.Schema

const userSchema = new Schema({
	username: { 
		type: String, 
		required: true,
		trim: true,
		unique: true
	},
	email: { 
		type: String, 
		required: true,
		unique: true
	},
	passwordHash: { 
		type: String, 
		required: true,
		select: false 
	},
	role: { 
		type: String, 
		enum: Object.values(UserRole),
		required: true,
		default: UserRole.USER
	}
	// Field for last login later
}, { timestamps: true })

export type User = InferSchemaType<typeof userSchema>

export default mongoose.model<User>('User', userSchema)