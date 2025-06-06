import React, { useContext } from 'react'
import logo from '../assets/h_1.png'
import logoDarkMode from '../assets/darkMode.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import Swal from 'sweetalert2'
import { Sun, Moon, CircleUserIcon, ShoppingCart, Search } from 'lucide-react'
import { ThemeContext } from '../context/ThemeContext'
import { AuthContext } from '../context/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../app/slices/productSlice'

function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const { user, role, profile } = useContext(AuthContext)
    const { search } = useSelector(state => state.product)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

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
        <nav className={`${theme === 'light' ? 'bg-[#CCCCCC]' : 'bg-[#757575]'} grid grid-cols-2  ${location.pathname === '/' && 'grid grid-cols-2 xl:grid-cols-6'} pt-5 px-5 lg:px-10`}>
            <div className='flex justify-between col-span-2 xl:col-span-1'>
                <div
                    className='w-72 flex lg:hidden'
                >
                    {
                        theme === 'light' ? (
                            <img
                                className='cursor-pointer'
                                src={logo}
                                alt='logo'
                                onClick={() => navigate('/')}
                            />
                        ) : (
                            <img
                                className='cursor-pointer'
                                src={logoDarkMode}
                                alt='logo'
                                onClick={() => navigate('/')}
                            />
                        )
                    }
                </div>
                <div
                    className='w-72 hidden lg:flex'
                >
                    {
                        theme === 'light' ? (
                            <img
                                className='xl:w-72 cursor-pointer'
                                src={logo}
                                alt='logo'
                                onClick={() => navigate('/')}
                            />
                        ) : (
                            <img
                                className='xl:w-72 cursor-pointer'
                                src={logoDarkMode}
                                alt='logo'
                                onClick={() => navigate('/')}
                            />
                        )
                    }
                </div>
                <div className={`flex w-full xl:hidden col-span-2 justify-end gap-2 lg:gap-5 items-center ${location.pathname !== '/' && 'mb-2'}`}>
                    {user ? (
                        <>
                            <div className='flex items-center cursor-pointer relative me-3' onClick={() => navigate('/cart')}>
                                <ShoppingCart size={35} />
                                <p className='absolute border-4 border-[#CCCCCC] rounded-full px-2 bottom-5 left-5 bg-white text-black'>{profile?.totalCartQty ? profile?.totalCartQty : 0}</p>
                            </div>
                            <div className='relative grid group'>
                                <div className='flex gap-1 items-center cursor-pointer peer'>
                                    {profile?.photoURL ? <img className='size-6 rounded-md object-cover' src={profile?.photoURL} alt={profile?.username} /> : <CircleUserIcon />}
                                    <span>{profile?.username}</span>
                                </div>
                                <div className='absolute left-0 top-full border rounded-md bg-white shadow-lg hidden group-hover:block peer-hover:block text-black'>
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
                                        onClick={() => navigate('/userprofilepage')}
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
                    ) : (
                        location.pathname === '/' && (
                            <>
                                <button
                                    onClick={() => navigate('/login')}
                                    className='hover:underline'
                                    aria-label='Sign In'
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => navigate('/register')}
                                    className='hover:underline'
                                    aria-label='Sign Up'
                                >
                                    Sign Up
                                </button>
                            </>
                        )
                    )}
                    <button className={`cursor-pointer border p-2 rounded-md`} onClick={toggleTheme} aria-label='Toggle theme'>
                        {theme === 'light' ? <Moon /> : <Sun />}
                    </button>
                </div>
            </div>
            {location.pathname === '/' && (
                <div className='col-span-2 xl:col-span-4 xl:ms-14 mb-5'>
                    <form className='flex items-center bg-white rounded-md ps-1'>
                        <input
                            className='flex-1 p-2 focus:outline-blue-400 text-black'
                            value={search}
                            onChange={(e) => dispatch(setSearch(e.target.value.toLowerCase()))}
                        />
                        <button
                            className='m-1 py-2 px-4 bg-[#CCCCCC] rounded-e-md'
                            type='submit'
                        >
                            <Search />
                        </button>
                    </form>
                </div>
            )}
            <div className={`hidden xl:flex w-full justify-end gap-2 lg:gap-5 xl:gap-3 pb-5 ${location.pathname !== '/' && 'col-span-2 xl:col-span-1'}`}>
                {user ? (
                    <>
                        <div className='flex items-center cursor-pointer relative me-3' onClick={() => navigate('/cart')}>
                            <ShoppingCart size={35} />
                            <p className='absolute border-4 border-[#CCCCCC] rounded-full px-2 bottom-5 left-5 bg-white text-black'>{profile?.totalCartQty ? profile?.totalCartQty : 0}</p>
                        </div>
                        <div className='relative grid group'>
                            <div className='flex gap-1 items-center cursor-pointer peer'>
                                {profile?.photoURL ? <img className='size-6 rounded-md object-cover' src={profile?.photoURL} alt={profile?.username} /> : <CircleUserIcon />}
                                <span>{profile?.username}</span>
                            </div>
                            <div className='absolute left-0 top-full border rounded-md bg-white shadow-lg hidden group-hover:block peer-hover:block text-black'>
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
                                    onClick={() => navigate('/userprofilepage')}
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
                ) : (
                    location.pathname === '/' && (
                        <>
                            <button
                                onClick={() => navigate('/login')}
                                className='hover:underline'
                                aria-label='Sign In'
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className='hover:underline'
                                aria-label='Sign Up'
                            >
                                Sign Up
                            </button>
                        </>
                    )
                )}
                <button className={`cursor-pointer border p-2 rounded-md`} onClick={toggleTheme} aria-label='Toggle theme'>
                    {theme === 'light' ? <Moon /> : <Sun />}
                </button>
            </div>
        </nav>
    )
}

export default Navbar