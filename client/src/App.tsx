import { Container, MantineProvider } from '@mantine/core'

import { Outlet } from 'react-router-dom'
import { AuthProvider } from './HOCs/AuthProvider.tsx'
import { UpdateProvider } from './HOCs/UpdateProvider.tsx'
import { useMediaQuery } from '@mantine/hooks'

export const App = () => {
    const matches = useMediaQuery('(max-width: 767px)')

    return (
        <AuthProvider>
            <UpdateProvider>
                <MantineProvider defaultColorScheme='dark'>
                    <Container fluid px={matches ? 10 : 20}>
                        <Outlet />
                    </Container>
                </MantineProvider>
            </UpdateProvider>
        </AuthProvider>
    )
}
