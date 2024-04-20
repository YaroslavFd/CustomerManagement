import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

export const pool = mysql
    .createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        database: process.env.DB_DATABASE_NAME || 'CustomerManagement',
        password: process.env.DB_PASSWORD || 'root',
    })
    .promise()

export const connectDB = async () => {
    try {
        await pool.query('SELECT 1')
        console.log('\n' + 'Connection to MySQL server successfully established')

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT,
                full_name VARCHAR(100),
                login VARCHAR(100),
                password VARCHAR(100),
                PRIMARY KEY(id)
            )
        `)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS clients (
                id INT AUTO_INCREMENT,
                user_id INT,
                account_number INT,
                last_name VARCHAR(50),
                first_name VARCHAR(50),
                middle_name VARCHAR(50),
                birthday DATE,
                inn VARCHAR(100) UNIQUE,
                responsible_full_name VARCHAR(100),
                status ENUM('Не в работе', 'В работе', 'Отказ', 'Сделка закрыта') DEFAULT 'Не в работе',
                PRIMARY KEY(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `)

        console.log('Tables are set up successfully')
    } catch (error) {
        console.error('Connection to MySQL server failed', error)
    }
}
