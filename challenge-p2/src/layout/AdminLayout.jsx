import React, { useContext } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { ThemeContext } from '../context/ThemeContext'

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