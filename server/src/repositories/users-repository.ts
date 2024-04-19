import { pool } from '../db/db'
import { UserDbType } from '../types'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

export const usersRepository = {
    async findUserByLogin(login: string): Promise<UserDbType | null> {
        const query = 'SELECT * FROM users WHERE login = ?'
        const [result] = await pool.query<UserDbType & RowDataPacket[]>(query, [login])

        return (result[0] as UserDbType) || null
    },

    async findUserById(id: number): Promise<UserDbType | null> {
        const query = 'SELECT * FROM users WHERE id = ?'
        const [result] = await pool.query<UserDbType & RowDataPacket[]>(query, [id])

        return (result[0] as UserDbType) || null
    },

    async createUser(
        fullName: string,
        login: string,
        password: string,
    ): Promise<UserDbType | null> {
        const query = `INSERT INTO users (full_name, login, password) 
                       values(?, ?, ?)`
        const [result] = await pool.query<ResultSetHeader>(query, [fullName, login, password])

        if (!result.insertId) {
            return null
        }

        return this.findUserById(result.insertId)
    },
}
