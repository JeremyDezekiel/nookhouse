import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import ThemeContextProvider from './context/ThemeContext'
import AuthContextProvider from './context/AuthContext'

function App() {
    return (
        <ThemeContextProvider>
            <AuthContextProvider>
                <RouterProvider router={router}/>
            </AuthContextProvider>
        </ThemeContextProvider>
    )
}

export default App