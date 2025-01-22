import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, NavbarLoginRegister } from '../components/index'
import { ThemeContext } from '../context/ThemeContext'

function LoginRegisterLayout() {
    const { theme } = useContext(ThemeContext)

    return (
        <main className={`${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
            <NavbarLoginRegister />
            <div className='container mx-auto mt-5'>
                <Outlet />
            </div>
            <Footer />
        </main>
    )
}

export default LoginRegisterLayout