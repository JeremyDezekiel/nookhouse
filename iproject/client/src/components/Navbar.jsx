import React, { useContext, useState } from 'react'
import logo from '../assets/h_1.png'
import logoDarkMode from '../assets/darkMode.png'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import Swal from 'sweetalert2'
import { Sun, Moon } from 'lucide-react'
import { ThemeContext } from '../context/ThemeContext'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const { user, role } = useContext(AuthContext)
    const navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState)
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
            }).then(async (result) => {
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
        <nav className={`${theme === 'light' ? 'bg-[#CCCCCC]' : 'bg-[#757575]'} grid grid-cols-3 pt-5 px-5 lg:px-10`}>
            <div className='flex col-span-2'>
                {theme === 'light' ? <img className='xl:w-[24%] cursor-pointer' src={logo} alt='logo' onClick={() => navigate('/')} /> : <img className='xl:w-[24%] cursor-pointer' src={logoDarkMode} alt='logo' onClick={() => navigate('/')} />}
            </div>
            <div className='flex justify-end gap-2 lg:gap-5 pb-5'>
                {user && (
                    <>
                        <div className='lg:hidden'>
                            <button onClick={toggleDropdown} className='cursor-pointer border p-2 rounded-md' aria-label='User Menu'>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" aria-hidden="true" className="h-6 w-6 shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
                                </svg>
                            </button>
                            {dropdownOpen && (
                                <div className='absolute right-1 mt-2 bg-white border rounded-md shadow-lg'>
                                    { role === 'admin' && (
                                        <button
                                        onClick={() => navigate('/admin')}
                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                        aria-label='Admin Page'
                                    >
                                        Admin Page
                                    </button>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                        aria-label='Logout'
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className='hidden lg:flex gap-2 lg:gap-5'>
                            { role === 'admin' && (
                                <button
                                onClick={() => navigate('/admin')}
                                className='hover:underline'
                                aria-label='Admin Page'
                            >
                                Admin page
                            </button>
                            )}
                            <button
                                onClick={handleLogout}
                                className='hover:underline'
                                aria-label='Logout'
                            >
                                Logout
                            </button>
                        </div>
                    </>
                )}
                <button className={`cursor-pointer border p-2 rounded-md`} onClick={toggleTheme} aria-label='Toggle theme'>
                    {theme === 'light' ? <Moon /> : <Sun />}
                </button>
            </div>
        </nav>
    )
}

export default Navbar