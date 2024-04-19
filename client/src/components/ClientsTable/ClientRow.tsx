import React from 'react'
import { Table, NativeSelect } from '@mantine/core'
import classes from './styles.module.css'

interface ClientRowProps {
    row: {
        id: string
        fullName: string
        account_number: string
        birthday: string
        inn: string
        responsible_full_name: string
        status: string
    }

    handleStatusChange: (id: string, newStatus: string) => void
}

export const ClientRow: React.FC<ClientRowProps> = ({ row, handleStatusChange }) => (
    <Table.Tr key={row.id} className={classes.rows}>
        <Table.Td>{row.fullName}</Table.Td>
        <Table.Td>{row.account_number}</Table.Td>
        <Table.Td>{row.birthday}</Table.Td>
        <Table.Td>{row.inn}</Table.Td>
        <Table.Td>{row.responsible_full_name}</Table.Td>
        <Table.Td>
            <NativeSelect
                data={['Не в работе', 'В работе', 'Отказ', 'Сделка закрыта']}
                value={row.status}
                onChange={(event) => handleStatusChange(row.id, event.currentTarget.value)}
            />
        </Table.Td>
    </Table.Tr>
)
