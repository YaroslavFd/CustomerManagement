import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.tsx'

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate()
    const { isAuthorized } = useAuth()

    useEffect(() => {
        const checkAuthorization = async () => {
            const result = await isAuthorized()
            if (!result) {
                navigate('/login')
            }
        }

        checkAuthorization()
    }, [])

    return children
}
