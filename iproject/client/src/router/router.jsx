import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout, AdminLayout, LoginRegisterLayout } from '../layout/index'
import { HomePage, AdminPage, LoginPage, RegisterPage, ErrorPage, AddProductPage, EditProductPage, UserProfilePage, CartPage, ProductDetailsPage } from '../pages/index'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { role, isLoading } = useContext(AuthContext)
    if (!isLoading) {
        if (role === 'customer') {
            return <Navigate to='/'/>
        }
    }
    return children
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: '/userprofilepage',
                element: <UserProfilePage/>
            },
            {
                path: '/cart',
                element: <CartPage/>
            },
            {
                path: '/product/:id',
                element: <ProductDetailsPage/>
            }
        ]
    },
    {
        element: <LoginRegisterLayout/>,
        children: [
            {
                path: '/register',
                element: <RegisterPage/>
            },
            {
                path: '/login',
                element: <LoginPage/>
            },
        ]
    },
    {
        element: 
        <ProtectedRoute>
            <AdminLayout/>
        </ProtectedRoute>,
        children: [
            {
                path: '/admin',
                element: <AdminPage/>
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