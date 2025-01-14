import React from 'react'
import logo from '../assets/h_1.png'
import { CircleHelp } from 'lucide-react'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <main className='flex flex-col justify-center text-center items-center h-screen'>
            <img src={logo} alt='logo'/>
            <CircleHelp size={300}/>
            <h1 className='text-4xl mt-5'>Oops... page not found.</h1>
            <h1 className='text-4xl mt-5'>How about going back to the home page?</h1>
            <Link to='/' className='text-4xl mt-5 border p-5 rounded-3xl bg-[#D9D9D9] hover:underline'>Home Page</Link>
        </main>
    )
}

export default ErrorPage