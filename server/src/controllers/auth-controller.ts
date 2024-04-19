import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { usersRepository } from '../repositories/users-repository'
import { jwtService } from '../application/jwt-service'

export const authController = {
    async login(req: Request, res: Response) {
        const { login, password } = req.body

        try {
            const user = await usersRepository.findUserByLogin(login)

            if (!user) {
                return res.status(400).send('Неверный логин или пароль!')
            }

            const isValidPassword = await bcrypt.compare(password, user.password)

            if (!isValidPassword) {
                return res.status(400).send('Неверный логин или пароль!')
            }

            const token = await jwtService.createJWT(user.id)

            res.cookie('authToken', token, {
                httpOnly: false,
                secure: false,
                sameSite: 'strict',
            })

            res.status(200).send(token)
        } catch (err) {
            console.log(err)
        }
    },

    async logout(req: Request, res: Response) {
        res.clearCookie('authToken')
        res.status(200).end()
    },

    async signUp(req: Request, res: Response) {
        const { fullName, login, password } = req.body

        if (!fullName || !login || !password) {
            return res.status(400).send()
        }

        try {
            const isUserExist = await usersRepository.findUserByLogin(login)

            if (isUserExist) {
                return res.status(400).send('Пользователь с таким логином уже существует!')
            }

            const passwordHash = await bcrypt.hash(password, 10)
            const createdUser = await usersRepository.createUser(fullName, login, passwordHash)

            if (!createdUser) {
                return res.status(400).send()
            }

            const token = await jwtService.createJWT(createdUser.id)

            res.cookie('authToken', token, {
                httpOnly: false,
                secure: false,
                sameSite: 'strict',
            })

            res.status(201).send(createdUser)
        } catch (err) {
            console.log(err)
        }
    },

    async checkAuth(req: Request, res: Response) {
        const token = req.cookies.authToken

        if (!token) {
            return res.status(401).send({ status: 'unauthorized' })
        }

        const isValid = await jwtService.isTokenValid(token)

        if (!isValid) {
            return res.status(401).send({ status: 'unauthorized' })
        }

        res.status(200).send({ status: 'authorized' })
    },
}
