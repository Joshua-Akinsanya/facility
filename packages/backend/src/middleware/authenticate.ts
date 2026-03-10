import { type NextFunction, type Request, type RequestHandler, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { type UserRequestInfo, UserRole } from '@facility-management/shared'
import { type IParamUserID } from '../types/params.js'

const authenticateUser: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization
    
    if(authHeader == null) {
        return res.status(400).json({error: 'Missing token'})
    }
    
    if(authHeader.split(' ')[0] !== 'Bearer') {
        return res.status(400).json({ error: 'Bad Header format' })
    }
    const accessToken = authHeader.split(' ')[1]
    
    if(accessToken == null) {
        return res.status(400).json({error: 'Missing token'})
    }

    try {
        const userInfo: UserRequestInfo = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        ) as UserRequestInfo

        req.user = userInfo as UserRequestInfo

        const { id } = req.params as any & IParamUserID

        if(id != null){
            if(id !== req.user.id && req.user.role !== UserRole.ADMIN) {
                return res.sendStatus(403)
            }
        }

        next()
    } catch (error) {
        return res.sendStatus(403)
    }
}

// To be called after authenticateUser has been called
const allowAdminOnly = (req: Request, res: Response, next: NextFunction) => {
    if(req.user == null) {
        return res.sendStatus(401)
    }

    if(req.user.role != UserRole.ADMIN) {
        return res.sendStatus(403)
    }

    next()
}
export { authenticateUser, allowAdminOnly }