import mysql from 'mysql2'

export const pool = mysql
    .createPool({
        host: 'localhost',
        user: 'root',
        database: 'CustomerManagement',
        password: 'root',
    })
    .promise()

export const connectDB = async () => {
    try {
        await pool.query('SELECT 1')
        console.log('\n' + 'Connection to MySQL server successfully established')
    } catch (error) {
        console.error('Connection to MySQL server failed', error)
    }
}
