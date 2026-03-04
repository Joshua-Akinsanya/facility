import { type User } from '../models/userModel.js'

enum UserRole {
	ADMIN = 'ADMIN',
	OWNER = 'OWNER',
	USER = 'USER'
}

// Includes info needed in a login form
// ie username or email and password

type UserLoginPayload = {
	// At least either username or email MUST NOT be NULL
	username?: string,
	email?: string,
	password: string
}

// When passing and getting user info from req.body 
// Generally for create and update User requests
type UserRequestPayload = Omit<User, 'passwordHash'> & { password: string }

// Intended for use as JWT payload type
type UserTokenPayload = {
	id: string
	username: string
	email: string
	role: string
}

// Created a type that contains info that will be useful when passing it across
// different middlewares. Renamed copied type to make it match use case and
// make the code make sense

type UserRequestInfo = UserTokenPayload

export {
	UserRole,
	type UserLoginPayload,
	type UserRequestPayload,
	type UserTokenPayload,
	type UserRequestInfo
}