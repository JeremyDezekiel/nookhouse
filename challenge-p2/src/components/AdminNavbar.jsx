import React from 'react'
import logo from '../assets/h_1.png'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import auth from '../config/firebase'
import Swal from 'sweetalert2'

function AdminNavbar() {
    const navigate = useNavigate()
    const goToHome = () => {
        navigate('/')
    }

    const handleLogout = async () => {
        try {
            Swal.fire({
                title: "Are you sure you want to logout?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, logout!"
            }).then( async (result) => {
                if (result.isConfirmed) {
                    await signOut(auth)
                    Swal.fire({
                        title: "You have been logged out!",
                        text: "Thank You!",
                        icon: "success"
                    })
                    navigate('/login')
                }
            }) 
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='bg-[#CCCCCC] grid grid-cols-3 pt-5 px-10'>
            <div></div>
            <div className='flex justify-center'>
                <img className='w-[35%] cursor-pointer' src={logo} alt='logo' onClick={goToHome} />
            </div>
            <div className='flex justify-end'>
                <button onClick={handleLogout} className='hover:underline'>Logout</button>
            </div>
        </div>
    )
}

export default AdminNavbar