import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className='grid justify-center'>
            <div className='border p-5'>
                <h1 className='font-bold text-3xl'>Sign In</h1>
                <p className='text-lg text-gray-500'>Sign in to shop with vouchers, track your order, and save your favorite products.</p>
                <form className='grid gap-5 mt-5'>
                    <div>
                        <input
                            className='p-3 border w-full'
                            type='text'
                            placeholder='Email*'
                        />
                    </div>
                    <div>
                        <input
                            className='p-3 border w-full'
                            type='password'
                            placeholder='Password*'
                        />
                    </div>
                    <button className='border p-3 font-semibold hover:bg-[#e2e2e2]' type='submit'>Sign In</button>
                </form>
                <div className='flex justify-center gap-2 mt-5'>
                    <p>Don’t have an account?</p>
                    <Link to='/register' className='underline hover:text-gray-600'>Register Here</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage