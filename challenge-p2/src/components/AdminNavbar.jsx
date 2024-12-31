import React from 'react'
import logo from '../assets/h_1.png'
import { useNavigate } from 'react-router-dom'

function AdminNavbar() {
    const navigate = useNavigate()
    const goToHome = () => {
        navigate('/')
    }
    return (
        <div className='bg-[#CCCCCC] flex justify-center pt-5'>
            <img className='w-[10%] cursor-pointer' src={logo} alt='logo' onClick={goToHome}/>
        </div>
    )
}

export default AdminNavbar