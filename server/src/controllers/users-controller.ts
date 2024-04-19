import { Request, Response } from 'express'
import { clientsRepository } from '../repositories/clients-repository'
import { generateRandomNumber } from '../utils'
import { ClientDbType } from '../types'
import { usersRepository } from '../repositories/users-repository'

export const usersController = {
    async getUser(req: Request, res: Response) {
        const login = req.user!.login

        try {
            const user = await usersRepository.findUserByLogin(login)

            res.status(200).send(user)
        } catch (err) {
            console.log(err)
        }
    },
}
