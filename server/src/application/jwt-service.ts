import { UserDbType } from '../types'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

interface JwtPayload {
    userId: number
}

const JWT_SECRET = process.env.JWT_SECRET || 'test'
export const jwtService = {
    async createJWT(userId: number) {
        return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' })
    },

    async getUserIdByToken(token: string) {
        try {
            const result = jwt.verify(token, JWT_SECRET) as JwtPayload
            return result.userId
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async isTokenValid(token: string) {
        try {
            jwt.verify(token, JWT_SECRET)
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    },
}
