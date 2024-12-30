import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function AdminLayout() {
    return (
        <div className='container mx-auto mt-5'>
            <AdminNavbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default AdminLayout