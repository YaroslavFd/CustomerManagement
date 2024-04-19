import express from 'express'
import { authController } from '../controllers/auth-controller'

export const authRouter = express.Router()

authRouter.post('/login', authController.login)
authRouter.post('/signup', authController.signUp)
authRouter.post('/logout', authController.logout)
authRouter.get('/check', authController.checkAuth)
