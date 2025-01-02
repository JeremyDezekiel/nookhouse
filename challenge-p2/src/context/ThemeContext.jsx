import { createContext, useState } from "react";

export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {}
})

export default function ThemeContextProvider ({ children }) {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme(prevValue => prevValue === 'light' ? 'dark' : 'light')
    }

    const value = {
        theme, toggleTheme
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}