import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from '../components/index'
import { ThemeContext } from '../context/ThemeContext'

function MainLayout() {
    const { theme } = useContext(ThemeContext)
    
    return (
        <main className={`${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
            <Navbar/>
            <div className='container mx-auto mt-5'>
                <Outlet/>
            </div>
            <Footer/>
        </main>
    )
}

export default MainLayout