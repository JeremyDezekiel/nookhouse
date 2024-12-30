import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MainLayout() {
    return (
        <div className='container mx-auto mt-5'>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default MainLayout