import { ReactNode } from 'react'
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react'
import { Center, Group, rem, Table, Text, UnstyledButton } from '@mantine/core'
import classes from './styles.module.css'

interface ThProps {
    children: ReactNode
    reversed: boolean
    sorted: boolean
    onSort(): void
}
export const TableHeader = ({ children, reversed, sorted, onSort }: ThProps) => {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector
    return (
        <Table.Th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group justify='space-between' wrap='nowrap'>
                    <Text fw={500} fz='sm'>
                        {children}
                    </Text>
                    <Center>
                        <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    )
}
