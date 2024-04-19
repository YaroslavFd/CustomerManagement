import { useContext } from 'react'
import { AuthContext } from '../HOCs/AuthProvider.tsx'

export const useAuth = () => {
    return useContext(AuthContext)
}
