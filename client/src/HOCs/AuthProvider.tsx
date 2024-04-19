import { createContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDbType } from '../types.ts'

interface AuthContextType {
    login: (data: { login: string; password: string }) => Promise<boolean>
    signUp: (data: { fullName: string; login: string; password: string }) => Promise<boolean>
    logout: () => void
    isAuthorized: () => Promise<boolean>
    user: UserDbType | null
}
export const AuthContext = createContext<AuthContextType>({} as AuthContextType)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDbType | null>(null)
    const navigate = useNavigate()

    const login = async (data: { login: string; password: string }) => {
        try {
            const result = await axios.post('http://localhost:5000/api/auth/login', data, {
                withCredentials: true,
            })

            if (result.status === 200) {
                await axios
                    .get('http://localhost:5000/api/users/by-login', {
                        withCredentials: true,
                    })
                    .then((res) => setUser(res.data))
            }

            navigate('/')

            return true
        } catch (error) {
            console.log(error)
        }

        return false
    }

    const signUp = async (data: { fullName: string; login: string; password: string }) => {
        try {
            await axios.post('http://localhost:5000/api/auth/signup', data, {
                withCredentials: true,
            })

            navigate('/')

            return true
        } catch (error) {
            console.log(error)
        }

        return false
    }

    const logout = async () => {
        try {
            await axios.post(
                'http://localhost:5000/api/auth/logout',
                {},
                {
                    withCredentials: true,
                },
            )

            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }

    const isAuthorized = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/check', {
                withCredentials: true,
            })

            if (response.status === 200) {
                return true
            }
        } catch (error) {
            console.log(error)
        }

        return false
    }

    return (
        <AuthContext.Provider value={{ login, logout, signUp, isAuthorized, user }}>
            {children}
        </AuthContext.Provider>
    )
}
