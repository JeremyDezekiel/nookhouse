import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import ThemeContextProvider from './context/ThemeContext'
import AuthContextProvider from './context/AuthContext'
import { Provider } from 'react-redux'
import store from './app/store'

function App() {
    return (
        <ThemeContextProvider>
            <AuthContextProvider>
                <Provider store={store}>
                    <RouterProvider router={router}/>
                </Provider>
            </AuthContextProvider>
        </ThemeContextProvider>
    )
}

export default App