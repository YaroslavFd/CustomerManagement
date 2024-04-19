import { createContext, ReactNode, useState } from 'react'

interface UpdateContextType {
    clientsIsUpdated: boolean
    refreshClients: () => void
}

export const UpdateContext = createContext<UpdateContextType>({} as UpdateContextType)

export const UpdateProvider = ({ children }: { children: ReactNode }) => {
    const [clientsIsUpdated, setClientsIsUpdated] = useState(false)

    const refreshClients = () => {
        setClientsIsUpdated((prevStatus) => !prevStatus)
    }

    return (
        <UpdateContext.Provider value={{ clientsIsUpdated, refreshClients }}>
            {children}
        </UpdateContext.Provider>
    )
}
