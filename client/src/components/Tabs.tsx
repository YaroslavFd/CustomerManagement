import { ComponentType, useState } from 'react'
import { Tabs } from '@mantine/core'

interface MyTabsProps {
    AddClientForm: ComponentType
    ClientsTable: ComponentType
}

export const MyTabs = ({ AddClientForm, ClientsTable }: MyTabsProps) => {
    const [activeTab, setActiveTab] = useState<string | null>('clients')

    return (
        <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List mb='md'>
                <Tabs.Tab value='clients'>Clients</Tabs.Tab>
                <Tabs.Tab value='add-client'>Add client</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='clients'>
                {' '}
                <ClientsTable />{' '}
            </Tabs.Panel>
            <Tabs.Panel value='add-client'>
                {' '}
                <AddClientForm />{' '}
            </Tabs.Panel>
        </Tabs>
    )
}
