import express from 'express'
import { authMiddleware } from '../middlewares/auth-middleware'
import { usersController } from '../controllers/users-controller'

export const usersRouter = express.Router()

usersRouter.get('/by-login', authMiddleware, usersController.getUser)
