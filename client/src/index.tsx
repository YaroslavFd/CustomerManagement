import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './App.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { SignUpPage } from './pages/SignUpPage.tsx'
import { ProtectedRoute } from './HOCs/ProtectedRoute.tsx'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: (
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/login',
                element: <LoginPage />,
                index: true,
            },
            {
                path: '/signup',
                element: <SignUpPage />,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
