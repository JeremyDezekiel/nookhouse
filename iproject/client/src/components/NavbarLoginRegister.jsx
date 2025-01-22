import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import logo from '../assets/h_1.png'
import logoDarkMode from '../assets/darkMode.png'
import { Moon, Sun } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function NavbarLoginRegister() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const navigate = useNavigate()
    return (
        <nav className={`${theme === 'light' ? 'bg-[#CCCCCC]' : 'bg-[#757575]'} grid grid-cols-3 pt-5 px-5 lg:px-10`}>
            <div className='hidden md:block'></div>
            <div className='flex justify-center col-span-2 md:col-span-1'>
                {theme === 'light' ? <img className='xl:w-[48%] cursor-pointer' src={logo} alt='logo' onClick={() => navigate('/')} /> : <img className='xl:w-[48%] cursor-pointer' src={logoDarkMode} alt='logo' onClick={() => navigate('/')} />}
            </div>
            <div className='flex justify-end items-center gap-2 lg:gap-5 pb-5'>
                <button className={`cursor-pointer border p-2 rounded-md`} onClick={toggleTheme} aria-label='Toggle theme'>
                    {theme === 'light' ? <Moon /> : <Sun />}
                </button>
            </div>
        </nav>
    )
}

export default NavbarLoginRegister