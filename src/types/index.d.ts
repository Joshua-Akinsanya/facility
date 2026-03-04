import type { RequestHandler } from 'express'
import { type UserRequestInfo } from './userTypes.ts'

interface IParamUserID {
	id: string
}

declare global {
	namespace Express {
		interface Request {
			user?: UserRequestInfo
		}
	}
}

export {}