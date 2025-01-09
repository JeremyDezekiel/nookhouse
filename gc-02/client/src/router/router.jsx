import { createBrowserRouter } from 'react-router-dom'
import { MainLayout, AdminLayout } from '../layout/index'
import { HomePage, AdminPage, LoginPage, RegisterPage, ErrorPage, AddProductPage, EditProductPage } from '../pages/index'

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
            },
            {
                path: '/add-product',
                element: <AddProductPage/>
            },
            {
                path: '/edit-product/:id',
                element: <EditProductPage/>
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage/>
    }
])

export default router