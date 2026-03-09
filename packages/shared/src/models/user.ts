// Info to be passed to the frontend
export interface UserInfo {
	id: string
	username: string
	email: string
	role: UserRole
	createdAt?: string // Date to string conversion
	updatedAt?: string
}

export enum UserRole {
	USER = 'USER',
	OWNER = 'OWNER',
	ADMIN = 'ADMIN'
}

// Includes info needed in a login form
// ie username or email and password

export type UserLoginPayload = {
		// At least either username or email MUST NOT be NULL
		usernameOrEmail: string,
		password: string
}

// When passing and getting user info from req.body 
// Generally for create User requests

export type NewUserInfo = {
	username: string
	email: string
	password: string
	role: UserRole
}

// When passing and getting user info from req.body 
// Generally for update User requests

export type UpdateUserInfo = {
	username?: string
	email?: string
	password?: string
	role?: string
}

export interface LoginSuccessPayload{
	accessToken: string
	user: UserInfo
}

// Intended for use as JWT payload type
export type UserTokenPayload = Omit<UserInfo, 'createdAt' | 'updatedAt'>

// Created a type that contains info that will be passed in the request object
// across middlewares i.e. req.user
// Renamed copied type to make it match use case and make the code make sense

export type UserRequestInfo = UserTokenPayload
