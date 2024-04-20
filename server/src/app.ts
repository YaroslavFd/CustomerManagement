import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { authRouter } from './routes/auth'
import { clientsRouter } from './routes/clients'
import { usersRouter } from './routes/users'

dotenv.config()
export const app = express()

const jsonBodyMiddleware = express.json()

app.use(jsonBodyMiddleware)
app.use(cookieParser())
app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
    }),
)

app.use('/api/auth', authRouter)
app.use('/api/clients', clientsRouter)
app.use('/api/users', usersRouter)
