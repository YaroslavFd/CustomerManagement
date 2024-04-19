import { Request, Response } from 'express'
import { clientsRepository } from '../repositories/clients-repository'
import { generateRandomNumber } from '../utils'
import { ClientDbType } from '../types'

export const clientsController = {
    async getClients(req: Request, res: Response) {
        try {
            const clients = await clientsRepository.findClients()

            res.status(200).send(clients)
        } catch (err) {
            console.log(err)
        }
    },

    async getClientsOfAuthorizedUser(req: Request, res: Response) {
        const user_id = req.user!.id

        try {
            const clients = await clientsRepository.findClientsByUserId(user_id)

            res.status(200).send(clients)
        } catch (err) {
            console.log(err)
        }
    },

    async createClient(req: Request, res: Response) {
        const clientData = req.body
        const user_id = req.user!.id

        try {
            const newClient: Omit<ClientDbType, 'id'> = {
                user_id: user_id,
                account_number: generateRandomNumber(8),
                ...clientData,
            }

            const createdClient = await clientsRepository.addClient(newClient)

            if (!createdClient) {
                return res.status(400).end()
            }

            res.status(201).send(createdClient)
        } catch (err) {
            console.log(err)
        }
    },

    async updateClientsStatus(req: Request, res: Response) {
        const clientId = +req.params.id
        const newStatus = req.body.status

        try {
            const isUpdated = await clientsRepository.updateStatus(clientId, newStatus)

            if (!isUpdated) {
                return res.status(400).end()
            }

            res.status(204).end()
        } catch (err) {
            console.log(err)
        }
    },
}
