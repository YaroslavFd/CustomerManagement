import { useEffect, useState } from 'react'
import { Table, ScrollArea, Text, TextInput, Title, rem } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import axios from 'axios'
import { ClientDbType } from '../../types.ts'
import { useUpdateClients } from '../../hooks/useUpdateClients.tsx'
import { TableHeader } from './TableHeader.tsx'
import { sortData } from './DataUtils.ts'
import { ClientRow } from './ClientRow.tsx'

export interface RowData {
    id: string
    account_number: string
    fullName: string
    birthday: string
    inn: string
    responsible_full_name: string
    status: string
}

export const ClientsTable = () => {
    const { clientsIsUpdated, refreshClients } = useUpdateClients()
    const [clients, setClients] = useState<RowData[]>([])

    useEffect(() => {
        const getClients = async () => {
            await axios
                .get('http://localhost:5000/api/clients/authorized', {
                    withCredentials: true,
                })
                .then((res) => {
                    const transformedData = res.data.map((client: ClientDbType) => ({
                        id: client.id.toString(),
                        account_number: client.account_number.toString(),
                        fullName: `${client.last_name} ${client.first_name} ${client.middle_name}`,
                        birthday: new Date(client.birthday).toLocaleDateString(),
                        inn: client.inn,
                        responsible_full_name: client.responsible_full_name,
                        status: client.status,
                    }))
                    setClients(transformedData)
                    setSortedData(transformedData)
                })
                .catch((err) => console.log(err))
        }

        getClients()
    }, [clientsIsUpdated])

    const matches = useMediaQuery('(max-width: 992px)')
    const [search, setSearch] = useState('')
    const [sortedData, setSortedData] = useState(clients)
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
    const [reverseSortDirection, setReverseSortDirection] = useState(false)

    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false
        setReverseSortDirection(reversed)
        setSortBy(field)
        setSortedData(sortData(clients, { sortBy: field, reversed, search }))
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget
        setSearch(value)
        setSortedData(
            sortData(clients, {
                sortBy,
                reversed: reverseSortDirection,
                search: value,
            }),
        )
    }

    const handleStatusChange = (id: string, newStatus: string) => {
        axios
            .put(
                `http://localhost:5000/api/clients/${id}`,
                { status: newStatus },
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                if (res.status === 204) {
                    refreshClients()
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const rows = sortedData.map((row) => (
        <ClientRow key={row.id} row={row} handleStatusChange={handleStatusChange} />
    ))

    if (!clients.length)
        return (
            <Title order={2} mt='xl'>
                Client list is empty 🫤
            </Title>
        )

    return (
        <ScrollArea>
            <TextInput
                placeholder='Search by any field'
                mb='md'
                leftSection={
                    <IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
                value={search}
                onChange={handleSearchChange}
            />
            <Table
                horizontalSpacing='md'
                verticalSpacing='xs'
                miw={950}
                layout='fixed'
                highlightOnHover={!matches}
            >
                <Table.Tbody>
                    <Table.Tr>
                        <TableHeader
                            sorted={sortBy === 'fullName'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('fullName')}
                        >
                            Full Name
                        </TableHeader>
                        <TableHeader
                            sorted={sortBy === 'account_number'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('account_number')}
                        >
                            Account Number
                        </TableHeader>
                        <TableHeader
                            sorted={sortBy === 'birthday'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('birthday')}
                        >
                            Birthday
                        </TableHeader>
                        <TableHeader
                            sorted={sortBy === 'inn'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('inn')}
                        >
                            INN
                        </TableHeader>
                        <TableHeader
                            sorted={sortBy === 'responsible_full_name'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('responsible_full_name')}
                        >
                            Responsible name
                        </TableHeader>
                        <TableHeader
                            sorted={sortBy === 'status'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('status')}
                        >
                            Status
                        </TableHeader>
                    </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={Object.keys(clients[0]).length}>
                                <Text fw={500} ta='center'>
                                    Nothing found
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    )
}
