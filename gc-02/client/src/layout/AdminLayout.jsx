import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import { AdminNavbar, Footer } from '../components/index'

function AdminLayout() {
    const { theme } = useContext(ThemeContext)

    return (
    <main className={`${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
        <AdminNavbar/>
        <div className='container mx-auto mt-5'>
            <Outlet/>
        </div>
        <Footer/>
    </main>
    )
}

export default AdminLayout