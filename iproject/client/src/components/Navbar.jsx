import React, { useContext, useState } from 'react'
import logo from '../assets/h_1.png'
import logoDarkMode from '../assets/darkMode.png'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import Swal from 'sweetalert2'
import { Sun, Moon, CircleUserIcon, ShoppingCart } from 'lucide-react'
import { ThemeContext } from '../context/ThemeContext'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const { user, role, profile } = useContext(AuthContext)
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
                        <div className='flex items-center cursor-pointer relative'>
                            <ShoppingCart />
                            <p className='absolute border'>25</p>
                        </div>
                        <div className='relative grid group'>
                            <div className='flex gap-1 items-center cursor-pointer peer'>
                                <CircleUserIcon />
                                <span>{profile.username}</span>
                            </div>
                            <div className='absolute right-0 top-full border rounded-md bg-white shadow-lg hidden group-hover:block peer-hover:block'>
                                {role === 'admin' && (
                                    <button
                                        onClick={() => navigate('/admin')}
                                        className='w-full text-left hover:underline p-2 hover:bg-gray-100'
                                        aria-label='Admin Page'
                                    >
                                        Admin page
                                    </button>
                                )}
                                <button
                                    onClick={() => navigate('/userprofilepage/' + user.uid)}
                                    className='min-w-32 text-left hover:underline p-2 hover:bg-gray-100'
                                    aria-label='User Profile Page'
                                >
                                    My Account
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className='w-full text-left hover:underline p-2 hover:bg-gray-100'
                                    aria-label='Logout'
                                >
                                    Logout
                                </button>
                            </div>
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