import { app } from './app'
import dotenv from 'dotenv'
import { connectDB } from './db/db'

dotenv.config()

const port = process.env.PORT || 5000

const startApp = async () => {
    await connectDB()

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()
