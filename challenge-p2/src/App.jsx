import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import ThemeContextProvider from './context/ThemeContext'

function App() {
    return (
        <ThemeContextProvider>
            <RouterProvider router={router}/>
        </ThemeContextProvider>
    )
}

export default App