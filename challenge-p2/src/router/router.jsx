import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import HomePage from '../pages/HomePage'
import AdminLayout from '../layout/AdminLayout'
import RegisterPage from '../pages/RegisterPage'
import AdminPage from '../pages/AdminPage'
import LoginPage from '../pages/LoginPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: '/',
                element: <HomePage/>
            }
        ]
    },
    {
        element: <AdminLayout/>,
        children: [
            {
                path: '/admin',
                element: <AdminPage/>
            },
            {
                path: '/register',
                element: <RegisterPage/>
            },
            {
                path: '/login',
                element: <LoginPage/>
            }
        ]
    }
])

export default router