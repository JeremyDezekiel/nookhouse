import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from '../components/index'

function MainLayout() {
    return (
        <main className='container mx-auto mt-5'>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </main>
    )
}

export default MainLayout