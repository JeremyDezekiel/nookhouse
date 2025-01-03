import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import auth from '../config/firebase'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthContext'

function LoginPage() {
    const { user, isLoading} = useContext(AuthContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    const validateEmail = (email) => {
        if (email === '') {
            setEmailError('Please enter a email.')
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email format.')
        } else {
            setEmailError('')
        }
    }

    const validatePassword = (password) => {
        if (password === '') {
            setPasswordError('Please enter a password')
        } else {
            setPasswordError('')
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        validateEmail(email)
        validatePassword(password)
        if (emailError || passwordError) {
            return
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            })
            setEmail('')
            setPassword('')
            navigate('/admin')
        } catch (error) {
            console.error(error.message)
            let errorMessage
            
            if (error.message === 'Firebase: Error (auth/invalid-credential).') {
                errorMessage = "wrong email or password!"
                setEmail('')
                setPassword('')
            } else if (error.message === 'Firebase: Error (auth/invalid-email).') {
                errorMessage = "insert a email and password!"
            }
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
            })
        }
    }

    useEffect (() => {
        if (!isLoading && user) {
            navigate('/admin')
        }
    }, [user, isLoading])

    return (
            <div className='grid justify-center'>
                <div className='border p-5'>
                    <h1 className='font-bold text-3xl'>Sign In</h1>
                    <p className='text-lg text-gray-500'>Sign in to shop with vouchers, track your order, and save your favorite products.</p>
                    <form className='grid gap-5 mt-5' onSubmit={(e) => handleLogin(e)}>
                        <div className='relative'>
                            <input
                                className={`block w-full p-5 text-black text-base border focus:outline-green-600 appearance-none focus:text-black peer ${emailError ? 'border-red-500' : ''}`}
                                type='text'
                                placeholder=''
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => validateEmail(email)}
                            />
                            <label className={`absolute text-base duration-300 transform -translate-y-4 left-5 scale-90 top-5 z-10 origin-[0] peer-focus:top-5 peer-focus:left-5 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4 peer-placeholder-shown:text-[#BBBEC4] ${emailError ? 'text-red-500' : 'text-green-600'}`}>Your Email*</label>
                            {emailError && <p className='text-red-500 text-sm peer-focus:hidden'>{emailError}</p>}
                        </div>
                        <div className='relative'>
                            <input
                                className={`block w-full p-5 text-base text-black border focus:outline-green-600 appearance-none focus:text-black peer ${passwordError ? 'border-red-500' : ''}`}
                                type='password'
                                placeholder=''
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => validatePassword(password)}
                            />
                            <label className={`absolute text-base duration-300 transform -translate-y-4 left-5 scale-90 top-5 z-10 origin-[0] peer-focus:top-5 peer-focus:left-5 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4 peer-placeholder-shown:text-[#BBBEC4] ${passwordError ? 'text-red-500' : 'text-green-600'}`}>Your Password*</label>
                            {passwordError && <p className='text-red-500 text-sm peer-focus:hidden'>{passwordError}</p>}
                        </div>
                        {emailError === true || passwordError === true || !emailRegex.test(email) || password === '' ? 
                            <button className='border p-3 font-semibold bg-[#e2e2e2] cursor-not-allowed text-gray-500' type='submit' disabled>Sign In</button> : 
                            <button className='border p-3 font-semibold hover:bg-[#e2e2e2]' type='submit'>Sign In</button>}
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