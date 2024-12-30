import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import HomePage from '../pages/HomePage'
import AdminLayout from '../layout/AdminLayout'
import RegisterPage from '../pages/RegisterPage'

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
                path: '/register',
                element: <RegisterPage/>
            }
        ]
    }
])

export default router