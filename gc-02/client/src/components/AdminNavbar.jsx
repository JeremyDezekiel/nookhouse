import React, { useContext } from 'react'
import logo from '../assets/h_1.png'
import logoDarkMode from '../assets/darkMode.png'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import Swal from 'sweetalert2'
import { Sun, Moon } from 'lucide-react'
import { ThemeContext } from '../context/ThemeContext'
import { AuthContext } from '../context/AuthContext'

function AdminNavbar() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

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
        <nav className={`${theme === 'light' ? 'bg-[#CCCCCC]' : 'bg-[#757575]'} grid grid-cols-3 pt-5 px-10`}>
            <div className='hidden md:block'></div>
            <div className='flex justify-center col-span-2 md:col-span-1'>
                {theme === 'light' ? <img className='xl:w-[48%] cursor-pointer' src={logo} alt='logo' onClick={()=> navigate('/admin')} /> : <img className='xl:w-[48%] cursor-pointer' src={logoDarkMode} alt='logo' onClick={()=> navigate('/admin')} />}
            </div>
            <div className='flex justify-end gap-5 pb-5'>
                {user && (
                    <>
                        <button onClick={() => navigate('/add-product')} className='hover:underline' aria-label='Add Product'>Add Product</button>
                        <button onClick={handleLogout} className='hover:underline' aria-label='Logout'>Logout</button>
                    </>
                )}
                <button className={`border rounded-md p-2`} onClick={toggleTheme} aria-label='Toggle theme'>
                    {theme === 'light' ? <Moon/> : <Sun/>}
                </button>
            </div>
        </nav>
    )
}

export default AdminNavbar