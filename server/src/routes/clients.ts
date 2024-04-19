import express from 'express'
import { clientsController } from '../controllers/clients-controller'
import { authMiddleware } from '../middlewares/auth-middleware'

export const clientsRouter = express.Router()

clientsRouter.get('/all', authMiddleware, clientsController.getClients)
clientsRouter.get('/authorized', authMiddleware, clientsController.getClientsOfAuthorizedUser)
clientsRouter.post('/', authMiddleware, clientsController.createClient)
clientsRouter.put('/:id', authMiddleware, clientsController.updateClientsStatus)
