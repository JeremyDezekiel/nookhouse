import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
    return (
        <div className='container mx-auto mt-5'>
            <AdminNavbar/>
            <Outlet/>
        </div>
    )
}

export default AdminLayout