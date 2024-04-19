import { pool } from '../db/db'
import { ClientDbType } from '../types'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

export const clientsRepository = {
    async findClients(): Promise<ClientDbType[] | null> {
        const query = 'SELECT * FROM clients'
        const [result] = await pool.query<ClientDbType[] & RowDataPacket[]>(query)

        return result
    },

    async findClientById(id: number): Promise<ClientDbType | null> {
        const query = 'SELECT * FROM clients WHERE id = ?'
        const [result] = await pool.query<ClientDbType & RowDataPacket[]>(query, [id])

        return (result[0] as ClientDbType) || null
    },

    async findClientsByUserId(user_id: number): Promise<ClientDbType[] | null> {
        const query = 'SELECT * FROM clients WHERE user_id = ?'
        const [result] = await pool.query<ClientDbType[] & RowDataPacket[]>(query, [user_id])

        return result
    },

    async addClient(client: Omit<ClientDbType, 'id'>): Promise<ClientDbType | null> {
        const clientKeys: (keyof Omit<ClientDbType, 'id'>)[] = [
            'user_id',
            'account_number',
            'last_name',
            'first_name',
            'middle_name',
            'birthday',
            'inn',
            'responsible_full_name',
            'status',
        ]

        const isValidClient = clientKeys.every(
            (key) => client[key] !== undefined && client[key] !== null,
        )

        if (!isValidClient) {
            return null
        }

        const query = `INSERT INTO clients 
            (user_id, account_number, last_name, 
            first_name, middle_name, birthday, 
            inn, responsible_full_name, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

        const [result] = await pool.query<ResultSetHeader>(query, [
            client.user_id,
            client.account_number,
            client.last_name,
            client.first_name,
            client.middle_name,
            client.birthday,
            client.inn,
            client.responsible_full_name,
            client.status,
        ])

        if (!result.insertId) {
            return null
        }

        return this.findClientById(result.insertId)
    },

    async updateStatus(id: number, status: string): Promise<boolean> {
        const query = 'UPDATE clients SET status = ? WHERE id = ?'
        const [result] = await pool.query<ResultSetHeader>(query, [status, id])

        return result.affectedRows > 0
    },
}
