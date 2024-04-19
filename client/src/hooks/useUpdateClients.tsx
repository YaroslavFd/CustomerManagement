import { useContext } from 'react'
import { UpdateContext } from '../HOCs/UpdateProvider.tsx'

export const useUpdateClients = () => {
    return useContext(UpdateContext)
}
