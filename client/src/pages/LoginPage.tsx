import { LoginForm } from '../components/LoginForm.tsx'
import { useAuth } from '../hooks/useAuth.tsx'
import { useEffect } from 'react'

export const LoginPage = () => {
    const { logout } = useAuth()

    useEffect(() => {
        logout()
    }, [])

    return (
        <div className='authForm'>
            <LoginForm />
        </div>
    )
}
