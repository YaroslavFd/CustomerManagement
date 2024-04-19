import { MyTabs } from '../components/Tabs.tsx'
import { AddClientForm } from '../components/AddClientForm.tsx'
import { ActionIcon, Button, Flex, Title } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { useAuth } from '../hooks/useAuth.tsx'
import { ClientsTable } from '../components/ClientsTable/ClientsTable.tsx'
import { useMediaQuery } from '@mantine/hooks'

export const HomePage = () => {
    const matches = useMediaQuery('(max-width: 767px)')
    const { logout } = useAuth()

    return (
        <div style={{ paddingBottom: '50px' }}>
            <Flex justify='space-between' align='center' gap={30}>
                <Title order={1} size={matches ? 'h2' : 'h1'} my='xl'>
                    Customer Management
                </Title>
                {matches ? (
                    <ActionIcon variant='transparent' aria-label='Logout'>
                        <IconLogout stroke={2} />
                    </ActionIcon>
                ) : (
                    <Button
                        mr='md'
                        variant='outline'
                        onClick={logout}
                        rightSection={<IconLogout size={18} />}
                    >
                        Logout
                    </Button>
                )}
            </Flex>
            <MyTabs AddClientForm={AddClientForm} ClientsTable={ClientsTable} />
        </div>
    )
}
