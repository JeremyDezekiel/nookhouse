import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function AdminLayout() {
    return (
    <>
        <AdminNavbar/>
        <div className='container mx-auto mt-5'>
            <Outlet/>
        </div>
        <Footer/>
    </>
    )
}

export default AdminLayout