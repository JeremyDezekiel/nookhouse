import React, { createContext, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'

export const ThemeContext = createContext()

function App() {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme(prevValue => prevValue === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <RouterProvider router={router}/>
        </ThemeContext.Provider>
    )
}

export default App