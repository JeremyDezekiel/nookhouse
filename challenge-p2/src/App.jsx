import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import ThemeContextProvider from './context/ThemeContext'
import AuthContextProvider from './context/AuthContext'
import PassContextProvider from './context/PassContext'

function App() {
    return (
        <ThemeContextProvider>
            <AuthContextProvider>
                <PassContextProvider>
                    <RouterProvider router={router}/>
                </PassContextProvider>
            </AuthContextProvider>
        </ThemeContextProvider>
    )
}

export default App