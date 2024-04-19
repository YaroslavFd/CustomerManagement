import { NextFunction, Request, Response } from 'express'
import { jwtService } from '../application/jwt-service'
import { usersRepository } from '../repositories/users-repository'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let token

    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (req.cookies?.authToken) {
        token = req.cookies.authToken
    }

    if (!token) {
        res.status(401).send('Unauthorized')
        return
    }

    const userId = await jwtService.getUserIdByToken(token)

    if (userId) {
        req.user = await usersRepository.findUserById(userId)
        next()
        return
    }

    res.status(401).send('Unauthorized')
}
